"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Code, Database, GitBranch, Zap, ShieldCheck, Server } from "lucide-react"
import { useI18n } from "@/components/i18n/I18nProvider"

const SHOW_CERT_ICONS = false

const skillsData = [
  { name: "JavaScript", icon: "/icons/javascript.svg", category: "Languages" },
  { name: "TypeScript", icon: "/icons/typescript.svg", category: "Languages" },
  { name: "HTML5", icon: "/icons/html5.svg", category: "Languages" },
  { name: "CSS3", icon: "/icons/css3.svg", category: "Languages" },
  { name: "ReactJS", icon: "/icons/react.svg", category: "Frontend" },
  { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg", category: "Frontend" },
  { name: "Redux", icon: "/icons/redux.svg", category: "Frontend" },
  { name: "Node.js", icon: "/icons/nodejs.svg", category: "Backend" },
  { name: "Express.js", icon: "/icons/express.svg", category: "Backend" },
  { name: "MongoDB", icon: "/icons/mongodb.svg", category: "Database" },
  { name: "PostgreSQL", icon: "/icons/postgresql.svg", category: "Database" },
  { name: "REST", icon: "/icons/rest.svg", category: "Backend" },
  { name: "Webpack", icon: "/icons/webpack.svg", category: "Tools" },
  { name: "Prisma", icon: "/icons/prisma.svg", category: "Tools" },
  { name: "Gulp", icon: "/icons/gulp.svg", category: "Tools" },
  { name: "Jira", icon: "/icons/jira.svg", category: "Tools" },
  { name: "Trello", icon: "/icons/trello.svg", category: "Tools" },
  { name: "Jest", icon: "/icons/jest.svg", category: "Testing" },
  { name: "Cypress", icon: "/icons/cypress.svg", category: "Testing" },
  { name: "OOP", icon: "/icons/oop.svg", category: "Practices" },
  { name: "MVC", icon: "/icons/mvc.svg", category: "Practices" },
  { name: "SPA", icon: "/icons/spa.svg", category: "Practices" },
  { name: "SDLC", icon: "/icons/sdlc.svg", category: "Practices" },
  { name: "Responsive Design", icon: "/icons/responsive.svg", category: "Practices" },
  { name: "Scrum", icon: "/icons/scrum.svg", category: "Practices" },
]

const certifications = [
  {
    name: "Introduction to Artificial Intelligence",
    issuer: "Ufa State Aviation Technical University",
    date: "2024",
    icon: "/icons/ai.svg",
  },
  {
    name: "Data Analytics",
    issuer: "Ufa University of Science and Technology",
    date: "2024",
    icon: "/icons/data-analytics.svg",
  },
]

// Phase 0a (2026-11-07): the cards used categories that do not exist in skillsData ("Cloud", "DevOps", "Design"
// were empty) while "Languages", "Tools" and "Practices" were never shown (13 skills hidden). The cards now use
// exactly the categories of skillsData; no skill was added or removed.
const categories = [
  { name: "Languages", icon: Code, color: "text-brand-text" },
  { name: "Frontend", icon: Code, color: "text-fg-2" },
  { name: "Backend", icon: Server, color: "text-brand-text" },
  { name: "Database", icon: Database, color: "text-fg-2" },
  { name: "Tools", icon: GitBranch, color: "text-brand-text" },
  { name: "Testing", icon: Zap, color: "text-fg-2" },
  { name: "Practices", icon: ShieldCheck, color: "text-brand-text" },
]

export default function Skills() {
  const { t } = useI18n()
  const k = t.skills
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24 bg-dark-bg text-dev-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Phase 0b: the page's main heading is now its <h1> (same classes). */}
          <p className="kicker mb-5">{k.kicker}</p>
          <h1 className="display mb-6">
            {k.titleBefore}<span className="mark">{k.titleMark}</span>{k.titleAfter}
          </h1>
          <p className="lede mx-auto max-w-2xl">
            {k.lede}
          </p>
        </div>

        {/* Skills by Category */}
        <div className="mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-dev-text text-center mb-10">{k.stack}</h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {categories.map((category) => (
              <motion.div
                key={category.name}
                className="bg-dark-bg-secondary rounded-card shadow-dev-md border border-dark-border p-6 hover:shadow-dev-lg hover:border-syntax-blue transition-all duration-300"
                variants={itemVariants}
              >
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg ${category.color} bg-dark-bg-tertiary me-4`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-dev-text">{k.categories[category.name as keyof typeof k.categories] ?? category.name}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillsData
                    .filter((skill) => skill.category === category.name)
                    .map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        dir="ltr"
                        className="px-4 py-2 bg-dark-bg-tertiary text-dev-text-muted text-sm rounded-full font-mono hover:text-brand-text hover:border-syntax-blue transition-colors duration-200 border border-transparent"
                      >
                        {skill.name}
                      </span>
                    ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-dev-text text-center mb-10">{k.certifications}</h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className="bg-dark-bg-secondary rounded-card shadow-dev-md border border-dark-border p-6 flex items-center gap-4 hover:shadow-dev-lg hover:border-syntax-green transition-all duration-300"
                variants={itemVariants}
              >
                {/* Phase 0a: the icon files (/icons/ai.svg, /icons/data-analytics.svg) do not exist in public/, so the
                    images were broken; not rendered until real icons are added. */}
                {SHOW_CERT_ICONS && cert.icon && (
                  <Image
                    src={cert.icon || "/placeholder.svg"}
                    alt={cert.issuer}
                    width={48}
                    height={48}
                    className="w-12 h-12 flex-shrink-0"
                  />
                )}
                <div>
                  <h4 className="text-lg font-bold text-dev-text">{k.certs[index]?.name ?? cert.name}</h4>
                  <p className="text-dev-text-muted text-sm">{k.certs[index]?.issuer ?? cert.issuer}</p>
                  <p className="text-dev-text-subtle text-xs">{cert.date}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
