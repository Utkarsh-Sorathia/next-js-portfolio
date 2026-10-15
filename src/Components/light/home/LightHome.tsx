import LightHero from './LightHero';
import LightWork from './LightWork';
import LightAbout from './LightAbout';
import LightExperience from './LightExperience';
import LightStack from './LightStack';
import LightServices from './LightServices';
import LightWriting from './LightWriting';
import LightContact from './LightContact';

// Homepage for the light design. Section ids (projects, about, experience,
// skills, services, contact) match the ⌘K command palette and nav links.
export default function LightHome({ isOpenToWork }: { isOpenToWork: boolean }) {
  return (
    <>
      <LightHero isOpenToWork={isOpenToWork} />
      <LightWork />
      <LightAbout />
      <LightExperience />
      <LightStack />
      <LightServices />
      <LightWriting />
      <LightContact />
    </>
  );
}
