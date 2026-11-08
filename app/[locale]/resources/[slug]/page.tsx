import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Download, ExternalLink, FileText, Github, Info } from "lucide-react"
import JsonLd from "@/app/components/JsonLd"
import ScrollProgress from "@/app/components/ScrollProgress"
import { getResource, resources } from "@/content/resources"
import { SITE_URL, absoluteUrl } from "@/lib/site"
import { isLocale, localeMeta, localizePath, otherLocales } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { languageAlternates } from "@/lib/i18n/metadata"
import { fill, formatDate, formatSize, resourcePath } from "@/lib/resources"

type PageProps = { params: Promise<{ locale: string; slug: string }> }

// One static page per resource per language, all from content/resources.ts. Unknown slugs are 404.
export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const r = getResource(slug)
  if (!isLocale(locale) || !r) return {}
  const t = getDictionary(locale)
  const txt = r.text[locale]
  const path = resourcePath(r)
  const url = localizePath(locale, path)
  const title = `${txt.title} — ${t.resources.categories[r.category]} · GAOBA AI`
  const image = { url: r.image[locale], width: 1200, height: 630, alt: txt.imageAlt, type: "image/png" }
  return {
    title,
    description: txt.description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      title,
      description: txt.description,
      url,
      siteName: t.meta.siteName,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: otherLocales(locale).map((l) => localeMeta[l].ogLocale),
      type: "article",
      publishedTime: r.published,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description: txt.description, images: [image.url] },
  }
}

