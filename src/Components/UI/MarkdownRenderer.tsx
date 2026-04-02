'use client';

import { useEffect, useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { createRoot } from 'react-dom/client';

interface MarkdownRendererProps {
  html: string;
}

const MarkdownRenderer = ({ html }: MarkdownRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !html) return;

    // Clean up any existing wrappers if re-rendering
    const existingWrappers = containerRef.current.querySelectorAll('.code-block-wrapper');
    existingWrappers.forEach(wrapper => {
      const pre = wrapper.querySelector('pre');
      if (pre) {
        wrapper.parentNode?.insertBefore(pre, wrapper);
        wrapper.remove();
      }
    });

    // Add copy buttons to pre tags
    const preTags = containerRef.current.querySelectorAll('pre');
    
    preTags.forEach((pre) => {
      // Small delay to ensure DOM is settled
      if (pre.parentElement?.classList.contains('code-block-wrapper')) return;

      // Wrap pre in a div for relative positioning
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
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-zinc-400" />}
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
