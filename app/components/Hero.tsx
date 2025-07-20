"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Code, Terminal, Github, Linkedin, Mail } from "lucide-react"
import FloatingElements from "./FloatingElements"
import DeveloperBackground from "./DeveloperBackground"

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  const roles = ["Full Stack Developer", "React.js Expert", "Next.js Specialist", "UI/UX Designer", "Problem Solver"]

  useEffect(() => {
    const role = roles[currentRole]
    let currentIndex = 0

    const typeText = () => {
      if (currentIndex < role.length) {
        setDisplayText(role.slice(0, currentIndex + 1))
        currentIndex++
        setTimeout(typeText, 100)
      } else {
        setIsTyping(false)
        setTimeout(() => {
          setIsTyping(true)
          setDisplayText("")
          setCurrentRole((prev) => (prev + 1) % roles.length)
        }, 2000)
      }
    }

    if (isTyping) {
      typeText()
    }
  }, [currentRole, isTyping])

  const socialLinks = [
    { icon: Github, href: "https://github.com/A-Gaoba", label: "GitHub", color: "hover:text-dev-text" },
    { icon: Linkedin, href: "https://www.linkedin.com/a-gaoba", label: "LinkedIn", color: "hover:text-syntax-blue" },
    { icon: Mail, href: "mailto:abdulrahmangooba@gmail.com", label: "Email", color: "hover:text-syntax-green" },
    { icon: Terminal, href: "https://twitter.com/A_Gaoba", label: "Twitter", color: "hover:text-syntax-cyan" },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark-bg text-dev-text pt-16">
      <DeveloperBackground /> {/* Animated background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center w-full">
          {/* Content */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Terminal-style greeting */}
            <motion.div
              className="font-mono text-xs sm:text-sm text-dev-text-muted bg-dark-bg-secondary/80 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-dark-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-syntax-red rounded-full"></div>
                  <div className="w-3 h-3 bg-syntax-orange rounded-full"></div>
                  <div className="w-3 h-3 bg-syntax-green rounded-full"></div>
                </div>
                <span className="text-dev-text-subtle">terminal</span>
              </div>
              <div className="space-y-1">
                <div>
                  <span className="text-syntax-green">$</span> <span className="text-syntax-blue">whoami</span>
                </div>
                <div className="text-dev-text">Abdulrahman Gaoba</div>
                <div>
                  <span className="text-syntax-green">$</span> <span className="text-syntax-blue">cat</span>{" "}
                  <span className="text-syntax-orange">skills.json</span>
                </div>
              </div>
            </motion.div>

            {/* Main heading */}
            <div className="space-y-2 sm:space-y-4">
              <motion.h1
                className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="text-dev-text">Hi, I'm </span>
                <span className="text-syntax-green">Abdulrahman</span>
              </motion.h1>

              <motion.div
                className="text-lg xs:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-dev-text-muted"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <span className="font-mono text-syntax-blue">const</span> <span className="text-dev-text">role</span>{" "}
                <span className="text-syntax-orange">=</span> <span className="text-syntax-green">"{displayText}"</span>
                <motion.span
                  className="text-syntax-blue ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  |
                </motion.span>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg md:text-xl text-dev-text-muted leading-relaxed max-w-full sm:max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Passionate about creating exceptional web experiences with{" "}
              <span className="text-syntax-blue font-semibold">React</span>,{" "}
              <span className="text-syntax-green font-semibold">Next.js</span>, and modern technologies. Turning complex
              problems into elegant solutions.
            </motion.p>

            {/* Tech stack pills */}
            <motion.div
              className="flex flex-wrap gap-2 sm:gap-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {["React", "Next.js", "TypeScript", "Node.js", "Tailwind"].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-4 py-2 bg-dark-bg-secondary/70 backdrop-blur-sm text-dev-text-muted border border-dark-border rounded-full text-sm font-mono hover:border-syntax-blue hover:text-syntax-blue transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <motion.a
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-syntax-blue to-syntax-green text-dark-bg rounded-xl font-bold text-lg hover:from-syntax-green hover:to-syntax-cyan transition-all duration-300 shadow-glow-primary hover:shadow-glow-secondary transform hover:scale-105"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Code className="w-5 h-5 mr-2" />
                View My Work
              </motion.a>

              <motion.a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-dark-bg-secondary/70 backdrop-blur-sm text-dev-text-muted border-2 border-dark-border rounded-xl font-bold text-lg hover:border-syntax-blue hover:text-syntax-blue hover:bg-dark-bg-tertiary transition-all duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Terminal className="w-5 h-5 mr-2" />
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex flex-col xs:flex-row items-start xs:items-center space-y-2 xs:space-y-0 xs:space-x-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <span className="text-dev-text-subtle font-mono text-sm">// Connect with me</span>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-dark-bg-secondary/70 backdrop-blur-sm rounded-lg border border-dark-border text-dev-text-muted ${social.color} transition-all duration-300 hover:border-current`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Code Editor Mockup */}
          <motion.div
            className="relative mt-8 lg:mt-0 w-full max-w-md sm:max-w-lg mx-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-dark-bg-secondary/90 backdrop-blur-xl rounded-2xl border border-dark-border shadow-dev-lg overflow-hidden">
              {/* Editor Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-dark-bg-tertiary/50 border-b border-dark-border">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-syntax-red rounded-full"></div>
                    <div className="w-3 h-3 bg-syntax-orange rounded-full"></div>
                    <div className="w-3 h-3 bg-syntax-green rounded-full"></div>
                  </div>
                  <span className="text-dev-text-subtle text-sm font-mono">portfolio.tsx</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Code className="w-4 h-4 text-dev-text-subtle" />
                  <span className="text-dev-text-subtle text-xs">TypeScript React</span>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-6 font-mono text-sm space-y-2">
                <div className="text-dev-text-muted">
                  <span className="text-syntax-purple">import</span> <span className="text-syntax-blue">React</span>{" "}
                  <span className="text-syntax-purple">from</span> <span className="text-syntax-green">'react'</span>
                </div>
                <div className="text-dev-text-muted">
                  <span className="text-syntax-purple">import</span>{" "}
                  <span className="text-syntax-blue">{"type NextPage"}</span>{" "}
                  <span className="text-syntax-purple">from</span> <span className="text-syntax-green">'next'</span>
                </div>
                <div className="h-4"></div>
                <div className="text-dev-text-muted">
                  <span className="text-syntax-blue">const</span> <span className="text-syntax-orange">Portfolio</span>
                  <span className="text-syntax-blue">:</span> <span className="text-syntax-cyan">NextPage</span>{" "}
                  <span className="text-syntax-blue">{"="}</span>{" "}
                  <span className="text-syntax-orange">{"() => {"}</span>
                </div>
                <div className="text-dev-text-muted ml-4">
                  <span className="text-syntax-purple">return</span> <span className="text-syntax-orange">{"("}</span>
                </div>
                <div className="text-dev-text-muted ml-8">
                  <span className="text-syntax-red">{"<"}</span>
                  <span className="text-syntax-blue">div</span> <span className="text-syntax-orange">className</span>
                  <span className="text-syntax-blue">{"="}</span>
                  <span className="text-syntax-green">"amazing-portfolio"</span>
                  <span className="text-syntax-red">{">"}</span>
                </div>
                <div className="text-dev-text-muted ml-12">
                  <span className="text-syntax-red">{"<"}</span>
                  <span className="text-syntax-blue">h1</span>
                  <span className="text-syntax-red">{">"}</span>
                  <span className="text-dev-text">Building the future</span>
                  <span className="text-syntax-red">{"<"}</span>
                  <span className="text-syntax-blue">/h1</span>
                  <span className="text-syntax-red">{">"}</span>
                </div>
                <div className="text-dev-text-muted ml-8">
                  <span className="text-syntax-red">{"<"}</span>
                  <span className="text-syntax-blue">/div</span>
                  <span className="text-syntax-red">{">"}</span>
                </div>
                <div className="text-dev-text-muted ml-4">
                  <span className="text-syntax-orange">{")"}</span>
                </div>
                <div className="text-dev-text-muted">
                  <span className="text-syntax-orange">{"}"}</span>
                </div>
                <div className="h-4"></div>
                <div className="text-dev-text-muted">
                  <span className="text-syntax-purple">export</span> <span className="text-syntax-purple">default</span>{" "}
                  <span className="text-syntax-orange">Portfolio</span>
                </div>
              </div>
            </div>
            <FloatingElements /> {/* Floating elements */}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          onClick={() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <motion.div
            className="flex flex-col items-center space-y-2 text-dev-text"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <span className="text-sm font-mono">scroll down</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
