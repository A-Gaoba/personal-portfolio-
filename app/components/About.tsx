"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Award, Users, Code, TrendingUp, Sparkles, Briefcase, BookOpen } from "lucide-react"
import { unverified } from "@/lib/claims" // Phase 0a: "50+" hidden until confirmed (open question B6)

export default function About() {
  const stats = [
    {
      number: "4.8/5",
      label: "Academic GPA",
      description: "Software Engineering Excellence",
      icon: <Award className="w-6 h-6" />,
    },
    {
      number: "1000+",
      label: "Users Served",
      description: "Through Naqla Tech Platform",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "50+",
      label: "Projects Built",
      description: "Across Various Industries",
      icon: <Code className="w-6 h-6" />,
    },
    {
      number: "5+",
      label: "Years Experience",
      description: "Full-Stack Development",
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ]

  // Update timeline to reflect new education and experience
  const timeline = [
    {
      year: "2020",
      title: "Preparatory Courses (Russian Language)",
      description: "Saint Petersburg Mining University — GPA 5",
      icon: <BookOpen className="w-5 h-5" />,
      color: "from-syntax-blue to-syntax-cyan",
    },
    {
      year: "2024",
      title: "BSc in Software Engineering",
      description: "Ufa University of Science and Technology — GPA 4.8",
      icon: <Award className="w-5 h-5" />,
      color: "from-syntax-green to-syntax-cyan",
    },
    {
      year: "2017",
      title: "English Language",
      description: "University of Sana'a — GPA 4",
      icon: <BookOpen className="w-5 h-5" />,
      color: "from-syntax-purple to-syntax-pink",
    },
    {
      year: "2023–Present",
      title: "Frontend Developer at CereSoftware",
      description: "Built responsive websites, integrated APIs, managed client communication. Remote, Yemen.",
      icon: <Briefcase className="w-5 h-5" />,
      color: "from-syntax-orange to-syntax-red",
    },
  ]

  const values = [
    {
      title: "Excellence in Code",
      description: "I believe in writing clean, maintainable, and scalable code that stands the test of time.",
      icon: "💎",
    },
    {
      title: "User-Centric Design",
      description: "Every solution I create prioritizes user experience and accessibility for all users.",
      icon: "🎯",
    },
    {
      title: "Continuous Learning",
      description: "Technology evolves rapidly, and I stay current with the latest trends and best practices.",
      icon: "📚",
    },
    {
      title: "Business Impact",
      description: "My entrepreneurial background helps me understand and deliver real business value.",
      icon: "🚀",
    },
  ]

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
    <section id="about-page" className="py-16 sm:py-20 lg:py-24 bg-dark-bg text-dev-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dev-text">
            About <span className="text-cyan-300">Me</span>
          </h2>
          <p className="text-xl md:text-2xl text-dev-text-muted max-w-3xl mx-auto leading-relaxed">
            My journey began with a passion for building things that matter. From academic excellence in software engineering to launching a successful tech startup, I’ve always believed that great code can change the world. Today, as a Full Stack Software Engineer and founder, I blend technical mastery with a relentless drive for impact—crafting digital solutions that empower users and businesses alike.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Profile Image */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[28rem] lg:h-[28rem] hidden md:flex">
              {/* Animated Background Ring */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-40"
                style={{
                  background: "conic-gradient(from 0deg, #98c379, #61afef, #c678dd, #d19a66, #98c379)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              {/* Profile Image */}
              <motion.div
                className="absolute inset-8 bg-dark-bg-secondary rounded-full shadow-dev-lg overflow-hidden border-4 border-dark-border/50 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src="/myimage.jpeg"
                  alt="Abdulrahman Gaoba - Full Stack Software Engineer"
                  width={448}
                  height={448}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  priority
                />
              </motion.div>

              {/* Achievement Badges */}
              {[
                { icon: "🎓", position: "top-8 -left-8", label: "4.8/5 GPA" },
                { icon: "🚀", position: "top-16 -right-8", label: "Startup Founder" },
                { icon: "💼", position: "bottom-16 -left-12", label: "5+ Years Exp" },
                { icon: "⚡", position: "bottom-8 -right-4", label: "React Expert" },
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  className={`absolute ${badge.position} group cursor-pointer`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 + 1, duration: 0.5 }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-dark-bg-secondary/90 backdrop-blur-sm p-3 rounded-2xl shadow-dev-md border border-dark-border/50 group-hover:shadow-dev-lg transition-all duration-300">
                    <div className="text-2xl">{badge.icon}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="space-y-4 text-lg text-dev-text-muted leading-relaxed"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-dark-bg-secondary/70 border border-dark-border text-syntax-green rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4 mr-2" />
              Full Stack Software Engineer & Startup Founder
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-dev-text leading-tight">
              Transforming Ideas Into
              <span className="bg-gradient-to-r from-syntax-green to-syntax-blue bg-clip-text text-transparent">
                {" "}
                Digital Excellence
              </span>
            </h3>

            <div className="space-y-4 text-lg text-dev-text-muted leading-relaxed">
              <p>
                My journey began with a love for technology and a drive to solve real-world problems. I graduated with honors from Ufa University of Science and Technology (BSc in Software Engineering, GPA 4.8), after mastering Russian at Saint Petersburg Mining University (GPA 5) and building a strong foundation in English at University of Sana’a (GPA 4). Now, I’m pursuing a Master’s in Data-Driven Management at RUDN University in Moscow, deepening my expertise at the intersection of tech and business.
              </p>
              <p>
                Along the way, I founded Naqla Tech, a technology startup delivering end-to-end digital solutions, including web and mobile development, backend systems, bots, and AI automation. As founder and lead developer, I was responsible for product design, full-stack development, deployment, and continuous iteration, gaining hands-on experience in scalable architecture, user onboarding, and technical decision-making.
              </p>
              <p>
                As a freelance full-stack developer, I’ve delivered {unverified("50+ ")}modern web solutions for clients in logistics, education, SaaS, and e-commerce. I specialize in React, Next.js, Tailwind CSS, and Node.js, always focusing on performance, SEO, and user experience. My remote collaborations include building and maintaining production-ready apps for international clients like JunziTech Solutions.
              </p>
              <p>
                Previously, as a Frontend Developer at CereSoftware, I built responsive, accessible interfaces with React and Tailwind CSS, improved code performance, and played a key role in agile development cycles and direct client communications.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Work Experience */}
        <div className="text-center mt-24 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dev-text mb-6">
            Work <span className="text-cyan-300">Experience</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          <motion.div
            className="bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h4 className="text-xl font-bold text-dev-text mb-2">Founder & Lead Developer</h4>
            <p className="text-syntax-green text-lg mb-2">Naqla Tech</p>
            <p className="text-dev-text-muted text-sm mb-4">Jan 2025 – Present</p>
            <ul className="list-disc list-inside text-dev-text-subtle space-y-1">
              <li>Founded and led the development of a technology startup delivering end-to-end digital solutions, including web and mobile applications, bots, and automation tools.</li>
              <li>Managed the entire software lifecycle—from product design to full-stack development, deployment, and continuous iteration.</li>
              <li>Gained hands-on experience in product strategy, client-focused solution delivery, and building scalable architectures.</li>
            </ul>
          </motion.div>
          <motion.div
            className="bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h4 className="text-xl font-bold text-dev-text mb-2">Freelance Full-Stack Developer</h4>
            <p className="text-syntax-green text-lg mb-2">Remote</p>
            <p className="text-dev-text-muted text-sm mb-4">Jan 2023 – Present</p>
            <ul className="list-disc list-inside text-dev-text-subtle space-y-1">
              <li>Delivered {unverified("50+ ")}modern web solutions for clients across logistics, education, SaaS, and e-commerce sectors.</li>
              <li>Specialized in React, Next.js, Tailwind CSS, and Node.js with a focus on performance, SEO, and UX.</li>
              <li>Collaborated remotely with international clients including JunziTech Solutions, building and maintaining production-ready applications.</li>
            </ul>
          </motion.div>
          <motion.div
            className="bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h4 className="text-xl font-bold text-dev-text mb-2">Frontend Developer</h4>
            <p className="text-syntax-green text-lg mb-2">CereSoftware</p>
            <p className="text-dev-text-muted text-sm mb-4">Apr 2023 – Jan 2024 (Remote)</p>
            <ul className="list-disc list-inside text-dev-text-subtle space-y-1">
              <li>Built responsive, accessible user interfaces with React, Tailwind CSS, and custom API integrations.</li>
              <li>Improved code performance and client-side logic across multiple B2B websites.</li>
              <li>Played a key role in direct client communications and agile development cycles.</li>
            </ul>
          </motion.div>
        </div>

        {/* Path to Excellence */}
        <div className="text-center mt-24 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dev-text mb-6">
            The Path to <span className="text-cyan-300">Excellence</span>
          </h2>
        </div>
        <div className="space-y-12 mb-24">
          <motion.div
            className="relative flex items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="hidden md:flex items-center justify-center w-16 h-16 bg-dark-bg-secondary rounded-full shadow-dev-md border-4 border-dark-border relative z-10">
              <div className="p-3 bg-gradient-to-r from-syntax-blue to-syntax-cyan rounded-full text-dark-bg"><BookOpen className="w-5 h-5" /></div>
            </div>
            <div className="md:ml-8 bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border flex-1 p-6">
              <div className="flex items-center mb-4">
                <div className="md:hidden p-3 bg-gradient-to-r from-syntax-blue to-syntax-cyan rounded-full text-dark-bg mr-4"><BookOpen className="w-5 h-5" /></div>
                <div>
                  <div className="text-sm font-semibold text-syntax-green mb-1">2017</div>
                  <h3 className="text-xl font-bold text-dev-text">English Language Studies</h3>
                </div>
              </div>
              <p className="text-dev-text-muted leading-relaxed">University of Sana’a — GPA 4</p>
            </div>
          </motion.div>
          <motion.div
            className="relative flex items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="hidden md:flex items-center justify-center w-16 h-16 bg-dark-bg-secondary rounded-full shadow-dev-md border-4 border-dark-border relative z-10">
              <div className="p-3 bg-gradient-to-r from-syntax-blue to-syntax-cyan rounded-full text-dark-bg"><BookOpen className="w-5 h-5" /></div>
            </div>
            <div className="md:ml-8 bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border flex-1 p-6">
              <div className="flex items-center mb-4">
                <div className="md:hidden p-3 bg-gradient-to-r from-syntax-blue to-syntax-cyan rounded-full text-dark-bg mr-4"><BookOpen className="w-5 h-5" /></div>
                <div>
                  <div className="text-sm font-semibold text-syntax-green mb-1">2020</div>
                  <h3 className="text-xl font-bold text-dev-text">Russian Language Prep Course</h3>
                </div>
              </div>
              <p className="text-dev-text-muted leading-relaxed">Saint Petersburg Mining University — GPA 5</p>
            </div>
          </motion.div>
          <motion.div
            className="relative flex items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="hidden md:flex items-center justify-center w-16 h-16 bg-dark-bg-secondary rounded-full shadow-dev-md border-4 border-dark-border relative z-10">
              <div className="p-3 bg-gradient-to-r from-syntax-green to-syntax-cyan rounded-full text-dark-bg"><Award className="w-5 h-5" /></div>
            </div>
            <div className="md:ml-8 bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border flex-1 p-6">
              <div className="flex items-center mb-4">
                <div className="md:hidden p-3 bg-gradient-to-r from-syntax-green to-syntax-cyan rounded-full text-dark-bg mr-4"><Award className="w-5 h-5" /></div>
                <div>
                  <div className="text-sm font-semibold text-syntax-green mb-1">2024</div>
                  <h3 className="text-xl font-bold text-dev-text">BSc in Software Engineering</h3>
                </div>
              </div>
              <p className="text-dev-text-muted leading-relaxed">Ufa University of Science and Technology — GPA 4.8</p>
            </div>
          </motion.div>
          <motion.div
            className="relative flex items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="hidden md:flex items-center justify-center w-16 h-16 bg-dark-bg-secondary rounded-full shadow-dev-md border-4 border-dark-border relative z-10">
              <div className="p-3 bg-gradient-to-r from-syntax-orange to-syntax-red rounded-full text-dark-bg"><Briefcase className="w-5 h-5" /></div>
            </div>
            <div className="md:ml-8 bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border flex-1 p-6">
              <div className="flex items-center mb-4">
                <div className="md:hidden p-3 bg-gradient-to-r from-syntax-orange to-syntax-red rounded-full text-dark-bg mr-4"><Briefcase className="w-5 h-5" /></div>
                <div>
                  <div className="text-sm font-semibold text-syntax-green mb-1">2023</div>
                  <h3 className="text-xl font-bold text-dev-text">Frontend Developer</h3>
                </div>
              </div>
              <p className="text-dev-text-muted leading-relaxed">CereSoftware — Built responsive, accessible UIs and improved code performance for B2B clients.</p>
            </div>
          </motion.div>
          <motion.div
            className="relative flex items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="hidden md:flex items-center justify-center w-16 h-16 bg-dark-bg-secondary rounded-full shadow-dev-md border-4 border-dark-border relative z-10">
              <div className="p-3 bg-gradient-to-r from-syntax-green to-syntax-blue rounded-full text-dark-bg"><TrendingUp className="w-5 h-5" /></div>
            </div>
            <div className="md:ml-8 bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border flex-1 p-6">
              <div className="flex items-center mb-4">
                <div className="md:hidden p-3 bg-gradient-to-r from-syntax-green to-syntax-blue rounded-full text-dark-bg mr-4"><TrendingUp className="w-5 h-5" /></div>
                <div>
                  <div className="text-sm font-semibold text-syntax-green mb-1">2023–Present</div>
                  <h3 className="text-xl font-bold text-dev-text">Freelance Full-Stack Developer</h3>
                </div>
              </div>
              <p className="text-dev-text-muted leading-relaxed">Delivered {unverified("50+ ")}modern web solutions for clients worldwide, specializing in React, Next.js, Tailwind CSS, and Node.js.</p>
            </div>
          </motion.div>
          <motion.div
            className="relative flex items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="hidden md:flex items-center justify-center w-16 h-16 bg-dark-bg-secondary rounded-full shadow-dev-md border-4 border-dark-border relative z-10">
              <div className="p-3 bg-gradient-to-r from-syntax-green to-syntax-blue rounded-full text-dark-bg"><BookOpen className="w-5 h-5" /></div>
            </div>
            <div className="md:ml-8 bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border flex-1 p-6">
              <div className="flex items-center mb-4">
                <div className="md:hidden p-3 bg-gradient-to-r from-syntax-green to-syntax-blue rounded-full text-dark-bg mr-4"><BookOpen className="w-5 h-5" /></div>
                <div>
                  <div className="text-sm font-semibold text-syntax-green mb-1">2025–Present</div>
                  <h3 className="text-xl font-bold text-dev-text">Master’s in Data-Driven Management</h3>
                </div>
              </div>
              <p className="text-dev-text-muted leading-relaxed">RUDN University, Moscow — Exploring the intersection of technology, data, and business strategy.</p>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="text-center mt-24 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dev-text mb-6">
            My Core <span className="text-cyan-300">Values</span>
          </h2>
          <p className="text-xl text-dev-text-muted max-w-3xl mx-auto">
            The principles that guide my work and drive me to deliver exceptional results for every client.
          </p>
        </div>
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border p-8"
            variants={itemVariants}
          >
            <div className="text-4xl mb-4">💎</div>
            <h3 className="text-xl font-bold text-dev-text mb-4">Excellence in Code</h3>
            <p className="text-dev-text-muted leading-relaxed">I believe in writing clean, scalable, and maintainable code—because excellence in engineering is the foundation of every great product.</p>
          </motion.div>
          <motion.div
            className="bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border p-8"
            variants={itemVariants}
          >
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-dev-text mb-4">User-Centric Design</h3>
            <p className="text-dev-text-muted leading-relaxed">Every solution I build starts with the user. I strive to create intuitive, accessible, and delightful experiences that solve real problems.</p>
          </motion.div>
          <motion.div
            className="bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border p-8"
            variants={itemVariants}
          >
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-dev-text mb-4">Continuous Learning</h3>
            <p className="text-dev-text-muted leading-relaxed">Technology never stands still, and neither do I. I’m committed to learning, growing, and staying at the forefront of my field.</p>
          </motion.div>
          <motion.div
            className="bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border p-8"
            variants={itemVariants}
          >
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-dev-text mb-4">Business Impact</h3>
            <p className="text-dev-text-muted leading-relaxed">I measure success by the value I create for users and businesses—delivering solutions that drive growth, efficiency, and real-world results.</p>
          </motion.div>
        </motion.div>
      </div>
    </section >
  )
}
