import { ImageResponse } from "next/og"

// Site Open Graph image in the GAOBA Editorial identity (ivory canvas, ink text, one red marker). Text only, no claims.
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
          justifyContent: "space-between",
          padding: "80px 96px",
          background: "#ECE8DF",
          color: "#141414",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: 32,
              background: "#141414",
              color: "#ECE8DF",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            AG
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#6B655B", letterSpacing: 4 }}>PORTFOLIO</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            Abdulrahman Gaoba
          </div>
          <div style={{ display: "flex", width: 220, height: 12, background: "#FF4A1C", marginTop: 20, borderRadius: 3 }} />
          <div style={{ display: "flex", fontSize: 40, marginTop: 32, color: "#4A463F" }}>
            Full Stack Developer &amp; UI/UX Designer
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#6B655B" }}>gaoba.vercel.app</div>
      </div>
    ),
    size,
  )
}
