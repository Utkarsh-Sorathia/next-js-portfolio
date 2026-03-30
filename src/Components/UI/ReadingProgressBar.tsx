'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const ReadingProgressBar = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Only show progress bar if some scroll is possible
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setShow(document.documentElement.scrollHeight > window.innerHeight)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!show) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[var(--primaryColor)] origin-left z-[9999]"
      style={{ scaleX }}
    />
  )
}

export default ReadingProgressBar
