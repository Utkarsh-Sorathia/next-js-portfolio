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
      classNames="bg-background items-center justify-center dark:bg-dot-white/[0.15] light:bg-dot-black/[0.1] lg:px-40 lg:min-h-screen"
      id={id}
    >
      <ConstrainedBox classNames="px-4 py-12 lg:py-16">
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
                  className="p-6 border border-border-custom rounded-2xl bg-primary-5 hover:bg-primary/10 transition-all duration-300 group shadow-sm"
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
