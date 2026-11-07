import { ImageResponse } from "next/og"

// Phase 0b (2026-11-07): replaces /og-image.jpg, which the metadata referenced but which never existed (404).
// Uses the site's CURRENT colours (dark bg, green ".dev" accent from the navbar logo) on purpose: the GAOBA
// Editorial identity is applied in Phase 1, after review. Text only, no claims.
export const alt = "Abdulrahman Gaoba - Full Stack Developer & UI/UX Designer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background: "#1E1E1E",
          color: "#D4D4D4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#D4D4D4" }}>
          Abdulrahman<span style={{ color: "#98C379" }}>.dev</span>
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, marginTop: 36, lineHeight: 1.1, color: "#F5F5F5" }}>
          Abdulrahman Gaoba
        </div>
        <div style={{ display: "flex", fontSize: 40, marginTop: 20, color: "#98C379" }}>
          Full Stack Developer &amp; UI/UX Designer
        </div>
        <div style={{ display: "flex", fontSize: 28, marginTop: 56, color: "#858585" }}>gaoba.vercel.app</div>
      </div>
    ),
    size,
  )
}
