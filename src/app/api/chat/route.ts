import { createGroq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages } from 'ai';
import { NextRequest } from 'next/server';

// Import Data for Context
import skills from '@/data/skills';
import projects from '@/data/projects';
import experience from '@/data/experience';
import educations from '@/data/education';
import Strings from '@/constants/strings';
import socialLinks from '@/data/importantLinks';
import { getAllBlogPosts } from '@/lib/sanity';

export const runtime = 'edge';

// Rate limiting map
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATELIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

function getRateLimit(ip: string): boolean {
  const now = Date.now();
  const userData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  if (now - userData.lastReset > RATELIMIT_WINDOW) {
    userData.count = 1;
    userData.lastReset = now;
  } else {
    userData.count++;
  }

  rateLimitMap.set(ip, userData);
  return userData.count <= MAX_REQUESTS;
}

export async function POST(req: NextRequest) {
  // 1. Rate Limiting
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
  if (!getRateLimit(ip)) {
    return new Response("Too many requests. Please slow down!", { status: 429 });
  }

  const { messages, metadata } = await req.json();
  const gRecaptchaToken = metadata?.gRecaptchaToken || req.headers.get('x-recaptcha-token');

  // reCAPTCHA verification
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (secretKey && gRecaptchaToken) {
    try {
      const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secretKey}&response=${gRecaptchaToken}`,
      });

      const verifyData = await verifyRes.json();

      if (!verifyData.success || verifyData.score < 0.5) {
        return new Response("Security check failed.", { status: 400 });
      }
    } catch (error) {
      console.error("reCAPTCHA verification error:", error);
    }
  } else if (secretKey && !gRecaptchaToken) {
    return new Response("Security token missing.", { status: 400 });
  }

  // Fetch blogs for context
  const allBlogs = await getAllBlogPosts();
  const topBlogs = allBlogs.slice(0, 3);

  // Construct Context String
  const context = `
    You are Utkarsh Sorathia's AI Assistant. You are embedded in his portfolio website.
    Your goal is to answer questions about Utkarsh's professional background, skills, and projects in a friendly, professional, and concise manner.
    
    Here is Utkarsh's Data:
    
    --- BASIC INFO ---
    Name: Utkarsh Sorathia
    Role: Full Stack Developer
    Location: Surat, Gujarat, India
    Email: utkarshsor03@gmail.com
    GitHub: ${Strings.githubLink}
    LinkedIn: ${Strings.linkedInLink}
    Resume: https://utkarshsorathia.in/Utkarsh-Sorathia-CV.pdf
    
    --- SOCIAL HANDLES ---
    ${socialLinks.map(link => `- ${link.name}: ${link.url}`).join('\n')}
    
    --- LATEST BLOGS ---
    ${topBlogs.length > 0 
      ? topBlogs.map((post: any) => `- ${post.title} (Link: https://utkarshsorathia.in/blogs/${post.slug?.current})`).join('\n')
      : "No blogs available yet, but check https://utkarshsorathia.in/blogs for updates!"}
    
    --- SKILLS ---
    ${skills.map(cat => `${cat.title}: ${cat.items.map(s => s.title).join(', ')}`).join('\n')}
    
    --- EXPERIENCE ---
    ${experience.map(exp => `- ${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate}): ${exp.description.substring(0, 150)}...`).join('\n')}
    
    --- PROJECTS ---
    ${projects.map(p => `- ${p.title}: ${p.description.substring(0, 150)}... (Tech: ${p.tags?.join(', ') || 'N/A'}) [Link: ${p.url}]`).join('\n')}
    
    --- EDUCATION ---
    ${educations.map(edu => `- ${edu.degree} at ${edu.educations[0].institute} (${edu.educations[0].startDate} - ${edu.educations[0].endDate})`).join('\n')}
    
    --- RULES ---
    1. Always answer in the first person singular (e.g., "I", "Me", "My") as Utkarsh's AI Assistant.
    2. Be enthusiastic about Web Development, React, Next.js, and Modern Tech.
    3. If asked about contact info, provide the email, LinkedIn, or other social links. If asked for my resume or CV, provide the official link: https://utkarshsorathia.in/Utkarsh-Sorathia-CV.pdf. NEVER make up external Drive or Dropbox links.
    4. Provide the top 3 blogs if asked about his writings or blogs.
    5. KEEP ANSWERS READABLE: Use bullet points for lists and double newlines (\n\n) between sections to avoid compact text.
    6. CLICKABLE LINKS: Always format links as markdown links like [Label](URL) (e.g., [Instagram](https://instagram.com/...)) to ensure they are clickable.
    7. Keep answers short and relevant (under 3-4 sentences usually, unless asked for details).
    8. You can use markdown for formatting (bold, lists).
    9. NO INTERNAL REASONING: Do not show your internal thought process. NEVER use <think> tags or output the contents of your reasoning. only provide the final, helpful response.
    10. If you don't know the answer based on the data provided, say "I don't have that information right now, but feel free to contact Utkarsh directly!"
  `;

  // Check for API Key
  if (!process.env.GROQ_API_KEY) {
    return new Response("Missing GROQ_API_KEY environment variable.", { status: 500 });
  }

  const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY,
  });

  // --- MODEL FALLBACK SYSTEM ---
  // We distribute requests across different limit pools on Groq to maximize uptime.
  
  // 1. Top Tier: Smarter models (1k/day pool)
  const topTier = [
    'llama-3.3-70b-versatile',
    'openai/gpt-oss-120b',
    'qwen/qwen3-32b',
    'moonshotai/kimi-k2-instruct',
  ];

  // 2. High Quota Tier: Good for bursts (14.4k/day or 7k/day pools)
  const highQuotaTier = [
    'llama-3.1-8b-instant',
    'mixtral-8x7b-32768',
    'gemma2-9b-it',
    'allam-2-7b',
  ];

  // 3. Experimental/Backup Tier
  const experimentalTier = [
    'meta-llama/llama-4-maverick-17b-128e-instruct',
    'meta-llama/llama-4-scout-17b-16e-instruct',
    'openai/gpt-oss-20b',
    'groq/compound',
    'groq/compound-mini'
  ];

  // Combine them into a single chain
  // Tip: Shuffling the topTier helps prevent hitting the 30 RPM limit on a single model.
  const shuffledTopTier = [...topTier].sort(() => Math.random() - 0.5);
  const modelChain = [...shuffledTopTier, ...highQuotaTier, ...experimentalTier];

  for (const modelId of modelChain) {
    try {
      // 🧹 STOCHASTIC SANITIZATION
      // We manually construct CoreMessages to bypass SDK conversion utilities 
      // that might crash on the custom 'reasoning' fields returned by some Groq models.
      const sanitizedMessages = messages.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: typeof m.content === 'string' 
          ? m.content 
          : (m.parts ? m.parts.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('') : '')
      }));

      const result = streamText({
        model: groq(modelId),
        messages: sanitizedMessages,
        system: context,
      });

      return result.toUIMessageStreamResponse();
    } catch (error: any) {
      console.error(`Model [${modelId}] failed:`, error?.message || error);
      
      // If it's the last model, we have to throw
      if (modelId === modelChain[modelChain.length - 1]) {
        throw error;
      }
      
      // Otherwise, log and continue to next model (handles 429, 404, 503, etc.)
      console.warn(`Falling back to next model from ${modelId}...`);
      continue;
    }
  }
  
  return new Response("Service momentarily unavailable due to high traffic.", { status: 503 });
}
