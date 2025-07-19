import type { Metadata } from "next"
import Hero from "./components/Hero"
import AboutHighlight from "./components/AboutHighlight"
import ProjectsHighlight from "./components/ProjectsHighlight"
import SkillsHighlight from "./components/SkillsHighlight"
import ServicesHighlight from "./components/ServicesHighlight"
import ContactHighlight from "./components/ContactHighlight"
import TestimonialsSlider from "./components/TestimonialsSlider"
import Navbar from "./components/Navbar"
import ScrollProgress from "./components/ScrollProgress"
import DeveloperBackground from "./components/DeveloperBackground"

export const metadata: Metadata = {
  title: "Abdulrahman Gaoba - Full Stack Developer & UI/UX Designer | Portfolio",
  description: "Abdulrahman Gaoba (abdulraman gaoba, a-gaboa, عبد الرحمن قوبع, عبد الرحمن قوبع) is a passionate Full Stack Developer and UI/UX Designer specializing in React, Next.js, Node.js, and modern web technologies. Founder of Naqla Tech with 5+ years experience in creating innovative web solutions.",
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
    "UI/UX Designer",
    "Web Development",
    "Portfolio",
    "Naqla Tech",
    "Yemeni Developer",
    "Freelance Developer",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "AWS",
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
  openGraph: {
    title: "Abdulrahman Gaoba - Full Stack Developer & UI/UX Designer | Portfolio",
    description: "Abdulrahman Gaoba (abdulraman gaoba, a-gaboa, عبد الرحمن قوبع) is a passionate Full Stack Developer and UI/UX Designer specializing in React, Next.js, Node.js, and modern web technologies.",
    url: "https://abdulrahmangooba.dev",
    siteName: "Abdulrahman Gaoba Portfolio",
    images: [
      {
        url: "/myimage.jpeg",
        width: 800,
        height: 800,
        alt: "Abdulrahman Gaoba - Full Stack Developer & UI/UX Designer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdulrahman Gaoba - Full Stack Developer & UI/UX Designer | Portfolio",
    description: "Abdulrahman Gaoba (abdulraman gaoba, a-gaboa, عبد الرحمن قوبع) is a passionate Full Stack Developer and UI/UX Designer specializing in React, Next.js, Node.js, and modern web technologies.",
    images: ["/myimage.jpeg"],
    creator: "@A_Gaoba",
    site: "@A_Gaoba",
  },
  alternates: {
    canonical: "https://abdulrahmangooba.dev",
  },
}

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <DeveloperBackground />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <AboutHighlight />
        <ProjectsHighlight />
        <SkillsHighlight />
        <ServicesHighlight />
        <TestimonialsSlider />
        <ContactHighlight />
      </main>
    </div>
  )
}
