import Link from "next/link";
import socialLinks from "../../data/importantLinks";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:justify-between">
        {/* Copyright */}
        <div className="text-center md:text-left text-md text-gray-400 mb-4 md:mb-0">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-[var(--primaryColor)]">
              Utkarsh Sorathia.
            </span>{" "}
            All rights reserved.
          </p>
        </div>
        {/* Social Links */}
        <div className="flex justify-center md:justify-end space-x-6">
          {socialLinks.map(
            (link, index) =>
              index !== socialLinks.length - 1 && (
                <Link
                  key={index}
                  href={link.url}
                  target="_blank"
                  aria-label={link.name}
                  className="text-white text-2xl transition duration-300 transform hover:scale-125"
                >
                  <i className={link.icon} />
                </Link>
              )
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;