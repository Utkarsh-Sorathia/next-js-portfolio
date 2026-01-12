  import Strings from "@/constants/strings";
  import type { ISocialLinkItem } from "@/interfaces";
  
  const socialLinks: ISocialLinkItem[] = [
    {
      name: Strings.github,
      url: Strings.githubLink,
      icon: Strings.githubIcon,
      text: Strings.githubUsername,
    },
    {
      name: Strings.linkedIn,
      url: Strings.linkedInLink,
      icon: Strings.linkedInIcon,
      text: Strings.linkedInUsername,
    },
    {
      name: Strings.instagram,
      url: Strings.instagramLink,
      icon: Strings.instagramIcon,
      text: Strings.instagramUsername,
    },
    {
      name: Strings.facebook,
      url: Strings.facebookLink,
      icon: Strings.facebookIcon,
      text: Strings.facebookUsername,
    },
    {
      name: Strings.twitter,
      url: Strings.twitterLink,
      icon: Strings.twitterIcon,
      text: Strings.twitterUsername,
    },
  ];
  
  export default socialLinks;
  