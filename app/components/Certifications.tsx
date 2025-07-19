"use client"
import Image from "next/image"
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import {
  Award,
  Brain,
  BarChart3,
  Code2,
  Database,
  Shield,
  Zap,
  Calendar,
  ExternalLink,
  CheckCircle2,
  TrendingUp,
  BookOpen,
  Star,
  Globe,
  GraduationCap,
} from "lucide-react"

const certificationsData = [
  {
    name: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    date: "January 2023",
    description: "Validated proficiency in developing, deploying, and debugging cloud-based applications using AWS.",
    icon: "/icons/aws.svg",
  },
  {
    name: "Professional Scrum Developer I",
    issuer: "Scrum.org",
    date: "August 2022",
    description: "Demonstrated understanding of how to apply Scrum in software development.",
    icon: "/icons/scrum.svg",
  },
  {
    name: "Google Project Management Certificate",
    issuer: "Google",
    date: "May 2022",
    description: "Acquired foundational knowledge in project management methodologies and tools.",
    icon: "/icons/google.svg",
  },
  {
    name: "React - The Complete Guide",
    issuer: "Udemy (Maximilian Schwarzmüller)",
    date: "March 2021",
    description: "Comprehensive training in React.js, Redux, and React Router.",
    icon: "/icons/react.svg",
  },
  {
    name: "Node.js, Express, MongoDB & More",
    issuer: "Udemy (Jonas Schmedtmann)",
    date: "November 2021",
    description: "Mastered backend development with Node.js, Express, and MongoDB.",
    icon: "/icons/nodejs.svg",
  },
]

const certifications = [
  {
    id: 1,
    title: "Introduction to Artificial Intelligence",
    institution: "Ufa State Aviation Technical University",
    year: "2024",
    category: "AI & Machine Learning",
    icon: <Brain className="w-8 h-8" />,
    color: "from-syntax-purple to-syntax-pink",
    bgColor: "from-dark-bg-tertiary to-dark-bg-secondary",
    description:
      "Comprehensive foundation in AI concepts, machine learning algorithms, and neural networks. Covers practical applications in modern software development and intelligent system design.",
    skills: ["Machine Learning", "Neural Networks", "AI Algorithms", "Data Processing"],
    relevance:
      "Enables integration of intelligent features into web applications, from recommendation systems to automated data analysis and user behavior prediction.",
    credentialId: "AI-2024-001",
    verificationUrl: "#",
    duration: "120 hours",
    grade: "Excellent",
    featured: true,
  },
  {
    id: 2,
    title: "Advanced Data Analytics",
    institution: "Ufa State Aviation Technical University",
    year: "2024",
    category: "Data Science",
    icon: <BarChart3 className="w-8 h-8" />,
    color: "from-syntax-green to-syntax-cyan",
    bgColor: "from-dark-bg-tertiary to-dark-bg-secondary",
    description:
      "Advanced techniques in data analysis, statistical modeling, and business intelligence. Focus on extracting actionable insights from complex datasets.",
    skills: ["Statistical Analysis", "Data Visualization", "Business Intelligence", "Predictive Modeling"],
    relevance:
      "Empowers data-driven decision making in application development, user analytics, performance optimization, and business intelligence dashboards.",
    credentialId: "DA-2024-002",
    verificationUrl: "#",
    duration: "100 hours",
    grade: "Excellent",
    featured: true,
  },
  {
    id: 3,
    title: "Modern JavaScript & ES6+",
    institution: "Advanced Web Development Institute",
    year: "2023",
    category: "Programming",
    icon: <Code2 className="w-8 h-8" />,
    color: "from-syntax-orange to-syntax-red",
    bgColor: "from-dark-bg-tertiary to-dark-bg-secondary",
    description:
      "Deep dive into modern JavaScript features, asynchronous programming, and advanced ES6+ concepts for building robust web applications.",
    skills: ["ES6+ Features", "Async Programming", "Module Systems", "Performance Optimization"],
    relevance:
      "Essential for building modern React applications with clean, efficient code and leveraging the latest JavaScript capabilities for optimal performance.",
    credentialId: "JS-2023-003",
    verificationUrl: "#",
    duration: "80 hours",
    grade: "Outstanding",
    featured: false,
  },
  {
    id: 4,
    title: "Database Design & Optimization",
    institution: "Database Management Academy",
    year: "2023",
    category: "Backend Development",
    icon: <Database className="w-8 h-8" />,
    color: "from-syntax-blue to-syntax-cyan",
    bgColor: "from-dark-bg-tertiary to-dark-bg-secondary",
    description:
      "Comprehensive database design principles, query optimization, and performance tuning for both SQL and NoSQL databases.",
    skills: ["Database Design", "Query Optimization", "Performance Tuning", "Data Modeling"],
    relevance:
      "Critical for building scalable full-stack applications with efficient data storage, retrieval, and management systems.",
    credentialId: "DB-2023-004",
    verificationUrl: "#",
    duration: "90 hours",
    grade: "Excellent",
    featured: false,
  },
  {
    id: 5,
    title: "Web Security & Best Practices",
    institution: "Cybersecurity Institute",
    year: "2023",
    category: "Security",
    icon: <Shield className="w-8 h-8" />,
    color: "from-syntax-red to-syntax-pink",
    bgColor: "from-dark-bg-tertiary to-dark-bg-secondary",
    description:
      "Essential web security principles, vulnerability assessment, and implementation of security best practices in web applications.",
    skills: ["Security Auditing", "Vulnerability Assessment", "Secure Coding", "Authentication"],
    relevance:
      "Ensures development of secure web applications with proper authentication, data protection, and defense against common security threats.",
    credentialId: "SEC-2023-005",
    verificationUrl: "#",
    duration: "70 hours",
    grade: "Excellent",
    featured: false,
  },
  {
    id: 6,
    title: "Cloud Computing & DevOps",
    institution: "Cloud Technology Institute",
    year: "2022",
    category: "DevOps",
    icon: <Globe className="w-8 h-8" />,
    color: "from-syntax-blue to-syntax-purple",
    bgColor: "from-dark-bg-tertiary to-dark-bg-secondary",
    description:
      "Cloud infrastructure management, containerization, CI/CD pipelines, and modern DevOps practices for scalable application deployment.",
    skills: ["Cloud Infrastructure", "Docker", "CI/CD", "Monitoring"],
    relevance:
      "Enables efficient deployment and scaling of web applications with modern DevOps practices and cloud infrastructure management.",
    credentialId: "CLOUD-2022-006",
    verificationUrl: "#",
    duration: "110 hours",
    grade: "Outstanding",
    featured: false,
  },
]

