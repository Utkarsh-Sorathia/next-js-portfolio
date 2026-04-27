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
    <footer className="bg-[#050505] text-zinc-400 pt-10 pb-6 border-t border-white/10">
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
                className="w-12 h-auto aspect-square object-cover rounded-full bg-zinc-100"
              />
              <h3 className="text-lg font-bold text-white tracking-wide pt-2">
                Utkarsh Sorathia
              </h3>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Full Stack Developer & Software Engineer crafting clean, performant,
              and modern digital experiences.
            </p>

            <div className="flex items-center space-x-4 mt-4">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="text-zinc-400 hover:text-white transition-colors duration-300 text-xl"
                >
                  {typeof link.icon === 'string' ? (
                    <i className={link.icon} />
                  ) : (
                    link.icon
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full px-0 md:px-10 lg:px-20">
            <h4 className="text-md font-semibold text-white mb-3">Quick Links</h4>
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
                  <span className="block transition-all duration-300">
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
            <h4 className="text-md font-semibold text-white mb-3">
              Newsletter
            </h4>
            <p className="text-sm text-zinc-500 mb-3">
              Subscribe to get updates on new blogs and tech tips.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-auto flex-1 px-3 py-2 rounded-md bg-white/5 text-zinc-300 border border-white/10 focus:outline-none focus:border-[var(--primaryColor)] focus:ring-2 focus:ring-[var(--primaryColor)]/20 transition-all duration-300"
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
            <p className="text-[10px] text-zinc-600 mt-2 leading-tight">
              Protected by reCAPTCHA. Google{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline hover:text-zinc-500">Privacy</a>{' '}
              &{' '}
              <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline hover:text-zinc-500">Terms</a> apply.
            </p>

            {message && (
              <p className="text-xs mt-2 text-[var(--primaryColor)]">
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center mt-8 pt-6 border-t border-white/10">
          <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
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
