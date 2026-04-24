import { INavItem } from "@/interfaces";
import { 
  BsHouseFill, 
  BsPersonFill, 
  BsAwardFill, 
  BsCodeSquare, 
  BsClockHistory, 
  BsBriefcaseFill, 
  BsPersonLinesFill 
} from "react-icons/bs";

export const navMenus: INavItem[] = [
  {
    name: "Home",
    link: "/",
    icon: <BsHouseFill size={20} />,
  },
  {
    name: "About",
    link: "/#about",
    icon: <BsPersonFill size={20} />,
  },
  {
    name: "Skills",
    link: "/#skills",
    icon: <BsAwardFill size={20} />,
  },
  {
    name: "Projects",
    link: "/#projects",
    icon: <BsCodeSquare size={20} />,
  },
  {
    name: "Experience",
    link: "/#experience",
    icon: <BsClockHistory size={20} />,
  },
  {
    name: "Services",
    link: "/#services",
    icon: <BsBriefcaseFill size={20} />,
  },
  {
    name: "Contact",
    link: "/#contact",
    icon: <BsPersonLinesFill size={20} />,
  },
];
