'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import styles from '@/app/chat.module.css';
import Image from 'next/image';

// The chat window (AI SDK + markdown renderer) is the heaviest client code on the
// site, so it's only downloaded when the visitor shows intent to open it.
const loadChatPanel = () => import('./ChatPanel');
const ChatPanel = dynamic(loadChatPanel, { ssr: false });
const preloadChatPanel = () => { void loadChatPanel(); };

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  // Mount the panel on first open and keep it mounted so the conversation survives closing.
  const [hasOpened, setHasOpened] = useState(false);
  const [isNudgeVisible, setIsNudgeVisible] = useState(false);
  const [hasSeenNudge, setHasSeenNudge] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Initial nudge timer (shows after 4s)
  useEffect(() => {
    if (isOpen || hasSeenNudge) return;

    const timer = setTimeout(() => {
      setIsNudgeVisible(true);
      setHasSeenNudge(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, [isOpen, hasSeenNudge]);

  // Auto-hide nudge timer (hides after 5s)
  useEffect(() => {
    if (!isNudgeVisible) return;

    const timer = setTimeout(() => {
      setIsNudgeVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isNudgeVisible]);

  // Track scroll for dynamic positioning
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showScrollTop = scrollY > 400;

  // Offset accounts for the scroll-to-top button height (60px) + gap (16px)
  const SCROLL_TOP_BUTTON_OFFSET = '76px';
  const DEFAULT_BOTTOM = '16px';

  return (
    <div
      className="fixed right-4 z-9999 flex flex-col items-end gap-3 transition-all duration-300"
      style={{
        bottom: showScrollTop ? SCROLL_TOP_BUTTON_OFFSET : DEFAULT_BOTTOM
      }}
    >
      {/* Chat Window */}
      {hasOpened && <ChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />}

      <div className="relative flex items-center justify-end">
        {/* Nudge Bubble */}
        <AnimatePresence>
          {isNudgeVisible && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, x: 20, scale: 0.9 }}
              role="status"
              className="group bg-zinc-800 px-3.5 py-2.5 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-zinc-700 absolute whitespace-nowrap right-full sm:right-0 bottom-0 sm:bottom-full mr-3 sm:mr-0 mb-0 sm:mb-3"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-700 overflow-hidden shrink-0">
                  <Image
                    src="/android-chrome-192x192.png"
                    alt="AI Assistant Icon"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-(--primaryColor) tracking-widest leading-none mb-1">AI Assistant</span>
                  <span className="text-xs font-semibold text-zinc-100 leading-tight">Ask me about Utkarsh! 🚀</span>
                </div>
              </div>
              {/* Arrow - Desktop (Bottom) / Mobile (Right) */}
              <div className="hidden sm:block absolute -bottom-1.5 right-4 w-3 h-3 bg-zinc-800 border-r border-b border-zinc-700 rotate-45"></div>
              <div className="sm:hidden absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 bg-zinc-800 border-t border-r border-zinc-700 rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          onMouseEnter={() => { preloadChatPanel(); if (!isOpen) setIsNudgeVisible(true); }}
          onFocus={preloadChatPanel}
          onTouchStart={preloadChatPanel}
          onMouseLeave={() => !isOpen && setIsNudgeVisible(false)}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setHasOpened(true); setIsOpen(!isOpen); }}
          className={`${styles.chatToggle} h-12 w-12 bg-(--primaryColor) rounded-full flex items-center justify-center text-white z-50 border-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0`}
          aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Image src="/chatbot-icon.webp" alt="Chat with AI" width={50} height={50} />}
        </motion.button>
      </div>
    </div>
  );
}
