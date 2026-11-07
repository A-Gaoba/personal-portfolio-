import type { Metadata } from "next"
import { DEFAULT_OG_IMAGE } from "@/lib/site"
import Image from "next/image"
import { MapPin } from "lucide-react"
import About from "../components/About"
import ScrollProgress from "../components/ScrollProgress"
import DeveloperBackground from "../components/DeveloperBackground"

// Phase 0b (2026-11-07): relative canonical (resolved against SITE_URL), no misspelling stuffing.
export const metadata: Metadata = {
  title: "About Abdulrahman Gaoba | Full Stack Developer & Startup Founder",
  description:
    "About Abdulrahman Gaoba (عبد الرحمن قوبع): education in software engineering, work as a full stack developer, and the founding of Naqla Tech.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Abdulrahman Gaoba | Full Stack Developer & Startup Founder",
    description:
      "Education in software engineering, work as a full stack developer, and the founding of Naqla Tech.",
    url: "/about",
    siteName: "Abdulrahman Gaoba",
    locale: "en_US",
    type: "profile",
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <DeveloperBackground />
      <ScrollProgress />
      {/* Phase 0a: <Navbar /> removed here — app/layout.tsx already renders it (the page showed two navbars). */}
      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-dark-bg">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-syntax-green/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-syntax-blue/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Profile Image */}
            <div className="relative">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[28rem] lg:h-[28rem] mx-auto">
                <div
                  className="absolute inset-0 rounded-full opacity-40"
                  style={{
                    background: "conic-gradient(from 0deg, #98c379, #61afef, #c678dd, #d19a66, #98c379)",
                  }}
                />
                <div className="absolute inset-8 bg-dark-bg-secondary rounded-full shadow-2xl overflow-hidden border-4 border-dark-border/50 backdrop-blur-xl">
                  <Image
                    src="/myimage.jpeg"
                    alt="Abdulrahman Gaoba - Full Stack Software Engineer"
                    width={448}
                    height={448}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-6 py-3 bg-dark-bg-secondary/80 backdrop-blur-xl border border-emerald-200/50 rounded-full">
                <MapPin className="w-5 h-5 text-emerald-600 mr-2" />
                <span className="text-dev-text font-semibold">Based in Moscow, Russia</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dev-text leading-tight">
                From Academic Excellence to
                <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Startup Success
                </span>
              </h1>

              <div className="space-y-4 text-lg text-dev-text-muted leading-relaxed">
                <p>
                  Honors Software Engineering graduate (GPA 4.8) with strong full-stack skills and over a year of experience creating responsive, user-centered web applications. Skilled in building seamless front-end interfaces and robust back-end systems to deliver high-quality, scalable solutions.
                </p>

                <p>
                  As the founder of <span className="font-semibold text-syntax-purple">Naqla Tech</span>, a technology startup, I deliver end-to-end digital solutions including web and mobile development, backend systems, bots, and AI automation. I combine entrepreneurial experience with technical expertise in React, Next.js, and Tailwind CSS to build practical, high-quality products for real business needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <main className="relative z-10">
        <About />
      </main>
    </div>
  )
}
