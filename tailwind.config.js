/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    screens: {
      xw: '367px',
      xs: '395px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1142px',
    },
    fontFamily: {
      mulish: ['Mulish', 'sans-serif'],
      reey: ['reey', 'sans-serif'],
    },
    colors: {
      ...colors,
      white: '#ffffff',
      black: '#08111F',
      primary: '#CCD8E8',
      secondary: '#395E8F',
      accent: '#FF3333',
      'accent-1': '#3139FB',
      'accent-2': '#FFFCEC',
      'accent-3': '#FFFAF3',
      'accent-4': '#3527DD',
      'accent-5': '#333333',
      gray: '#7780A1',
    },
    extend: {
      animation: {
        'spin-slow': 'spin 5s linear infinite',
      },
    },
    aspectRatio: {
      '3/4': '3 / 4', // Adds the 'aspect-ratio-3/4' utility class
      '2/3': '2 / 3', // Adds the 'aspect-ratio-2/3' utility class
    },
  },

  plugins: [require('tailwind-scrollbar-hide')],
};
