'use client';

// Chat window for the light design. Loaded on demand by LightChatWidget so the
// AI SDK and markdown renderer stay out of the initial page bundle.
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { X, ArrowUp, AlertCircle } from 'lucide-react';
import { useAssistantChat, getMessageText } from '@/hooks/useAssistantChat';
import { cn } from '@/utils/cn';

const SUGGESTIONS = [
  { label: 'Top skills', text: "What are Utkarsh's top skills?" },
  { label: 'Latest projects', text: 'Show me his latest projects' },
  { label: 'How to contact', text: 'How can I contact him?' },
];

export default function LightChatPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { messages, isLoading, error, send } = useAssistantChat();
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await send(input)) setInput('');
  };

  return (
    // Stays mounted after first open so the conversation survives closing.
    <div
      role="dialog"
      aria-labelledby="lt-chat-title"
      aria-hidden={!isOpen}
      className={cn(
        'flex h-[600px] max-h-[80vh] w-[min(92vw,420px)] origin-bottom-right flex-col overflow-hidden rounded-3xl border border-(--lt-border) bg-white shadow-[0_24px_60px_-20px_rgb(0_0_0/0.3)] transition-[opacity,transform] duration-200',
        isOpen ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none invisible translate-y-3 scale-95 opacity-0'
      )}
    >
      <div className="flex items-center justify-between border-b border-(--lt-border) px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="relative h-9 w-9 overflow-hidden rounded-full border border-(--lt-border)">
            <Image src="/android-chrome-192x192.png" alt="" fill sizes="36px" className="object-cover" />
          </span>
          <div>
            <h2 id="lt-chat-title" className="text-sm font-semibold text-(--lt-text)">Ask about Utkarsh</h2>
            <p className="flex items-center gap-1.5 text-xs text-(--lt-muted)">
              <span className="h-1.5 w-1.5 rounded-full bg-(--lt-success)" aria-hidden="true" /> AI assistant · powered by Groq
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="flex h-8 w-8 items-center justify-center rounded-full text-(--lt-muted) hover:bg-(--lt-surface-2) hover:text-(--lt-text)"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div role="log" aria-live="polite" aria-labelledby="lt-chat-title" className="flex-1 space-y-3 overflow-y-auto bg-(--lt-surface-2) p-4">
        {messages.length === 0 && (
          <div className="px-2 pt-8 text-center">
            <p className="text-base font-semibold text-(--lt-text)">Hi! I&apos;m Utkarsh&apos;s AI assistant.</p>
            <p className="mt-1 text-sm text-(--lt-muted)">Ask me about his projects, skills, or experience.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => send(s.text)}
                  className="rounded-full border border-(--lt-border) bg-white px-3.5 py-1.5 text-sm text-(--lt-text) transition-colors hover:border-(--lt-accent) hover:text-(--lt-accent-ink)"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => {
          const isUser = m.role === 'user';
          const text = getMessageText(m as Parameters<typeof getMessageText>[0]);
          if (!text) return null;
          return (
            <div key={m.id} className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
              <div
                className={cn(
                  'max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed break-words',
                  isUser
                    ? 'rounded-br-md bg-(--lt-text) text-white'
                    : 'rounded-bl-md border border-(--lt-border) bg-white text-(--lt-text)'
                )}
              >
                <span className="sr-only">{isUser ? 'You said:' : 'Assistant said:'}</span>
                <div className="space-y-2 [&_a]:font-medium [&_a]:underline [&_li]:ml-4 [&_ol]:list-decimal [&_ul]:list-disc">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: (props) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" className={isUser ? 'text-white' : 'text-(--lt-accent-ink)'} />
                      ),
                    }}
                  >
                    {text}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start" aria-label="Assistant is typing">
            <div className="flex gap-1.5 rounded-2xl rounded-bl-md border border-(--lt-border) bg-white px-4 py-3.5">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-(--lt-muted) [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-(--lt-muted) [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-(--lt-muted)" />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-(--lt-border) bg-white p-3">
        {error && (
          <p role="alert" className="mb-2 flex items-center gap-2 rounded-xl bg-[#fef2f2] px-3 py-2 text-xs text-[#b91c1c]">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {error}
          </p>
        )}
        <div className="flex items-center gap-2 rounded-full border border-(--lt-border) bg-(--lt-surface-2) p-1.5 pl-4 transition-shadow focus-within:border-(--lt-accent) focus-within:bg-white focus-within:ring-4 focus-within:ring-(--lt-accent)/10">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something…"
            disabled={isLoading}
            aria-label="Message the AI assistant"
            className="min-w-0 flex-1 bg-transparent text-sm text-(--lt-text) outline-none placeholder:text-[#9a9aa0] focus-visible:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--lt-text) text-white transition-opacity disabled:opacity-30"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
}
