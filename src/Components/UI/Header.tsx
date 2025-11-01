'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { INavItem } from '@/interfaces'
import Row from '../../Components/core/Row'
import { useEffect, useState } from 'react'
import axios from 'axios'

// Get the URL from environment variables
const locationsApiUrl = process.env.NEXT_PUBLIC_LOCATIONS_API_URL;

const FloatingNavbar = ({
  navItems,
  className,
}: {
  navItems: INavItem[]
  className?: string
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [locations, setLocations] = useState<any>(null);

  useEffect(() => {
    if (locationsApiUrl) {
      const fetchLocations = async () => {
        try {
          const response = await axios.get(locationsApiUrl);
          setLocations(response.data);
        } catch (error) {
          console.error('Error fetching locations:', error);
        }
      };

      fetchLocations();
    }
  }, [locationsApiUrl]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    // Handle home link with smooth scroll
    if (link === '/') {
      e.preventDefault();
      if (pathname === '/') {
        // Already on home page, just scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Navigate to home then scroll
        router.push('/');
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    }
    // Other hash links will work with default Next.js behavior + CSS smooth scroll
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          'flex w-fit fixed top-4 inset-x-0 mx-auto border border-white/[0.25] rounded-full bg-[var(--dialogColor50)] backdrop-blur-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-4 py-3 items-center space-x-4',
          className,
        )}
      >
        <Row classNames="w-full justify-center items-center">
          <Row classNames="gap-4 items-center">
            {navItems.map((navItem: INavItem, idx: number) => (
              <span key={`link=${idx}`}>
                <Link
                  href={navItem.link}
                  onClick={(e) => handleNavClick(e, navItem.link)}
                  className={cn(
                    'relative flex items-center space-x-1 text-neutral-50 group',
                  )}
                >
                  {/* Icon for mobile view */}
                  <span className="block sm:hidden relative overflow-hidden">
                    <span className="relative z-10 text-xl">
                      <i
                        className={navItem.icon}
                        id={`nav-item-icon${idx}`}
                        title={navItem.name}
                      />
                    </span>
                    <span className="absolute inset-0 text-[var(--primaryColor)] transition-transform transform translate-y-full group-hover:translate-y-0 duration-300 ease-in-out z-10 text-xl">
                      <i
                        className={navItem.icon}
                        id={`nav-item-icon${idx}-hover`}
                        title={navItem.name}
                      />
                    </span>
                  </span>

                  {/* Icon with text for larger screens */}
                  <span className="hidden sm:block text-sm/6 lg:text-base relative overflow-hidden">
                    <span className="relative z-10">{navItem.name}</span>
                    <span className="absolute inset-0 text-[#4361ee] transition-transform transform translate-y-full group-hover:translate-y-0 duration-300 ease-in-out z-10">
                      {navItem.name}
                    </span>
                  </span>
                </Link>
              </span>
            ))}
          </Row>
        </Row>
      </motion.div>
    </AnimatePresence>
  )
}

export default FloatingNavbar
