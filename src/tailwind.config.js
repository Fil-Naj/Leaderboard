/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e0f2ff',
          100: '#b3dbff',
          200: '#80c2ff',
          300: '#4da8ff',
          400: '#1b8dff',
          500: '#0074e0',
          600: '#005bb0',
          700: '#004280',
          800: '#002950',
          900: '#001220'
        }
      }
    }
  },
  plugins: []
};
