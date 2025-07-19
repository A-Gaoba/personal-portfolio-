import Skills from "@/app/components/Skills"
import ScrollProgress from "@/app/components/ScrollProgress"
import JsonLd from "@/app/components/JsonLd"

export const metadata = {
  title: "Skills - Abdulrahman's Portfolio",
  description: "Explore Abdulrahman's technical skills in full-stack development and UI/UX design.",
}

export default function SkillsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Technical Skills",
    description: "A comprehensive list of technical skills possessed by Abdulrahman, a full-stack developer.",
    url: "https://abdulrahman.dev/skills",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Thing",
            name: "React",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Thing",
            name: "Next.js",
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
        <Skills />
      </main>
    </>
  )
}
