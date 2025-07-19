"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Quote, Star } from 'lucide-react'
import Image from "next/image"

const testimonialsData = [
  {
    id: 1,
    name: "Jane Doe",
    title: "CEO, Tech Solutions Inc.",
    quote:
      "Abdulrahman delivered an outstanding web application that exceeded our expectations. His attention to detail and problem-solving skills are exceptional. Highly recommended!",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    id: 2,
    name: "John Smith",
    title: "Founder, Innovate Startups",
    quote:
      "Working with Abdulrahman was a game-changer for our startup. He transformed our vision into a robust and user-friendly platform. A true professional.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    id: 3,
    name: "Sarah Chen",
    title: "Product Manager, Global Corp",
    quote:
      "His expertise in React and Next.js is unparalleled. Abdulrahman consistently delivered high-quality code and was a pleasure to collaborate with.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4,
  },
  {
    id: 4,
    name: "Michael Brown",
    title: "CTO, Data Insights Ltd.",
    quote:
      "Abdulrahman's ability to tackle complex technical challenges and deliver elegant solutions is truly impressive. He's a valuable asset to any project.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
]

export default function TestimonialsSlider() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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
    <section
      id="testimonials"
      className="py-16 sm:py-20 lg:py-24 bg-dark-bg relative overflow-hidden text-dev-text"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-syntax-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-syntax-orange/10 rounded-full blur-3xl" />
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
            <Quote className="w-5 h-5 text-syntax-purple mr-2" />
            <span className="text-dev-text font-semibold">Client Testimonials</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dev-text"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            What My Clients
            <br />
            <span className="bg-gradient-to-r from-syntax-purple via-syntax-orange to-syntax-pink bg-clip-text text-transparent">
              Are Saying
            </span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-dev-text-muted max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Hear directly from those I've worked with and the impact I've made.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-dark-bg-secondary/90 backdrop-blur-sm rounded-2xl shadow-dev-md border border-dark-border p-8 hover:shadow-dev-lg hover:border-syntax-purple transition-all duration-300 flex flex-col"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Quote className="w-10 h-10 text-syntax-blue mb-4" />
              <p className="text-dev-text-muted text-lg leading-relaxed flex-grow mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center mt-auto">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border-2 border-syntax-green mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold text-dev-text">{testimonial.name}</h3>
                  <p className="text-dev-text-subtle text-sm">{testimonial.title}</p>
                  <div className="flex items-center mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating ? "text-syntax-orange" : "text-dev-text-subtle"
                        } fill-current`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
