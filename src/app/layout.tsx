import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/Components/UI/Header";
import ScrollToTop from "@/Components/common/ScrollToTop";
import { navMenus } from "../data/navItems";
import Footer from "@/Components/UI/Footer";
import GoogleAnalytics from "@/Components/core/GoogleAnalytics";
import BlogButton from "@/Components/UI/BlogButton";
import ErrorBoundary from "@/Components/common/ErrorBoundary";
import { Suspense } from "react";
import WhatsAppButton from "@/Components/UI/WhatsAppButton";
import { getPersonSchema, getWebSiteSchema } from "@/utils/structuredData";
import { baseURL } from "@/utils/api";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/Components/common/ThemeProvider";

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
      sizes: "48x48",
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
    "Utkarsh Sorathia developer",
    "Utkarsh Sorathia portfolio",
    "Utkarsh Sorathia resume",
    "Utkarsh Sorathia CV",
    "Utkarsh Sorathia github",
    "developer Utkarsh",
    "programmer Utkarsh",
    "Utkarsh India",
    "Utkarsh Surat",
    "Utkarsh Gujarat",
    "full stack developer",
    "web developer india",
    "react developer",
    "Full Stack Developer",
    "MERN Stack Developer",
    "React Developer",
    "Node.js Developer",
    "Portfolio",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript Developer",
    "MongoDB Developer",
    "Express.js Developer",
    "React.js Developer",
    "Frontend Development",
    "Backend Development",
    "Full Stack Portfolio",
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
        width: 1200,
        height: 630,
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
          as="style"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/UtkarshSorathia.webp"
          as="image"
          type="image/webp"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4361ee" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Utkarsh Sorathia" />
        {/* Enhanced SEO for Utkarsh */}
        <meta name="author" content="Utkarsh Sorathia" />
        <meta name="copyright" content="Utkarsh Sorathia" />
        <meta name="subject" content="Utkarsh Sorathia - Full Stack Developer Portfolio" />
        <meta name="classification" content="Utkarsh Sorathia Portfolio, Full Stack Developer, Web Developer" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="owner" content="Utkarsh Sorathia" />
        <meta name="url" content={baseUrl} />
        <meta name="identifier-URL" content={baseUrl} />
        <meta name="directory" content="submission" />
        <meta name="category" content="Utkarsh Sorathia, Full Stack Developer, Portfolio, Web Development" />
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Surat, Gujarat, India" />
        <meta name="ICBM" content="21.1702, 72.8311" />
        <meta name="DC.title" content="Utkarsh Sorathia - Full Stack Developer" />
        <meta name="DC.creator" content="Utkarsh Sorathia" />
        <meta name="DC.subject" content="Utkarsh Sorathia, Full Stack Developer, Web Developer, Portfolio" />
        <meta name="DC.description" content="Portfolio of Utkarsh Sorathia, a passionate Full Stack Developer from Surat, India" />
        <meta name="DC.publisher" content="Utkarsh Sorathia" />
        <meta name="DC.contributor" content="Utkarsh Sorathia" />
        <meta name="DC.type" content="Portfolio Website" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.identifier" content={baseUrl} />
        <meta name="DC.language" content="en" />
        <meta name="DC.coverage" content="Worldwide" />
        <meta name="DC.rights" content="Copyright Utkarsh Sorathia" />
        {/* Additional Utkarsh-specific meta tags */}
        <meta property="profile:first_name" content="Utkarsh" />
        <meta property="profile:last_name" content="Sorathia" />
        <meta property="profile:username" content="utkarshsor03" />
        <meta property="og:profile:first_name" content="Utkarsh" />
        <meta property="og:profile:last_name" content="Sorathia" />
        <meta property="article:author" content="Utkarsh Sorathia" />
        <meta property="article:publisher" content="Utkarsh Sorathia" />
        <meta name="given-name" content="Utkarsh" />
        <meta name="family-name" content="Sorathia" />
        <meta name="name" content="Utkarsh Sorathia" />
        {/* OpenGraph Image Meta Tags */}
        <meta property="og:image" content={`${baseUrl}/UtkarshSorathia.webp`} />
        <meta property="og:image:url" content={`${baseUrl}/UtkarshSorathia.webp`} />
        <meta property="og:image:secure_url" content={`${baseUrl}/UtkarshSorathia.webp`} />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Utkarsh Sorathia - Full Stack Developer Portfolio" />
        {/* Twitter Card Image */}
        <meta name="twitter:image" content={`${baseUrl}/UtkarshSorathia.webp`} />
        <meta name="twitter:image:src" content={`${baseUrl}/UtkarshSorathia.webp`} />
        <meta name="twitter:image:alt" content="Utkarsh Sorathia - Full Stack Developer Portfolio" />
        <link rel="me" href="https://www.wikidata.org/wiki/Q137171536" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getPersonSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteSchema()),
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen antialiased">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
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
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
