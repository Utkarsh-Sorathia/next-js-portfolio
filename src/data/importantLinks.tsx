import Strings from "@/constants/strings";
import type { ISocialLinkItem } from "@/interfaces";
import { 
  SiGithub, 
  SiLinkedin, 
  SiInstagram, 
  SiFacebook, 
  SiX, 
  SiUpwork 
} from "react-icons/si";

const socialLinks: ISocialLinkItem[] = [
  {
    name: Strings.github,
    url: Strings.githubLink,
    icon: <SiGithub />,
    text: Strings.githubUsername,
  },
  {
    name: Strings.linkedIn,
    url: Strings.linkedInLink,
    icon: <SiLinkedin className="text-[#0a66c2]" />,
    text: Strings.linkedInUsername,
  },
  {
    name: Strings.instagram,
    url: Strings.instagramLink,
    icon: <SiInstagram className="text-[#e4405f]" />,
    text: Strings.instagramUsername,
  },
  {
    name: Strings.facebook,
    url: Strings.facebookLink,
    icon: <SiFacebook className="text-[#1877f2]" />,
    text: Strings.facebookUsername,
  },
  {
    name: Strings.twitter,
    url: Strings.twitterLink,
    icon: <SiX />,
    text: Strings.twitterUsername,
  },
  {
    name: Strings.upwork,
    url: Strings.upworkLink,
    icon: <SiUpwork className="text-[#14a800]" />,
    text: Strings.upworkUsername,
  },
];

export default socialLinks;
  