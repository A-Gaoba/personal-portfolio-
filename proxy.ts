import { NextResponse, type NextRequest } from "next/server"
import { LOCALE_COOKIE, defaultLocale, isLocale, localizePath } from "@/lib/i18n/config"
import { shortLinks } from "@/content/resources"

/**
 * Language routing (Next.js 16 "proxy", formerly middleware).
 *
 * - /en/… and /ar/… are served as they are: a direct link always opens in the language it names.
 * - Any URL without a language (/, /about, old links shared before the bilingual site) is redirected to the
 *   visitor's saved language (cookie set by the language switcher), otherwise to English.
 *   307 because the target depends on the visitor's cookie.
 * - Short links /r/<code> (Instagram bio, ManyChat) go to the resource page named in content/resources.ts, in that
 *   resource's language, keeping any query (?utm_…). Public, no login, no cookies needed. Unknown codes go to the
 *   Arabic resources library. 307 (temporary) so a code can be pointed elsewhere later without stale caches.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const short = /^\/r\/([^/]+)\/?$/i.exec(pathname)
  if (short) {
    const url = request.nextUrl.clone()
    let code = short[1]
    try {
      code = decodeURIComponent(code)
    } catch {}
    url.pathname = shortLinks[code.toLowerCase()] ?? "/ar/resources"
    return NextResponse.redirect(url, 307)
  }
  if (isLocale(pathname.split("/")[1])) return NextResponse.next()

  const saved = request.cookies.get(LOCALE_COOKIE)?.value
  const locale = isLocale(saved) ? saved : defaultLocale
  const url = request.nextUrl.clone()
  url.pathname = localizePath(locale, pathname)
  return NextResponse.redirect(url, 307)
}

export const config = {
  // Skip Next internals, API routes, metadata routes and any file with an extension (images, icons, …).
  matcher: ["/((?!_next/|api/|sitemap.xml|robots.txt|manifest.webmanifest|.*\\..*).*)"],
}
