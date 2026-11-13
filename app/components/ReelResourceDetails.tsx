import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Info } from "lucide-react"
import type { ReelResource } from "@/content/resources"
import type { Locale } from "@/lib/i18n/config"
import { localizePath } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { absoluteUrl, SITE_URL } from "@/lib/site"
import { resourcePath } from "@/lib/resources"
import JsonLd from "@/app/components/JsonLd"
import ScrollProgress from "@/app/components/ScrollProgress"

export default function ReelResourceDetails({ resource, locale }: { resource: ReelResource; locale: Locale }) {
  const t = getDictionary(locale)
  const s = t.resources
  const text = resource.text[locale]
  const path = resourcePath(resource)
  const links = (text.footnotes ?? []).flatMap((item) => item.link ? [{ ...item, link: item.link }] : [])
  const url = absoluteUrl(localizePath(locale, path))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: text.title,
    description: text.description,
    url,
    image: absoluteUrl(resource.thumbnail),
    inLanguage: resource.inLanguage,
    learningResourceType: "Educational reel",
    isAccessibleForFree: true,
    datePublished: resource.published,
    creator: { "@type": "Organization", name: "GAOBA AI" },
    publisher: { "@id": `${SITE_URL}/#person` },
    citation: links.map((item) => item.link?.url),
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <ScrollProgress />
      <main className="relative min-h-screen overflow-hidden bg-canvas pt-24 pb-20 sm:pt-28">
        <div aria-hidden="true" className="paper-grid pointer-events-none absolute inset-x-0 top-0 h-[32rem] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="container-page relative">
          <nav aria-label={s.back} className="mb-8">
            <Link href={localizePath(locale, "/resources")} className="inline-flex items-center gap-2 text-sm font-semibold text-fg-muted transition-colors hover:text-fg">
              <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
              {s.back}
            </Link>
          </nav>

          <header className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_0.65fr] lg:gap-14">
            <div className="min-w-0 space-y-6">
              <p className="kicker">{s.categories[resource.category]} · {s.kicker}</p>
              <h1 className="display"><bdi>{text.title}</bdi></h1>
              <p className="lede">{text.description}</p>
              <div className="space-y-4 text-lg leading-relaxed text-fg-2">
                {text.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>

            <figure className="card-paper mx-auto w-full max-w-sm overflow-hidden p-3 lg:max-w-none">
              <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-inverse">
                <Image
                  src={resource.thumbnail}
                  alt={text.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 28vw, (min-width: 640px) 55vw, 90vw"
                  className="object-contain"
                />
              </div>
            </figure>
          </header>

          {text.note && (
            <p className="card-ink mt-12 flex items-start gap-3 p-5 leading-relaxed sm:p-7">
              <Info className="mt-1 h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span>{text.note}</span>
            </p>
          )}

          {text.benefits && (
            <section aria-labelledby="reel-topics-title" className="mt-14">
              <h2 id="reel-topics-title" className="title mb-6">{s.benefitsTitle}</h2>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {text.benefits.map((benefit) => (
                  <li key={benefit} className="card-paper flex items-start gap-3 p-5">
                    <span aria-hidden="true" className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-brand" />
                    <span className="leading-relaxed text-fg-2">{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {links.length > 0 && (
            <section aria-labelledby="reel-links-title" className="mt-14">
              <h2 id="reel-links-title" className="title mb-6">{s.referencesTitle}</h2>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {links.map((item) => (
                  <li key={item.title} className="card-paper flex flex-col items-start p-5 sm:p-6">
                    <h3 className="text-lg font-bold text-fg">{item.title}</h3>
                    <p className="mt-2 flex-1 leading-relaxed text-fg-2">{item.text}</p>
                    <a
                      href={item.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ink btn-sm mt-5"
                    >
                      {item.link.label}
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
    </>
  )
}
