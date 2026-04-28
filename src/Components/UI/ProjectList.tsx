'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { IProjectItem } from '@/interfaces'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import ProjectCard from './ProjectCard'

const PROJECTS_PER_PAGE = 6
const AUTO_PLAY_INTERVAL = 4000

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
  const [isPaused, setIsPaused] = useState(false)

  // For infinite loop, we clone the first few projects at the end
  const extendedProjects = [...projects, ...projects.slice(0, 2)]

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    if (carouselRef.current) {
      const container = carouselRef.current
      const card = container.children[0] as HTMLElement
      if (card) {
        const cardWidth = card.offsetWidth + 16 // 16px is the gap-4
        container.scrollTo({ left: index * cardWidth, behavior })
      }
    }
  }, [])

  const scrollByOffset = (offset: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  // Auto-play effect
  useEffect(() => {
    if (isPaused || projects.length <= 1) return

    const interval = setInterval(() => {
      if (!carouselRef.current) return
      const container = carouselRef.current
      const card = container.children[0] as HTMLElement
      if (!card) return

      const cardWidth = card.offsetWidth + 16
      const currentScrollIndex = Math.round(container.scrollLeft / cardWidth)
      
      scrollToIndex(currentScrollIndex + 1, 'smooth')
    }, AUTO_PLAY_INTERVAL)

    return () => clearInterval(interval)
  }, [isPaused, projects.length, scrollToIndex])

  // Handle scroll events for teleportation and updating dots
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      if (!carouselRef.current) return
      const container = carouselRef.current
      const cards = container.children
      if (cards.length < 2) return

      const firstCard = cards[0] as HTMLElement
      const secondCard = cards[1] as HTMLElement
      const cardWidth = secondCard.offsetLeft - firstCard.offsetLeft
      
      const scrollLeft = container.scrollLeft
      const index = Math.round(scrollLeft / cardWidth)

      // Update the active dot immediately for better feedback
      const realIndex = index % projects.length
      setActiveIndex(realIndex)

      // Teleportation logic: 
      // We only teleport if we've landed on a clone (index >= projects.length)
      if (index >= projects.length) {
        // Wait for the smooth scroll/snap to actually finish
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          if (!carouselRef.current) return
          const cont = carouselRef.current
          
          // Disable smooth scroll for the instant jump
          cont.style.scrollBehavior = 'auto'
          cont.scrollLeft = (index % projects.length) * cardWidth
          
          // Force a reflow to ensure the jump is applied before re-enabling smooth scroll
          void cont.offsetHeight 
          cont.style.scrollBehavior = 'smooth'
        }, 150) // 150ms is usually enough for the snap to settle
      }
    }

    const ref = carouselRef.current
    if (ref) ref.addEventListener('scroll', handleScroll, { passive: true })
    return () => { 
      if (ref) ref.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [projects.length])

  return (
    <div className="w-full mt-8 md:mt-10 flex flex-col items-center px-4 lg:px-0">
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
              className="app__filled_btn px-8 py-3 rounded-full bg-[var(--primaryColor)] text-white font-semibold hover:opacity-90 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primaryColor)]"
            >
              Load More Projects
            </button>
          </div>
        )}
      </div>

      {/* Mobile/Tablet: Carousel */}
      <div 
        className="w-full flex items-center gap-2 md:gap-4 lg:hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Prev Button - Tablet only */}
        {projects.length > 2 && (
          <button
            onClick={() => scrollByOffset(-350)}
            aria-label="Scroll to previous project"
            className="hidden sm:flex flex-shrink-0 items-center justify-center app__filled_btn w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--primaryColor)] text-white hover:opacity-90 active:scale-95 transition-all duration-300 focus:outline-none shadow-lg z-10"
          >
            <BsChevronLeft size={24} />
          </button>
        )}
        
        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scroll-smooth flex-1 no-scrollbar touch-auto snap-x snap-mandatory py-6 px-1"
        >
          {extendedProjects.map((item, index) => (
            <div
              key={`project-${index}`}
              className="snap-start flex-shrink-0 w-full sm:w-[calc(50%-8px)]"
            >
              <ProjectCard project={item} />
            </div>
          ))}
        </div>

        {/* Next Button - Tablet only */}
        {projects.length > 2 && (
          <button
            onClick={() => scrollByOffset(350)}
            aria-label="Scroll to next project"
            className="hidden sm:flex flex-shrink-0 items-center justify-center app__filled_btn w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--primaryColor)] text-white hover:opacity-90 active:scale-95 transition-all duration-300 focus:outline-none shadow-lg z-10"
          >
            <BsChevronRight size={24} />
          </button>
        )}
      </div>
      {/* Dot Indicators - Only on mobile/tablet */}
      <div className="flex lg:hidden items-center justify-center gap-2 mt-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`h-2 w-[8px] rounded-full transition-all duration-400 ${index === activeIndex ? 'bg-[var(--primaryColor)] w-[24px]' : 'bg-gray-300'}`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
export default ProjectList;