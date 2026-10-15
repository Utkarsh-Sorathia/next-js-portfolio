import Link from 'next/link';
import { cn } from '@/utils/cn';

// Shared building blocks for the light "bento" design.

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-[1320px] px-4 sm:px-6', className)}>{children}</div>;
}

// A bento tile: white surface, hairline border, large radius.
export function Tile({
  children,
  className,
  as: Tag = 'div',
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section' | 'li';
  interactive?: boolean;
}) {
  return (
    <Tag
      className={cn(
        'relative rounded-3xl border border-(--lt-border) bg-(--lt-surface) shadow-(--lt-shadow)',
        interactive &&
          'transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-(--lt-border-strong) hover:shadow-(--lt-shadow-hover)',
        className
      )}
    >
      {children}
    </Tag>
  );
}

// Small monospace label used above headings and inside tiles.
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-(--lt-muted)', className)}>
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-(--lt-text) sm:text-4xl">{title}</h2>
        {description && <p className="mt-3 text-base leading-relaxed text-(--lt-muted)">{description}</p>}
      </div>
      {action}
    </div>
  );
}

// A homepage section with consistent spacing and an anchor id (used by nav + ⌘K).
export function Section({ id, children, className }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={cn('scroll-mt-24 py-12 sm:py-16', className)}>
      <Container>{children}</Container>
    </section>
  );
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  external?: boolean;
  download?: boolean | string;
  ariaLabel?: string;
};

const buttonStyles = {
  primary:
    'bg-(--lt-text) text-white hover:bg-[#26262b] shadow-[0_1px_0_rgb(255_255_255/0.15)_inset,0_6px_16px_-8px_rgb(0_0_0/0.5)]',
  secondary: 'bg-(--lt-surface) text-(--lt-text) border border-(--lt-border-strong) hover:bg-(--lt-surface-2)',
  ghost: 'text-(--lt-accent-ink) hover:bg-(--lt-accent-soft)',
};

export function ButtonLink({ href, children, variant = 'primary', className, external, download, ariaLabel }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors active:scale-[0.98]',
    buttonStyles[variant],
    className
  );

  if (external || download) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(download ? { download: typeof download === 'string' ? download : true } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-(--lt-border) bg-(--lt-surface-2) px-2.5 py-1 text-xs font-medium text-(--lt-muted)',
        className
      )}
    >
      {children}
    </span>
  );
}

// Logos drawn in white (made for the dark site) need a dark badge to be visible.
const WHITE_ICONS = new Set(['/skills/nextjs.webp', '/skills/github-white.webp', '/skills/aws.webp']);

export const iconBadgeClass = (src: string) =>
  WHITE_ICONS.has(src) ? 'border-transparent bg-(--lt-text)' : 'border-(--lt-border) bg-white';
