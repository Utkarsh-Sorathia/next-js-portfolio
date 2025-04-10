import React from 'react'
import ResponsiveBox from '../core/ResponsiveBox'
import ConstrainedBox from '../core/constrained-box'
import SectionTitle from '../common/SectionTitle'
import education from '../../data/education'
import Education from '../UI/Education'

const AboutSection = ({ id }: { id: string }) => {
  return (
    <ResponsiveBox
      classNames="dark:bg-[var(--bgColor)] bg-[var(--bgColor)] dark:bg-grid-white/[0.1] bg-grid-white/[0.1] min-h-screen items-center justify-center"
      id={id}
    >
      <ConstrainedBox classNames="">
        <SectionTitle>About me</SectionTitle>

        <div className="w-full flex flex-col md:flex-row justify-between space-x-4">
          <div className="flex-1 p-6">
            <p className="mt-20 text-xl">
              Hi, My name is Utkarsh Sorathia, and I specialize in React.js,
              Firebase, and Bootstrap. I thrive on the opportunity to create
              dynamic and user-friendly web applications that leave a lasting
              impact. By staying updated with the latest trends and continuously
              refining my skills, I ensure that every project I undertake is
              delivered with precision and innovation.
            </p>
          </div>

          <div className="flex-1 p-6">
            {education.map((edu, i) => (
              <Education key={`education-${i}`} data={edu} />
            ))}
          </div>
        </div>
      </ConstrainedBox>
    </ResponsiveBox>
  )
}

export default AboutSection
