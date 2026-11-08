"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowUpRight } from "lucide-react"
import ThemeToggle from "@/components/ThemeToggle"
import Logo from "@/components/Logo"
import LanguageToggle from "@/components/i18n/LanguageToggle"
import { useI18n } from "@/components/i18n/I18nProvider"
import { stripLocale } from "@/lib/i18n/config"

// Labels come from the dictionary (t.nav); paths are language-neutral and prefixed with the active locale.
const navLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "projects", href: "/projects" },
  { key: "skills", href: "/skills" },
  { key: "services", href: "/services" },
  { key: "resources", href: "/resources" },
  // Phase 0a (2026-11-07): "Testimonials" removed (the page showed fabricated testimonials).
  { key: "contact", href: "/contact" },
] as const

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const rawPathname = usePathname()
  const pathname = stripLocale(rawPathname ?? "/")
  const { t, href } = useI18n()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close the mobile menu on navigation, and with Escape.
  useEffect(() => setIsOpen(false), [rawPathname])
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false)
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [isOpen])

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href))

  return (
    <nav
      aria-label={t.nav.label}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || isOpen
          ? "border-b border-line bg-canvas/85 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/75"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href={href("/")} className="flex-shrink-0 rounded-full" aria-label={t.nav.homeLabel}>
            <Logo />
          </Link>

          {/* Desktop — from lg: with 7 links (Resources added 2026-11-08) the row no longer fits at md (768px). */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.key}
                  href={href(link.href)}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-lg px-3 py-2 text-[15px] font-medium transition-colors ${
                    active ? "text-fg" : "text-fg-muted hover:text-fg"
                  }`}
                >
                  {t.nav[link.key]}
                  {active && <span className="absolute inset-x-3 -bottom-px h-[3px] rounded-full bg-brand" />}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Link href={href("/contact")} className="btn btn-ink btn-sm hidden xl:inline-flex">
              {t.nav.cta}
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen((o) => !o)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg transition-colors hover:bg-fg/5 lg:hidden"
            >
              <span className="sr-only">{isOpen ? t.nav.closeMenu : t.nav.openMenu}</span>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div
        id="mobile-menu"
        hidden={!isOpen}
        className="border-t border-line bg-canvas lg:hidden"
      >
        <div className="container-page flex flex-col py-3">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.key}
                href={href(link.href)}
                aria-current={active ? "page" : undefined}
                // Tapping the current page's link does not change the path, so close the menu explicitly.
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between border-b border-line py-3.5 text-lg font-semibold last:border-b-0 ${
                  active ? "text-fg" : "text-fg-2"
                }`}
              >
                {t.nav[link.key]}
                {active && <span className="h-2 w-2 rounded-full bg-brand" />}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
