'use client';

import { useState } from 'react';
import { Check, Link2 } from 'lucide-react';
import { SiLinkedin, SiWhatsapp, SiX } from 'react-icons/si';

export default function LightShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const links = [
    { name: 'X', icon: SiX, href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
    { name: 'LinkedIn', icon: SiLinkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { name: 'WhatsApp', icon: SiWhatsapp, href: `https://api.whatsapp.com/send?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}` },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  const btn =
    'flex h-10 w-10 items-center justify-center rounded-full border border-(--lt-border) bg-white text-(--lt-text) transition-colors hover:border-(--lt-border-strong) hover:bg-(--lt-surface-2)';

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-(--lt-muted)">Share</span>
      {links.map(({ name, icon: Icon, href }) => (
        <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${name}`} title={`Share on ${name}`} className={btn}>
          <Icon className="h-4 w-4" aria-hidden="true" />
        </a>
      ))}
      <button type="button" onClick={copy} aria-label={copied ? 'Link copied' : 'Copy link'} title="Copy link" className={btn}>
        {copied ? <Check className="h-4 w-4 text-(--lt-success)" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
      </button>
      <span className="sr-only" aria-live="polite">{copied ? 'Link copied to clipboard' : ''}</span>
    </div>
  );
}
