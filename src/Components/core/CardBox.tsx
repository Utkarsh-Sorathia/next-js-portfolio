"use client";

import type { CoreComponentsProps } from "@/interfaces";

const CardBox = (props: Readonly<CoreComponentsProps>) => {
  const { children, classNames, onClick, id, elementRef } = props;

  return (
    <div
      id={id}
      onClick={onClick}
      ref={elementRef}
      className={`relative w-full flex flex-col duration-500 border rounded-[var(--borderRadius)] hover:bg-zinc-800/10 hover:border-zinc-500 border-zinc-500 overflow-hidden group ${classNames}`}
      style={{ willChange: 'transform' }}
    >
      {/* White background overlay on hover */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[var(--borderRadius)] z-0" />
      <div className="pointer-events-none absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)] opacity-0 group-hover:opacity-100" />
      {children}
    </div>
  );
};

export default CardBox;
