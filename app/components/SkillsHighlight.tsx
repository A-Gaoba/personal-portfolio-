"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Code, Globe, Database, Zap, ArrowRight, Award } from 'lucide-react'
import { SHOW_UNVERIFIED_CLAIMS } from "@/lib/site"
import { unverified } from "@/lib/claims"
import { useI18n } from "@/components/i18n/I18nProvider"

export default function SkillsHighlight() {
  const { t, href } = useI18n()
  const s = t.home.skills
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

  // Category titles and non-brand skill names come from the dictionary; icons stay here.
  const categoryIcons = [<Code key="c" className="w-6 h-6" />, <Globe key="g" className="w-6 h-6" />, <Database key="d" className="w-6 h-6" />, <Zap key="z" className="w-6 h-6" />]
  const skillCategories = s.categories.map((c, i) => ({ ...c, icon: categoryIcons[i] }))

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
        ease: [0.25, 0.46, 0.45, 0.94] as const,
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
          <p className="kicker mb-5">{s.kicker}</p>

          <motion.h2
            className="title mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {s.title}
            <br />
            <span className="mark">{s.titleMark}</span>
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
                className="text-center bg-dark-bg-secondary/90 p-6 rounded-card shadow-dev-md border border-dark-border hover:shadow-dev-lg transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="text-4xl mb-4">{skill.icon}</div>
                <h3 className="text-xl font-bold text-dev-text mb-2">{skill.name}</h3>
                {/* Phase 0a: self-rated percentages (95%, 92%…) hidden until confirmed; the ring's gradient was also
                    broken (stopColor was built from Tailwind class names such as "#syntax-cyan"). */}
                {SHOW_UNVERIFIED_CLAIMS && (
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
                )}
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
              className="bg-dark-bg-secondary/90 p-6 rounded-card shadow-dev-md border border-dark-border hover:shadow-dev-lg hover:border-syntax-blue transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 bg-inverse rounded-xl text-on-inverse mb-4`}
              >
                {category.icon}
              </div>
              <h3 className="text-lg font-bold text-dev-text mb-4">{category.title}</h3>
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center text-sm text-dev-text-muted">
                    <div className="w-2 h-2 bg-syntax-green rounded-full me-3 flex-shrink-0"></div>
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center ink-band rounded-card p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="kicker mb-5">{s.ctaKicker}</p>

          <h3 className="text-3xl md:text-4xl font-bold text-dev-text mb-4">
            {unverified("50+ ")}{s.ctaTitle} <span className="mark">{s.ctaTitleMark}</span>
          </h3>

          <p className="text-lg md:text-xl text-dev-text-muted leading-relaxed max-w-3xl mx-auto mb-8">
            {s.ctaText}
          </p>

          <motion.div whileHover={{ y: -2 }} >
            <Link
              href={href("/skills")}
              className="btn btn-brand"
            >
              {s.ctaButton}
              <ArrowRight className="w-5 h-5 rtl:-scale-x-100" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
