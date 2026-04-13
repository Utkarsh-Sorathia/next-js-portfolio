"use client";

import type { CoreComponentsProps } from "@/interfaces";

const CardBox = (props: Readonly<CoreComponentsProps>) => {
  const { children, classNames, onClick, id, elementRef } = props;

  return (
    <div
      id={id}
      onClick={onClick}
      ref={elementRef}
      className={`relative w-full flex flex-col transition-all duration-500 border rounded-[var(--borderRadius)] dark:bg-[var(--primaryColor5)] bg-[var(--primaryColor5)] border-white/15 hover:border-zinc-500 overflow-hidden group shadow-[2px_4px_16px_0px_rgba(0,0,0,0.1)_inset] ${classNames}`}
      style={{ willChange: 'transform' }}
    >
      {/* ⚪ The "Skill Card" White Glow Overlay */}
      <div className="absolute inset-0 bg-white/[0.12] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[var(--borderRadius)] z-0" />
      
      {/* 🔦 Subtle Radial Shine */}
      <div className="pointer-events-none absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)] opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/5 to-transparent" />
      
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default CardBox;
