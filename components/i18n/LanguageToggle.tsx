"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useI18n } from "@/components/i18n/I18nProvider"
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, locales, localeMeta, localizePath, stripLocale, type Locale } from "@/lib/i18n/config"

/** Remembers the choice so un-prefixed URLs (/, /about…) open in this language next time (see proxy.ts). */
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`
}

/** EN | AR switch: links to the same page in the other language (direct links keep working without JS). */
export default function LanguageToggle() {
  const { locale, t } = useI18n()
  const pathname = stripLocale(usePathname() ?? "/")

  return (
    <div role="group" aria-label={t.nav.language} className="flex h-10 items-center rounded-full border border-line p-1">
      {locales.map((l) => {
        const active = l === locale
        return (
          <Link
            key={l}
            href={localizePath(l, pathname)}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            aria-label={localeMeta[l].label}
            title={localeMeta[l].label}
            onClick={() => rememberLocale(l)}
            scroll={false}
            className={`grid h-8 min-w-[2.25rem] place-items-center rounded-full px-2 font-mono text-[11px] font-semibold transition-colors ${
              active ? "bg-inverse text-on-inverse" : "text-fg-muted hover:text-fg"
            }`}
          >
            {localeMeta[l].short}
          </Link>
        )
      })}
    </div>
  )
}
