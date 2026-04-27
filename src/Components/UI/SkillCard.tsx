"use client";

import type { ISkillListItem } from "@/interfaces";
import Image from "next/image";
import CardBox from "../core/CardBox";
import Row from "../core/Row";
import Column from "../core/Column";

import { useEffect, useState } from "react";

const SkillCard = ({ data }: { data: ISkillListItem }) => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains('light'));
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('light'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const getIconSrc = (skill: any) => {
    if (isLight) {
      if (skill.title === "Next.js") return "/skills/nextjs-dark.svg";
      if (skill.title === "GitHub") return "/skills/github-dark.svg";
    }
    return skill.icon;
  };
  return (
    <CardBox classNames="p-4 items-center justify-start w-full">
      <div className="relative z-10 w-full">
        <p className="text-lg/6 font-semibold text-center text-[var(--primaryColor)]">{data.title}</p>

        {data.items.length > 0 ? (
          <Row classNames="gap-4 mt-8 flex-wrap justify-center items-center">
            {data.items.map((skill, index) => {
              return (
                <Column
                  key={`skill-item-${index}`}
                  classNames="items-center gap-1 text-[var(--textColor)]"
                >
                  {skill.icon ? (
                    <Image
                      src={getIconSrc(skill)}
                      alt={`logo-${skill.title}`}
                      width={144}
                      height={144}
                      sizes="100%"
                      loading="lazy"
                      className="w-10 lg:w-12 h-auto aspect-square object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : null}

                  <p className="text-xs/6 font-normal">{skill.title}</p>
                </Column>
              );
            })}
          </Row>
        ) : null}
      </div>
    </CardBox>
  );
};

export default SkillCard;
