import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { IBlogPost } from '@/interfaces';
import { getBlogExcerpt, formatDate } from '@/utils/blog';
import { getBlogAltText, validateAltText } from '@/utils/imageValidation';
import BlogImageWithLoader from '@/Components/UI/BlogImageWithLoader';

// Blog post card for the light design. The whole card is one link.
export default function LightBlogCard({ post, priority = false }: { post: IBlogPost; priority?: boolean }) {
  const excerpt = getBlogExcerpt(post, 140);
  const href = `/blogs/${post.slug.current}`;

  return (
    <article className="group h-full">
      <Link
        href={href}
        className="flex h-full flex-col overflow-hidden rounded-3xl border border-(--lt-border) bg-(--lt-surface) shadow-(--lt-shadow) transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-(--lt-border-strong) hover:shadow-(--lt-shadow-hover)"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-(--lt-surface-2)">
          {post.image?.asset?.url ? (
            <BlogImageWithLoader
              src={post.image.asset.url}
              alt={validateAltText(post.image.asset.altText, getBlogAltText(post.title), 'Blog post image')}
              className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
              roundedClass=""
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              blurDataURL={post.image.asset.lqip}
              priority={priority}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl" aria-hidden="true">
              📝
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
          <time dateTime={post.publishedAt} className="font-mono text-[11px] uppercase tracking-[0.12em] text-(--lt-muted)">
            {formatDate(post.publishedAt)}
          </time>
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-(--lt-text) group-hover:text-(--lt-accent-ink)">
            {post.title}
          </h3>
          {excerpt && <p className="line-clamp-3 text-sm leading-relaxed text-(--lt-muted)">{excerpt}</p>}
          <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-(--lt-text)">
            Read post
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
