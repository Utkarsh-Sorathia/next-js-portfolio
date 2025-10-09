"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFoundClient() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-6xl font-bold text-white mb-4"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-lg text-gray-300 mb-8 max-w-md"
      >
        Oops! The page you’re looking for doesn’t exist.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Link
          href="/"
          className="inline-block bg-[#4361ee] text-white px-6 py-3 rounded-full font-medium shadow-md hover:bg-[#2e4ac7] transition-colors"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
