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
        background: "#3b3b3b",
        primary: "#1A73E8",
        accent: "#FF4081",
        text: "#FFFFFF",
        "bg-200": "#4b4b4b",
        "bg-300": "#656565",
        "primary-100": "#4D8CFF",
        "primary-200": "#69a1ff",
        "primary-300": "#dcffff",
        "accent-100": "#FF5793",
        "accent-200": "#ffe4ff",
        "text-200": "#e0e0e0",
      },
      backgroundImage: {
        "gradient-to-r": "linear-gradient(to right, #1A73E8, #69a1ff)",
        "gradient-to-b": "linear-gradient(to bottom, #3b3b3b, #656565)",
      },
      boxShadow: {
        "neon-primary":
          "0 0 5px rgba(26, 115, 232, 0.3), 0 0 10px rgba(26, 115, 232, 0.3), 0 0 20px #1A73E8",
        "neon-primary-hover":
          "0 0 5px rgba(26, 115, 232, 0.7), 0 0 10px rgba(26, 115, 232, 0.7), 0 0 20px #1A73E8",
        "neon-secondary":
          "0 0 5px rgba(255, 64, 129, 0.3), 0 0 10px rgba(255, 64, 129, 0.3), 0 0 20px #FF4081",
        "neon-secondary-hover":
          "0 0 5px rgba(255, 64, 129, 0.7), 0 0 10px rgba(255, 64, 129, 0.7), 0 0 20px #FF4081",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-rubik)"],
      },
    },
  },
  plugins: [],
};

export default config;
