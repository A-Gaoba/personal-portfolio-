"use client"
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import {
  Code,
  Palette,
  Zap,
  Smartphone,
  TrendingUp,
  Search,
  Globe,
  Users,
  Settings,
  ArrowRight,
  CheckCircle2,
  Star,
  Lightbulb,
  Target,
  Clock,
  Award,
  Layers,
  Database,
  Layout,
  Cloud,
  GitBranch,
} from "lucide-react"

const servicesData = [
  {
    title: "Custom Web Application Development",
    description:
      "Building bespoke web applications from scratch, tailored to your unique business needs. Specializing in scalable, high-performance solutions.",
    icon: <Code className="w-8 h-8" />,
    color: "text-syntax-blue",
  },
  {
    title: "Frontend Development & UI/UX",
    description:
      "Crafting intuitive and engaging user interfaces with a focus on exceptional user experience. Bringing designs to life with pixel-perfect precision.",
    icon: <Layout className="w-8 h-8" />,
    color: "text-syntax-green",
  },
  {
    title: "Backend & API Development",
    description:
      "Designing and implementing robust, secure, and scalable backend systems and APIs to power your applications.",
    icon: <Database className="w-8 h-8" />,
    color: "text-syntax-purple",
  },
  {
    title: "Cloud Deployment & DevOps",
    description:
      "Deploying and managing applications on cloud platforms (AWS) with CI/CD pipelines for seamless delivery.",
    icon: <Cloud className="w-8 h-8" />,
    color: "text-syntax-orange",
  },
  {
    title: "Performance Optimization",
    description:
      "Boosting your website's speed and efficiency for better user engagement and SEO. Implementing advanced techniques to minimize load times.",
    icon: <Zap className="w-8 h-8" />,
    color: "text-syntax-cyan",
  },
  {
    title: "Version Control & Collaboration",
    description:
      "Implementing best practices for Git and GitHub to ensure smooth team collaboration and code management.",
    icon: <GitBranch className="w-8 h-8" />,
    color: "text-syntax-pink",
  },
]

