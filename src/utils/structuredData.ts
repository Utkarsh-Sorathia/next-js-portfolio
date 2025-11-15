import experience from "@/data/experience";
import educations from "@/data/education";
import Strings from "@/constants/strings";

const baseUrl = "https://utkarshsorathia.in";

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
  const pastJobs = experience.filter(exp => exp.endDate !== "Present");

  const worksFor = currentJob
    ? {
        "@type": "Organization",
        "@id": `${currentJob.companyLink}#org` || `${baseUrl}#worksFor`,
        name: currentJob.company,
        url: currentJob.companyLink || undefined,
        address: {
          "@type": "PostalAddress",
          addressLocality: currentJob.location,
          addressCountry: "IN",
        },
      }
    : undefined;

  const alumniOf = educations.map(edu => ({
    "@type": "EducationalOrganization",
    name: edu.educations?.[0]?.institute || "",
    address: {
      "@type": "PostalAddress",
      addressLocality: edu.educations?.[0]?.location || "",
      addressCountry: "IN",
    },
  }));

  const hasOccupation = {
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
  };

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}#person`,
    name: "Utkarsh Sorathia",
    alternateName: ["Utkarsh", "U.S."],
    url: baseUrl,
    image: makeImageObject(`${baseUrl}/UtkarshSorathia.webp`, 800, 800, "Utkarsh Sorathia"),
    jobTitle: "Full Stack Developer",
    description:
      "Utkarsh Sorathia is a passionate Full Stack Developer focused on creating scalable and performance-driven web applications using modern technologies like React.js, Next.js, Node.js, and MongoDB.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Surat",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    ...(worksFor && { worksFor }),
    alumniOf,
    hasOccupation,
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
    // include only public and crawlable profiles
    sameAs: [
      Strings.githubLink,
      Strings.linkedInLink,
      Strings.instagramLink,
      Strings.twitterLink,
      // Strings.facebookLink // include only if public and crawlable
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

/**
 * WEBSITE SCHEMA
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}#website`,
    name: "Utkarsh Sorathia - Portfolio",
    url: baseUrl,
    description:
      "Portfolio website of Utkarsh Sorathia, a Full Stack Developer specializing in React.js, Next.js, Node.js, and modern web technologies.",
    about: { "@id": `${baseUrl}#person` },
    publisher: {
      "@type": "Organization",
      name: "Utkarsh Sorathia Portfolio",
      url: baseUrl,
      logo: makeImageObject(`${baseUrl}/UtkarshSorathia.webp`, 1200, 630, "Utkarsh Sorathia Logo"),
      "@id": `${baseUrl}#publisher`,
    },
    author: {
      "@type": "Person",
      name: "Utkarsh Sorathia",
      "@id": `${baseUrl}#person`,
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/blogs?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    sameAs: [
      Strings.githubLink,
      Strings.linkedInLink,
      Strings.twitterLink,
    ].filter(Boolean),
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
