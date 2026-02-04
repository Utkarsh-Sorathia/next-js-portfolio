'use client'

import Link from 'next/link'
import Column from '../core/Column'
import ConstrainedBox from '../core/constrained-box'
import ResponsiveBox from '../core/ResponsiveBox'
import Row from '../core/Row'
import socialLinks from '../../data/importantLinks'
import { NameAnimation } from '../common/nameAnimation'
import dynamic from 'next/dynamic';
const ParticlesBackground = dynamic(() => import('../common/ParticlesBackground'), { ssr: false });

const HomeSection = ({ id }: Readonly<{ id: string }>) => {
  return (
    <ResponsiveBox
      classNames="min-h-screen items-center justify-center relative overflow-hidden rounded-md"
      id={id}
    >
      {/* 👉 Particle background limited to this section only */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <ParticlesBackground />
      </div>

      <ConstrainedBox classNames="px-4 py-8 pt-16 z-10 items-center justify-center my-auto">
        <Column classNames="w-full items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 scale-in">
            <div className="relative flex h-2 w-2">
              <span className="animate-soft-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400 z-0"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 z-10"></span>
            </div>
            <p className="text-xs font-medium text-emerald-500 tracking-wide uppercase">
              Available for New Opportunities
            </p>
          </div>
          <div className="inline-flex items-center mx-auto pb-4">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-[var(--textColor)] dark:text-[var(--textColor)]">
              Hi there, I am
              <NameAnimation
                words={['Utkarsh Sorathia.', 'Full Stack Developer.']}
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-[var(--primaryColor)] dark:text-[var(--primaryColor)]"
              />
            </h1>
          </div>
          <h2 className="sr-only">
            Full Stack Developer specializing in MERN, Next.js, and React.js — creating modern web and mobile applications.
          </h2>
          <p className="text-sm md:text-base text-[var(--textColorLight)] dark:text-[var(--textColorLight)] mx-auto text-wrap max-w-2xl text-center">
            MERN & Next.js Developer 🚀 SDE 🛠️ Building Modern Web Experiences 💻
          </p>
        </Column>

        <div className="mt-10 flex flex-wrap gap-4 justify-center z-10">
          <Link
            href="#contact"
            className="bg-[var(--primaryColor)] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            Hire Me
            <i className="bi bi-arrow-right" />
          </Link>
          <Link
            href="#projects"
            className="border border-[var(--primaryColor)] text-[var(--primaryColor)] px-8 py-3 rounded-full font-bold hover:bg-[var(--primaryColor)] hover:text-white transition-all duration-300"
          >
            View Projects
          </Link>
        </div>


        <div className="mt-12 lg:mt-16 w-full flex flex-col items-center">
          <p className="text-base font-medium pb-3">Follow me here</p>

          <Row classNames="mt-2 gap-4 md:gap-6">
            {socialLinks.map((link, index) => (
              <Link
                key={`social-link-${index}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.name}`}
                className="flex items-center text-2xl hover:transform hover:scale-120 transition duration-200"
              >
                <i className={link.icon} />
              </Link>
            ))}
          </Row>
        </div>
      </ConstrainedBox>
    </ResponsiveBox>
  )
}

export default HomeSection
