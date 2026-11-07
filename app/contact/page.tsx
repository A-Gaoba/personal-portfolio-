import ContactPage from "@/app/contact/ContactPage"
import ScrollProgress from "@/app/components/ScrollProgress"
import JsonLd from "@/app/components/JsonLd"
import { SITE_URL, absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/site"
import CalendlyWidget from "../components/CalendlyWidget";

// Phase 0b (2026-11-07): relative canonical (SITE_URL), no misspelling stuffing.
export const metadata = {
  title: "Contact Abdulrahman Gaoba | Full Stack Developer & UI/UX Designer",
  description:
    "Contact Abdulrahman Gaoba (عبد الرحمن قوبع) about web development and UI/UX projects: send a message or book a call.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Abdulrahman Gaoba | Full Stack Developer & UI/UX Designer",
    description: "Send a message or book a call about a web development or UI/UX project.",
    url: "/contact",
    siteName: "Abdulrahman Gaoba",
    locale: "en_US",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function Contact() {
  // Phase 0b (2026-11-07): correct URL (was abdulrahman.dev, a domain that belongs to someone else).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Abdulrahman Gaoba",
    url: absoluteUrl("/contact"),
    about: { "@id": `${SITE_URL}/#person` },
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <ScrollProgress />
      <main className="min-h-screen flex flex-col justify-center items-center pt-24 bg-dark-bg">
        <ContactPage />
        <CalendlyWidget />
      </main>
    </>
  )
}