const categories = [
  "All",
  "AI & Machine Learning",
  "Data Science",
  "Programming",
  "Backend Development",
  "Security",
  "DevOps",
]

const CertificationCard = ({ cert, index }: { cert: (typeof certifications)[0]; index: number }) => (
  <motion.div
    className={`group relative ${cert.featured ? "md:col-span-2" : ""}`}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    onHoverStart={() => console.log("Hover start")}
    onHoverEnd={() => console.log("Hover end")}
  >
    <div className="bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border overflow-hidden group-hover:shadow-dev-lg transition-all duration-500 h-full">
      {/* Card Header */}
      <div className={`bg-gradient-to-r ${cert.bgColor} p-6 relative overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div
              className={`p-4 bg-gradient-to-r ${cert.color} rounded-xl text-dark-bg shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              {cert.icon}
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-1 bg-dark-bg-tertiary text-dev-text-muted text-sm font-semibold rounded-full">
                  {cert.category}
                </span>
                {cert.featured && (
                  <div className="flex items-center px-2 py-1 bg-gradient-to-r from-syntax-orange to-syntax-pink text-dark-bg rounded-full text-xs font-bold">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </div>
                )}
              </div>
              <h3 className="text-xl md:text-2xl font-poppins font-bold text-dev-text group-hover:text-syntax-green transition-colors duration-300">
                {cert.title}
              </h3>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center text-dev-text-muted mb-1">
              <Calendar className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">{cert.year}</span>
            </div>
            <div className={`px-2 py-1 bg-gradient-to-r ${cert.color} text-dark-bg text-xs font-semibold rounded-full`}>
              {cert.grade}
            </div>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-6">
        {/* Institution */}
        <div className="flex items-center space-x-3">
          <BookOpen className="w-5 h-5 text-dev-text-muted" />
          <div>
            <p className="font-semibold text-dev-text">{cert.institution}</p>
            <p className="text-sm text-dev-text-muted">
              {cert.duration} • Credential ID: {cert.credentialId}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-dev-text-muted leading-relaxed">{cert.description}</p>

        {/* Skills Covered */}
        <div>
          <h4 className="font-semibold text-dev-text mb-3 flex items-center">
            <Zap className="w-4 h-4 mr-2 text-syntax-green" />
            Skills Covered
          </h4>
          <div className="flex flex-wrap gap-2">
            {cert.skills.map((skill, skillIndex) => (
              <motion.span
                key={skillIndex}
                className="px-3 py-1 bg-dark-bg-tertiary text-dev-text-muted text-sm rounded-full hover:bg-dark-bg-secondary hover:text-syntax-blue transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Relevance */}
        <div className="p-4 bg-gradient-to-r from-syntax-blue/10 to-syntax-green/10 rounded-xl border border-dark-border">
          <h4 className="font-semibold text-syntax-green mb-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Professional Relevance
          </h4>
          <p className="text-dev-text-muted text-sm leading-relaxed">{cert.relevance}</p>
        </div>

        {/* Verification Link */}
        <div className="flex items-center justify-between pt-4 border-t border-dark-border">
          <div className="flex items-center text-sm text-dev-text-muted">
            <CheckCircle2 className="w-4 h-4 mr-2 text-syntax-green" />
            Verified Credential
          </div>
          <motion.a
            href={cert.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-syntax-blue to-syntax-green text-dark-bg text-sm font-semibold rounded-lg hover:from-syntax-green hover:to-syntax-cyan transition-all duration-300 shadow-glow-primary hover:shadow-glow-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Verify
          </motion.a>
        </div>
      </div>

      {/* Hover Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-syntax-blue/5 to-syntax-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        layoutId={`certHover-${cert.id}`}
      />
    </div>
  </motion.div>
)

const Certifications = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredCert, setHoveredCert] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredCertifications = certifications.filter(
    (cert) => activeCategory === "All" || cert.category === activeCategory,
  )

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
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="certifications" className="py-20 bg-dark-bg relative overflow-hidden text-dev-text">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-syntax-green/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-syntax-blue/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-syntax-purple/10 rounded-full blur-3xl" />
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
            <Award className="w-5 h-5 text-syntax-green mr-2" />
            <span className="text-dev-text font-semibold">My Achievements</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold mb-6 text-dev-text"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Professional
            <br />
            <span className="text-gradient-syntax">Certifications</span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-dev-text-muted max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Validating my expertise through industry-recognized certifications and continuous learning.
          </motion.p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-syntax-blue to-syntax-green text-dark-bg shadow-glow-primary"
                  : "bg-dark-bg-secondary/80 backdrop-blur-sm text-dev-text-muted hover:bg-dark-bg-tertiary border border-dark-border"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredCertifications.map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} />
          ))}
        </motion.div>

        {/* Industry Certifications Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {certificationsData.map((cert, index) => (
            <motion.div
              key={index}
              className="bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border p-6 flex items-start space-x-6 hover:shadow-dev-lg hover:border-syntax-green transition-all duration-300"
              variants={itemVariants}
            >
              <div className="flex-shrink-0">
                {cert.icon ? (
                  <Image
                    src={cert.icon || "/placeholder.svg"}
                    alt={cert.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <Award className="w-10 h-10 text-syntax-blue mr-4 flex-shrink-0" />
                )}
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-dev-text mb-2">{cert.name}</h3>
                <p className="text-dev-text-muted mb-1">{cert.issuer}</p>
                <p className="text-sm text-dev-text-subtle mb-3">{cert.date}</p>
                <p className="text-sm text-dev-text-muted mb-4">{cert.description}</p>
                <div className="flex items-center text-dev-text-muted text-xs">
                  <GraduationCap className="w-4 h-4 mr-2 text-syntax-purple" />
                  <span>Issued: {cert.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Learning Stats */}
        <motion.div
          className="bg-gradient-to-r from-syntax-blue/10 via-syntax-green/10 to-syntax-purple/10 rounded-3xl p-8 md:p-12 shadow-dev-xl border border-dark-border relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-syntax-green to-syntax-blue"
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
              <TrendingUp className="w-5 h-5 text-syntax-green mr-2" />
              <span className="text-dev-text font-semibold">Learning Impact</span>
            </motion.div>

            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-dev-text mb-6">
              Commitment to
              <span className="text-gradient-syntax"> Excellence</span>
            </h3>

            <p className="text-lg md:text-xl text-dev-text-muted leading-relaxed max-w-4xl mx-auto mb-12">
              These certifications represent my dedication to continuous learning and staying current with emerging
              technologies, ensuring I deliver cutting-edge solutions that leverage the latest industry advancements.
            </p>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  number: "6+",
                  label: "Certifications Earned",
                  description: "Across multiple technology domains",
                },
                {
                  number: "570+",
                  label: "Learning Hours",
                  description: "Invested in professional development",
                },
                {
                  number: "2024",
                  label: "Latest Certification",
                  description: "AI & Data Analytics specialization",
                },
                {
                  number: "100%",
                  label: "Excellent Grades",
                  description: "Outstanding performance record",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="text-3xl md:text-4xl font-poppins font-bold bg-gradient-to-r from-syntax-green to-syntax-blue bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="font-semibold text-dev-text mb-1">{stat.label}</div>
                  <div className="text-sm text-dev-text-muted">{stat.description}</div>
                </motion.div>
              ))}
            </div>

            <motion.div className="mt-12" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
              <a
                href="#contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-syntax-blue to-syntax-green text-dark-bg rounded-xl font-semibold text-lg hover:from-syntax-green hover:to-syntax-cyan transition-all duration-300 shadow-glow-primary hover:shadow-glow-secondary"
              >
                Let's Discuss Your Project
                <Award className="w-5 h-5 ml-2" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Certifications
