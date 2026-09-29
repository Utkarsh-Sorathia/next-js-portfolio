import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/sanity'
import { baseURL } from '@/utils/api';
import { IBlogPost } from '@/interfaces';

export const revalidate = 3600; // Revalidate every 1 hour

const baseUrl = baseURL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllBlogPosts()
  
  // Real dates only: Google ignores lastmod if it changes on every build
  const latestPostDate = posts.reduce((latest: Date | undefined, post: IBlogPost) => {
    const date = new Date(post._updatedAt || post._createdAt)
    return !latest || date > latest ? date : latest
  }, undefined)

  const staticRoutes = [
    {
      url: baseUrl,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: latestPostDate,
      changeFrequency: 'daily' as const, 
      priority: 0.9, 
    },
  ]
  
  const blogRoutes = posts.map((post: IBlogPost) => ({
    url: `${baseUrl}/blogs/${post.slug.current}`,
    lastModified: new Date(post._updatedAt || post._createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8, // Good priority for blog posts
  }))
  
  return [...staticRoutes, ...blogRoutes]
}
