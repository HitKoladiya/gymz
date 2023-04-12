/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#E76F51',
        'secondary': '#2A9D8F',
        'secondary-2': '#26979c',
        'dark':'#264653',
        'light':'#E9C46A',
      }
    },
  },
  plugins: [],
}
