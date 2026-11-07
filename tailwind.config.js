/** @type {import('tailwindcss').Config} */

// GAOBA Editorial design system. All values come from CSS variables in app/globals.css, so the light/dark switch
// is a single class on <html>. Use the semantic names below in new code.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`

module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1152px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "var(--font-sans)", "ui-monospace", "monospace"],
        // legacy alias: old components used font-poppins for headings
        poppins: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        // ── Semantic tokens (use these) ──
        canvas: { DEFAULT: v("canvas"), raised: v("canvas-raised") },
        surface: { DEFAULT: v("surface"), 2: v("surface-2") },
        inverse: v("inverse"),
        "on-inverse": v("on-inverse"),
        fg: { DEFAULT: v("fg"), 2: v("fg-2"), muted: v("fg-muted") },
        line: "rgb(var(--line) / var(--line-a))",
        brand: { DEFAULT: v("brand"), text: v("brand-text") },
        "on-brand": v("on-brand"),

        // ── Legacy aliases (pre-2026-11 "VS Code" theme) mapped onto the GAOBA tokens ──
        // Kept so older sections render in the new identity; prefer the semantic names above.
        "dark-bg": { DEFAULT: v("canvas"), secondary: v("surface"), tertiary: v("surface-2") },
        "dark-border": "rgb(var(--line) / var(--line-a))",
        "dev-text": { DEFAULT: v("fg"), muted: v("fg-muted"), subtle: v("fg-muted") },
        // Every former syntax hue collapses to the single GAOBA accent (fills/marks) …
        "syntax-blue": v("brand"),
        "syntax-green": v("brand"),
        "syntax-orange": v("brand"),
        "syntax-purple": v("brand"),
        "syntax-red": v("brand"),
        "syntax-cyan": v("brand"),
        "syntax-pink": v("brand"),

        // ── shadcn/ui bridge ──
        border: v("border"),
        input: v("input"),
        ring: v("ring"),
        background: v("background"),
        foreground: v("foreground"),
        primary: { DEFAULT: v("primary"), foreground: v("primary-foreground") },
        secondary: { DEFAULT: v("secondary"), foreground: v("secondary-foreground") },
        destructive: { DEFAULT: v("destructive"), foreground: v("destructive-foreground") },
        muted: { DEFAULT: v("muted"), foreground: v("muted-foreground") },
        accent: { DEFAULT: v("accent"), foreground: v("accent-foreground") },
        popover: { DEFAULT: v("popover"), foreground: v("popover-foreground") },
        card: { DEFAULT: v("card"), foreground: v("card-foreground") },
      },
      borderRadius: {
        card: "var(--radius-card)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        paper: "var(--shadow-paper)",
        lift: "var(--shadow-lift)",
        // legacy names → paper shadows (the neon glows are gone)
        "dev-md": "var(--shadow-paper)",
        "dev-lg": "var(--shadow-paper)",
        "dev-xl": "var(--shadow-lift)",
        "glow-primary": "none",
        "glow-secondary": "var(--shadow-paper)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
