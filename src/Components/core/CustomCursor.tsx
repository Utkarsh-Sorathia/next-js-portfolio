'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, AnimatePresence } from 'framer-motion'

const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Direct MotionValues for perfect 1-to-1 movement with zero delay
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches)
    }
    checkMobile()

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)
      // Update coordinates instantly
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Hide original cursor only on desktop
    if (!window.matchMedia('(pointer: coarse)').matches) {
       document.body.style.cursor = 'none'
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.body.style.cursor = 'auto'
    }
  }, [mouseX, mouseY, isVisible])

  if (isMobile) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[999999] w-3 h-3 bg-[var(--primaryColor)] rounded-full shadow-[0_0_10px_rgba(67,97,238,0.5)] border border-white/20"
          style={{ 
            x: mouseX, 
            y: mouseY, 
            translateX: '-50%', 
            translateY: '-50%',
          }}
        />
      )}
    </AnimatePresence>
  )
}

export default CustomCursor
