import ExperienceCard from "../UI/ExperienceCard";
import experiences from "@/data/experience";
import ConstrainedBox from "../core/constrained-box";
import SectionTitle from "../common/SectionTitle";
import ResponsiveBox from "../core/ResponsiveBox";

const ExperienceSection = ({ id }: { id: string }) => {
  return (
    <ResponsiveBox
      classNames="dark:bg-[var(--dialogColor)] bg-[var(--dialogColor)] items-center justify-center dark:bg-dot-white/[0.15] bg-dot-white/[0.15] lg:px-40"
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
