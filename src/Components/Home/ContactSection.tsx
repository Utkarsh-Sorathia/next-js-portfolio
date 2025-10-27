import ResponsiveBox from "../../Components/core/ResponsiveBox";
import ConstrainedBox from "../../Components/core/constrained-box";
import GridBox from "../../Components/core/GridBox";
import Column from "../../Components/core/Column";
import SectionTitle from "../../Components/common/SectionTitle";
import ContactButton from "../UI/ContactButton";
import socialLinks from "../../data/importantLinks";

const ContactSection = ({ id }: { id: string }) => {
  return (
    <ResponsiveBox
      classNames="dark:bg-[var(--dialogColor)] bg-[var(--dialogColor)] items-center justify-center dark:bg-dot-white/[0.15] bg-dot-white/[0.15] lg:px-40 lg:min-h-screen"
      id={id}
    >
      <ConstrainedBox classNames="px-4 py-8">
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
                  className="p-4 border border-zinc-500 text-xl hover:bg-white hover:text-[var(--primaryColor)] transition duration-300"
                />
              );
            })}
          </GridBox>
        </Column>
      </ConstrainedBox>
    </ResponsiveBox>
  );
};

export default ContactSection;
