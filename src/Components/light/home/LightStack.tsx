import Image from 'next/image';
import skills from '@/data/skills';
import { SkillLevel } from '@/interfaces';
import { Section, SectionHeader, Tile, iconBadgeClass } from '../ui';
import { cn } from '@/utils/cn';

const LEVEL: Record<SkillLevel, { label: string; dots: number }> = {
  [SkillLevel.Expert]: { label: 'Advanced', dots: 3 },
  [SkillLevel.Intermediate]: { label: 'Proficient', dots: 2 },
  [SkillLevel.Beginner]: { label: 'Familiar', dots: 1 },
};

function LevelDots({ level }: { level?: SkillLevel }) {
  if (level === undefined) return null;
  const { label, dots } = LEVEL[level];
  return (
    <span className="ml-auto flex items-center gap-1" title={label}>
      <span className="sr-only">{label}</span>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className={i <= dots ? 'h-1.5 w-1.5 rounded-full bg-(--lt-accent)' : 'h-1.5 w-1.5 rounded-full bg-(--lt-border)'}
        />
      ))}
    </span>
  );
}

export default function LightStack() {
  const groups = skills.filter((group) => group.title !== 'Soft Skills');

  return (
    <Section id="skills">
      <SectionHeader
        eyebrow="Stack"
        title="Tools I reach for"
        description="The dots show how deep I go with each one."
      />
      <div className="columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3">
        {groups.map((group) => (
          <Tile key={group.title} className="mb-3 break-inside-avoid p-6 sm:mb-4">
            <h3 className="text-sm font-semibold text-(--lt-text)">{group.title}</h3>
            <ul className="mt-4 space-y-1">
              {group.items.map((item) => (
                <li
                  key={item.title}
                  className="flex items-center gap-3 rounded-xl px-2 py-1.5 -mx-2 transition-colors hover:bg-(--lt-surface-2)"
                >
                  {item.icon && (
                    <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border', iconBadgeClass(item.icon))}>
                      <Image src={item.icon} alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />
                    </span>
                  )}
                  <span className="text-sm font-medium text-(--lt-text)">{item.title}</span>
                  <LevelDots level={item.level} />
                </li>
              ))}
            </ul>
          </Tile>
        ))}
      </div>
    </Section>
  );
}
