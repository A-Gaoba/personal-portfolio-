"use client"

import { createContext, useCallback, useContext, useMemo } from "react"
import type { Messages } from "@/messages/en"
import { type Locale, localeDir, localizePath } from "@/lib/i18n/config"

type I18nValue = {
  locale: Locale
  dir: "ltr" | "rtl"
  /** The active language's dictionary (only this one is sent to the browser). */
  t: Messages
  /** Site path -> path in the active language ("/about" -> "/ar/about"). */
  href: (path: string) => string
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ locale, messages, children }: { locale: Locale; messages: Messages; children: React.ReactNode }) {
  const href = useCallback((path: string) => localizePath(locale, path), [locale])
  const value = useMemo(() => ({ locale, dir: localeDir(locale), t: messages, href }), [locale, messages, href])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>")
  return ctx
}

/**
 * Applies a translation overlay to data whose English text lives in the component (projects, services…):
 * fields present in the overlay replace the English ones, everything else (images, links, tech names) is shared.
 */
export function localizeItems<T extends Record<string, any>, K extends keyof T>(
  items: readonly T[],
  key: K,
  overlay: Partial<Record<string, Partial<T>>> | undefined,
): T[] {
  if (!overlay) return [...items]
  return items.map((item) => ({ ...item, ...(overlay[String(item[key])] ?? {}) }))
}
