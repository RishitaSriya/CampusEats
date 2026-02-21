/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glass: '0 8px 30px rgba(15, 23, 42, 0.3)'
      }
    }
  },
  plugins: []
};
