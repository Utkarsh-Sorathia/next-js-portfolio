import React from 'react'
import ResponsiveBox from '../core/ResponsiveBox'
import ConstrainedBox from '../core/constrained-box'
import SectionTitle from '../common/SectionTitle'
import education from '../../data/education'
import Education from '../UI/Education'

const AboutSection = ({ id }: { id: string }) => {
  return (
    <ResponsiveBox
      classNames="dark:bg-[var(--bgColor)] bg-[var(--bgColor)] dark:bg-grid-white/[0.1] bg-grid-white/[0.1] items-center justify-center lg:px-40"
      id={id}
    >
      <ConstrainedBox classNames="py-16">
        <SectionTitle>About me</SectionTitle>

        <div className="w-full flex flex-col md:flex-row justify-between">
          <div className="flex-1 p-6">
            <p className="mt-8 text-xl text-justify">
              Hi, my name is Utkarsh Sorathia. I'm a passionate Full Stack Developer specializing in the MERN stack (MongoDB, Express.js, React.js, and Node.js). With strong expertise in both frontend and backend development, I thrive on building robust, scalable, and intuitive web applications from start to finish. I stay up-to-date with the latest technologies and best practices to ensure that every project I work on is crafted with precision, performance, and a user-focused approach.
            </p>
          </div>
          <span className='block md:hidden py-8'><SectionTitle>Educations</SectionTitle></span>
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
