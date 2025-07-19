import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins, JetBrains_Mono } from "next/font/google"
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
  title: "Abdulrahman Gaoba - Full Stack Developer & UI/UX Designer",
  description:
    "Passionate full stack developer specializing in React, Node.js, and modern web technologies. Creating innovative solutions and exceptional user experiences.",
  keywords:
    "Full Stack Developer, React Developer, Node.js, UI/UX Designer, Web Development, JavaScript, TypeScript, MongoDB, AWS",
  authors: [{ name: "Abdulrahman Gaoba" }],
  creator: "Abdulrahman Gaoba",
  publisher: "Abdulrahman Gaoba",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://abdulrahman-gaoba.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Abdulrahman Gaoba - Full Stack Developer & UI/UX Designer",
    description:
      "Passionate full stack developer specializing in React, Node.js, and modern web technologies. Creating innovative solutions and exceptional user experiences.",
    url: "https://abdulrahman-gaoba.vercel.app",
    siteName: "Abdulrahman Gaoba Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Abdulrahman Gaoba - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdulrahman Gaoba - Full Stack Developer & UI/UX Designer",
    description: "Passionate full stack developer specializing in React, Node.js, and modern web technologies.",
    images: ["/og-image.jpg"],
    creator: "@abdulrahman_gaoba",
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
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Abdulrahman Gaoba",
    url: "https://abdulrahmangooba.dev",
    sameAs: ["https://github.com/A-Gaoba", "https://linkedin.com/in/A_Gaoba", "https://twitter.com/A_Gaoba"],
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "[Your University Name]",
    },
    jobTitle: "Full Stack Software Engineer",
    description:
      "Expert Full Stack Software Engineer specializing in React, Next.js, and Tailwind CSS. Building high-impact web solutions with a proven track record.",
    image: "https://abdulrahmangooba.dev/profile.jpg",
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
        <JsonLd data={jsonLd} />
      </body>
    </html>
  )
}
