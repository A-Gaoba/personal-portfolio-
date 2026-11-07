import en, { type Messages } from "@/messages/en"
import ar from "@/messages/ar"
import type { Locale } from "./config"

const dictionaries: Record<Locale, Messages> = { en, ar }

/** Server-side dictionary lookup. Client components receive only the active one through <I18nProvider>. */
export const getDictionary = (locale: Locale): Messages => dictionaries[locale]
