'use client';

import { useState } from 'react';
import { Check, Copy, ArrowUpRight } from 'lucide-react';
import Strings from '@/constants/strings';
import socialLinks from '@/data/importantLinks';
import { Section, Tile } from '../ui';
import LightContactForm from './LightContactForm';

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(Strings.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${Strings.email}`;
    }
  };
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white/10 p-1.5 pl-4">
      <a href={`mailto:${Strings.email}`} className="min-w-0 flex-1 truncate text-[15px] font-medium text-white hover:underline">
        {Strings.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Email copied' : 'Copy email address'}
        className="flex h-9 shrink-0 items-center gap-1.5 rounded-xl bg-white px-3 text-sm font-medium text-(--lt-text) transition-colors hover:bg-white/90"
      >
        {copied ? <Check className="h-4 w-4 text-(--lt-success)" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        {copied ? 'Copied' : 'Copy'}
      </button>
      <span className="sr-only" aria-live="polite">{copied ? 'Email address copied to clipboard' : ''}</span>
    </div>
  );
}

export default function LightContact() {
  const profiles = socialLinks.filter((l) => ['LinkedIn', 'GitHub', 'Upwork'].includes(l.name ?? ''));

  return (
    <Section id="contact">
      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12">
        <div className="flex flex-col justify-between gap-10 rounded-3xl bg-(--lt-text) p-6 text-white sm:p-10 lg:col-span-5">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white/60">Contact</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
              Have a project or a role in mind?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70">
              I&apos;m always open to discussing new projects, creative ideas, or the right full-time opportunity.
            </p>
          </div>
          <div className="space-y-3">
            <CopyEmail />
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {profiles.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 rounded-2xl border border-white/15 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    {link.name}
                    <ArrowUpRight className="h-4 w-4 text-white/60" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Tile className="p-6 sm:p-10 lg:col-span-7">
          <LightContactForm />
        </Tile>
      </div>
    </Section>
  );
}
