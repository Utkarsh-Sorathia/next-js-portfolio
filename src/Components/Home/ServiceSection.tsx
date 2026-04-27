import ConstrainedBox from "../../Components/core/constrained-box";
import ResponsiveBox from "../../Components/core/ResponsiveBox";
import SectionTitle from "../../Components/common/SectionTitle";
import services from "@/data/services";
import { HoverGrid } from "../../Components/common/HoverGrid";
import { ServiceAccordion } from "../../Components/UI/ServiceAccordion";

const HomeSection2 = ({ id }: { id: string }) => {
  return (
    <ResponsiveBox
      classNames="items-center justify-center lg:px-40 bg-transparent bg-dot-white/[0.15]"
      id={id}
    >
      <ConstrainedBox classNames="px-4 py-12 z-20">
        <SectionTitle>Services</SectionTitle>
        
        {/* Mobile Accordion */}
        <div className="md:hidden">
          <ServiceAccordion items={services} />
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:block">
          <HoverGrid cards={services} />
        </div>
      </ConstrainedBox>
    </ResponsiveBox>
  );
};

export default HomeSection2;
