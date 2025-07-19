/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // VS Code inspired dark theme colors
        "dark-bg": "#1E1E1E", // Main background
        "dark-bg-secondary": "#252526", // Card backgrounds, secondary elements
        "dark-bg-tertiary": "#333333", // Hover states, input backgrounds
        "dark-border": "#444444", // Borders, separators
        "dev-text": "#D4D4D4", // Primary text color
        "dev-text-muted": "#858585", // Secondary text, descriptions
        "dev-text-subtle": "#6A9955", // Comments, subtle hints

        // Syntax highlighting inspired colors (gradients will use these)
        "syntax-blue": "#61AFEF", // Variables, functions, types
        "syntax-green": "#98C379", // Strings, keywords
        "syntax-orange": "#D19A66", // Numbers, booleans, operators
        "syntax-purple": "#C678DD", // Keywords, control flow
        "syntax-red": "#E06C75", // Tags, errors
        "syntax-cyan": "#56B6C2", // Imports, constants
        "syntax-pink": "#BE5046", // JSX attributes, special characters

        // Shadcn default colors (can be overridden if needed)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        // Custom shadows for the developer portfolio theme
        "dev-md":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 15px rgba(97, 175, 239, 0.1)", // Subtle blue tint
        "dev-lg":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 25px rgba(97, 175, 239, 0.2)", // More pronounced blue tint
        "dev-xl":
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 40px rgba(97, 175, 239, 0.3)", // Even larger blue tint
        "glow-primary": "0 0 15px rgba(97, 175, 239, 0.6), 0 0 25px rgba(152, 195, 121, 0.4)", // Blue and green glow
        "glow-secondary": "0 0 20px rgba(152, 195, 121, 0.7), 0 0 30px rgba(86, 182, 194, 0.5)", // Green and cyan glow
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
