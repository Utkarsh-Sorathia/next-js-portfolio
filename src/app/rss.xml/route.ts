import { getAllBlogPosts } from '@/lib/sanity';
import { baseURL } from '@/utils/api';

export async function GET() {
  const posts = await getAllBlogPosts();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Utkarsh Sorathia - Full Stack Developer Blog</title>
    <link>${baseURL}/blogs</link>
    <description>Latest thoughts on web development, technology, and programming from Utkarsh Sorathia</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseURL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map((post: any) => {
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
              .substring(0, 300)
          : post.body?.[0]?.children?.[0]?.text?.substring(0, 300) || '';

        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseURL}/blogs/${post.slug.current}</link>
      <guid isPermaLink="true">${baseURL}/blogs/${post.slug.current}</guid>
      <description><![CDATA[${excerpt}...]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      ${post.image?.asset?.url ? `<enclosure url="${post.image.asset.url}" type="image/jpeg"/>` : ''}
    </item>`;
      })
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}
