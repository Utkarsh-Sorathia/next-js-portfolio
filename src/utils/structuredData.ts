import experience from "@/data/experience";
import educations from "@/data/education";
import Strings from "@/constants/strings";
import { baseURL } from "@/utils/api";

const baseUrl = baseURL;

/**
 * Helpers
 */
function makeImageObject(url: string, width = 1200, height = 630, alt = "Utkarsh Sorathia") {
  return {
    "@type": "ImageObject",
    url,
    width,
    height,
    caption: alt,
  };
}

function ensureArray<T>(val: T | T[] | undefined): T[] {
  if (!val) return [];
  return Array.isArray(val) ? val : [val];
}

/**
 * PERSON SCHEMA
 */
export function getPersonSchema() {
  const currentJob = experience.find(exp => exp.endDate === "Present");

  const worksFor = currentJob
    ? {
      "@type": "Organization",
      "@id": `${currentJob.companyLink}#org`,
      name: currentJob.company,
      url: currentJob.companyLink,
      address: {
        "@type": "PostalAddress",
        addressLocality: currentJob.location?.split(",")[0]?.trim() || "Surat",
        addressRegion: "Gujarat",
        addressCountry: "IN",
        streetAddress: "",
        postalCode: "395002"
      },
    }
    : undefined;

  const alumniOf = educations.map((edu, idx) => ({
    "@type": "EducationalOrganization",
    "@id": `${baseUrl}#edu-${idx}`,
    name: edu.educations?.[0]?.institute || "",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Surat",
      addressRegion: "Gujarat",
      addressCountry: "IN",
      streetAddress: "",
      postalCode: "395002"
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}#person`,
    name: "Utkarsh Sorathia",
    alternateName: ["Utkarsh", "U.S."],
    url: baseUrl,
    image: makeImageObject(
      `${baseUrl}/UtkarshSorathia.webp`,
      800,
      800,
      "Utkarsh Sorathia"
    ),
    jobTitle: "Full Stack Developer",
    description:
      "Utkarsh Sorathia is a passionate Full Stack Developer focused on creating scalable and performance-driven web applications using modern technologies like React.js, Next.js, Node.js, and MongoDB.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Surat",
      addressRegion: "Gujarat",
      addressCountry: "IN",
      streetAddress: "",
      postalCode: "395002"
    },
    ...(worksFor && { worksFor }),
    alumniOf,
    hasOccupation: {
      "@type": "Occupation",
      "@id": `${baseUrl}#occupation`,
      name: "Full Stack Developer",
      occupationLocation: {
        "@type": "City",
        name: "Surat",
      },
      skills: [
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "TypeScript",
        "JavaScript",
        "MERN Stack",
      ],
    },
    knowsAbout: [
      "Web Development",
      "Full Stack Development",
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "TypeScript",
      "JavaScript",
      "MERN Stack",
      "Frontend Development",
      "Backend Development",
    ],
    sameAs: [
      Strings.githubLink,
      Strings.linkedInLink,
      Strings.instagramLink,
      Strings.twitterLink,
      "https://www.wikidata.org/wiki/Q137171536",
      "https://utkarshsorathia.in"
    ].filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "technical",
      email: "utkarshsor03@gmail.com",
      availableLanguage: ["en", "hi"],
    },
    nationality: {
      "@type": "Country",
      name: "India",
    },
    birthPlace: {
      "@type": "City",
      name: "Surat",
      addressCountry: "IN",
    },
    gender: "Male",
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}#website`,
    name: "Utkarsh Sorathia",
    alternateName: ["Utkarsh", "Utkarsh Sorathia Portfolio", "Utkarsh Portfolio"],
    url: baseUrl,
    description:
      "Portfolio website of Utkarsh Sorathia, a Full Stack Developer specializing in React.js, Next.js, Node.js, and modern web technologies.",
    publisher: {
      "@type": "Organization",
      "@id": `${baseUrl}#publisher`,
      name: "Utkarsh Sorathia",
      url: baseUrl,
      logo: makeImageObject(
        `${baseUrl}/UtkarshSorathia.webp`,
        1200,
        630,
        "Utkarsh Sorathia Logo"
      ),
    },
    inLanguage: "en-US",
  };
}

/**
 * SITE NAVIGATION SCHEMA (For Sitelinks like in your image)
 */
export function getSiteNavigationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "SiteNavigationElement",
        "position": 1,
        "name": "About Me",
        "url": `${baseUrl}/#about`
      },
      {
        "@type": "SiteNavigationElement",
        "position": 2,
        "name": "Projects",
        "url": `${baseUrl}/#projects`
      },
      {
        "@type": "SiteNavigationElement",
        "position": 3,
        "name": "Blogs",
        "url": `${baseUrl}/blogs`
      },
      {
        "@type": "SiteNavigationElement",
        "position": 4,
        "name": "Experience",
        "url": `${baseUrl}/#experience`
      },
      {
        "@type": "SiteNavigationElement",
        "position": 5,
        "name": "Skills",
        "url": `${baseUrl}/#skills`
      },
      {
        "@type": "SiteNavigationElement",
        "position": 6,
        "name": "Contact",
        "url": `${baseUrl}/#contact`
      }
    ]
  };
}



/**
 * ORGANIZATION SCHEMA
 */
