/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#002f34', // OLX primary dark blue-green
          hover: '#004f56',
        },
        secondary: {
          DEFAULT: '#3a77ff', // Vibrant blue for buttons/accents
          hover: '#2a5cd6',
        }
      }
    },
  },
  plugins: [],
}
