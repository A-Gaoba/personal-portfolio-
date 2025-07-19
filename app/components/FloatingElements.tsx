"use client"

import { motion } from "framer-motion"

export default function FloatingElements() {
  return (
    <>
      {/* Floating elements */}
      <motion.div
        className="absolute -top-4 -right-4 w-8 h-8 bg-syntax-green rounded-full opacity-60"
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-4 -left-4 w-6 h-6 bg-syntax-blue rounded-full opacity-60"
        animate={{
          y: [0, 10, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </>
  )
}
