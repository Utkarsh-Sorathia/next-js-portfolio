import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/Components/UI/Header";
import ScrollToTop from "@/Components/common/ScrollToTop";
import { navMenus } from "../data/navItems";
import Footer from "@/Components/UI/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Utkarsh Sorathia | Full Stack Developer",
  description:
    "Utkarsh Sorathia is a passionate Full Stack Developer focused on creating scalable and performance-driven web applications using modern technologies.",
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
      rel: "icon",
      sizes: "192x192",
      type: "image/png",
    },
  ],
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
    "full stack developer",
    "web developer india",
    "react developer",
    "utkarsh portfolio",
    "utkarsh github",
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
    url: "https://utkarsh-sorathia.vercel.app/",
    images: [
      {
        url: "https://utkarsh-sorathia.vercel.app/UtkarshSorathia.png",
        alt: "Utkarsh Sorathia Portfolio",
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
    images:
      "https://utkarsh-sorathia.vercel.app/UtkarshSorathia.png",
  },
  alternates: {
    canonical: "https://utkarsh-sorathia.vercel.app/",
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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Utkarsh Sorathia",
              url: "https://utkarsh-sorathia.vercel.app",
              jobTitle: "Full Stack Developer",
              sameAs: [
                "https://github.com/Utkarsh-Sorathia",
                "https://www.facebook.com/share/1FbsyHZuzG/",
                "https://www.linkedin.com/in/utkarsh-sorathia-a9292b22a",
                "https://www.instagram.com/utkarsh__sorathia",
                "https://x.com/utkarshsor03?t=fWrMF32Y7DivN7FJJMITYw&s=08",
              ],
              description:
                "Utkarsh Sorathia is a passionate Full Stack Developer focused on scalable, performance-driven web applications.",
            }),
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen antialiased">
        <Header className="app_nav" navItems={navMenus} />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
