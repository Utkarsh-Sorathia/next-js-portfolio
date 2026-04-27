'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/app/blog.module.css';
import Image from 'next/image';

const BlogButton = () => {
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

  // Initial nudge timer (shows after 12s)
  useEffect(() => {
    if (hasSeenNudge) return;

    const timer = setTimeout(() => {
      setIsNudgeVisible(true);
      setHasSeenNudge(true);
    }, 12000);

    return () => clearTimeout(timer);
  }, [hasSeenNudge]);

  // Auto-hide nudge timer (hides after 5s)
  useEffect(() => {
    if (!isNudgeVisible) return;

    const timer = setTimeout(() => {
      setIsNudgeVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isNudgeVisible]);

  // Don't show button on blogs pages
  if (pathname?.startsWith('/blogs')) {
    return null;
  }

  return (
    <>
      {/* Mobile: Bottom Right */}
      <div
        className="fixed sm:hidden right-4 z-[4999] transition-all duration-300"
        style={{
          bottom: scrollY > 400 ? '144px' : '76px',
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
                className="bg-[var(--dialogColor)] px-3.5 py-2.5 rounded-2xl shadow-xl border border-[var(--borderColor)] absolute whitespace-nowrap bottom-full mb-3 right-0"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[var(--dialogColor50)] border border-[var(--borderColor)] flex items-center justify-center flex-shrink-0 text-[var(--primaryColor)]">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-[var(--primaryColor)] tracking-widest leading-none mb-1">Articles</span>
                    <span className="text-xs font-semibold text-[var(--textColor)] leading-tight">Read Blogs! ✍️</span>
                  </div>
                </div>
                <div className="absolute -bottom-1.5 right-[18px] w-3 h-3 bg-[var(--dialogColor)] border-r border-b border-[var(--borderColor)] rotate-45"></div>
              </motion.div>
            )}
          </AnimatePresence>

          <Link href="/blogs">
            <motion.button
              onTouchStart={() => setIsNudgeVisible(true)}
              onTouchEnd={() => setTimeout(() => setIsNudgeVisible(false), 2000)}
              whileTap={{ scale: 0.9 }}
              className={styles.blogBtn}
            >
              <Image src="/blog-icon.webp" alt="Blog" width={24} height={24} />
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Desktop: Top Right */}
      <div
        className="hidden sm:fixed sm:block top-4 right-4 z-[4999]"
      >
        <Link href="/blogs">
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="border border-[var(--borderColor)] rounded-full bg-[var(--dialogColor50)] backdrop-blur-sm shadow-sm px-5 md:px-6 py-3 flex items-center gap-2 sm:gap-3 cursor-pointer transition-all duration-250 group"
          >
            <span className="flex items-center gap-2 sm:gap-3 text-[var(--textColor)] font-semibold text-sm md:text-base transition-colors duration-300 group">
              <div className="relative overflow-hidden flex items-center gap-2 sm:gap-3">
                <div className="relative z-10 flex items-center gap-2 sm:gap-3 transition-all duration-300">
                  <BookOpen className="w-5 h-5" />
                  <span className="hidden lg:inline">Read My Blogs</span>
                  <span className="lg:hidden">Blogs</span>
                </div>
                <div className="absolute inset-0 text-[var(--primaryColor)] transition-transform transform translate-y-full group-hover:translate-y-0 duration-300 ease-in-out z-10 flex items-center gap-2 sm:gap-3">
                  <BookOpen className="w-5 h-5 font-bold" />
                  <span className="hidden lg:inline">Read My Blogs</span>
                  <span className="lg:hidden">Blogs</span>
                </div>
              </div>
            </span>
          </motion.div>
        </Link>
      </div>
    </>
  );
};

export default BlogButton;

