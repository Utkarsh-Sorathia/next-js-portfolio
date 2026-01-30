"use client";
import Link from "next/link";
import socialLinks from "../../data/importantLinks";
import { useState } from "react";
import Image from "next/image";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const Footer = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!executeRecaptcha) {
      setMessage("ReCAPTCHA not ready. Please try again.");
      return;
    }

    setMessage("");
    setIsSubmitting(true);

    if (!email) {
      setMessage("Please enter an email.");
      setIsSubmitting(false);
      return;
    }

    try {
      const gRecaptchaToken = await executeRecaptcha('subscribe_newsletter');

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, gRecaptchaToken }),
      });

      const data = await res.json();
      setMessage(data.message || data.error);

      if (res.ok) setEmail("");
    } catch {
      setMessage("Failed to subscribe. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand + About */}
          <div>
            <div className="flex items-center mb-4 gap-3"><Image
              src="/android-chrome-192x192.png"
              alt="Utkarsh Sorathia"
              width={100}
              height={100}
              sizes="100%"
              loading="lazy"
              className="w-12 h-auto aspect-square object-cover"
            />
              <h3 className="text-lg font-semibold text-white mb-3 tracking-wide items-center pt-4">
                Utkarsh Sorathia
              </h3></div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Full Stack Developer & Software Engineer crafting clean, performant,
              and modern digital experiences.
            </p>

            <div className="flex items-center space-x-5 mt-4">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="text-gray-300 hover:text-[var(--primaryColor)] transition-colors duration-300"
                >
                  <i className={`${link.icon} text-xl`} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full px-0 md:px-10 lg:px-20">
            <h4 className="text-md font-semibold text-white mb-3">Quick Links</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Link href="/" className="hover:text-[var(--primaryColor)]">Home</Link>
              <Link href="#about" className="hover:text-[var(--primaryColor)]">About Me</Link>
              <Link href="#services" className="hover:text-[var(--primaryColor)]">Services</Link>
              <Link href="#projects" className="hover:text-[var(--primaryColor)]">Projects</Link>
              <Link href="#experience" className="hover:text-[var(--primaryColor)]">Experience</Link>
              <Link href="#skills" className="hover:text-[var(--primaryColor)]">Skills</Link>
              <Link href="#contact" className="hover:text-[var(--primaryColor)]">Contact</Link>
              <Link href="/blogs" className="hover:text-[var(--primaryColor)]">Blogs</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-md font-semibold text-white mb-3">
              Newsletter
            </h4>
            <p className="text-sm text-gray-400 mb-3">
              Subscribe to get updates on new blogs and tech tips.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-auto flex-1 px-3 py-2 rounded-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:border-[var(--primaryColor)]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-[var(--primaryColor)] text-white rounded-md hover:opacity-90 transition disabled:opacity-50"
              >
                {isSubmitting ? "..." : "Subscribe"}
              </button>
            </form>
            <p className="text-[9px] text-gray-500 mt-2 leading-tight">
              Protected by reCAPTCHA. Google{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline hover:text-gray-400">Privacy</a>{' '}
              &{' '}
              <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline hover:text-gray-400">Terms</a> apply.
            </p>

            {message && (
              <p className="text-xs mt-2 text-[var(--primaryColor)]">
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center text-xs text-gray-500 mt-8 pt-6 border-t border-gray-800">
          © {new Date().getFullYear()} Utkarsh Sorathia. All Rights Reserved.
        </div>

        {/* Hidden SEO Keywords & Tags */}
        <div className="sr-only" aria-hidden="true">
          <h2>SEO Keywords for Utkarsh Sorathia</h2>
          <p>
            Utkarsh, Utkarsh Sorathia, Utkarsh Portfolio, Utkarsh CV, Full Stack Developer, 
            Software Engineer India, MERN Stack Developer, React.js Expert, Next.js Developer, 
            Utkarsh Developer, Web Developer Surat, Gujarat Software Engineer, Utkarsh Programming, 
            Javascript Developer, Node.js Backend Developer, MongoDB Expert, Frontend Engineer, 
            Utkarsh Sorathia Projects, Utkarsh Sorathia Blogs, Portfolio Website, Web Application Developer,
            TypeScript, Express.js Expert, Computer Engineer, Coding, Programming Insights,
            Tech Blog by Utkarsh, Software Solutions, Modern Web Development, Clean Code.
          </p>
          <h3>Technologies and Skills</h3>
          <ul>
            <li>React.js</li>
            <li>Next.js 15</li>
            <li>Node.js</li>
            <li>MongoDB</li>
            <li>Tailwind CSS</li>
            <li>Prisma</li>
            <li>Sanity CMS</li>
            <li>API Development</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
