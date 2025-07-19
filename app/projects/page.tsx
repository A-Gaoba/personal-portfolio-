import ProjectsPageClient from "@/app/projects/ProjectsPageClient"
import ScrollProgress from "@/app/components/ScrollProgress"
import JsonLd from "@/app/components/JsonLd"

export const metadata = {
  title: "Projects Portfolio | Abdulrahman Gaoba - Full Stack Developer",
  description: "Explore Abdulrahman Gaoba's (abdulraman gaoba, a-gaboa, عبد الرحمن قابوعة, عبد الرحمن قوبع) portfolio of web development projects including Naqla Tech, Yemeni Cultural Directory, Junzi Tech Solutions, and 15+ other successful projects with proven results.",
  keywords: [
    // English Keywords
    "Abdulrahman Gaoba Projects",
    "abdulraman gaoba portfolio",
    "abdulrahamn gooba projects",
    "abdulrahman gaoba portfolio",
    "a-gaboa projects",
    "Web Development Portfolio",
    "React Projects",
    "Next.js Projects",
    "Naqla Tech",
    "Yemeni Cultural Directory",
    "Junzi Tech Solutions",
    "E-commerce Projects",
    "Portfolio Websites",
    "Full Stack Projects",
    "UI/UX Design Projects",
    // Arabic Keywords
    "عبد الرحمن قابوعة",
    "عبد الرحمن قوبع",
    "مشاريع عبد الرحمن قابوعة",
    "أعمال مطور واجهات",
    "مشاريع تطوير مواقع",
    "مشاريع React",
    "مشاريع Next.js",
    "شركة ناقلة تك",
    "دليل الثقافة اليمنية",
    "حلول جنزي التقنية",
    "مشاريع تجارة إلكترونية",
    "مواقع محفظة أعمال",
    "مشاريع Full Stack",
    "مشاريع تصميم واجهات",
    "أعمال برمجة مواقع",
    "مشاريع تطوير تطبيقات"
  ].join(", "),
  openGraph: {
    title: "Projects Portfolio | Abdulrahman Gaoba - Full Stack Developer",
    description: "Explore Abdulrahman Gaoba's (abdulraman gaoba, a-gaboa, عبد الرحمن قابوعة) portfolio of web development projects including Naqla Tech, Yemeni Cultural Directory, Junzi Tech Solutions, and 15+ other successful projects.",
    url: "https://abdulrahmangooba.dev/projects",
    siteName: "Abdulrahman Gaoba Portfolio",
    images: [
      {
        url: "/projectsImages/naqla.png",
        width: 1200,
        height: 630,
        alt: "Abdulrahman Gaoba Projects Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects Portfolio | Abdulrahman Gaoba - Full Stack Developer",
    description: "Explore Abdulrahman Gaoba's (abdulraman gaoba, a-gaboa, عبد الرحمن قابوعة) portfolio of web development projects with proven results.",
    images: ["/projectsImages/naqla.png"],
    creator: "@A_Gaoba",
  },
  alternates: {
    canonical: "https://abdulrahmangooba.dev/projects",
  },
}

export default function Projects() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Abdulrahman's Projects",
    description: "A portfolio of full-stack development and UI/UX design projects by Abdulrahman.",
    url: "https://abdulrahman.dev/projects",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "CreativeWork",
            name: "Project Alpha",
            description: "A full-stack web application for managing tasks.",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "CreativeWork",
            name: "Project Beta",
            description: "A UI/UX redesign for an e-commerce platform.",
          },
        },
      ],
    },
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <ScrollProgress />
      <main className="min-h-screen flex flex-col justify-center items-center pt-24 bg-dark-bg">
        <ProjectsPageClient />
      </main>
    </>
  )
}
