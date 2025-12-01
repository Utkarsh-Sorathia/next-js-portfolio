import ConstrainedBox from "../../Components/core/constrained-box";
import ResponsiveBox from "../../Components/core/ResponsiveBox";
import SectionTitle from "../../Components/common/SectionTitle";
import ProjectList from "../UI/ProjectList";
import projects from "@/data/projects";

const ProjectSection = ({ id }: { id: string }) => {
  return (
    <ResponsiveBox
      classNames="dark:bg-[var(--bgColor)] bg-[var(--bgColor)] dark:bg-grid-white/[0.1] bg-grid-white/[0.1] items-center justify-center lg:px-40"
      id={id}
    >
      <ConstrainedBox classNames="px-4 py-12 lg:py-16">
        <SectionTitle>Projects/Recent Works</SectionTitle>

        <ProjectList projects={projects} />
      </ConstrainedBox>
    </ResponsiveBox>
  );
};

export default ProjectSection;
