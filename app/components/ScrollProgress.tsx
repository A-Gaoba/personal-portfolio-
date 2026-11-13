"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Modern browsers animate on the compositor without a JS scroll listener.
    if (CSS.supports("animation-timeline", "scroll()")) return
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      if (ref.current) ref.current.style.transform = `scaleX(${progress})`
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const resize = new ResizeObserver(schedule)
    resize.observe(document.body)
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    update()
    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [pathname])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="scroll-progress pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left rtl:origin-right bg-brand"
    />
  )
}
