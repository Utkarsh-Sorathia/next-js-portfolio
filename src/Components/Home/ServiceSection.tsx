"use client";

import { motion } from "framer-motion";
import ConstrainedBox from "../../Components/core/constrained-box";
import ResponsiveBox from "../../Components/core/ResponsiveBox";
import SectionTitle from "../../Components/common/SectionTitle";
import services from "@/data/services";
import { HoverGrid } from "../../Components/common/HoverGrid";
import { ServiceAccordion } from "../../Components/UI/ServiceAccordion";

const HomeSection2 = ({ id }: { id: string }) => {
  return (
    <ResponsiveBox
      classNames="bg-transparent items-center justify-center lg:px-12 xl:px-40"
      id={id}
    >
      <ConstrainedBox classNames="px-4 py-12 z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <SectionTitle>Services</SectionTitle>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          {/* Mobile Accordion */}
          <div className="md:hidden">
            <ServiceAccordion items={services} />
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:block">
            <HoverGrid cards={services} />
          </div>
        </motion.div>
      </ConstrainedBox>
    </ResponsiveBox>
  );
};

export default HomeSection2;
