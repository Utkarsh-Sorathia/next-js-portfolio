"use client";

import { motion } from "framer-motion";
import ConstrainedBox from "../../Components/core/constrained-box";
import ResponsiveBox from "../../Components/core/ResponsiveBox";
import SectionTitle from "../../Components/common/SectionTitle";
import ProjectList from "../UI/ProjectList";
import projects from "@/data/projects";

const ProjectSection = ({ id }: { id: string }) => {
  return (
    <ResponsiveBox
      classNames="bg-transparent items-center justify-center lg:px-12 xl:px-40 scroll-mt-8 lg:scroll-mt-12"
      id={id}
    >
      <ConstrainedBox classNames="px-4 py-14 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <SectionTitle>Projects & Recent Works</SectionTitle>
        </motion.div>

        <ProjectList projects={projects} />
      </ConstrainedBox>
    </ResponsiveBox>
  );
};

export default ProjectSection;
