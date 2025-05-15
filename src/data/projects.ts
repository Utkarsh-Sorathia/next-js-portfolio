import { IProjectItem, ProjectType, RepoType } from "@/interfaces";

const projects: IProjectItem[] = [
  {
    id: "E-commerce Website",
    title: "E-commerce Website",
    description:
      "Our E-commerce site provides a smooth shopping experience, featuring easy user authentication, detailed plant descriptions, and a robust search function. With secure payment integration and informative pages, we aim to offer convenience and satisfaction to our customers.",
    icon: "/skills/react.svg",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/Utkarsh-Sorathia/Kachnaar",
    url: "https://kachnaar.netlify.app/",
    tags: ["React", "Firebase", "Redux-Toolkit", "Bootstrap", "Razorpay"],
  },
  {
    id: "Project Management Website",
    title: "Project Management Website",
    description:
      "Our project management platform streamlines collaboration with user authentication, detailed project pages, and progress tracking dashboards. The comments section fosters effective teamwork, ensuring successful project delivery.",
    icon: "/skills/react.svg",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/Utkarsh-Sorathia/Project-Management",
    url: "https://utkarsh-project-management.netlify.app/",
    tags: ["React.js", "Redux", "Bootstrap", "Firebase"],
  },
  {
    id: "My Portfolio Website",
    title: "My Portfolio Website",
    description:
      "My portfolio website showcases my expertise in React.js, Bootstrap, and Firebase, providing a comprehensive and visually appealing platform for showcasing my skills and projects.",
    icon: "/skills/react.svg",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/Utkarsh-Sorathia/Portfolio-Utkarsh",
    url: "https://utkarsh-sorathia.netlify.app/",
    tags: ["React.js", "Bootstrap", "Formspree"],
  },
   {
    id: "Typing Test Website",
    title: "Typingo - Typing Test Website",
    description:
      "Typingo, a comprehensive web-based typing test and keyboard mastery platform. This tool is designed to improve your typing speed, accuracy, and finger placement using interactive tests and real-time feedback.",
    icon: "/skills/react.svg",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/Utkarsh-Sorathia/Typingo",
    url: "https://typingo.vercel.app/",
    tags: ["React.js", "Tailwind css", "Typescript"],
  },
];
export default projects;
