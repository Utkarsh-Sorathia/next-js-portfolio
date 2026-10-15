'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useKBar } from 'kbar';
import { Menu, X, Search } from 'lucide-react';
import { cn } from '@/utils/cn';

const NAV = [
  { name: 'Work', href: '/#projects' },
  { name: 'About', href: '/#about' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Stack', href: '/#skills' },
  { name: 'Writing', href: '/blogs' },
];

export default function LightHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { query } = useKBar();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform));
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  const goHome = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      if (window.location.hash) router.push('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isActive = (href: string) => (href === '/blogs' ? pathname.startsWith('/blogs') : false);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-full focus:bg-(--lt-text) focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to main content
      </a>

      <header className="fixed inset-x-0 top-0 z-[5000] px-3 pt-3 sm:px-4">
        <div
          className={cn(
            'mx-auto flex max-w-[1320px] items-center justify-between gap-3 rounded-full border py-2 pl-2 pr-2 transition-all duration-300 sm:pl-3',
            scrolled || open
              ? 'border-(--lt-border) bg-white/85 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.18)] backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          )}
        >
          <Link href="/" onClick={goHome} className="flex shrink-0 items-center gap-2.5 rounded-full pr-2">
            <span className="relative h-9 w-9 overflow-hidden rounded-full border border-(--lt-border) bg-white">
              <Image src="/android-chrome-192x192.png" alt="" fill sizes="36px" priority className="object-cover" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-(--lt-text)">Utkarsh Sorathia</span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={cn(
                  'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                  isActive(item.href)
                    ? 'bg-(--lt-text) text-white'
                    : 'text-(--lt-muted) hover:bg-black/[0.04] hover:text-(--lt-text)'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                query.toggle();
              }}
              aria-label="Open search command palette"
              className="flex h-9 items-center gap-2 rounded-full border border-(--lt-border) bg-white px-3 text-sm text-(--lt-muted) transition-colors hover:border-(--lt-border-strong) hover:text-(--lt-text)"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              <kbd className="hidden font-mono text-[11px] lg:inline">{isMac ? '⌘K' : 'Ctrl K'}</kbd>
            </button>

            <Link
              href="/#contact"
              className="hidden h-9 items-center rounded-full bg-(--lt-text) px-4 text-sm font-medium text-white transition-colors hover:bg-[#26262b] sm:inline-flex"
            >
              Hire me
            </Link>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full text-(--lt-text) hover:bg-black/[0.05] md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="lt-mobile-menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav
            id="lt-mobile-menu"
            aria-label="Mobile navigation"
            className="mx-auto mt-2 max-w-[1320px] rounded-3xl border border-(--lt-border) bg-white p-2 shadow-[0_16px_40px_-16px_rgb(0_0_0/0.25)] md:hidden"
          >
            {[...NAV, { name: 'Contact', href: '/#contact' }].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base font-medium text-(--lt-text) hover:bg-(--lt-surface-2)"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
