"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

export const NameAnimation = ({
  words,
  duration = 5000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(timer);
  }, [words, duration, isMobile]);

  const isName = (text: string) => text.toLowerCase().includes("utkarsh");

  const Suffix = () => (
    <span className="inline-flex items-center gap-1.5 ml-2 md:ml-3 text-[0.6em] md:text-[0.7em] align-middle pointer-events-none">
      <span>🧑‍💻</span>
      <span className="hidden md:inline">🚀</span>
    </span>
  );

  const renderContent = (word: string) => {
    const hasPeriod = word.endsWith(".");
    const base = hasPeriod ? word.slice(0, -1) : word;
    const shouldShowSuffix = isName(word);

    return (
      <span className="inline-flex items-center whitespace-nowrap">
        {base}
        {shouldShowSuffix && <Suffix />}
        {hasPeriod && <span>.</span>}
      </span>
    );
  };

  if (isMobile) {
    return (
      <span className={cn("inline-flex items-center font-bold text-[var(--primaryColor)] ml-2", className)}>
        {renderContent(words[0])}
      </span>
    );
  }

  return (
    <div className={cn("relative inline-grid grid-cols-1 grid-rows-1 ml-2 md:ml-4 align-baseline", className)}>
      {/* Ghost elements – essential for 0.00 CLS */}
      {words.map((word, i) => (
        <span 
          key={`ghost-${i}`} 
          className="invisible pointer-events-none col-start-1 row-start-1 font-bold whitespace-nowrap inline-flex items-center"
          aria-hidden="true"
        >
          {renderContent(word)}
        </span>
      ))}

      {/* Actual Animated text */}
      <div className="col-start-1 row-start-1 flex items-center justify-start">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={isFirstRender ? { opacity: 1, filter: "blur(0px)", y: 0 } : { opacity: 0, filter: "blur(8px)", y: 5 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(8px)", y: -5 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="font-bold text-[var(--primaryColor)] whitespace-nowrap inline-flex items-center"
          >
            {renderContent(words[index])}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};
