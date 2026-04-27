'use client';

import { KBarProvider, KBarPortal, KBarPositioner, KBarSearch, KBarAnimator, useKBar } from 'kbar';
import { useRouter } from 'next/navigation';
import RenderResults from '@/Components/core/RenderResults';

function KBarContent({ children }: { children: React.ReactNode }) {
  // We use this inner component to access useKBar state
  return (
    <>
      <KBarPortal>
        <KBarPositioner className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[99999] flex items-start justify-center pt-[15vh] px-4">
          <KBarAnimator className="w-full max-w-[600px] bg-[var(--dialogColor)] border border-[var(--borderColor)] rounded-2xl shadow-2xl overflow-hidden scale-in">
            <div className="flex flex-col">
              <KBarSearch
                className="w-full py-5 px-6 bg-transparent outline-none text-lg text-[var(--textColor)] placeholder:text-[var(--textColor50)] border-b border-[var(--borderColor)]"
                placeholder="Type a command or search..."
                autoFocus={typeof window !== 'undefined' && window.innerWidth > 768}
              />
              <RenderResults />
              <div className="px-6 py-4 bg-[var(--dialogColor50)] flex items-center justify-between border-t border-[var(--borderColor)]">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] text-[var(--textColorLight)] font-bold uppercase tracking-widest">
                    <kbd className="bg-[var(--dialogColor)] px-1.5 py-0.5 rounded border border-[var(--borderColor)] text-[var(--textColor)]">Enter</kbd>
                    <span>Select</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-[var(--textColorLight)] font-bold uppercase tracking-widest">
                    <kbd className="bg-[var(--dialogColor)] px-1.5 py-0.5 rounded border border-[var(--borderColor)] text-[var(--textColor)]">↑↓</kbd>
                    <span>Navigate</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[var(--textColorLight)] font-bold uppercase tracking-widest leading-none">
                  <kbd className="bg-[var(--dialogColor)] px-1.5 py-0.5 rounded border border-[var(--borderColor)] text-[var(--textColor)]">Esc</kbd>
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