const services = [
  {
    id: 1,
    icon: <Code className="w-8 h-8" />,
    title: "Custom Web Application Development",
    subtitle: "Full-Stack Solutions with Frontend Excellence",
    description:
      "Full-stack web applications built with React, Next.js, and modern technologies. From concept to deployment, I create scalable solutions tailored to your business needs with pixel-perfect frontend implementation.",
    features: [
      "React & Next.js development with advanced patterns",
      "TypeScript implementation for type safety",
      "Database design & integration (MongoDB, PostgreSQL)",
      "RESTful & GraphQL API development",
      "Responsive design with Tailwind CSS",
      "Performance optimization & SEO",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
    color: "from-syntax-blue to-syntax-cyan",
    bgColor: "from-dark-bg-tertiary to-dark-bg-secondary",
    pricing: "Starting from $5,000",
    timeline: "4-12 weeks",
    featured: true,
  },
  {
    id: 2,
    icon: <Palette className="w-8 h-8" />,
    title: "Frontend Architecture & UI/UX Implementation",
    subtitle: "Pixel-Perfect Interfaces with Modern Design Systems",
    description:
      "Transform designs into pixel-perfect, interactive user interfaces with optimal performance and accessibility standards. Specializing in React component architecture and design system creation.",
    features: [
      "Responsive design implementation across all devices",
      "Component library development with Storybook",
      "Design system creation and documentation",
      "WCAG 2.1 AA accessibility compliance",
      "Advanced CSS animations and micro-interactions",
      "Cross-browser compatibility testing",
    ],
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Storybook", "Figma", "CSS3"],
    color: "from-syntax-purple to-syntax-pink",
    bgColor: "from-dark-bg-tertiary to-dark-bg-secondary",
    pricing: "Starting from $3,000",
    timeline: "2-8 weeks",
    featured: true,
  },
  {
    id: 3,
    icon: <Zap className="w-8 h-8" />,
    title: "Performance Optimization & Core Web Vitals",
    subtitle: "Lightning-Fast Applications with Superior UX",
    description:
      "Enhance your web application's speed, SEO, and user experience through advanced optimization techniques and best practices. Achieve perfect Lighthouse scores and superior Core Web Vitals.",
    features: [
      "Core Web Vitals optimization (LCP, FID, CLS)",
      "Bundle size reduction and code splitting",
      "Image & asset optimization strategies",
      "Advanced caching implementation",
      "SEO optimization and meta management",
      "Performance monitoring and analytics",
    ],
    technologies: ["Webpack", "Vite", "Next.js", "Lighthouse", "GTM", "Analytics"],
    color: "from-syntax-green to-syntax-cyan",
    bgColor: "from-dark-bg-tertiary to-dark-bg-secondary",
    pricing: "Starting from $2,500",
    timeline: "1-4 weeks",
    featured: false,
  },
  {
    id: 4,
    icon: <Smartphone className="w-8 h-8" />,
    title: "Progressive Web App Development",
    subtitle: "Native App Experience on the Web",
    description:
      "Create app-like experiences on the web with offline functionality, push notifications, and native device features. Build PWAs that work seamlessly across all platforms.",
    features: [
      "Service worker implementation for offline functionality",
      "Push notification system integration",
      "Native device feature access (camera, GPS, etc.)",
      "App store deployment (Google Play, App Store)",
      "Background sync and data caching",
      "Responsive design for all screen sizes",
    ],
    technologies: ["PWA", "Service Workers", "Web APIs", "Firebase", "Workbox", "Manifest"],
    color: "from-syntax-orange to-syntax-red",
    bgColor: "from-dark-bg-tertiary to-dark-bg-secondary",
    pricing: "Starting from $4,000",
    timeline: "3-10 weeks",
    featured: false,
  },
  {
    id: 5,
    icon: <Search className="w-8 h-8" />,
    title: "Code Review & Technical Consulting",
    subtitle: "Expert Guidance for Development Excellence",
    description:
      "Expert code review, architecture assessment, and technical guidance to improve your development processes and code quality. Leverage my startup founder experience for strategic insights.",
    features: [
      "Comprehensive code quality assessment",
      "Architecture review and recommendations",
      "Best practices implementation guidance",
      "Team mentoring and knowledge transfer",
      "Performance bottleneck identification",
      "Security vulnerability assessment",
    ],
    technologies: ["Code Analysis", "Architecture", "Best Practices", "Mentoring", "Documentation"],
    color: "from-syntax-blue to-syntax-purple",
    bgColor: "from-dark-bg-tertiary to-dark-bg-secondary",
    pricing: "Starting from $150/hour",
    timeline: "1-2 weeks",
    featured: false,
  },
  {
    id: 6,
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Legacy System Modernization",
    subtitle: "Seamless Migration to Modern Technologies",
    description:
      "Upgrade and modernize existing applications with current technologies while maintaining functionality and improving performance. Gradual migration strategies that minimize business disruption.",
    features: [
      "Technology stack migration planning",
      "Performance improvements and optimization",
      "Security enhancements and vulnerability fixes",
      "Gradual modernization strategy implementation",
      "Data migration and integrity assurance",
      "Team training on new technologies",
    ],
    technologies: ["Migration", "Refactoring", "Security", "Performance", "Training"],
    color: "from-syntax-green to-syntax-blue",
    bgColor: "from-dark-bg-tertiary to-dark-bg-secondary",
    pricing: "Starting from $8,000",
    timeline: "6-16 weeks",
    featured: false,
  },
]

const processSteps = [
  {
    step: "01",
    title: "Discovery & Planning",
    subtitle: "Understanding Your Vision",
    description:
      "Understanding your requirements, goals, and technical constraints to create a comprehensive project roadmap with clear milestones and deliverables.",
    icon: <Lightbulb className="w-6 h-6" />,
    color: "from-syntax-blue to-syntax-cyan",
    activities: [
      "Requirements gathering and analysis",
      "Technical feasibility assessment",
      "Project scope definition",
      "Timeline and milestone planning",
      "Risk assessment and mitigation",
    ],
  },
  {
    step: "02",
    title: "Design & Architecture",
    subtitle: "Crafting the Blueprint",
    description:
      "Creating technical specifications, system architecture, and user experience design aligned with your objectives and best practices.",
    icon: <Layers className="w-6 h-6" />,
    color: "from-syntax-purple to-syntax-pink",
    activities: [
      "System architecture design",
      "Database schema planning",
      "UI/UX wireframing and prototyping",
      "Technology stack selection",
      "API design and documentation",
    ],
  },
  {
    step: "03",
    title: "Development & Testing",
    subtitle: "Building with Excellence",
    description:
      "Agile development with continuous testing, code reviews, and regular progress updates throughout the development process.",
    icon: <Code className="w-6 h-6" />,
    color: "from-syntax-green to-syntax-cyan",
    activities: [
      "Iterative development cycles",
      "Continuous integration and testing",
      "Code reviews and quality assurance",
      "Regular client updates and demos",
      "Performance optimization",
    ],
  },
  {
    step: "04",
    title: "Deployment & Support",
    subtitle: "Launch and Beyond",
    description:
      "Seamless deployment to production with ongoing support, monitoring, and maintenance as needed for long-term success.",
    icon: <Globe className="w-6 h-6" />,
    color: "from-syntax-orange to-syntax-red",
    activities: [
      "Production deployment setup",
      "Performance monitoring implementation",
      "Documentation and training",
      "Ongoing support and maintenance",
      "Feature enhancements and updates",
    ],
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
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const ServiceCard = ({ service, index }: { service: (typeof services)[0]; index: number }) => {
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  return (
    <motion.div
      className={`group relative ${service.featured ? "md:col-span-2" : ""}`}
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onHoverStart={() => setHoveredService(service.id)}
      onHoverEnd={() => setHoveredService(null)}
    >
      <div className="bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border overflow-hidden group-hover:shadow-dev-lg transition-all duration-500 h-full">
        {/* Card Header */}
        <div className={`bg-gradient-to-r ${service.bgColor} p-6 relative overflow-hidden`}>
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
                className={`p-4 bg-gradient-to-r ${service.color} rounded-xl text-dark-bg shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {service.icon}
              </div>
              <div>
                {service.featured && (
                  <div className="flex items-center px-3 py-1 bg-gradient-to-r from-syntax-orange to-syntax-pink text-dark-bg text-xs font-bold rounded-full mb-2">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl md:text-2xl font-poppins font-bold text-dev-text group-hover:text-syntax-green transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-dev-text-muted font-medium">{service.subtitle}</p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-dev-text-muted mb-1">Starting from</div>
              <div className={`text-lg font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                {service.pricing}
              </div>
              <div className="text-xs text-dev-text-muted flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {service.timeline}
              </div>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <p className="text-dev-text-muted leading-relaxed">{service.description}</p>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-dev-text mb-3 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2 text-syntax-green" />
              What's Included
            </h4>
            <div className="space-y-2">
              {service.features.map((feature, featureIndex) => (
                <motion.div
                  key={featureIndex}
                  className="flex items-start space-x-3 p-2 rounded-lg hover:bg-dark-bg-tertiary transition-colors duration-200"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: featureIndex * 0.1, duration: 0.5 }}
                >
                  <div className="w-2 h-2 bg-syntax-green rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-dev-text-muted">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="font-semibold text-dev-text mb-3 flex items-center">
              <Settings className="w-4 h-4 mr-2 text-syntax-blue" />
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech, techIndex) => (
                <motion.span
                  key={techIndex}
                  className="px-3 py-1 bg-dark-bg-tertiary text-dev-text-muted text-sm rounded-full hover:bg-dark-bg-secondary hover:text-syntax-blue transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-syntax-blue to-syntax-green text-dark-bg rounded-xl font-semibold hover:from-syntax-green hover:to-syntax-cyan transition-all duration-300 shadow-glow-primary hover:shadow-glow-secondary group/btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started with This Service
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </div>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-syntax-blue/5 to-syntax-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          layoutId={`serviceHover-${service.id}`}
        />
      </div>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeProcess, setActiveProcess] = useState(0)

  return (
    <section id="services" className="py-20 bg-dark-bg relative overflow-hidden text-dev-text">
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
            <Target className="w-5 h-5 text-syntax-green mr-2" />
            <span className="text-dev-text font-semibold">Services & Expertise</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold mb-6 text-dev-text"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Comprehensive Web Development
            <br />
            <span className="text-gradient-syntax">Services & Solutions</span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-dev-text-muted max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Comprehensive web development services to bring your ideas to life with modern technologies and best
            practices, specializing in React, Next.js, and Tailwind CSS excellence.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>

        {/* Development Process */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-dev-text mb-4">My Development Process</h3>
            <p className="text-lg text-dev-text-muted max-w-3xl mx-auto">
              A structured approach ensuring quality, transparency, and successful project delivery with regular
              communication and milestone tracking.
            </p>
          </motion.div>

          {/* Process Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {processSteps.map((step, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveProcess(index)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeProcess === index
                    ? `bg-gradient-to-r ${step.color} text-dark-bg shadow-glow-primary`
                    : "bg-dark-bg-secondary/80 backdrop-blur-sm text-dev-text-muted hover:bg-dark-bg-tertiary border border-dark-border"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {step.step} {step.title}
              </motion.button>
            ))}
          </div>

          {/* Active Process Display */}
          <motion.div
            key={activeProcess}
            className={`bg-dark-bg-secondary rounded-3xl p-8 md:p-12 shadow-dev-xl border border-dark-border`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div
                    className={`p-4 bg-gradient-to-r ${processSteps[activeProcess].color} rounded-xl text-dark-bg shadow-lg`}
                  >
                    {processSteps[activeProcess].icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-dev-text-muted mb-1">
                      Step {processSteps[activeProcess].step}
                    </div>
                    <h4 className="text-2xl md:text-3xl font-poppins font-bold text-dev-text">
                      {processSteps[activeProcess].title}
                    </h4>
                    <p className="text-lg text-dev-text-muted">{processSteps[activeProcess].subtitle}</p>
                  </div>
                </div>

                <p className="text-dev-text-muted leading-relaxed mb-6 text-lg">
                  {processSteps[activeProcess].description}
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-dev-text mb-4 flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-syntax-green" />
                  Key Activities
                </h5>
                <div className="space-y-3">
                  {processSteps[activeProcess].activities.map((activity, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-dark-bg-tertiary backdrop-blur-sm rounded-xl"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="w-2 h-2 bg-syntax-green rounded-full flex-shrink-0"></div>
                      <span className="text-dev-text-muted">{activity}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Why Choose Me */}
        <motion.div
          className="bg-gradient-to-r from-syntax-blue/10 via-syntax-green/10 to-syntax-purple/10 rounded-3xl p-8 md:p-12 shadow-dev-xl border border-dark-border relative overflow-hidden mb-16"
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
              <Award className="w-5 h-5 text-syntax-green mr-2" />
              <span className="text-dev-text font-semibold">Why Choose Me</span>
            </motion.div>

            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-dev-text mb-6">
              Frontend Mastery Meets
              <span className="text-gradient-syntax"> Full-Stack Excellence</span>
            </h3>

            <p className="text-lg md:text-xl text-dev-text-muted leading-relaxed max-w-4xl mx-auto mb-12">
              With deep expertise in React, Next.js, and Tailwind CSS, combined with full-stack capabilities and startup
              founder experience, I deliver solutions that not only look exceptional but drive real business results.
            </p>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  icon: <Code className="w-6 h-6" />,
                  number: "React Expert",
                  label: "Frontend Mastery",
                  description: "Advanced React patterns & optimization",
                },
                {
                  icon: <Database className="w-6 h-6" />,
                  number: "Full-Stack",
                  label: "Complete Solutions",
                  description: "Frontend to backend integration",
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  number: "1000+",
                  label: "Users Served",
                  description: "Through Naqla Tech platform",
                },
                {
                  icon: <TrendingUp className="w-6 h-6" />,
                  number: "60%",
                  label: "Performance Boost",
                  description: "Average improvement delivered",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-syntax-blue to-syntax-green rounded-xl text-dark-bg mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-poppins font-bold bg-gradient-to-r from-syntax-green to-syntax-blue bg-clip-text text-transparent mb-1">
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
          <motion.a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-syntax-blue to-syntax-green text-dark-bg rounded-xl font-semibold text-lg hover:from-syntax-green hover:to-syntax-cyan transition-all duration-300 shadow-glow-primary hover:shadow-glow-secondary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
