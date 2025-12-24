'use client'

import Link from 'next/link'
import Column from '../core/Column'
import ConstrainedBox from '../core/constrained-box'
import ResponsiveBox from '../core/ResponsiveBox'
import Row from '../core/Row'
import { motion } from 'framer-motion'
import { Mail, ArrowRight } from 'lucide-react'
import socialLinks from '../../data/importantLinks'
import { NameAnimation } from '../common/nameAnimation'
import ParticlesBackground from '../common/ParticlesBackground'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const HomeSection = ({ id }: Readonly<{ id: string }>) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          <div className="inline-flex items-center mx-auto pb-4">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-foreground">
              Hi there, I am
              <NameAnimation
                words={['Utkarsh Sorathia.', 'Full Stack Developer.']}
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-primary"
              />
            </h1>
          </div>
          <h2 className="sr-only">
            Full Stack Developer specializing in MERN, Next.js, and React.js — creating modern web and mobile applications.
          </h2>
          <p className="text-sm md:text-base text-text-secondary mx-auto text-wrap max-w-2xl text-center">
            MERN & Next.js Developer 🚀 SDE 🛠️ Building Modern Web Experiences 💻
          </p>
        </Column>

        <div className="mt-12 lg:mt-16 w-full flex flex-col items-center">
          <div className="flex flex-col sm:flex-row gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="#contact"
                className="relative px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg flex items-center justify-center gap-3 transition-all hover:opacity-90 shadow-lg shadow-primary/20"
              >
                <Mail className="w-5 h-5" />
                <span>Hire Me</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="#projects"
                className="group px-8 py-4 rounded-xl border border-border-custom bg-card-bg backdrop-blur-md text-foreground font-bold text-lg flex items-center justify-center gap-3 transition-all hover:bg-primary/10 hover:border-primary/20"
              >
                <span>View Projects</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <p className="text-base font-medium pb-3 text-foreground">Follow me here</p>

          <Row classNames="mt-2 gap-4 md:gap-6">
            {socialLinks.map((link, index) => {
              const isImagePath = link.icon?.startsWith("/");
              const isGitHub = link.name?.toLowerCase() === "github";
              const isDark = resolvedTheme === "dark";
              
              let iconSrc = link.icon ?? "";
              if (mounted && isGitHub) {
                iconSrc = isDark ? "/skills/github-white.webp" : "/skills/github.svg";
              }

              return (
                <Link
                  key={`social-link-${index}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name ?? "Social Link"}
                  className="flex items-center justify-center text-2xl text-foreground/70 hover:text-primary hover:transform hover:scale-120 transition duration-200"
                >
                  {isImagePath || (mounted && isGitHub) ? (
                    <Image
                      src={iconSrc}
                      alt={link.name ?? "Social Icon"}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  ) : (
                    <i className={`${link.icon ?? ""} leading-none`} />
                  )}
                </Link>
              );
            })}
          </Row>
        </div>
      </ConstrainedBox>
    </ResponsiveBox>
  )
}

export default HomeSection
