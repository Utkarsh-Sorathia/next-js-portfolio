"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ContactButton = ({ text, icon, url, className }: any) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isImagePath = icon.startsWith("/");

  return (
    <Link
      className={className}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={text}
    >
      <span className="flex justify-center items-center gap-2">
        {isImagePath ? (
          <Image
            src={mounted && resolvedTheme === "dark" && icon.includes("github.svg") ? "/skills/github-white.webp" : icon}
            alt={text}
            width={32}
            height={32}
            className="object-contain"
          />
        ) : (
          <i className={`${icon} leading-none`} />
        )}
        <p className="text-lg/6 font-semibold text-foreground">{text}</p>
      </span>
    </Link>
  );
};

export default ContactButton;
