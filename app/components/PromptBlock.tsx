"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

// A copy-paste prompt on a resource page: dashed box with a brand label (same look as the PDF guides) and a copy
// button. The text is plain (no HTML); line breaks are kept.
export default function PromptBlock({ text, label, copy, copied }: { text: string; label: string; copy: string; copied: string }) {
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
      <p className="select-all whitespace-pre-line break-words leading-relaxed text-fg">
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
