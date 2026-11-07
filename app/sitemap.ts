import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/site"
import { defaultLocale, locales, localizePath } from "@/lib/i18n/config"

// Phase 0b (2026-11-07): built from SITE_URL; pages that never existed removed.
// i18n (2026-11-07): one entry per page per language, each listing all language versions (hreflang) + x-default.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; changeFrequency: "weekly" | "monthly"; priority: number }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.9 },
    { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
    { path: "/skills", changeFrequency: "monthly", priority: 0.8 },
    { path: "/services", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  ]
  const lastModified = new Date()

  return pages.flatMap(({ path, changeFrequency, priority }) => {
    const languages: Record<string, string> = Object.fromEntries(
      locales.map((l) => [l, absoluteUrl(localizePath(l, path))]),
    )
    languages["x-default"] = absoluteUrl(localizePath(defaultLocale, path))
    return locales.map((locale) => ({
      url: absoluteUrl(localizePath(locale, path)),
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    }))
  })
}
