'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { IBlogPost } from '@/interfaces';
import { useDebounce } from '@/hooks/useDebounce';
import { Container, Eyebrow } from '../ui';
import LightBlogCard from './LightBlogCard';

const PAGE_SIZE = 9;

export default function LightBlogsList({ posts }: { posts: IBlogPost[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const isSearching = debouncedQuery.trim().length > 0;

  // Same ranking as the dark design: title matches outrank excerpt matches.
  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return posts;
    const terms = q.split(/\s+/).filter(Boolean);
    return posts
      .map((post) => {
        const title = post.title.toLowerCase();
        const excerpt = (post.excerpt ?? '').toLowerCase();
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

  const showLoadMore = !isSearching && visibleCount < posts.length;

  return (
    <Container className="pb-16 pt-28 sm:pt-32">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <Eyebrow>Writing</Eyebrow>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-(--lt-text) sm:text-5xl">Notes from the work</h1>
          <p className="mt-3 text-base leading-relaxed text-(--lt-muted) sm:text-lg">
            Practical tutorials and insights on Next.js, React, and full-stack development — drawn from real production
            work.
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--lt-muted)" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts…"
            aria-label="Search blog posts"
            className="w-full rounded-full border border-(--lt-border) bg-white py-3 pl-11 pr-11 text-[15px] text-(--lt-text) outline-none placeholder:text-[#9a9aa0] focus:border-(--lt-accent) focus:ring-4 focus:ring-(--lt-accent)/10 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-(--lt-muted) hover:bg-(--lt-surface-2) hover:text-(--lt-text)"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {isSearching ? `${filtered.length} posts found` : ''}
      </p>

      {/* Every card stays in the HTML (hidden past the "Load more" cutoff) so
          crawlers can follow a link to every post from this page. */}
      {filtered.length > 0 && (
        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {filtered.map((post, index) => (
            <li key={post._id} className={isSearching || index < visibleCount ? 'h-full' : 'hidden'}>
              <LightBlogCard post={post} priority={index < 3} />
            </li>
          ))}
        </ul>
      )}

      {showLoadMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
            className="rounded-full border border-(--lt-border-strong) bg-white px-6 py-3 text-sm font-medium text-(--lt-text) transition-colors hover:bg-(--lt-surface-2)"
          >
            Load more posts
          </button>
        </div>
      )}

      {isSearching && filtered.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-lg font-semibold text-(--lt-text)">No posts found</p>
          <p className="mt-1 text-(--lt-muted)">Try a different keyword or clear the search.</p>
        </div>
      )}

      {!isSearching && posts.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-lg font-semibold text-(--lt-text)">No posts yet</p>
          <p className="mt-1 text-(--lt-muted)">Check back soon.</p>
        </div>
      )}
    </Container>
  );
}
