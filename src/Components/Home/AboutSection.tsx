"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ResponsiveBox from '../core/ResponsiveBox'
import ConstrainedBox from '../core/constrained-box'
import SectionTitle from '../common/SectionTitle'
import education from '../../data/education'
import Education from '../UI/Education'
import Image from 'next/image'
import { useTheme } from 'next-themes'

const techStack = [
  { name: 'MongoDB', icon: '/skills/mongodb.svg' },
  { name: "Express", icon: './skills/express.svg' },
  { name: 'React', icon: '/skills/react.svg' },
  { name: 'Node.js', icon: '/skills/nodejs.svg' },
  { name: 'Next.js', icon: '/skills/next-js.svg' },
  { name: 'TypeScript', icon: '/skills/typescript.svg' },
  { name: 'Firebase', icon: '/skills/firebase.svg' },
  { name: 'GitHub', icon: '/skills/github.svg' }
]

const AboutSection = ({ id }: { id: string }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  return (
    <ResponsiveBox
      classNames="bg-background items-center justify-center dark:bg-dot-white/[0.15] light:bg-dot-black/[0.1] lg:px-40"
      id={id}
    >
      <ConstrainedBox classNames="py-12">
        <SectionTitle>About me</SectionTitle>
        <div className="w-full flex flex-col md:flex-row justify-between gap-8">
          <div className="flex-1 p-6 flex flex-col gap-8 my-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ amount: 0.3, once: true }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ willChange: 'transform, opacity' }}
              className="flex items-center gap-6"
            >
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-primary/50">
                <button
                  aria-label="View full profile image"
                  className="relative w-28 h-28 rounded-full overflow-hidden"
                  onClick={toggleModal}
                >
                  <Image
                    src="/UtkarshSorathia.webp"
                    alt="Utkarsh Sorathia"
                    fill
                    priority
                    className="object-cover"
                  />
                </button>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-1">
                  Utkarsh Sorathia
                </h3>
                <p className="text-lg text-foreground">
                  Full Stack Developer <br />
                  <span className="text-base text-text-secondary">MERN | Next.js | Typescript</span>
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ amount: 0.3, once: true }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ willChange: 'transform, opacity' }}
            >
              <p className="mb-4 text-xl leading-relaxed text-foreground">
                I’m a <span className="font-semibold text-primary">Full Stack Developer</span> focused on building scalable web applications with
                <span className="font-semibold text-primary"> Next.js, TypeScript</span>, and the
                <span className="font-semibold text-primary"> MERN stack</span>.
                I enjoy working across the stack to turn product ideas into reliable, production-ready solutions.
              </p>
              <p className="text-lg text-text-secondary">
                My approach emphasizes clean architecture, performance, and user-focused design, with a strong preference for maintainable and readable code.
              </p>
            </motion.div>
            {isModalOpen && (
              <div
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                role="dialog"
                aria-modal="true"
              >
                <div className="relative bg-card-bg rounded-2xl overflow-hidden shadow-2xl max-w-lg w-full">
                  <button
                    className="absolute top-4 right-4 text-foreground bg-card-bg/50 backdrop-blur-md rounded-full p-2 hover:bg-primary hover:text-white transition-all z-10"
                    onClick={toggleModal}
                    aria-label="Close image modal"
                  >
                    ✖
                  </button>
                  <div className="relative aspect-square w-full">
                    <Image
                      src="/UtkarshSorathia.webp"
                      alt="Full-size profile image of Utkarsh Sorathia"
                      fill
                      className="object-cover"
                    />
                  </div>
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
              {techStack.map(({ name, icon }) => {
                const isNextJs = name.toLowerCase() === "next.js";
                const isGitHub = name.toLowerCase() === "github";
                const isDark = resolvedTheme === "dark";
                
                let iconSrc = icon;
                if (mounted) {
                  if (isNextJs) iconSrc = isDark ? "/skills/nextjs.webp" : "/skills/next-js.svg";
                  if (isGitHub) iconSrc = isDark ? "/skills/github-white.webp" : "/skills/github.svg";
                }

                return (
                  <motion.div
                    key={name}
                    className="w-24 h-24 bg-primary/5 border border-border-custom p-3 rounded-2xl flex flex-col items-center justify-center shadow-sm hover:bg-primary/10 transition-all"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <Image src={iconSrc} alt={name} width={32} height={32} className="object-contain" />
                    <span className="text-xs mt-2 text-foreground font-medium text-center">{name}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mt-8 flex justify-center"
            >
              <a
                className="inline-block bg-primary hover:opacity-90 transition-all text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-primary/20"
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
