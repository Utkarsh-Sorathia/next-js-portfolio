import { Metadata } from 'next';
import { IBlogPost } from '@/interfaces';
import BlogCard from '@/Components/UI/BlogCard';
import PageBox from '@/Components/core/PageBox';
import ResponsiveBox from '@/Components/core/ResponsiveBox';
import ConstrainedBox from '@/Components/core/constrained-box';
import SectionTitle from '@/Components/common/SectionTitle';
import { getAllBlogPosts } from '@/lib/sanity';
import { getBlogListingSchema, getBreadcrumbSchema } from '@/utils/structuredData';
import { baseURL } from '@/utils/api';

export const metadata: Metadata = {
  title: 'Blog | Utkarsh Sorathia - Full Stack Developer',
  description: 'Read my latest thoughts on web development, technology, and programming. Explore tutorials, insights, and best practices for modern web development.',
  keywords: [
    'blog',
    'web development',
    'programming',
    'technology',
    'utkarsh sorathia',
    'react',
    'nextjs',
    'typescript',
    'javascript',
    'nodejs',
    'mongodb',
    'express',
    'mern stack',
    'full stack developer',
    'tutorials',
    'coding tips',
    'software development'
  ],
  authors: [{ name: 'Utkarsh Sorathia' }],
  creator: 'Utkarsh Sorathia',
  publisher: 'Utkarsh Sorathia',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Blog | Utkarsh Sorathia - Full Stack Developer',
    description: 'Read my latest thoughts on web development, technology, and programming. Explore tutorials, insights, and best practices for modern web development.',
    url: `${baseURL}/blogs`,
    type: 'website',
    locale: 'en_US',
    siteName: 'Utkarsh Sorathia Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Utkarsh Sorathia - Full Stack Developer',
    description: 'Read my latest thoughts on web development, technology, and programming.',
    creator: '@utkarshsor03',
  },
  alternates: {
    canonical: `${baseURL}/blogs`,
  },
};

export const revalidate = 3600;

export default async function BlogsPage() {
  const posts = await getAllBlogPosts();
  
  const blogListingSchema = getBlogListingSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: baseURL },
    { name: 'Blog', url: `${baseURL}/blogs` },
  ]);

  return (
    <PageBox>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogListingSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <ResponsiveBox
        classNames="min-h-screen dark:bg-[var(--bgColor)] bg-[var(--bgColor)] dark:bg-grid-white/[0.1] bg-grid-white/[0.1] items-center justify-center lg:px-40"
        id="blogs"
      >
        <ConstrainedBox classNames="px-4 py-16">
          {/* Header Section */}
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <SectionTitle>My <span className="text-[var(--primaryColor)]">Blogs</span></SectionTitle>
            <p className="text-center text-base sm:text-lg text-[var(--textColorLight)] max-w-2xl mx-auto mt-4 sm:mt-6">
              Thoughts, tutorials, and insights about web development, technology, and programming.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
            {posts.map((post: IBlogPost) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="text-center py-12 sm:py-16 lg:py-20">
              <div className="text-4xl sm:text-6xl mb-4">📝</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[var(--textColor)] mb-2">No blog posts yet</h3>
              <p className="text-[var(--textColorLight)]">Check back soon for new content!</p>
            </div>
          )}
        </ConstrainedBox>
      </ResponsiveBox>
    </PageBox>
  );
}
