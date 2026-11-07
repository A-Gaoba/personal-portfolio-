import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Skills from "@/app/components/Skills"
import ScrollProgress from "@/app/components/ScrollProgress"
import JsonLd from "@/app/components/JsonLd"
import { SITE_URL, absoluteUrl } from "@/lib/site"
import { isLocale, localizePath } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { pageMetadata } from "@/lib/i18n/metadata"

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return isLocale(locale) ? pageMetadata(locale, "skills", "/skills") : {}
}

export default async function SkillsPage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.meta.pages.skills.jsonLdName,
    url: absoluteUrl(localizePath(locale, "/skills")),
    inLanguage: locale,
    about: { "@id": `${SITE_URL}/#person` },
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <ScrollProgress />
      <main className="min-h-screen w-full flex flex-col justify-center items-stretch pt-16 bg-canvas">
        <Skills />
      </main>
    </>
  )
}
