"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useI18n } from "@/components/i18n/I18nProvider"

/** Light/dark switch. Light is the default (app/layout.tsx); the choice is remembered by next-themes. */
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { t } = useI18n()
  useEffect(() => setMounted(true), [])

  const dark = mounted && resolvedTheme === "dark"
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? t.theme.toLight : t.theme.toDark}
      title={dark ? t.theme.light : t.theme.dark}
      className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg transition-colors hover:bg-fg/5"
    >
      {/* Render a stable icon until mounted to avoid a hydration mismatch. */}
      {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </button>
  )
}
