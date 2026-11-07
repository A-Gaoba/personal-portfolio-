import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, MapPin, Phone, MessageCircle, ArrowUpRight } from "lucide-react"
import { profile } from "@/content/profile"
import Logo from "@/components/Logo"
import type { Messages } from "@/messages/en"
import { type Locale, localizePath } from "@/lib/i18n/config"


// Server component: the footer has no state, so it no longer ships framer-motion code for a fade-in.
const Footer = ({ locale, t }: { locale: Locale; t: Messages }) => {
  const currentYear = new Date().getFullYear()
  const f = t.footer
  const href = (path: string) => localizePath(locale, path)
  const quickLinks = [
    { href: "/about", label: f.links.about },
    { href: "/projects", label: f.links.projects },
    { href: "/skills", label: f.links.skills },
    { href: "/services", label: f.links.services },
  ]

  const socials = [
    { href: profile.links.github, label: "GitHub", icon: Github },
    // Phase 0a: LinkedIn hidden until the right profile URL is confirmed (open question A3).
    ...(profile.links.linkedin ? [{ href: profile.links.linkedin, label: "LinkedIn", icon: Linkedin }] : []),
    { href: profile.links.x, label: "X (Twitter)", icon: Twitter },
  ]

  const contact = [
    { icon: Mail, href: `mailto:${profile.email}`, label: profile.email, external: false, ltr: true },
    { icon: Phone, href: `tel:${profile.phone.tel}`, label: profile.phone.display, external: false, ltr: true },
    { icon: MapPin, href: "https://maps.google.com/?q=Moscow,Russia", label: t.common.location, external: true, ltr: false },
    { icon: MessageCircle, href: profile.phone.whatsapp, label: t.contact.whatsappAction, external: true, ltr: false },
  ]

  return (
    <footer className="bg-inverse text-on-inverse">
      <div className="container-page py-14 sm:py-16">
        {/* CTA strip */}
        <div className="flex flex-col gap-6 border-b border-on-inverse/15 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-on-inverse/60">
              {f.kicker}
            </p>
            <p className="mt-3 max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {f.titleBefore}<span className="text-brand">{f.titleAccent}</span>{f.titleAfter}
            </p>
          </div>
          <Link href={href("/contact")} className="btn btn-brand self-start md:self-auto">
            {f.cta}
            <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>

        <div className="grid gap-10 pt-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div className="space-y-4">
            <Link href={href("/")} className="inline-block rounded-full" aria-label={t.nav.homeLabel}>
              <Logo inverted />
            </Link>
            <p className="max-w-sm leading-relaxed text-on-inverse/70">
              {f.tagline}
            </p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-on-inverse/20 text-on-inverse/80 transition-colors hover:border-on-inverse hover:text-on-inverse"
                >
                  <s.icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-on-inverse/60">
              {f.quickLinks}
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={href(l.href)} className="text-on-inverse/80 transition-colors hover:text-on-inverse">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-on-inverse/60">
              {f.contactInfo}
            </h3>
            <ul className="mt-4 space-y-3">
              {contact.map((c) => (
                <li key={c.label} className="flex items-center gap-3">
                  <c.icon className="h-[18px] w-[18px] flex-none text-brand" aria-hidden="true" />
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    dir={c.ltr ? "ltr" : undefined}
                    className="break-all text-on-inverse/80 transition-colors hover:text-on-inverse"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-on-inverse/15 pt-6 text-sm text-on-inverse/60 sm:flex-row sm:justify-between">
          <span>&copy; {currentYear} {f.copyright}</span>
          <span className="font-mono text-xs">gaoba.vercel.app</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
