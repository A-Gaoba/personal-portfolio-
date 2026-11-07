"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail, MapPin, Phone, MessageCircle } from "lucide-react"
import { profile } from "@/content/profile"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <motion.footer
      className="bg-dark-bg-secondary text-dev-text-muted py-12 sm:py-16 lg:py-20 border-t border-dark-border"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={footerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand Info */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <Link href="/" className="flex-shrink-0">
              {/* Phase 0b: logo was an <h1>; now a span (same look). */}
              <span className="block text-3xl font-bold text-dev-text">
                Abdulrahman<span className="text-syntax-green">.dev</span>
              </span>
            </Link>
            <p className="text-dev-text-subtle leading-relaxed">
              Building exceptional web experiences with a focus on performance, scalability, and user satisfaction.
            </p>
            <div className="flex space-x-4">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-dev-text-muted hover:text-dev-text hover:bg-dark-bg-tertiary transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              {/* Phase 0a: LinkedIn hidden until the right profile URL is confirmed (open question A3). */}
              {profile.links.linkedin && (
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-dev-text-muted hover:text-syntax-blue hover:bg-dark-bg-tertiary transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                )}
              <a
                href={profile.links.x}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-dev-text-muted hover:text-syntax-cyan hover:bg-dark-bg-tertiary transition-colors duration-200"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-xl font-semibold text-dev-text mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-dev-text-muted hover:text-syntax-green transition-colors duration-200"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-dev-text-muted hover:text-syntax-green transition-colors duration-200"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/skills"
                  className="text-dev-text-muted hover:text-syntax-green transition-colors duration-200"
                >
                  Skills & Certifications
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-dev-text-muted hover:text-syntax-green transition-colors duration-200"
                >
                  Services
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-xl font-semibold text-dev-text mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-syntax-green mr-3" />
                <a
                  href={`mailto:${profile.email}`}
                  className="text-dev-text-muted hover:text-syntax-green transition-colors duration-200"
                >
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-syntax-blue mr-3" />
                <a
                  href={`tel:${profile.phone.tel}`}
                  className="text-dev-text-muted hover:text-syntax-blue transition-colors duration-200"
                >
                  {profile.phone.display}
                </a>
              </li>
              <li className="flex items-center">
                <MapPin className="w-5 h-5 text-syntax-purple mr-3" />
                <a
                  href="https://maps.google.com/?q=Moscow,Russia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dev-text-muted hover:text-syntax-purple transition-colors duration-200"
                >
                  Moscow, Russia
                </a>
              </li>
              <li className="flex items-center">
                <MessageCircle className="w-5 h-5 text-syntax-cyan mr-3" />
                <a
                  href={profile.phone.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dev-text-muted hover:text-syntax-cyan transition-colors duration-200"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="border-t border-dark-border mt-12 pt-8 text-center text-dev-text-subtle text-sm"
          variants={itemVariants}
        >
          &copy; {currentYear} Abdulrahman Gaoba. All rights reserved.
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer
