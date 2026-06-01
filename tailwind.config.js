/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/**/*.{html,js}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ── Design System: Tech-Premium Editorial ──
        // Fuente: strategic_core/DESIGN.md
        "primary":                   "#000613",
        "primary-container":         "#001f3f",
        "on-primary":                "#ffffff",
        "on-primary-container":      "#6f88ad",
        "primary-fixed":             "#d4e3ff",
        "primary-fixed-dim":         "#afc8f0",
        "on-primary-fixed":          "#001c3a",
        "on-primary-fixed-variant":  "#2f486a",
        "inverse-primary":           "#afc8f0",

        "secondary":                 "#115cb9",
        "secondary-container":       "#659dfe",
        "on-secondary":              "#ffffff",
        "on-secondary-container":    "#003370",
        "secondary-fixed":           "#d7e2ff",
        "secondary-fixed-dim":       "#acc7ff",
        "on-secondary-fixed":        "#001a40",
        "on-secondary-fixed-variant":"#004491",

        "tertiary":                  "#00070a",
        "tertiary-container":        "#002328",
        "on-tertiary":               "#ffffff",
        "on-tertiary-container":     "#0094a6",
        "tertiary-fixed":            "#9cf0ff",
        "tertiary-fixed-dim":        "#00daf3",   // ← Cyan signature
        "on-tertiary-fixed":         "#001f24",
        "on-tertiary-fixed-variant": "#004f58",

        "surface":                   "#f7fafc",
        "surface-dim":               "#d7dadc",
        "surface-bright":            "#f7fafc",
        "surface-container-lowest":  "#ffffff",
        "surface-container-low":     "#f1f4f6",
        "surface-container":         "#ebeef0",
        "surface-container-high":    "#e5e9eb",
        "surface-container-highest": "#e0e3e5",
        "surface-variant":           "#e0e3e5",
        "surface-tint":              "#476083",
        "inverse-surface":           "#2d3133",
        "inverse-on-surface":        "#eef1f3",

        "on-surface":                "#181c1e",
        "on-surface-variant":        "#43474e",
        "on-background":             "#181c1e",
        "background":                "#f7fafc",

        "outline":                   "#74777f",
        "outline-variant":           "#c4c6cf",

        "error":                     "#ba1a1a",
        "error-container":           "#ffdad6",
        "on-error":                  "#ffffff",
        "on-error-container":        "#93000a",
      },

      borderRadius: {
        DEFAULT: "1rem",
        sm:      "0.5rem",
        md:      "0.75rem",
        lg:      "2rem",
        xl:      "3rem",
        full:    "9999px",
      },

      fontFamily: {
        sans:     ["Inter", "sans-serif"],
        headline: ["Inter", "sans-serif"],
        body:     ["Inter", "sans-serif"],
        label:    ["Inter", "sans-serif"],
      },

      fontSize: {
        "display-lg": ["4.5rem",  { lineHeight: "1", fontWeight: "900" }],
        "display-md": ["3.5rem",  { lineHeight: "1.05", fontWeight: "800" }],
        "headline-lg":["2.5rem",  { lineHeight: "1.1", fontWeight: "700" }],
        "headline-md":["2rem",    { lineHeight: "1.15", fontWeight: "700" }],
        "body-lg":    ["1.125rem",{ lineHeight: "1.6" }],
        "body-md":    ["1rem",    { lineHeight: "1.6" }],
        "label-sm":   ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.1em" }],
      },

      boxShadow: {
        "ambient":  "0 20px 40px rgba(0, 31, 63, 0.06)",
        "elevated": "0 40px 80px rgba(0, 31, 63, 0.12)",
        "glass":    "0 8px 32px rgba(0, 6, 19, 0.08)",
      },

      backdropBlur: {
        "glass": "20px",
      },

      animation: {
        "marquee":    "marquee 30s linear infinite",
        "fade-in":    "fadeIn 0.4s ease forwards",
        "slide-up":   "slideUp 0.4s ease forwards",
      },

      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
