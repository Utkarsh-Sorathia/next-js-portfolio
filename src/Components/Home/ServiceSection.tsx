import ConstrainedBox from "../../Components/core/constrained-box";
import ResponsiveBox from "../../Components/core/ResponsiveBox";
import SectionTitle from "../../Components/common/SectionTitle";
import { HoverGrid } from "../../Components/common/HoverGrid";
import services from "@/data/services";

const HomeSection2 = ({ id }: { id: string }) => {
  return (
    <ResponsiveBox
      classNames="dark:bg-[var(--dialogColor)] bg-[var(--dialogColor)] min-h-screen items-center justify-center dark:bg-dot-white/[0.15] bg-dot-white/[0.15] rounded-md lg:px-40"
      id={id}
    >
      <ConstrainedBox classNames="p-4 py-16 z-20">
        <SectionTitle>Services</SectionTitle>
        <HoverGrid cards={services} />
      </ConstrainedBox>
    </ResponsiveBox>
  );
};

export default HomeSection2;