export default async function ResourceDetailsPage({ params }: PageProps) {
  const { locale, slug } = await params
  const r = getResource(slug)
  if (!isLocale(locale) || !r) notFound()
  const t = getDictionary(locale)
  const s = t.resources
  const txt = r.text[locale]
  const url = absoluteUrl(localizePath(locale, resourcePath(r)))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: txt.title,
    description: txt.description,
    url,
    image: absoluteUrl(r.image[locale]),
    inLanguage: r.inLanguage,
    learningResourceType: "Guide",
    isAccessibleForFree: true,
    datePublished: r.published,
    creator: { "@type": "Organization", name: "GAOBA AI" },
    publisher: { "@id": `${SITE_URL}/#person` },
    isBasedOn: {
      "@type": "SoftwareSourceCode",
      name: r.source.name,
      codeRepository: r.source.url,
      author: { "@type": "Person", name: r.source.author },
      ...(r.source.license === "MIT" ? { license: "https://opensource.org/license/mit" } : {}),
    },
    encoding: {
      "@type": "MediaObject",
      contentUrl: absoluteUrl(r.file.path),
      encodingFormat: r.file.type,
      contentSize: `${Math.round(r.file.bytes / 1024)} KB`,
    },
  }

  const details: [string, string][] = [
    [s.format, "PDF"],
    [s.pages, String(r.file.pages)],
    [s.size, formatSize(r.file.bytes, locale)],
    [s.language, txt.fileLanguage],
    [s.published, formatDate(r.published, locale)],
  ]

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

          {/* Header: text + actions, cover image */}
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div className="min-w-0 space-y-6">
              <p className="kicker">{s.categories[r.category]} · {s.kicker}</p>
              <h1 className="display">
                {/* bdi: a Latin title that starts with a number keeps its order on Arabic pages. */}
                <bdi>{txt.title}</bdi>
              </h1>
              <p className="lede">{txt.description}</p>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={r.file.path} target="_blank" rel="noopener" className="btn btn-brand">
                  <FileText className="h-5 w-5" aria-hidden="true" />
                  {s.viewPdf}
                </a>
                <a href={r.file.path} download={r.file.downloadName} className="btn btn-line">
                  <Download className="h-5 w-5" aria-hidden="true" />
                  {s.download}
                </a>
              </div>
              <p className="flex items-start gap-2 text-sm text-fg-muted">
                <Info className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                {s.inAppHint}
              </p>
            </div>

            <div className="relative isolate mx-auto w-full max-w-xl lg:max-w-none">
              <div className="relative aspect-[1200/630] overflow-hidden rounded-card border border-line bg-surface shadow-lift">
                <Image src={r.image[locale]} alt={txt.imageAlt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
              <div aria-hidden="true" className="absolute -bottom-3 -end-3 -z-10 h-full w-full rounded-card bg-brand" />
            </div>
          </div>

          {/* Source / credit — always visible, before the content */}
          <section aria-labelledby="source-title" className="card-ink mt-14 p-6 sm:p-8">
            <p id="source-title" className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-on-inverse/60">
              {s.sourceTitle}
            </p>
            <p className="mt-3 text-xl font-bold sm:text-2xl">
              <span dir="ltr">{r.source.name}</span>{" "}
              <span className="font-normal text-on-inverse/70">{s.by}</span> {r.source.author}
              {r.source.license && <span className="font-normal text-on-inverse/70"> · {fill(s.license, { license: r.source.license })}</span>}
            </p>
            <p className="mt-3 max-w-3xl leading-relaxed text-on-inverse/75">
              {s.notOurs} {fill(s.preparedBy, { name: r.preparedBy })}
            </p>
            <a href={r.source.url} target="_blank" rel="noopener noreferrer" className="btn btn-brand mt-6">
              <Github className="h-5 w-5" aria-hidden="true" />
              {s.viewSource}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
            <p className="mt-3 break-all font-mono text-xs text-on-inverse/50" dir="ltr">
              {r.source.url}
            </p>
          </section>

          <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-14">
            <div className="min-w-0 space-y-12">
              <div className="space-y-4 text-lg leading-relaxed text-fg-2">
                {txt.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {txt.contents && (
                <section aria-labelledby="contents-title">
                  <h2 id="contents-title" className="title mb-6">{s.contentsTitle}</h2>
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {txt.contents.map((c) => (
                      <li key={c.label} className="card-paper p-4">
                        <code dir="ltr" className="tag mb-2 inline-block text-xs">{c.label}</code>
                        <p className="leading-relaxed text-fg-2">{c.text}</p>
                      </li>
                    ))}
                  </ul>
                  {txt.contentsNote && <p className="mt-5 font-semibold text-fg">{txt.contentsNote}</p>}
                </section>
              )}

              {r.extras && r.extras.length > 0 && (
                <section aria-labelledby="extras-title">
                  <h2 id="extras-title" className="title mb-6">{s.extrasTitle}</h2>
                  <ul className="space-y-4">
                    {r.extras.map((x) => (
                      <li key={x.path} className="card-paper flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                        <div className="min-w-0 space-y-2">
                          <h3 className="text-lg font-bold text-fg">{x.text[locale].title}</h3>
                          <p className="leading-relaxed text-fg-2">{x.text[locale].description}</p>
                          <p className="text-sm text-fg-muted">
                            {s.zipContains}:{" "}
                            {x.files.map((f, i) => (
                              <span key={f}>
                                {i > 0 && (locale === "ar" ? "، " : ", ")}
                                <code dir="ltr" className="font-mono text-xs">{f}</code>
                              </span>
                            ))}{" "}
                            · {formatSize(x.bytes, locale)}
                          </p>
                        </div>
                        <a href={x.path} download={x.downloadName} className="btn btn-line btn-sm flex-shrink-0">
                          <Download className="h-4 w-4" aria-hidden="true" />
                          {s.downloadZip}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {txt.requirements && (
                <section aria-labelledby="req-title">
                  <h2 id="req-title" className="title mb-6">{s.requirementsTitle}</h2>
                  <ul className="list-disc space-y-2 ps-6 text-lg text-fg-2 marker:text-brand">
                    {txt.requirements.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <aside aria-labelledby="details-title" className="lg:sticky lg:top-24 lg:self-start">
              <div className="card-paper p-6">
                <h2 id="details-title" className="mb-4 text-lg font-bold text-fg">{s.detailsTitle}</h2>
                <dl className="divide-y divide-line">
                  {details.map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between gap-4 py-3 text-sm">
                      <dt className="text-fg-muted">{k}</dt>
                      <dd className="font-semibold text-fg">{v}</dd>
                    </div>
                  ))}
                </dl>
                <a href={r.file.path} download={r.file.downloadName} className="btn btn-ink btn-sm mt-5 w-full">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {s.download}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
