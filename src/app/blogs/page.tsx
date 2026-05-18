import { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/sanity";

import PageBox from "@/Components/core/PageBox";
import ResponsiveBox from "@/Components/core/ResponsiveBox";
import ConstrainedBox from "@/Components/core/constrained-box";
import SectionTitle from "@/Components/common/SectionTitle";
import Breadcrumbs from "@/Components/common/Breadcrumbs";

import { getBlogListingSchema, getBreadcrumbSchema, getCompleteBlogSchema } from "@/utils/structuredData";
import { baseURL } from "@/utils/api";
import BlogsPageClient from "@/app/blogs/BlogsPageClient";

export const revalidate = 2592000; // Revalidate every 30 days

export const metadata: Metadata = {
  title: "Blogs | Utkarsh Sorathia - Full Stack Developer",
  description:
    "Practical tutorials and insights on Next.js, React, and full-stack development — drawn from real production work.",
  alternates: { canonical: `${baseURL}/blogs` },
  openGraph: {
    title: "Blogs | Utkarsh Sorathia - Full Stack Developer",
    description: "Practical tutorials and insights on Next.js, React, and full-stack development — drawn from real production work.",
    url: `${baseURL}/blogs`,
    siteName: "Utkarsh Sorathia Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseURL}/UtkarshSorathia.webp`,
        alt: "Utkarsh Sorathia - Full Stack Developer Blog",
        width: 800,
        height: 1067,
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | Utkarsh Sorathia - Full Stack Developer",
    description: "Practical tutorials and insights on Next.js, React, and full-stack development — drawn from real production work.",
    creator: "@utkarshsor03",
    images: [`${baseURL}/UtkarshSorathia.webp`],
  },
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
        classNames="min-h-screen dark:bg-[var(--bgColor)] bg-[var(--bgColor)] dark:bg-grid-white/[0.1] bg-grid-white/[0.1] lg:px-12 xl:px-40"
      >
        <ConstrainedBox classNames="px-4 pb-16">
          <div className="pt-24">
            <Breadcrumbs items={[{ name: "Blogs", url: `${baseURL}/blogs` }]} />
            
            {/* Header Section */}
            <div>
              <h1 className="sr-only">Utkarsh Sorathia Blog - Web Development & Technology Insights</h1>
              <SectionTitle>
                My <span className="text-[var(--primaryColor)]">Blogs</span>
              </SectionTitle>
              <p className="text-center text-base sm:text-lg text-[var(--textColorLight)] max-w-2xl mx-auto mt-4 sm:mt-6">
                Practical tutorials and insights on Next.js, React, and
                full-stack development — drawn from real production work.
              </p>
            </div>
          </div>

          {/* LOAD MORE PAGINATION */}
          <BlogsPageClient posts={posts} />
        </ConstrainedBox>
      </ResponsiveBox>
    </PageBox>
  );
}
