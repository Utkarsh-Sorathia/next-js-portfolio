'use client';

// The chat window itself. Loaded on demand by ChatWidget (next/dynamic) the first
// time the chat is opened, so the AI SDK and markdown renderer stay out of the
// initial page bundle.
import { useState, useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { motion } from 'framer-motion';
import { X, Send, AlertCircle } from 'lucide-react';
import { useGoogleReCaptcha } from '@/hooks/useGoogleReCaptcha';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [error, setError] = useState<string | null>(null);
  const { messages, sendMessage, status } = useChat({
    // Surface server-side rejections (rate limit, blocked prompt, etc.) in the
    // UI — otherwise a non-2xx response is silently swallowed and the user just
    // sees nothing happen.
    onError: (err) => {
      const msg = err?.message || '';
      if (msg.includes('Too many requests')) {
        setError("You're sending messages too quickly. Please wait a moment and try again.");
      } else if (
        msg.includes("can't help with that") ||
        msg.includes('too long') ||
        msg.includes('Security check')
      ) {
        setError(msg);
      } else {
        // Generic stream/model failure (e.g. a flaky tool call). The raw detail
        // is obscured by the SDK, so show a calm, on-brand fallback. Because the
        // error propagates normally, useChat's status becomes 'error' and the
        // input re-enables — no more frozen chat.
        setError("Sorry, I couldn't pull that up just now — mind rephrasing, or take a look at the Projects section on the page?");
      }
    },
  });
  const isLoading = status === 'submitted' || status === 'streaming';
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Every request carries a fresh reCAPTCHA token — the API rejects requests without one.
  const sendWithToken = async (text: string) => {
    try {
      setError(null);
      const token = await executeRecaptcha('chat_message');
      if (!token) {
        setError('Security service not ready. Please try again.');
        return false;
      }
      await sendMessage({ text }, {
        headers: { 'x-recaptcha-token': token },
        body: { metadata: { gRecaptchaToken: token } }
      });
      return true;
    } catch (err) {
      setError('Security verification failed. Please try again.');
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (await sendWithToken(input)) setInput('');
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Stays mounted after the first open (so the conversation survives closing);
  // open/close is animated here and the panel is display:none while closed.
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={
        isOpen
          ? { opacity: 1, scale: 1, y: 0, display: 'flex' }
          : { opacity: 0, scale: 0.9, y: 20, transitionEnd: { display: 'none' } }
      }
      aria-hidden={!isOpen}
      className="w-[90vw] sm:w-[450px] h-[600px] max-h-[85vh] bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-700 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="bg-(--primaryColor) p-4 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
          <Image src="/favicon.ico" alt="Logo" width={24} height={24} aria-hidden="true" />
          <div className="flex flex-col">
            <h3 id="chat-window-title" className="font-semibold text-sm leading-none flex items-center gap-2">
              AI Assistant
              <span className="flex h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" title="System Online"></span>
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <p className="text-[10px] opacity-80 uppercase tracking-wider font-bold">Powered by Groq</p>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-full transition-colors focus:outline-none"
          aria-label="Close Chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div 
        role="log"
        aria-live="polite"
        aria-labelledby="chat-window-title"
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950/50"
      >
        {messages.length === 0 && (
          <div className="text-center text-zinc-500 text-sm mt-10 px-4">
            <p className="mb-2">👋 Hi there!</p>
            <p>Hi! I'm your virtual assistant. Ask me about Utkarsh's projects, skills, or experience!</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => sendWithToken("What are Utkarsh's top skills?")}
                aria-label="Ask about skills"
                className="text-xs bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-full hover:bg-(--primaryColor) hover:text-white transition-colors"
              >
                Skills?
              </button>
              <button
                onClick={() => sendWithToken("Show me his latest projects")}
                aria-label="Ask about projects"
                className="text-xs bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-full hover:bg-(--primaryColor) hover:text-white transition-colors"
              >
                Projects?
              </button>
              <button
                onClick={() => sendWithToken("How can I contact him?")}
                aria-label="Ask about contact information"
                className="text-xs bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-full hover:bg-(--primaryColor) hover:text-white transition-colors"
              >
                Contact?
              </button>
            </div>
          </div>
        )}

        {messages.map((m: any) => {
          // ... (unchanged logic)
          const rawContent = m.parts
            ? m.parts.map((part: any) => part.type === 'text' ? part.text : '').join('')
            : m.content || '';
          const textContent = rawContent.replace(/<think>[\s\S]*?(?:<\/think>|$)/g, '').trim();

          return (
            <div
              key={m.id}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
            >
              <div
                className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm shadow-sm leading-relaxed wrap-break-word overflow-hidden ${m.role === 'user'
                  ? 'bg-(--primaryColor) text-white rounded-tr-none'
                  : 'bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-tl-none'
                  }`}
              >
                <div className="sr-only">{m.role === 'user' ? 'You said:' : 'AI said:'}</div>
                <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-p:mb-4 last:prose-p:mb-0 prose-pre:bg-zinc-900 prose-ul:my-2 prose-li:my-1 wrap-break-word">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: (props: any) => <a {...props} target="_blank" rel="noopener noreferrer" className="underline font-bold text-(--primaryColor)" />
                    }}
                  >
                    {textContent}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start" aria-label="AI is thinking">
            <div className="bg-zinc-800 rounded-2xl rounded-tl-none px-4 py-3 border border-zinc-700">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-3 bg-zinc-900 border-t border-zinc-700">
        {error && (
          <div role="alert" className="mb-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-[10px] text-red-500">
            <AlertCircle className="w-3 h-3" aria-hidden="true" />
            {error}
          </div>
        )}
        <div className="flex gap-2">
          <input
            ref={inputRef}
            className="flex-1 bg-zinc-800 text-zinc-100 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-(--primaryColor)/50 transition-all placeholder:text-zinc-400"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask something..."
            disabled={isLoading}
            aria-label="Ask AI Assistant something"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-(--primaryColor) text-white p-2.5 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
