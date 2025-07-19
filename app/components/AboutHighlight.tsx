"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Award, Users, Code, TrendingUp, Sparkles } from 'lucide-react'

export default function AboutHighlight() {
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
        ease: [0.25, 0.46, 0.45, 0.94],
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
            <Sparkles className="w-5 h-5 text-syntax-green mr-2" />
            <span className="text-dev-text font-semibold">About Me</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dev-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            From Academic Excellence to
            <br />
            <span className="bg-gradient-to-r from-syntax-green via-syntax-blue to-syntax-purple bg-clip-text text-transparent">
              Startup Success
            </span>
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
          {/* Profile Image */}
          <motion.div className="relative" variants={itemVariants}>
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 mx-auto">
              {/* Animated Background Ring */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-40"
                style={{
                  background: "conic-gradient(from 0deg, #98c379, #61afef, #c678dd, #d19a66, #98c379)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              {/* Profile Image */}
              <motion.div
                className="absolute inset-8 bg-dark-bg-secondary rounded-full shadow-dev-lg overflow-hidden border-4 border-dark-border/50 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src="/myimage.jpeg"
                  alt="Abdulrahman Gaoba - Full Stack Software Engineer"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  priority
                />
              </motion.div>

              {/* Achievement Badges */}
              {[
                { icon: "🎓", position: "top-8 -left-8", label: "4.8/5 GPA" },
                { icon: "🚀", position: "top-16 -right-8", label: "Startup Founder" },
                { icon: "💼", position: "bottom-16 -left-12", label: "5+ Years Exp" },
                { icon: "⚡", position: "bottom-8 -right-4", label: "React Expert" },
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  className={`absolute ${badge.position} group cursor-pointer`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 + 1, duration: 0.5 }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-dark-bg-secondary/90 backdrop-blur-sm p-3 rounded-2xl shadow-dev-md border border-dark-border/50 group-hover:shadow-dev-lg transition-all duration-300">
                    <div className="text-2xl">{badge.icon}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="space-y-4">
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-syntax-green/20 to-syntax-blue/20 text-syntax-green rounded-full text-sm font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Full Stack Software Engineer & Startup Founder
              </motion.div>

              <h3 className="text-3xl md:text-4xl font-bold text-dev-text leading-tight">
                Transforming Ideas Into
                <span className="bg-gradient-to-r from-syntax-green to-syntax-blue bg-clip-text text-transparent">
                  {" "}
                  Digital Excellence
                </span>
              </h3>

              <div className="space-y-4 text-lg text-dev-text-muted leading-relaxed">
                <p>
                  My journey began with a passion for creating elegant solutions to complex problems. With a{" "}
                  <span className="font-semibold text-syntax-green">4.8/5 GPA in Software Engineering</span> and
                  experience as a <span className="font-semibold text-syntax-blue">startup founder</span>, I bring both
                  theoretical depth and real-world business insight to every project.
                </p>

                <p>
                  As the founder of <span className="font-semibold text-syntax-purple">Naqla Tech</span>, I scaled a
                  logistics platform to serve 1000+ users and generate $50K+ in revenue. Today, I combine this
                  entrepreneurial experience with technical mastery in React, Next.js, and Tailwind CSS to deliver
                  exceptional web solutions.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/about"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-syntax-blue to-syntax-green text-dark-bg rounded-xl font-semibold text-lg hover:from-syntax-green hover:to-syntax-cyan transition-all duration-300 shadow-glow-primary hover:shadow-glow-secondary"
              >
                Read My Full Story
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
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
              className="text-center bg-dark-bg-secondary/80 backdrop-blur-sm p-6 rounded-2xl shadow-dev-md border border-dark-border/50 hover:shadow-dev-lg transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-syntax-blue to-syntax-green rounded-xl mb-4 text-dark-bg mx-auto">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-syntax-green to-syntax-blue bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="font-semibold text-dev-text mb-1">{stat.label}</div>
              <div className="text-sm text-dev-text-muted">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
