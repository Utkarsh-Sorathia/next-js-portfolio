import { marked } from 'marked';

/**
 * Parses markdown to HTML without trying to load JSDOM in Next.js Server Components
 */
export async function parseMarkdownToHtml(markdown: string): Promise<string> {
  if (!markdown) return '';

  const rawHtml = await marked.parse(markdown, {
    async: true,
    gfm: true,
    breaks: true
  });

  return rawHtml;
}
