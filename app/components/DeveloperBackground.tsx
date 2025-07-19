"use client"

import { useEffect } from "react"

import { useState } from "react"
import { motion } from "framer-motion"

const codeSnippets = [
  "const developer = 'Abdulrahman';",
  "function buildAmazingApps() {",
  "return 'React + Next.js';",
  "} // End function",
  "npm install success",
  "git commit -m 'feat: new feature'",
  "console.log('Hello World!');",
  "const skills = ['React', 'Node.js'];",
  "export default Portfolio;",
  "// TODO: Build something amazing",
  "import { useState } from 'react';",
  "const isAwesome = true;",
]

interface FloatingCode {
  id: number
  text: string
  x: number
  y: number
  speed: number
  opacity: number
}

interface Line {
  id: number
  delay: number
  duration: number
  left: string
  top: string
  size: number
}

export default function DeveloperBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [floatingCode, setFloatingCode] = useState<FloatingCode[]>([])
  const lines = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 5,
    left: Math.random() * 100 + "vw",
    top: Math.random() * 100 + "vh",
    size: Math.random() * 2 + 1,
  }))

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const generateFloatingCode = () => {
      const newCode: FloatingCode[] = []
      for (let i = 0; i < 15; i++) {
        newCode.push({
          id: i,
          text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          speed: 0.2 + Math.random() * 0.3,
          opacity: 0.1 + Math.random() * 0.2,
        })
      }
      setFloatingCode(newCode)
    }

    generateFloatingCode()

    const interval = setInterval(() => {
      setFloatingCode((prev) =>
        prev.map((code) => ({
          ...code,
          y: code.y > 100 ? -10 : code.y + code.speed,
        })),
      )
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM0U0NDUxIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] bg-repeat opacity-5" />

      {/* Floating code lines */}
      {lines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute bg-gradient-to-r from-syntax-blue to-syntax-green rounded-full opacity-10"
          style={{
            left: line.left,
            top: line.top,
            width: `${line.size}px`,
            height: `${line.size}px`,
          }}
          animate={{
            y: [0, 50, 0],
            x: [0, 20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: line.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: line.delay,
          }}
        />
      ))}

      {/* Radial gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-syntax-blue rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-syntax-green rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow delay-1000" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, var(--syntax-blue) 0%, transparent 70%)",
          left: mousePosition.x * 0.02,
          top: mousePosition.y * 0.02,
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute w-80 h-80 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, var(--syntax-green) 0%, transparent 70%)",
          right: 0,
          bottom: 0,
          left: mousePosition.x * -0.01,
          top: mousePosition.y * -0.01,
        }}
        animate={{
          x: [0, -150, 0],
          y: [0, 150, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, var(--syntax-purple) 0%, transparent 70%)",
          top: "20%",
          right: "20%",
          left: mousePosition.x * 0.015,
          top: mousePosition.y * 0.015,
        }}
        animate={{
          x: [0, 80, 0],
          y: [0, -80, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Floating code snippets */}
      {floatingCode.map((code) => (
        <motion.div
          key={code.id}
          className="absolute font-mono text-xs text-dev-text-muted opacity-10 select-none"
          style={{
            left: `${code.x}%`,
            top: `${code.y}%`,
            opacity: code.opacity,
            transform: `translateX(-50%)`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        >
          {code.text}
        </motion.div>
      ))}

      {/* Matrix-style digital rain effect */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-syntax-green to-transparent"
            style={{
              left: `${i * 5}%`,
              height: "100vh",
            }}
            animate={{
              y: ["-100vh", "100vh"],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  )
}
