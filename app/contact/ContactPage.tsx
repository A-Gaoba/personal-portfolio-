"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, CheckCircle2, XCircle, Calendar, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Basic validation
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("All fields are required.")
      }
      if (!formData.email.includes("@")) {
        throw new Error("Please enter a valid email address.")
      }

      console.log("Form submitted:", formData)
      setStatus("success")
      setFormData({ name: "", email: "", message: "" }) // Clear form
    } catch (error: any) {
      setStatus("error")
      setErrorMessage(error.message || "Failed to send message. Please try again.")
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "abdulrahmangooba@gmail.com",
      link: "mailto:abdulrahmangooba@gmail.com",
      color: "text-syntax-green",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      color: "text-syntax-blue",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "[Your City, Country]",
      link: "#", // Or a link to a map
      color: "text-syntax-purple",
    },
    {
      icon: Calendar,
      label: "Schedule a Meeting",
      value: "Book on Calendly",
      link: "https://calendly.com/your-link",
      color: "text-syntax-orange",
    },
    {
      icon: MessageCircle,
      label: "Live Chat",
      value: "Start Chat",
      link: "#", // Replace with live chat integration
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
    <section id="contact-page-full" className="py-16 sm:py-20 lg:py-24 bg-dark-bg text-dev-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dev-text">
            Let's Build Something
            <span className="text-gradient-syntax"> Amazing</span>
          </h2>
          <p className="text-xl md:text-2xl text-dev-text-muted max-w-3xl mx-auto">
            Have a project in mind or just want to say hello? Feel free to reach out!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            className="bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border p-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-bold text-dev-text mb-6">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-dev-text-muted font-semibold mb-2 block">
                  Your Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-dark-bg-tertiary border border-dark-border rounded-lg focus:ring-2 focus:ring-syntax-blue focus:border-syntax-blue transition-all duration-200 text-dev-text placeholder-dev-text-subtle"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-dev-text-muted font-semibold mb-2 block">
                  Your Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-dark-bg-tertiary border border-dark-border rounded-lg focus:ring-2 focus:ring-syntax-blue focus:border-syntax-blue transition-all duration-200 text-dev-text placeholder-dev-text-subtle"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-dev-text-muted font-semibold mb-2 block">
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project or inquiry..."
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 bg-dark-bg-tertiary border border-dark-border rounded-lg focus:ring-2 focus:ring-syntax-blue focus:border-syntax-blue transition-all duration-200 text-dev-text placeholder-dev-text-subtle"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-syntax-blue to-syntax-green text-dark-bg rounded-xl font-semibold text-lg hover:from-syntax-green hover:to-syntax-cyan transition-all duration-300 shadow-glow-primary hover:shadow-glow-secondary"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-syntax-green/20 text-syntax-green rounded-lg flex items-center"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-syntax-red/20 text-syntax-red rounded-lg flex items-center"
                >
                  <XCircle className="w-5 h-5 mr-2" />
                  {errorMessage}
                </motion.div>
              )}
            </form>
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
                <motion.div key={index} className="flex items-center space-x-4" variants={itemVariants}>
                  <div className="flex-shrink-0 p-3 bg-dark-bg-tertiary rounded-full">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-dev-text-muted text-sm">{item.label}</p>
                    <a
                      href={item.link}
                      className="text-lg font-semibold text-dev-text hover:text-syntax-green transition-colors duration-200"
                    >
                      {item.value}
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Media Links */}
            <div className="pt-8 border-t border-dark-border">
              <h3 className="text-2xl font-bold text-dev-text mb-6">Connect with Me</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/A-Gaoba"
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
                <a
                  href="https://linkedin.com/in/A_Gaoba"
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
                <a
                  href="https://twitter.com/A_Gaoba"
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
    </section>
  )
}

export default ContactPage
