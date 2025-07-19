"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Github, X, Star, TrendingUp, Award, Users, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { JSX } from "react/jsx-runtime"

interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  category: string
  year: string
  status: string
  metrics: { label: string; value: string; icon: JSX.Element }[]
  challenges: string[]
  solutions: string[]
  results: string[]
  liveUrl: string
  githubUrl: string
  featured: boolean
}

const projects: Project[] = [
  {
    id: 1,
    title: "Naqla Tech Logistics Platform",
    subtitle: "Revolutionary Logistics Management System",
    description:
      "A comprehensive logistics platform that revolutionized supply chain management for businesses. Built with modern React architecture and scalable backend infrastructure, serving over 1000 active users and generating $50K+ in revenue.",
    longDescription:
      "Naqla Tech represents the culmination of my entrepreneurial and technical journey. As the founder and lead developer, I identified a gap in the logistics market and built a solution from the ground up. The platform features real-time tracking, AI-powered route optimization, automated billing, and comprehensive analytics dashboard. The system handles complex logistics workflows while maintaining a user-friendly interface that requires minimal training.",
    image: "/projectsImages/naqla.png",
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "Socket.io", "AWS", "Stripe", "MapBox"],
    category: "Full-Stack Application",
    year: "2021-2023",
    status: "Live & Growing",
    metrics: [
      { label: "Active Users", value: "1000+", icon: <Users className="w-4 h-4" /> },
      { label: "Revenue Generated", value: "$50K+", icon: <TrendingUp className="w-4 h-4" /> },
      { label: "Efficiency Improvement", value: "40%", icon: <Award className="w-4 h-4" /> },
      { label: "Customer Satisfaction", value: "4.8/5", icon: <Star className="w-4 h-4" /> },
    ],
    challenges: [
      "Real-time tracking across multiple devices and platforms",
      "Scalable architecture to handle growing user base",
      "Complex logistics algorithms for route optimization",
      "Integration with multiple payment and mapping services",
    ],
    solutions: [
      "Implemented WebSocket connections for real-time updates",
      "Designed microservices architecture with horizontal scaling",
      "Developed custom algorithms using machine learning principles",
      "Created unified API layer for seamless third-party integrations",
    ],
    results: [
      "Reduced delivery times by 40% through optimized routing",
      "Increased customer retention rate to 85%",
      "Automated 70% of manual logistics processes",
      "Achieved 99.9% uptime with robust error handling",
    ],
    liveUrl: "https://naqlatech.com",
    githubUrl: "https://github.com/A-Gaoba/naqla-tech",
    featured: true,
  },
  {
    id: 2,
    title: "Anfasak Perfumes",
    subtitle: "Luxury Perfumes & Oud E-Commerce Platform",
    description:
      "A sophisticated online store for luxury perfumes and oud products, featuring advanced product catalog, secure payment processing, and personalized shopping experience. Achieved +40% sales growth through optimized user experience.",
    longDescription:
      "Anfasak Perfumes is a premium e-commerce platform designed for luxury fragrance enthusiasts. The platform features an extensive product catalog with detailed descriptions, high-quality imagery, and secure payment processing. The design emphasizes elegance and sophistication while maintaining excellent usability and performance.",
    image: "/projectsImages/anfasak.png",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe", "MongoDB", "Cloudinary"],
    category: "E-Commerce",
    year: "2023",
    status: "Live",
    metrics: [
      { label: "Sales Growth", value: "+40%", icon: <TrendingUp className="w-4 h-4" /> },
      { label: "Conversion Rate", value: "3.2%", icon: <Award className="w-4 h-4" /> },
      { label: "Average Order", value: "$150", icon: <Star className="w-4 h-4" /> },
      { label: "Customer Rating", value: "4.9/5", icon: <Users className="w-4 h-4" /> },
    ],
    challenges: [
      "Creating a luxury shopping experience for high-end products",
      "Managing complex product variations and inventory",
      "Implementing secure payment processing for international customers",
      "Optimizing for mobile shopping experience",
    ],
    solutions: [
      "Designed elegant UI with premium aesthetics and smooth animations",
      "Built flexible product management system with variant support",
      "Integrated multiple payment gateways with fraud protection",
      "Implemented responsive design with mobile-first approach",
    ],
    results: [
      "Increased sales by 40% within first quarter",
      "Achieved 3.2% conversion rate, above industry average",
      "Reduced cart abandonment by 25%",
      "Maintained 99.9% uptime with zero security incidents",
    ],
    liveUrl: "https://anfasakperfumes.vercel.app",
    githubUrl: "https://github.com/A-Gaoba/anfasak-perfumes",
    featured: false,
  },
  {
    id: 3,
    title: "Ghofran Badran",
    subtitle: "Personal Portfolio for Public Figure",
    description:
      "A professional portfolio website for a prominent public figure, featuring modern design, interactive elements, and comprehensive content management. Achieved +50% reach increase through optimized SEO and social media integration.",
    longDescription:
      "This portfolio website was designed to showcase the professional achievements and personal brand of a public figure. The platform features a modern, responsive design with interactive elements, comprehensive content management, and seamless social media integration. The design emphasizes professionalism while maintaining personal authenticity.",
    image: "/projectsImages/ghofran.png",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Sanity CMS"],
    category: "Portfolio",
    year: "2023",
    status: "Live",
    metrics: [
      { label: "Reach Increase", value: "+50%", icon: <TrendingUp className="w-4 h-4" /> },
      { label: "Page Views", value: "25K+", icon: <Users className="w-4 h-4" /> },
      { label: "Engagement Rate", value: "4.2%", icon: <Award className="w-4 h-4" /> },
      { label: "SEO Score", value: "98/100", icon: <Star className="w-4 h-4" /> },
    ],
    challenges: [
      "Creating a professional yet personal brand representation",
      "Managing diverse content types and media assets",
      "Implementing effective SEO for public figure visibility",
      "Ensuring accessibility and cross-platform compatibility",
    ],
    solutions: [
      "Designed custom UI components reflecting personal brand identity",
      "Built flexible content management system with media optimization",
      "Implemented comprehensive SEO strategy with structured data",
      "Applied WCAG 2.1 AA accessibility standards throughout",
    ],
    results: [
      "Increased online reach by 50% within three months",
      "Generated 25K+ monthly page views",
      "Improved search engine rankings by 40%",
      "Enhanced professional credibility and online presence",
    ],
    liveUrl: "https://ghofran-badran.vercel.app",
    githubUrl: "https://github.com/A-Gaoba/ghofran-portfolio",
    featured: false,
  },
  {
    id: 4,
    title: "Gifts Touchy",
    subtitle: "Personalized Gifts E-Commerce Platform",
    description:
      "An innovative online shop for personalized gifts, featuring custom product designer, real-time preview, and seamless ordering system. Achieved +25% order increase through enhanced user experience and product customization features.",
    longDescription:
      "Gifts Touchy is a specialized e-commerce platform for personalized gifts. The platform features an interactive product designer that allows customers to customize gifts in real-time, with instant preview and seamless ordering process. The design focuses on creativity and user engagement while maintaining excellent performance.",
    image: "/projectsImages/giftstouchy.png",
    technologies: ["React", "Next.js", "Canvas API", "Three.js", "Stripe", "MongoDB", "Cloudinary"],
    category: "E-Commerce",
    year: "2023",
    status: "Live",
    metrics: [
      { label: "Order Increase", value: "+25%", icon: <TrendingUp className="w-4 h-4" /> },
      { label: "Customization Usage", value: "85%", icon: <Award className="w-4 h-4" /> },
      { label: "Average Session", value: "8.5 min", icon: <Users className="w-4 h-4" /> },
      { label: "Return Rate", value: "2.1%", icon: <Star className="w-4 h-4" /> },
    ],
    challenges: [
      "Building interactive product customization interface",
      "Managing complex product variations and pricing",
      "Implementing real-time preview functionality",
      "Optimizing performance for image-heavy content",
    ],
    solutions: [
      "Developed custom Canvas-based product designer",
      "Built dynamic pricing system for customization options",
      "Implemented WebSocket connections for real-time updates",
      "Applied image optimization and lazy loading techniques",
    ],
    results: [
      "Increased orders by 25% through enhanced customization",
      "Achieved 85% usage rate for product customization features",
      "Extended average session duration to 8.5 minutes",
      "Reduced return rate to 2.1% through better product visualization",
    ],
    liveUrl: "https://giftstouchy.vercel.app",
    githubUrl: "https://github.com/A-Gaoba/gifts-touchy",
    featured: false,
  },
  {
    id: 5,
    title: "Junzi Tech",
    subtitle: "Tech Development Services Business Site",
    description:
      "A professional business website for tech development services, featuring service showcase, client testimonials, and lead generation optimization. Achieved +35% lead generation through improved user experience and conversion optimization.",
    longDescription:
      "Junzi Tech is a business website designed to showcase tech development services and generate qualified leads. The platform features comprehensive service descriptions, client testimonials, case studies, and optimized lead generation forms. The design emphasizes professionalism and trust while maintaining excellent user experience.",
    image: "/projectsImages/junzi.png",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Formspree", "Analytics"],
    category: "Tech Solutions",
    year: "2023",
    status: "Live",
    metrics: [
      { label: "Lead Generation", value: "+35%", icon: <TrendingUp className="w-4 h-4" /> },
      { label: "Conversion Rate", value: "4.8%", icon: <Award className="w-4 h-4" /> },
      { label: "Page Load Speed", value: "1.2s", icon: <Star className="w-4 h-4" /> },
      { label: "Bounce Rate", value: "28%", icon: <Users className="w-4 h-4" /> },
    ],
    challenges: [
      "Creating compelling service presentations and case studies",
      "Implementing effective lead generation and tracking",
      "Building trust and credibility through design and content",
      "Optimizing for search engines and local SEO",
    ],
    solutions: [
      "Designed comprehensive service showcase with detailed case studies",
      "Implemented advanced lead tracking and analytics system",
      "Created trust-building elements including testimonials and certifications",
      "Applied comprehensive SEO strategy with local optimization",
    ],
    results: [
      "Increased lead generation by 35% within two months",
      "Achieved 4.8% conversion rate from visitors to leads",
      "Improved page load speed to 1.2 seconds",
      "Reduced bounce rate to 28% through better engagement",
    ],
    liveUrl: "https://junzitechsolutions.com",
    githubUrl: "https://github.com/A-Gaoba/junzi-tech",
    featured: false,
  },
  {
    id: 6,
    title: "Loqmat Hala",
    subtitle: "Homemade Desserts E-Commerce Platform",
    description:
      "A specialized online shop for homemade desserts, featuring product showcase, ordering system, and delivery management. Achieved +30% order increase through enhanced product presentation and streamlined ordering process.",
    longDescription:
      "Loqmat Hala is an e-commerce platform specializing in homemade desserts. The platform features beautiful product photography, detailed descriptions, secure ordering system, and delivery management. The design emphasizes the homemade, artisanal nature of the products while maintaining professional e-commerce functionality.",
    image: "/projectsImages/loqmat-hala.png",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe", "MongoDB"],
    category: "E-Commerce",
    year: "2023",
    status: "Live",
    metrics: [
      { label: "Order Increase", value: "+30%", icon: <TrendingUp className="w-4 h-4" /> },
      { label: "Customer Retention", value: "75%", icon: <Award className="w-4 h-4" /> },
      { label: "Average Rating", value: "4.8/5", icon: <Star className="w-4 h-4" /> },
      { label: "Repeat Orders", value: "60%", icon: <Users className="w-4 h-4" /> },
    ],
    challenges: [
      "Showcasing homemade products with professional presentation",
      "Managing inventory for perishable food items",
      "Implementing delivery scheduling and tracking",
      "Building customer trust for food safety and quality",
    ],
    solutions: [
      "Designed beautiful product galleries with high-quality photography",
      "Built real-time inventory management system",
      "Implemented flexible delivery scheduling and tracking",
      "Added trust indicators including food safety certifications",
    ],
    results: [
      "Increased orders by 30% through better product presentation",
      "Achieved 75% customer retention rate",
      "Maintained 4.8/5 average customer rating",
      "Generated 60% repeat orders through excellent service",
    ],
    liveUrl: "https://loqmat-hala.vercel.app",
    githubUrl: "https://github.com/A-Gaoba/loqmat-hala",
    featured: false,
  },
  {
    id: 7,
    title: "Planner Balloons",
    subtitle: "Event Balloon Decoration Services",
    description:
      "A professional website for balloon decoration services, featuring portfolio showcase, booking system, and service customization. Achieved +45% booking increase through enhanced visual presentation and streamlined booking process.",
    longDescription:
      "Planner Balloons is a service website for balloon decoration services. The platform features a comprehensive portfolio of past events, detailed service descriptions, online booking system, and customization options. The design emphasizes creativity and visual appeal while maintaining professional service presentation.",
    image: "/projectsImages/plannerballoons.png",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Booking API", "Cloudinary"],
    category: "Event Planning",
    year: "2023",
    status: "Live",
    metrics: [
      { label: "Booking Increase", value: "+45%", icon: <TrendingUp className="w-4 h-4" /> },
      { label: "Portfolio Views", value: "15K+", icon: <Award className="w-4 h-4" /> },
      { label: "Customer Satisfaction", value: "4.9/5", icon: <Star className="w-4 h-4" /> },
      { label: "Event Success Rate", value: "98%", icon: <Users className="w-4 h-4" /> },
    ],
    challenges: [
      "Showcasing balloon decoration work with visual impact",
      "Managing event booking and scheduling system",
      "Implementing service customization and pricing",
      "Building trust through portfolio and testimonials",
    ],
    solutions: [
      "Created stunning portfolio gallery with high-quality event photography",
      "Built comprehensive booking system with calendar integration",
      "Developed service customization interface with pricing calculator",
      "Added detailed testimonials and case studies for each event type",
    ],
    results: [
      "Increased bookings by 45% through enhanced portfolio presentation",
      "Generated 15K+ portfolio views within first quarter",
      "Achieved 4.9/5 customer satisfaction rating",
      "Maintained 98% event success rate through detailed planning",
    ],
    liveUrl: "https://plannerballoons.vercel.app",
    githubUrl: "https://github.com/A-Gaoba/planner-balloons",
    featured: false,
  },
  {
    id: 8,
    title: "Product Senab",
    subtitle: "Product Showcase & Ordering Platform",
    description:
      "A comprehensive product showcase and ordering platform, featuring detailed product information, secure ordering, and inventory management. Achieved +50% sales through enhanced product presentation and streamlined ordering process.",
    longDescription:
      "Product Senab is a product showcase and ordering platform designed to present products in the best possible light while facilitating easy ordering. The platform features detailed product information, high-quality imagery, secure payment processing, and comprehensive inventory management. The design emphasizes product quality and user convenience.",
    image: "/projectsImages/productsenab.png",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe", "MongoDB", "Cloudinary"],
    category: "E-Commerce",
    year: "2023",
    status: "Live",
    metrics: [
      { label: "Sales Increase", value: "+50%", icon: <TrendingUp className="w-4 h-4" /> },
      { label: "Product Views", value: "50K+", icon: <Award className="w-4 h-4" /> },
      { label: "Conversion Rate", value: "5.2%", icon: <Star className="w-4 h-4" /> },
      { label: "Customer Rating", value: "4.7/5", icon: <Users className="w-4 h-4" /> },
    ],
    challenges: [
      "Creating compelling product presentations with detailed information",
      "Managing complex product catalogs and inventory",
      "Implementing secure and user-friendly ordering system",
      "Optimizing for mobile shopping experience",
    ],
    solutions: [
      "Designed comprehensive product pages with detailed specifications",
      "Built flexible catalog management system with search and filtering",
      "Implemented secure payment processing with multiple options",
      "Created responsive design optimized for all devices",
    ],
    results: [
      "Increased sales by 50% through enhanced product presentation",
      "Generated 50K+ product views within first quarter",
      "Achieved 5.2% conversion rate from visitors to customers",
      "Maintained 4.7/5 average customer rating",
    ],
    liveUrl: "https://productsenab.vercel.app",
    githubUrl: "https://github.com/A-Gaoba/product-senab",
    featured: false,
  },
  {
    id: 9,
    title: "Richy Planner",
    subtitle: "Custom Event Planning Service Website",
    description:
      "A professional website for custom event planning services, featuring service showcase, portfolio gallery, and booking system. Achieved +35% booking increase through enhanced service presentation and streamlined booking process.",
    longDescription:
      "Richy Planner is a service website for custom event planning. The platform features comprehensive service descriptions, portfolio of past events, detailed case studies, and online booking system. The design emphasizes professionalism and creativity while maintaining excellent user experience.",
    image: "/projectsImages/richy.png",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Booking API", "Cloudinary"],
    category: "Event Planning",
    year: "2023",
    status: "Live",
    metrics: [
      { label: "Booking Increase", value: "+35%", icon: <TrendingUp className="w-4 h-4" /> },
      { label: "Portfolio Views", value: "20K+", icon: <Award className="w-4 h-4" /> },
      { label: "Client Satisfaction", value: "4.8/5", icon: <Star className="w-4 h-4" /> },
      { label: "Event Success Rate", value: "96%", icon: <Users className="w-4 h-4" /> },
    ],
    challenges: [
      "Showcasing event planning expertise and creativity",
      "Managing complex event booking and consultation scheduling",
      "Implementing service customization and pricing",
      "Building trust through portfolio and client testimonials",
    ],
    solutions: [
      "Created comprehensive portfolio with detailed event case studies",
      "Built advanced booking system with consultation scheduling",
      "Developed service customization interface with pricing options",
      "Added detailed client testimonials and event success stories",
    ],
    results: [
      "Increased bookings by 35% through enhanced service presentation",
      "Generated 20K+ portfolio views within first quarter",
      "Achieved 4.8/5 client satisfaction rating",
      "Maintained 96% event success rate through detailed planning",
    ],
    liveUrl: "https://richyplanner.vercel.app",
    githubUrl: "https://github.com/A-Gaoba/richy-planner",
    featured: false,
  },
  {
    id: 10,
    title: "Sara Alhassany",
    subtitle: "Photography Portfolio & Booking Site",
    description:
      "A professional photography portfolio and booking website, featuring gallery showcase, booking system, and client testimonials. Achieved +45% booking increase through enhanced portfolio presentation and streamlined booking process.",
    longDescription:
      "Sara Alhassany is a photography portfolio and booking website designed to showcase photographic work and facilitate client bookings. The platform features beautiful image galleries, detailed service descriptions, online booking system, and client testimonials. The design emphasizes visual appeal and professional presentation.",
    image: "/projectsImages/sara.png",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Booking API", "Cloudinary"],
    category: "Portfolio",
    year: "2023",
    status: "Live",
    metrics: [
      { label: "Booking Increase", value: "+45%", icon: <TrendingUp className="w-4 h-4" /> },
      { label: "Gallery Views", value: "30K+", icon: <Award className="w-4 h-4" /> },
      { label: "Client Satisfaction", value: "4.9/5", icon: <Star className="w-4 h-4" /> },
      { label: "Session Success Rate", value: "99%", icon: <Users className="w-4 h-4" /> },
    ],
    challenges: [
      "Showcasing photography work with optimal visual presentation",
      "Managing session booking and scheduling system",
      "Implementing service packages and pricing",
      "Building client trust through portfolio and testimonials",
    ],
    solutions: [
      "Created stunning image galleries with optimized loading and display",
      "Built comprehensive booking system with session scheduling",
      "Developed service package presentation with clear pricing",
      "Added detailed client testimonials and session reviews",
    ],
    results: [
      "Increased bookings by 45% through enhanced portfolio presentation",
      "Generated 30K+ gallery views within first quarter",
      "Achieved 4.9/5 client satisfaction rating",
      "Maintained 99% session success rate through excellent service",
    ],
    liveUrl: "https://sara-alhassany.vercel.app",
    githubUrl: "https://github.com/A-Gaoba/sara-alhassany",
    featured: false,
  },
  {
    id: 11,
    title: "Yemen Culture",
    subtitle: "Yemeni Culture & Activities in Moscow",
    description:
      "A cultural website showcasing Yemeni culture and activities in Moscow, featuring event information, cultural content, and community engagement. Achieved +30% engagement through enhanced content presentation and community features.",
    longDescription:
      "Yemen Culture is a cultural website designed to showcase Yemeni culture and activities in Moscow. The platform features event information, cultural content, community engagement tools, and educational resources. The design emphasizes cultural authenticity and community connection while maintaining modern web standards.",
    image: "/projectsImages/yemen.png",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Contentful CMS", "Analytics"],
    category: "Public Sector",
    year: "2023",
    status: "Live",
    metrics: [
      { label: "Engagement Increase", value: "+30%", icon: <TrendingUp className="w-4 h-4" /> },
      { label: "Monthly Visitors", value: "8K+", icon: <Award className="w-4 h-4" /> },
      { label: "Event Attendance", value: "500+", icon: <Star className="w-4 h-4" /> },
      { label: "Community Growth", value: "200%", icon: <Users className="w-4 h-4" /> },
    ],
    challenges: [
      "Presenting cultural content with authenticity and respect",
      "Managing event information and community engagement",
      "Implementing multilingual support for diverse audience",
      "Building community connection and participation",
    ],
    solutions: [
      "Designed culturally authentic content presentation",
      "Built comprehensive event management and community features",
      "Implemented multilingual support with cultural sensitivity",
      "Created community engagement tools and social features",
    ],
    results: [
      "Increased community engagement by 30% within three months",
      "Generated 8K+ monthly visitors",
      "Facilitated 500+ event attendees",
      "Achieved 200% community growth through enhanced online presence",
    ],
    liveUrl: "https://yemculru.com",
    githubUrl: "https://github.com/A-Gaoba/yemen-culture",
    featured: false,
  },
  {
    id: 12,
    title: "Qesat Shalet",
    subtitle: "Venue & Café Rental for Events",
    description:
      "A professional website for venue and café rental services, featuring venue showcase, booking system, and event planning tools. Achieved +40% booking requests through enhanced venue presentation and streamlined booking process.",
    longDescription:
      "Qesat Shalet is a venue and café rental website designed to showcase available spaces and facilitate event bookings. The platform features detailed venue information, high-quality photography, booking system, and event planning tools. The design emphasizes the unique character of each venue while maintaining professional service presentation.",
    image: "/projectsImages/qesatshalet.png",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Booking API", "Cloudinary"],
    category: "Hospitality",
    year: "2023",
    status: "Live",
    metrics: [
      { label: "Booking Requests", value: "+40%", icon: <TrendingUp className="w-4 h-4" /> },
      { label: "Venue Views", value: "25K+", icon: <Award className="w-4 h-4" /> },
      { label: "Client Satisfaction", value: "4.8/5", icon: <Star className="w-4 h-4" /> },
      { label: "Event Success Rate", value: "97%", icon: <Users className="w-4 h-4" /> },
    ],
    challenges: [
      "Showcasing venue spaces with compelling visual presentation",
      "Managing complex booking and availability system",
      "Implementing event planning and customization tools",
      "Building client trust through venue presentation and testimonials",
    ],
    solutions: [
      "Created stunning venue galleries with 360° views and virtual tours",
      "Built comprehensive booking system with availability calendar",
      "Developed event planning tools with customization options",
      "Added detailed venue information and client testimonials",
    ],
    results: [
      "Increased booking requests by 40% through enhanced venue presentation",
      "Generated 25K+ venue views within first quarter",
      "Achieved 4.8/5 client satisfaction rating",
      "Maintained 97% event success rate through excellent service",
    ],
    liveUrl: "https://qesatshalet.vercel.app",
    githubUrl: "https://github.com/A-Gaoba/qesat-shalet",
    featured: false,
  },
  {
    id: 13,
    title: "GaobaVid - Video Streaming Platform",
    subtitle: "Next-Generation Video Streaming Experience",
    description:
      "A modern video streaming platform built with React and Next.js, featuring advanced video processing, user management, and responsive design. Optimized for performance with 60% faster loading times and mobile-first approach.",
    longDescription:
      "GaobaVid was designed to compete with major streaming platforms by focusing on performance and user experience. The platform features adaptive bitrate streaming, offline viewing capabilities, personalized recommendations, and social features. Built with modern web technologies, it delivers a seamless experience across all devices while maintaining optimal performance even on slower connections.",
    image: "/projectsImages/gaobavid.png",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "FFmpeg", "AWS S3", "CloudFront"],
    category: "Media Platform",
    year: "2022-2023",
    status: "Live",
    metrics: [
      { label: "Loading Speed", value: "60% Faster", icon: <TrendingUp className="w-4 h-4" /> },
      { label: "Active Viewers", value: "10K+", icon: <Users className="w-4 h-4" /> },
      { label: "Mobile Score", value: "98/100", icon: <Award className="w-4 h-4" /> },
      { label: "User Rating", value: "4.7/5", icon: <Star className="w-4 h-4" /> },
    ],
    challenges: [
      "Video processing and adaptive streaming implementation",
      "Cross-platform compatibility and responsive design",
      "Content delivery optimization for global audience",
      "User engagement and retention strategies",
    ],
    solutions: [
      "Implemented HLS streaming with multiple quality options",
      "Used CSS Grid and Flexbox for responsive layouts",
      "Leveraged CDN and edge caching for global performance",
      "Added social features and personalized recommendations",
    ],
    results: [
      "Achieved 60% faster loading compared to competitors",
      "Reached 10K+ active users within 6 months",
      "Maintained 98/100 mobile performance score",
      "Reduced bounce rate by 45% through UX improvements",
    ],
    liveUrl: "https://gaobavid.com",
    githubUrl: "https://github.com/A-Gaoba/gaoba-vid",
    featured: false,
  },
  {
    id: 14,
    title: "To Russia! Travel Platform",
    subtitle: "Comprehensive Travel Planning & Cultural Guide",
    description:
      "An intuitive travel platform providing comprehensive information about Russian destinations, cultural insights, and travel planning tools. Features multi-language support, interactive maps, and accessibility compliance with 98% score.",
    longDescription:
      "To Russia! was created to bridge the cultural gap and provide travelers with authentic, comprehensive information about Russian destinations. The platform combines travel planning tools with cultural education, featuring interactive maps, local insights, weather integration, and booking capabilities. Special attention was paid to accessibility and internationalization to serve a diverse global audience.",
    image: "/projectsImages/toru.png",
    technologies: ["React", "Next.js", "Tailwind CSS", "Mapbox", "i18next", "Weather API", "Booking APIs"],
    category: "Travel Platform",
    year: "2023",
    status: "Live",
    metrics: [
      { label: "User Engagement", value: "50% Higher", icon: <Users className="w-4 h-4" /> },
      { label: "Accessibility Score", value: "98/100", icon: <Award className="w-4 h-4" /> },
      { label: "Languages Supported", value: "5", icon: <Users className="w-4 h-4" /> },
      { label: "Monthly Visitors", value: "5K+", icon: <Star className="w-4 h-4" /> },
    ],
    challenges: [
      "Multi-language content management and localization",
      "Integration with multiple travel and weather APIs",
      "Accessibility compliance for diverse user needs",
      "Cultural sensitivity in content presentation",
    ],
    solutions: [
      "Implemented i18next for seamless localization",
      "Created unified API layer for external services",
      "Applied WCAG 2.1 AA standards throughout the platform",
      "Collaborated with cultural consultants for authentic content",
    ],
    results: [
      "Increased user engagement by 50% through cultural content",
      "Achieved 98/100 accessibility score on Lighthouse",
      "Supported 5 languages with 95% translation accuracy",
      "Generated 5K+ monthly visitors within first quarter",
    ],
    liveUrl: "https://torussia.travel",
    githubUrl: "https://github.com/A-Gaoba/to-russia",
    featured: false,
  },
  {
    id: 15,
    title: "E-Commerce Dashboard",
    subtitle: "Advanced Analytics & Management System",
    description:
      "A comprehensive e-commerce management dashboard with real-time analytics, inventory management, and customer insights. Built with React and modern data visualization libraries for optimal performance and user experience.",
    longDescription:
      "This e-commerce dashboard was designed for medium to large-scale online businesses requiring sophisticated analytics and management tools. The platform provides real-time sales tracking, inventory management, customer behavior analysis, and automated reporting. The interface is designed for efficiency, allowing managers to quickly access critical business metrics and make data-driven decisions.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["React", "Next.js", "TypeScript", "Chart.js", "Prisma", "PostgreSQL", "Redis"],
    category: "Business Application",
    year: "2023",
    status: "Live",
    metrics: [
      { label: "Data Processing", value: "Real-time", icon: <TrendingUp className="w-4 h-4" /> },
      { label: "Dashboard Load", value: "< 2s", icon: <Award className="w-4 h-4" /> },
      { label: "Active Merchants", value: "100+", icon: <Users className="w-4 h-4" /> },
      { label: "Uptime", value: "99.9%", icon: <Star className="w-4 h-4" /> },
    ],
    challenges: [
      "Real-time data processing and visualization",
      "Complex state management for large datasets",
      "Performance optimization for data-heavy operations",
      "Scalable architecture for growing user base",
    ],
    solutions: [
      "Implemented WebSocket connections for real-time updates",
      "Used Redux Toolkit for efficient state management",
      "Applied data virtualization and lazy loading techniques",
      "Designed microservices architecture with caching layers",
    ],
    results: [
      "Achieved sub-2-second dashboard loading times",
      "Processed 1M+ data points in real-time",
      "Improved merchant decision-making speed by 60%",
      "Maintained 99.9% uptime with zero data loss",
    ],
    liveUrl: "https://dashboard-demo.com",
    githubUrl: "https://github.com/A-Gaoba/ecommerce-dashboard",
    featured: false,
  },
]

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="projects" className="  bg-dark-bg text-dev-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dev-text">
            My <span className="text-syntax-green">Projects</span>
          </h2>
          <p className="text-xl md:text-2xl text-dev-text-muted max-w-3xl mx-auto leading-relaxed">
            A showcase of my work, from full-stack applications to innovative solutions.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border overflow-hidden hover:shadow-dev-lg hover:border-syntax-blue transition-all duration-300 cursor-pointer"
              variants={itemVariants}
              onClick={() => openModal(project)}
            >
              <div className="relative h-52 w-full">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {project.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-syntax-orange to-syntax-pink text-dark-bg rounded-full text-xs font-semibold flex items-center">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-dev-text mb-2">{project.title}</h3>
                <p className="text-dev-text-muted text-sm mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-dark-bg-tertiary text-dev-text-muted text-xs rounded-full font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedProject && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="w-[95vw] max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw] lg:max-w-[75vw] xl:max-w-[70vw] 2xl:max-w-[65vw] max-h-[90vh] bg-dark-bg-secondary text-dev-text border-dark-border p-0 overflow-hidden">
            <DialogHeader className="relative">
              <Image
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                width={800}
                height={400}
                className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg-secondary to-transparent" />
              <DialogTitle className="absolute bottom-4 left-4 sm:left-6 text-xl sm:text-2xl md:text-3xl font-bold text-dev-text z-10 max-w-[80%]">
                {selectedProject.title}
              </DialogTitle>
              <Button
                variant="ghost"
                onClick={closeModal}
                className="absolute top-2 sm:top-4 right-2 sm:right-4 text-dev-text-muted hover:text-dev-text hover:bg-dark-bg-tertiary p-2"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </DialogHeader>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Overview */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-dev-text mb-3 sm:mb-4">Overview</h3>
                <p className="text-sm sm:text-base text-dev-text-muted leading-relaxed">{selectedProject.longDescription}</p>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-dev-text mb-3 sm:mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 sm:px-4 py-1 sm:py-2 bg-dark-bg-tertiary text-dev-text-muted rounded-full font-semibold text-xs sm:text-sm font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Metrics */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-dev-text mb-3 sm:mb-4">Key Results & Metrics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {selectedProject.metrics.map((metric, index) => (
                    <div key={index} className="flex items-center p-3 sm:p-4 bg-dark-bg-tertiary rounded-lg">
                      <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-syntax-green text-dark-bg rounded-full mr-3">
                        {metric.icon}
                      </div>
                      <div>
                        <div className="font-bold text-dev-text text-base sm:text-lg">{metric.value}</div>
                        <div className="text-dev-text-muted text-xs sm:text-sm">{metric.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenges & Solutions */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-dev-text mb-3 sm:mb-4">Challenges & Solutions</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-semibold text-dev-text mb-2 flex items-center text-sm sm:text-base">
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-syntax-red mr-2" /> Challenges
                    </h4>
                    <ul className="list-disc list-inside text-dev-text-muted space-y-1 sm:space-y-2 text-sm sm:text-base">
                      {selectedProject.challenges.map((challenge, index) => (
                        <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-dev-text mb-2 flex items-center text-sm sm:text-base">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-syntax-green mr-2" /> Solutions
                    </h4>
                    <ul className="list-disc list-inside text-dev-text-muted space-y-1 sm:space-y-2 text-sm sm:text-base">
                      {selectedProject.solutions.map((solution, index) => (
                        <li key={index}>{solution}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-dev-text mb-3 sm:mb-4">Achieved Results</h3>
                <ul className="list-disc list-inside text-dev-text-muted space-y-1 sm:space-y-2 text-sm sm:text-base">
                  {selectedProject.results.map((result, index) => (
                    <li key={index}>{result}</li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 border-t border-dark-border">
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-syntax-blue to-syntax-green text-dark-bg rounded-xl font-semibold hover:from-syntax-green hover:to-syntax-cyan transition-all duration-300 shadow-glow-primary hover:shadow-glow-secondary text-sm sm:text-base"
                >
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  View Live Project
                </a>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-dark-bg-tertiary border-2 border-dark-border text-dev-text-muted rounded-xl hover:border-syntax-blue hover:text-syntax-blue hover:bg-dark-bg-secondary transition-all duration-300 font-semibold shadow-dev-md hover:shadow-dev-lg text-sm sm:text-base"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  View Source Code
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  )
}

// --- export ---------------------------------------------------------------
export default Projects
