"use client";

import type { CoreComponentsProps } from "@/interfaces";

const CardBox = (props: Readonly<CoreComponentsProps>) => {
  const { children, classNames, onClick, id, elementRef } = props;

  return (
    <div
      id={id}
      onClick={onClick}
      ref={elementRef}
      className={`relative w-full flex flex-col transition-all duration-500 border rounded-[var(--borderRadius)] bg-[var(--cardBg)] border-[var(--borderColor)] hover:border-[var(--primaryColor)] overflow-hidden group shadow-sm ${classNames}`}
      style={{ willChange: 'transform' }}
    >
      {/* ⚪ The "Skill Card" Hover Overlay */}
      <div className="absolute inset-0 bg-[var(--primaryColor)]/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[var(--borderRadius)] z-0" />
      
      {/* 🔦 Subtle Radial Shine */}
      <div className="pointer-events-none absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)] opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[var(--primaryColor)]/[0.05] to-transparent" />
      
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default CardBox;
