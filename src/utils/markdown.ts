import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const purify = DOMPurify(window as any);

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

  return purify.sanitize(rawHtml, {
    USE_PROFILES: { html: true }
  });
}
