'use client';

import { useKBar } from 'kbar';
import { motion } from 'framer-motion';
import { Command } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';

const CommandBarTrigger = () => {
  const { query } = useKBar();
  const [isMac, setIsMac] = useState(false);
  const pathname = usePathname();
  const isBlogPage = pathname?.startsWith('/blogs');

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  return (
    <div
      className={cn(
        "hidden sm:fixed sm:block top-4 z-[4999] transition-all duration-300",
        isBlogPage 
          ? "right-4" 
          : "right-[160px] md:right-[210px] lg:right-[230px]"
      )}
    >
      <motion.button
        onClick={() => query.toggle()}
        whileTap={{ scale: 0.95 }}
        className="border border-white/[0.25] rounded-full bg-[var(--dialogColor50)] backdrop-blur-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-5 md:px-6 py-3 flex items-center gap-2 sm:gap-3 cursor-pointer transition-all duration-250 group"
      >
        <div className="relative overflow-hidden flex items-center gap-2 sm:gap-3">
          <div className="relative z-10 flex items-center gap-2 sm:gap-3 transition-all duration-300">
            <Command className="w-5 h-5" />
            <span className="text-[var(--textColor)] font-semibold text-sm md:text-base">
              Search
            </span>
          </div>
          <div className="absolute inset-0 text-[var(--primaryColor)] transition-transform transform translate-y-full group-hover:translate-y-0 duration-300 ease-in-out z-10 flex items-center gap-2 sm:gap-3">
            <Command className="w-5 h-5 font-bold" />
            <span className="font-semibold text-sm md:text-base">
              Search
            </span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-1.5 ml-1 opacity-60 group-hover:opacity-100 transition-opacity">
            <kbd className="bg-zinc-800/50 px-1.5 py-1 rounded border border-white/10 text-[10px] text-zinc-400 font-bold">
                {isMac ? '⌘' : 'Ctrl'}
            </kbd>
            <kbd className="bg-zinc-800/50 px-1.5 py-1 rounded border border-white/10 text-[10px] text-zinc-400 font-bold">
                K
            </kbd>
        </div>
      </motion.button>
    </div>
  );
};

export default CommandBarTrigger;
