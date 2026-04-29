'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { INavItem } from '@/interfaces'
import Image from 'next/image'
import { useKBar } from 'kbar'
import { Command, BookOpen, Menu, X } from 'lucide-react'

const Header = ({
  navItems,
  className,
}: {
  navItems: INavItem[]
  className?: string
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { query } = useKBar();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    // Close the mobile menu immediately
    setIsOpen(false);

    // Specific logic for Home link
    if (link === '/') {
      if (pathname === '/') {
        // If there's a hash, clear it using the router
        if (window.location.hash) {
          router.push('/');
        }
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        e.preventDefault();
      }
    }
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-[5000] bg-[#050505] border-b border-white/5",
      className
    )}>
      {/* Top Bar Container */}
      <div className="container mx-auto px-4 md:px-6 py-5 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, '/')}
          className="flex items-center gap-3 shrink-0 group cursor-pointer"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 group-hover:border-[var(--primaryColor)] transition-all">
            <Image
              src="/android-chrome-192x192.png"
              alt="Utkarsh Sorathia"
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-base md:text-xl font-bold text-[var(--primaryColor)] leading-tight transition-colors">
              Utkarsh Sorathia
            </span>
            <span className="text-[10px] md:text-[11px] uppercase font-semibold text-[var(--textColorLight)] tracking-[0.15em] mt-1 group-hover:text-zinc-400 transition-colors">
              Full Stack Developer
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              onClick={(e) => handleNavClick(e, item.link)}
              className="text-sm font-medium text-[var(--textColorLight)] hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Blogs Button (Desktop) */}
          <Link
            href="/blogs"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-white text-sm font-semibold hover:bg-zinc-800 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>Blogs</span>
          </Link>

          {/* Search Button */}
          <button
            onClick={() => {
              setIsOpen(false);
              query.toggle();
            }}
            className="flex items-center gap-2 md:gap-3 px-2.5 md:px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/20 text-zinc-300 hover:text-white transition-all group shadow-[0_0_15px_rgba(0,0,0,0.5)] active:scale-95"
            aria-label="Search"
          >
            <div className="flex items-center gap-2">
              <Command className="w-4 h-4 text-[var(--primaryColor)]" />
              <span className="hidden sm:inline text-xs font-semibold">Search...</span>
            </div>
            <div className="hidden lg:flex items-center gap-1 opacity-60">
              <kbd className="bg-zinc-800 px-1 py-0.5 rounded text-[9px] font-bold border border-white/5">Ctrl</kbd>
              <kbd className="bg-zinc-800 px-1 py-0.5 rounded text-[9px] font-bold border border-white/5">K</kbd>
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-1.5 text-zinc-400 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6 text-[var(--primaryColor)]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="lg:hidden bg-[#050505] border-t border-white/5 overflow-hidden"
          >
            <nav className="flex flex-col py-2 items-center text-center px-6">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  onClick={(e) => handleNavClick(e, item.link)}
                  className="text-lg font-medium text-zinc-400 hover:text-white transition-all py-3 w-full block rounded-lg hover:bg-white/5 active:bg-white/10"
                >
                  {item.name}
                </Link>
              ))}
              {/* Add Blogs link for mobile drawer */}
              <Link
                href="/blogs"
                onClick={(e) => handleNavClick(e, '/blogs')}
                className="text-lg font-medium text-[var(--primaryColor)] hover:text-[var(--primaryColor)]/80 transition-all py-3 w-full block rounded-lg hover:bg-[var(--primaryColor)]/5 active:bg-[var(--primaryColor)]/10 border-t border-white/5"
              >
                Blogs
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header

