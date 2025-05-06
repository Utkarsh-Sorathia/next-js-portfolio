// components/UI/Footer.tsx

// import Link from 'next/link'
// import { socialLinks } from '../../data/importantLinks'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo or Title */}
          {/* <div className="flex text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-[#4361ee]">Utkarsh Sorathia</h2>
            <p className="text-sm text-gray-400">Full Stack Developer | Building amazing projects</p>
          </div> */}

          {/* Social Links */}
          {/* <div className="flex space-x-6 mb-4 md:mb-0">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                target="_blank"
                aria-label={link.name}
                className="text-white text-2xl hover:text-[#4361ee] transition duration-300"
              >
                <i className={link.icon} />
              </Link>
            ))}
          </div> */}
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} <span className="text-[var(--primaryColor)]">Utkarsh Sorathia.</span> All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
