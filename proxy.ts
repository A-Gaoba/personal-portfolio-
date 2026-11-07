import { NextResponse, type NextRequest } from "next/server"
import { LOCALE_COOKIE, defaultLocale, isLocale, localizePath } from "@/lib/i18n/config"

/**
 * Language routing (Next.js 16 "proxy", formerly middleware).
 *
 * - /en/… and /ar/… are served as they are: a direct link always opens in the language it names.
 * - Any URL without a language (/, /about, old links shared before the bilingual site) is redirected to the
 *   visitor's saved language (cookie set by the language switcher), otherwise to English.
 *   307 because the target depends on the visitor's cookie.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (isLocale(pathname.split("/")[1])) return NextResponse.next()

  const saved = request.cookies.get(LOCALE_COOKIE)?.value
  const locale = isLocale(saved) ? saved : defaultLocale
  const url = request.nextUrl.clone()
  url.pathname = localizePath(locale, pathname)
  return NextResponse.redirect(url, 307)
}

export const config = {
  // Skip Next internals, API routes, metadata routes and any file with an extension (images, icons, …).
  matcher: ["/((?!_next/|api/|opengraph-image|sitemap.xml|robots.txt|manifest.webmanifest|.*\\..*).*)"],
}
