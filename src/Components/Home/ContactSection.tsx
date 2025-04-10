import ResponsiveBox from "../../Components/core/ResponsiveBox";
import ConstrainedBox from "../../Components/core/constrained-box";
import GridBox from "../../Components/core/GridBox";
import Column from "../../Components/core/Column";
import SectionTitle from "../../Components/common/SectionTitle";
import ContactButton from "../UI/ContactButton";
import socialLinks from "../../data/importantLinks";

const HomeSection6 = ({ id }: { id: string }) => {
  return (
    <ResponsiveBox
      classNames="dark:bg-[var(--dialogColor)] bg-[var(--dialogColor)] min-h-screen items-center justify-center dark:bg-dot-white/[0.15] bg-dot-white/[0.15] items-center justify-center"
      id={id}
    >
      <ConstrainedBox classNames="p-4 py-16">
        <SectionTitle>Get in Touch</SectionTitle>

        <Column classNames="mt-16 w-full">
          <GridBox classNames="sm:grid-cols-2 w-full mx-auto gap-4">
            {socialLinks.map((link, index) => {
              return (
                <ContactButton
                  key={`social-link-${index}`}
                  text={link.text}
                  icon={link.icon}
                  url={link.url}
                  className="flex items-center gap-x-2 p-4 border rounded text-xl"
                />
              );
            })}
          </GridBox>

          <p className="text-center mx-auto mt-16 text-2xl/6 font-semibold mb-0">
            I&apos;m{" "}
            <span className="text-[var(--primaryColor)]">available</span> for
            freelancing.
          </p>
        </Column>
      </ConstrainedBox>
    </ResponsiveBox>
  );
};

export default HomeSection6;
