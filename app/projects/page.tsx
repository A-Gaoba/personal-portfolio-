import ProjectsPageClient from "@/app/projects/ProjectsPageClient"
import ScrollProgress from "@/app/components/ScrollProgress"
import JsonLd from "@/app/components/JsonLd"

export const metadata = {
  title: "Projects - Abdulrahman's Portfolio",
  description: "Showcasing Abdulrahman's full-stack development and UI/UX design projects.",
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
