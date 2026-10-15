import { ArrowRight } from 'lucide-react';
import { getAllBlogPosts } from '@/lib/sanity';
import { IBlogPost } from '@/interfaces';
import LightBlogCard from '../blog/LightBlogCard';
import { Section, SectionHeader, ButtonLink } from '../ui';

// Latest posts on the homepage — also gives Google a link from the strongest
// page on the site to each recent post.
export default async function LightWriting() {
  const posts: IBlogPost[] = (await getAllBlogPosts()) ?? [];
  const latest = posts.slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <Section id="writing">
      <SectionHeader
        eyebrow="Writing"
        title="Notes from the work"
        description="Practical write-ups on Next.js, React and full-stack development — drawn from real production work."
        action={
          <ButtonLink href="/blogs" variant="secondary" className="self-start sm:self-auto">
            All posts <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        }
      />
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {latest.map((post) => (
          <li key={post._id}>
            <LightBlogCard post={post} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
