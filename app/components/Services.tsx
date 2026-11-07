"use client"
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { SHOW_UNVERIFIED_CLAIMS } from "@/lib/site"
import { hasNumericClaim } from "@/lib/claims"
import { useI18n, localizeItems } from "@/components/i18n/I18nProvider"
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
    color: "text-brand-text",
  },
  {
    title: "Frontend Development & UI/UX",
    description:
      "Crafting intuitive and engaging user interfaces with a focus on exceptional user experience. Bringing designs to life with pixel-perfect precision.",
    icon: <Layout className="w-8 h-8" />,
    color: "text-brand-text",
  },
  {
    title: "Backend & API Development",
    description:
      "Designing and implementing robust, secure, and scalable backend systems and APIs to power your applications.",
    icon: <Database className="w-8 h-8" />,
    color: "text-fg-2",
  },
  {
    title: "Cloud Deployment & DevOps",
    description:
      "Deploying and managing applications on cloud platforms (AWS) with CI/CD pipelines for seamless delivery.",
    icon: <Cloud className="w-8 h-8" />,
    color: "text-brand-text",
  },
  {
    title: "Performance Optimization",
    description:
      "Boosting your website's speed and efficiency for better user engagement and SEO. Implementing advanced techniques to minimize load times.",
    icon: <Zap className="w-8 h-8" />,
    color: "text-fg-2",
  },
  {
    title: "Version Control & Collaboration",
    description:
      "Implementing best practices for Git and GitHub to ensure smooth team collaboration and code management.",
    icon: <GitBranch className="w-8 h-8" />,
    color: "text-fg-2",
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
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const ServiceCard = ({ service, index }: { service: (typeof services)[0]; index: number }) => {
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const { t } = useI18n()
  const sv = t.services

  return (
    <motion.div
      className="group relative" /* 2026-11-07: featured cards no longer span 2 columns (left an empty half-card next to a taller sibling) */
      variants={itemVariants}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onHoverStart={() => setHoveredService(service.id)}
      onHoverEnd={() => setHoveredService(null)}
    >
      <div className="bg-dark-bg-secondary rounded-card shadow-dev-md border border-dark-border overflow-hidden group-hover:shadow-dev-lg transition-all duration-500 h-full">
        {/* Card Header */}
        <div className={`bg-gradient-to-r ${service.bgColor} p-6 relative overflow-hidden`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`p-4 bg-inverse rounded-xl text-on-inverse transition-transform duration-300`}
              >
                {service.icon}
              </div>
              <div>
                {/* Phase 0a: "Most Popular" has no source; hidden until confirmed. */}
                {SHOW_UNVERIFIED_CLAIMS && service.featured && (
                  <div className="flex items-center px-3 py-1 bg-brand hover:bg-brand/90 text-on-brand text-xs font-bold rounded-full mb-2">
                    <Star className="w-3 h-3 me-1" />
                    {sv.mostPopular}
                  </div>
                )}
                <h3 className="text-xl md:text-2xl font-poppins font-bold text-dev-text group-hover:text-brand-text transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-dev-text-muted font-medium">{service.subtitle}</p>
              </div>
            </div>

            <div className="text-end">
              {/* Phase 0a: prices hidden until GAOBA confirms them (open question D2). */}
              {SHOW_UNVERIFIED_CLAIMS && (
                <>
                  <div className="text-sm text-dev-text-muted mb-1">{sv.startingFrom}</div>
                  <div className={`text-lg font-bold text-brand-text`}>
                    {service.pricing}
                  </div>
                </>
              )}
              <div className="text-xs text-dev-text-muted flex items-center">
                <Clock className="w-3 h-3 me-1" />
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
              <CheckCircle2 className="w-4 h-4 me-2 text-brand-text" />
              {sv.included}
            </h4>
            <div className="space-y-2">
              {service.features.map((feature, featureIndex) => (
                <motion.div
                  key={featureIndex}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-dark-bg-tertiary transition-colors duration-200"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
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
              <Settings className="w-4 h-4 me-2 text-brand-text" />
              {sv.technologies}
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech, techIndex) => (
                <motion.span
                  key={techIndex}
                  className="px-3 py-1 bg-dark-bg-tertiary text-dev-text-muted text-sm rounded-full hover:bg-dark-bg-secondary hover:text-brand-text transition-colors duration-200"
                  
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            className="btn btn-brand w-full group/btn"
            
            
          >
            {sv.cardCta}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 rtl:-scale-x-100 rtl:group-hover/btn:-translate-x-1" />
          </motion.button>
        </div>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-fg/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
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
  const { t, href } = useI18n()
  const sv = t.services
  // English data above is the source; other languages overlay the texts (services by id, steps by number).
  const localizedServices = localizeItems(services, "id", sv.overlay)
  const steps = localizeItems(processSteps, "step", sv.stepsOverlay)

  return (
    <section id="services" className="py-20 bg-dark-bg relative overflow-hidden text-dev-text">
      {/* Background Elements */}
      <div className="absolute inset-0">
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
          <p className="kicker mb-5">{sv.kicker}</p>

          {/* Phase 0b: the page's main heading is now its <h1> (same classes). */}
          <motion.h1
            className="display mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {sv.title}
            <br />
            <span className="mark">{sv.titleMark}</span>
          </motion.h1>

          <motion.p
            className="lede mx-auto max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {sv.lede}
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {localizedServices.map((service, index) => (
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
            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-dev-text mb-4">{sv.processTitle}</h3>
            <p className="text-lg text-dev-text-muted max-w-3xl mx-auto">
              {sv.processLede}
            </p>
          </motion.div>

          {/* Process Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {steps.map((step, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveProcess(index)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeProcess === index
                    ? `bg-inverse text-on-inverse`
                    : "bg-dark-bg-secondary/80 text-dev-text-muted hover:bg-dark-bg-tertiary border border-dark-border"
                  }`}
                whileHover={{ y: -2 }}
                
              >
                {step.step} {step.title}
              </motion.button>
            ))}
          </div>

          {/* Active Process Display */}
          <motion.div
            key={activeProcess}
            className={`bg-dark-bg-secondary rounded-card p-8 md:p-12 shadow-dev-xl border border-dark-border`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`p-4 bg-inverse rounded-xl text-on-inverse`}
                  >
                    {steps[activeProcess].icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-dev-text-muted mb-1">
                      {sv.step} {steps[activeProcess].step}
                    </div>
                    <h4 className="text-2xl md:text-3xl font-poppins font-bold text-dev-text">
                      {steps[activeProcess].title}
                    </h4>
                    <p className="text-lg text-dev-text-muted">{steps[activeProcess].subtitle}</p>
                  </div>
                </div>

                <p className="text-dev-text-muted leading-relaxed mb-6 text-lg">
                  {steps[activeProcess].description}
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-dev-text mb-4 flex items-center">
                  <CheckCircle2 className="w-5 h-5 me-2 text-brand-text" />
                  {sv.activities}
                </h5>
                <div className="space-y-3">
                  {steps[activeProcess].activities.map((activity, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-dark-bg-tertiary rounded-xl"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
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
          className="ink-band rounded-card p-8 md:p-12 relative overflow-hidden mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0 bg-brand"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative z-10 text-center">
            <p className="kicker mb-6">{sv.whyKicker}</p>

            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-dev-text mb-6">
              {sv.whyTitle} <span className="text-brand-text">{sv.whyTitleAccent}</span>
            </h3>

            <p className="text-lg md:text-xl text-dev-text-muted leading-relaxed max-w-4xl mx-auto mb-12">
              {sv.whyText}
            </p>

            {/* Phase 0a: the "1000+" and "60%" cards have no source; hidden until confirmed. */}
            <div className={`grid gap-8 ${SHOW_UNVERIFIED_CLAIMS ? "md:grid-cols-4" : "md:grid-cols-2 max-w-3xl mx-auto"}`}>
              {[
                {
                  icon: <Code className="w-6 h-6" />,
                  number: sv.why[0].number,
                  label: sv.why[0].label,
                  description: sv.why[0].description,
                },
                {
                  icon: <Database className="w-6 h-6" />,
                  number: sv.why[1].number,
                  label: sv.why[1].label,
                  description: sv.why[1].description,
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
              ]
                .filter((stat) => SHOW_UNVERIFIED_CLAIMS || !hasNumericClaim(stat.number))
                .map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-brand hover:bg-brand/90 rounded-xl text-on-brand mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-poppins font-bold text-brand-text mb-1">
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
            {t.home.services.ctaTitle}
          </h3>
          <p className="text-lg md:text-xl text-dev-text-muted mb-8 max-w-3xl mx-auto">
            {t.home.services.ctaText}
          </p>
          <motion.button
            onClick={() => {
              const contactSection = document.getElementById('contact')
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' })
              } else {
                window.location.href = href('/contact')
              }
            }}
            className="btn btn-brand"
            whileHover={{ y: -2 }}
            
          >
            {sv.finalCta}
            <ArrowRight className="w-5 h-5 rtl:-scale-x-100" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
