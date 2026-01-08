import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/sanity'
import { baseURL } from '@/utils/api';

export const revalidate = 0;

const baseUrl = baseURL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllBlogPosts()
  
  // Use a stable date for static routes to avoid "faking" updates
  const lastUpdated = new Date('2024-03-20T00:00:00.000Z');

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: lastUpdated,
      changeFrequency: 'daily' as const, 
      priority: 0.9, 
    },
  ]
  
  const blogRoutes = posts.map((post: any) => ({
    url: `${baseUrl}/blogs/${post.slug.current}`,
    lastModified: new Date(post._updatedAt || post._createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8, 
  }))
  
  return [...staticRoutes, ...blogRoutes]
}
