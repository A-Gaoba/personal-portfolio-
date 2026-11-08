import type { Locale } from "@/lib/i18n/config"
import type { Resource } from "@/content/resources"

/** Western digits in both languages, like the rest of the site. */
const intlLocale = (locale: Locale) => (locale === "ar" ? "ar-u-nu-latn" : "en")

export const formatDate = (iso: string, locale: Locale) =>
  new Intl.DateTimeFormat(intlLocale(locale), { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  )

export const formatSize = (bytes: number, locale: Locale) =>
  `${Math.round(bytes / 1024)} ${locale === "ar" ? "كيلوبايت" : "KB"}`

/** "{license} license" + { license: "MIT" } -> "MIT license". */
export const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? ""))

export const resourcePath = (r: Resource) => `/resources/${r.slug}`
