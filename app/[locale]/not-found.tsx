"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useI18n } from "@/components/i18n/I18nProvider"

export default function NotFound() {
  const { t, href } = useI18n()
  return (
    <main className="container-page flex min-h-[70vh] flex-col items-start justify-center gap-6 pt-28 pb-16">
      <p className="kicker">404</p>
      <h1 className="display">{t.notFound.title}</h1>
      <p className="lede max-w-xl">{t.notFound.text}</p>
      <Link href={href("/")} className="btn btn-brand">
        {t.notFound.back}
        <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
      </Link>
    </main>
  )
}
