'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import socialLinks from '@/data/importantLinks';
import { useNewsletter } from '@/hooks/useNewsletter';
import { Container } from './ui';
import { cn } from '@/utils/cn';

const LINKS = [
  {
    title: 'Site',
    items: [
      { name: 'Work', href: '/#projects' },
      { name: 'About', href: '/#about' },
      { name: 'Experience', href: '/#experience' },
      { name: 'Stack', href: '/#skills' },
      { name: 'Services', href: '/#services' },
    ],
  },
  {
    title: 'More',
    items: [
      { name: 'Writing', href: '/blogs' },
      { name: 'Contact', href: '/#contact' },
      { name: 'CV (PDF)', href: '/Utkarsh-Sorathia-CV.pdf' },
      { name: 'RSS', href: '/rss.xml' },
      { name: 'Privacy', href: '/privacy' },
    ],
  },
];

function Newsletter() {
  const { email, setEmail, message, isError, isSubmitting, handleSubscribe } = useNewsletter();
  return (
    <form onSubmit={handleSubscribe} className="w-full max-w-md" aria-labelledby="lt-newsletter-title">
      <h2 id="lt-newsletter-title" className="text-lg font-semibold tracking-tight text-(--lt-text)">
        Get new posts by email
      </h2>
      <p className="mt-1 text-sm text-(--lt-muted)">One email when I publish something new. Unsubscribe anytime.</p>
      <div className="mt-4 flex gap-2 rounded-full border border-(--lt-border) bg-white p-1.5 focus-within:border-(--lt-accent) focus-within:ring-4 focus-within:ring-(--lt-accent)/10">
        <label htmlFor="lt-newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="lt-newsletter-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          disabled={isSubmitting}
          className="min-w-0 flex-1 bg-transparent px-3 text-[15px] text-(--lt-text) outline-none placeholder:text-[#9a9aa0] focus-visible:outline-none"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-(--lt-text) px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#26262b] disabled:opacity-60"
        >
          {isSubmitting ? 'Subscribing…' : 'Subscribe'}
          {!isSubmitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>
      <p
        role="status"
        aria-live="polite"
        className={cn('mt-2 min-h-5 px-3 text-sm', isError ? 'text-[#b91c1c]' : 'text-[#15803d]')}
      >
        {message}
      </p>
    </form>
  );
}

export default function LightFooter() {
  return (
    <footer className="pb-8 pt-6">
      <Container>
        <div className="rounded-3xl border border-(--lt-border) bg-(--lt-surface) p-6 sm:p-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
            <Newsletter />
            <div className="grid grid-cols-2 gap-8 sm:gap-16">
              {LINKS.map((group) => (
                <nav key={group.title} aria-label={group.title}>
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-(--lt-muted)">
                    {group.title}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href} className="text-sm text-(--lt-text) hover:text-(--lt-accent-ink)">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col-reverse gap-5 border-t border-(--lt-border) pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-(--lt-muted)">© {new Date().getFullYear()} Utkarsh Sorathia</p>
            <ul className="flex flex-wrap gap-1">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    title={link.name}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-base text-(--lt-muted) transition-colors hover:bg-(--lt-surface-2) hover:text-(--lt-text)"
                  >
                    {link.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
