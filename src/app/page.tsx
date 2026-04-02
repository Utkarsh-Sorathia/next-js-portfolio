
import PageBox from "@/Components/core/PageBox";
import HomeSection from "@/Components/Home/HomeSection";
import AboutSection from "@/Components/Home/AboutSection";
import ServiceSection from "@/Components/Home/ServiceSection";
import ExperienceSection from "@/Components/Home/ExperienceSection";
import SkillSection from "@/Components/Home/SkillSection";
import ProjectSection from "@/Components/Home/ProjectSection";
import ContactSection from "@/Components/Home/ContactSection";

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

import { getSettings } from "@/utils/getSettings";

const Home = async () => {
  const settings = await getSettings();

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
        <HomeSection id="/" isOpenToWork={settings.openToWork} />
        <AboutSection id="about" isOpenToWork={settings.openToWork} />
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
