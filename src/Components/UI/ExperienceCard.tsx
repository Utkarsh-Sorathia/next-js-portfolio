"use client";

import { IExperienceItem } from "../../interfaces";
import Image from "next/image";
import { motion } from "framer-motion";

interface ExperienceCardProps {
  data: IExperienceItem[];
}

const ExperienceCard = ({ data }: ExperienceCardProps) => {
  return (
    <section className="w-full px-6 py-16 max-w-5xl mx-auto">
      <div className="relative">
        <div className="md:hidden absolute left-8 w-[3px] h-full bg-[var(--primaryColor)]"></div>
        <div className="hidden md:block absolute left-1/2 w-[3px] h-full bg-[var(--primaryColor)] transform -translate-x-1/2"></div>
        {data.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ amount: 0.3 }}
              className={`
                    relative
                    md:w-1/2
                    mx-4 md:mx-0
                    md:ml-0
                    mb-10 last:mb-0
                    pt-8 md:pt-0
                    pl-16 md:pl-0
                    w-full
                    max-w-full
                    box-border
                    `}
              style={{
                marginLeft: !isLeft ? "auto" : undefined,
                right: !isLeft ? 0 : undefined,
              }}
            >
              <div
                className="md:hidden absolute w-5 h-5 z-10 top-15"
                style={{
                  left: isLeft ? "16px" : "32px",
                  transform: "translateX(-50%)",
                }}
              > <div className="h-6 w-6 lg:h-8 lg:w-8 rounded-full flex items-center justify-center transition-all duration-300 bg-blue-900">
                  <div className="h-3 w-3 lg:h-4 lg:w-4 p-1 lg:p-2 rounded-full bg-blue-600 dark:bg-blue-600 dark:border-blue-600" />
                </div>
              </div>
              <div
                className="hidden md:block absolute top-10 w-6 h-6 z-10"
                style={{
                  left: isLeft ? "30.3rem" : "-0.3rem",
                  right: isLeft ? "auto" : "100%",
                  transform: "translateX(-50%)",
                }}
              > <div className="h-6 w-6 lg:h-8 lg:w-8 rounded-full flex items-center justify-center transition-all duration-300 bg-blue-900">
                  <div className="h-3 w-3 lg:h-4 lg:w-4 p-1 lg:p-2 rounded-full bg-blue-600 dark:bg-blue-600 dark:border-blue-600" />
                </div>
              </div>
              <div
                className={`bg-[var(--primaryColor5)] border border-[rgba(255,255,255,0.10)]
                    shadow-[0_4px_24px_rgba(0,0,0,0.1)] rounded-xl p-3 md:p-8
                    transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)]
                    ${isLeft ? "md:mr-8 md:pr-8" : "md:ml-8 md:pl-8"}`}
              >
                <div className="flex flex-col sm:flex-row items-start gap-3">
                  {item.companyLogo && (
                    <Image
                      src={item.companyLogo}
                      alt={`${item.company} logo`}
                      width={72}
                      height={72}
                      className="w-18 h-18 object-contain rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3">
                      <div>
                        <h3 className="text-2xl font-semibold text-[var(--primaryColor)]">
                          {item.position}
                        </h3>
                        <p className="text-lg font-medium text-[var(--textColor)] mt-1 truncate">
                          {item.company}
                        </p>
                      </div>
                      <span className="text-sm text-[var(--textColor)] opacity-80 whitespace-nowrap mt-1 sm:mt-0">
                        {item.startDate} - {item.endDate}
                      </span>
                    </div>
                    {item.location && (
                      <p className="text-sm text-[var(--textColor)] opacity-80 mt-3 truncate">
                        📍 {item.location}
                      </p>
                    )}
                    <p className="text-base text-[var(--textColor)] leading-relaxed mt-5 text-justify">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ExperienceCard;