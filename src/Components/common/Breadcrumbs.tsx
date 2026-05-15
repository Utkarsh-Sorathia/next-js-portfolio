"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 py-2">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--textColorLight)]">
        {/* Home Icon */}
        <li className="flex items-center">
          <Link
            href="/"
            className="hover:text-[var(--primaryColor)] transition-colors duration-200 flex items-center"
            title="Home"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <motion.li
              key={item.url}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2"
            >
              <ChevronRight className="w-4 h-4 text-zinc-600 flex-shrink-0" />
              {isLast ? (
                <span className="text-[var(--textColor)] font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="hover:text-[var(--primaryColor)] transition-colors duration-200"
                >
                  {item.name}
                </Link>
              )}
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
