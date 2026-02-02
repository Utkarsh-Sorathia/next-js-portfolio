import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/sanity'
import { baseURL } from '@/utils/api';

export const revalidate = 3600; // Revalidate every 1 hour (ISR with webhook support)

const baseUrl = baseURL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllBlogPosts()
  
  // Use current date for homepage to signal freshness
  const now = new Date();

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: now,
      changeFrequency: 'daily' as const, 
      priority: 0.9, 
    },
  ]
  
  const blogRoutes = posts.map((post: any) => ({
    url: `${baseUrl}/blogs/${post.slug.current}`,
    lastModified: new Date(post._updatedAt || post._createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8, // Good priority for blog posts
  }))
  
  return [...staticRoutes, ...blogRoutes]
}
