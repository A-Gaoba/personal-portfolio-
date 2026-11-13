import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Download } from "lucide-react"
import { isReelResource, type Resource } from "@/content/resources"
import type { Messages } from "@/messages/en"
import { type Locale, localizePath } from "@/lib/i18n/config"
import { fill, resourcePath } from "@/lib/resources"

// Server component: one card on /resources. The title links to the details page; the download is a separate link
// (no nested links). Built only from the entry in content/resources.ts.
export default function ResourceCard({ resource: r, locale, t }: { resource: Resource; locale: Locale; t: Messages }) {
  const s = t.resources
  const txt = r.text[locale]
  const href = localizePath(locale, resourcePath(r))
  const isReel = isReelResource(r)

  return (
    <article className="card-paper card-lift flex flex-col overflow-hidden">
      <Link prefetch={false} href={href} tabIndex={-1} aria-hidden="true" className="relative block aspect-[1200/630] border-b border-line bg-surface-2">
        <Image src={r.image[locale]} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip bg-surface text-xs">{s.categories[r.category]}</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-muted">
            {isReel ? (locale === "ar" ? "فيديو" : "VIDEO") : "PDF"} · {txt.fileLanguage}
          </span>
        </div>
        <h2 className="text-xl font-bold leading-snug text-fg sm:text-2xl">
          <Link prefetch={false} href={href} className="hover:text-brand-text focus-visible:text-brand-text">
            {/* bdi: a Latin title that starts with a number ("13 …") keeps its order on Arabic pages. */}
            <bdi>{txt.title}</bdi>
          </Link>
        </h2>
        <p className="leading-relaxed text-fg-2">{txt.description}</p>
        {r.source ? (
          <p className="text-sm text-fg-muted">
            {s.sourceTitle}: <span dir="ltr" className="font-semibold text-fg-2">{r.source.name}</span> {s.by}{" "}
            <span className="font-semibold text-fg-2">{r.source.author}</span>
            {r.source.license && <> · {fill(s.license, { license: r.source.license })}</>}
          </p>
        ) : (
          <p className="text-sm text-fg-muted">{fill(s.preparedBy, { name: r.preparedBy })}</p>
        )}
        <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row">
          <Link prefetch={false} href={href} className="btn btn-ink btn-sm">
            {s.viewDetails}
            <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
          </Link>
          {!isReel && (
            <a href={r.file.path} download={r.file.downloadName} className="btn btn-line btn-sm">
              <Download className="h-4 w-4" aria-hidden="true" />
              {s.download}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
