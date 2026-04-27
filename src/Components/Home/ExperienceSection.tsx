import ExperienceCard from "../UI/ExperienceCard";
import experiences from "@/data/experience";
import ConstrainedBox from "../core/constrained-box";
import SectionTitle from "../common/SectionTitle";
import ResponsiveBox from "../core/ResponsiveBox";

const ExperienceSection = ({ id }: { id: string }) => {
  return (
    <ResponsiveBox
      classNames="items-center justify-center lg:px-40 bg-transparent bg-dot-white/[0.15]"
      id={id}
    >
      <ConstrainedBox classNames="px-4 py-12 lg:py-16">
        <SectionTitle>Experience</SectionTitle>
        <ExperienceCard data={experiences} />
      </ConstrainedBox>
    </ResponsiveBox>
  );
};

export default ExperienceSection;
