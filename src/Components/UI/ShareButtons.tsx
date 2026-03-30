'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Twitter, Linkedin, MessageCircle, Copy, Check } from 'lucide-react'

interface ShareButtonsProps {
  url: string;
  title: string;
}

const ShareButtons = ({ url, title }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false)

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'hover:bg-[#1DA1F2]',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'hover:bg-[#0077b5]',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'hover:bg-[#25D366]',
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`,
    },
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 mt-8">
      <span className="text-sm font-semibold text-[var(--textColorLight)] uppercase tracking-wider mr-2">Share This Post:</span>
      
      <div className="flex items-center gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2.5 bg-white/5 border border-white/10 rounded-full text-zinc-400 ${link.color} hover:text-white transition-all duration-300 transform active:scale-90`}
            aria-label={`Share on ${link.name}`}
            title={`Share on ${link.name}`}
          >
            <link.icon className="w-5 h-5" />
          </a>
        ))}
        
        <button
          onClick={copyToClipboard}
          className={`p-2.5 bg-white/5 border border-white/10 rounded-full text-zinc-400 hover:bg-[var(--primaryColor)] hover:text-white transition-all duration-300 transform active:scale-90 relative`}
          aria-label="Copy link to clipboard"
          title="Copy link"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Check className="w-5 h-5 text-green-400" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Copy className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  )
}

export default ShareButtons
