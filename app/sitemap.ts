import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/site"

// Phase 0b (2026-11-07): built from SITE_URL. Removed /testimonials (fabricated content, now redirected to /) and
// /projects/naqla-tech, /projects/yemeni-cultural-directory, /projects/junzi-tech-solutions (pages that never existed).
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; changeFrequency: "weekly" | "monthly"; priority: number }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.9 },
    { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
    { path: "/skills", changeFrequency: "monthly", priority: 0.8 },
    { path: "/services", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  ]

  return pages.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
