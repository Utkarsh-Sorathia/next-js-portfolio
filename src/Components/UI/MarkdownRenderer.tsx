'use client';

import { useEffect, useState } from 'react';
import { marked } from 'marked';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    const processContent = async () => {
      try {
        if (!content) {
          setHtml('');
          return;
        }

        // Dynamic import dompurify to avoid SSR issues
        const DOMPurify = (await import('dompurify')).default;
        
        // Configure marked options if not global
        // Note: parsing options can be passed directly to parse
        const rawMarkup = await marked.parse(content, { 
          async: true,
          gfm: true, // explicit GFM
          breaks: true // convert \n to <br> for better readability
        });

        const cleanMarkup = DOMPurify.sanitize(rawMarkup, {
          USE_PROFILES: { html: true }
        });
        
        setHtml(cleanMarkup);
      } catch (error) {
        console.error('Markdown processing error:', error);
        // Fallback or empty on error
        setHtml(content); 
      }
    };

    processContent();
  }, [content]);

  return (
    <div 
      className="markdown-body" 
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ backgroundColor: 'transparent' }} 
    />
  );
};

export default MarkdownRenderer;
