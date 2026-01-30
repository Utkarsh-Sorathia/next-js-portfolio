import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Sanity CMS configuration
export const sanityConfig = {
  projectId: 'roupwgmh',
  dataset: 'production',
  apiVersion: '2022-06-01',
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published' as const,
  stega: {
    enabled: false,
  },
};

// Create Sanity client
export const client = createClient(sanityConfig);

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// GROQ query for fetching all blog posts
export const getAllBlogPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    publishedAt,
    body,
    slug {
      current
    },
    image {
      _key,
      _type,
      asset->{
        altText,
        title,
        description,
        url
      }
    }
  }
`;


// GROQ query for fetching a single blog post by slug
export const getBlogPostBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    publishedAt,
    body[] {
      ...,
      "listItem": listItem,
      "style": style,
      "level": level,
      children[] {
        ...,
        marks,
        text
      },
      markDefs[]{
        ...,
        _type == "link" => {
          ...,
          "href": href
        }
      }
    },
    slug {
      current
    },
    image {
      _key,
      _type,
      asset->{
        altText,
        title,
        description,
        url
      }
    }
  }
`;

// GROQ query for fetching all blog post slugs (for static generation)
export const getAllBlogPostSlugsQuery = `
  *[_type == "post"] {
    slug {
      current
    }
  }
`;

// Utility function to calculate time since published
export function getTimeSincePublished(publishedAt: string): string {
  const now = new Date();
  const published = new Date(publishedAt);
  const diffInMs = now.getTime() - published.getTime();
  
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);
  
  if (diffInYears > 0) {
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  } else if (diffInWeeks > 0) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  } else if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else {
    return 'Today';
  }
}

// Utility function to calculate read time
export function calculateReadTime(body: any[]): number {
  if (!body || !Array.isArray(body)) return 1;
  
  const wordsPerMinute = 200;
  let totalWords = 0;
  
  body.forEach((block: any) => {
    if (block.children) {
      block.children.forEach((child: any) => {
        if (child.text) {
          totalWords += child.text.split(' ').length;
        }
      });
    }
  });
  
  return Math.ceil(totalWords / wordsPerMinute) || 1;
}

// Utility function to extract excerpt from body
export function extractExcerpt(body: any[], maxLength: number = 150): string {
  if (!body || !Array.isArray(body) || body.length === 0) return '';
  
  let text = '';
  
  for (const block of body) {
    if (block.children) {
      for (const child of block.children) {
        if (child.text) {
          text += child.text + ' ';
          if (text.length > maxLength) break;
        }
      }
    }
    if (text.length > maxLength) break;
  }
  
  return text.trim().substring(0, maxLength) + (text.length > maxLength ? '...' : '');
}


// API Functions
export async function getAllBlogPosts() {
  try {
    const posts = await client.fetch(
      getAllBlogPostsQuery, 
      {}, 
      { 
        next: { 
          revalidate: 3600, // Cache for 1 hour, works with ISR
          tags: ['blog-posts'] // Tag for on-demand revalidation
        } 
      }
    );
    return posts || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await client.fetch(
      getBlogPostBySlugQuery, 
      { slug }, 
      { 
        next: { 
          revalidate: 3600, // Cache for 1 hour, works with ISR
          tags: ['blog-posts', `blog-${slug}`] // Tag for on-demand revalidation
        } 
      }
    );
    return post || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function getAllBlogPostSlugs() {
  try {
    const slugs = await client.fetch(
      getAllBlogPostSlugsQuery,
      {}, 
      { 
        next: { 
          revalidate: 3600, // Cache for 1 hour, works with ISR
          tags: ['blog-slugs'] // Tag for on-demand revalidation
        } 
      }
    );
    return slugs?.map((item: any) => item.slug.current) || [];
  } catch (error) {
    console.error('Error fetching blog post slugs:', error);
    return [];
  }
}
