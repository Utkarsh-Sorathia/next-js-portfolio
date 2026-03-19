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
    <section className="w-full py-0 md:py-8 max-w-5xl mx-auto relative">
      <div className="relative">
        {/* Desktop center line */}
        <div className="hidden md:block absolute left-[50.1%] w-[3px] top-12 h-[calc(100%-3rem)] bg-[var(--primaryColor)] transform -translate-x-1/2 opacity-50"></div>

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

                  <p className="text-base opacity-80 leading-relaxed mt-3">
                    {item.description}
                  </p>
                </div>
              </motion.div>

              {/* ── DESKTOP LAYOUT: Alternating timeline (unchanged) ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{ willChange: "transform, opacity" }}
                className={`hidden md:block md:w-[65%] ${
                  !isLeft ? "md:ml-auto md:mr-0" : "md:ml-0 md:mr-auto"
                }`}
              >
                {/* Desktop dot */}
                <div
                  className="absolute top-10 w-6 h-6 z-10"
                  style={{
                    left: isLeft ? "76.5%" : "auto",
                    right: isLeft ? "auto" : "73.7%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="h-6 w-6 lg:h-8 lg:w-8 rounded-full flex items-center justify-center bg-zinc-900 border border-white/10">
                    <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-[var(--primaryColor)] shadow-[0_0_10px_var(--primaryColor)]" />
                  </div>
                </div>

                <div
                  className={`border border-[rgba(255,255,255,0.50)] p-3 md:p-8 transition-all duration-300 hover:bg-white/10 rounded-[var(--borderRadius)] ${
                    isLeft
                      ? "md:mr-8 md:pr-8 translate-x-0 md:translate-x-[-150px]"
                      : "md:ml-8 md:pl-8 translate-x-0 md:translate-x-40"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-3">
                    {item.companyLink ? (
                      <Link href={item.companyLink} target="_blank" rel="noopener noreferrer">
                        {item.companyLogo && (
                          <Image
                            src={item.companyLogo}
                            alt={`${item.company} logo`}
                            width={72}
                            height={72}
                            className="w-18 h-18 object-contain rounded-lg flex-shrink-0"
                          />
                        )}
                      </Link>
                    ) : null}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-[var(--primaryColor)] leading-snug">
                        {item.position}
                      </h3>
                      <p className="text-lg font-medium text-[var(--textColor)] mt-1 truncate">
                        {item.company}
                      </p>
                      <span className="text-sm text-[var(--textColor)] opacity-80 whitespace-nowrap mt-1 mx-1">
                        {item.startDate} - {item.endDate}
                      </span>
                      {item.location && (
                        <p className="text-sm text-[var(--textColor)] opacity-80 mt-3 truncate">
                          📍 {item.location}
                        </p>
                      )}
                      <p className="text-base text-[var(--textColor)] leading-relaxed mt-5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExperienceCard;