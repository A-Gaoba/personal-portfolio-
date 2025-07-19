"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail, MapPin, Phone } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
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
              <h1 className="text-3xl font-bold text-dev-text">
                Abdulrahman<span className="text-syntax-green">.dev</span>
              </h1>
            </Link>
            <p className="text-dev-text-subtle leading-relaxed">
              Building exceptional web experiences with a focus on performance, scalability, and user satisfaction.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/A-Gaoba"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-dev-text-muted hover:text-dev-text hover:bg-dark-bg-tertiary transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/A_Gaoba"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-dev-text-muted hover:text-syntax-blue hover:bg-dark-bg-tertiary transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com/A_Gaoba"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-dev-text-muted hover:text-syntax-cyan hover:bg-dark-bg-tertiary transition-colors duration-200"
                aria-label="Twitter"
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
                  href="mailto:abdulrahmangooba@gmail.com"
                  className="text-dev-text-muted hover:text-syntax-green transition-colors duration-200"
                >
                  abdulrahmangooba@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-syntax-blue mr-3" />
                <a
                  href="tel:+15551234567"
                  className="text-dev-text-muted hover:text-syntax-blue transition-colors duration-200"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center">
                <MapPin className="w-5 h-5 text-syntax-purple mr-3" />
                <span className="text-dev-text-muted">[Your City, Country]</span>
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
