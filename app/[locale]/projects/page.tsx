import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProjectsPageClient from "./ProjectsPageClient"
import ScrollProgress from "@/app/components/ScrollProgress"
import JsonLd from "@/app/components/JsonLd"
import { SITE_URL, absoluteUrl } from "@/lib/site"
import { isLocale, localizePath } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { pageMetadata } from "@/lib/i18n/metadata"

type PageProps = { params: Promise<{ locale: string }> }

// Phase 0b (2026-11-07): canonical on SITE_URL, no "proven results" claim. i18n: per-language metadata + hreflang.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return isLocale(locale) ? pageMetadata(locale, "projects", "/projects") : {}
}

export default async function Projects({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  // Phase 0b: a plain CollectionPage on this site's own URL (replaced placeholder JSON-LD).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.meta.pages.projects.jsonLdName,
    url: absoluteUrl(localizePath(locale, "/projects")),
    inLanguage: locale,
    author: { "@id": `${SITE_URL}/#person` },
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <ScrollProgress />
      <main className="min-h-screen w-full flex flex-col justify-center items-stretch pt-16 bg-canvas">
        <ProjectsPageClient />
      </main>
    </>
  )
}
