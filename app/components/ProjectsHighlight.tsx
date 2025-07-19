"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ExternalLink, Github, ArrowRight, Star, TrendingUp, Code } from 'lucide-react'

export default function ProjectsHighlight() {
  const featuredProjects = [
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
        ease: [0.25, 0.46, 0.45, 0.94],
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
        <div className="absolute top-40 left-20 w-96 h-96 bg-syntax-green/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-[500px] h-[500px] bg-syntax-blue/10 rounded-full blur-3xl" />
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
            <Code className="w-5 h-5 text-syntax-green mr-2" />
            <span className="text-dev-text font-semibold">Featured Work</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dev-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Transforming Ideas Into
            <br />
            <span className="bg-gradient-to-r from-syntax-green via-syntax-blue to-syntax-purple bg-clip-text text-transparent">
              Digital Excellence
            </span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-dev-text-muted max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Showcasing high-impact projects that demonstrate technical expertise and measurable business results.
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
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="bg-dark-bg-secondary/90 backdrop-blur-sm rounded-3xl shadow-dev-xl border border-dark-border overflow-hidden group-hover:shadow-dev-lg transition-all duration-500">
                {/* Project Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={`${project.title} - ${project.subtitle}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center px-3 py-1 bg-gradient-to-r from-syntax-orange to-syntax-pink text-dark-bg rounded-full text-sm font-semibold">
                        <Star className="w-4 h-4 mr-1" />
                        Featured
                      </div>
                    </div>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex space-x-4">
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-dark-bg-secondary/90 backdrop-blur-sm text-dev-text rounded-xl font-semibold hover:bg-dark-bg-tertiary transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-5 h-5 mr-2 inline" />
                        View Live
                      </motion.a>
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-dark-bg-secondary/90 backdrop-blur-sm rounded-xl hover:bg-dark-bg-tertiary transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-5 h-5 text-dev-text" />
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <div className="mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-dev-text mb-2 group-hover:text-syntax-green transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-lg text-dev-text-muted mb-4">{project.subtitle}</p>
                    <p className="text-dev-text-muted leading-relaxed">{project.description}</p>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-dark-bg-tertiary text-dev-text-muted text-sm rounded-full hover:bg-dark-bg-secondary hover:text-syntax-blue transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    {project.metrics.map((metric, metricIndex) => (
                      <div
                        key={metricIndex}
                        className="text-center p-3 bg-gradient-to-r from-syntax-blue/10 to-syntax-green/10 rounded-lg"
                      >
                        <TrendingUp className="w-4 h-4 text-syntax-green mx-auto mb-1" />
                        <span className="text-sm text-dev-text font-medium">{metric}</span>
                      </div>
                    ))}
                  </div>
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
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/projects"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-syntax-blue to-syntax-green text-dark-bg rounded-xl font-semibold text-lg hover:from-syntax-green hover:to-syntax-cyan transition-all duration-300 shadow-glow-primary hover:shadow-glow-secondary"
            >
              View All Projects & Case Studies
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
