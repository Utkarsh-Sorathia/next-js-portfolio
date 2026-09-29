"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { IBlogPost } from "@/interfaces";
import BlogCard from "@/Components/UI/BlogCard";
import Breadcrumbs from "@/Components/common/Breadcrumbs";
import SectionTitle from "@/Components/common/SectionTitle";
import { useDebounce } from "@/hooks/useDebounce";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BlogsPageClientProps {
  posts: IBlogPost[];
  breadcrumbs: BreadcrumbItem[];
}

const PAGE_SIZE = 9;

export default function BlogsPageClient({ posts, breadcrumbs }: BlogsPageClientProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const isSearching = debouncedQuery.trim().length > 0;

  const filteredPosts = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return posts;

    const terms = q.split(/\s+/).filter(Boolean);

    return posts
      .map((post) => {
        const title = post.title.toLowerCase();
        const excerpt = (post.excerpt ?? "").toLowerCase();
        let score = 0;
        for (const term of terms) {
          if (title.includes(term)) score += 3;
          if (excerpt.includes(term)) score += 1;
        }
        return { post, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ post }) => post);
  }, [posts, debouncedQuery]);

  const visiblePosts = isSearching ? filteredPosts : filteredPosts.slice(0, visibleCount);
  const showLoadMore = !isSearching && visibleCount < posts.length;

  const handleLoadMore = () => setVisibleCount((prev) => prev + PAGE_SIZE);
  const handleClear = () => setQuery("");

  return (
    <>
      {/* Breadcrumbs + Search Bar Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Breadcrumbs items={breadcrumbs} />
        <div className="relative w-full sm:w-72 sm:mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            aria-label="Search blog posts"
            className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl pl-11 pr-11 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[var(--primaryColor)]/50 focus:ring-2 focus:ring-[var(--primaryColor)]/20 transition-all"
          />
          {query && (
            <button
              onClick={handleClear}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Header Section */}
      <div className="mt-4">
        <SectionTitle>
          My <span className="text-(--primaryColor)">Blogs</span>
        </SectionTitle>
        <p className="text-center text-base sm:text-lg text-(--textColorLight) max-w-2xl mx-auto mt-4 sm:mt-6">
          Practical tutorials and insights on Next.js, React, and full-stack development — drawn from real production work.
        </p>
      </div>

      {/* Blog Posts Grid */}
      {visiblePosts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {visiblePosts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {showLoadMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-[var(--primaryColor)] text-white rounded-lg hover:opacity-90 transition-all duration-200 active:scale-95 shadow-lg shadow-[var(--primaryColor)]/20"
          >
            Load More
          </button>
        </div>
      )}

      {/* No Results (Searching) */}
      {isSearching && filteredPosts.length === 0 && (
        <div className="text-center py-12 sm:py-16 lg:py-20">
          <div className="text-4xl sm:text-6xl mb-4">🔍</div>
          <h3 className="text-xl sm:text-2xl font-semibold text-[var(--textColor)] mb-2">
            No posts found
          </h3>
          <p className="text-[var(--textColorLight)]">
            Try a different keyword or clear the search.
          </p>
        </div>
      )}

      {/* No Posts At All */}
      {!isSearching && posts.length === 0 && (
        <div className="text-center py-12 sm:py-16 lg:py-20">
          <div className="text-4xl sm:text-6xl mb-4">📝</div>
          <h3 className="text-xl sm:text-2xl font-semibold text-[var(--textColor)] mb-2">
            No blog posts yet
          </h3>
          <p className="text-[var(--textColorLight)]">
            Check back soon for new content!
          </p>
        </div>
      )}
    </>
  );
}
