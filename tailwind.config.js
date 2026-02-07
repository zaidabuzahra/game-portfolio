/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"], // This MUST be 'app'
  theme: {
    extend: {
      colors: {
        'game-accent': '#38bdf8',
      }
    },
  },
  plugins: [],
}