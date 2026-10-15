import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import experience from '@/data/experience';
import { Section, SectionHeader, Tile, Chip } from '../ui';

export default function LightExperience() {
  return (
    <Section id="experience">
      <SectionHeader eyebrow="Experience" title="Where I've worked" />
      <ol className="space-y-3 sm:space-y-4">
        {experience.map((job) => {
          const isCurrent = job.endDate === 'Present';
          return (
            <li key={`${job.company}-${job.startDate}`}>
              <Tile as="article" className="grid grid-cols-1 gap-6 p-6 sm:p-8 md:grid-cols-[220px_1fr] md:gap-10">
                <div className="flex items-start gap-4 md:flex-col md:gap-3">
                  {job.companyLogo && (
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-(--lt-border) bg-white">
                      <Image
                        src={job.companyLogo}
                        alt={`${job.company} logo`}
                        width={48}
                        height={48}
                        className="h-full w-full object-contain"
                      />
                    </span>
                  )}
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-(--lt-muted)">
                      {job.startDate} – {job.endDate}
                    </p>
                    {job.location && <p className="mt-1 text-sm text-(--lt-muted)">{job.location}</p>}
                    {isCurrent && (
                      <Chip className="mt-2 border-transparent bg-[#e8f7ee] text-[#15803d]">Current role</Chip>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-(--lt-text)">{job.position}</h3>
                  {job.companyLink ? (
                    <a
                      href={job.companyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 inline-flex items-center gap-1 font-medium text-(--lt-accent-ink) hover:underline"
                    >
                      {job.company} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <p className="mt-0.5 font-medium text-(--lt-accent-ink)">{job.company}</p>
                  )}
                  <ul className="mt-5 space-y-2.5">
                    {job.description.map((point) => (
                      <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-(--lt-muted)">
                        <span aria-hidden="true" className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-(--lt-text)" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Tile>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
