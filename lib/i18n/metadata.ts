import type { Metadata } from "next"
import { DEFAULT_OG_IMAGE } from "@/lib/site"
import { type Locale, defaultLocale, localeMeta, locales, localizePath, otherLocales } from "./config"
import { getDictionary } from "./dictionaries"

/**
 * hreflang map for a page: every language version plus x-default (the English page).
 * Relative URLs are resolved against metadataBase (SITE_URL) by Next.js.
 */
export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const l of locales) languages[l] = localizePath(l, path)
  languages["x-default"] = localizePath(defaultLocale, path)
  return languages
}

type PageKey = keyof ReturnType<typeof getDictionary>["meta"]["pages"]

/**
 * Metadata for one page in one language: localized title/description, self-referencing canonical, hreflang for
 * every language, and Open Graph / Twitter with the right og:locale and og:locale:alternate.
 */
export function pageMetadata(
  locale: Locale,
  page: PageKey,
  path: string,
  options: { absoluteTitle?: boolean; ogType?: "website" | "profile" } = {},
): Metadata {
  const t = getDictionary(locale)
  const m = t.meta.pages[page]
  const url = localizePath(locale, path)
  const image = { ...DEFAULT_OG_IMAGE, alt: t.meta.ogAlt }
  return {
    title: options.absoluteTitle ? { absolute: m.title } : m.title,
    description: m.description,
    ...("keywords" in m && m.keywords ? { keywords: m.keywords } : {}),
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      siteName: t.meta.siteName,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: otherLocales(locale).map((l) => localeMeta[l].ogLocale),
      type: options.ogType ?? "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [image.url],
    },
  }
}
