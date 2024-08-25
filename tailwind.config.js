/** @type {import('tailwindcss').Config} */
module.exports = {

  darkMode:'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-1': "url('../imges/slider1.jpg')",
        'hero-2': "url('../imges/slider2.jpg')",
        'hero-3': "url('../imges/slider3.png')",
      },
      colors: {
        primary: "#1d3d66",
      }
    },
  },
  plugins: [],
};
