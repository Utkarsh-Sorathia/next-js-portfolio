import { IServiceItem } from "@/interfaces";

const services: IServiceItem[] = [
  {
    id: 1,
    title: "Mobile App Development",
    icons: [
      "/skills/socket-io.png",
      "/skills/react-native.svg",
      "/skills/firebase.svg",
    ],
    shortDescription:
      "I create engaging mobile applications for your audience.",
    description:
      "I design and develop engaging mobile applications for iOS and Android, delivering seamless performance, intuitive interfaces, and robust functionality. Using cutting-edge technologies, I create apps that align with your business goals and provide an exceptional user experience.",
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
      "I create stunning, user-friendly websites that strengthen your online presence. From simple pages to full e-commerce platforms, I deliver custom web solutions using the latest technologies for a responsive, SEO-friendly, and seamless browsing experience.",
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
      "I build robust and scalable backend solutions to power your digital applications. From efficient database architectures and API development to secure server configuration, I ensure optimal performance, security, and scalability for seamless data management and high-traffic handling.",
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
      "I help define clear product goals, identify target audiences, and create a strategic roadmap. With expertise in product ideation and market analysis, I ensure your product meets user needs, aligns with your business strategy, and achieves long-term growth.",
  },
//   {
//     id: 5,
//     title: "DevOps",
//     icons: [
//       "/skills/docker.svg",
//       "/skills/kubernetes.svg",
//       "/skills/aws.svg",
//       "/skills/jenkins.svg",
//       "/skills/terraform.svg",
//     ],
//     shortDescription: "I streamline development and operations processes.",
//     description:
//       "I streamline development and operations processes through effective DevOps practices. I implement continuous integration and deployment pipelines, manage cloud infrastructure, and use containerization to ensure efficient, reliable, and scalable software delivery. Improve your workflow with DevOps solutions.",
//   },
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
      "I manage and optimize database systems for performance, reliability, and scalability. With expertise in SQL and NoSQL databases, I design schemas, write complex queries, and implement best practices to ensure data integrity and security.",
  },
];

export default services;
