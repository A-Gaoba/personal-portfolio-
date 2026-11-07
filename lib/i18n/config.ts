/**
 * Languages of the site (2026-11-07).
 *
 * Every page lives under /{locale}/… (app/[locale]/…). English is the default; Arabic is right-to-left.
 * To add a language: add it to `locales`, create messages/{locale}.ts with the same shape as messages/en.ts, and
 * extend `localeMeta`. Future sections (GAOBA AI Resources, digital products) only add pages under app/[locale]/
 * and keys to the dictionaries — nothing here changes.
 */
export const locales = ["en", "ar"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"

/** Cookie that remembers the language a visitor chose with the switcher (read by proxy.ts for un-prefixed URLs). */
export const LOCALE_COOKIE = "NEXT_LOCALE"
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

export const localeMeta: Record<Locale, { dir: "ltr" | "rtl"; ogLocale: string; label: string; short: string }> = {
  en: { dir: "ltr", ogLocale: "en_US", label: "English", short: "EN" },
  ar: { dir: "rtl", ogLocale: "ar_AR", label: "العربية", short: "AR" },
}

export const isLocale = (value: string | undefined | null): value is Locale =>
  !!value && (locales as readonly string[]).includes(value)

export const localeDir = (locale: Locale) => localeMeta[locale].dir

/** "/about" + "ar" -> "/ar/about"; "/" + "en" -> "/en". Hashes and queries are kept. */
export function localizePath(locale: Locale, path = "/"): string {
  const p = path.startsWith("/") ? path : `/${path}`
  if (p === "/") return `/${locale}`
  if (p.startsWith("/#") || p.startsWith("/?")) return `/${locale}${p.slice(1)}`
  return `/${locale}${p}`
}

/** "/ar/about" -> "/about"; "/ar" -> "/"; paths without a locale are returned unchanged. */
export function stripLocale(pathname: string): string {
  const first = pathname.split("/")[1]
  if (!isLocale(first)) return pathname || "/"
  const rest = pathname.slice(first.length + 1)
  return rest === "" ? "/" : rest
}

export const otherLocales = (locale: Locale) => locales.filter((l) => l !== locale)
