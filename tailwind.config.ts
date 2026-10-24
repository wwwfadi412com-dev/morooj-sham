import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      // Mirrors the --ms-* variables in globals.css. Hex values (not var()) so
      // Tailwind opacity modifiers like bg-gold/10 work.
      colors: {
        emerald: { DEFAULT: "#0F3D2E" },
        gold: { DEFAULT: "#C8A96A", hover: "#B39252" },
        meadow: "#1E7E5A",
        alabaster: "#F8F6F0",
        surface: "#FFFFFF",
        charcoal: "#1C2526",
        muted: "#5A6566",
      },
      fontFamily: {
        heading: ["var(--font-cairo)", "sans-serif"],
        body: ["var(--font-tajawal)", "sans-serif"],
        latin: ["var(--font-montserrat)", "sans-serif"],
      },
      borderRadius: {
        card: "var(--ms-radius-card)",
        btn: "var(--ms-radius-btn)",
      },
      boxShadow: {
        soft: "var(--ms-shadow-soft)",
      },
    },
  },
  plugins: [],
};

export default config;
