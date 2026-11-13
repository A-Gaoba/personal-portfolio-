"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

// A copy-paste prompt on a resource page: dashed box with a brand label (same look as the PDF guides) and a copy
// button. The text is plain (no HTML); line breaks are kept.
// `compact`: a one-line command (e.g. "ollama run qwen3:4b"), always LTR, with the same copy button inline.
export default function PromptBlock({
  text,
  label,
  copy,
  copied,
  dir,
  compact = false,
}: {
  text: string
  label: string
  copy: string
  copied: string
  dir?: "ltr" | "rtl"
  compact?: boolean
}) {
  const [done, setDone] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setDone(true)
      setTimeout(() => setDone(false), 2000)
    } catch {
      // Clipboard blocked (e.g. some in-app browsers): the text stays selectable.
    }
  }

  const icon = done ? <Check className="h-4 w-4 text-brand-text" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />

  if (compact)
    return (
      <div className="mt-3 flex items-center gap-2 rounded-xl border-2 border-dashed border-fg/25 bg-canvas p-2 ps-3">
        <code dir="ltr" className="min-w-0 flex-1 select-all overflow-x-auto whitespace-nowrap text-start font-mono text-[13px] text-fg sm:text-sm">
          {text}
        </code>
        <button type="button" onClick={onCopy} className="btn btn-line btn-sm min-h-[36px] flex-shrink-0 bg-surface px-2.5 sm:px-3" aria-label={`${copy}: ${text}`}>
          {icon}
          {/* Icon only on small phones so the command fits on one line; the label is still announced. */}
          <span aria-live="polite" className="sr-only sm:not-sr-only">{done ? copied : copy}</span>
        </button>
      </div>
    )

  return (
    <div className="relative mt-5 rounded-xl border-2 border-dashed border-fg/25 bg-canvas p-4 pt-6 sm:p-5 sm:pt-7">
      <span className="absolute -top-3 start-4 rounded-full bg-brand px-3 py-0.5 text-xs font-bold text-on-brand">{label}</span>
      <button
        type="button"
        onClick={onCopy}
        className="btn btn-line btn-sm absolute -top-5 end-3 min-h-[36px] bg-surface px-3"
        aria-label={`${copy}: ${label}`}
      >
        {done ? <Check className="h-4 w-4 text-brand-text" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        <span aria-live="polite">{done ? copied : copy}</span>
      </button>
      <p dir={dir} className="select-all whitespace-pre-line break-words leading-relaxed text-fg">
        {/* Display only: file names like .env / .gitignore stay LTR inside Arabic text; the copied text is unchanged. */}
        {text.split(/((?<=^|\s)[./][A-Za-z](?:[\w./-]*\w)?)/).map((part, i) =>
          i % 2 ? (
            <bdi key={i} dir="ltr">
              {part}
            </bdi>
          ) : (
            part
          ),
        )}
      </p>
    </div>
  )
}
