import { IProjectItem, ProjectType, RepoType } from "@/interfaces";

const projects: IProjectItem[] = [
  {
    id: "Sparkle Infotech Site",
    title: "Sparkle Infotech (Company Site)",
    description:
      "Built and maintained the Sparkle Infotech company website using Next.js, Strapi CMS, and GraphQL. Delivered UI design fixes, layout improvements, and optimized GraphQL queries for significantly faster data fetching.",
    icon: "/skills/nextjs.webp",
    repoType: RepoType.Private,
    projectType: ProjectType.JobWork,
    url: "https://sparkleinfotech.com/",
    tags: ["Next.js", "Strapi", "GraphQL", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "Griffin GPS AT SYS",
    title: "Griffin (GPS AT SYS)",
    description:
      "A high-concurrency MERN client system with an advanced filters-driven logs page for real-time data inspection. Built for high-traffic production workloads with fast query performance and a clean React dashboard UI.",
    icon: "/skills/nodejs.svg",
    repoType: RepoType.Private,
    projectType: ProjectType.JobWork,
    tags: ["MERN", "React.js", "Node.js", "MongoDB", "Filters", "Real-Time"],
  },
  {
    id: "Rediminds IDRE Client",
    title: "Rediminds (IDRE Client)",
    description:
      "A MERN + PostgreSQL hybrid client system with comprehensive E2E test coverage implemented using Playwright. Structured with modular Node.js services for improved scalability and reduced API latency.",
    icon: "/skills/postgresql.svg",
    repoType: RepoType.Private,
    projectType: ProjectType.JobWork,
    tags: ["MERN", "PostgreSQL", "Playwright", "E2E Testing", "Node.js"],
  },
  {
    id: "Baheer Euregio Master",
    title: "Baheer Euregio (Custom CMS)",
    description:
      "Developed custom Strapi plugins and bespoke React components to extend CMS functionality for the Baheer client. Designed specialized administrative interfaces to streamline complex editorial and publishing workflows.",
    icon: "/skills/strapi.svg",
    repoType: RepoType.Private,
    projectType: ProjectType.JobWork,
    tags: ["Strapi", "React.js", "Custom Plugins", "CMS", "Node.js"],
  },
  {
    id: "Next.js Portfolio Website",
    title: "Next.js Portfolio Website",
    description:
      "A modern portfolio built with Next.js 15, featuring a blog system with Sanity CMS, email subscriptions, and responsive design with dark mode. Showcases projects, skills, and experience with smooth animations.",
    icon: "/skills/nextjs.webp",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/Utkarsh-Sorathia/next-js-portfolio",
    url: "https://utkarshsorathia.in/",
    isCurrent: true,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS", "MongoDB", "Resend"],
  },
  {
    id: "Kachnar Nursery and Farm",
    title: "Kachnar Nursery & Farm (Website)",
    description:
      "A premium plant nursery website built with Next.js featuring a full plant catalog, newsletter, and structured data for SEO. Designed with a rich, nature-inspired aesthetic and a roadmap e-commerce with Supabase and Cloudinary.",
    icon: "/skills/nextjs.webp",
    repoType: RepoType.Private,
    url: "https://kachnar-nursery-and-farm.vercel.app/",
    projectType: ProjectType.Freelance,
    tags: ["Next.js", "TypeScript", "Supabase", "Cloudinary", "Tailwind CSS", "SEO"],
  },
  {
    id: "ChatApp Premium",
    title: "ChatApp Premium (PWA)",
    description:
      "A high-performance real-time messaging PWA featuring intelligent push notifications, sub-millisecond delivery, and glassmorphic UI. Built for cross-platform excellence with offline support and advanced session handling.",
    icon: "/skills/nextjs.webp",
    repoType: RepoType.Private,
    projectType: ProjectType.Personal,
    url: "https://chat.utkarshsorathia.in/",
    tags: ["Next.js", "Supabase", "PWA", "Edge-Functions", "PostgreSQL", "Tailwind"],
  },
  {
    id: "Typing Test Website",
    title: "Typingo - Typing Test Website",
    description:
      "A comprehensive web-based typing test platform designed to enhance typing speed, accuracy, and finger placement. Features interactive tests with real-time feedback and performance analytics.",
    icon: "/skills/react.svg",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/Utkarsh-Sorathia/Typingo",
    url: "https://typingo.vercel.app/",
    tags: ["React.js", "Tailwind css", "Typescript"],
  },
  {
    id: "Project Management Website",
    title: "Project Management Website",
    description:
      "A collaborative platform with secure authentication, detailed project dashboards, and real-time progress tracking. Features built-in comments section for effective teamwork and project delivery.",
    icon: "/skills/react.svg",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/Utkarsh-Sorathia/Project-Management",
    url: "https://utkarsh-project-management.netlify.app/",
    tags: ["React.js", "Redux", "Bootstrap", "Firebase"],
  },
];
export default projects;
