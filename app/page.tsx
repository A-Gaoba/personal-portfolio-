import type { Metadata } from "next"
import { DEFAULT_OG_IMAGE } from "@/lib/site"
import Hero from "./components/Hero"
import AboutHighlight from "./components/AboutHighlight"
import ProjectsHighlight from "./components/ProjectsHighlight"
import SkillsHighlight from "./components/SkillsHighlight"
import ServicesHighlight from "./components/ServicesHighlight"
import ContactHighlight from "./components/ContactHighlight"
import ScrollProgress from "./components/ScrollProgress"
import DeveloperBackground from "./components/DeveloperBackground"

// Phase 0a (2026-11-07): the testimonials section (TestimonialsSlider) was removed from the page because its
// four quotes used invented names and placeholder photos. The component file is kept untouched in the repo.
// Phase 0b: metadata inherits the domain from app/layout.tsx (SITE_URL); no unverified numbers.
export const metadata: Metadata = {
  title: "Abdulrahman Gaoba - Full Stack Developer & UI/UX Designer | Portfolio",
  description:
    "Portfolio of Abdulrahman Gaoba (عبد الرحمن قوبع), a full stack developer building web applications with React, Next.js and Node.js.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Abdulrahman Gaoba - Full Stack Developer & UI/UX Designer | Portfolio",
    description:
      "Portfolio of Abdulrahman Gaoba, a full stack developer building web applications with React, Next.js and Node.js.",
    url: "/",
    siteName: "Abdulrahman Gaoba",
    locale: "en_US",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <DeveloperBackground />
      <ScrollProgress />
      <main className="relative z-10">
        <Hero />
        <AboutHighlight />
        <ProjectsHighlight />
        <SkillsHighlight />
        <ServicesHighlight />
        <ContactHighlight />
      </main>
    </div>
  )
}
