/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['var(--font-cairo)', 'sans-serif'],
        tajawal: ['var(--font-tajawal)', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#0B0F19',
          surface: '#111827',
          azure: '#007BFF',
          pink: '#FF007F',
          orange: '#FF8C00',
        },
        'brand-blue': {
          DEFAULT: '#0056b3',
          light: '#00aaff',
        },
      },
    },
  },
  plugins: [],
}