/**
 * ValtorisUI — Tailwind CSS Preset
 * =================================
 * Drop into any project's tailwind.config.js as a preset.
 * Includes: Dahlia color tokens, font families, border radius, animations.
 *
 * Usage:
 *   const valtoris = require("./ValtorisUI/tailwind.preset");
 *   module.exports = { presets: [valtoris], content: ["./src/**\/*.{js,jsx}"] };
 */

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        display:  ['"Bebas Neue"', "sans-serif"],
        editorial:['"Cormorant Garamond"', "serif"],
        script:   ['"Caveat"', "cursive"],
        body:     ['"Outfit"', "system-ui", "sans-serif"],
      },

      colors: {
        dahlia: {
          bg:      "#0D0C0B",
          surface: "#1A1918",
          text:    "#F4F0EA",
          muted:   "#A39B8F",
          red:     "#FF3B22",
          pink:    "#F74898",
          yellow:  "#FFC01E",
          border:  "#2E2C2A",
          black:   "#000000",
        },
        // Shadcn/Radix CSS-var tokens (keep for component library compatibility)
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        card:        { DEFAULT: "hsl(var(--card))",    foreground: "hsl(var(--card-foreground))" },
        popover:     { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        primary:     { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary:   { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted:       { DEFAULT: "hsl(var(--muted))",   foreground: "hsl(var(--muted-foreground))" },
        accent:      { DEFAULT: "hsl(var(--accent))",  foreground: "hsl(var(--accent-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        border:      "hsl(var(--border))",
        input:       "hsl(var(--input))",
        ring:        "hsl(var(--ring))",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(var(--r, 0deg))" },
          "50%":       { transform: "translateY(-14px) rotate(calc(var(--r, 0deg) + 2deg))" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%":      { opacity: "0.5", transform: "scale(1.3)" },
        },
        "scroll-marquee": {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.333%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
      },

      animation: {
        "float-slow":    "float-slow 6s ease-in-out infinite",
        "spin-slow":     "spin-slow 22s linear infinite",
        "pulse-dot":     "pulse-dot 1.6s ease-in-out infinite",
        "scroll-marquee":"scroll-marquee 28s linear infinite",
        "accordion-down":"accordion-down 0.2s ease-out",
        "accordion-up":  "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};
