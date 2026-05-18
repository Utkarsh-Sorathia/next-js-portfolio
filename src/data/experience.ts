import { IExperienceItem } from "@/interfaces";

const experience: IExperienceItem[] = [
  {
    company: "Sparkle Infotech",
    position: "MERN Stack Developer",
    startDate: "Nov 2024",
    endDate: "Present",
    description: [
      "Lead development of production MERN applications, improving API performance and refactoring large codebases into cleaner, modular services.",
      "Build SEO-focused Next.js sites and custom Strapi plugins for client projects.",
      "Optimized GraphQL queries, cutting data-fetching time by 40%.",
    ],
    location: "Surat, Gujarat, India",
    companyLogo: "/experience/sparkle-logo.webp",
    companyLink:"https://sparkleinfotech.com/"
  },
  {
    company: "PIXML IT Solutions",
    position: "Frontend Developer Intern",
    startDate: "Jan 2024",
    endDate: "May 2024",
    description: [
      "Built responsive React.js interfaces with Tailwind CSS and Bootstrap using a reusable component approach.",
      "Shipped production features with a focus on clean, accessible UI.",
      "Integrated frontend with backend APIs for reliable data flow.",
    ],
    location: "Surat, Gujarat, India",
    companyLogo: "/experience/pixml-logo.webp",
    companyLink:"https://www.pixml.in/"
  },
  
];

export default experience;
