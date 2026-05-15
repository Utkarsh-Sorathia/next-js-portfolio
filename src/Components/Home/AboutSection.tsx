"use client"

import { motion } from 'framer-motion'
import ResponsiveBox from '../core/ResponsiveBox'
import ConstrainedBox from '../core/constrained-box'
import SectionTitle from '../common/SectionTitle'
import education from '../../data/education'
import Education from '../UI/Education'
import Image from 'next/image'
import CardBox from '../core/CardBox'

const techStack = [
  { name: 'Next.js', icon: '/skills/nextjs.webp' },
  { name: 'React', icon: '/skills/react.svg' },
  { name: 'Node.js', icon: '/skills/nodejs.svg' },
  { name: 'MongoDB', icon: '/skills/mongodb.svg' },
  { name: 'TypeScript', icon: '/skills/typescript.svg' },
  { name: 'Tailwind', icon: '/skills/tailwind.svg' }
]


const AboutSection = ({ id, isOpenToWork }: { id: string, isOpenToWork: boolean }) => {

  return (
    <ResponsiveBox
      classNames="relative bg-transparent items-center justify-center lg:px-12 xl:px-40 lg:scroll-mt-12"
      id={id}
    >
      <ConstrainedBox classNames="relative py-12">
        <SectionTitle>About Me</SectionTitle>
        <div className="w-full flex flex-col md:flex-row justify-between gap-4 md:gap-8 mt-2 md:mt-4">
          <div className="flex-1 p-6 flex flex-col gap-8 my-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative flex items-center gap-6"
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[var(--primaryColor)]/50 overflow-hidden flex-shrink-0">
                <Image
                  src="/UtkarshSorathia.webp"
                  alt="Utkarsh Sorathia"
                  fill
                  priority
                  sizes="160px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--primaryColor)] mb-1">
                  Utkarsh Sorathia
                </h3>
                <p className="text-lg text-[var(--textColor)]">
                  Full Stack Developer <br />
                  <span className="text-base text-[var(--textColor)]">MERN | Next.js | Typescript</span>
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <p className="mb-4 text-lg md:text-xl leading-relaxed text-left">
                I enjoy working across the full stack — from crafting pixel-precise UIs with
                <span className="font-semibold text-[var(--primaryColor)]"> React & Next.js</span> to designing
                <span className="font-semibold text-[var(--primaryColor)]"> Node.js APIs</span> and
                <span className="font-semibold text-[var(--primaryColor)]"> MongoDB</span> schemas that hold up under real traffic.
              </p>
              <p className="text-base md:text-lg text-[var(--textColorLight)] text-left">
                I care about clean architecture, honest performance, and shipping things that actually work — not just look good in a demo. When I'm not building, I'm usually writing about what I learned the hard way.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-4 mt-8 justify-start sm:justify-center">
              {techStack.map(({ name, icon }) => (
                <div key={name} className="w-24 h-20">
                  <CardBox
                    classNames="h-full cursor-pointer shadow-sm group"
                  >
                    <div className="flex flex-col items-center justify-center h-full w-full">
                      <Image
                        src={icon}
                        alt={`${name} tech icon`}
                        width={32}
                        height={32}
                        className="transition-transform duration-300"
                      />
                      <span className="text-[10px] uppercase font-bold tracking-widest mt-2 text-zinc-400 group-hover:text-white transition-colors">
                        {name}
                      </span>
                    </div>
                  </CardBox>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mt-8 flex justify-center"
            >
              <a
                className="inline-block bg-[var(--primaryColor)] hover:opacity-90 transition-all text-white font-semibold py-3 px-8 rounded-lg shadow-lg active:scale-95"
                href="/Utkarsh-Sorathia-CV.pdf"
                download="UtkarshSorathia.pdf"
                title="Download Resume"
              >
                📄 Download My Resume
              </a>
            </motion.div>
          </div>

          <div className="flex-1 p-6" style={{ position: 'relative' }}>
            <span className='block md:hidden py-4'><SectionTitle>Education</SectionTitle></span>
            <Education data={education} />
          </div>
        </div>
      </ConstrainedBox>
    </ResponsiveBox>
  )
}

export default AboutSection
