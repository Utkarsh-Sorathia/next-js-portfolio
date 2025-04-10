import dynamic from "next/dynamic";

const PageBox = dynamic(() => import("@/Components/core/PageBox"));
const HomeSection = dynamic(() => import("@/Components/Home/HomeSection"));
const AboutSection = dynamic(() => import("@/Components/Home/AboutSection"));
const SkillSection = dynamic(() => import("@/Components/Home/SkillSection"));
const ProjectSection = dynamic(() => import("@/Components/Home/ProjectSection"));
const ContactSection = dynamic(() => import("@/Components/Home/ContactSection"));
// const HomeSection6 = dynamic(() => import("@/components/home/Section6"));

const Home = () => {
  return (
    <>
      <PageBox>
        <HomeSection id="/" />
        <AboutSection id="about" />
        <SkillSection id="skills" />
        <ProjectSection id="projects" />
        <ContactSection id="contact" />
      </PageBox>
    </>
  )
}

export default Home
