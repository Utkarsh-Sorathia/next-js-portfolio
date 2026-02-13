'use client';

import { useState, useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, AlertCircle } from 'lucide-react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
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

  // Initial nudge timer (shows after 5s)
  useEffect(() => {
    if (isOpen || hasSeenNudge) return;

    const timer = setTimeout(() => {
      setIsNudgeVisible(true);
      setHasSeenNudge(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen, hasSeenNudge]);

  // Auto-hide nudge timer (hides after 10s)
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
        bottom: showScrollTop ? '136px' : '76px'
      }}
    >
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[90vw] sm:w-[380px] h-[500px] max-h-[70vh] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[var(--primaryColor)] p-4 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-3">
                <Image src="/favicon.ico" alt="Logo" width={24} height={24} />
                <div className="flex flex-col">
                  <h3 className="font-semibold text-sm leading-none flex items-center gap-2">
                    AI Assistant
                    <span className="flex h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" title="System Online"></span>
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <p className="text-[10px] opacity-80 uppercase tracking-wider font-bold">Powered by Groq</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors focus:outline-none"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50 dark:bg-zinc-950/50 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
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
                      className="text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 rounded-full hover:bg-[var(--primaryColor)] hover:text-white transition-colors"
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
                      className="text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 rounded-full hover:bg-[var(--primaryColor)] hover:text-white transition-colors"
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
                      className="text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 rounded-full hover:bg-[var(--primaryColor)] hover:text-white transition-colors"
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
                      className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm shadow-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-[var(--primaryColor)] text-white rounded-tr-none'
                          : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-100 dark:border-zinc-700 rounded-tl-none'
                      }`}
                    >
                      <div className="prose dark:prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-p:mb-4 last:prose-p:mb-0 prose-pre:bg-zinc-200 dark:prose-pre:bg-zinc-900 prose-ul:my-2 prose-li:my-1">
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
            <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700">
              {error && (
                <div className="mb-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-[10px] text-red-500">
                  <AlertCircle className="w-3 h-3" />
                  {error}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--primaryColor)]/50 transition-all placeholder:text-zinc-400"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask something..."
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
              initial={{ opacity: 0, y: 10, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, x: 20, scale: 0.9 }}
              className="group bg-white dark:bg-zinc-800 px-3.5 py-2.5 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-zinc-200 dark:border-zinc-700 absolute whitespace-nowrap right-full sm:right-0 bottom-0 sm:bottom-full mr-3 sm:mr-0 mb-0 sm:mb-3"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 overflow-hidden flex-shrink-0">
                  <Image 
                    src="/android-chrome-192x192.png" 
                    alt="AI Assistant" 
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-[var(--primaryColor)] tracking-widest leading-none mb-1">AI Assistant</span>
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100 leading-tight">Ask me about Utkarsh! 🚀</span>
                </div>
              </div>
              {/* Arrow - Desktop (Bottom) / Mobile (Right) */}
              <div className="hidden sm:block absolute -bottom-1.5 right-4 w-3 h-3 bg-white dark:bg-zinc-800 border-r border-b border-zinc-200 dark:border-zinc-700 rotate-45"></div>
              <div className="sm:hidden absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 bg-white dark:bg-zinc-800 border-t border-r border-zinc-200 dark:border-zinc-700 rotate-45"></div>
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
        {isOpen ? <X className="w-5 h-5" /> : <Image src="/chatbot-icon.png" alt="AI Assistant" width={50} height={50} />}
      </motion.button>
      </div>
    </div>
  );
}
