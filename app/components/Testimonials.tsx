"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Star, Quote, ArrowRight, Award, Users, TrendingUp, Smile } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "CEO, InnovateTech Solutions",
    quote:
      "Abdulrahman transformed our outdated platform into a modern, lightning-fast application. His attention to detail and expertise in Next.js were exceptional. Highly recommend!",
    rating: 5,
    avatar: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "Product Manager, GlobalCorp",
    quote:
      "Working with Abdulrahman was a breeze. He delivered a complex feature set ahead of schedule, with clean code and a user experience that exceeded our expectations.",
    rating: 5,
    avatar: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 3,
    name: "Emily White",
    title: "Founder, CreativeFlow Agency",
    quote:
      "Abdulrahman's frontend skills are unparalleled. He brought our designs to life with pixel-perfect precision and incredible performance. A true professional!",
    rating: 5,
    avatar: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 4,
    name: "David Lee",
    title: "CTO, HealthLink Systems",
    quote:
      "His ability to tackle challenging backend integrations while maintaining a seamless frontend was impressive. Abdulrahman is a full-stack powerhouse.",
    rating: 4,
    avatar: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 5,
    name: "Jessica Brown",
    title: "Marketing Director, E-commerce Brand",
    quote:
      "Our website's conversion rates significantly improved after Abdulrahman optimized its performance. He's a wizard with Core Web Vitals!",
    rating: 5,
    avatar: "/placeholder.svg?height=64&width=64",
  },
]

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

const TestimonialCard = ({ testimonial }: { testimonial: (typeof testimonials)[0] }) => {
  return (
    <motion.div
      className="bg-dark-bg-secondary rounded-2xl p-8 shadow-dev-md border border-dark-border hover:shadow-dev-lg hover:border-syntax-purple transition-all duration-300 h-full flex flex-col"
      variants={itemVariants}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex items-center mb-6">
        <Quote className="w-10 h-10 text-syntax-purple mr-4 flex-shrink-0" />
        <div>
          <div className="flex items-center mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < testimonial.rating ? "text-syntax-orange fill-syntax-orange" : "text-dev-text-subtle"
                  }`}
                fillOpacity={i < testimonial.rating ? 1 : 0.2}
              />
            ))}
          </div>
          <p className="text-dev-text-muted italic leading-relaxed text-lg">"{testimonial.quote}"</p>
        </div>
      </div>
      <div className="mt-auto flex items-center pt-4 border-t border-dark-border-subtle">
        <img
          src={testimonial.avatar || "/placeholder.svg"}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full mr-4 border-2 border-syntax-blue"
        />
        <div>
          <h4 className="font-semibold text-dev-text">{testimonial.name}</h4>
          <p className="text-sm text-dev-text-muted">{testimonial.title}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden text-dev-text">
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
            <Smile className="w-5 h-5 text-syntax-orange mr-2" />
            <span className="text-dev-text font-semibold">Client Testimonials</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold mb-6 text-dev-text"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            What My Clients Say
            <br />
            <span className="text-gradient-syntax">About My Work</span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-dev-text-muted max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Hear directly from businesses and individuals who have experienced the impact of my full-stack development
            and UI/UX expertise.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </motion.div>

        {/* Proven Results Section */}
        <motion.div
          className="bg-gradient-to-r from-syntax-purple/10 via-syntax-orange/10 to-syntax-pink/10 rounded-3xl p-8 md:p-12 shadow-dev-xl border border-dark-border relative overflow-hidden mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-syntax-orange to-syntax-purple"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative z-10 text-center">
            <motion.div
              className="inline-flex items-center px-6 py-3 bg-dark-bg-secondary/80 backdrop-blur-sm border border-dark-border rounded-full mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Award className="w-5 h-5 text-syntax-orange mr-2" />
              <span className="text-dev-text font-semibold">Proven Results & Client Success</span>
            </motion.div>

            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-dev-text mb-6">
              Delivering Tangible Value
              <span className="text-gradient-syntax"> to Every Project</span>
            </h3>

            <p className="text-lg md:text-xl text-dev-text-muted leading-relaxed max-w-4xl mx-auto mb-12">
              My commitment to excellence translates into measurable improvements and successful outcomes for my
              clients.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users className="w-6 h-6" />,
                  number: "95%",
                  label: "Client Satisfaction",
                  description: "Consistently high client ratings",
                },
                {
                  icon: <TrendingUp className="w-6 h-6" />,
                  number: "40%+",
                  label: "Performance Boost",
                  description: "Average speed improvement",
                },
                {
                  icon: <Star className="w-6 h-6" />,
                  number: "50+",
                  label: "Successful Projects",
                  description: "Delivered on time and budget",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-syntax-purple to-syntax-orange rounded-xl text-dark-bg mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-poppins font-bold bg-gradient-to-r from-syntax-orange to-syntax-purple bg-clip-text text-transparent mb-1">
                    {stat.number}
                  </div>
                  <div className="font-semibold text-dev-text mb-1">{stat.label}</div>
                  <div className="text-sm text-dev-text-muted">{stat.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="text-3xl md:text-4xl font-poppins font-bold text-dev-text mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-lg md:text-xl text-dev-text-muted mb-8 max-w-3xl mx-auto">
            Let's discuss how I can help bring your vision to life with modern web technologies and proven development
            practices.
          </p>
          <motion.button
            onClick={() => {
              const contactSection = document.getElementById('contact')
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' })
              } else {
                window.location.href = '/contact'
              }
            }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-syntax-purple to-syntax-orange text-dark-bg rounded-xl font-semibold text-lg hover:from-syntax-orange hover:to-syntax-pink transition-all duration-300 shadow-glow-primary hover:shadow-glow-secondary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
