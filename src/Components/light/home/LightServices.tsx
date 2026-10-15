import services from '@/data/services';
import { Section, SectionHeader, Tile } from '../ui';

export default function LightServices() {
  return (
    <Section id="services">
      <SectionHeader eyebrow="Services" title="How I can help" />
      <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {services.map((service, index) => (
          <li key={service.id}>
            <Tile as="article" className="flex h-full flex-col p-6">
              <span className="font-mono text-xs text-(--lt-muted)">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-(--lt-text)">{service.title}</h3>
              <p className="mt-1 text-sm font-medium text-(--lt-accent-ink)">{service.shortDescription}</p>
              <p className="mt-3 text-sm leading-relaxed text-(--lt-muted)">{service.description}</p>
            </Tile>
          </li>
        ))}
      </ol>
    </Section>
  );
}
