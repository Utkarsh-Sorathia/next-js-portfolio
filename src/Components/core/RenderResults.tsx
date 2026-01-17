'use client';

import { KBarResults, useMatches } from 'kbar';

export default function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div className="px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-900/50">
            {item}
          </div>
        ) : (
          <div
            className={`px-6 py-3.5 flex items-center justify-between cursor-pointer transition-all ${
              active ? 'bg-blue-600/10 border-l-2 border-blue-500' : 'bg-transparent border-l-2 border-transparent'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg transition-colors ${active ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-800/50 text-zinc-400'}`}>
                {item.section === 'Navigation' && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
                )}
                {item.section === 'Socials' && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                )}
                {item.section === 'Utilities' && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                )}
                {!item.section && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                )}
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-semibold ${active ? 'text-white' : 'text-zinc-300'}`}>{item.name}</span>
                {item.subtitle && (
                    <span className="text-[11px] text-zinc-500 font-medium mt-0.5">{item.subtitle}</span>
                )}
              </div>
            </div>
            {item.shortcut?.length ? (
              <div className="flex items-center gap-1">
                {item.shortcut.map((sc) => (
                  <kbd
                    key={sc}
                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      active ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-zinc-500 border border-white/5'
                    }`}
                  >
                    {sc}
                  </kbd>
                ))}
              </div>
            ) : null}
          </div>
        )
      }
    />
  );
}
