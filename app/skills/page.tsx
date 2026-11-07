import Skills from "@/app/components/Skills"
import ScrollProgress from "@/app/components/ScrollProgress"
import JsonLd from "@/app/components/JsonLd"
import { SITE_URL, absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/site"

// Phase 0b (2026-11-07): canonical added (resolved against SITE_URL).
export const metadata = {
  title: "Skills - Abdulrahman Gaoba",
  description: "Technical skills of Abdulrahman Gaoba in full stack web development.",
  alternates: {
    canonical: "/skills",
  },
  openGraph: {
    title: "Skills - Abdulrahman Gaoba",
    description: "Technical skills of Abdulrahman Gaoba in full stack web development.",
    url: "/skills",
    siteName: "Abdulrahman Gaoba",
    locale: "en_US",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function SkillsPage() {
  // Phase 0b (2026-11-07): same page, correct URL (was abdulrahman.dev, a domain that belongs to someone else).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Technical skills of Abdulrahman Gaoba",
    url: absoluteUrl("/skills"),
    about: { "@id": `${SITE_URL}/#person` },
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <ScrollProgress />
      <main className="min-h-screen flex flex-col justify-center items-center pt-24 bg-dark-bg">
        <Skills />
      </main>
    </>
  )
}
