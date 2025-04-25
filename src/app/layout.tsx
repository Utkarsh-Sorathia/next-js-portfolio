import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/Components/UI/Header';
import ScrollToTop from '@/Components/common/ScrollToTop';
import { navMenus } from '../data/navItems';
import Footer from '@/Components/UI/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Portfolio | Utkarsh Sorathia',
  description:
    'Utkarsh Sorathia is a passionate Full Stack Developer focused on creating scalable and performance-driven web applications using modern technologies.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: [
    {
      url: '/favicon-16x16.png',
      rel: 'icon',
      sizes: '16x16',
      type: 'image/x-icon',
    },
    {
      url: '/favicon-32x32.png',
      rel: 'icon',
      sizes: '32x32',
      type: 'image/x-icon',
    },
    {
      url: '/favicon.ico',
      rel: 'icon',
      sizes: '48x48',
      type: 'image/x-icon',
    },
    {
      url: '/android-chrome-192x192.png',
      rel: 'icon',
      sizes: '192x192',
      type: 'image/png',
    },
  ],
  keywords: [
    'utkarsh sorathia',
    'utkarsh',
    'full stack developer',
    'web developer india',
    'react developer',
    'utkarsh portfolio',
    'utkarsh github',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta
          name="google-site-verification"
          content="0IXFzYG-G9iwXixbQXFVanLLZdN0y2CPTZ-5qZbu-Zc"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body className="antialiased">
        <Header className="app_nav" navItems={navMenus} />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
