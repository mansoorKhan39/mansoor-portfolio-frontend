/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        obsidian: '#050505',
        carbon: '#0D0D0F',
        silver: {
          300: '#E4E4E7',
          400: '#A1A1AA',
          500: '#71717A',
        },
      },
    },
  },
  plugins: [],
}
