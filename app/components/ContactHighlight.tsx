"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Mail, Send, ArrowRight } from "lucide-react"
import ContactForm from "@/components/ContactForm"
import { profile } from "@/content/profile"
import { useI18n } from "@/components/i18n/I18nProvider"

const ContactHighlight: React.FC = () => {
  const { t, href } = useI18n()
  const s = t.home.contact
  // Phase 0a (2026-11-07): the cards pointed to abdulrahman@example.com and two placeholder Calendly links
  // (calendly.com/your-…-link). Now: the site's real email and the Calendly event the contact page already used
  // (https://calendly.com/abdalrahmangooba25/30min, checked: 200). The "response within 24 hours" promise was
  // removed (unverified).
  const contactMethods = [
    {
      icon: Mail,
      title: s.emailTitle,
      description: s.emailText,
      action: profile.email,
      ltr: true,
      color: "from-syntax-blue to-syntax-cyan",
      link: `mailto:${profile.email}`,
    },
    {
      icon: Calendar,
      title: s.callTitle,
      description: s.callText,
      action: s.callAction,
      ltr: false,
      color: "from-syntax-green to-syntax-cyan",
      link: profile.links.calendly,
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
    hidden: { opacity: 0, transform: "translateY(30px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-dark-bg relative overflow-hidden text-dev-text">
      {/* Background Elements */}
      <div className="absolute inset-0">
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, transform: "translateY(30px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="kicker mb-5">{s.kicker}</p>

          <motion.h2
            className="title mb-6"
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {s.title}
            <br />
            <span className="mark">{s.titleMark}</span>
          </motion.h2>

          <motion.p
            className="lede mx-auto max-w-2xl"
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {s.lede}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Methods */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl md:text-3xl font-bold text-dev-text mb-6">{s.methodsTitle}</h3>
              <p className="text-lg text-dev-text-muted leading-relaxed mb-8">
                {s.methodsText}
              </p>
            </motion.div>

            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.link}
                  target={method.link.startsWith("http") ? "_blank" : "_self"}
                  rel={method.link.startsWith("http") ? "noopener noreferrer" : ""}
                  className="card-paper block p-5 transition-[box-shadow,border-color] duration-300 hover:border-fg/25 hover:shadow-lift sm:p-6"
                  variants={itemVariants}
                  whileHover={{ transform: "translateY(-4px)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="flex items-center">
                    <div className={`p-4 bg-inverse rounded-xl text-on-inverse me-4`}>
                      {React.createElement(method.icon, { className: "w-6 h-6" })}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-dev-text mb-1">{method.title}</h4>
                      <p className="text-dev-text-muted mb-2">{method.description}</p>
                      <div className="text-brand-text font-semibold" dir={method.ltr ? "ltr" : undefined}>{method.action}</div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Phase 0a: "24h Response Guaranteed", "50+ Happy Clients" and "100% Success Rate" removed (no source). */}
          </motion.div>

          {/* Quick Contact Form */}
          <motion.div
            className="card-paper p-6 sm:p-8"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-2xl font-bold text-dev-text mb-6">{s.formTitle}</h3>

            {/* Phase 0a: this form only called console.log(), so messages were lost. It now sends through the same
                Formspree endpoint as the contact page. */}
            <ContactForm source="home" messageLabel={s.formMessageLabel} messagePlaceholder={s.formMessagePlaceholder} rows={4} />

            <div className="mt-6 text-center">
              <p className="text-sm text-dev-text-muted">
                {s.formFootBefore}{" "}
                <Link prefetch={false} href={href("/contact")} className="text-brand-text hover:text-brand-text font-semibold underline">
                  {s.formFootLink}
                </Link>{" "}
                {s.formFootAfter}
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, transform: "translateY(30px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div whileHover={{ transform: "translateY(-2px)" }} >
            <Link prefetch={false}
              href={href("/contact")}
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

export default ContactHighlight
