'use client';

import { useState, useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, AlertCircle } from 'lucide-react';
import { useGoogleReCaptcha } from '@/hooks/useGoogleReCaptcha';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from '@/app/chat.module.css';
import Image from 'next/image';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNudgeVisible, setIsNudgeVisible] = useState(false);
  const [hasSeenNudge, setHasSeenNudge] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [error, setError] = useState<string | null>(null);
  const { messages, sendMessage, status } = useChat();
  const isLoading = status === 'submitted' || status === 'streaming';
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!executeRecaptcha) {
      setError('Security service not ready. Please try again.');
      return;
    }

    try {
      setError(null);
      const token = await executeRecaptcha('chat_message');
      await sendMessage({
        text: input,
      }, {
        headers: { 'x-recaptcha-token': token },
        body: { metadata: { gRecaptchaToken: token } }
      });
      setInput('');
    } catch (err) {
      setError('Security verification failed. Please try again.');
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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

  // Track scroll and window size for dynamic positioning
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setIsMobile(window.innerWidth < 640);

    // Initial check
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const showScrollTop = scrollY > 400;

  return (
    <div
      className="fixed right-4 z-[9999] flex flex-col items-end gap-3 transition-all duration-300"
      style={{
        bottom: showScrollTop ? '76px' : '16px'
      }}
    >
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[92vw] sm:w-[450px] h-[600px] max-h-[85vh] bg-[var(--dialogColor)] rounded-3xl shadow-2xl border border-[var(--borderColor)] flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-[var(--primaryColor)] p-5 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center p-1.5 overflow-hidden">
                  <Image src="/android-chrome-192x192.png" alt="Logo" width={32} height={32} className="object-cover" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-extrabold text-sm sm:text-base leading-none flex items-center gap-2">
                    AI Assistant
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_bg-emerald-400] animate-pulse"></span>
                  </h3>
                  <p className="text-[9px] opacity-90 uppercase tracking-[0.1em] font-bold mt-1.5">Powered by Groq</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-all focus:outline-none active:scale-90"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[var(--bgColor)]/50 scrollbar-thin scrollbar-thumb-[var(--borderColor)]">
              {messages.length === 0 && (
                <div className="text-center text-zinc-500 text-sm mt-10 px-4">
                  <p className="mb-2">👋 Hi there!</p>
                  <p>I'm Utkarsh's virtual assistant. Ask me about his projects, skills, or experience!</p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={async () => {
                        if (executeRecaptcha) {
                          const token = await executeRecaptcha('chat_message');
                          sendMessage({ text: "What are Utkarsh's top skills?" }, {
                            headers: { 'x-recaptcha-token': token },
                            body: { metadata: { gRecaptchaToken: token } }
                          });
                        }
                      }}
                      className="text-[11px] font-bold uppercase tracking-wider bg-[var(--dialogColor)] text-[var(--textColorLight)] border border-[var(--borderColor)] px-4 py-2 rounded-full hover:bg-[var(--primaryColor)] hover:text-white hover:border-[var(--primaryColor)] transition-all duration-300 shadow-sm shadow-black/5 active:scale-95"
                    >
                      Skills?
                    </button>
                    <button
                      onClick={async () => {
                        if (executeRecaptcha) {
                          const token = await executeRecaptcha('chat_message');
                          sendMessage({ text: "Show me his latest projects" }, {
                            headers: { 'x-recaptcha-token': token },
                            body: { metadata: { gRecaptchaToken: token } }
                          });
                        }
                      }}
                      className="text-[11px] font-bold uppercase tracking-wider bg-[var(--dialogColor)] text-[var(--textColorLight)] border border-[var(--borderColor)] px-4 py-2 rounded-full hover:bg-[var(--primaryColor)] hover:text-white hover:border-[var(--primaryColor)] transition-all duration-300 shadow-sm shadow-black/5 active:scale-95"
                    >
                      Projects?
                    </button>
                    <button
                      onClick={async () => {
                        if (executeRecaptcha) {
                          const token = await executeRecaptcha('chat_message');
                          sendMessage({ text: "How can I contact him?" }, {
                            headers: { 'x-recaptcha-token': token },
                            body: { metadata: { gRecaptchaToken: token } }
                          });
                        }
                      }}
                      className="text-[11px] font-bold uppercase tracking-wider bg-[var(--dialogColor)] text-[var(--textColorLight)] border border-[var(--borderColor)] px-4 py-2 rounded-full hover:bg-[var(--primaryColor)] hover:text-white hover:border-[var(--primaryColor)] transition-all duration-300 shadow-sm shadow-black/5 active:scale-95"
                    >
                      Contact?
                    </button>
                  </div>
                </div>
              )}

              {messages.map((m: any) => {
                // Extract text content from parts array or use content directly
                const rawContent = m.parts
                  ? m.parts.map((part: any) => part.type === 'text' ? part.text : '').join('')
                  : m.content || '';

                // Strip out <think>...</think> blocks (and unclosed <think> during streaming)
                const textContent = rawContent.replace(/<think>[\s\S]*?(?:<\/think>|$)/g, '').trim();

                return (
                  <div
                    key={m.id}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm leading-relaxed break-words overflow-hidden ${m.role === 'user'
                        ? 'bg-[var(--primaryColor)] text-white rounded-tr-none'
                        : 'bg-[var(--dialogColor)] text-[var(--textColor)] border border-[var(--borderColor)] rounded-tl-none'
                        }`}
                    >
                      <div className="prose dark:prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-p:mb-4 last:prose-p:mb-0 prose-pre:bg-zinc-200 dark:prose-pre:bg-zinc-900 prose-ul:my-2 prose-li:my-1 break-words">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            a: (props: any) => <a {...props} target="_blank" rel="noopener noreferrer" className="underline font-bold text-[var(--primaryColor)]" />
                          }}
                        >
                          {textContent}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-zinc-800 rounded-2xl rounded-tl-none px-4 py-3 border border-zinc-100 dark:border-zinc-700">
                    <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 bg-[var(--dialogColor)] border-t border-[var(--borderColor)]">
              {error && (
                <div className="mb-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-[10px] text-red-500">
                  <AlertCircle className="w-3 h-3" />
                  {error}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  className="flex-1 bg-[var(--dialogColor50)] text-[var(--textColor)] text-sm rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)]/30 border border-[var(--borderColor)] transition-all placeholder:text-[var(--textColorLight)]/50"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-[var(--primaryColor)] text-white p-2.5 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex items-center justify-end">
        {/* Nudge Bubble */}
        <AnimatePresence>
          {isNudgeVisible && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="group bg-[var(--dialogColor)] px-4 py-3 rounded-2xl shadow-xl border border-[var(--borderColor)] absolute whitespace-nowrap bottom-full mb-3 right-0 sm:right-6 backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--dialogColor50)] border border-[var(--borderColor)] flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/android-chrome-192x192.png"
                    alt="AI Assistant"
                    width={28}
                    height={28}
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-[var(--primaryColor)] tracking-widest leading-none mb-1">AI Assistant</span>
                  <span className="text-xs font-semibold text-[var(--textColor)] leading-tight">Ask me about Utkarsh! 🚀</span>
                </div>
              </div>
              <div className="absolute -bottom-1.5 right-[18px] w-3 h-3 bg-[var(--dialogColor)] border-r border-b border-[var(--borderColor)] rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          onMouseEnter={() => !isOpen && setIsNudgeVisible(true)}
          onMouseLeave={() => !isOpen && setIsNudgeVisible(false)}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`${styles.chatToggle} h-12 w-12 bg-[var(--primaryColor)] rounded-full flex items-center justify-center text-white z-50`}
          aria-label="Open AI Assistant"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Image src="/chatbot-icon.webp" alt="AI Assistant" width={50} height={50} />}
        </motion.button>
      </div>
    </div>
  );
}
