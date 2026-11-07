"use client"

import type React from "react"
import { useState } from "react"
import { CheckCircle2, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useI18n } from "@/components/i18n/I18nProvider"

/**
 * One contact form for the whole site (Phase 0a, 2026-11-07).
 *
 * The home page form only did console.log(), so every message sent from it was lost. This component reuses the
 * working Formspree logic of the contact page (same endpoint, same fields, same look) and adds:
 * - `name` attributes (the no-JS fallback POST had no field names before),
 * - Formspree's `_gotcha` honeypot against spam bots,
 * - `Accept: application/json`, which Formspree requires to answer with JSON,
 * - a `source` field so the email says which form it came from,
 * - status messages announced to screen readers.
 */
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xnnzdron"

type Props = {
  /** Which page the form is on; sent along with the message. */
  source: "home" | "contact"
  /** Prefix for the field ids so two forms never share an id. */
  idPrefix?: string
  messageLabel?: string
  messagePlaceholder?: string
  rows?: number
}

export default function ContactForm({
  source,
  idPrefix = source,
  messageLabel,
  messagePlaceholder,
  rows = 6,
}: Props) {
  const { t, locale } = useI18n()
  const f = t.form
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [gotcha, setGotcha] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const id = (field: string) => `${idPrefix}-${field}`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error(f.errorRequired)
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        throw new Error(f.errorEmail)
      }

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          source,
          language: locale,
          _gotcha: gotcha,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const formspreeError = Array.isArray(errorData.errors)
          ? errorData.errors.map((x: { message?: string }) => x.message).filter(Boolean).join(" ")
          : errorData.error
        throw new Error(formspreeError || f.errorStatus.replace("{status}", String(response.status)))
      }

      setStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (error: any) {
      setStatus("error")
      setErrorMessage(error?.message || f.errorGeneric)
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-fg/20 bg-canvas px-4 py-3 text-base text-fg placeholder:text-fg-muted shadow-none transition-colors focus-visible:border-fg focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-0"

  return (
    <form onSubmit={handleSubmit} action={FORMSPREE_ENDPOINT} method="POST" className="space-y-6" noValidate>
      <div>
        <Label htmlFor={id("name")} className="mb-2 block text-sm font-semibold text-fg">
          {f.nameLabel}
        </Label>
        <Input
          type="text"
          id={id("name")}
          name="name"
          autoComplete="name"
          placeholder={f.namePlaceholder}
          value={formData.name}
          onChange={handleChange}
          className={fieldClass}
          required
        />
      </div>
      <div>
        <Label htmlFor={id("email")} className="mb-2 block text-sm font-semibold text-fg">
          {f.emailLabel}
        </Label>
        <Input
          type="email"
          id={id("email")}
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@email.com"
          dir="ltr"
          value={formData.email}
          onChange={handleChange}
          className={fieldClass}
          required
        />
      </div>
      <div>
        <Label htmlFor={id("message")} className="mb-2 block text-sm font-semibold text-fg">
          {messageLabel ?? f.messageLabel}
        </Label>
        <Textarea
          id={id("message")}
          name="message"
          placeholder={messagePlaceholder ?? f.messagePlaceholder}
          rows={rows}
          value={formData.message}
          onChange={handleChange}
          className={fieldClass}
          required
        />
      </div>

      {/* Honeypot: hidden from people and screen readers; bots that fill it are dropped by Formspree. */}
      <div aria-hidden="true" className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("gotcha")}>{f.honeypot}</label>
        <input
          type="text"
          id={id("gotcha")}
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          value={gotcha}
          onChange={(e) => setGotcha(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="btn btn-brand h-auto w-full text-base"
        disabled={status === "loading"}
      >
        {status === "loading" ? f.sending : f.send}
      </button>

      <div aria-live="polite" role="status">
        {status === "success" && (
          <div className="mt-4 flex items-center rounded-xl border border-line bg-surface p-4 text-fg">
            <CheckCircle2 className="me-2 h-5 w-5 flex-shrink-0 text-brand-text" />
            {f.success}
          </div>
        )}
        {status === "error" && (
          <div className="mt-4 flex items-center rounded-xl border border-brand/40 bg-brand/10 p-4 text-brand-text">
            <XCircle className="w-5 h-5 me-2 flex-shrink-0" />
            {errorMessage}
          </div>
        )}
      </div>
    </form>
  )
}
