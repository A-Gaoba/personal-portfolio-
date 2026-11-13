import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Check, Download, ExternalLink, FileText, Github, Info, Square } from "lucide-react"
import JsonLd from "@/app/components/JsonLd"
import PromptBlock from "@/app/components/PromptBlock"
import ScrollProgress from "@/app/components/ScrollProgress"
import { type GuideStep, getResource, resources } from "@/content/resources"
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
    ...(r.source
      ? {
          isBasedOn: {
            "@type": "SoftwareSourceCode",
            name: r.source.name,
            codeRepository: r.source.url,
            author: { "@type": "Person", name: r.source.author },
            ...(r.source.license === "MIT" ? { license: "https://opensource.org/license/mit" } : {}),
          },
        }
      : {}),
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

  const promptProps = { label: s.promptLabel, copy: s.copy, copied: s.copied }
  // Tool name + note, e.g. "Claude Code: turn on Plan Mode". Names are Latin, kept LTR inside Arabic text.
  const toolLines = (tools: GuideStep["tools"]) =>
    tools && (
      <ul className="mt-4 space-y-2">
        {tools.map((x) => (
          <li key={x.name} className="flex gap-2 leading-relaxed text-fg-2">
            <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
            <span>
              <bdi className="font-bold text-fg">{x.name}</bdi>: {x.text}
            </span>
          </li>
        ))}
      </ul>
    )

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

          {/* Source / credit — always visible, before the content (GAOBA AI's own guides show their note instead) */}
          {!r.source && txt.note && (
            <p className="card-ink mt-14 p-6 text-lg font-semibold leading-relaxed sm:p-8 sm:text-xl">{txt.note}</p>
          )}
          {r.source && (
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
          )}

          <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-14">
            <div className="min-w-0 space-y-12">
              <div className="space-y-4 text-lg leading-relaxed text-fg-2">
                {txt.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {txt.benefits && (
                <section aria-labelledby="benefits-title">
                  <h2 id="benefits-title" className="title mb-6">{s.benefitsTitle}</h2>
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {txt.benefits.map((b) => (
                      <li key={b} className="card-paper flex gap-3 p-4">
                        <Check className="mt-1 h-5 w-5 flex-shrink-0 text-brand-text" aria-hidden="true" />
                        <span className="leading-relaxed text-fg-2">{b}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {txt.setup && (
                <section aria-labelledby="setup-title" className="card-paper p-5 sm:p-7">
                  <h2 id="setup-title" className="text-xl font-bold text-fg sm:text-2xl">{txt.setup.title}</h2>
                  <p className="mt-3 leading-relaxed text-fg-2">{txt.setup.text}</p>
                  {txt.setup.prompt && <PromptBlock text={txt.setup.prompt} {...promptProps} />}
                </section>
              )}

              {txt.rules && (
                <section aria-labelledby="rules-title">
                  <h2 id="rules-title" className="title mb-6">
                    {s.rulesTitle} <span className="mark">{txt.rules.length}</span>
                  </h2>
                  <ol className="space-y-5">
                    {txt.rules.map((rule, i) => (
                      <li key={rule.title} className="card-paper p-5 sm:p-7">
                        <div className="flex items-start gap-4">
                          <span
                            aria-hidden="true"
                            className={`grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl text-lg font-bold ${i % 2 ? "bg-brand text-on-brand" : "bg-inverse text-on-inverse"}`}
                          >
                            {i + 1}
                          </span>
                          <div className="min-w-0">
                            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-muted">
                              {fill(s.rule, { n: i + 1 })}
                            </p>
                            <h3 className="mt-1 text-xl font-bold text-fg sm:text-2xl">{rule.title}</h3>
                          </div>
                        </div>
                        <p className="mt-4 leading-relaxed text-fg-2">{rule.text}</p>
                        {toolLines(rule.tools)}
                        {rule.prompt && <PromptBlock text={rule.prompt} dir={txt.promptDirection} {...promptProps} />}
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {txt.tools && (
                <section aria-labelledby="tools-title">
                  <h2 id="tools-title" className="title mb-3">{txt.toolsTitle ?? s.toolsTitle}</h2>
                  <p className="lede mb-6">{txt.toolsLede ?? s.toolsLede}</p>
                  <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {txt.tools.map((tool, i) => (
                      <li key={tool.name} className={i % 2 ? "card-paper p-5 sm:p-6" : "card-ink p-5 sm:p-6"}>
                        <h3 dir="ltr" className={`text-start text-xl font-bold ${i % 2 ? "text-fg" : "text-on-inverse"}`}>{tool.name}</h3>
                        <ul className="mt-4 space-y-3">
                          {tool.points.map((pt) => (
                            <li key={pt} className={`flex gap-2 leading-relaxed ${i % 2 ? "text-fg-2" : "text-on-inverse/80"}`}>
                              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                        {tool.link && (
                          <a href={tool.link.url} target="_blank" rel="noopener noreferrer" className={`btn btn-sm mt-5 ${i % 2 ? "btn-ink" : "btn-brand"}`}>
                            <Download className="h-4 w-4" aria-hidden="true" />
                            {tool.link.label}
                            <ExternalLink className="h-4 w-4" aria-hidden="true" />
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {txt.tiers && (
                <section aria-labelledby="tiers-title">
                  <h2 id="tiers-title" className="title mb-6">{s.tiersTitle}</h2>
                  <ol className="space-y-5">
                    {txt.tiers.map((tier, i) => (
                      <li key={tier.ram} className="card-paper p-5 sm:p-7">
                        <div className="flex items-center gap-4">
                          <span
                            aria-hidden="true"
                            dir="ltr"
                            className={`grid h-11 min-w-[4.5rem] flex-shrink-0 place-items-center rounded-xl px-3 text-base font-bold ${i % 2 ? "bg-brand text-on-brand" : "bg-inverse text-on-inverse"}`}
                          >
                            {tier.ram}
                          </span>
                          <h3 className="min-w-0 text-xl font-bold text-fg sm:text-2xl">{tier.title}</h3>
                        </div>
                        <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                          {tier.models.map((m) => (
                            <li key={m.command} className="rounded-xl border border-line bg-surface p-4">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <h4 dir="ltr" className="text-lg font-bold text-fg">{m.name}</h4>
                                <span className="chip text-xs">
                                  {s.modelSize}:&nbsp;<bdi className="font-semibold text-fg">{m.size}</bdi>
                                </span>
                              </div>
                              <PromptBlock text={m.command} {...promptProps} label={s.runCommand} compact />
                              <a href={m.url} target="_blank" rel="noopener noreferrer" className="link mt-3 inline-flex items-center gap-1 text-sm">
                                {s.modelPage}
                                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                              </a>
                            </li>
                          ))}
                        </ul>
                        {tier.notes && (
                          <ul className="mt-5 space-y-2">
                            {tier.notes.map((n) => (
                              <li key={n} className="flex gap-2 leading-relaxed text-fg-2">
                                <Info className="mt-1 h-4 w-4 flex-shrink-0 text-brand-text" aria-hidden="true" />
                                <span>{n}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {txt.footnotes && (
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {txt.footnotes.map((f) => (
                    <div key={f.title} className="card-paper p-5 sm:p-6">
                      <h2 className="text-xl font-bold text-fg">{f.title}</h2>
                      <p className="mt-3 leading-relaxed text-fg-2">{f.text}</p>
                      {f.link && (
                        <a href={f.link.url} target="_blank" rel="noopener noreferrer" className="link mt-3 inline-flex items-center gap-1 text-sm">
                          {f.link.label}
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  ))}
                </section>
              )}

              {txt.rulesFile && (
                <section aria-labelledby="rulesfile-title" className="card-paper p-5 sm:p-7">
                  <h2 id="rulesfile-title" className="text-xl font-bold text-fg sm:text-2xl">{txt.rulesFile.title}</h2>
                  <p className="mt-3 leading-relaxed text-fg-2">{txt.rulesFile.text}</p>
                  {toolLines(txt.rulesFile.tools)}
                  {txt.rulesFile.prompt && <PromptBlock text={txt.rulesFile.prompt} {...promptProps} />}
                </section>
              )}

              {txt.checklist && (
                <section aria-labelledby="checklist-title" className="card-paper p-5 sm:p-7">
                  <h2 id="checklist-title" className="text-xl font-bold text-fg sm:text-2xl">{txt.checklist.title}</h2>
                  <ul className="mt-5 space-y-3">
                    {txt.checklist.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-lg leading-relaxed text-fg-2">
                        <Square className="mt-1.5 h-4 w-4 flex-shrink-0 text-brand-text" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

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

              {(txt.rules || txt.tiers) && (
                <section aria-labelledby="getpdf-title" className="card-ink flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                  <div className="min-w-0">
                    <h2 id="getpdf-title" className="text-xl font-bold text-on-inverse sm:text-2xl">{s.downloadTitle}</h2>
                    <p className="mt-2 leading-relaxed text-on-inverse/75">{txt.tiers ? s.guideDownloadText : s.downloadText}</p>
                  </div>
                  <a href={r.file.path} download={r.file.downloadName} className="btn btn-brand flex-shrink-0">
                    <Download className="h-5 w-5" aria-hidden="true" />
                    {s.download}
                  </a>
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
