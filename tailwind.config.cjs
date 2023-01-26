/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "neon-green": "#a4ffaf",
      gray: "#817d92",
      "gray-very-dark": "#18171f",
      "gray-dark": "#24232c",
      white: "#e6e5ea",
      red: "#f64a4a",
      orange: "#fb7c58",
      yellow: "#f8cd65",
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }

      vsm: { max: "336px" },
      // => @media (max-width: 336px) { ... }
    },
    extend: {},
  },
  plugins: [],
};
