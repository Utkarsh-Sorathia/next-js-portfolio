"use client";

import { IExperienceItem } from "../../interfaces";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

interface ExperienceCardProps {
  data: IExperienceItem[];
}

const ExperienceCard = ({ data }: ExperienceCardProps) => {
  return (
    <section className="w-full py-0 md:py-8 md:px-2 relative">
      <div className="relative">
        {/* Desktop center line */}
        <div className="hidden md:block absolute left-1/2 w-[2px] top-0 bottom-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(67,97,238,0.3)_5%,rgba(67,97,238,0.3)_68%,transparent_100%)] transform -translate-x-1/2"></div>

        {data.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div key={index} className="mb-10 last:mb-0 relative md:mb-12">

              {/* ── MOBILE LAYOUT: Clean Typography ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="md:hidden relative pl-14 mx-2"
              >
                {/* Left vertical accent line — runs full height of the entry */}
                <div className="absolute left-[21px] top-0 bottom-0 w-[2px] bg-[var(--primaryColor)]/40" />

                {/* Logo sitting ON the line as a circular bullet */}
                <div className="absolute left-0 top-0 z-10 w-11 h-11 overflow-hidden">
                  {item.companyLogo && (
                    <Image
                      src={item.companyLogo}
                      alt={`${item.company} logo`}
                      width={44}
                      height={44}
                      className="object-contain rounded-full border-2 border-[var(--primaryColor)]/60 w-11 h-11"
                      priority={index === 0}
                    />
                  )}
                </div>

                {/* Text content */}
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold text-[var(--primaryColor)] leading-snug">
                    {item.position}
                  </h3>
                  {item.companyLink ? (
                    <Link
                      href={item.companyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium opacity-90 hover:opacity-100 hover:text-[var(--primaryColor)] transition-colors"
                    >
                      {item.company}
                    </Link>
                  ) : (
                    <p className="text-lg font-medium opacity-90">{item.company}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--primaryColor)]/10 text-[var(--primaryColor)] border border-[var(--primaryColor)]/20 whitespace-nowrap">
                      {item.startDate} – {item.endDate}
                    </span>
                    {item.location && (
                      <span className="text-sm opacity-60 truncate">
                        📍 {item.location}
                      </span>
                    )}
                  </div>

                  <ul className="mt-3 space-y-2">
                    {item.description.map((point, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-base opacity-80 leading-relaxed"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primaryColor)]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* ── DESKTOP LAYOUT: Alternating timeline ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                viewport={{ once: true }}
                className={`hidden md:flex md:w-full items-start gap-8 ${
                  isLeft ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Content Card */}
                <div className="w-[47%]">
                  <div
                    className="relative p-6 transition-all duration-500 border rounded-[var(--borderRadius)] border-white/10 hover:border-zinc-500 group overflow-hidden shadow-[2px_4px_16px_0px_rgba(0,0,0,0.1)_inset]"
                  >
                    <div className="absolute inset-0 bg-white/[0.12] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[var(--borderRadius)] z-0" />
                    
                    <div className="relative z-10 flex flex-col xl:flex-row items-start gap-4">
                      {item.companyLink ? (
                        <Link href={item.companyLink} target="_blank" rel="noopener noreferrer" className="shrink-0">
                          {item.companyLogo && (
                            <Image
                              src={item.companyLogo}
                              alt={`${item.company} logo`}
                              width={64}
                              height={64}
                              className="w-16 h-16 object-contain rounded-lg"
                            />
                          )}
                        </Link>
                      ) : (
                        item.companyLogo && (
                          <Image
                            src={item.companyLogo}
                            alt={`${item.company} logo`}
                            width={64}
                            height={64}
                            className="w-16 h-16 object-contain rounded-lg shrink-0"
                          />
                        )
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg xl:text-xl font-semibold text-[var(--primaryColor)] leading-tight">
                          {item.position}
                        </h3>
                        <p className="text-base xl:text-lg font-medium text-[var(--textColor)] mt-1 truncate">
                          {item.company}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm text-[var(--textColor)] opacity-70">
                          <span className="whitespace-nowrap">{item.startDate} - {item.endDate}</span>
                          {item.location && <span className="truncate">📍 {item.location}</span>}
                        </div>
                        <ul className="mt-4 space-y-2">
                          {item.description.map((point, i) => (
                            <li
                              key={i}
                              className="flex gap-2.5 text-base xl:text-lg text-[var(--textColor)] leading-relaxed opacity-90"
                            >
                              <span className="mt-2 xl:mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primaryColor)]" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Space for line & dot */}
                <div className="w-[6%] flex justify-center relative">
                  <div className="mt-6 lg:mt-7 h-6 w-6 lg:h-8 lg:w-8 rounded-full flex items-center justify-center bg-zinc-950 border border-white/20 z-20 shadow-xl">
                    <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-[var(--primaryColor)] shadow-[0_0_15px_var(--primaryColor)]" />
                  </div>
                </div>

                {/* Empty Space for alignment */}
                <div className="w-[47%]"></div>
              </motion.div>

            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExperienceCard;