'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  const components: any = {
    // Headings
    h1: ({ children }: any) => (
      <h1 className="text-3xl sm:text-4xl font-bold text-[var(--textColor)] mt-10 mb-6 pb-4 border-b border-[var(--textColor50)]">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--primaryColor)] mt-8 mb-4 flex items-center gap-2">
        <span className="w-1 h-8 bg-[var(--primaryColor)] rounded flex-shrink-0"></span>
        <span>{children}</span>
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl sm:text-2xl font-semibold text-[var(--textColor)] mt-6 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg sm:text-xl font-semibold text-[var(--textColor)] mt-5 mb-2">
        {children}
      </h4>
    ),
    // Paragraphs
    p: ({ children }: any) => (
      <p className="text-base sm:text-lg text-[var(--textColor)] leading-relaxed mb-6">
        {children}
      </p>
    ),
    // Lists
    ul: ({ children }: any) => (
      <ul className="list-none mb-6 space-y-3">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-none mb-6 space-y-3 ml-6">
        {children}
      </ol>
    ),
    li: ({ children }: any) => (
      <li className="flex items-start gap-3 text-base sm:text-lg leading-relaxed text-[var(--textColor)]">
        <span className="mt-2 w-2 h-2 rounded-full bg-[var(--primaryColor)] flex-shrink-0"></span>
        <span className="flex-1">{children}</span>
      </li>
    ),
    // Inline elements
    strong: ({ children }: any) => (
      <strong className="font-bold text-[var(--textColor)]">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-[var(--textColor)]">{children}</em>
    ),
    code: ({ className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      const isInline = !match;
      
      if (isInline) {
        return (
          <code className="bg-gray-800 text-white px-2 py-1 rounded text-sm font-mono border border-[var(--primaryColor)]/30" {...props}>
            {children}
          </code>
        );
      }
      
      return (
        <div className="my-6 bg-gray-900 rounded-lg border border-[var(--primaryColor)]/30 overflow-hidden">
          <div className="bg-gray-800 px-4 py-2 text-sm text-[var(--textColorLight)] border-b border-[var(--primaryColor)]/30">
            {match?.[1]}
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-sm text-white font-mono" {...props}>
              {children}
            </code>
          </pre>
        </div>
      );
    },
    // Blockquotes
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[var(--primaryColor)] pl-6 py-4 my-6 bg-[var(--primaryColor)]/10 rounded-r-lg italic text-[var(--textColor)] text-lg">
        {children}
      </blockquote>
    ),
    // Links
    a: ({ href, children }: any) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--primaryColor)] hover:text-[var(--primaryColor)]/80 underline underline-offset-2 decoration-[var(--primaryColor)]/50 hover:decoration-[var(--primaryColor)] transition-all"
      >
        {children}
      </a>
    ),
    // Horizontal rule
    hr: () => (
      <hr className="my-8 border-0 border-t border-[var(--textColor50)]" />
    ),
  };

  return (
    <div className="max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;

