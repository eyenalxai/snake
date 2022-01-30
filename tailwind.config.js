module.exports = {
  darkMode: "media",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    "text-2xl",
    "text-3xl",
    "dark:border-t-amber-500",
    "dark:border-b-amber-500",
    "dark:border-l-amber-500",
    "dark:border-r-amber-500",
    "border-t-gray-900",
    "border-b-gray-900",
    "border-l-gray-900",
    "border-r-gray-900",
    "border-t-4",
    "border-b-4",
    "border-l-4",
    "border-r-4",
    "dark:border-t-4",
    "dark:border-b-4",
    "dark:border-l-4",
    "dark:border-r-4",
    {
      pattern: /grid-cols-*/
    }
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        13: "repeat(13, minmax(0, 1fr))",
        14: "repeat(14, minmax(0, 1fr))",
        15: "repeat(15, minmax(0, 1fr))",
        16: "repeat(16, minmax(0, 1fr))"
      }
    }
  },
  plugins: []
}
