import ContactPage from "@/app/contact/ContactPage"
import ScrollProgress from "@/app/components/ScrollProgress"
import JsonLd from "@/app/components/JsonLd"
import CalendlyWidget from "../components/CalendlyWidget";

export const metadata = {
  title: "Contact - Abdulrahman's Portfolio",
  description: "Get in touch with Abdulrahman for full-stack development and UI/UX design inquiries.",
}

export default function Contact() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Abdulrahman",
    description: "Contact page for Abdulrahman, a full-stack developer and UI/UX designer.",
    url: "https://abdulrahman.dev/contact",
    potentialAction: {
      "@type": "CommunicateAction",
      target: {
        "@type": "EntryPoint",
        actionPlatform: ["http://schema.org/Website", "http://schema.org/EmailMessage"],
      },
    },
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
