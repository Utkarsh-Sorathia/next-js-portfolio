import Link from 'next/link'
import Column from '../core/Column'
import ConstrainedBox from '../core/constrained-box'
import ResponsiveBox from '../core/ResponsiveBox'
import Row from '../core/Row'
import socialLinks from '../../data/importantLinks'
import { NameAnimation } from '../common/nameAnimation'

const HomeSection = ({ id }: Readonly<{ id: string }>) => {
  return (
    <ResponsiveBox
      classNames="dark:bg-[var(--bgColor)] bg-[var(--bgColor)] dark:bg-grid-white/[0.1] bg-grid-white/[0.1] min-h-screen items-center justify-center relative overflow-hidden rounded-md"
      id={id}
    >
      <ConstrainedBox classNames="px-4 py-8 pt-16 z-20 items-center justify-center my-auto">
        <Column classNames="w-full items-center justify-center">
          <div className="inline-flex items-center mx-auto pb-4">
            <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-[var(--textColor)] dark:text-[var(--textColor)]">
              Hi there, I am
            </p>
            <NameAnimation
              words={['Utkarsh Sorathia.', '@usorathia.']}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-[var(--primaryColor)] dark:text-[var(--primaryColor)]"
            />
          </div>
          <p className="text-sm md:text-base text-[var(--textColorLight)] dark:text-[var(--textColorLight)] mx-auto">
            Full Stack Developer 💻 SDE 🛠️ Open Source 🌍
          </p>
        </Column>

        <div className="mt-12 lg:mt-16 w-full flex flex-col items-center">
          <p className="text-base font-medium pb-3">Follow me here</p>

          <Row classNames="mt-2 gap-4 md:gap-6">
            {socialLinks.map((link, index) => {
              return (
                <Link
                  key={`social-link-${index}`}
                  href={link.url}
                  target="_blank"
                  aria-label={`${link.name}`}
                  className="flex items-center hover:scale-105 transition-all duration-300 text-2xl"
                >
                  <i className={link.icon} />
                </Link>
              )
            })}
          </Row>
        </div>

        {/* Centered Down Button */}
        {/* <div className="mx-auto lg:mt-120 mt-65">
          <Link href="#about" className="btn btn-lg" id="about">
            <img
              src="/images/down.gif"
              alt="down"
              height={40}
              width={40}
            />
          </Link>
        </div> */}
      </ConstrainedBox>
    </ResponsiveBox>
  )
}

export default HomeSection
