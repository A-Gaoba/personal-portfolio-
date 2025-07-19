"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Code, Database, Cloud, GitBranch, Zap, ShieldCheck, Server } from "lucide-react"

const skillsData = [
  { name: "React.js", icon: "/icons/react.svg", category: "Frontend" },
  { name: "Next.js", icon: "/icons/nextjs.svg", category: "Frontend" },
  { name: "TypeScript", icon: "/icons/typescript.svg", category: "Frontend" },
  { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg", category: "Frontend" },
  { name: "Node.js", icon: "/icons/nodejs.svg", category: "Backend" },
  { name: "Express.js", icon: "/icons/express.svg", category: "Backend" },
  { name: "MongoDB", icon: "/icons/mongodb.svg", category: "Database" },
  { name: "PostgreSQL", icon: "/icons/postgresql.svg", category: "Database" },
  { name: "Prisma ORM", icon: "/icons/prisma.svg", category: "Database" },
  { name: "GraphQL", icon: "/icons/graphql.svg", category: "Backend" },
  { name: "AWS", icon: "/icons/aws.svg", category: "Cloud" },
  { name: "Docker", icon: "/icons/docker.svg", category: "DevOps" },
  { name: "Git", icon: "/icons/git.svg", category: "DevOps" },
  { name: "GitHub", icon: "/icons/github.svg", category: "DevOps" },
  { name: "CI/CD", icon: "/icons/cicd.svg", category: "DevOps" },
  { name: "Jest", icon: "/icons/jest.svg", category: "Testing" },
  { name: "Cypress", icon: "/icons/cypress.svg", category: "Testing" },
  { name: "Figma", icon: "/icons/figma.svg", category: "Design" },
  { name: "Photoshop", icon: "/icons/photoshop.svg", category: "Design" },
]

const certifications = [
  {
    name: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    date: "Jan 2023",
    icon: "/icons/aws.svg",
  },
  {
    name: "Professional Scrum Developer I",
    issuer: "Scrum.org",
    date: "Aug 2022",
    icon: "/icons/scrum.svg",
  },
  {
    name: "Google Project Management Certificate",
    issuer: "Google",
    date: "May 2022",
    icon: "/icons/google.svg",
  },
]

const categories = [
  { name: "Frontend", icon: Code, color: "text-syntax-blue" },
  { name: "Backend", icon: Server, color: "text-syntax-green" },
  { name: "Database", icon: Database, color: "text-syntax-purple" },
  { name: "Cloud", icon: Cloud, color: "text-syntax-orange" },
  { name: "DevOps", icon: GitBranch, color: "text-syntax-cyan" },
  { name: "Testing", icon: Zap, color: "text-syntax-pink" },
  { name: "Design", icon: ShieldCheck, color: "text-syntax-red" },
]

export default function Skills() {
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dev-text">
            My <span className="text-gradient-syntax">Skills</span> & Expertise
          </h2>
          <p className="text-xl md:text-2xl text-dev-text-muted max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical proficiencies and certifications.
          </p>
        </div>

        {/* Skills by Category */}
        <div className="mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-dev-text text-center mb-10">Technical Stack</h3>
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
                className="bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border p-6 hover:shadow-dev-lg hover:border-syntax-blue transition-all duration-300"
                variants={itemVariants}
              >
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg ${category.color} bg-dark-bg-tertiary mr-4`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-dev-text">{category.name}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillsData
                    .filter((skill) => skill.category === category.name)
                    .map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-4 py-2 bg-dark-bg-tertiary text-dev-text-muted text-sm rounded-full font-mono hover:text-syntax-blue hover:border-syntax-blue transition-colors duration-200 border border-transparent"
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
          <h3 className="text-3xl md:text-4xl font-bold text-dev-text text-center mb-10">Certifications</h3>
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
                className="bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border p-6 flex items-center space-x-4 hover:shadow-dev-lg hover:border-syntax-green transition-all duration-300"
                variants={itemVariants}
              >
                {cert.icon && (
                  <Image
                    src={cert.icon || "/placeholder.svg"}
                    alt={cert.issuer}
                    width={48}
                    height={48}
                    className="w-12 h-12 flex-shrink-0"
                  />
                )}
                <div>
                  <h4 className="text-lg font-bold text-dev-text">{cert.name}</h4>
                  <p className="text-dev-text-muted text-sm">{cert.issuer}</p>
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
