"use client";

import { RepoType, ProjectType, type IProjectItem } from "@/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import CardBox from "../../Components/core/CardBox";

import { useEffect, useState } from "react";

const ProjectCard = ({ project }: { project: IProjectItem }) => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains('light'));
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('light'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const getIconSrc = (icon: string) => {
    if (isLight) {
      if (icon?.includes("nextjs.webp")) return "/skills/nextjs-dark.svg";
      if (icon?.includes("github-white.webp")) return "/skills/github-dark.svg";
    }
    return icon;
  };
  return (
    <CardBox classNames="px-5 py-6 md:px-6 md:py-7 h-full min-h-auto md:min-h-[420px]">
      <div className="flex flex-col h-full">
        {/* 🏷️ Top Header: Icon and Badges */}
        <div className="flex items-start justify-between w-full mb-6">
          <div className="relative group/icon">
            <div className="absolute -inset-2 bg-[var(--primaryColor)]/10 rounded-xl blur-lg opacity-0 group-hover/icon:opacity-100 transition-opacity" />
            <div className="relative w-12 h-12 md:w-14 md:h-14 p-2.5 md:p-3 rounded-xl bg-[var(--dialogColor50)] border border-[var(--borderColor)] backdrop-blur-sm flex items-center justify-center shadow-2xl">
              <Image
                src={getIconSrc(project.icon)}
                alt={project.title}
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col items-end">
            {project.isCurrent && (
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="relative flex h-1 w-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1 w-1 bg-emerald-500"></span>
                </span>
                <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider text-emerald-500">Current</span>
              </div>
            )}
          </div>
        </div>

        {/* 📄 Content Section */}
        <div className="flex flex-col gap-2 md:gap-3 flex-grow">
          {/* Title Area (Consistent min-height only on desktop) */}
          <h3 className="text-lg md:text-xl font-bold text-[var(--primaryColor)] transition-colors duration-300 tracking-tight leading-tight md:min-h-[3.5rem] flex items-center">
            {project.title}
          </h3>
          
          {/* Description Area (Flexible height to show entire text) */}
          <div className="flex-grow">
            <p className="text-sm md:text-sm text-[var(--textColorLight)] leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        {/* 🛠️ Footer Area: Tags and Links (Engineered for Alignment) */}
        <div className="mt-6 md:mt-8 flex flex-col gap-5 md:gap-6">
          {/* Tech Stack Tags (Sits above buttons) */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 md:gap-1.5 pt-4 border-t border-[var(--borderColor)]">
              {project.tags.map((tag, i) => (
                <span
                   key={i}
                  className="text-[9px] md:text-[10px] font-semibold px-2 py-0.5 md:py-1 rounded-md bg-[var(--primaryColor)]/5 text-[var(--textColorLight)] border border-[var(--borderColor)] uppercase tracking-tight"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {/* Links Area (Pinned to the absolute bottom) */}
          <div className="flex items-center gap-2 mt-auto">
            {project.githubUrl || project.url ? (
              <>
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--dialogColor50)] border border-[var(--borderColor)] text-[10px] font-bold text-[var(--textColor)] hover:bg-[var(--primaryColor)] hover:text-white hover:border-[var(--primaryColor)] transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faGithub} className="text-xs" />
                    <span>Source</span>
                  </Link>
                )}
                {project.url && (
                  <Link
                    href={project.url}
                    target="_blank"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--primaryColor)] text-white border border-[var(--primaryColor)] text-[10px] font-bold hover:opacity-90 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faEye} className="text-xs" />
                    <span>Demo</span>
                  </Link>
                )}
              </>
            ) : (
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[var(--dialogColor50)] border border-[var(--borderColor)] text-[9px] font-bold uppercase tracking-widest text-[var(--textColorLight)]">
                <span className="w-1 h-1 rounded-full bg-[var(--primaryColor)]" />
                <span>
                  {project.projectType === ProjectType.JobWork && "Corporate Work"}
                  {project.projectType === ProjectType.Freelance && "Client Project"}
                  {project.projectType === ProjectType.Personal && "Private Project"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </CardBox>
  );
};

export default ProjectCard;
