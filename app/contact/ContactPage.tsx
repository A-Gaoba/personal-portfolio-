"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Calendar, MessageCircle, X } from "lucide-react"
import ContactForm from "@/components/ContactForm"
import { profile } from "@/content/profile"
import CalendlyWidget from "@/app/components/CalendlyWidget"

const ContactPage = () => {
  const [showCalendly, setShowCalendly] = useState(false)

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      link: `mailto:${profile.email}`,
      color: "text-syntax-green",
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile.phone.display,
      link: `tel:${profile.phone.tel}`,
      color: "text-syntax-blue",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Moscow, Russia",
      link: "https://maps.google.com/?q=Moscow,Russia",
      color: "text-syntax-purple",
    },
    {
      icon: Calendar,
      label: "Schedule a Meeting",
      value: "Book on Calendly",
      link: "#",
      color: "text-syntax-orange",
      onClick: () => setShowCalendly(true),
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat on WhatsApp",
      link: profile.phone.whatsapp,
      color: "text-syntax-cyan",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="contact-page-full" className="py-16 sm:py-20 lg:py-24 bg-dark-bg text-dev-text overflow-hidden">
      {/* Phase 0a: overflow-hidden + min-w-0 + break-all stop the horizontal scroll on phones (long email address and
          the cards' slide-in animation made the page 415px wide on a 390px screen). */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Phase 0b: the page's main heading is now its <h1> (same classes). */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dev-text">
            Let's Build Something
            <span className="text-syntax-green"> Amazing</span>
          </h1>
          <p className="text-xl md:text-2xl text-dev-text-muted max-w-3xl mx-auto">
            Have a project in mind or just want to say hello? Feel free to reach out!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start [&>*]:min-w-0">
          {/* Contact Form */}
          <motion.div
            className="bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border p-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-bold text-dev-text mb-6">Send Me a Message</h3>
            <ContactForm source="contact" />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border p-8 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-bold text-dev-text mb-6">My Contact Details</h3>
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {contactInfo.map((item, index) => (
                <motion.div key={index} className="flex items-center space-x-4 min-w-0" variants={itemVariants}>
                  <div className="flex-shrink-0 p-3 bg-dark-bg-tertiary rounded-full">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-dev-text-muted text-sm">{item.label}</p>
                    {item.onClick ? (
                      <button
                        onClick={item.onClick}
                        className="text-lg font-semibold text-dev-text hover:text-syntax-green transition-colors duration-200 cursor-pointer"
                      >
                        {item.value}
                      </button>
                    ) : (
                      <a
                        href={item.link}
                        className="text-lg font-semibold text-dev-text hover:text-syntax-green transition-colors duration-200 break-all"
                      >
                        {item.value}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Media Links */}
            <div className="pt-8 border-t border-dark-border">
              <h3 className="text-2xl font-bold text-dev-text mb-6">Connect with Me</h3>
              <div className="flex space-x-4">
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-dark-bg-tertiary rounded-full text-dev-text-muted hover:bg-dark-bg-secondary hover:text-dev-text transition-colors duration-200"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                  >
                    <title>GitHub</title>
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.08-.73-.083-.714.075-.703 1.02.072 1.55 1.05 1.55 1.05.905 1.547 2.37 1.096 2.94.838.09-.653.355-1.096.645-1.347-2.25-.253-4.62-1.125-4.62-5.03 0-1.11.39-2.02 1.03-2.732-.1-.253-.448-1.29.097-2.695 0 0 .84-.27 2.75 1.05.8-.222 1.65-.333 2.5-.333.85 0 1.7.111 2.5.333 1.91-1.32 2.75-1.05 2.75-1.05.546 1.405.2 2.442.1 2.695.64.712 1.03 1.622 1.03 2.732 0 3.91-2.37 4.775-4.625 5.025.36.31.68.92.68 1.855 0 1.34-.01 2.42-.01 2.75 0 .32.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                {/* Phase 0a: LinkedIn hidden until the right profile URL is confirmed (open question A3). */}
                {profile.links.linkedin && (
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-dark-bg-tertiary rounded-full text-dev-text-muted hover:bg-dark-bg-secondary hover:text-dev-text transition-colors duration-200"
                  >
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="currentColor"
                    >
                      <title>LinkedIn</title>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.044-1.852-3.044-1.853 0-2.136 1.445-2.136 2.939v5.674H9.357V9.295h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.062 2.062 2.062 0 012.063-2.062c1.136 0 2.064.926 2.064 2.062 0 1.136-.928 2.062-2.064 2.062zm1.787 13.019H3.55v-11.63h3.574v11.63zM22.227 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.456c.98 0 1.773-.773 1.773-1.729V1.729C24 .774 23.207 0 22.227 0z" />
                    </svg>
                  </a>
                  )}
                <a
                  href={profile.links.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-dark-bg-tertiary rounded-full text-dev-text-muted hover:bg-dark-bg-secondary hover:text-dev-text transition-colors duration-200"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                  >
                    <title>X</title>
                    <path d="M18.901 1.153h3.68l-8.042 9.167L24 22.846h-7.406l-5.8-6.617-6.104 6.617H.75l8.044-9.167L0 1.154h7.594l5.243 6.932ZM17.291 20.35L1.82 3.647h2.813l13.637 16.704h-2.98Z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Calendly Modal */}
      {showCalendly && (
        <div
          className="fixed inset-0 bg-dark-bg z-50 flex items-center justify-center p-4"
          onClick={() => setShowCalendly(false)}
        >
          <div
            className="bg-dark-bg-secondary rounded-2xl shadow-dev-lg border border-dark-border w-full max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-dark-border bg-dark-bg-tertiary">
              <h3 className="text-2xl font-bold text-dev-text">Schedule a Meeting</h3>
              <button
                onClick={() => setShowCalendly(false)}
                className="p-2 hover:bg-dark-bg-secondary rounded-lg transition-colors duration-200"
                aria-label="Close modal"
                title="Close modal"
              >
                <X className="w-6 h-6 text-dev-text-muted" />
              </button>
            </div>
            <div className="p-6 bg-dark-bg-secondary">
              <CalendlyWidget />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ContactPage