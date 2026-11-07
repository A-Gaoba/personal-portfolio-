import type { Metadata } from "next"
import { isLocale } from "@/lib/i18n/config"
import { pageMetadata } from "@/lib/i18n/metadata"
import Hero from "../components/Hero"
import AboutHighlight from "../components/AboutHighlight"
import ProjectsHighlight from "../components/ProjectsHighlight"
import SkillsHighlight from "../components/SkillsHighlight"
import ServicesHighlight from "../components/ServicesHighlight"
import ContactHighlight from "../components/ContactHighlight"
import ScrollProgress from "../components/ScrollProgress"

// Phase 0a (2026-11-07): the testimonials section (TestimonialsSlider) was removed from the page because its
// four quotes used invented names and placeholder photos. The component file is kept untouched in the repo.
// Phase 0b: metadata inherits the domain from app/layout.tsx (SITE_URL); no unverified numbers.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return isLocale(locale) ? pageMetadata(locale, "home", "/", { absoluteTitle: true }) : {}
}

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* 2026-11-07 redesign: animated <DeveloperBackground /> removed (continuous canvas/JS animation; the file stays in the repo). */}
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
