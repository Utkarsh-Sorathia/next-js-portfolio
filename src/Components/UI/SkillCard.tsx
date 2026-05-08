import type { ISkillListItem } from "@/interfaces";
import Image from "next/image";
import CardBox from "../core/CardBox";
import Row from "../core/Row";
import Column from "../core/Column";

const SkillCard = ({ data }: { data: ISkillListItem }) => {
  return (
    <CardBox classNames="p-4 items-center justify-start w-full">
      <div className="relative z-10 w-full">
        <h3 className="text-lg/6 font-semibold text-center text-[var(--primaryColor)]">{data.title}</h3>

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
                      src={skill.icon}
                      alt={`${skill.title} technology icon`}
                      width={56}
                      height={56}
                      loading="lazy"
                      className="w-12 lg:w-14 h-auto aspect-square object-cover"
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
