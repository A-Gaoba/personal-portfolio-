"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Code, Palette, Zap, Smartphone, ArrowRight, Target, CheckCircle2 } from 'lucide-react'
import { SHOW_UNVERIFIED_CLAIMS } from "@/lib/site"
import { useI18n } from "@/components/i18n/I18nProvider"

export default function ServicesHighlight() {
  const { t, href } = useI18n()
  const s = t.home.services
  // Texts come from the dictionary (same order); icons and the hidden prices stay here.
  const meta = [
    { icon: <Code className="w-8 h-8" />, pricing: "Starting from $5,000" },
    { icon: <Palette className="w-8 h-8" />, pricing: "Starting from $3,000" },
    { icon: <Zap className="w-8 h-8" />, pricing: "Starting from $2,500" },
    { icon: <Smartphone className="w-8 h-8" />, pricing: "Starting from $4,000" },
  ]
  const services = s.items.map((item, i) => ({ ...item, ...meta[i] }))

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
      id="services"
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
              className="bg-dark-bg-secondary/90 rounded-card shadow-dev-md border border-dark-border overflow-hidden hover:shadow-dev-lg hover:border-syntax-blue transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Service Header */}
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className={`p-4 bg-inverse rounded-xl text-on-inverse me-4`}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-dev-text">{service.title}</h3>
                    {/* Phase 0a: prices hidden until GAOBA confirms them (open question D2). */}
                    {SHOW_UNVERIFIED_CLAIMS && (
                      <div
                        className={`text-lg font-bold text-brand-text`}
                      >
                        {service.pricing}
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-dev-text-muted leading-relaxed mb-6">{service.description}</p>

                {/* Features */}
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-brand-text me-3 flex-shrink-0" />
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
          className="text-center ink-band rounded-card p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-dev-text mb-4">{s.ctaTitle}</h3>
          <p className="text-lg md:text-xl text-dev-text-muted mb-8 max-w-3xl mx-auto">
            {s.ctaText}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ y: -2 }} >
              <Link
                href={href("/services")}
                className="btn btn-brand"
              >
                {s.ctaPrimary}
                <ArrowRight className="w-5 h-5 rtl:-scale-x-100" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} >
              <Link
                href="#contact"
                className="btn btn-line"
              >
                {s.ctaSecondary}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
