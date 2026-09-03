import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08080A",
        surface: {
          50: "#18181F",
          100: "#131318",
          200: "#0D0D11",
          300: "#08080A",
        },
        gold: {
          100: "#FBF5E6",
          200: "#F3E3B6",
          300: "#E5C875",
          400: "#D4AF37",
          500: "#B8860B",
          600: "#8C6507",
        },
        ember: {
          DEFAULT: "#FF4E20",
          glow: "rgba(255, 78, 32, 0.4)",
        },
        obsidian: {
          border: "rgba(255, 255, 255, 0.08)",
          card: "rgba(18, 18, 22, 0.75)",
          glass: "rgba(12, 12, 15, 0.65)",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-plus-jakarta)", "sans-serif"],
        japanese: ["'Hiragino Mincho ProN'", "'Yu Mincho'", "'MS PMincho'", "serif"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite linear",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #FBF5E6 0%, #D4AF37 50%, #8C6507 100%)",
        "gold-shimmer": "linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.2) 50%, transparent 100%)",
        "radial-dark": "radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.06) 0%, transparent 70%)",
        "ember-glow": "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
