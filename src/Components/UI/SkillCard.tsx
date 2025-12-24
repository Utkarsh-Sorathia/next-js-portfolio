"use client";

import type { ISkillListItem } from "@/interfaces";
import Image from "next/image";
import CardBox from "../core/CardBox";
import Row from "../core/Row";
import Column from "../core/Column";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const SkillCard = ({ data }: { data: ISkillListItem }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getIcon = (skill: any) => {
    if (!mounted) return skill.icon;

    const isDark = resolvedTheme === "dark";

    if (skill.title.toLowerCase() === "next.js") {
      return isDark ? "/skills/nextjs.webp" : "/skills/next-js.svg";
    }

    if (skill.title.toLowerCase() === "github") {
      return isDark ? "/skills/github-white.webp" : "/skills/github.svg";
    }

    return skill.icon;
  };

  const getIconClass = (skill: any) => {
    return "";
  };

  return (
    <CardBox classNames="p-4 items-center justify-start rounded-2xl bg-primary-5 shadow-sm w-full group hover:bg-primary/10 transition-all duration-300 relative">
      <div className="relative z-10">
        <p className="text-lg/6 font-semibold text-center text-primary">{data.title}</p>

        {data.items.length > 0 ? (
          <Row classNames="gap-4 mt-8 flex-wrap justify-center items-center">
            {data.items.map((skill, index) => {
              const iconSrc = getIcon(skill);
              const iconClass = getIconClass(skill);

              return (
                <Column
                  key={`skill-item-${index}`}
                  classNames="items-center gap-1 text-foreground"
                >
                  {iconSrc ? (
                    <Image
                      src={iconSrc}
                      alt={`logo-${skill.title}`}
                      width={144}
                      height={144}
                      sizes="100%"
                      loading="lazy"
                      className={`w-12 lg:w-14 h-auto aspect-square object-contain ${iconClass}`}
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
