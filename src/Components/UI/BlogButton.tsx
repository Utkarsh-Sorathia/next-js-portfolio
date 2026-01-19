'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BlogButton = () => {
  const [showButton, setShowButton] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isNudgeVisible, setIsNudgeVisible] = useState(false);
  const [hasSeenNudge, setHasSeenNudge] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial nudge timer (shows after 8s - slightly after chat nudge)
  useEffect(() => {
    if (hasSeenNudge) return;

    const timer = setTimeout(() => {
      setIsNudgeVisible(true);
      setHasSeenNudge(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, [hasSeenNudge]);

  // Auto-hide nudge timer (hides after 10s)
  useEffect(() => {
    if (!isNudgeVisible) return;

    const timer = setTimeout(() => {
      setIsNudgeVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isNudgeVisible]);

  const showScrollTop = scrollY > 400;

  // Don't show button on blogs pages
  if (pathname?.startsWith('/blogs')) {
    return null;
  }

  return (
    <>
      {/* Mobile: Bottom Right */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed sm:hidden right-4 z-[4999] transition-all duration-300"
            style={{ 
              bottom: scrollY > 400 ? '204px' : '144px',
              willChange: 'transform, opacity'
            }}
          >
            <div className="relative flex items-center justify-end">
              {/* Nudge Bubble */}
              <AnimatePresence>
                {isNudgeVisible && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="bg-white dark:bg-zinc-800 px-3.5 py-2.5 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-zinc-200 dark:border-zinc-700 absolute whitespace-nowrap bottom-full mb-3 right-0"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center flex-shrink-0 text-[var(--primaryColor)]">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-[var(--primaryColor)] tracking-widest leading-none mb-1">Articles</span>
                        <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100 leading-tight">Read Blogs! ✍️</span>
                      </div>
                    </div>
                    {/* Arrow (Bottom) centered above 48px button */}
                    <div className="absolute -bottom-1.5 right-[18px] w-3 h-3 bg-white dark:bg-zinc-800 border-r border-b border-zinc-200 dark:border-zinc-700 rotate-45"></div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Link href="/blogs">
                <motion.div
                  onMouseEnter={() => setIsNudgeVisible(true)}
                  onMouseLeave={() => setIsNudgeVisible(false)}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 border-2 border-white rounded-full bg-[var(--dialogColor50)] backdrop-blur-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[var(--primaryColor)] hover:bg-[var(--primaryColor)]"
                >
                  <BookOpen className="text-[var(--textColor)] w-6 h-6 transition-all duration-300" />
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop: Top Right */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ willChange: 'transform, opacity' }}
            className="hidden sm:fixed sm:block top-4 right-4 z-[4999]"
          >
            <Link href="/blogs">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="border border-white/[0.25] rounded-full bg-[var(--dialogColor50)] backdrop-blur-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-5 md:px-6 py-3 flex items-center gap-2 sm:gap-3 cursor-pointer transition-all duration-250"
              >
                <span className="flex items-center gap-2 sm:gap-3 text-[var(--textColor)] font-semibold text-sm md:text-base transition-colors duration-300 hover:text-[var(--primaryColor)]"
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="hidden lg:inline">Read My Blogs</span>
                  <span className="lg:hidden">Blogs</span>
                </span>
              </motion.div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BlogButton;

