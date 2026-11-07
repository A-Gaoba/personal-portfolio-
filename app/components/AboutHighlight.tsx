"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Award, Users, Code, TrendingUp, Sparkles } from 'lucide-react'
import { SHOW_UNVERIFIED_CLAIMS } from "@/lib/site"
import { useI18n } from "@/components/i18n/I18nProvider"

export default function AboutHighlight() {
  const { t, href } = useI18n()
  const s = t.home.about
  const stats = [
    {
      number: "4.8/5",
      label: "Academic GPA",
      description: "Software Engineering Excellence",
      icon: <Award className="w-5 h-5" />,
    },
    {
      number: "1000+",
      label: "Users Served",
      description: "Through Naqla Tech Platform",
      icon: <Users className="w-5 h-5" />,
    },
    {
      number: "50+",
      label: "Projects Built",
      description: "Across Various Industries",
      icon: <Code className="w-5 h-5" />,
    },
    {
      number: "5+",
      label: "Years Experience",
      description: "Full-Stack Development",
      icon: <TrendingUp className="w-5 h-5" />,
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
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  return (
    <section
      id="about"
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

        {/* Main Content */}
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Profile image — 2026-11-07 redesign: the rotating rainbow ring and the four emoji badges were removed
              (continuous animation; badge labels repeated unverified claims). */}
          <motion.div className="relative isolate mx-auto w-full max-w-[20rem] sm:max-w-sm" variants={itemVariants}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-line bg-surface shadow-lift">
              <Image
                src="/myimage.jpeg"
                alt={t.common.photoAlt}
                fill
                sizes="(min-width: 640px) 24rem, 20rem"
                className="object-cover"
              />
            </div>
            <div aria-hidden="true" className="absolute -bottom-3 -end-3 -z-10 h-full w-full rounded-card bg-brand" />
          </motion.div>

          {/* Content */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="space-y-4">
              <p className="chip bg-surface">{t.common.role}</p>

              <h3 className="text-3xl font-bold leading-tight tracking-tight text-fg md:text-4xl">
                {s.subtitle} <span className="mark">{s.subtitleMark}</span>
              </h3>

              <div className="space-y-4 text-lg text-dev-text-muted leading-relaxed">
                <p>{s.p1}</p>

                <p>
                  {s.p2Before}<span className="font-semibold text-fg-2">Naqla Tech</span>{s.p2After}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <motion.div whileHover={{ y: -2 }} >
              <Link
                href={href("/about")}
                className="btn btn-ink group"
              >
                {s.cta}
                <ArrowRight className="w-5 h-5 rtl:-scale-x-100" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Phase 0a: "1000+ Users", "50+ Projects", "5+ Years" (and GPA) cards hidden until confirmed (SHOW_UNVERIFIED_CLAIMS). */}
        {SHOW_UNVERIFIED_CLAIMS && (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center bg-dark-bg-secondary/80 p-6 rounded-card shadow-dev-md border border-dark-border/50 hover:shadow-dev-lg transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-brand hover:bg-brand/90 rounded-xl mb-4 text-on-brand mx-auto">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-brand-text mb-2">
                {stat.number}
              </div>
              <div className="font-semibold text-dev-text mb-1">{stat.label}</div>
              <div className="text-sm text-dev-text-muted">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>
        )}
      </div>
    </section>
  )
}
