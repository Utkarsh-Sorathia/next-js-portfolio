import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/Components/UI/Header";
import ScrollToTop from "@/Components/common/ScrollToTop";
import { navMenus } from "../data/navItems";
import Footer from "@/Components/UI/Footer";
import Strings from "@/constants/strings";
import GoogleAnalytics from "@/Components/core/GoogleAnalytics";
import BlogButton from "@/Components/UI/BlogButton";
import ErrorBoundary from "@/Components/common/ErrorBoundary";
import { Suspense } from "react";

import ChatWidget from "@/Components/UI/ChatWidget";
import KBarWrapper from "@/Components/core/KBarWrapper";

import { baseURL } from "@/utils/api";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import VisitorTracker from "@/Components/core/VisitorTracker";
import Script from "next/script";
import CustomCursor from "@/Components/core/CustomCursor";

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
  title: "Utkarsh Sorathia | Full Stack Developer (MERN & Next.js)",
  description:
    "Full Stack Developer specializing in Next.js, React, and MERN Stack. Building scalable, high-performance web applications and sharing modern development insights.",
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
    "Utkarsh Sorathia",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Web Developer India"
  ],
  openGraph: {
    title: "Utkarsh Sorathia | Full Stack Developer (MERN & Next.js)",
    description:
      "Full Stack Developer specializing in Next.js, React, and MERN Stack. Building scalable, high-performance web applications and sharing modern development insights.",
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
    title: "Utkarsh Sorathia | Full Stack Developer (MERN & Next.js)",
    description:
      "Full Stack Developer specializing in Next.js, React, and MERN Stack. Building scalable, high-performance web applications and sharing modern development insights.",
    images: [`${baseUrl}/UtkarshSorathia.webp`],
    creator: "@utkarshsor03",
    site: "@utkarshsor03",
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
  alternates: {
    canonical: baseUrl,
    types: {
      "application/rss+xml": `${baseUrl}/rss.xml`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>

        <link rel="preconnect" href="https://cdn.sanity.io" />

        <link rel="me" href="https://www.wikidata.org/wiki/Q137171536" />
        <link rel="me" href={Strings.githubLink} />
        <link rel="me" href={Strings.linkedInLink} />
        <link rel="me" href={Strings.twitterLink} />
        <link rel="me" href={Strings.instagramLink} />
        <link rel="me" href={Strings.upworkLink} />
        <link rel="alternate" type="application/rss+xml" title="Utkarsh Sorathia Blog RSS Feed" href={`${baseUrl}/rss.xml`} />

      </head>
      <body className="flex flex-col min-h-screen antialiased" suppressHydrationWarning>
        <KBarWrapper>
          <CustomCursor />
          <VisitorTracker />
          {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
            <Script
              src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
              strategy="lazyOnload"
            />
          )}
          <Header className="app_nav" navItems={navMenus} />
          <main className="flex-grow">{children}
            <Analytics />
            <SpeedInsights />
          </main>
          <Footer />
          <ScrollToTop />
          <ErrorBoundary>
            <Suspense fallback={null}>
              <GoogleAnalytics />
            </Suspense>
            <BlogButton />
            <ChatWidget />
          </ErrorBoundary>
        </KBarWrapper>
      </body>
    </html>
  );
}
