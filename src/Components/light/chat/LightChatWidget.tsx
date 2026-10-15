'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { X } from 'lucide-react';

// The chat window is only downloaded when the visitor shows intent to open it.
const loadPanel = () => import('./LightChatPanel');
const LightChatPanel = dynamic(loadPanel, { ssr: false });
const preload = () => {
  void loadPanel();
};

export default function LightChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end gap-3">
      {hasOpened && <LightChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />}

      <button
        type="button"
        onMouseEnter={preload}
        onFocus={preload}
        onTouchStart={preload}
        onClick={() => {
          setHasOpened(true);
          setIsOpen((v) => !v);
        }}
        // This exact label is used by the ⌘K "Chat with AI" action to open the chat.
        aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
        aria-expanded={isOpen}
        className="group flex h-12 items-center gap-2 rounded-full border border-(--lt-border) bg-white py-1.5 pl-1.5 pr-4 text-sm font-medium text-(--lt-text) shadow-[0_12px_30px_-12px_rgb(0_0_0/0.35)] transition-transform hover:-translate-y-0.5"
      >
        {isOpen ? (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-(--lt-text) text-white">
            <X className="h-4 w-4" aria-hidden="true" />
          </span>
        ) : (
          <Image src="/chatbot-icon.webp" alt="" width={36} height={36} className="h-9 w-9 rounded-full" />
        )}
        <span>{isOpen ? 'Close' : 'Ask AI'}</span>
      </button>
    </div>
  );
}
