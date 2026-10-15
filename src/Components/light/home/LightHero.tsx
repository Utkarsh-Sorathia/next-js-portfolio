import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Download, MapPin } from 'lucide-react';
import skills from '@/data/skills';
import socialLinks from '@/data/importantLinks';
import { Container, Tile, Eyebrow, ButtonLink, iconBadgeClass } from '../ui';
import { cn } from '@/utils/cn';

// Icons shown in the scrolling stack strip (soft skills excluded).
const stackIcons = skills
  .filter((group) => group.title !== 'Soft Skills')
  .flatMap((group) => group.items)
  .filter((item) => item.icon);

export default function LightHero({ isOpenToWork }: { isOpenToWork: boolean }) {
  return (
    <section id="home" className="pt-24 sm:pt-28">
      <Container>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-12">
          {/* Intro */}
          <Tile className="flex flex-col justify-between p-6 sm:p-10 md:col-span-8 md:row-span-2">
            <div>
              <Eyebrow>Full Stack &amp; Mobile App Developer</Eyebrow>
              <h1 className="mt-5 text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.045em] text-balance text-(--lt-text) sm:text-6xl lg:text-[4.25rem]">
                Hi, I&apos;m Utkarsh.
                <span className="block text-(--lt-muted)">I build web and Android apps that ship.</span>
              </h1>
              <h2 className="sr-only">
                Full Stack &amp; Mobile App Developer specializing in MERN, Next.js and React Native — with multiple apps
                live on Google Play.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-(--lt-muted) sm:text-lg">
                Next.js and the MERN stack on the web, React Native on Android — with apps live on Google Play. 2+
                years turning ideas into production-ready products.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <ButtonLink href="/#contact">
                Get in touch <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/Utkarsh-Sorathia-CV.pdf" variant="secondary" download="Utkarsh-Sorathia-CV.pdf">
                <Download className="h-4 w-4" aria-hidden="true" /> Download CV
              </ButtonLink>
            </div>
          </Tile>

          {/* Photo */}
          <Tile className="relative min-h-[340px] overflow-hidden md:col-span-4 md:row-span-2">
            <Image
              src="/UtkarshSorathia.webp"
              alt="Utkarsh Sorathia"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-2xl bg-white/90 px-3.5 py-2.5 text-sm font-medium text-(--lt-text) backdrop-blur">
              <MapPin className="h-4 w-4 text-(--lt-accent)" aria-hidden="true" />
              Surat, India · IST (UTC+5:30)
            </div>
          </Tile>

          {/* Availability */}
          <Tile className="flex flex-col justify-between gap-6 p-6 md:col-span-4">
            <Eyebrow>Status</Eyebrow>
            <div>
              <p className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-(--lt-text)">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  {isOpenToWork && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--lt-success) opacity-60" />
                  )}
                  <span
                    className={cn(
                      'relative inline-flex h-2.5 w-2.5 rounded-full',
                      isOpenToWork ? 'bg-(--lt-success)' : 'bg-(--lt-border-strong)'
                    )}
                  />
                </span>
                {isOpenToWork ? 'Open to new opportunities' : 'Currently heads-down'}
              </p>
              <p className="mt-1.5 text-sm text-(--lt-muted)">
                {isOpenToWork ? 'Full-time roles and freelance projects.' : 'Still happy to chat about interesting work.'}
              </p>
            </div>
          </Tile>

          {/* Experience */}
          <Tile className="flex flex-col justify-between gap-6 p-6 md:col-span-4">
            <Eyebrow>Experience</Eyebrow>
            <div>
              <p className="text-5xl font-semibold tracking-[-0.05em] text-(--lt-text)">2+ yrs</p>
              <p className="mt-1.5 text-sm text-(--lt-muted)">Building production web and mobile apps.</p>
            </div>
          </Tile>

          {/* Google Play */}
          <Link
            href="/#projects"
            className="group relative flex flex-col justify-between gap-6 overflow-hidden rounded-3xl bg-(--lt-accent) p-6 text-white shadow-(--lt-shadow) transition-transform duration-300 hover:-translate-y-0.5 md:col-span-4"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white/80">Mobile</p>
              <ArrowUpRight
                className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="text-2xl font-semibold leading-tight tracking-tight">Apps live on Google Play</p>
              <p className="mt-1.5 text-sm text-white/80">Built, signed and shipped end to end.</p>
            </div>
          </Link>

          {/* Stack strip */}
          <Tile className="flex flex-col justify-center gap-4 overflow-hidden py-6 md:col-span-8">
            <Eyebrow className="px-6">Daily stack</Eyebrow>
            <div className="lt-marquee-mask overflow-hidden">
              <ul className="lt-marquee flex w-max gap-2.5" aria-label="Technologies I work with">
                {[...stackIcons, ...stackIcons].map((item, i) => (
                  <li
                    key={`${item.title}-${i}`}
                    aria-hidden={i >= stackIcons.length}
                    className="flex shrink-0 items-center gap-2 rounded-full border border-(--lt-border) bg-(--lt-surface-2) py-1.5 pl-1.5 pr-3.5"
                  >
                    <span className={cn('flex h-7 w-7 items-center justify-center rounded-full border', iconBadgeClass(item.icon!))}>
                      <Image src={item.icon!} alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />
                    </span>
                    <span className="whitespace-nowrap text-sm font-medium text-(--lt-text)">{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Tile>

          {/* Socials */}
          <Tile className="flex flex-col justify-between gap-4 p-6 md:col-span-4">
            <Eyebrow>Elsewhere</Eyebrow>
            <ul className="flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    title={link.name}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-(--lt-border) bg-(--lt-surface-2) text-lg text-(--lt-text) transition-colors hover:border-(--lt-border-strong) hover:bg-white"
                  >
                    {link.icon}
                  </a>
                </li>
              ))}
            </ul>
          </Tile>
        </div>
      </Container>
    </section>
  );
}
