"use client";

import Link from "next/link";
import socialLinks from "../../data/importantLinks";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const Footer = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!email) return setMessage("Please enter an email.");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message);

      if (data.success) setEmail("");
    } catch {
      setMessage("Failed to subscribe. Try again.");
    }
  };

  return (
    <footer className="bg-background text-foreground pt-10 pb-6 border-t border-border-custom">
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
              <h3 className="text-lg font-semibold text-foreground mb-3 tracking-wide items-center pt-4">
                Utkarsh Sorathia
              </h3></div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Full Stack Developer & Software Engineer crafting clean, performant,
              and modern digital experiences.
            </p>

            <div className="flex items-center space-x-5 mt-4">
              {socialLinks.map((link, index) => {
                const isImagePath = link.icon?.startsWith("/");
                const isGitHub = link.name?.toLowerCase() === "github";
                const isDark = resolvedTheme === "dark";
                
                let iconSrc = link.icon ?? "";
                if (mounted && isGitHub) {
                  iconSrc = isDark ? "/skills/github-white.webp" : "/skills/github.svg";
                }

                return (
                  <Link
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name ?? "Social Link"}
                    className="text-text-secondary hover:text-primary transition-colors duration-300 inline-flex items-center justify-center"
                  >
                    {isImagePath || (mounted && isGitHub) ? (
                      <Image
                        src={iconSrc}
                        alt={link.name ?? "Social Icon"}
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    ) : (
                      <i className={`${link.icon} text-xl leading-none`} />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full px-0 md:px-10 lg:px-20">
            <h4 className="text-md font-semibold text-foreground mb-3">Quick Links</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Link href="/" className="hover:text-primary">Home</Link>
              <Link href="#about" className="hover:text-primary">About Me</Link>
              <Link href="#services" className="hover:text-primary">Services</Link>
              <Link href="#projects" className="hover:text-primary">Projects</Link>
              <Link href="#experience" className="hover:text-primary">Experience</Link>
              <Link href="#skills" className="hover:text-primary">Skills</Link>
              <Link href="#contact" className="hover:text-primary">Contact</Link>
              <Link href="/blogs" className="hover:text-primary">Blogs</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-md font-semibold text-foreground mb-3">
              Newsletter
            </h4>
            <p className="text-sm text-text-secondary mb-3">
              Subscribe to get updates on new blogs and tech tips.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-auto flex-1 px-3 py-2 rounded-md bg-card-bg text-foreground border border-border-custom focus:outline-none focus:border-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition"
              >
                Subscribe
              </button>
            </form>

            {message && (
              <p className="text-xs mt-2 text-primary">
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center text-xs text-text-secondary mt-8 pt-6 border-t border-border-custom">
          © {new Date().getFullYear()} Utkarsh Sorathia. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
