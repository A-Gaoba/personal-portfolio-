import type { Metadata } from "next"
import Image from "next/image"
import { MapPin } from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import About from "../components/About"
import ScrollProgress from "../components/ScrollProgress"
import DeveloperBackground from "../components/DeveloperBackground"

export const metadata: Metadata = {
  title: "About Abdulrahman Gaoba | Full Stack Software Engineer Journey & Story",
  description:
    "Learn about Abdulrahman Gaoba's journey from academic excellence (4.8/5 GPA) to startup founder. Discover the story behind Naqla Tech, technical expertise, and passion for creating impactful web solutions.",
  keywords: [
    "About Abdulrahman Gaoba",
    "Software Engineer Story",
    "Startup Founder Journey",
    "Naqla Tech Founder",
    "Full Stack Developer Background",
    "Software Engineering Career",
    "React Developer Story",
    "Next.js Expert Background",
  ].join(", "),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abdulrahmangooba.dev/about",
    title: "About Abdulrahman Gaoba | Full Stack Software Engineer Journey & Story",
    description:
      "Learn about Abdulrahman Gaoba's journey from academic excellence to startup founder. Discover the story behind technical expertise and passion for web development.",
    siteName: "Abdulrahman Gaoba Portfolio",
  },
  alternates: {
    canonical: "https://abdulrahmangooba.dev/about",
  },
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <DeveloperBackground />
      <ScrollProgress />
      <Navbar />
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
                <span className="text-dev-text font-semibold">Based in [Your Location]</span>
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
                  My journey in software engineering began with a simple belief: technology should solve real problems
                  and create meaningful impact. With a{" "}
                  <span className="font-semibold text-syntax-green">4.8/5 GPA</span> in Software Engineering and
                  experience as a <span className="font-semibold text-syntax-blue">startup founder</span>, I bring both
                  academic rigor and entrepreneurial insight to every project.
                </p>

                <p>
                  As the founder of <span className="font-semibold text-syntax-purple">Naqla Tech</span>, I learned
                  firsthand how the right technology can transform businesses. Our logistics platform grew to serve
                  1000+ users and generate $50K+ in revenue, teaching me valuable lessons about scalability, user
                  experience, and business impact.
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
