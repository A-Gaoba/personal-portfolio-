import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { isLocale, localizePath } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { pageMetadata } from "@/lib/i18n/metadata"
import Image from "next/image"
import { MapPin } from "lucide-react"
import About from "../../components/About"
import ScrollProgress from "../../components/ScrollProgress"

// Phase 0b (2026-11-07): relative canonical (resolved against SITE_URL), no misspelling stuffing.
type PageProps = { params: Promise<{ locale: string }> }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return isLocale(locale) ? pageMetadata(locale, "about", "/about", { ogType: "profile" }) : {}
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  return (
    <div className="relative min-h-screen">
      {/* 2026-11-07 redesign: animated <DeveloperBackground /> removed (continuous canvas/JS animation; the file stays in the repo). */}
      <ScrollProgress />
      {/* Phase 0a: <Navbar /> removed here — app/layout.tsx already renders it (the page showed two navbars). */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pb-24">
        <div aria-hidden="true" className="paper-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="container-page relative">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            {/* Profile image */}
            <div className="relative isolate mx-auto w-full max-w-[22rem] lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-line bg-surface shadow-lift">
                <Image
                  src="/myimage.jpeg"
                  alt={t.common.photoAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 22rem"
                  className="object-cover"
                  priority
                />
              </div>
              <div aria-hidden="true" className="absolute -bottom-3 -end-3 -z-10 h-full w-full rounded-card bg-brand" />
            </div>

            {/* Content */}
            <div className="space-y-6">
              <p className="chip gap-2 bg-surface">
                <MapPin className="h-4 w-4 text-brand-text" aria-hidden="true" />
                {t.aboutPage.basedIn}
              </p>

              <h1 className="display">
                {t.home.about.title} <span className="mark">{t.home.about.titleMark}</span>
              </h1>

              <div className="lede space-y-4">
                <p>{t.home.about.p1}</p>
                <p>
                  {t.aboutPage.p2Before}<span className="font-semibold text-fg">Naqla Tech</span>{t.aboutPage.p2After}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <main className="relative z-10">
        <About />
      </main>
    </div>
  )
}
