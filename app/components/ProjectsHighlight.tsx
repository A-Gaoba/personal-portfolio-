"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ExternalLink, Github, ArrowRight, Star, TrendingUp, Code } from 'lucide-react'
import { SHOW_UNVERIFIED_CLAIMS } from "@/lib/site"
import { withoutUnverifiedClaims } from "@/lib/claims"
import { verifiedLiveUrl, verifiedRepoUrl } from "@/lib/verified-links"
import { useI18n, localizeItems } from "@/components/i18n/I18nProvider"

export default function ProjectsHighlight() {
  const { t, href } = useI18n()
  const s = t.home.projects
  const projectsEn = [
    {
      id: 1,
      title: "Naqla Tech Logistics Platform",
      subtitle: "Revolutionary Logistics Management System",
      description:
        "Comprehensive logistics platform serving 1000+ users with real-time tracking and AI optimization. Built with React, Next.js, and modern technologies.",
      image: "/projectsImages/naqla.png",
      technologies: ["React", "Next.js", "Node.js", "MongoDB", "Socket.io"],
      metrics: ["1000+ Users", "$50K+ Revenue", "40% Efficiency Gain"],
      liveUrl: "https://naqlatech.com",
      githubUrl: "https://github.com/A-Gaoba/naqla-tech",
      featured: true,
    },
    {
      id: 2,
      title: "GaobaVid - Video Platform",
      subtitle: "Next-Generation Video Streaming",
      description:
        "Scalable video streaming platform with advanced features and modern user experience. Optimized for performance and accessibility.",
      image: "/projectsImages/gaobavid.png",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      metrics: ["60% Faster Loading", "10K+ Viewers", "98% Mobile Score"],
      liveUrl: "https://gaobavid.com",
      githubUrl: "https://github.com/A-Gaoba/gaoba-vid",
      featured: false,
    },
    {
      id: 3,
      title: "To Russia! Travel Platform",
      subtitle: "Comprehensive Travel Planning",
      description:
        "Intuitive travel platform with integrated booking and cultural insights. Features multi-language support and accessibility compliance.",
      image: "/projectsImages/toru.png",
      technologies: ["React", "Next.js", "Tailwind CSS", "Mapbox"],
      metrics: ["50% More Engagement", "98% Accessibility", "5 Languages"],
      liveUrl: "https://torussia.travel",
      githubUrl: "https://github.com/A-Gaoba/to-russia",
      featured: false,
    },
  ]
  // English text above is the source; other languages overlay title/subtitle/description by id.
  const featuredProjects = localizeItems(projectsEn, "id", s.overlay)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  return (
    <section
      id="projects"
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

          <motion.p
            className="lede mx-auto max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {s.lede}
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`group relative ${project.featured ? "lg:col-span-2" : ""}`}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="bg-dark-bg-secondary/90 rounded-card shadow-dev-xl border border-dark-border overflow-hidden group-hover:shadow-dev-lg transition-all duration-500">
                {/* Project Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={`${project.title} - ${project.subtitle}`}
                    fill
                    className="object-cover transition-transform duration-700"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity duration-500" />

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center px-3 py-1 bg-brand hover:bg-brand/90 text-on-brand rounded-full text-sm font-semibold">
                        <Star className="w-4 h-4 me-1" />
                        {t.common.featured}
                      </div>
                    </div>
                  )}

                  {/* Hover Actions — Phase 0a: only links verified on 2026-11-07 (lib/verified-links.ts). */}
                  {/* Visible on hover, on keyboard focus, and always on touch screens (no hover there). */}
                  <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100 transition-all duration-300 sm:items-center sm:pb-0">
                    <div className="flex gap-4">
                      {verifiedLiveUrl(project.liveUrl) && (
                      <motion.a
                        href={verifiedLiveUrl(project.liveUrl)!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-dark-bg-secondary/90 text-dev-text rounded-xl font-semibold hover:bg-dark-bg-tertiary transition-colors duration-200"
                        
                        
                      >
                        <ExternalLink className="w-5 h-5 me-2 inline" />
                        {s.viewLive}
                      </motion.a>
                      )}
                      {verifiedRepoUrl(project.githubUrl) && (
                      <motion.a
                        href={verifiedRepoUrl(project.githubUrl)!}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t.common.sourceCode}
                        className="p-3 bg-dark-bg-secondary/90 rounded-xl hover:bg-dark-bg-tertiary transition-colors duration-200"
                        
                        
                      >
                        <Github className="w-5 h-5 text-dev-text" />
                      </motion.a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <div className="mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-dev-text mb-2 group-hover:text-brand-text transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-lg text-dev-text-muted mb-4">{project.subtitle}</p>
                    <p className="text-dev-text-muted leading-relaxed">{withoutUnverifiedClaims(project.description)}</p>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-dark-bg-tertiary text-dev-text-muted text-sm rounded-full hover:bg-dark-bg-secondary hover:text-brand-text transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Phase 0a: metrics ("1000+ Users", "$50K+ Revenue"…) have no source; hidden until confirmed. */}
                  {SHOW_UNVERIFIED_CLAIMS && (
                  <div className="grid grid-cols-3 gap-4">
                    {project.metrics.map((metric, metricIndex) => (
                      <div
                        key={metricIndex}
                        className="text-center p-3 bg-surface-2 rounded-lg"
                      >
                        <TrendingUp className="w-4 h-4 text-brand-text mx-auto mb-1" />
                        <span className="text-sm text-dev-text font-medium">{metric}</span>
                      </div>
                    ))}
                  </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div whileHover={{ y: -2 }} >
            <Link
              href={href("/projects")}
              className="btn btn-brand"
            >
              {s.cta}
              <ArrowRight className="w-5 h-5 rtl:-scale-x-100" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
