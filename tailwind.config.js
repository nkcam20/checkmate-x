/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#111827",
        secondary: "#374151",
        accent: "#FBBF24",
        board: {
          light: "#EBECD0",
          dark: "#779556",
          lastMove: "rgba(255, 255, 0, 0.5)",
          highlight: "rgba(255, 255, 255, 0.4)",
        }
      },
    },
  },
  plugins: [],
};
