/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6c63ff",
        secondary: "#eeedfd",
        success: "#10b981",
        warning: "#f59e0b",
        error: "#f43f5e",
        light: "#f7f7f7",
        dark: "#020202",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
