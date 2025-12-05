'use client'

import type { TimelineEntry } from '@/interfaces'
import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const Education = ({ data }: { data: TimelineEntry }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [ref])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 40%', 'end 40%'],
  })

  const heightTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height + 60],
  )
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 2])

  return (
    <div className="w-full mt-8 mb-8" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Static White Background for the Line */}
        <div
          className="absolute lg:left-8.5 left-7.5 top-0 w-[2px] bg-white"
          style={{ height: height + 60 }}
        />

        {/* Animated Progress Line */}
        <div className="absolute lg:left-8.5 left-7.5 top-0 overflow-hidden w-[2px]">
          <motion.div
            className="w-1 bg-gradient-to-b from-blue-600 to-blue-600"
            style={{
              height: heightTransform,
              opacity: opacityTransform,
              willChange: 'transform, opacity',
            }}
          />
        </div>

        {/* Loop through the educations to create bullets */}
        {data.educations.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="relative flex items-start py-10">
              {/* Bullet Point */}
              <div className="absolute left-5 top-10 z-10 flex flex-col items-center">
                <div className="h-6 w-6 lg:h-8 lg:w-8 rounded-full flex items-center justify-center transition-all duration-300 bg-blue-900">
                  <div className="h-3 w-3 lg:h-4 lg:w-4 p-1 lg:p-2 rounded-full bg-blue-600 dark:bg-blue-600 dark:border-blue-600" />
                </div>
              </div>

              {/* Timeline Content */}
              <div className="ml-16">
                <h2 className="md:block text-2xl font-bold text-[var(--primaryColor)] dark:text-[var(--primaryColor)] mb-4">
                  {data.degree}
                </h2>
                <h3 className="text-lg">
                  {item.institute} - {item.location}
                </h3>
                <h4>
                  Duration - {item.startDate} - {item.endDate}
                </h4>
                <h4>CGPA/Percentage - {item.cgpa}</h4>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Education
