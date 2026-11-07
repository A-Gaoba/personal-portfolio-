import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/site"

// Phase 0b (2026-11-07): sitemap URL from SITE_URL (was the non-existent abdulrahmangooba.dev). The old
// disallow rules pointed to /private/ and /admin/, which do not exist, so they were dropped.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  }
}
