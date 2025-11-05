import { IProjectItem, ProjectType, RepoType } from "@/interfaces";

const projects: IProjectItem[] = [
  {
    id: "E-commerce Website",
    title: "E-commerce Website",
    description:
      "Our E-commerce website delivers a seamless shopping experience with smooth user authentication, detailed product descriptions, and a powerful search feature. With secure payment integration and informative pages, we ensure convenience, trust, and satisfaction for every customer.",
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
      "Our project management platform enhances collaboration with secure user authentication, detailed project dashboards, and real-time progress tracking. A built-in comments section promotes effective teamwork, ensuring efficient and successful project delivery.",
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
      "My portfolio website highlights my expertise in React.js, Bootstrap, and Firebase, offering a modern, responsive, and visually engaging platform to showcase my skills and projects.",
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
      "Typingo is a comprehensive web-based typing test platform designed to enhance typing speed, accuracy, and finger placement through interactive tests and real-time feedback.",
    icon: "/skills/react.svg",
    repoType: RepoType.Public,
    projectType: ProjectType.Personal,
    githubUrl: "https://github.com/Utkarsh-Sorathia/Typingo",
    url: "https://typingo.vercel.app/",
    tags: ["React.js", "Tailwind css", "Typescript"],
  },
];
export default projects;
