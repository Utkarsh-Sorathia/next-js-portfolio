'use client'

import type { TimelineEntry } from '@/interfaces'
import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const Education = ({ data }: { data: TimelineEntry[] }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [data]) 

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 40%', 'end 40%'],
  })

  const heightTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height - 40],
  )
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div className="w-full relative" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Static Track Line - Single continuous background line */}
        <div
          className="absolute lg:left-8.75 left-2.75 top-10 w-[2px] bg-white/10 z-0"
          style={{ height: height - 40 }}
        />

        {/* Animated Progress Line - Single continuous animated line */}
        <div className="absolute lg:left-8.75 left-2.75 top-10 overflow-hidden w-[2px] z-10 transition-all duration-300">
          <motion.div
            className="w-full bg-[var(--primaryColor)]"
            style={{
              height: heightTransform,
              opacity: opacityTransform,
              willChange: 'transform, opacity',
            }}
          />
        </div>

        {/* Unified List of Education Items */}
        <div className="space-y-0">
          {data.map((entry, entryIndex) => (
            <div key={`entry-${entryIndex}`}>
              {entry.educations.map((item, itemIndex) => {
                const globalIndex = entryIndex + itemIndex;
                return (
                  <motion.div
                    key={`edu-${entryIndex}-${itemIndex}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: globalIndex * 0.1, ease: "easeOut" }}
                    className="relative flex items-start py-8"
                  >
                    {/* Bullet Point */}
                    <div className="absolute lg:left-5 left-0 top-8 z-20 flex flex-col items-center">
                      <div className="h-6 w-6 lg:h-8 lg:w-8 rounded-full flex items-center justify-center transition-all duration-300 bg-zinc-900 border border-white/10">
                        <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-[var(--primaryColor)] shadow-[0_0_10px_var(--primaryColor)]" />
                      </div>
                    </div>

                    {/* Timeline Content */}
                    <div className="ml-12 lg:ml-16 w-full text-left">
                      <h2 className="text-xl lg:text-2xl font-bold text-[var(--primaryColor)] mb-2">
                        {entry.degree}
                      </h2>
                      <div className="space-y-1 text-zinc-300">
                        <p className="text-lg font-medium text-white">
                          {item.institute}
                        </p>
                        <p className="text-sm lg:text-base opacity-80">
                           {item.location}
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm pt-2">
                          <span className="flex items-center gap-1">
                            {item.startDate} - {item.endDate}
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-white border-l border-white/20 pl-4">
                            CGPA: {item.cgpa}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Education
