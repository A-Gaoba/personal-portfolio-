import { SHOW_UNVERIFIED_CLAIMS } from "@/lib/site"

/**
 * Hides unverified numeric claims at render time (Phase 0a, 2026-11-07) WITHOUT changing the source data.
 *
 * The project texts end with sentences such as "Achieved +40% sales growth…" or "serving over 1000 active users and
 * generating $50K+ in revenue" that have no source in the repository. With SHOW_UNVERIFIED_CLAIMS = false those
 * sentences are dropped from what the visitor sees; the original strings stay in the components, so turning the
 * switch on (after GAOBA confirms the numbers) restores them exactly.
 */
const NUMERIC_CLAIM =
  /(\d+(\.\d+)?\s*%|\d[\d,]*\s*\+|\$\s?\d|\b\d+(\.\d+)?\s*[KkM]\+?\b|\b\d(\.\d)?\s*\/\s*5\b|\bover\s+\d|\b\d+(\.\d+)?\s*(x|times)\b|\b\d{2,}[\d,]*\s+(users|viewers|visitors|merchants|projects|clients|customers|views|orders|data points)\b)/i

/** True when a piece of text contains a numeric claim (percentages, "1000+", "$50K", "4.8/5", "over 1000"…). */
export const hasNumericClaim = (text: string) => NUMERIC_CLAIM.test(text)

/** The text without its numeric-claim sentences (unchanged when SHOW_UNVERIFIED_CLAIMS is true). */
export function withoutUnverifiedClaims(text: string): string {
  if (SHOW_UNVERIFIED_CLAIMS || !text) return text
  // Split only at a real sentence end ("." + space + capital), so "Next.js" or "4.8" are never cut in two.
  const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z"“(])/)
  const kept = sentences.filter((s) => !hasNumericClaim(s))
  return kept.join(" ").trim()
}

/** A list without its numeric-claim items (unchanged when SHOW_UNVERIFIED_CLAIMS is true). */
export function listWithoutUnverifiedClaims<T extends string>(items: readonly T[]): T[] {
  return SHOW_UNVERIFIED_CLAIMS ? [...items] : items.filter((item) => !hasNumericClaim(item))
}

/**
 * An inline unverified value (e.g. the "50+ " in "Delivered 50+ modern web solutions"): rendered only when
 * SHOW_UNVERIFIED_CLAIMS is true, so the rest of the sentence stays readable without the number.
 */
export const unverified = (value: string) => (SHOW_UNVERIFIED_CLAIMS ? value : "")
