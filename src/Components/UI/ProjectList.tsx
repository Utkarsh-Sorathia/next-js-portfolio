'use client'

import { useEffect, useRef, useState } from 'react'
import { IProjectItem } from '@/interfaces'
import ProjectCard from './ProjectCard'

const ProjectList = ({ projects }: Readonly<{ projects: IProjectItem[] }>) => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollByOffset = (offset: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      })
    }
  }

  // Track which card is visible
  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return

      const scrollLeft = carouselRef.current.scrollLeft
      const containerWidth = carouselRef.current.offsetWidth
      const index = Math.round(scrollLeft / containerWidth)
      setActiveIndex(index)
    }

    const ref = carouselRef.current
    if (ref) {
      ref.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (ref) {
        ref.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <div className="w-full mt-16 flex flex-col items-center px-4 lg:px-24">
      {/* Main Carousel Row */}
      <div className="w-full flex items-center gap-4">
        {/* Prev Button - Desktop only */}
        {projects.length > 3 ? <button
          onClick={() => scrollByOffset(-400)}
          aria-label="Scroll to previous project"
          className="hidden sm:flex items-center justify-center app__filled_btn w-12 h-12 rounded-full bg-[#4361ee] text-white hover:bg-[#3a54d4] active:scale-95 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4361ee]"
        >
          <i className="bi bi-chevron-left text-xl" />
        </button> : null}


        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scroll-smooth flex-1 no-scrollbar touch-auto snap-x snap-mandatory"
        >
          {projects.map((item, index) => (
            <div
              key={`project-${index}`}
              className="snap-start flex-shrink-0 w-full sm:w-auto"
            >
              <ProjectCard project={item} />
            </div>
          ))}
        </div>

        {/* Next Button - Desktop only */}
        {projects.length > 3 ? <button
          onClick={() => scrollByOffset(400)}
          aria-label="Scroll to next project"
          className="hidden sm:flex items-center justify-center app__filled_btn w-12 h-12 rounded-full bg-[#4361ee] text-white hover:bg-[#3a54d4] active:scale-95 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4361ee]"
        >
          <i className="bi bi-chevron-right text-xl" />
        </button> : null}
      </div>

      {/* Dot Indicators - Only on mobile */}
      <div className="flex sm:hidden items-center justify-center gap-2 mt-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-[#4361ee]' : 'bg-gray-300'
              }`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectList