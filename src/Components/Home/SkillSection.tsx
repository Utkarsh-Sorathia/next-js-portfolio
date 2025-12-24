import ConstrainedBox from "../core/constrained-box";
import ResponsiveBox from "../core/ResponsiveBox";
import GridBox from "../core/GridBox";
import SectionTitle from "../common/SectionTitle";
import SkillCard from "../UI/SkillCard";
import skills from "../../data/skills";

const SkillSection = ({ id }: { id: string }) => {
  return (
    <ResponsiveBox
      classNames="bg-background items-center justify-center dark:bg-dot-white/[0.15] light:bg-dot-black/[0.1] lg:px-40"
      id={id}
    >
      <ConstrainedBox classNames="px-4 py-12">
        <SectionTitle>Skills</SectionTitle>

        <GridBox classNames="justify-items-center grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-8">
          {skills.map((skill, index) => {
            return <SkillCard key={`skill-${index}`} data={skill} />;
          })}
        </GridBox>
      </ConstrainedBox>
    </ResponsiveBox>
  );
};

export default SkillSection;
