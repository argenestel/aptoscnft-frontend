/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        primary: '#FF4500',
        secondary: '#FFD700',
        accent: '#00FF00',
        'base-100': '#FFFFFF',
        'base-200': '#F2F2F2',
        'base-300': '#E6E6E6',
        
        // Dark mode colors
        'dark-primary': '#FF6347',
        'dark-secondary': '#FFA500',
        'dark-accent': '#00FF7F',
        'dark-base-100': '#1F2937',
        'dark-base-200': '#111827',
        'dark-base-300': '#374151',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}