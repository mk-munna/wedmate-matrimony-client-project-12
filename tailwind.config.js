/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Lexend"],
        secondary: ["Open Sans"],

      },
      colors: {
        "primary": "#1B7261",
        "primary2": "#2f8675",
        "secondary": "#E5F4F0",
        "secondary2": "#ECF0F2",
        "dark": "#182d31",
        "heading": "#05264E",
        "Description": "#4F5E64",
        "Description2": "#abacab",
        "heading2": '#CBCCD5',
        "dp": "#9CA3AF",
        "db": "#E5E7EB",
      }
    },
  },
  plugins: [],
}