export function getOrganizationSchema(companyName: string, companyUrl: string, location: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${companyUrl}#organization`,
    name: companyName,
    url: companyUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: location,
      addressCountry: "IN",
      streetAddress: "",
      postalCode: "395002"
    },
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/UtkarshSorathia.webp`,
    },
  };
}

/**
 * ARTICLE SCHEMA
 *
 * imageUrl can be a string or array of strings or ImageObject-like items.
 */
export function getArticleSchema(
  title: string,
  description: string,
  imageUrl: string | string[] | any,
  publishedDate: string,
  modifiedDate: string,
  slug: string,
  bodyText?: string // optional: used to compute wordCount if available
) {
  const articleId = `${baseUrl}/blogs/${slug}#article`;
  const pageId = `${baseUrl}/blogs/${slug}#webpage`;

  const images = ensureArray(imageUrl).map((img: any) =>
    typeof img === "string" ? makeImageObject(img, 1200, 630, title) : img
  );

  const wordCount =
    (bodyText && typeof bodyText === "string" && bodyText.trim().length)
      ? bodyText.trim().split(/\s+/).length
      : undefined;

  // estimate reading time (200 wpm)
  const readingMinutes = wordCount ? Math.max(1, Math.round(wordCount / 200)) : undefined;
  const timeRequired = readingMinutes ? `PT${readingMinutes}M` : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": articleId,
    headline: title,
    description,
    image: images,
    thumbnailUrl: images[0]?.url || `${baseUrl}/UtkarshSorathia.webp`,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: {
      "@type": "Person",
      name: "Utkarsh Sorathia",
      url: baseUrl,
      sameAs: [
        Strings.githubLink,
        Strings.linkedInLink,
        Strings.instagramLink,
        Strings.twitterLink,
      ].filter(Boolean),
      "@id": `${baseUrl}#person`,
    },
    publisher: {
      "@type": "Organization",
      name: "Utkarsh Sorathia Portfolio",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/UtkarshSorathia.webp`,
        width: 1200,
        height: 630,
      },
      "@id": `${baseUrl}#publisher`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageId,
    },
    url: `${baseUrl}/blogs/${slug}`,
    inLanguage: "en-US",
    articleSection: "Technology",
    keywords: [
      "web development",
      "programming",
      "technology",
      "react",
      "nextjs",
      "javascript",
      "typescript",
    ],
    isAccessibleForFree: true,
    copyrightYear: new Date().getFullYear(),
    ...(wordCount && { wordCount }),
    ...(timeRequired && { timeRequired }),
  };
}

/**
 * BREADCRUMB SCHEMA
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${baseUrl}#breadcrumbs`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * BLOG LISTING / COLLECTION PAGE SCHEMA
 * Optionally pass `posts` (array of { title, url, datePublished, image }) to include `blogPost` array
 */
export function getBlogListingSchema(posts?: { title: string; url: string; datePublished?: string; image?: string }[]) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": ["CollectionPage", "Blog"],
    "@id": `${baseUrl}/blogs#blog`,
    name: "Blog | Utkarsh Sorathia",
    description: "Read my latest thoughts on web development, technology, and programming.",
    url: `${baseUrl}/blogs`,
    author: {
      "@type": "Person",
      name: "Utkarsh Sorathia",
      "@id": `${baseUrl}#person`,
    },
    publisher: {
      "@type": "Organization",
      name: "Utkarsh Sorathia Portfolio",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/UtkarshSorathia.webp`,
        width: 1200,
        height: 630,
      },
      "@id": `${baseUrl}#publisher`,
    },
    inLanguage: "en-US",
  };

  if (posts && posts.length > 0) {
    schema.blogPost = posts.slice(0, 10).map(p => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: p.url,
      datePublished: p.datePublished,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${p.url}#webpage`,
      },
      ...(p.image ? { image: [makeImageObject(p.image, 1200, 630, p.title)] } : {}),
    }));
  }

  return schema;
}

/**
 * ADDITIVE SCHEMAS FOR ENHANCED PERFORMANCE
 */

export function getProfilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Utkarsh",
      "alternateName": "Utkarsh Sorathia",
      "identifier": "Utkarsh",
      "description": "Utkarsh is a Full Stack Developer and Software Engineer.",
      "image": `${baseUrl}/UtkarshSorathia.webp`,
      "sameAs": [
        Strings.githubLink,
        Strings.linkedInLink,
        Strings.twitterLink,
        Strings.instagramLink
      ].filter(Boolean)
    }
  };
}

export function getFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who is Utkarsh?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Utkarsh (full name Utkarsh Sorathia) is a professional Full Stack Developer specializing in React, Next.js, and Node.js. He is based in India and creates modern web applications."
        }
      },
      {
        "@type": "Question",
        "name": "What does Utkarsh do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Utkarsh builds scalable, performance-driven web and mobile applications using the MERN stack and Next.js."
        }
      }
    ]
  };
}

export function getCompleteBlogSchema(posts: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${baseUrl}/blogs#fullblog`,
    "name": "Utkarsh's Complete Blog Collection",
    "blogPost": posts.map(p => ({
      "@type": "BlogPosting",
      "headline": p.title,
      "url": `${baseUrl}/blogs/${p.slug.current}`,
      "datePublished": p.publishedAt,
      "author": {
         "@type": "Person",
         "name": "Utkarsh"
      }
    }))
  };
}

/**
 * PROFESSIONAL SERVICE SCHEMA (For the "Business" look in search results)
 */
export function getProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}#service`,
    "name": "Utkarsh Sorathia - Full Stack Web Development",
    "image": `${baseUrl}/UtkarshSorathia.webp`,
    "url": baseUrl,
    "telephone": "+918866300463",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "306, Rajhans Complex - 2, Civil Char Rasta, Ring Rd",
      "addressLocality": "Surat",
      "addressRegion": "Gujarat",
      "postalCode": "395002",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 21.1702,
      "longitude": 72.8311
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": `${baseUrl}/UtkarshSorathia.webp`,
      "width": 1200,
      "height": 630
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "21:00"
    },
    "sameAs": [
        Strings.githubLink,
        Strings.linkedInLink,
        Strings.twitterLink,
        Strings.instagramLink
    ].filter(Boolean)
  };
}
