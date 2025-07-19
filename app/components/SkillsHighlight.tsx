"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Code, Globe, Database, Zap, ArrowRight, Award } from 'lucide-react'

export default function SkillsHighlight() {
  const coreSkills = [
    {
      name: "React.js",
      level: 95,
      color: "from-syntax-cyan to-syntax-blue",
      icon: "⚛️",
    },
    {
      name: "Next.js",
      level: 92,
      color: "from-dev-text-muted to-dev-text",
      icon: "🚀",
    },
    {
      name: "Tailwind CSS",
      level: 94,
      color: "from-syntax-green to-syntax-cyan",
      icon: "🎨",
    },
    {
      name: "TypeScript",
      level: 88,
      color: "from-syntax-blue to-syntax-purple",
      icon: "📘",
    },
  ]

  const skillCategories = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Frontend Excellence",
      skills: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "JavaScript ES6+"],
      color: "from-syntax-green to-syntax-cyan",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Full-Stack Development",
      skills: ["Node.js", "Express.js", "REST APIs", "GraphQL", "Microservices"],
      color: "from-syntax-blue to-syntax-cyan",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Database & Backend",
      skills: ["MongoDB", "PostgreSQL", "Prisma ORM", "Redis", "AWS"],
      color: "from-syntax-purple to-syntax-pink",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Performance & Tools",
      skills: ["Performance Optimization", "SEO", "Testing", "CI/CD", "Docker"],
      color: "from-syntax-orange to-syntax-red",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <section
      id="skills"
      className="py-16 sm:py-20 lg:py-24 bg-dark-bg relative overflow-hidden text-dev-text"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-syntax-green/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-syntax-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 bg-dark-bg-secondary/80 backdrop-blur-sm border border-dark-border rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Zap className="w-5 h-5 text-syntax-green mr-2" />
            <span className="text-dev-text font-semibold">Technical Expertise</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dev-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Comprehensive Technical
            <br />
            <span className="bg-gradient-to-r from-syntax-green via-syntax-blue to-syntax-purple bg-clip-text text-transparent">
              Expertise & Mastery
            </span>
          </motion.h2>
        </motion.div>

        {/* Core Skills Showcase */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="text-center bg-dark-bg-secondary/90 backdrop-blur-sm p-6 rounded-2xl shadow-dev-md border border-dark-border hover:shadow-dev-lg transition-all duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="text-4xl mb-4">{skill.icon}</div>
                <h3 className="text-xl font-bold text-dev-text mb-2">{skill.name}</h3>
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3e4451" // dark-border
                      strokeWidth="2"
                    />
                    <motion.path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={`url(#gradient-${index})`}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray={`${skill.level}, 100`}
                      initial={{ strokeDasharray: "0, 100" }}
                      animate={{ strokeDasharray: `${skill.level}, 100` }}
                      transition={{ delay: index * 0.2 + 0.5, duration: 1.5 }}
                    />
                    <defs>
                      <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={skill.color.split(" ")[0].replace("from-", "#")} />
                        <stop offset="100%" stopColor={skill.color.split(" ")[1].replace("to-", "#")} />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-dev-text">{skill.level}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skill Categories */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="bg-dark-bg-secondary/90 backdrop-blur-sm p-6 rounded-2xl shadow-dev-md border border-dark-border hover:shadow-dev-lg hover:border-syntax-blue transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl text-dark-bg mb-4`}
              >
                {category.icon}
              </div>
              <h3 className="text-lg font-bold text-dev-text mb-4">{category.title}</h3>
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center text-sm text-dev-text-muted">
                    <div className="w-2 h-2 bg-syntax-green rounded-full mr-3 flex-shrink-0"></div>
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-gradient-to-r from-syntax-blue/10 via-syntax-green/10 to-syntax-purple/10 rounded-3xl p-8 md:p-12 shadow-dev-xl border border-dark-border"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 bg-dark-bg-secondary/80 backdrop-blur-sm border border-dark-border rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Award className="w-5 h-5 text-syntax-green mr-2" />
            <span className="text-dev-text font-semibold">Technical Excellence</span>
          </motion.div>

          <h3 className="text-3xl md:text-4xl font-bold text-dev-text mb-4">
            50+ Technologies Mastered
            <span className="bg-gradient-to-r from-syntax-green to-syntax-blue bg-clip-text text-transparent">
              {" "}
              Across Full Stack
            </span>
          </h3>

          <p className="text-lg md:text-xl text-dev-text-muted leading-relaxed max-w-3xl mx-auto mb-8">
            From frontend excellence to full-stack capabilities, I deliver robust, scalable solutions using modern
            technologies and best practices.
          </p>

          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/skills"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-syntax-blue to-syntax-green text-dark-bg rounded-xl font-semibold text-lg hover:from-syntax-green hover:to-syntax-cyan transition-all duration-300 shadow-glow-primary hover:shadow-glow-secondary"
            >
              Explore All Skills & Certifications
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
