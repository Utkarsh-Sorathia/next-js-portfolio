import { IProjectItem, ProjectType, RepoType } from "@/interfaces";

const projects: IProjectItem[] = [
  {
    id: "E-commerce Website",
    title: "E-commerce Website",
    description:
      "A seamless shopping platform with user authentication, detailed product descriptions, and powerful search. Features secure payment integration and informative pages for a complete shopping experience.",
    icon: "/skills/react.svg",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/Utkarsh-Sorathia/Kachnaar",
    url: "https://kachnaar.netlify.app/",
    tags: ["React", "Firebase", "Redux-Toolkit", "Bootstrap", "Razorpay"],
  },
  {
    id: "Next.js Portfolio Website",
    title: "Next.js Portfolio Website",
    description:
      "A modern portfolio built with Next.js 15, featuring a blog system with Sanity CMS, email subscriptions, and responsive design with dark mode. Showcases projects, skills, and experience with smooth animations.",
    icon: "/skills/next-js.svg",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/Utkarsh-Sorathia/next-js-portfolio",
    url: "https://utkarshsorathia.in/",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS", "MongoDB", "Resend"],
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
    id: "My Portfolio Website",
    title: "My Portfolio Website",
    description:
      "A modern and responsive portfolio website showcasing expertise in React.js, Bootstrap, and Firebase. Features an engaging design to highlight skills, projects, and professional experience effectively.",
    icon: "/skills/react.svg",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/Utkarsh-Sorathia/Portfolio-Utkarsh",
    url: "https://utkarsh-sorathia.netlify.app/",
    tags: ["React.js", "Bootstrap", "Formspree"],
  },
];
export default projects;
