"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Award, Users, Code, TrendingUp, Sparkles, Briefcase, BookOpen } from "lucide-react"
import { unverified } from "@/lib/claims" // Phase 0a: "50+" hidden until confirmed (open question B6)
import { useI18n } from "@/components/i18n/I18nProvider"

// "{count}" in a dictionary string marks where the unverified "50+ " goes (shown only when SHOW_UNVERIFIED_CLAIMS).
const withCount = (text: string) => text.replace("{count}", unverified("50+ "))
const pathIcons = [BookOpen, BookOpen, Award, Briefcase, TrendingUp, BookOpen]
const valueIcons = ["💎", "🎯", "📚", "🚀"]

export default function About() {
  const { t } = useI18n()
  const a = t.about
  const stats = [
    {
      number: "4.8/5",
      label: "Academic GPA",
      description: "Software Engineering Excellence",
      icon: <Award className="w-6 h-6" />,
    },
    {
      number: "1000+",
      label: "Users Served",
      description: "Through Naqla Tech Platform",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "50+",
      label: "Projects Built",
      description: "Across Various Industries",
      icon: <Code className="w-6 h-6" />,
    },
    {
      number: "5+",
      label: "Years Experience",
      description: "Full-Stack Development",
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ]

  // Update timeline to reflect new education and experience
  const timeline = [
    {
      year: "2020",
      title: "Preparatory Courses (Russian Language)",
      description: "Saint Petersburg Mining University — GPA 5",
      icon: <BookOpen className="w-5 h-5" />,
      color: "from-syntax-blue to-syntax-cyan",
    },
    {
      year: "2024",
      title: "BSc in Software Engineering",
      description: "Ufa University of Science and Technology — GPA 4.8",
      icon: <Award className="w-5 h-5" />,
      color: "from-syntax-green to-syntax-cyan",
    },
    {
      year: "2017",
      title: "English Language",
      description: "University of Sana'a — GPA 4",
      icon: <BookOpen className="w-5 h-5" />,
      color: "from-syntax-purple to-syntax-pink",
    },
    {
      year: "2023–Present",
      title: "Frontend Developer at CereSoftware",
      description: "Built responsive websites, integrated APIs, managed client communication. Remote, Yemen.",
      icon: <Briefcase className="w-5 h-5" />,
      color: "from-syntax-orange to-syntax-red",
    },
  ]

  const values = [
    {
      title: "Excellence in Code",
      description: "I believe in writing clean, maintainable, and scalable code that stands the test of time.",
      icon: "💎",
    },
    {
      title: "User-Centric Design",
      description: "Every solution I create prioritizes user experience and accessibility for all users.",
      icon: "🎯",
    },
    {
      title: "Continuous Learning",
      description: "Technology evolves rapidly, and I stay current with the latest trends and best practices.",
      icon: "📚",
    },
    {
      title: "Business Impact",
      description: "My entrepreneurial background helps me understand and deliver real business value.",
      icon: "🚀",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="about-page" className="py-16 sm:py-20 lg:py-24 bg-dark-bg text-dev-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="title mb-6">
            {a.title} <span className="mark">{a.titleMark}</span>
          </h2>
          <p className="lede mx-auto max-w-3xl">{a.lede}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start mb-16">
          {/* 2026-11-07 redesign: the second copy of the profile photo (already in the page header), its rotating ring
              and the emoji badges were replaced by a fact card. Every line restates text already on this page. */}
          <motion.aside
            className="card-ink relative overflow-hidden p-6 sm:p-8 lg:sticky lg:top-24"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            aria-label={a.glanceLabel}
          >
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-on-inverse/60">{a.glanceLabel}</p>
            <dl className="mt-6 divide-y divide-on-inverse/10">
              {a.glance.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3.5 first:pt-0 last:pb-0">
                  <dt className="font-mono text-xs uppercase tracking-wider text-on-inverse/50">{k}</dt>
                  <dd className="text-[15px] leading-snug text-on-inverse">{v}</dd>
                </div>
              ))}
            </dl>
            <span aria-hidden="true" className="absolute end-6 top-6 h-2.5 w-2.5 rounded-full bg-brand" />
          </motion.aside>

          {/* Content */}
          <motion.div
            className="space-y-4 text-lg text-dev-text-muted leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="chip bg-surface">{t.common.role}</p>

            <h3 className="text-3xl md:text-4xl font-bold text-dev-text leading-tight">
              {t.home.about.subtitle} <span className="mark">{t.home.about.subtitleMark}</span>
            </h3>

            <div className="space-y-4 text-lg text-dev-text-muted leading-relaxed">
              {a.story.map((paragraph, i) => (
                <p key={i}>{withCount(paragraph)}</p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Work Experience */}
        <div className="text-center mt-24 mb-16">
          <h2 className="title mb-6">
            {a.experienceTitle} <span className="mark">{a.experienceMark}</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {a.jobs.map((job) => (
            <motion.div
              key={job.role + job.company}
              className="bg-dark-bg-secondary rounded-card shadow-dev-md border border-dark-border p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h4 className="text-xl font-bold text-dev-text mb-2">{job.role}</h4>
              <p className="text-brand-text text-lg mb-2">{job.company}</p>
              <p className="text-dev-text-muted text-sm mb-4">{job.period}</p>
              <ul className="list-disc list-inside text-dev-text-subtle space-y-1">
                {job.bullets.map((b, i) => (
                  <li key={i}>{withCount(b)}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Path to Excellence */}
        <div className="text-center mt-24 mb-16">
          <h2 className="title mb-6">
            {a.pathTitle} <span className="mark">{a.pathMark}</span>
          </h2>
        </div>
        <div className="space-y-12 mb-24">
          {a.path.map((step, i) => {
            const Icon = pathIcons[i] ?? BookOpen
            return (
              <motion.div
                key={step.title}
                className="relative flex items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="hidden md:flex items-center justify-center w-16 h-16 bg-dark-bg-secondary rounded-full shadow-dev-md border-4 border-dark-border relative z-10">
                  <div className="p-3 bg-brand hover:bg-brand/90 rounded-full text-on-brand"><Icon className="w-5 h-5" /></div>
                </div>
                <div className="md:ms-8 bg-dark-bg-secondary rounded-card shadow-dev-md border border-dark-border flex-1 p-6">
                  <div className="flex items-center mb-4">
                    <div className="md:hidden p-3 bg-brand hover:bg-brand/90 rounded-full text-on-brand me-4"><Icon className="w-5 h-5" /></div>
                    <div>
                      <div className="text-sm font-semibold text-brand-text mb-1">{step.year}</div>
                      <h3 className="text-xl font-bold text-dev-text">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-dev-text-muted leading-relaxed">{withCount(step.text)}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Core Values */}
        <div className="text-center mt-24 mb-16">
          <h2 className="title mb-6">
            {a.valuesTitle} <span className="mark">{a.valuesMark}</span>
          </h2>
          <p className="text-xl text-dev-text-muted max-w-3xl mx-auto">{a.valuesLede}</p>
        </div>
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {a.values.map((value, i) => (
            <motion.div
              key={value.title}
              className="bg-dark-bg-secondary rounded-card shadow-dev-md border border-dark-border p-8"
              variants={itemVariants}
            >
              <div className="text-4xl mb-4">{valueIcons[i]}</div>
              <h3 className="text-xl font-bold text-dev-text mb-4">{value.title}</h3>
              <p className="text-dev-text-muted leading-relaxed">{value.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
