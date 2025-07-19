import Hero from "./components/Hero"
import AboutHighlight from "./components/AboutHighlight"
import ProjectsHighlight from "./components/ProjectsHighlight"
import SkillsHighlight from "./components/SkillsHighlight"
import ServicesHighlight from "./components/ServicesHighlight"
import ContactHighlight from "./components/ContactHighlight"
import TestimonialsSlider from "./components/TestimonialsSlider"
import Navbar from "./components/Navbar"
import ScrollProgress from "./components/ScrollProgress"
import DeveloperBackground from "./components/DeveloperBackground"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <DeveloperBackground />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <AboutHighlight />
        <ProjectsHighlight />
        <SkillsHighlight />
        <ServicesHighlight />
        <TestimonialsSlider />
        <ContactHighlight />
      </main>
    </div>
  )
}
