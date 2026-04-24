import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";
import type { MouseEventHandler, ReactNode, RefObject } from "react";

export interface INavItem {
  name: string;
  link: string;
  icon: string | ReactNode;
}

export enum RepoType {
  Public,
  Private,
}

export enum ProjectType {
  Personal,
  JobWork,
  Freelance,
}

export interface IProjectItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  repoType: RepoType;
  projectType?: ProjectType;
  githubUrl?: string;
  url?: string;
  tags?: string[];
  screenshots?: string[];
  about?: string;
  isCurrent?: boolean;
}

export type IServiceItem = {
  id: number | string;
  title: string;
  icon?: IconDefinition;
  shortDescription: string;
  description: string;
  icons: string[];
};

export interface ISkillListItem {
  title: string;
  items: ISkillItem[];
}

export enum SkillLevel {
  Expert,
  Intermediate,
  Beginner,
}

export interface ISkillItem {
  title: string;
  level?: SkillLevel;
  icon?: string;
}

export interface ISocialLinkItem {
  url: string;
  icon: string | ReactNode;
  text: string;
  name?: string;
}

export interface CoreComponentsProps {
  children: ReactNode;
  classNames?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  id?: string;
  elementRef?: RefObject<HTMLDivElement | null>;
}

export interface TimelineEntry {
  
  degree: string;
  educations: IEducationItem[]
}

export interface IEducationItem {
  institute: string;
  startDate: string;
  endDate?: string;
  location: string;
  cgpa: string;
}


export interface IExperienceItem {
  company: string;
  position: string;
  startDate: string; 
  endDate: string;
  description: string;
  location?: string;
  companyLogo?: string;
  companyLink?: string;
}

// Sanity CMS Blog Post Interface based on GROQ query
export interface ISanitySlug {
  current: string;
}

export interface ISanityAsset {
  altText?: string;
  url: string;
  lqip?: string;
}

export interface ISanityImage {
  asset: ISanityAsset;
}

export interface IBlogPost {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  publishedAt: string;
  slug: ISanitySlug;
  excerpt?: string;
  body: string | any; // Can be plain markdown string or legacy Portable Text
  image?: ISanityImage;
  recommended?: IBlogPost[];
}
