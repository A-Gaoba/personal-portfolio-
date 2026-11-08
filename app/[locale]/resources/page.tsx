import type { Metadata } from "next"
import { notFound } from "next/navigation"
import JsonLd from "@/app/components/JsonLd"
import ResourceCard from "@/app/components/ResourceCard"
import ScrollProgress from "@/app/components/ScrollProgress"
import { resources } from "@/content/resources"
import { SITE_URL, absoluteUrl } from "@/lib/site"
import { isLocale, localizePath } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { pageMetadata } from "@/lib/i18n/metadata"
import { resourcePath } from "@/lib/resources"

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return isLocale(locale) ? pageMetadata(locale, "resources", "/resources") : {}
}

// GAOBA AI Resources (2026-11-08): a library built from content/resources.ts (newest first).
export default async function ResourcesPage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const s = t.resources
  const list = [...resources].sort((a, b) => b.published.localeCompare(a.published))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t.meta.pages.resources.jsonLdName,
    description: t.meta.pages.resources.description,
    url: absoluteUrl(localizePath(locale, "/resources")),
    inLanguage: locale,
    author: { "@id": `${SITE_URL}/#person` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: list.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(localizePath(locale, resourcePath(r))),
        name: r.text[locale].title,
      })),
    },
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <ScrollProgress />
      <main className="relative min-h-screen overflow-hidden bg-canvas pt-28 pb-20 sm:pt-32">
        <div aria-hidden="true" className="paper-grid pointer-events-none absolute inset-x-0 top-0 h-[28rem] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="container-page relative">
          <header className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
            <p className="kicker mb-5">{s.kicker}</p>
            <h1 className="display mb-6">
              {s.title} <span className="mark">{s.titleMark}</span>
            </h1>
            <p className="lede mx-auto max-w-2xl">{s.lede}</p>
          </header>

          {list.length === 0 ? (
            <p className="text-center text-fg-muted">{s.empty}</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {list.map((r) => (
                <ResourceCard key={r.slug} resource={r} locale={locale} t={t} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
