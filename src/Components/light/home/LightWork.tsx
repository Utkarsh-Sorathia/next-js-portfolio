import Image from 'next/image';
import { ArrowUpRight, Lock } from 'lucide-react';
import { SiGithub, SiGoogleplay } from 'react-icons/si';
import projects from '@/data/projects';
import { IProjectItem, ProjectType } from '@/interfaces';
import { Section, SectionHeader, Tile, Chip, iconBadgeClass } from '../ui';
import { cn } from '@/utils/cn';

const TYPE_LABEL: Record<ProjectType, string> = {
  [ProjectType.JobWork]: 'Client work',
  [ProjectType.Personal]: 'Personal',
  [ProjectType.Freelance]: 'Freelance',
};

const isMobileApp = (p: IProjectItem) => p.tags?.includes('React Native') ?? false;
const isPlayStore = (url?: string) => !!url && url.includes('play.google.com');

function ProjectLinks({ project }: { project: IProjectItem }) {
  if (!project.url && !project.githubUrl) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-(--lt-muted)">
        <Lock className="h-3.5 w-3.5" aria-hidden="true" /> Private client project
      </span>
    );
  }
  return (
    <div className="flex flex-wrap gap-2">
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-(--lt-text) px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#26262b]"
        >
          {isPlayStore(project.url) ? (
            <>
              <SiGoogleplay className="h-3.5 w-3.5" aria-hidden="true" /> Google Play
            </>
          ) : (
            <>
              Live site <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </>
          )}
          <span className="sr-only"> — {project.title}</span>
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-(--lt-border-strong) px-3.5 py-1.5 text-sm font-medium text-(--lt-text) transition-colors hover:bg-(--lt-surface-2)"
        >
          <SiGithub className="h-3.5 w-3.5" aria-hidden="true" /> Source
          <span className="sr-only"> code for {project.title}</span>
        </a>
      )}
    </div>
  );
}

function Tags({ tags, max }: { tags?: string[]; max: number }) {
  if (!tags?.length) return null;
  const shown = tags.slice(0, max);
  const rest = tags.length - shown.length;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {shown.map((tag) => (
        <li key={tag}>
          <Chip>{tag}</Chip>
        </li>
      ))}
      {rest > 0 && (
        <li>
          <Chip>+{rest}</Chip>
        </li>
      )}
    </ul>
  );
}

// A simple phone frame: shows the first screenshot if the project has one,
// otherwise the project's icon and name.
function PhoneMock({ project }: { project: IProjectItem }) {
  const shot = project.screenshots?.[0];
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto hidden h-[300px] w-[150px] shrink-0 rounded-[2rem] sm:block border-[6px] border-(--lt-text) bg-white shadow-[0_24px_48px_-20px_rgb(0_0_0/0.45)]"
    >
      <div className="absolute left-1/2 top-1.5 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-(--lt-text)" />
      <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
        {shot ? (
          <Image src={shot} alt="" fill sizes="150px" className="object-cover" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-(--lt-accent-soft) to-white px-3 text-center">
            <span className={cn('flex h-14 w-14 items-center justify-center rounded-2xl border shadow-sm', iconBadgeClass(project.icon))}>
              <Image src={project.icon} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
            </span>
            <span className="text-xs font-semibold leading-tight text-(--lt-text)">
              {project.title.replace(/\s*\(Android\)\s*/, '')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function FeaturedProject({ project }: { project: IProjectItem }) {
  return (
    <Tile as="article" interactive className="flex flex-col gap-8 overflow-hidden p-6 sm:flex-row sm:items-center sm:p-8">
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Chip className="border-transparent bg-(--lt-accent-soft) text-(--lt-accent-ink)">Android app</Chip>
          {project.projectType !== undefined && <Chip>{TYPE_LABEL[project.projectType]}</Chip>}
        </div>
        <h3 className="text-2xl font-semibold tracking-tight text-(--lt-text)">
          {project.title.replace(/\s*\(Android\)\s*/, '')}
        </h3>
        <p className="text-[15px] leading-relaxed text-(--lt-muted)">{project.description}</p>
        <Tags tags={project.tags} max={5} />
        <div className="mt-1">
          <ProjectLinks project={project} />
        </div>
      </div>
      <PhoneMock project={project} />
    </Tile>
  );
}

function ProjectCard({ project }: { project: IProjectItem }) {
  return (
    <Tile as="article" interactive className="flex h-full flex-col gap-4 p-6">
      <div className="flex items-start justify-between gap-3">
        <span className={cn('flex h-11 w-11 items-center justify-center rounded-2xl border', iconBadgeClass(project.icon))}>
          <Image src={project.icon} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
        </span>
        <div className="flex flex-wrap justify-end gap-1.5">
          {project.isCurrent && (
            <Chip className="border-transparent bg-[#e8f7ee] text-[#15803d]">In progress</Chip>
          )}
          {project.projectType !== undefined && <Chip>{TYPE_LABEL[project.projectType]}</Chip>}
        </div>
      </div>
      <h3 className="text-lg font-semibold leading-snug tracking-tight text-(--lt-text)">{project.title}</h3>
      <p className="text-sm leading-relaxed text-(--lt-muted)">{project.description}</p>
      <div className="mt-auto flex flex-col gap-4 pt-2">
        <Tags tags={project.tags} max={4} />
        <ProjectLinks project={project} />
      </div>
    </Tile>
  );
}

export default function LightWork() {
  const featured = projects.filter(isMobileApp);
  const others = projects.filter((p) => !isMobileApp(p));

  return (
    <Section id="projects">
      <SectionHeader
        eyebrow="Selected work"
        title="Things I've built and shipped"
        description="Android apps on Google Play, client platforms and a few personal builds."
      />
      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
        {featured.map((project) => (
          <FeaturedProject key={project.id} project={project} />
        ))}
      </div>
      <ul className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {others.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
