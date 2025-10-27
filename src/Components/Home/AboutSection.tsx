"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ResponsiveBox from '../core/ResponsiveBox'
import ConstrainedBox from '../core/constrained-box'
import SectionTitle from '../common/SectionTitle'
import education from '../../data/education'
import Education from '../UI/Education'
import Image from 'next/image'

const techStack = [
  { name: 'MongoDB', icon: '/skills/mongodb.svg' },
  { name: "Express", icon: './skills/express.svg' },
  { name: 'React', icon: '/skills/react.svg' },
  { name: 'Node.js', icon: '/skills/nodejs.svg' },
  { name: 'TypeScript', icon: '/skills/typescript.svg' },
  { name: 'Firebase', icon: '/skills/firebase.svg' }
]

const AboutSection = ({ id }: { id: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  return (
    <ResponsiveBox
      classNames="dark:bg-[var(--bgColor)] bg-[var(--bgColor)] dark:bg-grid-white/[0.1] bg-grid-white/[0.1] items-center justify-center lg:px-40"
      id={id}
    >
      <ConstrainedBox classNames="py-12">
        <SectionTitle>About me</SectionTitle>
        <div className="w-full flex flex-col md:flex-row justify-between gap-8">
          <div className="flex-1 p-6 flex flex-col gap-8 my-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-6"
            >
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-blue-600/50">
                <button
                  aria-label="View full profile image"
                  className="relative w-28 h-28 rounded-full overflow-hidden"
                  onClick={toggleModal}
                >
                  <Image
                    src="/UtkarshSorathia.png"
                    alt="Utkarsh Sorathia"
                    fill
                    className="object-cover"
                  />
                </button>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--primaryColor)] mb-1">
                  Utkarsh Sorathia
                </h3>
                <p className="text-lg text-white">
                  Full Stack Developer <br />
                  <span className="text-base text-white">MERN | Next.js | Typescript</span>
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <p className="mb-4 text-xl leading-relaxed">
                I’m a passionate <span className="font-semibold text-[var(--primaryColor)]">Full Stack Developer</span> with a love for building seamless web experiences. I specialize in the <span className="font-semibold text-[var(--primaryColor)]">MERN stack</span> and thrive on transforming ideas into scalable products.
              </p>
              <p className="text-lg text-blue-100">
                Always learning, always building. My focus is on clean code, great UX, and modern design.
              </p>
            </motion.div>
            {isModalOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                role="dialog"
                aria-modal="true"
              >
                <div className="relative bg-white rounded-lg overflow-hidden shadow-lg">
                  <button
                    className="absolute top-2 right-2 text-black rounded-full p-2 hover:text-gray-700 transition"
                    onClick={toggleModal}
                    aria-label="Close image modal"
                  >
                    ✖
                  </button>
                  <Image
                    src="/UtkarshSorathia.png"
                    alt="Full-size profile image of Utkarsh Sorathia"
                    width={500}
                    height={500}
                    className="object-cover"
                  />
                </div>
              </div>
            )}
            <motion.div
              className="flex flex-wrap gap-4 mt-2 justify-start sm:justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              {techStack.map(({ name, icon }) => (
                <motion.div
                  key={name}
                  className="w-25 h-20 bg-white/10 p-3 rounded-xl flex flex-col items-center justify-center shadow-lg hover:scale-110 transition"
                  whileHover={{ scale: 1.15, rotate: -5 }}
                >
                  <Image src={icon} alt={name} width={32} height={32} />
                  <span className="text-xs mt-2 text-white text-center">{name}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mt-8 flex justify-center"
            >
              <a
                className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 transition text-white font-semibold py-3 px-6 rounded-lg shadow-md"
                href="/Utkarsh-Sorathia-CV.pdf"
                download="UtkarshSorathia.pdf"
                title="Download Resume"
              >
                📄 Download My Resume
              </a>
            </motion.div>
          </div>

          <div className="flex-1 p-6">
            <span className='block md:hidden py-8'><SectionTitle>Education</SectionTitle></span>
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
