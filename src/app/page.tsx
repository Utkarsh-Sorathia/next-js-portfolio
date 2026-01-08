import dynamic from "next/dynamic";

const PageBox = dynamic(() => import("@/Components/core/PageBox"));
const HomeSection = dynamic(() => import("@/Components/Home/HomeSection"));
const AboutSection = dynamic(() => import("@/Components/Home/AboutSection"));
const ServiceSection = dynamic(() => import("@/Components/Home/ServiceSection"));
const ExperienceSection = dynamic(() => import("@/Components/Home/ExperienceSection"));
const SkillSection = dynamic(() => import("@/Components/Home/SkillSection"));
const ProjectSection = dynamic(() => import("@/Components/Home/ProjectSection"));
const ContactSection = dynamic(() => import("@/Components/Home/ContactSection"));

import { 
  getPersonSchema, 
  getWebSiteSchema, 
  getProfilePageSchema, 
  getFAQSchema, 
  getSiteNavigationSchema, 
  getProfessionalServiceSchema, 
  getServiceSchema, 
  getProjectSchema 
} from "@/utils/structuredData";

const Home = () => {
  return (
    <>
      {/* Structural Data for Home Page Only */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPersonSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getWebSiteSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getProfilePageSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getSiteNavigationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getProfessionalServiceSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getServiceSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getProjectSchema()),
        }}
      />

      <PageBox>
        <HomeSection id="/" />
        <AboutSection id="about" />
        <SkillSection id="skills" />
        <ProjectSection id="projects" />
        <ExperienceSection id="experience" />
        <ServiceSection id="services" />
        <ContactSection id="contact" />
      </PageBox>
    </>
  )
}

export default Home
