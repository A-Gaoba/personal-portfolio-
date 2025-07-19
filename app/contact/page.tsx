import ContactPage from "@/app/contact/ContactPage"
import ScrollProgress from "@/app/components/ScrollProgress"
import JsonLd from "@/app/components/JsonLd"
import CalendlyWidget from "../components/CalendlyWidget";

export const metadata = {
  title: "Contact Abdulrahman Gaoba | Full Stack Developer & UI/UX Designer",
  description: "Get in touch with Abdulrahman Gaoba (abdulraman gaoba, a-gaboa, عبد الرحمن قابوعة, عبد الرحمن قوبع) for full-stack development and UI/UX design projects. Available for freelance work, consulting, and collaboration opportunities.",
  keywords: [
    // English Keywords
    "Contact Abdulrahman Gaoba",
    "abdulraman gaoba contact",
    "abdulrahamn gooba contact",
    "abdulrahman gaoba contact",
    "a-gaboa contact",
    "Hire Full Stack Developer",
    "React Developer for Hire",
    "Next.js Developer",
    "UI/UX Designer Contact",
    "Freelance Developer",
    "Web Development Services",
    "Project Consultation",
    "Abdulrahman Gaoba Email",
    "Abdulrahman Gaoba LinkedIn",
    // Arabic Keywords
    "عبد الرحمن قابوعة",
    "عبد الرحمن قوبع",
    "تواصل مع عبد الرحمن قابوعة",
    "توظيف مطور واجهات",
    "مطور React للتوظيف",
    "مطور Next.js",
    "مصمم واجهات للتوظيف",
    "مطور مستقل",
    "خدمات تطوير الويب",
    "استشارات مشاريع",
    "بريد عبد الرحمن قابوعة",
    "لينكد إن عبد الرحمن قابوعة",
    "توظيف مطور مواقع",
    "خدمات برمجة احترافية",
    "مطور يمني للتوظيف"
  ].join(", "),
  openGraph: {
    title: "Contact Abdulrahman Gaoba | Full Stack Developer & UI/UX Designer",
    description: "Get in touch with Abdulrahman Gaoba (abdulraman gaoba, a-gaboa, عبد الرحمن قابوعة) for full-stack development and UI/UX design projects. Available for freelance work and collaboration.",
    url: "https://abdulrahmangooba.dev/contact",
    siteName: "Abdulrahman Gaoba Portfolio",
    images: [
      {
        url: "/myimage.jpeg",
        width: 800,
        height: 800,
        alt: "Contact Abdulrahman Gaoba - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Abdulrahman Gaoba | Full Stack Developer & UI/UX Designer",
    description: "Get in touch with Abdulrahman Gaoba (abdulraman gaoba, a-gaboa, عبد الرحمن قابوعة) for full-stack development and UI/UX design projects.",
    images: ["/myimage.jpeg"],
    creator: "@A_Gaoba",
  },
  alternates: {
    canonical: "https://abdulrahmangooba.dev/contact",
  },
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
