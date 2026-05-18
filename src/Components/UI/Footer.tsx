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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-20">

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
              Full Stack Developer building fast, production-ready web apps with
              the MERN stack and Next.js.
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
          <div className="w-full lg:px-10">
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
                  className="text-[var(--textColorLight)] hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2 lg:col-span-1">
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
                aria-label="Email address for newsletter"
                placeholder="Enter your email"
                className="w-full sm:w-auto flex-1 min-w-0 px-3 py-2 rounded-md bg-white/5 text-zinc-300 border border-white/10 focus:outline-none focus:border-[var(--primaryColor)] focus:ring-2 focus:ring-[var(--primaryColor)]/20 transition-all duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-2 bg-[var(--primaryColor)] text-white font-bold rounded-md hover:opacity-90 transition-all disabled:opacity-50 flex-shrink-0 whitespace-nowrap"
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
      </div>
    </footer>
  );
};

export default Footer;
