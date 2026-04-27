"use client";

import React, { useState, useEffect } from "react";
import { IServiceItem } from "@/interfaces";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import Image from "next/image";
import { cn } from "@/utils/cn";

interface ServiceAccordionProps {
  items: IServiceItem[];
}

export const ServiceAccordion = ({ items }: ServiceAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains('light'));
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('light'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const getIconSrc = (icon: string) => {
    if (isLight) {
      if (icon?.includes("nextjs.webp")) return "/skills/nextjs-dark.svg";
      if (icon?.includes("github-white.webp")) return "/skills/github-dark.svg";
    }
    return icon;
  };

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full flex flex-col gap-4 py-4 md:hidden">
      {items.map((item, idx) => (
        <div
          key={item.id}
          className={cn(
            "rounded-[var(--borderRadius)] border transition-all duration-300 overflow-hidden",
            openIndex === idx
              ? "border-[var(--primaryColor)]/40 bg-[var(--dialogColor)] shadow-sm"
              : "border-[var(--borderColor)] bg-transparent hover:bg-[var(--dialogColor)]/50"
          )}
        >
          {/* Header */}
          <button
            onClick={() => toggle(idx)}
            className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--dialogColor)] border border-[var(--borderColor)] flex items-center justify-center p-2 shadow-sm">
                <Image
                  src={getIconSrc(item.icons[Math.floor(item.icons.length / 2)])} // Main central icon
                  alt={item.title}
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <h3
                className={cn(
                  "text-lg font-semibold transition-colors duration-300 text-[var(--primaryColor)]"
                )}
              >
                {item.title}
              </h3>
            </div>
            <motion.div
              animate={{ rotate: openIndex === idx ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-[var(--textColorLight)] opacity-60"
            >
              <FiChevronDown size={20} />
            </motion.div>
          </button>

          {/* Content */}
          <AnimatePresence initial={false}>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-6 pt-0">
                  <p className="text-sm leading-relaxed text-[var(--textColorLight)] opacity-90 text-justify border-l-2 border-[var(--primaryColor)]/30 pl-4">
                    {item.description}
                  </p>

                  {/* Icons row */}
                  <div className="flex flex-wrap gap-3 mt-6 pl-4">
                    {item.icons.map((icon, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-xl bg-[var(--dialogColor)] border border-[var(--borderColor)] flex items-center justify-center p-2 shadow-sm hover:border-[var(--primaryColor)]/50 transition-colors"
                      >
                        <Image
                          src={getIconSrc(icon)}
                          alt={`${item.title} icon ${i + 1}`}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
