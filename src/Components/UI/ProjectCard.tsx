"use client";

import { RepoType, type IProjectItem } from "@/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import Column from "../../Components/core/Column";
import Row from "../../Components/core/Row";
import CardBox from "../../Components/core/CardBox";

const ProjectCard = ({ project }: { project: IProjectItem }) => {
  return (
    <CardBox classNames="w-full lg:min-h-[450px] p-6 rounded-[var(--borderRadius)] border border-[rgba(255,255,255,0.10)] dark:bg-[var(--primaryColor5)] bg-[var(--primaryColor5)] shadow-[2px_4px_16px_0px_rgba(100,100,100,0.06)_inset] group slide_in overflow-hidden hover:shadow-[4px_8px_24px_0px_rgba(100,100,100,0.12)_inset] transition-shadow duration-300">
      <div className="w-full h-full flex flex-col justify-between items-center gap-4">
        {/* Top Section: Header & Info */}
        <div className="w-full flex flex-col items-center">
          <div className="w-[3rem] aspect-square flex items-center justify-center mb-4">
            <Image
              src={project.icon}
              alt={`project-${project.title}`}
              width={100}
              height={100}
              sizes="100%"
              loading="lazy"
              placeholder="blur"
              blurDataURL={project.icon}
              className="w-full h-full object-cover aspect-square"
            />
          </div>

          <p className="text-lg lg:text-xl font-semibold text-[var(--primaryColor)] text-center">{project.title}</p>
          
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            {project.isCurrent && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Current</span>
              </div>
            )}

            <div
              className={`flex flex-row items-center justify-center rounded-full py-[0.05rem] px-[0.75rem] capitalize text-center border ${
                project.repoType === RepoType.Private
                  ? "text-[var(--errorColor)] border-[var(--errorColor50)]"
                  : "text-[var(--successColor)] border-[var(--successColor50)]"
              }`}
            >
            <p className="text-[10px] font-bold uppercase tracking-widest">
              {project.repoType === RepoType.Private ? "Private" : "Public"}
            </p>
            </div>
          </div>

          <div className="flex items-center justify-center mt-4 gap-3">
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                aria-label={`${project.title} GitHub URL`}
                target="_blank"
                className="p-2 border border-white/10 rounded-full hover:bg-white/10 hover:border-[var(--primaryColor)] transition-all"
              >
                <FontAwesomeIcon icon={faGithub} className="text-lg text-zinc-100" />
              </Link>
            )}
            {project.url && (
              <Link
                href={project.url}
                aria-label={`${project.title} Project URL`}
                target="_blank"
                className="p-2 border border-white/10 rounded-full hover:bg-white/10 hover:border-[var(--primaryColor)] transition-all"
              >
                <FontAwesomeIcon icon={faEye} className="text-lg text-zinc-100" />
              </Link>
            )}
          </div>
        </div>

        {/* Middle Section: Description (Flex Grow) */}
        <div className="flex-grow flex flex-col justify-center">
          <p className="text-sm lg:text-base text-zinc-400 leading-relaxed line-clamp-4 text-justify">
            {project.description}
          </p>
        </div>

        {/* Bottom Section: Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="w-full flex flex-wrap items-center justify-center gap-2 pt-4">
            {project.tags.map((tag, i) => (
              <span
                key={`tag-${i}`}
                className="rounded-md border border-white/5 bg-white/5 py-1 px-2.5 text-[10px] font-bold uppercase tracking-tighter text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </CardBox>
  );
};

export default ProjectCard;
