"use client"

import type React from "react"
import { useState } from "react"
import { CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

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
  messageLabel = "Your Message",
  messagePlaceholder = "Tell me about your project or inquiry...",
  rows = 6,
}: Props) {
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
        throw new Error("All fields are required.")
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        throw new Error("Please enter a valid email address.")
      }

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          source,
          _gotcha: gotcha,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const formspreeError = Array.isArray(errorData.errors)
          ? errorData.errors.map((x: { message?: string }) => x.message).filter(Boolean).join(" ")
          : errorData.error
        throw new Error(formspreeError || `The message could not be sent (status ${response.status}). Please try again.`)
      }

      setStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (error: any) {
      setStatus("error")
      setErrorMessage(error?.message || "Failed to send message. Please try again.")
    }
  }

  const fieldClass =
    "w-full p-3 bg-dark-bg-tertiary border border-dark-border rounded-lg focus:ring-2 focus:ring-syntax-blue focus:border-syntax-blue transition-all duration-200 text-dev-text placeholder-dev-text-subtle"

  return (
    <form onSubmit={handleSubmit} action={FORMSPREE_ENDPOINT} method="POST" className="space-y-6" noValidate>
      <div>
        <Label htmlFor={id("name")} className="text-dev-text-muted font-semibold mb-2 block">
          Your Name
        </Label>
        <Input
          type="text"
          id={id("name")}
          name="name"
          autoComplete="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          className={fieldClass}
          required
        />
      </div>
      <div>
        <Label htmlFor={id("email")} className="text-dev-text-muted font-semibold mb-2 block">
          Your Email
        </Label>
        <Input
          type="email"
          id={id("email")}
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@email.com"
          value={formData.email}
          onChange={handleChange}
          className={fieldClass}
          required
        />
      </div>
      <div>
        <Label htmlFor={id("message")} className="text-dev-text-muted font-semibold mb-2 block">
          {messageLabel}
        </Label>
        <Textarea
          id={id("message")}
          name="message"
          placeholder={messagePlaceholder}
          rows={rows}
          value={formData.message}
          onChange={handleChange}
          className={fieldClass}
          required
        />
      </div>

      {/* Honeypot: hidden from people and screen readers; bots that fill it are dropped by Formspree. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("gotcha")}>Leave this field empty</label>
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

      <Button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-syntax-blue to-syntax-green text-dark-bg rounded-xl font-semibold text-lg hover:from-syntax-green hover:to-syntax-cyan transition-all duration-300 shadow-glow-primary hover:shadow-glow-secondary"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </Button>

      <div aria-live="polite" role="status">
        {status === "success" && (
          <div className="mt-4 p-4 bg-syntax-green/20 text-syntax-green rounded-lg flex items-center">
            <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" />
            Message sent successfully! I&apos;ll get back to you soon.
          </div>
        )}
        {status === "error" && (
          <div className="mt-4 p-4 bg-syntax-red/20 text-syntax-red rounded-lg flex items-center">
            <XCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            {errorMessage}
          </div>
        )}
      </div>
    </form>
  )
}
