import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider" // Ensure ThemeProvider is imported
import JsonLd from "./components/JsonLd"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Abdulrahman Gaoba - Full Stack Developer & UI/UX Designer",
    template: "%s | Abdulrahman Gaoba"
  },
  description:
    "Abdulrahman Gaoba (abdulraman gaoba, a-gaboa, عبد الرحمن قوبع, عبد الرحمن قوبع) is a passionate Full Stack Developer and UI/UX Designer specializing in React, Next.js, Node.js, and modern web technologies. Founder of Naqla Tech, creator of innovative web solutions with 5+ years experience.",
  icons: {
    icon: [
      { url: "/portfolio-icon.svg", type: "image/svg+xml" },
      { url: "/myimage.jpeg", type: "image/jpeg" }
    ],
    apple: "/myimage.jpeg",
    shortcut: "/portfolio-icon.svg"
  },
  keywords: [
    // English Keywords
    "Abdulrahman Gaoba",
    "abdulraman gaoba",
    "abdulrahamn gooba",
    "abdulrahman gaoba",
    "a-gaboa",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "UI/UX Designer",
    "Web Development",
    "JavaScript",
    "TypeScript",
    "MongoDB",
    "AWS",
    "Naqla Tech",
    "Yemeni Cultural Directory",
    "Junzi Tech Solutions",
    "Portfolio",
    "Freelance Developer",
    // Arabic Keywords
    "عبد الرحمن قوبع",
    "عبد الرحمن قوبع",
    "مطور واجهات",
    "مبرمج مواقع",
    "تصميم صفحات هبوط",
    "تطوير مواقع إلكترونية",
    "خدمات برمجة احترافية",
    "مطور ويب",
    "مصمم واجهات",
    "برمجة مواقع",
    "تطوير تطبيقات",
    "تصميم تجربة المستخدم",
    "برمجة جافا سكريبت",
    "تطوير React",
    "برمجة Node.js",
    "تصميم UI/UX",
    "مطور Full Stack",
    "برمجة احترافية",
    "خدمات تطوير الويب",
    "مطور يمني",
    "برمجة مواقع إلكترونية",
    "تصميم واجهات المستخدم"
  ].join(", "),
  authors: [{ name: "Abdulrahman Gaoba", url: "https://abdulrahmangooba.dev" }],
  creator: "Abdulrahman Gaoba",
  publisher: "Abdulrahman Gaoba",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://abdulrahmangooba.dev"),
  alternates: {
    canonical: "/",
    languages: {
      'en': '/en',
      'ar': '/ar',
    },
  },
  openGraph: {
    title: "Abdulrahman Gaoba - Full Stack Developer & UI/UX Designer",
    description: "Abdulrahman Gaoba (abdulraman gaoba, a-gaboa, عبد الرحمن قوبع) is a passionate Full Stack Developer and UI/UX Designer specializing in React, Next.js, Node.js, and modern web technologies. Founder of Naqla Tech with 5+ years experience.",
    url: "https://abdulrahmangooba.dev",
    siteName: "Abdulrahman Gaoba Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Abdulrahman Gaoba - Full Stack Developer & UI/UX Designer",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "Yemen",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdulrahman Gaoba - Full Stack Developer & UI/UX Designer",
    description: "Abdulrahman Gaoba (abdulraman gaoba, a-gaboa, عبد الرحمن قوبع) is a passionate Full Stack Developer and UI/UX Designer specializing in React, Next.js, Node.js, and modern web technologies.",
    images: ["/og-image.jpg"],
    creator: "@A_Gaoba",
    site: "@A_Gaoba",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
  classification: "Portfolio",
  other: {
    "google-site-verification": "your-google-verification-code",
    "msvalidate.01": "your-bing-verification-code",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://gaoba.vercel.app/#person",
      name: "Abdulrahman Gaoba",
      alternateName: [
        "abdulrahman gaoba",
        "a-gaboa",
        "عبد الرحمن قوبع"
      ],
      url: "https://gaoba.vercel.app/",
      sameAs: [
        "https://github.com/A-Gaoba",
        "https://www.linkedin.com/a-gaoba",
        "https://twitter.com/A_Gaoba"
      ],
      email: "abdulrahmangooba@gmail.com",
      telephone: "+7 (917) 482-84-74",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Moscow",
        addressCountry: "Russia"
      },
      jobTitle: "Full Stack Developer & UI/UX Designer",
      description: "Honors Software Engineering graduate (GPA 4.8) with strong full-stack skills and over a year of experience creating responsive, user-centered web applications. Skilled in building seamless front-end interfaces and robust back-end systems to deliver high-quality, scalable solutions.",
      image: "https://gaoba.vercel.app/myimage.jpeg",
      knowsAbout: [
        "JavaScript", "TypeScript", "HTML5", "CSS3", "ReactJS", "Tailwind CSS", "Redux", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST", "Webpack", "Prisma", "Gulp", "Jira", "Trello", "Jest", "Cypress", "OOP", "MVC", "SPA", "SDLC", "Responsive Design", "Scrum"
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Frontend Developer",
        occupationLocation: {
          "@type": "Country",
          name: "Russia"
        }
      },
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "Ufa University of Science and Technology",
          sameAs: "https://www.ugatu.su/"
        },
        {
          "@type": "EducationalOrganization",
          name: "Saint Petersburg Mining University",
          sameAs: "https://spmi.ru/"
        },
        {
          "@type": "EducationalOrganization",
          name: "University of Sana'a",
          sameAs: "https://su.edu.ye/"
        }
      ],
      worksFor: {
        "@type": "Organization",
        name: "CereSoftware",
        url: "https://www.ceresoftware.co/"
      },
      nationality: {
        "@type": "Country",
        name: "Yemen"
      },
      knowsLanguage: ["Arabic", "English", "Russian"]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://abdulrahmangooba.dev/#website",
      name: "Abdulrahman Gaoba Portfolio",
      alternateName: [
        "عبد الرحمن قوبع - مطور واجهات",
        "Abdulrahman Gaoba - مطور ويب"
      ],
      url: "https://abdulrahmangooba.dev",
      description: "Professional portfolio of Abdulrahman Gaoba (عبد الرحمن قوبع) - Full Stack Developer & UI/UX Designer",
      author: {
        "@id": "https://abdulrahmangooba.dev/#person"
      },
      publisher: {
        "@id": "https://abdulrahmangooba.dev/#person"
      },
      inLanguage: ["en-US", "ar"],
      potentialAction: {
        "@type": "SearchAction",
        target: "https://abdulrahmangooba.dev/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://abdulrahmangooba.dev/#organization",
      name: "Abdulrahman Gaoba Portfolio",
      alternateName: [
        "عبد الرحمن قوبع - مطور واجهات",
        "Abdulrahman Gaoba - مطور ويب"
      ],
      url: "https://abdulrahmangooba.dev",
      logo: "https://abdulrahmangooba.dev/myimage.jpeg",
      sameAs: [
        "https://github.com/A-Gaoba",
        "https://linkedin.com/in/a-gaoba",
        "https://x.com/A_Gaoba"
      ]
    }
  ]

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
        <JsonLd data={jsonLd} />
        <Analytics />
      </body>
    </html>
  )
}
