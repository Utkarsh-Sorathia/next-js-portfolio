import { IServiceItem } from "@/interfaces";

const services: IServiceItem[] = [
  {
    id: 2,
    title: "Web Development",
    icons: [
      "/skills/redux.svg",
      "/skills/react.svg",
      "/skills/nextjs.webp",
      "/skills/html.svg",
      "/skills/css.svg",
    ],
    shortDescription: "Fast, responsive web apps built with React and Next.js.",
    description:
      "I build modern, responsive web applications using React, Next.js, and TypeScript. My work ranges from single-page apps to complex, SEO-friendly platforms with server-side rendering, clean API integrations, and strong performance. I focus on scalability, fast load times, and reliable user experiences across devices.",
  },
  {
    id: 3,
    title: "Backend Development",
    icons: [
      "/skills/socket-io.webp",
      "/skills/docker.svg",
      "/skills/nodejs.svg",
      "/skills/express.svg",
      "/skills/aws.webp",
    ],
    shortDescription: "Secure, scalable APIs and backend systems with Node.js.",
    description:
      "I design and build secure, scalable backend systems using Node.js, Express, and NestJS. My work includes well-structured REST and GraphQL APIs, real-time communication with WebSockets, and backend architectures built to handle growth. I focus on clean database design, authentication, API security, caching, and cloud-ready deployments.",
  },
  {
    id: 1,
    title: "Mobile App Development",
    icons: [
      "/skills/socket-io.webp",
      "/skills/react-native.svg",
      "/skills/firebase.svg",
      "/skills/typescript.svg",
      "/skills/android-studio.webp",
    ],
    shortDescription:
      "Cross-platform iOS & Android apps with React Native.",
    description:
      "I build scalable mobile applications for iOS and Android using React Native and TypeScript. My focus is on performance, reliability, and real-world features like real-time updates, push notifications, offline support, and clean API integrations. I ensure apps are production-ready through performance optimization, app store readiness, and thorough testing.",
  },
  {
    id: 6,
    title: "Database Management",
    icons: [
      "/skills/mysql.svg",
      "/skills/postgresql.svg",
      "/skills/mongodb.svg",
      "/skills/redis.svg",
      "/skills/sqlite.svg",
    ],
    shortDescription: "Reliable SQL & NoSQL databases, designed and tuned to scale.",
    description:
      "I design and manage reliable database solutions using SQL and NoSQL technologies like PostgreSQL, MySQL, MongoDB, and Redis. My work includes schema design, query optimization, indexing, and performance tuning to ensure data is stored efficiently and scales with application needs.",
  },
  {
    id: 5,
    title: "DevOps",
    icons: [
      "/skills/docker.svg",
      "/skills/kubernetes.svg",
      "/skills/aws.webp",
      "/skills/github-white.webp",
      "/skills/git.svg",
    ],
    shortDescription: "Automated builds, testing, and deployments with CI/CD.",
    description:
      "I set up practical DevOps workflows to automate builds, testing, and deployments using Docker, cloud platforms, and CI/CD pipelines. My work focuses on containerized applications, reliable deployment processes, and basic monitoring to ensure applications run smoothly and can scale as needed.",
  },
  {
    id: 4,
    title: "Product Strategy",
    icons: [
      "/skills/git.svg",
      "/images/collaboration.webp",
      "/images/problem-solving.webp",
      "/images/analytical-skills.webp",
      "/skills/ubuntu.webp",
    ],
    shortDescription:
      "Turning product ideas into clear, buildable roadmaps.",
    description:
      "I help shape product direction by translating ideas into clear, actionable development plans. I work on defining core features, prioritizing requirements, and planning MVPs based on user needs and technical feasibility. My focus is on building practical roadmaps that developers can execute and users can actually use.",
  },
];

export default services;
