// tailwind.config.ts
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
        carna: {
          bg: "#0f1115",         // Deep Space
          card: "#1a1d23",       // Dark Gunmetal
          accent: "#f97316",     // Saffron (orange-500)
          text: "#e2e8f0",       // Off-white (slate-200)
          muted: "#64748b",      // Slate-500
        },
      },
    },
  },
  plugins: [],
};
export default config;