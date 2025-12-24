"use client";

import { useState } from "react";
import { IBlogPost } from "@/interfaces";
import BlogCard from "@/Components/UI/BlogCard";

interface BlogsPageClientProps {
  posts: IBlogPost[];
}

export default function BlogsPageClient({ posts }: BlogsPageClientProps) {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <>
      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
        {visiblePosts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < posts.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3 bg-primary text-white rounded-xl hover:opacity-90 transition-all duration-300 font-bold shadow-lg shadow-primary/20"
          >
            Load More
          </button>
        </div>
      )}

      {/* No Posts */}
      {posts.length === 0 && (
        <div className="text-center py-12 sm:py-16 lg:py-20">
          <div className="text-4xl sm:text-6xl mb-4">📝</div>
          <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
            No blog posts yet
          </h3>
          <p className="text-text-secondary">
            Check back soon for new content!
          </p>
        </div>
      )}
    </>
  );
}
