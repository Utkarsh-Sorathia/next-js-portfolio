import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'github-markdown-css/github-markdown.css';
import Header from "@/Components/UI/Header";
import ScrollToTop from "@/Components/common/ScrollToTop";
import { navMenus } from "../data/navItems";
import Footer from "@/Components/UI/Footer";
import GoogleAnalytics from "@/Components/core/GoogleAnalytics";
import BlogButton from "@/Components/UI/BlogButton";
import ErrorBoundary from "@/Components/common/ErrorBoundary";
import { Suspense } from "react";
import WhatsAppButton from "@/Components/UI/WhatsAppButton";
import ChatWidget from "@/Components/UI/ChatWidget";

import { baseURL } from "@/utils/api";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"

const baseUrl = baseURL;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Utkarsh Sorathia - Computer Engineer / Full Stack Developer",
  description:
    "Utkarsh Sorathia is a passionate Full Stack Developer focused on creating scalable and performance-driven web applications using modern technologies.",
  authors: [{ name: "Utkarsh Sorathia", url: baseUrl }],
  creator: "Utkarsh Sorathia",
  publisher: "Utkarsh Sorathia",
  applicationName: "Utkarsh Sorathia Portfolio",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: [
    {
      url: "/favicon-16x16.png",
      rel: "icon",
      sizes: "16x16",
      type: "image/png",
    },
    {
      url: "/favicon-32x32.png",
      rel: "icon",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "/favicon.ico",
      rel: "icon",
      sizes: "any",
      type: "image/x-icon",
    },
    {
      url: "/android-chrome-192x192.png",
      rel: "apple-touch-icon",
      sizes: "192x192",
      type: "image/png",
    },
  ],
  manifest: "/manifest.json",
  keywords: [
    "utkarsh sorathia",
    "Utkarsh Sorathia",
    "utkarsh",
    "Utkarsh",
    "Utkarsh CV",
    "UtkarshSorathia",
    "sorathiautkarsh",
    "Sorathia Utkarsh",
    "sorathia utkarsh",
    "utkarsh resume",
    "utkarsh portfolio",
    "utkarsh github",
    "Utkarsh developer",
    "Utkarsh programmer",
    "Utkarsh software engineer",
    "Utkarsh web developer",
    "Utkarsh full stack",
    "Utkarsh React developer",
    "Utkarsh Next.js developer",
    "Utkarsh Node.js developer",
    "Utkarsh MERN developer",
    "Utkarsh portfolio website",
    "Utkarsh India",
    "Utkarsh Surat",
    "Utkarsh Gujarat",
    "full stack developer",
    "web developer india",
    "react developer",
  ],
  openGraph: {
    title: "Utkarsh Sorathia | Full Stack Developer",
    description:
      "Utkarsh Sorathia is a passionate Full Stack Developer focused on creating scalable and performance-driven web applications using modern technologies.",
    url: baseUrl,
    siteName: "Utkarsh Sorathia Portfolio",
    images: [
      {
        url: `${baseUrl}/UtkarshSorathia.webp`,
        alt: "Utkarsh Sorathia - Full Stack Developer Portfolio",
        width: 512,
        height: 487,
        type: "image/webp",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Utkarsh Sorathia | Full Stack Developer",
    description:
      "Utkarsh Sorathia is a passionate Full Stack Developer focused on creating scalable and performance-driven web applications using modern technologies.",
    images: [`${baseUrl}/UtkarshSorathia.webp`],
    creator: "@utkarshsor03",
    site: "@utkarshsor03",
  },
  alternates: {
    canonical: baseUrl,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Utkarsh Sorathia",
    "geo.region": "IN-GJ",
    "geo.placename": "Surat, Gujarat, India",
    "geo.position": "21.1702; 72.8311",
    "ICBM": "21.1702, 72.8311",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
        <link rel="me" href="https://www.wikidata.org/wiki/Q137171536" />
        <link rel="me" href="https://www.github.com/Utkarsh-Sorathia" />
        <link rel="me" href="https://www.linkedin.com/in/utkarsh-sorathia-a9292b22a" />
        <link rel="me" href="https://x.com/utkarshsor03" />
        <link rel="me" href="https://www.instagram.com/utkarsh__sorathia" />

      </head>
      <body className="flex flex-col min-h-screen antialiased">
        <ErrorBoundary>
          <Header className="app_nav" navItems={navMenus} />
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>
          <main className="flex-grow">{children}
            <Analytics />
            <SpeedInsights />
          </main>
          <Footer />
          <ScrollToTop />
          <BlogButton />
          <WhatsAppButton />
          <ChatWidget />
        </ErrorBoundary>
      </body>
    </html>
  );
}
