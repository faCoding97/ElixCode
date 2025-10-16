/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"]
      },
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        surface: "var(--surface)",
        brand: "var(--brand)"
      }
    },
  },
  plugins: [],
}
