"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Calendar, MessageCircle } from 'lucide-react'

export default function Contact() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Me",
      description: "Get a response within 24 hours",
      action: "abdulrahmangooba@gmail.com",
      link: "mailto:abdulrahmangooba@gmail.com",
      color: "text-syntax-green",
    },
    {
      icon: Phone,
      title: "Call Me",
      description: "Available for quick discussions",
      action: "+7 (917) 482-84-74",
      link: "tel:+79174828474",
      color: "text-syntax-blue",
    },
    {
      icon: MapPin,
      title: "Location",
      description: "Based in Moscow, Russia",
      action: "Moscow, Russia",
      link: "https://goo.gl/maps/2Qw6Qw6Qw6Qw6Qw6A", // Example map link, replace if needed
      color: "text-syntax-purple",
    },
    {
      icon: Calendar,
      title: "Schedule a Meeting",
      description: "Book a dedicated slot for project discussions",
      action: "Book on Calendly",
      link: "https://calendly.com/your-link", // Replace with your Calendly link
      color: "text-syntax-orange",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with me directly (if available)",
      action: "Start Chat",
      link: "#", // Replace with live chat integration
      color: "text-syntax-cyan",
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
    <section id="contact-page" className="py-16 sm:py-20 lg:py-24 bg-dark-bg text-dev-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dev-text">
            Get In <span className="text-gradient-syntax">Touch</span>
          </h2>
          <p className="text-xl md:text-2xl text-dev-text-muted max-w-3xl mx-auto leading-relaxed">
            Let's connect and discuss your next big idea or project.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {contactMethods.map((method, index) => (
            <motion.a
              key={index}
              href={method.link}
              target={method.link.startsWith("http") ? "_blank" : "_self"}
              rel={method.link.startsWith("http") ? "noopener noreferrer" : ""}
              className="bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border p-6 text-center hover:shadow-dev-lg hover:border-syntax-blue transition-all duration-300 flex flex-col items-center"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-dark-bg-tertiary rounded-full mx-auto mb-6">
                <method.icon className={`w-8 h-8 ${method.color}`} />
              </div>
              <h3 className="text-xl font-bold text-dev-text mb-2">{method.title}</h3>
              <p className="text-dev-text-muted text-sm mb-3 flex-grow">{method.description}</p>
              <span className="text-syntax-green font-semibold text-lg">{method.action}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border p-8 md:p-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h3 className="text-3xl font-bold text-dev-text text-center mb-8">Send a Message</h3>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-dev-text-muted mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 bg-dark-bg-tertiary border border-dark-border rounded-lg text-dev-text placeholder-dev-text-subtle focus:outline-none focus:ring-2 focus:ring-syntax-blue focus:border-transparent transition-all duration-200"
                placeholder="John Doe"
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
                className="w-full px-4 py-3 bg-dark-bg-tertiary border border-dark-border rounded-lg text-dev-text placeholder-dev-text-subtle focus:outline-none focus:ring-2 focus:ring-syntax-blue focus:border-transparent transition-all duration-200"
                placeholder="john.doe@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-dev-text-muted mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-3 bg-dark-bg-tertiary border border-dark-border rounded-lg text-dev-text placeholder-dev-text-subtle focus:outline-none focus:ring-2 focus:ring-syntax-blue focus:border-transparent transition-all duration-200 resize-y"
                placeholder="Tell me about your project or inquiry..."
                required
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-syntax-blue to-syntax-green text-dark-bg rounded-xl font-bold text-lg hover:from-syntax-green hover:to-syntax-cyan transition-all duration-300 shadow-glow-primary hover:shadow-glow-secondary"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
