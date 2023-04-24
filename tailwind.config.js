/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",

  theme: {
    extend: {
      backgroundImage: {
        "gradient-light":
          "linear-gradient(315deg,rgba(249, 250, 251, 0.3) 70%, rgba(16, 185, 129, 0.3) 30%)",
        "gradient-dark":
          "linear-gradient(315deg,rgba(31, 41, 55, 0.3) 70%, rgba(138, 92, 246, 0.3) 30%)",
        "gradient-ocean-blue":
          "linear-gradient(315deg,rgba(0, 118, 182, 0.3) 70%, rgba(0, 180, 216, 0.3) 30%)",
        "gradient-tokyo-night":
          "linear-gradient(315deg,rgba(26, 32, 44, 0.3) 70%, rgba(245, 101, 101, 0.3) 30%)",
      },
      backgroundColor: {
        light: {
          DEFAULT: "#f9fafb",
          primary: "#3b82f6",
          secondary: "#10b981",
          tertiary: "#fbbf24",
        },
        dark: {
          DEFAULT: "#1f2937",
          primary: "#8b5cf6",
          secondary: "#ec4899",
          tertiary: "#fbbf24",
        },
        "ocean-blue": {
          DEFAULT: "#0077b6",
          primary: "#00b4d8",
          secondary: "#90e0ef",
          tertiary: "#f48c06",
        },
        "tokyo-night": {
          DEFAULT: "#1a202c",
          primary: "#f56565",
          secondary: "#48bb78",
          tertiary: "#fbbf24",
        },
      },
      textColor: {
        light: {
          DEFAULT: "#1f2937",
          primary: "#3b82f6",
          secondary: "#10b981",
          tertiary: "#fbbf24",
        },
        dark: {
          DEFAULT: "#f9fafb",
          primary: "#8b5cf6",
          secondary: "#ec4899",
          tertiary: "#fbbf24",
        },
        "ocean-blue": {
          DEFAULT: "#caf0f8",
          primary: "#00b4d8",
          secondary: "#90e0ef",
          tertiary: "#f48c06",
        },
        "tokyo-night": {
          DEFAULT: "#edf2f7",
          primary: "#f56565",
          secondary: "#48bb78",
          tertiary: "#fbbf24",
        },
      },
      borderColor: {
        light: {
          DEFAULT: "#e5e7eb",
          primary: "#3b82f6",
          secondary: "#10b981",
          tertiary: "#fbbf24",
        },
        dark: {
          DEFAULT: "#4b5563",
          primary: "#8b5cf6",
          secondary: "#ec4899",
          tertiary: "#fbbf24",
        },
        "ocean-blue": {
          DEFAULT: "#00b4d8",
          primary: "#00b4d8",
          secondary: "#90e0ef",
          tertiary: "#f48c06",
        },
        "tokyo-night": {
          DEFAULT: "#2d3748",
          primary: "#f56565",
          secondary: "#48bb78",
          tertiary: "#fbbf24",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
    },
  },
  plugins: [],
};
