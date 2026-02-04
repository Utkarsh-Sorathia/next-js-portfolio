import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import PageBox from '@/Components/core/PageBox';
import ResponsiveBox from '@/Components/core/ResponsiveBox';
import ConstrainedBox from '@/Components/core/constrained-box';
import MarkdownRenderer from '@/Components/UI/MarkdownRenderer';
import { getTimeSincePublished, getBlogPostBySlug, getAllBlogPostSlugs } from '@/lib/sanity';
import BlogCard from '@/Components/UI/BlogCard';
import { getBlogAltText } from '@/utils/imageValidation';
import BlogImageWithLoader from '@/Components/UI/BlogImageWithLoader';
import { getArticleSchema, getBreadcrumbSchema } from '@/utils/structuredData';
import { baseURL } from '@/utils/api';

export const revalidate = 3600; // Revalidate every 1 hour (ISR with webhook support)
export const dynamicParams = true; // Allow new blogs without rebuild

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = await getAllBlogPostSlugs();
  return slugs.map((slug: string) => ({
    slug: slug,
  }));
}

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Utkarsh Sorathia',
      description: 'The requested blog post could not be found.',
    };
  }

  let excerpt = '';
  if (typeof post.body === 'string') {
    // Clean markdown for excerpt
    excerpt = post.body
      .replace(/^#{1,6}\s+/gm, '') // Remove headers
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
      .replace(/\*([^*]+)\*/g, '$1') // Remove italic
      .replace(/`([^`]+)`/g, '$1') // Remove inline code
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links
      .replace(/\[|\]|\(|\)|`|#|\*/g, '') // Remove any remaining markdown special chars
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 160);
  } else {
    excerpt = post.body?.[0]?.children?.[0]?.text?.substring(0, 160) || '';
  }
  
  const metaDescription = excerpt || `Read about ${post.title}`;

  return {
    title: `${post.title} | Utkarsh Sorathia`,
    description: metaDescription,
    keywords: [
      'blog',
      'web development',
      'programming',
      'technology',
      'utkarsh sorathia',
      post.title.toLowerCase(),
      'tutorial',
      'coding',
      'software development'
    ],
    authors: [{ name: 'Utkarsh Sorathia' }],
    creator: 'Utkarsh Sorathia',
    publisher: 'Utkarsh Sorathia',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: post.title,
      description: excerpt,
      url: `${baseURL}/blogs/${post.slug.current}`,
      images: post.image?.asset?.url 
        ? [post.image.asset.url] 
        : [{
            url: `${baseURL}/UtkarshSorathia.webp`,
            alt: post.title,
            width: 1200,
            height: 630,
          }],
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: ['Utkarsh Sorathia'],
      locale: 'en_US',
      siteName: 'Utkarsh Sorathia Portfolio',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: excerpt,
      images: post.image?.asset?.url 
        ? [post.image.asset.url] 
        : [`${baseURL}/UtkarshSorathia.webp`],
      creator: '@utkarshsor03',
    },
    alternates: {
      canonical: `${baseURL}/blogs/${post.slug.current}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const recommendedPosts = post.recommended || [];

  const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const timeSincePublished = getTimeSincePublished(post.publishedAt);

  // Convert Portable Text to Markdown string
  const convertPortableTextToMarkdown = (body: any): string => {
    if (!body) return '';
    if (typeof body === 'string') return body;
    if (!Array.isArray(body)) return '';

    let markdown = '';

    body.forEach((block: any) => {
      if (block._type === 'block') {
        const style = block.style || 'normal';
        const listItem = block.listItem;
        
        let text = '';
        
        if (block.children && Array.isArray(block.children)) {
          block.children.forEach((child: any) => {
            let childText = String(child?.text || '');
            
            // Apply marks from the child
            if (child?.marks && Array.isArray(child.marks)) {
              // Check for strong
              if (child.marks.includes('strong')) {
                childText = `**${childText}**`;
              }
              // Check for em
              if (child.marks.includes('em')) {
                childText = `*${childText}*`;
              }
              // Check for code
              if (child.marks.includes('code')) {
                childText = `\`${childText}\``;
              }
            }
            
            text += childText;
          });
        }

        // Handle lists
        if (listItem) {
          const prefix = listItem === 'bullet' ? '- ' : '1. ';
          markdown += `${prefix}${text}\n`;
        }
        // Apply block styles
        else if (style === 'h1') markdown += `# ${text}\n\n`;
        else if (style === 'h2') markdown += `## ${text}\n\n`;
        else if (style === 'h3') markdown += `### ${text}\n\n`;
        else if (style === 'h4') markdown += `#### ${text}\n\n`;
        else if (style === 'blockquote') markdown += `> ${text}\n\n`;
        else markdown += `${text}\n\n`;
      }
    });

    return markdown;
  };

  // Convert body to markdown string if needed
  const bodyMarkdown = typeof post.body === 'string' 
    ? post.body 
    : convertPortableTextToMarkdown(post.body);

  // Get image URL for structured data
  const imageUrl = post.image?.asset?.url || `${baseURL}/UtkarshSorathia.webp`;
  const excerpt = typeof post.body === 'string'
    ? post.body
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        .replace(/\[|\]|\(|\)|`|#|\*/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 160)
    : post.body?.[0]?.children?.[0]?.text?.substring(0, 160) || '';

  // Generate structured data
  const articleSchema = getArticleSchema(
    post.title,
    excerpt || `Read about ${post.title}`,
    imageUrl,
    post.publishedAt,
    post._updatedAt,
    post.slug.current
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: baseURL },
    { name: 'Blog', url: `${baseURL}/blogs` },
    { name: post.title, url: `${baseURL}/blogs/${post.slug.current}` },
  ]);

  return (
    <PageBox>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
        <ResponsiveBox
        classNames="min-h-screen dark:bg-[var(--bgColor)] bg-[var(--bgColor)] dark:bg-grid-white/[0.1] bg-grid-white/[0.1] items-center justify-center lg:px-40"
        id="blog-post"
      >
        <ConstrainedBox classNames="px-4 py-16">
          {/* Back Button */}
          <div className="mb-6 sm:mb-8">
            <Link
              href="/blogs"
              className="inline-flex items-center text-[var(--primaryColor)] hover:text-[var(--primaryColor)]/80 transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Link>
          </div>

          {/* Article Header */}
          <article className="max-w-4xl mx-auto">
            <header className="mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--textColor)] mb-4 sm:mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base text-[var(--textColorLight)] mb-6 sm:mb-8">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>Utkarsh Sorathia</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{publishedDate}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{timeSincePublished}</span>
                </div>
              </div>

              {/* Featured Image */}
              {post.image?.asset?.url ? (
                <div className="relative w-full aspect-video mb-6 sm:mb-8 rounded-[var(--borderRadius)] overflow-hidden bg-gray-900">
                  <BlogImageWithLoader
                    src={post.image.asset.url}
                    alt={post.image.asset.altText || getBlogAltText(post.title)}
                    className="w-full h-full"
                    priority
                  />
                </div>
              ) : (
                <div className="relative w-full aspect-video mb-6 sm:mb-8 rounded-[var(--borderRadius)] overflow-hidden bg-gray-800 flex items-center justify-center">
                  <div className="text-gray-400 text-6xl">📝</div>
                </div>
              )}
            </header>

            {/* Article Content */}
            {bodyMarkdown && (
              <MarkdownRenderer content={bodyMarkdown} />
            )}

            {/* Article Footer */}
            <footer className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-[var(--textColor50)]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-[var(--textColor)] mb-2">About Me</h3>
                  <p className="text-sm sm:text-base text-[var(--textColorLight)]">
                    I&apos;m Utkarsh Sorathia, a Full Stack Developer passionate about React, Next.js, and modern JavaScript.
                    I love building scalable web applications and sharing programming insights on my blog.
                  </p>
                </div>
                <Link
                  href="/blogs"
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[var(--primaryColor)] to-indigo-600 hover:from-indigo-600 hover:to-[var(--primaryColor)] text-white rounded-[var(--borderRadius)] transition-all duration-300 text-sm sm:text-base whitespace-nowrap"
                >
                  Read More Blogs
                </Link>
              </div>
            </footer>

            {/* Recommended Posts */}
            {recommendedPosts.length > 0 && (
              <div className="mt-16 sm:mt-24">
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--textColor)] mb-8">
                  Recommended <span className="text-[var(--primaryColor)]">Posts</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedPosts.map((recommendedPost: any) => (
                    <BlogCard key={recommendedPost._id} post={recommendedPost} />
                  ))}
                </div>
              </div>
            )}
          </article>
        </ConstrainedBox>
      </ResponsiveBox>
    </PageBox>
  );
}
