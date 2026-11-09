/**
 * English dictionary — the reference shape for every language (messages/ar.ts must match it; TypeScript checks).
 *
 * Rules (2026-11-07):
 * - No invented facts in any language: translations restate the English text, nothing more.
 * - Brand, product and technology names stay in Latin script (React, Next.js, Naqla Tech, GaobaVid…).
 * - Data whose English text lives next to its component (projects, services) is translated with an *overlay*
 *   keyed by id: English needs none (`{}`), other languages override only the text fields.
 * - New sections (e.g. GAOBA AI Resources, digital products) add a new top-level namespace here and in ar.ts.
 */

type TextOverlay<T> = Partial<Record<string, T>>

export type ProjectText = {
  title?: string
  subtitle?: string
  description?: string
  longDescription?: string
  challenges?: string[]
  solutions?: string[]
}
export type ServiceText = {
  title?: string
  subtitle?: string
  description?: string
  features?: string[]
  technologies?: string[]
  timeline?: string
}
export type StepText = { title?: string; subtitle?: string; description?: string; activities?: string[] }

const en = {
  meta: {
    siteName: "Abdulrahman Gaoba",
    defaultTitle: "Abdulrahman Gaoba - Full Stack Developer & UI/UX Designer",
    titleTemplate: "%s | Abdulrahman Gaoba",
    description:
      "Abdulrahman Gaoba (عبد الرحمن قوبع) is a full stack developer building web applications with React, Next.js, Node.js and modern web technologies.",
    ogAlt: "Abdulrahman Gaoba - Full Stack Developer & UI/UX Designer",
    keywords: [
      "Abdulrahman Gaoba",
      "Full Stack Developer",
      "React Developer",
      "Next.js Developer",
      "Node.js Developer",
      "UI/UX Designer",
      "Web Development",
      "JavaScript",
      "TypeScript",
      "Freelance Developer",
      "عبد الرحمن قوبع",
      "مطور ويب",
      "مطور واجهات",
      "مبرمج مواقع",
      "تطوير مواقع إلكترونية",
      "مطور Full Stack",
    ],
    jobTitle: "Full Stack Developer",
    pages: {
      home: {
        title: "Abdulrahman Gaoba - Full Stack Developer & UI/UX Designer | Portfolio",
        description:
          "Portfolio of Abdulrahman Gaoba (عبد الرحمن قوبع), a full stack developer building web applications with React, Next.js and Node.js.",
      },
      about: {
        title: "About Abdulrahman Gaoba | Full Stack Developer & Startup Founder",
        description:
          "About Abdulrahman Gaoba (عبد الرحمن قوبع): education in software engineering, work as a full stack developer, and the founding of Naqla Tech.",
      },
      projects: {
        title: "Projects Portfolio | Abdulrahman Gaoba - Full Stack Developer",
        description:
          "Web projects built by Abdulrahman Gaoba (عبد الرحمن قوبع): e-commerce stores, business and portfolio websites, and web platforms built with React and Next.js.",
        jsonLdName: "Projects by Abdulrahman Gaoba",
      },
      skills: {
        title: "Skills - Abdulrahman Gaoba",
        description: "Technical skills of Abdulrahman Gaoba in full stack web development.",
        jsonLdName: "Technical skills of Abdulrahman Gaoba",
      },
      services: {
        title: "My Services - Abdulrahman Gaoba",
        description:
          "Explore the comprehensive web development services offered by Abdulrahman Gaoba, specializing in React, Next.js, and full-stack solutions.",
        keywords:
          "web development services, React development, Next.js services, full-stack development, UI/UX services, performance optimization, PWA development",
      },
      contact: {
        title: "Contact Abdulrahman Gaoba | Full Stack Developer & UI/UX Designer",
        description:
          "Contact Abdulrahman Gaoba (عبد الرحمن قوبع) about web development and UI/UX projects: send a message or book a call.",
        jsonLdName: "Contact Abdulrahman Gaoba",
      },
      resources: {
        title: "GAOBA AI Resources — Free Guides for AI Tools",
        description:
          "Free, practical guides from GAOBA AI for using AI tools such as Claude Code, each crediting the original project and its license.",
        jsonLdName: "GAOBA AI Resources",
      },
    },
  },

  common: {
    featured: "Featured",
    sourceCode: "Source code",
    close: "Close",
    photoAlt: "Abdulrahman Gaoba - Full Stack Software Engineer",
    role: "Full Stack Software Engineer & Startup Founder",
    location: "Moscow, Russia",
  },

  nav: {
    label: "Main",
    homeLabel: "Abdulrahman Gaoba — home",
    home: "Home",
    about: "About",
    projects: "Projects",
    skills: "Skills",
    services: "Services",
    resources: "Resources",
    contact: "Contact",
    cta: "Let's talk",
    openMenu: "Open main menu",
    closeMenu: "Close main menu",
    language: "Language",
  },

  theme: {
    toLight: "Switch to light theme",
    toDark: "Switch to dark theme",
    light: "Light theme",
    dark: "Dark theme",
  },

  hero: {
    kicker: "whoami · Abdulrahman Gaoba",
    greeting: "Hi, I'm",
    name: "Abdulrahman",
    roleLabel: "role =",
    roles: ["Full Stack Developer", "React.js Expert", "Next.js Specialist", "UI/UX Designer", "Problem Solver"],
    introBefore: "Passionate about creating exceptional web experiences with ",
    introAnd: ", ",
    introAfter: ", and modern technologies. Turning complex problems into elegant solutions.",
    stackLabel: "Main technologies",
    ctaWork: "View My Work",
    ctaContact: "Get In Touch",
    connect: "Connect",
    email: "Email",
    scroll: "Scroll down",
  },

  home: {
    about: {
      kicker: "About Me",
      title: "From Academic Excellence to",
      titleMark: "Startup Success",
      subtitle: "Transforming Ideas Into",
      subtitleMark: "Digital Excellence",
      p1: "Honors Software Engineering graduate (GPA 4.8) with strong full-stack skills and over a year of experience creating responsive, user-centered web applications. Skilled in building seamless front-end interfaces and robust back-end systems to deliver high-quality, scalable solutions.",
      p2Before: "As the founder of ",
      p2After:
        ", I have built a technology startup that delivers complete digital solutions — including full-stack web applications, mobile apps, backend systems, bots, and AI automation tools. At Naqla Tech, we focus on transforming complex business needs into elegant, functional digital products using modern technologies such as React, Next.js, Tailwind CSS, and scalable backend architectures. Our work covers everything from custom app development to intelligent automation workflows that enhance business processes.",
      cta: "Read My Full Story",
    },
    projects: {
      kicker: "Featured Work",
      title: "Transforming Ideas Into",
      titleMark: "Digital Excellence",
      lede: "Showcasing high-impact projects that demonstrate technical expertise and measurable business results.",
      viewLive: "View Live",
      cta: "View All Projects & Case Studies",
      overlay: {} as TextOverlay<ProjectText>,
    },
    skills: {
      kicker: "Technical Expertise",
      title: "Comprehensive Technical",
      titleMark: "Expertise & Mastery",
      categories: [
        { title: "Frontend Excellence", skills: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "JavaScript ES6+"] },
        { title: "Full-Stack Development", skills: ["Node.js", "Express.js", "REST APIs", "GraphQL", "Microservices"] },
        { title: "Database & Backend", skills: ["MongoDB", "PostgreSQL", "Prisma ORM", "Redis", "AWS"] },
        { title: "Performance & Tools", skills: ["Performance Optimization", "SEO", "Testing", "CI/CD", "Docker"] },
      ],
      ctaKicker: "Technical Excellence",
      ctaTitle: "Technologies Mastered",
      ctaTitleMark: "Across Full Stack",
      ctaText:
        "From frontend excellence to full-stack capabilities, I deliver robust, scalable solutions using modern technologies and best practices.",
      ctaButton: "Explore All Skills & Certifications",
    },
    services: {
      kicker: "Services & Solutions",
      title: "Comprehensive Web Development",
      titleMark: "Services & Solutions",
      lede: "Professional web development services to bring your ideas to life with modern technologies and proven results.",
      items: [
        {
          title: "Custom Web Applications",
          description: "Full-stack solutions with React, Next.js, and modern technologies tailored to your business needs.",
          features: ["React & Next.js Development", "Database Integration", "API Development", "Performance Optimization"],
        },
        {
          title: "Frontend Architecture",
          description: "Transform designs into pixel-perfect, interactive interfaces with optimal performance standards.",
          features: ["Responsive Design", "Component Libraries", "Design Systems", "Accessibility Compliance"],
        },
        {
          title: "Performance Optimization",
          description:
            "Enhance your application's speed, SEO, and user experience through advanced optimization techniques.",
          features: ["Core Web Vitals", "Bundle Optimization", "SEO Enhancement", "Performance Monitoring"],
        },
        {
          title: "Progressive Web Apps",
          description: "Create app-like experiences on the web with offline functionality and native device features.",
          features: ["Offline Functionality", "Push Notifications", "App Store Deployment", "Native Features"],
        },
      ],
      ctaTitle: "Ready to Start Your Project?",
      ctaText:
        "Let's discuss how I can help bring your vision to life with modern web technologies and proven development practices.",
      ctaPrimary: "Explore All Services",
      ctaSecondary: "Get Free Consultation",
    },
    contact: {
      kicker: "Let's Work Together",
      title: "Ready to Start Your",
      titleMark: "Next Project?",
      lede: "Let's discuss how I can help bring your vision to life with modern web technologies.",
      methodsTitle: "Get In Touch",
      methodsText: "Choose the best way to reach out. I'm always excited to discuss new projects and opportunities.",
      emailTitle: "Email Me",
      emailText: "Write to me directly",
      callTitle: "Book a Call",
      callText: "Schedule a 30-minute call on Calendly",
      callAction: "Schedule Meeting",
      formTitle: "Send a Quick Message",
      formMessageLabel: "Project Details",
      formMessagePlaceholder: "Tell me about your project...",
      formFootBefore: "Or",
      formFootLink: "visit the full contact page",
      formFootAfter: "for more options",
      cta: "Explore All Contact Options",
    },
  },

  form: {
    serviceLabel: "Service (optional)",
    serviceNone: "General inquiry",
    /** Keys are the service slugs used in /contact?service=… links (app/components/Services.tsx). */
    services: {
      "web-apps": "Custom Web Application Development",
      frontend: "Frontend Architecture & UI/UX Implementation",
      performance: "Performance Optimization & Core Web Vitals",
      pwa: "Progressive Web App Development",
      consulting: "Code Review & Technical Consulting",
      modernization: "Legacy System Modernization",
    },
    nameLabel: "Your Name",
    namePlaceholder: "Your name",
    emailLabel: "Your Email",
    messageLabel: "Your Message",
    messagePlaceholder: "Tell me about your project or inquiry...",
    honeypot: "Leave this field empty",
    send: "Send Message",
    sending: "Sending...",
    success: "Message sent successfully! I'll get back to you soon.",
    errorRequired: "Please fill in all required fields.",
    errorEmail: "Please enter a valid email address.",
    errorStatus: "The message could not be sent (status {status}). Please try again.",
    errorGeneric: "Failed to send message. Please try again.",
  },

  aboutPage: {
    basedIn: "Based in Moscow, Russia",
    p2Before: "As the founder of ",
    p2After:
      ", a technology startup, I deliver end-to-end digital solutions including web and mobile development, backend systems, bots, and AI automation. I combine entrepreneurial experience with technical expertise in React, Next.js, and Tailwind CSS to build practical, high-quality products for real business needs.",
  },

  about: {
    title: "About",
    titleMark: "Me",
    lede: "My journey began with a passion for building things that matter. From academic excellence in software engineering to launching a successful tech startup, I’ve always believed that great code can change the world. Today, as a Full Stack Software Engineer and founder, I blend technical mastery with a relentless drive for impact—crafting digital solutions that empower users and businesses alike.",
    glanceLabel: "At a glance",
    glance: [
      ["Role", "Full Stack Software Engineer & Startup Founder"],
      ["Company", "Founder of Naqla Tech"],
      ["Studying", "Master's in Data-Driven Management, RUDN University"],
      ["Degree", "BSc in Software Engineering, Ufa University of Science and Technology"],
      ["Languages", "Saint Petersburg Mining University (Russian), Sana'a University (English)"],
      ["Based in", "Moscow, Russia"],
    ] as [string, string][],
    /** "{count}" = where the unverified "50+ " goes (hidden while SHOW_UNVERIFIED_CLAIMS is false). */
    story: [
      "My journey began with a love for technology and a drive to solve real-world problems. I graduated with honors from Ufa University of Science and Technology (BSc in Software Engineering, GPA 4.8), after mastering Russian at Saint Petersburg Mining University (GPA 5) and building a strong foundation in English at Sana'a University (GPA 4). Now, I’m pursuing a Master’s in Data-Driven Management at RUDN University in Moscow, deepening my expertise at the intersection of tech and business.",
      "Along the way, I founded Naqla Tech, a technology startup delivering end-to-end digital solutions, including web and mobile development, backend systems, bots, and AI automation. As founder and lead developer, I was responsible for product design, full-stack development, deployment, and continuous iteration, gaining hands-on experience in scalable architecture, user onboarding, and technical decision-making.",
      "As a freelance full-stack developer, I’ve delivered {count}modern web solutions for clients in logistics, education, SaaS, and e-commerce. I specialize in React, Next.js, Tailwind CSS, and Node.js, always focusing on performance, SEO, and user experience. My remote collaborations include building and maintaining production-ready apps for international clients like JunziTech Solutions.",
      "Previously, as a Frontend Developer at CereSoftware, I built responsive, accessible interfaces with React and Tailwind CSS, improved code performance, and played a key role in agile development cycles and direct client communications.",
    ],
    experienceTitle: "Work",
    experienceMark: "Experience",
    jobs: [
      {
        role: "Founder & Lead Developer",
        company: "Naqla Tech",
        period: "Jan 2025 – Present",
        bullets: [
          "Founded and led the development of a technology startup delivering end-to-end digital solutions, including web and mobile applications, bots, and automation tools.",
          "Managed the entire software lifecycle—from product design to full-stack development, deployment, and continuous iteration.",
          "Gained hands-on experience in product strategy, client-focused solution delivery, and building scalable architectures.",
        ],
      },
      {
        role: "Freelance Full-Stack Developer",
        company: "Remote",
        period: "Jan 2023 – Present",
        bullets: [
          "Delivered {count}modern web solutions for clients across logistics, education, SaaS, and e-commerce sectors.",
          "Specialized in React, Next.js, Tailwind CSS, and Node.js with a focus on performance, SEO, and UX.",
          "Collaborated remotely with international clients including JunziTech Solutions, building and maintaining production-ready applications.",
        ],
      },
      {
        role: "Frontend Developer",
        company: "CereSoftware",
        period: "Apr 2023 – Jan 2024 (Remote)",
        bullets: [
          "Built responsive, accessible user interfaces with React, Tailwind CSS, and custom API integrations.",
          "Improved code performance and client-side logic across multiple B2B websites.",
          "Played a key role in direct client communications and agile development cycles.",
        ],
      },
    ],
    pathTitle: "The Path to",
    pathMark: "Excellence",
    path: [
      { year: "2017", title: "English Language Studies", text: "Sana'a University — GPA 4" },
      { year: "2020", title: "Russian Language Prep Course", text: "Saint Petersburg Mining University — GPA 5" },
      { year: "2024", title: "BSc in Software Engineering", text: "Ufa University of Science and Technology — GPA 4.8" },
      {
        year: "2023",
        title: "Frontend Developer",
        text: "CereSoftware — Built responsive, accessible UIs and improved code performance for B2B clients.",
      },
      {
        year: "2023–Present",
        title: "Freelance Full-Stack Developer",
        text: "Delivered {count}modern web solutions for clients worldwide, specializing in React, Next.js, Tailwind CSS, and Node.js.",
      },
      {
        year: "2025–Present",
        title: "Master’s in Data-Driven Management",
        text: "RUDN University, Moscow — Exploring the intersection of technology, data, and business strategy.",
      },
    ],
    valuesTitle: "My Core",
    valuesMark: "Values",
    valuesLede: "The principles that guide my work and drive me to deliver exceptional results for every client.",
    values: [
      {
        title: "Excellence in Code",
        text: "I believe in writing clean, scalable, and maintainable code—because excellence in engineering is the foundation of every great product.",
      },
      {
        title: "User-Centric Design",
        text: "Every solution I build starts with the user. I strive to create intuitive, accessible, and delightful experiences that solve real problems.",
      },
      {
        title: "Continuous Learning",
        text: "Technology never stands still, and neither do I. I’m committed to learning, growing, and staying at the forefront of my field.",
      },
      {
        title: "Business Impact",
        text: "I measure success by the value I create for users and businesses—delivering solutions that drive growth, efficiency, and real-world results.",
      },
    ],
  },

  projects: {
    kicker: "Selected work",
    title: "My",
    titleMark: "Projects",
    lede: "A showcase of my work, from full-stack applications to innovative solutions.",
    overview: "Overview",
    technologies: "Technologies Used",
    metrics: "Key Results & Metrics",
    challengesSolutions: "Challenges & Solutions",
    challenges: "Challenges",
    solutions: "Solutions",
    results: "Achieved Results",
    viewLive: "View Live Project",
    viewSource: "View Source Code",
    overlay: {} as TextOverlay<ProjectText>,
  },

  skills: {
    kicker: "Skills & certifications",
    titleBefore: "My ",
    titleMark: "Skills",
    titleAfter: " & Expertise",
    lede: "A comprehensive overview of my technical proficiencies and certifications.",
    stack: "Technical Stack",
    categories: {
      Languages: "Languages",
      Frontend: "Frontend",
      Backend: "Backend",
      Database: "Database",
      Tools: "Tools",
      Testing: "Testing",
      Practices: "Practices",
    },
    certifications: "Certifications",
    certs: [
      { name: "Introduction to Artificial Intelligence", issuer: "Ufa State Aviation Technical University" },
      { name: "Data Analytics", issuer: "Ufa University of Science and Technology" },
    ],
  },

  services: {
    kicker: "Services & Expertise",
    title: "Comprehensive Web Development",
    titleMark: "Services & Solutions",
    lede: "Comprehensive web development services to bring your ideas to life with modern technologies and best practices, specializing in React, Next.js, and Tailwind CSS excellence.",
    mostPopular: "Most Popular",
    startingFrom: "Starting from",
    included: "What's Included",
    technologies: "Technologies Used",
    cardCta: "Get Started with This Service",
    processTitle: "My Development Process",
    processLede:
      "A structured approach ensuring quality, transparency, and successful project delivery with regular communication and milestone tracking.",
    step: "Step",
    activities: "Key Activities",
    whyKicker: "Why Choose Me",
    whyTitle: "Frontend Mastery Meets",
    whyTitleAccent: "Full-Stack Excellence",
    whyText:
      "With deep expertise in React, Next.js, and Tailwind CSS, combined with full-stack capabilities and startup founder experience, I deliver solutions that not only look exceptional but drive real business results.",
    why: [
      { number: "React Expert", label: "Frontend Mastery", description: "Advanced React patterns & optimization" },
      { number: "Full-Stack", label: "Complete Solutions", description: "Frontend to backend integration" },
    ],
    finalCta: "Get Started Today",
    overlay: {} as TextOverlay<ServiceText>,
    stepsOverlay: {} as TextOverlay<StepText>,
  },

  contact: {
    kicker: "Contact",
    title: "Let's Build Something",
    titleMark: "Amazing",
    lede: "Have a project in mind or just want to say hello? Feel free to reach out!",
    formTitle: "Send Me a Message",
    detailsTitle: "My Contact Details",
    connectTitle: "Connect with Me",
    email: "Email",
    phone: "Phone",
    location: "Location",
    meeting: "Schedule a Meeting",
    meetingAction: "Book on Calendly",
    whatsappAction: "Chat on WhatsApp",
  },

  footer: {
    kicker: "Have a project in mind?",
    titleBefore: "Let's build something ",
    titleAccent: "great",
    titleAfter: " together.",
    cta: "Start a conversation",
    tagline: "Building exceptional web experiences with a focus on performance, scalability, and user satisfaction.",
    quickLinks: "Quick Links",
    contactInfo: "Contact Info",
    links: { about: "About Me", projects: "Projects", skills: "Skills & Certifications", services: "Services", resources: "Resources" },
    copyright: "Abdulrahman Gaoba. All rights reserved.",
  },

  /** /resources and /resources/[slug]. Per-resource texts live in content/resources.ts. */
  resources: {
    kicker: "GAOBA AI Resources",
    title: "Free guides",
    titleMark: "you can use today",
    lede: "Practical guides for AI tools, written by GAOBA AI. When a guide is about someone else's project, the original author, license and link are named on the page.",
    categories: { guide: "Guide", template: "Template", tool: "Tool", checklist: "Checklist" },
    viewDetails: "View details",
    viewPdf: "Open PDF",
    download: "Download PDF",
    viewSource: "Original project on GitHub",
    back: "All resources",
    sourceTitle: "Original project",
    by: "by",
    license: "{license} license",
    preparedBy: "This guide was prepared by {name}.",
    notOurs: "GAOBA AI did not develop this project; it belongs to its author. The guide only explains how to use it.",
    contentsTitle: "What's inside",
    requirementsTitle: "What you need",
    detailsTitle: "File details",
    format: "Format",
    pages: "Pages",
    size: "Size",
    language: "Language",
    published: "Published",
    inAppHint: "If the PDF does not open inside Instagram, tap ⋯ (top corner) and choose “Open in browser”.",
    empty: "New resources are coming soon.",
    extrasTitle: "Extra files",
    downloadZip: "Download ZIP",
    zipContains: "Contains",
    benefitsTitle: "What you get",
    rulesTitle: "The rules",
    rule: "Rule {n}",
    toolsTitle: "Claude Code and Cursor",
    toolsLede: "Where each tool fits into the rules.",
    promptLabel: "Copy & paste",
    copy: "Copy",
    copied: "Copied",
    downloadTitle: "Keep the guide with you",
    downloadText: "Every rule and prompt on this page, in one PDF to keep on your phone or computer.",
    tiersTitle: "Models by RAM",
    modelSize: "Size",
    modelPage: "Model page",
    runCommand: "Run command",
    guideDownloadText: "Everything on this page, in one PDF to keep on your phone or computer.",
  },

  notFound: {
    title: "Page not found",
    text: "The page you are looking for does not exist or has moved.",
    back: "Back to home",
  },
}

export type Messages = typeof en
export default en
