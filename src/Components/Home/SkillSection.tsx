"use client";

import { motion } from "framer-motion";
import ConstrainedBox from "../core/constrained-box";
import ResponsiveBox from "../core/ResponsiveBox";
import GridBox from "../core/GridBox";
import SectionTitle from "../common/SectionTitle";
import SkillCard from "../UI/SkillCard";
import skills from "../../data/skills";

const SkillSection = ({ id }: { id: string }) => {
  return (
    <ResponsiveBox
      classNames="bg-transparent items-center justify-center lg:px-12 xl:px-40 scroll-mt-8 lg:scroll-mt-24"
      id={id}
    >
      <ConstrainedBox classNames="px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <SectionTitle>Skills</SectionTitle>
        </motion.div>

        <GridBox classNames="justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {skills.map((skill, index) => {
            return (
              <motion.div
                key={`skill-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                className="w-full h-full"
              >
                <SkillCard data={skill} />
              </motion.div>
            );
          })}
        </GridBox>
      </ConstrainedBox>
    </ResponsiveBox>
  );
};

export default SkillSection;
