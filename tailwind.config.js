/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#020617", // Slate 950
          card: "#0f172a", // Slate 900
          border: "#1e293b", // Slate 800
        },
        primary: {
          light: "#8b5cf6", // Violet 500
          DEFAULT: "#6366f1", // Indigo 500
          dark: "#4f46e5", // Indigo 600
        },
        neon: {
          cyan: "#22d3ee",
          purple: "#d946ef",
          blue: "#3b82f6",
        },
        board: {
          light: "#ebecd0",
          dark: "#779556",
          classic_light: "#eeeed2",
          classic_dark: "#769656",
          dark_light: "#4b7399",
          dark_dark: "#2c4c6b",
          neon_light: "#1e293b",
          neon_dark: "#0f172a",
        }
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      }
    },
  },
  plugins: [],
};

