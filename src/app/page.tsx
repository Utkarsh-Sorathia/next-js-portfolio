import dynamic from "next/dynamic";

const PageBox = dynamic(() => import("@/Components/core/PageBox"));
const HomeSection = dynamic(() => import("@/Components/Home/HomeSection"));
const AboutSection = dynamic(() => import("@/Components/Home/AboutSection"));
const ServiceSection = dynamic(() => import("@/Components/Home/ServiceSection"));
const SkillSection = dynamic(() => import("@/Components/Home/SkillSection"));
const ProjectSection = dynamic(() => import("@/Components/Home/ProjectSection"));
const ContactSection = dynamic(() => import("@/Components/Home/ContactSection"));

const Home = () => {
  return (
    <>
      <PageBox>
        <HomeSection id="/" />
        <AboutSection id="about" />
        <ServiceSection id="services" />
        <SkillSection id="skills" />
        <ProjectSection id="projects" />
        <ContactSection id="contact" />
      </PageBox>
    </>
  )
}

export default Home
