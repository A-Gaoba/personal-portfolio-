"use client"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { InlineWidget } from "react-calendly"
import { useI18n } from "@/components/i18n/I18nProvider"

// Calendly colours follow the GAOBA theme (hex without "#", as Calendly expects). Calendly applies custom colours
// only on paid plans; on a free plan its default look is shown.
const THEMES = {
  light: { backgroundColor: "fbf9f4", textColor: "141414", primaryColor: "ff4a1c" },
  dark: { backgroundColor: "1f1e1c", textColor: "ece8df", primaryColor: "ff4a1c" },
}

export default function CalendlyWidget() {
  const { resolvedTheme } = useTheme()
  const { t } = useI18n()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const mode = mounted && resolvedTheme === "dark" ? "dark" : "light"

  return (
    <section aria-label={t.contact.meeting} className="container-page pb-20">
      <div className="card-paper overflow-hidden">
        <InlineWidget
          key={mode}
          url="https://calendly.com/abdalrahmangooba25/30min"
          styles={{ height: "700px", width: "100%" }}
          pageSettings={{ ...THEMES[mode], hideEventTypeDetails: false, hideLandingPageDetails: false }}
        />
      </div>
    </section>
  )
}
