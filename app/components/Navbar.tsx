"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Code, Info, FolderGit2, Lightbulb, Rocket, Users, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation" // Add this import

const navLinks = [
  { name: "Home", href: "/", icon: Code },
  { name: "About", href: "/about", icon: Info },
  { name: "Projects", href: "/projects", icon: FolderGit2 },
  { name: "Skills", href: "/skills", icon: Lightbulb },
  { name: "Services", href: "/services", icon: Rocket },
  { name: "Testimonials", href: "/testimonials", icon: Users },
  { name: "Contact", href: "/contact", icon: Mail },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname() // Get current path

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const menuVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-dark-bg-secondary/80 backdrop-blur-xl shadow-lg border-b border-dark-border" : "bg-transparent"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-dev-text">
              Abdulrahman<span className="text-syntax-green">.dev</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`
      ${pathname === link.href ? "text-syntax-blue font-semibold" : "text-dev-text-muted"}
      hover:text-syntax-green px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
    `}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <Button
              onClick={toggleMenu}
              variant="ghost"
              className="inline-flex items-center justify-center p-2 rounded-md text-dev-text-muted hover:text-syntax-green hover:bg-dark-bg-tertiary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-syntax-blue bg-transparent"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-dark-bg-secondary/90 backdrop-blur-xl border-b border-dark-border"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={itemVariants}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`
        ${pathname === link.href ? "text-syntax-blue font-semibold bg-dark-bg-tertiary" : "text-dev-text-muted"}
        hover:text-syntax-green hover:bg-dark-bg-tertiary block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center
      `}
                  >
                    <link.icon className="w-5 h-5 mr-3" />
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
