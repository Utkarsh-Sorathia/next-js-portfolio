import { GraduationCap } from 'lucide-react';
import education from '@/data/education';
import { Section, SectionHeader, Tile, Eyebrow, ButtonLink } from '../ui';

// "77 %" is a percentage, "8.5" is a CGPA — label each correctly.
const scoreLabel = (score: string) => (score.includes('%') ? `${score.replace(/\s+%/, '%')}` : `CGPA ${score}`);

export default function LightAbout() {
  return (
    <Section id="about">
      <SectionHeader eyebrow="About" title="Full stack, end to end" />
      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12">
        <Tile className="flex flex-col justify-between gap-8 p-6 sm:p-10 lg:col-span-7">
          <div className="space-y-5">
            <p className="text-xl leading-relaxed tracking-tight text-(--lt-text) sm:text-2xl">
              I enjoy working across the full stack — from crafting pixel-precise UIs with{' '}
              <span className="font-semibold text-(--lt-accent-ink)">React &amp; Next.js</span> to designing{' '}
              <span className="font-semibold text-(--lt-accent-ink)">Node.js APIs</span> and{' '}
              <span className="font-semibold text-(--lt-accent-ink)">MongoDB</span> schemas that hold up under real
              traffic.
            </p>
            <p className="text-base leading-relaxed text-(--lt-muted) sm:text-lg">
              I care about clean architecture, honest performance, and shipping things that actually work — not just
              look good in a demo. When I&apos;m not building, I&apos;m usually writing about what I learned the hard
              way.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <ButtonLink href="/Utkarsh-Sorathia-CV.pdf" download="Utkarsh-Sorathia-CV.pdf">
              Download CV
            </ButtonLink>
            <ButtonLink href="/blogs" variant="secondary">
              Read my writing
            </ButtonLink>
          </div>
        </Tile>

        <Tile className="p-6 sm:p-8 lg:col-span-5">
          <Eyebrow className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" aria-hidden="true" /> Education
          </Eyebrow>
          <ol className="mt-6 space-y-6">
            {education.map((entry) =>
              entry.educations.map((edu) => (
                <li key={`${entry.degree}-${edu.institute}`} className="relative border-l border-(--lt-border) pl-5">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-(--lt-accent)"
                  />
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-(--lt-muted)">
                    {edu.startDate} – {edu.endDate ?? 'Present'}
                  </p>
                  <h3 className="mt-1 font-semibold leading-snug text-(--lt-text)">{entry.degree}</h3>
                  <p className="mt-0.5 text-sm text-(--lt-muted)">
                    {edu.institute.replace(/\s*\(B\.E\.\)\s*$/, '')} · {scoreLabel(edu.cgpa)}
                  </p>
                </li>
              ))
            )}
          </ol>
        </Tile>
      </div>
    </Section>
  );
}
