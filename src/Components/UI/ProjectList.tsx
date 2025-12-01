'use client'

import { useState } from 'react'
import { IProjectItem } from '@/interfaces'
import ProjectCard from './ProjectCard'

const PROJECTS_PER_PAGE = 3

const ProjectList = ({ projects }: Readonly<{ projects: IProjectItem[] }>) => {
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE)

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + PROJECTS_PER_PAGE, projects.length))
  }

  const visibleProjects = projects.slice(0, visibleCount)
  const hasMore = visibleCount < projects.length

  return (
    <div className="w-full mt-16 flex flex-col items-center px-4 lg:px-0">
      {/* Projects Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-6">
        {visibleProjects.map((item, index) => (
          <div key={`project-${item.id || index}`} className="w-full">
            <ProjectCard project={item} />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <button
          onClick={handleLoadMore}
          aria-label="Load more projects"
          className="app__filled_btn mt-8 px-8 py-3 rounded-full bg-[#4361ee] text-white font-semibold hover:bg-[#3a54d4] active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4361ee]"
        >
          Load More Projects
        </button>
      )}
    </div>
  )
}
export default ProjectList;