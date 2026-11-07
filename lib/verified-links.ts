/**
 * Project links that were checked over HTTP on 2026-11-07 (Phase 0a). A project's "View Live" / "Source code"
 * button is rendered only when its URL is in one of these lists, so a visitor never lands on a 404.
 *
 * The original URLs stay untouched in the project data (Projects.tsx, ProjectsHighlight.tsx) so they can be
 * restored: add a URL here once it works again or GAOBA confirms it (docs/portfolio-audit/10-open-questions.md C1–C15).
 *
 * Not listed (failed on 2026-11-07):
 *   live: https://naqlatech.com (404) · https://gaobavid.com (no response) · https://dashboard-demo.com (placeholder)
 *   repos: every github.com/A-Gaoba/<name> used by the site except loqmat-hala returned 404 (private or missing).
 *          ghofran-portfolio and sara-alhassany were typos of the real public repos ghofran_badran and sara_alhassany.
 */
export const VERIFIED_LIVE_URLS = new Set<string>([
  "https://anfasakperfumes.vercel.app",
  "https://ghofran-badran.vercel.app",
  "https://giftstouchy.vercel.app",
  "https://junzitechsolutions.com", // redirects to https://www.junzidev.com/ (200)
  "https://loqmat-hala.vercel.app",
  "https://plannerballoons.vercel.app",
  "https://productsenab.vercel.app",
  "https://qesatshalet.vercel.app",
  "https://richyplanner.vercel.app",
  "https://sara-alhassany.vercel.app",
  "https://torussia.travel",
  "https://yemculru.com",
])

/** Wrong repo URL used on the site -> the real public repository (both checked on 2026-11-07). */
const REPO_CORRECTIONS: Record<string, string> = {
  "https://github.com/A-Gaoba/ghofran-portfolio": "https://github.com/A-Gaoba/ghofran_badran",
  "https://github.com/A-Gaoba/sara-alhassany": "https://github.com/A-Gaoba/sara_alhassany",
}

export const VERIFIED_REPO_URLS = new Set<string>([
  "https://github.com/A-Gaoba/loqmat-hala",
  "https://github.com/A-Gaoba/ghofran_badran",
  "https://github.com/A-Gaoba/sara_alhassany",
])

/** The live URL if it was verified, otherwise null (the button is not rendered). */
export const verifiedLiveUrl = (url?: string | null) => (url && VERIFIED_LIVE_URLS.has(url) ? url : null)

/** The (corrected) repository URL if it is public and verified, otherwise null. */
export const verifiedRepoUrl = (url?: string | null) => {
  if (!url) return null
  const fixed = REPO_CORRECTIONS[url] ?? url
  return VERIFIED_REPO_URLS.has(fixed) ? fixed : null
}
