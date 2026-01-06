import { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/sanity";

import PageBox from "@/Components/core/PageBox";
import ResponsiveBox from "@/Components/core/ResponsiveBox";
import ConstrainedBox from "@/Components/core/constrained-box";
import SectionTitle from "@/Components/common/SectionTitle";

import { getBlogListingSchema, getBreadcrumbSchema, getCompleteBlogSchema } from "@/utils/structuredData";
import { baseURL } from "@/utils/api";
import BlogsPageClient from "@/app/blogs/BlogsPageClient";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Blogs | Utkarsh Sorathia - Full Stack Developer",
  description:
    "Read my latest thoughts on web development, technology, and programming.",
  alternates: { canonical: `${baseURL}/blogs` },
};


export default async function BlogsPage() {
  const posts = await getAllBlogPosts();

  const blogListingSchema = getBlogListingSchema();
  const completeBlogSchema = getCompleteBlogSchema(posts);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: baseURL },
    { name: "Blogs", url: `${baseURL}/blogs` },
  ]);

  return (
    <PageBox>
      {/* SEO STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(completeBlogSchema) }}
      />

      <ResponsiveBox
        classNames="min-h-screen dark:bg-[var(--bgColor)] bg-[var(--bgColor)] dark:bg-grid-white/[0.1] bg-grid-white/[0.1] items-center justify-center lg:px-40"
        id="blogs"
      >
        <ConstrainedBox classNames="px-4 py-16">
          {/* Header Section */}
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <SectionTitle>
              My <span className="text-[var(--primaryColor)]">Blogs</span>
            </SectionTitle>
            <p className="text-center text-base sm:text-lg text-[var(--textColorLight)] max-w-2xl mx-auto mt-4 sm:mt-6">
              Thoughts, tutorials, and insights about web development,
              technology, and programming.
            </p>
          </div>

          {/* LOAD MORE PAGINATION */}
          <BlogsPageClient posts={posts} />
        </ConstrainedBox>
      </ResponsiveBox>
    </PageBox>
  );
}
