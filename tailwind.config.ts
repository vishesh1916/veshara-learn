import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5F3EE",
        primary: "#11110F",
        accent: "#D9FF25",
        secondary: "#74736D",
        "border-custom": "#DEDDD6",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 7vw, 6rem)", { lineHeight: "0.92", letterSpacing: "-0.035em", fontWeight: "700" }],
        "display-xl": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-lg": ["clamp(2rem, 3.5vw, 3.25rem)", { lineHeight: "0.98", letterSpacing: "-0.025em", fontWeight: "700" }],
        "display-md": ["clamp(1.5rem, 2.5vw, 2.25rem)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75" }],
        "body-md": ["1rem", { lineHeight: "1.7" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.25rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "2.5rem",
        },
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(17, 17, 15, 0.04)',
        'card': '0 4px 20px rgba(17, 17, 15, 0.06)',
        'card-hover': '0 12px 32px rgba(17, 17, 15, 0.09)',
        'accent-glow': '0 0 30px rgba(217, 255, 37, 0.3)',
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-up": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        }
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-up": "scale-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
