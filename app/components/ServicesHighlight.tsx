"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Code, Palette, Zap, Smartphone, ArrowRight, Target, CheckCircle2 } from 'lucide-react'

export default function ServicesHighlight() {
  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Custom Web Applications",
      description: "Full-stack solutions with React, Next.js, and modern technologies tailored to your business needs.",
      features: ["React & Next.js Development", "Database Integration", "API Development", "Performance Optimization"],
      color: "from-syntax-blue to-syntax-cyan",
      pricing: "Starting from $5,000",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Frontend Architecture",
      description: "Transform designs into pixel-perfect, interactive interfaces with optimal performance standards.",
      features: ["Responsive Design", "Component Libraries", "Design Systems", "Accessibility Compliance"],
      color: "from-syntax-purple to-syntax-pink",
      pricing: "Starting from $3,000",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance Optimization",
      description:
        "Enhance your application's speed, SEO, and user experience through advanced optimization techniques.",
      features: ["Core Web Vitals", "Bundle Optimization", "SEO Enhancement", "Performance Monitoring"],
      color: "from-syntax-green to-syntax-cyan",
      pricing: "Starting from $2,500",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Progressive Web Apps",
      description: "Create app-like experiences on the web with offline functionality and native device features.",
      features: ["Offline Functionality", "Push Notifications", "App Store Deployment", "Native Features"],
      color: "from-syntax-orange to-syntax-red",
      pricing: "Starting from $4,000",
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
      id="services"
      className="py-16 sm:py-20 lg:py-24 bg-dark-bg relative overflow-hidden text-dev-text"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-syntax-green/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-syntax-blue/10 rounded-full blur-3xl" />
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
            <Target className="w-5 h-5 text-syntax-green mr-2" />
            <span className="text-dev-text font-semibold">Services & Solutions</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dev-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Comprehensive Web Development
            <br />
            <span className="bg-gradient-to-r from-syntax-green via-syntax-blue to-syntax-purple bg-clip-text text-transparent">
              Services & Solutions
            </span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-dev-text-muted max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Professional web development services to bring your ideas to life with modern technologies and proven
            results.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-dark-bg-secondary/90 backdrop-blur-sm rounded-2xl shadow-dev-md border border-dark-border overflow-hidden hover:shadow-dev-lg hover:border-syntax-blue transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Service Header */}
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className={`p-4 bg-gradient-to-r ${service.color} rounded-xl text-dark-bg shadow-lg mr-4`}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-dev-text">{service.title}</h3>
                    <div
                      className={`text-lg font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}
                    >
                      {service.pricing}
                    </div>
                  </div>
                </div>

                <p className="text-dev-text-muted leading-relaxed mb-6">{service.description}</p>

                {/* Features */}
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-syntax-green mr-3 flex-shrink-0" />
                      <span className="text-dev-text-muted">{feature}</span>
                    </div>
                  ))}
                </div>
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
          <h3 className="text-3xl md:text-4xl font-bold text-dev-text mb-4">Ready to Start Your Project?</h3>
          <p className="text-lg md:text-xl text-dev-text-muted mb-8 max-w-3xl mx-auto">
            Let's discuss how I can help bring your vision to life with modern web technologies and proven development
            practices.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/services"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-syntax-blue to-syntax-green text-dark-bg rounded-xl font-semibold text-lg hover:from-syntax-green hover:to-syntax-cyan transition-all duration-300 shadow-glow-primary hover:shadow-glow-secondary"
              >
                Explore All Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#contact"
                className="inline-flex items-center px-8 py-4 bg-dark-bg-secondary border-2 border-dark-border text-dev-text rounded-xl hover:border-syntax-blue hover:text-syntax-blue hover:bg-dark-bg-tertiary transition-all duration-300 font-semibold text-lg shadow-dev-md hover:shadow-dev-lg"
              >
                Get Free Consultation
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
