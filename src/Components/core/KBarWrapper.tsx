'use client';

import { KBarProvider, KBarPortal, KBarPositioner, KBarSearch, KBarAnimator, useKBar } from 'kbar';
import { useRouter } from 'next/navigation';
import RenderResults from '@/Components/core/RenderResults';
import { isLightDesign } from '@/config/design';

// Palette styles per site design (dark values are the original ones).
const styles = isLightDesign
  ? {
      positioner: 'fixed inset-0 bg-black/25 backdrop-blur-[2px] z-[99999] flex items-start justify-center pt-[15vh] px-4',
      animator: 'w-full max-w-[600px] bg-white border border-[#e5e5e2] rounded-3xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] overflow-hidden scale-in',
      search: 'w-full py-5 px-6 bg-transparent outline-none text-lg text-[#0b0b0c] placeholder:text-[#9a9aa0] border-b border-[#e5e5e2]',
      footer: 'px-6 py-4 bg-[#f9f9f8] flex items-center justify-between border-t border-[#e5e5e2]',
      hint: 'flex items-center gap-1.5 text-[10px] text-[#55555b] font-bold uppercase tracking-widest',
      kbd: 'bg-white px-1.5 py-0.5 rounded border border-[#d4d4d0] text-[#0b0b0c]',
    }
  : {
      positioner: 'fixed inset-0 bg-black/80 backdrop-blur-[2px] z-[99999] flex items-start justify-center pt-[15vh] px-4',
      animator: 'w-full max-w-[600px] bg-[#0c0c0e] border border-white/10 rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden scale-in',
      search: 'w-full py-5 px-6 bg-transparent outline-none text-lg text-white placeholder:text-zinc-500 border-b border-white/5',
      footer: 'px-6 py-4 bg-zinc-900/30 flex items-center justify-between border-t border-white/5',
      hint: 'flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold uppercase tracking-widest',
      kbd: 'bg-zinc-800 px-1.5 py-0.5 rounded border border-white/10 text-white',
    };

function KBarContent({ children }: { children: React.ReactNode }) {
  // We use this inner component to access useKBar state
  return (
    <>
      <KBarPortal>
        <KBarPositioner className={styles.positioner}>
          <KBarAnimator className={styles.animator}>
            <div className="flex flex-col">
              <KBarSearch
                className={styles.search}
                placeholder="Type a command or search..."
                autoFocus={typeof window !== 'undefined' && window.innerWidth > 768}
              />
              <RenderResults />
              <div className={styles.footer}>
                <div className="flex items-center gap-4">
                  <div className={styles.hint}>
                    <kbd className={styles.kbd}>Enter</kbd>
                    <span>Select</span>
                  </div>
                  <div className={styles.hint}>
                    <kbd className={styles.kbd}>↑↓</kbd>
                    <span>Navigate</span>
                  </div>
                </div>
                <div className={`${styles.hint} leading-none`}>
                  <kbd className={styles.kbd}>Esc</kbd>
                  <span>Close</span>
                </div>
              </div>
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </>
  );
}

export default function KBarWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const actions = [
    {
      id: 'home',
      name: 'Home',
      shortcut: ['g', 'h'],
      keywords: 'home index profile',
      perform: () => router.push('/'),
      section: 'Navigation',
      subtitle: 'Back to the start',
    },
    {
      id: 'about',
      name: 'About',
      shortcut: ['g', 'a'],
      keywords: 'about me education profile',
      perform: () => {
        const element = document.getElementById('about');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          router.push('/#about');
        }
      },
      section: 'Navigation',
      subtitle: 'Get to know me',
    },
    {
      id: 'skills',
      name: 'Skills',
      shortcut: ['g', 's'],
      keywords: 'skills tech stack technologies',
      perform: () => {
        const element = document.getElementById('skills');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          router.push('/#skills');
        }
      },
      section: 'Navigation',
      subtitle: 'My technical stack',
    },
    {
      id: 'projects',
      name: 'Projects',
      shortcut: ['g', 'p'],
      keywords: 'projects work portfolio layout',
      perform: () => {
        const element = document.getElementById('projects');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          router.push('/#projects');
        }
      },
      section: 'Navigation',
      subtitle: 'View my recent works',
    },
    {
      id: 'experience',
      name: 'Experience',
      shortcut: ['g', 'e'],
      keywords: 'experience work history jobs',
      perform: () => {
        const element = document.getElementById('experience');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          router.push('/#experience');
        }
      },
      section: 'Navigation',
      subtitle: 'My professional journey',
    },
    {
      id: 'services',
      name: 'Services',
      shortcut: ['g', 'v'],
      keywords: 'services offerings what i do',
      perform: () => {
        const element = document.getElementById('services');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          router.push('/#services');
        }
      },
      section: 'Navigation',
      subtitle: 'What I can do for you',
    },
    {
      id: 'blogs',
      name: 'Blogs',
      shortcut: ['g', 'b'],
      keywords: 'blogs writing tutorials reading',
      perform: () => router.push('/blogs'),
      section: 'Navigation',
      subtitle: 'Read my latest thoughts',
    },
    {
      id: 'contact',
      name: 'Contact',
      shortcut: ['g', 'c'],
      keywords: 'contact email message reach out',
      perform: () => {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          router.push('/#contact');
        }
      },
      section: 'Navigation',
      subtitle: 'Get in touch with me',
    },
    // Socials
    {
      id: 'linkedin',
      name: 'LinkedIn',
      shortcut: ['s', 'l'],
      keywords: 'linkedin social connect professional',
      perform: () => window.open('https://www.linkedin.com/in/utkarsh-sorathia-a9292b22a', '_blank'),
      section: 'Socials',
      subtitle: 'Connect professionally',
    },
    {
      id: 'github',
      name: 'GitHub',
      shortcut: ['s', 'g'],
      keywords: 'github social code repo',
      perform: () => window.open('https://github.com/Utkarsh-Sorathia', '_blank'),
      section: 'Socials',
      subtitle: 'View my repositories',
    },

    // Utilities
    {
      id: 'resume',
      name: 'Download Resume',
      shortcut: ['d', 'r'],
      keywords: 'resume cv download pdf',
      perform: () => {
        const link = document.createElement('a');
        link.href = '/Utkarsh-Sorathia-CV.pdf';
        link.download = 'UtkarshSorathia.pdf';
        link.click();
      },
      section: 'Utilities',
      subtitle: 'Get a copy of my CV',
    },
    {
      id: 'chat',
      name: 'Chat with AI',
      shortcut: ['c'],
      keywords: 'ai assistant chat bot help',
      perform: () => {
        // Find the chat button and click it
        const chatButton = document.querySelector('button[aria-label="Open AI Assistant"]') as HTMLButtonElement;
        if (chatButton) chatButton.click();
      },
      section: 'Utilities',
      subtitle: 'Talk to my virtual self',
    },
  ];

  return (
    <KBarProvider actions={actions}>
      <KBarContent>
        {children}
      </KBarContent>
    </KBarProvider>
  );
}
