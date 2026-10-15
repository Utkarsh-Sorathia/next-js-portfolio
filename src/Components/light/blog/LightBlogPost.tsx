import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { IBlogPost } from '@/interfaces';
import Breadcrumbs from '@/Components/common/Breadcrumbs';
import MarkdownRenderer from '@/Components/UI/MarkdownRenderer';
import ReadingProgressBar from '@/Components/UI/ReadingProgressBar';
import BlogImageWithLoader from '@/Components/UI/BlogImageWithLoader';
import { getBlogAltText } from '@/utils/imageValidation';
import { baseURL } from '@/utils/api';
import { Container, Eyebrow } from '../ui';
import LightBlogCard from './LightBlogCard';
import LightShareButtons from './LightShareButtons';

interface LightBlogPostProps {
  post: IBlogPost;
  bodyHtml: string;
  publishedDate: string;
  readingTime: string;
}

export default function LightBlogPost({ post, bodyHtml, publishedDate, readingTime }: LightBlogPostProps) {
  const url = `${baseURL}/blogs/${post.slug.current}`;
  const recommended = post.recommended ?? [];

  return (
    <>
      <ReadingProgressBar />
      <Container className="pb-16 pt-28 sm:pt-32">
        <article className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[
              { name: 'Blogs', url: `${baseURL}/blogs` },
              { name: post.title, url },
            ]}
          />

          <header className="mt-2">
            <Eyebrow>
              <time dateTime={post.publishedAt}>{publishedDate}</time> · {readingTime}
            </Eyebrow>
            <h1 className="mt-4 text-3xl font-semibold leading-[1.1] tracking-[-0.035em] text-(--lt-text) sm:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center gap-3">
              <span className="relative h-10 w-10 overflow-hidden rounded-full border border-(--lt-border)">
                <Image src="/android-chrome-192x192.png" alt="" fill sizes="40px" className="object-cover" />
              </span>
              <div className="text-sm">
                <p className="font-medium text-(--lt-text)">Utkarsh Sorathia</p>
                <p className="text-(--lt-muted)">Full Stack &amp; Mobile App Developer</p>
              </div>
            </div>
          </header>

          {post.image?.asset?.url && (
            <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-3xl border border-(--lt-border) bg-(--lt-surface-2)">
              <BlogImageWithLoader
                src={post.image.asset.url}
                alt={post.image.asset.altText || getBlogAltText(post.title)}
                className="h-full w-full"
                roundedClass="rounded-3xl"
                priority
                blurDataURL={post.image.asset.lqip}
              />
            </div>
          )}

          {bodyHtml && (
            <div className="mt-10 text-[17px] leading-[1.75]">
              <MarkdownRenderer html={bodyHtml} />
            </div>
          )}

          <div className="mt-12 border-t border-(--lt-border) pt-8">
            <LightShareButtons url={url} title={post.title} />
          </div>

          <aside className="mt-10 flex flex-col gap-5 rounded-3xl border border-(--lt-border) bg-(--lt-surface) p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="font-semibold text-(--lt-text)">Written by Utkarsh Sorathia</p>
              <p className="mt-1 text-sm leading-relaxed text-(--lt-muted)">
                Full Stack &amp; Mobile App Developer building with Next.js, the MERN stack and React Native — and writing
                about what I learn along the way.
              </p>
            </div>
            <Link
              href="/blogs"
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-(--lt-text) px-5 py-2.5 text-sm font-medium text-white hover:bg-[#26262b] sm:self-auto"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All posts
            </Link>
          </aside>
        </article>

        {recommended.length > 0 && (
          <section className="mx-auto mt-20 max-w-[1320px]" aria-labelledby="lt-recommended">
            <h2 id="lt-recommended" className="mb-6 text-2xl font-semibold tracking-tight text-(--lt-text)">
              Keep reading
            </h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {recommended.map((rp) => (
                <li key={rp._id}>
                  <LightBlogCard post={rp} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </>
  );
}
