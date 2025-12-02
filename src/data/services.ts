import { IServiceItem } from "@/interfaces";

const services: IServiceItem[] = [
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
      "I create engaging mobile applications for your audience.",
    description:
      "I specialize in developing high-performance native and cross-platform mobile applications for iOS and Android using React Native, TypeScript, and modern mobile development frameworks. I build scalable mobile apps with real-time features, push notifications, offline capabilities, and seamless API integrations. My mobile development services include UI/UX design implementation, app store optimization, performance tuning, and comprehensive testing to ensure your mobile app delivers exceptional user engagement and business value.",
  },
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
    shortDescription: "I build visually stunning and user-friendly websites.",
    description:
      "I develop modern, responsive web applications and websites using React, Next.js, TypeScript, and cutting-edge frontend technologies. I create custom web solutions ranging from single-page applications to complex e-commerce platforms, progressive web apps, and enterprise-level web applications. My web development expertise includes server-side rendering, API integration, state management, performance optimization, and implementing SEO best practices to ensure your website ranks well and provides an exceptional user experience across all devices.",
  },
  {
    id: 3,
    title: "Backend Development",
    icons: [
      "/skills/socket-io.webp",
      "/skills/docker.svg",
      "/skills/nodejs.svg",
      "/skills/express.svg",
      "/skills/aws.svg",
    ],
    shortDescription: "I create robust and scalable backend infrastructures.",
    description:
      "I architect and develop secure, scalable backend systems using Node.js, Express, NestJS, and cloud technologies like AWS. I design RESTful and GraphQL APIs, implement real-time communication with WebSockets, and build microservices architectures that handle high traffic loads efficiently. My backend development services include database design, authentication and authorization systems, API security, caching strategies, and cloud infrastructure setup to ensure your application backend is performant, secure, and ready to scale.",
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
      "I define goals, target audiences, and roadmap for success.",
    description:
      "I provide comprehensive product strategy consulting to help you define clear product vision, identify target user personas, and create actionable roadmaps for product development and growth. I conduct market research, competitive analysis, and user research to ensure your product strategy aligns with market needs and business objectives. My product strategy services include feature prioritization, user journey mapping, MVP planning, and go-to-market strategies to help you build products that users love and drive sustainable business growth.",
  },
  {
    id: 5,
    title: "DevOps",
    icons: [
      "/skills/docker.svg",
      "/skills/kubernetes.svg",
      "/skills/aws.svg",
      "/skills/github-white.webp",
      "/skills/git.svg",
    ],
    shortDescription: "I streamline development and operations processes.",
    description:
      "I implement comprehensive DevOps solutions to automate and streamline your software development lifecycle using Docker, Kubernetes, AWS, and modern CI/CD tools. I set up continuous integration and continuous deployment pipelines, configure container orchestration, manage cloud infrastructure, and implement monitoring and logging solutions. My DevOps services include infrastructure as code, automated testing and deployment, containerization strategies, cloud migration, and performance monitoring to ensure your applications are deployed efficiently, run reliably, and scale seamlessly.",
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
    shortDescription: "I manage and optimize your database systems.",
    description:
      "I design, implement, and optimize database solutions using both SQL (MySQL, PostgreSQL) and NoSQL (MongoDB, Redis) technologies to ensure optimal performance, data integrity, and scalability. I create efficient database schemas, write optimized queries, implement indexing strategies, and set up database replication and backup systems. My database management services include database migration, performance tuning, query optimization, data modeling, and implementing security best practices to ensure your data is stored securely, accessed efficiently, and scales with your application's growth.",
  },
];

export default services;
