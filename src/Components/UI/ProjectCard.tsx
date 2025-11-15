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
    <CardBox classNames="min-w-[calc(100%-2rem)] sm:min-w-[25rem] md:min-w-[28rem] lg:min-w-full lg:w-full aspect-[3/5] lg:aspect-auto lg:min-h-[480px] max-h-[30rem] lg:max-h-none p-4 gap-4 items-center justify-between rounded-[var(--borderRadius)] border border-[rgba(255,255,255,0.10)] dark:bg-[var(--primaryColor5)] bg-[var(--primaryColor5)] shadow-[2px_4px_16px_0px_rgba(100,100,100,0.06)_inset] group slide_in overflow-hidden hover:shadow-[4px_8px_24px_0px_rgba(100,100,100,0.12)_inset] transition-shadow duration-300">
      <Column classNames="w-full items-center justify-start flex-1">
        <Row classNames="w-[2.5rem] md:w-[3rem] aspect-square items-center justify-center">
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
        </Row>

        <p className="text-lg lg:text-xl font-semibold mt-2 lg:mt-4 text-[var(--primaryColor)]">{project.title}</p>
        <div
          className={`flex flex-row items-center justify-center rounded-full py-[0.05] px-[0.5rem] mt-2 capitalize text-center border ${
            project.repoType === RepoType.Private
              ? "text-[var(--errorColor)] border-[var(--errorColor50)]"
              : "text-[var(--successColor)] border-[var(--successColor50)]"
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
              className="app__outlined_btn !rounded-full !p-2 lg:!p-3 !aspect-square !border-[var(--textColor)]"
            >
              <FontAwesomeIcon
                icon={faGithub}
                className="text-base/6 text-[var(--textColor)]"
              />
            </Link>
          ) : null}
          {project.url ? (
            <Link
              href={project.url}
              aria-label={`${project.title} Project URL`}
              target="_blank"
              rel="noopener noreferrer"
              className="app__outlined_btn !rounded-full !p-2 lg:!p-3 !aspect-square !border-[var(--textColor)]"
            >
              <FontAwesomeIcon
                icon={faEye}
                className="text-base/6 text-[var(--textColor)]"
              />
            </Link>
          ) : null}
        </Row>
        <p className="text-sm lg:text-base mx-auto text-justify px-2 mt-2 lg:mt-4">
          {project.description}
        </p>
        {project.tags && project.tags.length > 0 ? (
          <Row classNames="w-full items-center justify-center flex-wrap mt-2 lg:mt-4 gap-2">
            {project.tags.map((tag, i) => {
              return (
                <p
                  key={`tag-${i}`}
                  className="rounded-[var(--borderRadius)] border border-[var(--textColor50)] py-[.125rem] px-2 text-xs/6 font-normal bg-[var(--primaryColor)]/10 hover:bg-[var(--primaryColor)]/20 transition-colors"
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
