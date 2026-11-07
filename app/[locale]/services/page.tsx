import type { Metadata } from "next"
import Services from "@/app/components/Services"
import { isLocale } from "@/lib/i18n/config"
import { pageMetadata } from "@/lib/i18n/metadata"

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return isLocale(locale) ? pageMetadata(locale, "services", "/services") : {}
}

export default function ServicesPage() {
  return <Services />
}
