import ProjectsPageClient from "@/app/projects/ProjectsPageClient"
import ScrollProgress from "@/app/components/ScrollProgress"
import JsonLd from "@/app/components/JsonLd"
import { SITE_URL, absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/site"

// Phase 0b (2026-11-07): relative canonical (SITE_URL), no misspelling stuffing, no "proven results" claim.
export const metadata = {
  title: "Projects Portfolio | Abdulrahman Gaoba - Full Stack Developer",
  description:
    "Web projects built by Abdulrahman Gaoba (عبد الرحمن قوبع): e-commerce stores, business and portfolio websites, and web platforms built with React and Next.js.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects Portfolio | Abdulrahman Gaoba - Full Stack Developer",
    description:
      "E-commerce stores, business and portfolio websites, and web platforms built with React and Next.js.",
    url: "/projects",
    siteName: "Abdulrahman Gaoba",
    locale: "en_US",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function Projects() {
  // Phase 0b (2026-11-07): replaced the placeholder JSON-LD ("Project Alpha/Beta" on abdulrahman.dev, a domain
  // that belongs to someone else) with a plain CollectionPage on this site's own URL.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects by Abdulrahman Gaoba",
    url: absoluteUrl("/projects"),
    author: { "@id": `${SITE_URL}/#person` },
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <ScrollProgress />
      <main className="min-h-screen flex flex-col justify-center items-center pt-24 bg-dark-bg">
        <ProjectsPageClient />
      </main>
    </>
  )
}
