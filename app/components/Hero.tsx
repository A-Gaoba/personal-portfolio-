"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ArrowDown, ArrowRight, Github, Linkedin, Mail, Twitter } from "lucide-react"
import { profile } from "@/content/profile"
import { useI18n } from "@/components/i18n/I18nProvider"

const stack = ["React", "Next.js", "TypeScript", "Node.js", "Tailwind"]

const fadeUp = (delay = 0) => ({
  style: { animation: `hero-enter 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s both` },
})

function RoleRotator({ roles }: { roles: string[] }) {
  const reduce = useReducedMotion()
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2600)
    return () => window.clearInterval(id)
  }, [reduce, roles.length])

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={roles[roleIndex]}
        className="whitespace-nowrap rounded-md bg-inverse px-2.5 py-1 font-semibold text-on-inverse"
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -14, opacity: 0 }}
        transition={{ duration: 0.28 }}
      >
        {roles[roleIndex]}
      </motion.span>
    </AnimatePresence>
  )
}

export default function Hero() {
  const { t } = useI18n()
  const h = t.hero
  const roles = h.roles

  // Phase 0a (2026-11-07): links from content/profile.ts. LinkedIn hidden until the right URL is confirmed (A3).
  const socialLinks = [
    { icon: Github, href: profile.links.github, label: "GitHub" },
    ...(profile.links.linkedin ? [{ icon: Linkedin, href: profile.links.linkedin, label: "LinkedIn" }] : []),
    { icon: Mail, href: `mailto:${profile.email}`, label: h.email },
    { icon: Twitter, href: profile.links.x, label: "X (Twitter)" },
  ]

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-24">
      <div aria-hidden="true" className="paper-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

      <div className="container-page relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          {/* Copy */}
          <div>
            <p className="kicker" {...fadeUp(0)}>
              {h.kicker}
            </p>

            <h1 className="display mt-5" {...fadeUp(0.08)}>
              {h.greeting}{" "}
              {/* Match the final desktop wrap before either language's web font arrives. */}
              <br className="hidden lg:block" />
              <span className="mark">{h.name}</span>
            </h1>

            <div
              className="mt-5 flex h-9 items-center gap-3 overflow-hidden font-mono text-sm text-fg-muted sm:text-base"
              {...fadeUp(0.16)}
            >
              <span aria-hidden="true" className="rtl:font-sans">{h.roleLabel}</span>
              <span className="relative inline-flex h-full min-w-0 items-center">
                <RoleRotator roles={roles} />
              </span>
              <span className="sr-only">{roles.join(", ")}</span>
            </div>

            <p className="lede mt-6 max-w-xl" {...fadeUp(0.24)}>
              {h.introBefore}
              <strong className="font-semibold text-fg">React</strong>
              {h.introAnd}
              <strong className="font-semibold text-fg">Next.js</strong>
              {h.introAfter}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label={h.stackLabel} {...fadeUp(0.3)}>
              {stack.map((tech) => (
                <li key={tech} className="tag text-xs">
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" {...fadeUp(0.36)}>
              <a href="#projects" className="btn btn-brand group">
                {h.ctaWork}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
              </a>
              <a href="#contact" className="btn btn-line">
                {h.ctaContact}
              </a>
            </div>

            <div className="mt-8 flex items-center gap-4" {...fadeUp(0.42)}>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">{h.connect}</span>
              <span className="h-px w-8 bg-line" aria-hidden="true" />
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-line text-fg-2 transition-colors hover:border-fg hover:text-fg"
                  >
                    <social.icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Code card (ink, like the prompt blocks in GAOBA reels) */}
          <div
            className="relative isolate mx-auto w-full max-w-md lg:max-w-none"
            {...fadeUp(0.2)}
          >
            {/* Code stays left-to-right in every language. */}
            <div className="card-ink overflow-hidden shadow-lift" dir="ltr">
              <div className="flex items-center justify-between border-b border-on-inverse/10 px-5 py-3.5">
                <span className="font-mono text-xs text-on-inverse/60">portfolio.tsx</span>
                <span className="flex gap-1.5" aria-hidden="true">
                  <i className="h-2.5 w-2.5 rounded-full bg-on-inverse/20" />
                  <i className="h-2.5 w-2.5 rounded-full bg-on-inverse/20" />
                  <i className="h-2.5 w-2.5 rounded-full bg-brand" />
                </span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-[1.9] text-on-inverse/75 sm:p-6 sm:text-[13px]">
                <code>
                  <span className="text-on-inverse/45">import</span> React <span className="text-on-inverse/45">from</span>{" "}
                  &apos;react&apos;{"\n"}
                  <span className="text-on-inverse/45">import</span> type NextPage{" "}
                  <span className="text-on-inverse/45">from</span> &apos;next&apos;{"\n\n"}
                  <span className="text-on-inverse/45">const</span> <span className="text-on-inverse">Portfolio</span>: NextPage = () =&gt; {"{"}
                  {"\n"}
                  {"  "}
                  <span className="text-on-inverse/45">return</span> ({"\n"}
                  {"    "}&lt;div className=&quot;amazing-portfolio&quot;&gt;{"\n"}
                  {"      "}&lt;h1&gt;<span className="font-semibold text-brand">Building the future</span>&lt;/h1&gt;{"\n"}
                  {"    "}&lt;/div&gt;{"\n"}
                  {"  "}){"\n"}
                  {"}"}
                  {"\n\n"}
                  <span className="text-on-inverse/45">export default</span> Portfolio
                </code>
              </pre>
            </div>
            <div aria-hidden="true" className="absolute -bottom-3 inset-x-6 -z-10 h-full rounded-card bg-surface-2" />
          </div>
        </div>

        <a
          href="#about"
          className="mt-14 hidden items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-fg-muted transition-colors hover:text-fg lg:inline-flex"
        >
          <ArrowDown className="h-4 w-4" />
          {h.scroll}
        </a>
      </div>
    </section>
  )
}
