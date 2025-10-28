import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/sanity'

const baseUrl = 'https://utkarsh-sorathia.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllBlogPosts()
  
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]
  
  const blogRoutes = posts.map((post: any) => ({
    url: `${baseUrl}/blogs/${post.slug.current}`,
    lastModified: new Date(post._updatedAt || post._createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  return [...staticRoutes, ...blogRoutes]
}

export const revalidate = 3600
