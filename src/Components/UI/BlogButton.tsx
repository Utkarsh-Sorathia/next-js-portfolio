'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BlogButton = () => {
  const [showButton, setShowButton] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [showMobileText, setShowMobileText] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Show text when scroll to top button is not visible (scrollY <= 400)
      // Hide text when scroll to top button appears (scrollY > 400)
      setShowMobileText(window.scrollY <= 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            className="fixed sm:hidden right-4 z-[4999] transition-all duration-300"
            style={{ bottom: scrollY > 400 ? '140px' : '80px' }}
          >
            <Link href="/blogs">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className={`border-2 border-white rounded-full bg-[var(--dialogColor50)] backdrop-blur-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[var(--primaryColor)] hover:bg-[var(--primaryColor)] ${showMobileText ? 'px-4 py-2.5 gap-1.5' : 'w-12 h-12 px-0'}`}
              >
                <BookOpen className={`text-[var(--textColor)] transition-all duration-300 ${showMobileText ? 'w-5 h-5' : 'w-6 h-6'}`} />
                <AnimatePresence>
                  {showMobileText && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[var(--textColor)] font-semibold text-sm whitespace-nowrap ml-1.5 overflow-hidden"
                    >
                      Blogs
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
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

