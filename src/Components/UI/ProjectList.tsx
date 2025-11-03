'use client'

import { useEffect, useRef, useState } from 'react'
import { IProjectItem } from '@/interfaces'
import ProjectCard from './ProjectCard'

const cardDesktopWidth = 380; // px

const ProjectList = ({ projects }: Readonly<{ projects: IProjectItem[] }>) => {
  const desktopCarouselRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  // Only for mobile/sidebar
  const [activeIndex, setActiveIndex] = useState(0)

  // Scroll for both carousels
  const scrollByOffset = (offset: number, ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  // This is only used on mobile/tablet
  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth
      carouselRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' })
    }
  }
  // This is for mobile/tablet carousel to set dot indicator
  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return
      const scrollLeft = carouselRef.current.scrollLeft
      const containerWidth = carouselRef.current.offsetWidth
      const index = Math.round(scrollLeft / containerWidth)
      setActiveIndex(index)
    }
    const ref = carouselRef.current
    if (ref) ref.addEventListener('scroll', handleScroll)
    return () => { if (ref) ref.removeEventListener('scroll', handleScroll) }
  }, [])

  return (
    <div className="w-full mt-16 flex flex-col items-center px-4 lg:px-0">
      {/* Desktop Carousel Layout - 3 at a time */}
      <div className="hidden lg:flex w-full items-center justify-center gap-3">
        {/* Prev Button */}
        {projects.length > 3 && (
          <button
            onClick={() => scrollByOffset(-cardDesktopWidth * 3, desktopCarouselRef)}
            aria-label="Scroll to previous projects"
            className="app__filled_btn w-12 h-12 rounded-full bg-[#4361ee] text-white flex items-center justify-center text-xl hover:bg-[#3a54d4] active:scale-95 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4361ee]"
          >
            <i className="bi bi-chevron-left" />
          </button>
        )}
        {/* Carousel */}
        <div
          ref={desktopCarouselRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory flex-1"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {projects.map((item, index) => (
            <div
              key={`project-${index}`}
              style={{ minWidth: cardDesktopWidth, maxWidth: cardDesktopWidth, flex: '0 0 auto' }}
              className="snap-start"
            >
              <ProjectCard project={item} />
            </div>
          ))}
        </div>
        {/* Next Button */}
        {projects.length > 3 && (
          <button
            onClick={() => scrollByOffset(cardDesktopWidth * 3, desktopCarouselRef)}
            aria-label="Scroll to next projects"
            className="app__filled_btn w-12 h-12 rounded-full bg-[#4361ee] text-white flex items-center justify-center text-xl hover:bg-[#3a54d4] active:scale-95 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4361ee]"
          >
            <i className="bi bi-chevron-right" />
          </button>
        )}
      </div>
      {/* Mobile/Tablet Carousel Row (unchanged) */}
      <div className="w-full flex items-center gap-4 lg:hidden">
        {/* Prev Button - Tablet only */}
        {projects.length > 3 ? <button
          onClick={() => scrollByOffset(-400, carouselRef)}
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
        {/* Next Button - Tablet only */}
        {projects.length > 3 ? <button
          onClick={() => scrollByOffset(400, carouselRef)}
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
            className={`h-2 w-2 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-[#4361ee]' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  )
}
export default ProjectList;