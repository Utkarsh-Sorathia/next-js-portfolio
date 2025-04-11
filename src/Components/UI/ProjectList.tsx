'use client'

import { createRef } from 'react'
import { IProjectItem } from '@/interfaces'
import Row from '../core/Row'
import ProjectCard from './ProjectCard'
import Column from '../../Components/core/Column'

const ProjectList = ({ projects }: Readonly<{ projects: IProjectItem[] }>) => {
  const carouselRef = createRef<HTMLDivElement>()

  const _handleOnClickPrev = () => {
    if (!carouselRef || carouselRef.current === null) return

    let offset = 400
    if (window.innerWidth < 480) offset = 280

    carouselRef.current.scrollLeft -= offset
  }

  const _handleOnClickNext = () => {
    if (!carouselRef || carouselRef.current === null) return

    let offset = 400
    if (window.innerWidth < 480) offset = 280

    carouselRef.current.scrollLeft += offset
  }

  return (
    <Column classNames="w-full mt-16">
      <Row
        classNames="w-full gap-4 overflow-x-hidden scroll-smooth no-scrollbar"
        elementRef={carouselRef}
      >
        {projects.map((item, index) => {
          return <ProjectCard key={`project-item-${index}`} project={item} />
        })}
      </Row>

      <Row classNames="w-full items-center justify-center gap-4 mt-4 relative">
        <div className="flex gap-4 mx-auto">
          {/* Previous Button */}
          <button
            type="button"
            className="app__filled_btn !px-6 !py-3 !text-base !font-normal !text-center !rounded bg-[#4361ee] hover:scale-105 transition-all duration-300 ease-in-out"
            onClick={_handleOnClickPrev}
          >
            Prev
          </button>

          {/* Next Button */}
          <button
            type="button"
            className="app__filled_btn !px-6 !py-3 !text-base !font-normal !text-center !rounded bg-[#4361ee] hover:scale-105 transition-all duration-300 ease-in-out"
            onClick={_handleOnClickNext}
          >
            Next
          </button>
        </div>
      </Row>
    </Column>
  )
}

export default ProjectList
