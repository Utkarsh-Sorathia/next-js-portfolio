"use client";

import { motion } from "framer-motion";
import ExperienceCard from "@/Components/UI/ExperienceCard";
import experiences from "@/data/experience";
import ConstrainedBox from "@/Components/core/constrained-box";
import SectionTitle from "@/Components/common/SectionTitle";
import ResponsiveBox from "@/Components/core/ResponsiveBox";

const ExperienceSection = ({ id }: { id: string }) => {
  return (
    <ResponsiveBox
      classNames="bg-transparent items-center justify-center lg:px-12 xl:px-40"
      id={id}
    >
      <ConstrainedBox classNames="px-4 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <SectionTitle>Experience</SectionTitle>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <ExperienceCard data={experiences} />
        </motion.div>
      </ConstrainedBox>
    </ResponsiveBox>
  );
};

export default ExperienceSection;
