'use client';

import { useState } from 'react';
import { MdMail, MdCheck } from 'react-icons/md';
import { BsArrowRight } from 'react-icons/bs';
import Strings from '@/constants/strings';

export default function CopyEmailCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(Strings.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex flex-col lg:flex-row items-center justify-center lg:justify-between p-3 lg:p-5 bg-white/5 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100/10 dark:border-zinc-800/50 backdrop-blur-sm group hover:border-[var(--primaryColor)]/30 transition-all duration-300 w-full text-left"
      aria-label={copied ? 'Email copied!' : 'Copy email address'}
    >
      <div className="flex flex-col lg:flex-row lg:flex-1 items-center gap-1.5 lg:gap-6 overflow-hidden">
        <div className="p-2.5 lg:p-3.5 bg-[var(--primaryColor)]/10 rounded-xl text-[var(--primaryColor)] shrink-0">
          <MdMail className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="overflow-hidden text-center lg:text-left">
          <p className="text-[9px] lg:text-xs font-bold uppercase tracking-widest text-[var(--primaryColor)] mb-0.5 lg:mb-1 opacity-80">Email</p>
          <p className="text-white font-semibold truncate text-xs lg:text-base">{Strings.email}</p>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-end gap-3 text-xs font-bold uppercase tracking-tight text-[var(--primaryColor)] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap min-w-[100px]">
        {copied ? (
          <>
            <span>Copied!</span>
            <MdCheck className="w-4 h-4" />
          </>
        ) : (
          <>
            <span>Copy</span>
            <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </div>
    </button>
  );
}
