/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        "parchment": "#f8f7ee",
        "parchment-dark": "#f2f1e7",
        "accent-orange": "#E67E22",
        "accent-green": "#a3d9a5",
        "accent-yellow": "#f1c40f",
        "primary": "#904800",
        "surface": "#f8f7ee",
        "on-surface": "#000000",
        "outline": "#000000",
      },
      fontFamily: {
        "headline": ["Space Grotesk", "sans-serif"],
        "body": ["Work Sans", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"]
      },
      borderWidth: {
        '4': '4px',
        '8': '8px',
      },
      boxShadow: {
        'hard': '4px 4px 0px 0px rgba(0,0,0,1)',
        'hard-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
      }
    },
  },
  plugins: [],
}
