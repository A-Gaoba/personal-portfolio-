"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Award, Users, Code, TrendingUp, Sparkles, Briefcase, BookOpen } from "lucide-react"

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

  const timeline = [
    {
      year: "2019",
      title: "Started Software Engineering",
      description:
        "Began my journey in Software Engineering with a focus on web technologies and modern development practices.",
      icon: <BookOpen className="w-5 h-5" />,
      color: "from-syntax-blue to-syntax-cyan",
    },
    {
      year: "2021",
      title: "Founded Naqla Tech",
      description: "Launched a logistics platform that grew to serve 1000+ users and generate $50K+ in revenue.",
      icon: <Briefcase className="w-5 h-5" />,
      color: "from-syntax-green to-syntax-cyan",
    },
    {
      year: "2022",
      title: "Achieved Academic Excellence",
      description:
        "Graduated with a 4.8/5 GPA in Software Engineering, demonstrating both theoretical knowledge and practical skills.",
      icon: <Award className="w-5 h-5" />,
      color: "from-syntax-purple to-syntax-pink",
    },
    {
      year: "2023",
      title: "Full-Stack Expertise",
      description:
        "Mastered modern web technologies including React, Next.js, and cloud platforms, delivering 50+ successful projects.",
      icon: <Code className="w-5 h-5" />,
      color: "from-syntax-orange to-syntax-red",
    },
    {
      year: "2024",
      title: "Freelance Success",
      description:
        "Established a successful freelance practice, helping businesses transform their digital presence with modern web solutions.",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "from-syntax-blue to-syntax-purple",
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
            My journey from academic excellence to startup success and beyond.
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
            className="space-y-6"
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
                My journey began with a passion for creating elegant solutions to complex problems. With a{" "}
                <span className="font-semibold text-syntax-green">4.8/5 GPA in Software Engineering</span> and
                experience as a <span className="font-semibold text-syntax-blue">startup founder</span>, I bring both
                theoretical depth and real-world business insight to every project.
              </p>

              <p>
                As the founder of <span className="font-semibold text-syntax-purple">Naqla Tech</span>, I scaled a
                logistics platform to serve 1000+ users and generate $50K+ in revenue. Today, I combine this
                entrepreneurial experience with technical mastery in React, Next.js, and Tailwind CSS to deliver
                exceptional web solutions.
              </p>

              <p>
                I am constantly learning and adapting to new technologies, ensuring that my skills remain at the
                forefront of the industry. My goal is to build robust, scalable, and user-friendly applications that
                make a real impact.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Experience & Education */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-dev-text flex items-center">
              <Briefcase className="w-8 h-8 mr-3 text-syntax-orange" />
              Experience
            </h3>
            <div className="space-y-6">
              <motion.div
                className="bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border p-6 hover:shadow-dev-lg hover:border-syntax-blue transition-all duration-300"
                variants={itemVariants}
              >
                <h4 className="text-xl font-bold text-dev-text">Founder & Lead Developer</h4>
                <p className="text-syntax-green text-lg mb-2">Naqla Tech</p>
                <p className="text-dev-text-muted text-sm mb-4">Jan 2020 – Present</p>
                <ul className="list-disc list-inside text-dev-text-subtle space-y-1">
                  <li>Led the development of a logistics platform serving 1000+ users.</li>
                  <li>Achieved $50K+ in annual recurring revenue.</li>
                  <li>Managed full software development lifecycle from ideation to deployment.</li>
                </ul>
              </motion.div>
              <motion.div
                className="bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border p-6 hover:shadow-dev-lg hover:border-syntax-blue transition-all duration-300"
                variants={itemVariants}
              >
                <h4 className="text-xl font-bold text-dev-text">Full Stack Developer (Freelance)</h4>
                <p className="text-syntax-green text-lg mb-2">Self-Employed</p>
                <p className="text-dev-text-muted text-sm mb-4">Jul 2018 – Present</p>
                <ul className="list-disc list-inside text-dev-text-subtle space-y-1">
                  <li>Delivered 50+ web projects for diverse clients across various industries.</li>
                  <li>Specialized in React, Next.js, Node.js, and cloud deployments.</li>
                  <li>Provided end-to-end solutions from design to deployment and maintenance.</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-dev-text flex items-center">
              <BookOpen className="w-8 h-8 mr-3 text-syntax-cyan" />
              Education
            </h3>
            <div className="space-y-6">
              <motion.div
                className="bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border p-6 hover:shadow-dev-lg hover:border-syntax-green transition-all duration-300"
                variants={itemVariants}
              >
                <h4 className="text-xl font-bold text-dev-text">B.Sc. in Software Engineering</h4>
                <p className="text-syntax-green text-lg mb-2">[Your University Name]</p>
                <p className="text-dev-text-muted text-sm mb-4">Sept 2017 – May 2021</p>
                <ul className="list-disc list-inside text-dev-text-subtle space-y-1">
                  <li>Graduated with a GPA of 4.8/5.0.</li>
                  <li>Focused on algorithms, data structures, and web development.</li>
                  <li>Completed a capstone project on AI-powered logistics optimization.</li>
                </ul>
              </motion.div>
              <motion.div
                className="bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border p-6 hover:shadow-dev-lg hover:border-syntax-blue transition-all duration-300"
                variants={itemVariants}
              >
                <h4 className="text-xl font-bold text-dev-text">Online Courses & Certifications</h4>
                <p className="text-syntax-green text-lg mb-2">Various Platforms</p>
                <p className="text-dev-text-muted text-sm mb-4">2018 – Present</p>
                <ul className="list-disc list-inside text-dev-text-subtle space-y-1">
                  <li>AWS Certified Developer - Associate.</li>
                  <li>Professional Scrum Developer I.</li>
                  <li>Completed numerous courses on React, Node.js, and cloud technologies.</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center bg-dark-bg-secondary/80 backdrop-blur-sm p-6 rounded-2xl shadow-dev-md border border-dark-border/50 hover:shadow-dev-lg transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-syntax-blue to-syntax-green rounded-xl mb-4 text-dark-bg mx-auto">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-syntax-green to-syntax-blue bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="font-semibold text-dev-text mb-1">{stat.label}</div>
              <div className="text-sm text-dev-text-muted">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline Section */}
        <div className="text-center mt-24 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dev-text mb-6">
            The Path to
            <span className="text-cyan-300"> Excellence</span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-syntax-green to-syntax-blue hidden md:block" />

          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {timeline.map((item, index) => (
              <motion.div key={index} className="relative flex items-start" variants={itemVariants}>
                {/* Timeline Dot */}
                <div className="hidden md:flex items-center justify-center w-16 h-16 bg-dark-bg-secondary rounded-full shadow-dev-md border-4 border-dark-border relative z-10">
                  <div className={`p-3 bg-gradient-to-r ${item.color} rounded-full text-dark-bg`}>{item.icon}</div>
                </div>

                {/* Content */}
                <div className="md:ml-8 bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border flex-1 p-6">
                  <div className="flex items-center mb-4">
                    <div className={`md:hidden p-3 bg-gradient-to-r ${item.color} rounded-full text-dark-bg mr-4`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-syntax-green mb-1">{item.year}</div>
                      <h3 className="text-xl font-bold text-dev-text">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-dev-text-muted leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="text-center mt-24 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dev-text mb-6">
            My Core
            <span className=" text-cyan-300"> Values</span>
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
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="bg-dark-bg-secondary rounded-2xl shadow-dev-md border border-dark-border p-8 hover:shadow-dev-lg transition-all duration-300"
              variants={itemVariants}
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-dev-text mb-4">{value.title}</h3>
              <p className="text-dev-text-muted leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
