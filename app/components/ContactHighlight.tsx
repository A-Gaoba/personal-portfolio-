"use client"

import React, { useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Calendar, Mail, MessageCircle, Send, Clock, Users, CheckCircle2, ArrowRight } from "lucide-react"

const ContactHighlight: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Me",
      description: "Get a response within 24 hours",
      action: "abdulrahman@example.com",
      color: "from-syntax-blue to-syntax-cyan",
      link: "mailto:abdulrahman@example.com",
    },
    {
      icon: MessageCircle,
      title: "Quick Chat",
      description: "Schedule a 15-minute consultation",
      action: "Book a Call",
      color: "from-syntax-green to-syntax-cyan",
      link: "https://calendly.com/your-quick-call-link",
    },
    {
      icon: Calendar,
      title: "Project Discussion",
      description: "Detailed project planning session",
      action: "Schedule Meeting",
      color: "from-syntax-purple to-syntax-pink",
      link: "https://calendly.com/your-project-meeting-link",
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

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
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-dark-bg relative overflow-hidden text-dev-text">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-syntax-green/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-syntax-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 bg-dark-bg-secondary/80 backdrop-blur-sm border border-dark-border rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Send className="w-5 h-5 text-syntax-green mr-2" />
            <span className="text-dev-text font-semibold">Let's Work Together</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dev-text"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ready to Start Your
            <br />
            <span className="text-gradient-syntax">Next Project?</span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-dev-text-muted max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Let's discuss how I can help bring your vision to life with modern web technologies.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Methods */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl md:text-3xl font-bold text-dev-text mb-6">Get In Touch</h3>
              <p className="text-lg text-dev-text-muted leading-relaxed mb-8">
                Choose the best way to reach out. I'm always excited to discuss new projects and opportunities.
              </p>
            </motion.div>

            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.link}
                  target={method.link.startsWith("http") ? "_blank" : "_self"}
                  rel={method.link.startsWith("http") ? "noopener noreferrer" : ""}
                  className="bg-dark-bg-secondary/90 backdrop-blur-sm p-6 rounded-2xl shadow-dev-md border border-dark-border hover:shadow-dev-lg hover:border-syntax-blue transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="flex items-center">
                    <div className={`p-4 bg-gradient-to-r ${method.color} rounded-xl text-dark-bg shadow-lg mr-4`}>
                      {React.createElement(method.icon, { className: "w-6 h-6" })}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-dev-text mb-1">{method.title}</h4>
                      <p className="text-dev-text-muted mb-2">{method.description}</p>
                      <div className="text-syntax-green font-semibold">{method.action}</div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Quick Stats */}
            <motion.div className="grid grid-cols-3 gap-4 pt-8" variants={itemVariants}>
              {[
                { icon: <Clock className="w-5 h-5" />, label: "24h Response", value: "Guaranteed" },
                { icon: <Users className="w-5 h-5" />, label: "Happy Clients", value: "50+" },
                { icon: <CheckCircle2 className="w-5 h-5" />, label: "Success Rate", value: "100%" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center bg-gradient-to-r from-syntax-blue/10 to-syntax-green/10 p-4 rounded-xl"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-syntax-blue to-syntax-green rounded-lg text-dark-bg mx-auto mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-lg font-bold text-dev-text">{stat.value}</div>
                  <div className="text-sm text-dev-text-muted">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Contact Form */}
          <motion.div
            className="bg-gradient-to-r from-dark-bg-secondary/90 via-dark-bg-secondary/90 to-dark-bg-secondary/90 rounded-3xl p-8 shadow-dev-xl border border-dark-border"
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3 className="text-2xl font-bold text-dev-text mb-6">Send a Quick Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-dev-text-muted mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-dark-bg-tertiary backdrop-blur-sm border border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-syntax-blue focus:border-transparent transition-all duration-200 text-dev-text placeholder-dev-text-subtle"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-dev-text-muted mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-dark-bg-tertiary backdrop-blur-sm border border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-syntax-blue focus:border-transparent transition-all duration-200 text-dev-text placeholder-dev-text-subtle"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-dev-text-muted mb-2">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-dark-bg-tertiary backdrop-blur-sm border border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-syntax-blue focus:border-transparent transition-all duration-200 resize-none text-dev-text placeholder-dev-text-subtle"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-syntax-blue to-syntax-green text-dark-bg rounded-xl font-semibold text-lg hover:from-syntax-green hover:to-syntax-cyan transition-all duration-300 shadow-glow-primary hover:shadow-glow-secondary"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5 mr-2 inline" />
                Send Message
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-dev-text-muted">
                Or{" "}
                <Link href="/contact" className="text-syntax-green hover:text-syntax-blue font-semibold underline">
                  visit the full contact page
                </Link>{" "}
                for more options
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-syntax-blue to-syntax-green text-dark-bg rounded-xl font-semibold text-lg hover:from-syntax-green hover:to-syntax-cyan transition-all duration-300 shadow-glow-primary hover:shadow-glow-secondary"
            >
              Explore All Contact Options
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactHighlight
