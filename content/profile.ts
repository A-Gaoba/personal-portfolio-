/**
 * Profile facts used across the site (Phase 0b, 2026-11-07): one source of truth instead of values repeated in
 * every component. Only values that already existed on the site are here, nothing new or guessed.
 *
 * Verification notes (HTTP checks on 2026-11-07):
 * - github: https://github.com/A-Gaoba exists.
 * - x: https://x.com/A_Gaoba exists and is titled "Abdulrahman Gaoba (@A_Gaoba)".
 * - calendly: https://calendly.com/abdalrahmangooba25/30min returns 200 (a made-up account returns 404).
 * - linkedin: NOT verifiable (LinkedIn answers 999 to every automated request) and the site used three different
 *   URLs, one of them malformed. Hidden (null) until GAOBA confirms the right one (open question A3).
 * - email: the address the site already shows; still to be confirmed (open question A1).
 */
export const profile = {
  name: "Abdulrahman Gaoba",
  nameAr: "عبد الرحمن قوبع",
  /** Former spellings people search for; used only in JSON-LD `alternateName`, never in visible text. */
  alternateNames: ["Abdulrahman Gaoba", "abdulraman gaoba", "abdulrahamn gooba", "a-gaoba", "عبد الرحمن قوبع"],
  jobTitle: "Full Stack Developer & UI/UX Designer",
  email: "abdulrahmangooba@gmail.com",
  phone: { display: "+7 (917) 482-84-74", tel: "+79174828474", whatsapp: "https://wa.me/79174828474" },
  location: "Moscow, Russia",
  image: "/myimage.jpeg",
  links: {
    github: "https://github.com/A-Gaoba",
    x: "https://x.com/A_Gaoba",
    xHandle: "@A_Gaoba",
    linkedin: null as string | null,
    calendly: "https://calendly.com/abdalrahmangooba25/30min",
  },
} as const

/** Public profile links that are verified (used for JSON-LD `sameAs`). */
export const verifiedSameAs = [profile.links.github, profile.links.x, profile.links.linkedin].filter(
  (u): u is string => typeof u === "string",
)
