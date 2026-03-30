'use client';

import { useEffect, useState, useRef } from 'react';
import { marked } from 'marked';
import { Copy, Check } from 'lucide-react';
import { createRoot } from 'react-dom/client';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  const [html, setHtml] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const processContent = async () => {
      try {
        if (!content) {
          setHtml('');
          return;
        }

        const DOMPurify = (await import('dompurify')).default;
        
        const rawMarkup = await marked.parse(content, { 
          async: true,
          gfm: true,
          breaks: true 
        });

        const cleanMarkup = DOMPurify.sanitize(rawMarkup, {
          USE_PROFILES: { html: true }
        });
        
        setHtml(cleanMarkup);
      } catch (error) {
        console.error('Markdown processing error:', error);
        setHtml(content); 
      }
    };

    processContent();
  }, [content]);

  useEffect(() => {
    if (!containerRef.current || !html) return;

    // Add copy buttons to pre tags
    const preTags = containerRef.current.querySelectorAll('pre');
    
    preTags.forEach((pre) => {
      if (pre.parentElement?.classList.contains('code-block-wrapper')) return;

      // Wrap pre in a div
      const wrapper = document.createElement('div');
      wrapper.className = 'relative group code-block-wrapper';
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      // Create button container
      const btnContainer = document.createElement('div');
      btnContainer.className = 'absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10';
      wrapper.appendChild(btnContainer);

      const CopyButton = () => {
        const [copied, setCopied] = useState(false);

        const handleCopy = async () => {
          const code = pre.querySelector('code')?.innerText || pre.innerText;
          await navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        };

        return (
          <button
            onClick={handleCopy}
            className="p-2 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-md border border-white/10 backdrop-blur-sm transition-all active:scale-90"
            title="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
        );
      };

      const root = createRoot(btnContainer);
      root.render(<CopyButton />);
    });
  }, [html]);

  return (
    <div 
      ref={containerRef}
      className="markdown-body" 
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ backgroundColor: 'transparent' }} 
    />
  );
};

export default MarkdownRenderer;
