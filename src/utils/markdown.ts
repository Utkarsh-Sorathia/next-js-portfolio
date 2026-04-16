import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

/**
 * Parses markdown to sanitized HTML on the server
 */
export async function parseMarkdownToHtml(markdown: string): Promise<string> {
  if (!markdown) return '';

  const rawHtml = await marked.parse(markdown, {
    async: true,
    gfm: true,
    breaks: true
  });

  return DOMPurify.sanitize(rawHtml, {
    USE_PROFILES: { html: true }
  });
}
