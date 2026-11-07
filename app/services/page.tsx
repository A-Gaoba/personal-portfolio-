import Services from "@/app/components/Services"
import type { Metadata } from "next"
import { DEFAULT_OG_IMAGE } from "@/lib/site"

export const metadata: Metadata = {
  title: "My Services - Abdulrahman Gaoba",
  description:
    "Explore the comprehensive web development services offered by Abdulrahman Gaoba, specializing in React, Next.js, and full-stack solutions.",
  keywords:
    "web development services, React development, Next.js services, full-stack development, UI/UX services, performance optimization, PWA development",
  // Phase 0b (2026-11-07): canonical added (resolved against SITE_URL).
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "My Services - Abdulrahman Gaoba",
    description: "Web development services by Abdulrahman Gaoba: React, Next.js and full-stack solutions.",
    url: "/services",
    siteName: "Abdulrahman Gaoba",
    locale: "en_US",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function ServicesPage() {
  return <Services />
}
