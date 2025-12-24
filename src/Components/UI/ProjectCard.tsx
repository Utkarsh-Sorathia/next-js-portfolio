"use client";

import { RepoType, type IProjectItem } from "@/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import Column from "../../Components/core/Column";
import Row from "../../Components/core/Row";
import CardBox from "../../Components/core/CardBox";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ProjectCard = ({ project }: { project: IProjectItem }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getProjectIcon = () => {
    if (!mounted) return project.icon;
    const isDark = resolvedTheme === "dark";

    if (project.icon.includes("next-js.svg") || project.icon.includes("nextjs.webp")) {
      return isDark ? "/skills/nextjs.webp" : "/skills/next-js.svg";
    }
    return project.icon;
  };

  return (
    <CardBox classNames="min-w-[calc(100%-2rem)] sm:min-w-[25rem] md:min-w-[28rem] lg:min-w-full lg:w-full aspect-[3/5] lg:aspect-auto lg:min-h-[480px] max-h-[30rem] lg:max-h-none p-4 gap-4 items-center justify-between rounded-2xl bg-primary-5 shadow-sm group slide_in overflow-hidden hover:bg-primary/10 transition-all duration-300">
      <Column classNames="w-full items-center justify-start flex-1">
        <Row classNames="w-[2.5rem] md:w-[3rem] aspect-square items-center justify-center">
          <Image
            src={getProjectIcon()}
            alt={`project-${project.title}`}
            width={100}
            height={100}
            sizes="100%"
            loading="lazy"
            className="w-full h-full object-contain aspect-square"
          />
        </Row>

        <p className="text-lg lg:text-xl font-semibold mt-2 lg:mt-4 text-primary">{project.title}</p>
        <div
          className={`flex flex-row items-center justify-center rounded-full py-[0.05] px-[0.5rem] mt-2 capitalize text-center border ${
            project.repoType === RepoType.Private
              ? "text-error border-error-50"
              : "text-success border-success-50"
          }`}
        >
          <p className="text-xs/6 font-semibold">
            {project.repoType === RepoType.Private ? "Private" : "Public"}
          </p>
        </div>
        <Row classNames="w-full items-center justify-center mt-2 gap-2">
          {project.githubUrl ? (
            <Link
              href={project.githubUrl}
              aria-label={`${project.title} GitHub URL`}
              target="_blank"
              rel="noopener noreferrer"
              className="app__outlined_btn !rounded-full !p-2 lg:!p-3 !aspect-square !border-foreground flex items-center justify-center"
            >
              <Image
                src={mounted && resolvedTheme === "dark" ? "/skills/github-white.webp" : "/skills/github.svg"}
                alt="GitHub"
                width={24}
                height={24}
                className="object-contain"
              />
            </Link>
          ) : null}
          {project.url ? (
            <Link
              href={project.url}
              aria-label={`${project.title} Project URL`}
              target="_blank"
              rel="noopener noreferrer"
              className="app__outlined_btn !rounded-full !p-2 lg:!p-3 !aspect-square !border-foreground"
            >
              <FontAwesomeIcon
                icon={faEye}
                className="text-base/6 text-foreground"
              />
            </Link>
          ) : null}
        </Row>
        <p className="text-sm lg:text-base mx-auto text-justify px-2 mt-2 lg:mt-4 text-foreground">
          {project.description}
        </p>
        {project.tags && project.tags.length > 0 ? (
          <Row classNames="w-full items-center justify-center flex-wrap mt-2 lg:mt-4 gap-2">
            {project.tags.map((tag, i) => {
              return (
                <p
                  key={`tag-${i}`}
                  className="rounded-[var(--borderRadius)] border border-border-custom py-[.125rem] px-2 text-xs/6 font-normal bg-primary/10 text-foreground hover:bg-primary/20 transition-colors"
                >
                  {tag}
                </p>
              );
            })}
          </Row>
        ) : null}
      </Column>
    </CardBox>
  );
};

export default ProjectCard;
