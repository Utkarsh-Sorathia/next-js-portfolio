'use client'

import { useEffect, useRef, useState } from 'react'
import { IProjectItem } from '@/interfaces'
import ProjectCard from './ProjectCard'

const PROJECTS_PER_PAGE = 3

const ProjectList = ({ projects }: Readonly<{ projects: IProjectItem[] }>) => {
  // Desktop: Load More functionality
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE)
  const visibleProjects = projects.slice(0, visibleCount)
  const hasMore = visibleCount < projects.length

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + PROJECTS_PER_PAGE, projects.length))
  }

  // Mobile: Carousel functionality
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollByOffset = (offset: number, ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth
      carouselRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' })
    }
  }

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
      {/* Desktop: Static Grid with Load More */}
      <div className="hidden lg:block w-full">
        <div className="w-full grid grid-cols-3 gap-6">
          {visibleProjects.map((item, index) => (
            <div key={`project-${item.id || index}`} className="w-full">
              <ProjectCard project={item} />
            </div>
          ))}
        </div>

        {/* Load More Button - Desktop only */}
        {hasMore && (
          <div className="w-full flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              aria-label="Load more projects"
              className="app__filled_btn px-8 py-3 rounded-full bg-primary text-white font-semibold hover:opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Load More Projects
            </button>
          </div>
        )}
      </div>

      {/* Mobile/Tablet: Carousel (unchanged) */}
      <div className="w-full flex items-center gap-4 lg:hidden">
        {/* Prev Button - Tablet only */}
        {projects.length > 3 ? <button
          onClick={() => scrollByOffset(-400, carouselRef)}
          aria-label="Scroll to previous project"
          className="hidden sm:flex items-center justify-center app__filled_btn w-12 h-12 rounded-full bg-primary text-white hover:opacity-90 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
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
          className="hidden sm:flex items-center justify-center app__filled_btn w-12 h-12 rounded-full bg-primary text-white hover:opacity-90 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
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
            className={`h-2 w-2 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-primary' : 'bg-border-custom'}`}
          />
        ))}
      </div>
    </div>
  )
}
export default ProjectList;