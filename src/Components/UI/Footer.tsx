"use client";
import Link from "next/link";
import socialLinks from "../../data/importantLinks";
import { useState } from "react";
import Image from "next/image";
import { useGoogleReCaptcha } from "@/hooks/useGoogleReCaptcha";

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
      if (!gRecaptchaToken) throw new Error("Recaptcha failed");

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
    <footer className="bg-[var(--bgColor)] text-[var(--textColorLight)] pt-10 pb-6 border-t border-[var(--borderColor)] transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand + About */}
          <div>
            <div className="flex items-center mb-4 gap-3">
              <Image
                src="/android-chrome-192x192.png"
                alt="Utkarsh Sorathia"
                width={48}
                height={48}
                loading="lazy"
                className="w-12 h-auto aspect-square object-cover rounded-lg"
              />
              <h3 className="text-lg font-bold text-[var(--textColor)] tracking-wide pt-2">
                Utkarsh Sorathia
              </h3>
            </div>
            <p className="text-sm text-[var(--textColorLight)] leading-relaxed">
              Full Stack Developer & Software Engineer crafting clean, performant,
              and modern digital experiences.
            </p>

            <div className="flex items-center space-x-4 mt-4">
              {socialLinks
                .map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="text-[var(--textColorLight)] hover:text-[var(--primaryColor)] transition-all duration-300 hover:scale-110 flex items-center justify-center w-8 h-8 rounded-full bg-[var(--dialogColor50)] border border-[var(--borderColor)] shadow-sm"
                >
                  <span className="text-lg flex items-center justify-center">
                    {link.icon}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full px-0 md:px-10 lg:px-20">
            <h4 className="text-md font-semibold text-[var(--textColor)] mb-3">Quick Links</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "About Me", href: "#about" },
                { name: "Services", href: "#services" },
                { name: "Projects", href: "#projects" },
                { name: "Experience", href: "#experience" },
                { name: "Skills", href: "#skills" },
                { name: "Contact", href: "#contact" },
                { name: "Blogs", href: "/blogs" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative overflow-hidden group w-fit"
                >
                  <span className="block transition-all duration-300 text-[var(--textColorLight)]">
                    {link.name}
                  </span>
                  <span className="absolute inset-0 text-[var(--primaryColor)] transition-transform duration-300 translate-y-full group-hover:translate-y-0 font-medium">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-md font-semibold text-[var(--textColor)] mb-3">
              Newsletter
            </h4>
            <p className="text-sm text-[var(--textColorLight)] font-medium mb-3">
              Subscribe to get updates on new blogs and tech tips.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-auto flex-1 px-3 py-2 rounded-md bg-[var(--dialogColor50)] text-[var(--textColor)] border border-[var(--borderColor)] focus:outline-none focus:border-[var(--primaryColor)] focus:ring-2 focus:ring-[var(--primaryColor)]/20 transition-all duration-300 placeholder:text-[var(--textColor50)]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-[var(--primaryColor)] text-white font-bold rounded-md hover:opacity-90 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "..." : "Subscribe"}
              </button>
            </form>
            <p className="text-[10px] text-[var(--textColorLight)] mt-2 leading-tight">
              Protected by reCAPTCHA. Google{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline hover:text-[var(--primaryColor)]">Privacy</a>{' '}
              &{' '}
              <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline hover:text-[var(--primaryColor)]">Terms</a> apply.
            </p>

            {message && (
              <p className="text-xs mt-2 text-[var(--primaryColor)]">
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center mt-8 pt-6 border-t border-[var(--borderColor)]">
          <p className="text-[11px] font-medium text-[var(--textColorLight)] uppercase tracking-wider">
            © {new Date().getFullYear()} Utkarsh Sorathia. All Rights Reserved.
          </p>
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
