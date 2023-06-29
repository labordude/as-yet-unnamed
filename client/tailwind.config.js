/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{js,ts,jsx,tsx}",
    "./dist/**/*.{js,ts,jsx,tsx}",
    "./**/*.{html,jsx}",
  ],
  theme: {
    colors: {
      playstation_blue: "#6366F1",
      darker_blue: "#4346EF",
      lightgray: "#F5F5F5",
      tomato: "#FE654F",
      darker_red: "#FE3D20",
      charcoal: "#1E2D24",
      smokey: "#334139",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
