import { getAllBlogPostsForFeed } from '@/lib/sanity';
import { baseURL } from '@/utils/api';
import { getBlogExcerpt, getPostMarkdown } from '@/utils/blog';
import { parseMarkdownToHtml } from '@/utils/markdown';
import { IBlogPost } from '@/interfaces';

// Full-content RSS feed. Includes each post's whole body (content:encoded) so
// feed readers show the article and dev.to / Hashnode can import it via their
// "publish from RSS" settings, with the original post as the canonical URL.

// Feed readers and cross-posting sites render the HTML elsewhere, so
// root-relative links ("/blogs/x", "/images/y.png") must become absolute.
function absolutizeUrls(html: string): string {
  return html.replace(/(href|src)="\/(?!\/)/g, `$1="${baseURL}/`);
}

// CDATA can't contain "]]>"; split it if a post ever does.
const cdata = (value: string) => `<![CDATA[${value.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;

async function renderItem(post: IBlogPost & { image?: { asset?: { url?: string; mimeType?: string } } }) {
  const url = `${baseURL}/blogs/${post.slug.current}`;
  const description = getBlogExcerpt(post, 300);
  const bodyHtml = absolutizeUrls(await parseMarkdownToHtml(getPostMarkdown(post)));

  // Attribution line at the end of the article — keeps a link back here even
  // where a syndicating site doesn't honour the canonical URL.
  const contentHtml = `${bodyHtml}\n<hr />\n<p><em>Originally published at <a href="${url}">${url.replace(/^https?:\/\//, '')}</a>.</em></p>`;

  const image = post.image?.asset?.url;

  return `
    <item>
      <title>${cdata(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <dc:creator>Utkarsh Sorathia</dc:creator>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${cdata(description)}</description>
      <content:encoded>${cdata(contentHtml)}</content:encoded>
      ${image ? `<enclosure url="${image}" length="0" type="${post.image?.asset?.mimeType || 'image/jpeg'}" />` : ''}
    </item>`;
}

export async function GET() {
  const posts: IBlogPost[] = await getAllBlogPostsForFeed();
  const items = await Promise.all(posts.map(renderItem));
  const lastBuild = posts[0] ? new Date(posts[0]._updatedAt || posts[0].publishedAt) : new Date();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Utkarsh Sorathia - Full Stack Developer Blog</title>
    <link>${baseURL}/blogs</link>
    <description>Practical tutorials and insights on Next.js, React, and full-stack development — drawn from real production work.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
    <atom:link href="${baseURL}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseURL}/android-chrome-192x192.png</url>
      <title>Utkarsh Sorathia - Full Stack Developer Blog</title>
      <link>${baseURL}/blogs</link>
    </image>${items.join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}
