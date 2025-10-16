'use client'

import Link from 'next/link'
import Column from '../core/Column'
import ConstrainedBox from '../core/constrained-box'
import ResponsiveBox from '../core/ResponsiveBox'
import Row from '../core/Row'
import socialLinks from '../../data/importantLinks'
import { NameAnimation } from '../common/nameAnimation'
import ParticlesBackground from '../common/ParticlesBackground'

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
           <h1 className="inline-flex items-center mx-auto pb-4">
            <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-[var(--textColor)] dark:text-[var(--textColor)]">
              Hi there, I am
            </p>
            <NameAnimation
              words={['Utkarsh Sorathia.', '@utkarsh__sorathia.']}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-[var(--primaryColor)] dark:text-[var(--primaryColor)]"
            />
          </h1>
          <p className="text-sm md:text-base text-[var(--textColorLight)] dark:text-[var(--textColorLight)] mx-auto">
            Full Stack Developer 💻 SDE 🛠️ Open Source 🌍
          </p>
        </Column>

        <div className="mt-12 lg:mt-16 w-full flex flex-col items-center">
          <p className="text-base font-medium pb-3">Follow me here</p>

          <Row classNames="mt-2 gap-4 md:gap-6">
            {socialLinks.map((link, index) => (
              <Link
                key={`social-link-${index}`}
                href={link.url}
                target="_blank"
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
