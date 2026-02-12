'use client';

import { IBlogPost } from '@/interfaces';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import CardBox from '../core/CardBox';
import Column from '../core/Column';
import Row from '../core/Row';
import { getTimeSincePublished } from '@/lib/sanity';
import { getBlogAltText, validateAltText } from '@/utils/imageValidation';
import BlogImageWithLoader from './BlogImageWithLoader';

interface BlogCardProps {
  post: IBlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const timeSincePublished = getTimeSincePublished(post.publishedAt);

  return (
    <article className="h-full">
      <CardBox classNames="group h-full flex flex-col overflow-hidden hover:bg-zinc-800/10 hover:border-zinc-500 border-zinc-500">
        {/* Image */}
        {post.image?.asset?.url ? (
          <Link href={`/blogs/${post.slug.current}`} className="block">
            <div className="relative w-full aspect-video overflow-hidden cursor-pointer">
              <BlogImageWithLoader
                src={post.image.asset.url}
                alt={validateAltText(post.image.asset.altText, getBlogAltText(post.title), 'Blog post image')}
                className="w-full h-full transition-transform duration-300"
                roundedClass="rounded-t-[var(--borderRadius)]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none" />
            </div>
          </Link>
        ) : (
          <Link href={`/blogs/${post.slug.current}`} className="block">
            <div className="relative w-full aspect-video overflow-hidden cursor-pointer bg-gray-800 flex items-center justify-center">
              <div className="text-gray-400 text-4xl">📝</div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Link>
        )}

        {/* Content */}
        <Column classNames="p-4 sm:p-6 flex-1 justify-between">
          <div>
            {/* Meta Information */}
            <Row classNames="items-center gap-3 sm:gap-4 text-xs sm:text-sm text-[var(--textColorLight)] mb-3">
              <div className="flex items-center">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span>{publishedDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span>{timeSincePublished}</span>
              </div>
            </Row>

            {/* Title */}
            <Link href={`/blogs/${post.slug.current}`}>
              <h2 className="text-lg sm:text-xl font-semibold text-[var(--textColor)] mb-3 group-hover:text-[var(--primaryColor)] transition-colors line-clamp-2 leading-tight cursor-pointer hover:text-[var(--primaryColor)]">
                {post.title}
              </h2>
            </Link>

            {/* Excerpt */}
                <p className="text-[var(--textColorLight)] text-sm leading-relaxed mb-4 line-clamp-3">
                  {(() => {
                    let excerpt = '';
                    if (typeof post.body === 'string') {
                      // Clean markdown: remove headers (#), bold (**), italic (*), code (`), links, etc.
                      excerpt = post.body
                        .replace(/^#{1,6}\s+/gm, '') // Remove headers
                        .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
                        .replace(/\*([^*]+)\*/g, '$1') // Remove italic
                        .replace(/`([^`]+)`/g, '$1') // Remove inline code
                        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links
                        .replace(/\[|\]|\(|\)|`|#|\*/g, ''); // Remove any remaining markdown special chars
                      // Clean up extra spaces
                      excerpt = excerpt.replace(/\s+/g, ' ').trim();
                      return excerpt.substring(0, 150) + (excerpt.length > 150 ? '...' : '');
                    }
                    return post.body?.[0]?.children?.[0]?.text || 'No excerpt available...';
                  })()}
                </p>
          </div>

          {/* Read More Link */}
          <Link
            href={`/blogs/${post.slug.current}`}
            className="inline-flex items-center text-[var(--primaryColor)] hover:text-[var(--primaryColor)]/80 font-medium group-hover:translate-x-1 transition-all duration-300 mt-auto text-sm"
          >
            Read More
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </Column>
      </CardBox>
    </article>
  );
}
