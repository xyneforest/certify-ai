/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef3dc', 100: '#fde4a8', 200: '#fbd174', 300: '#f5bc40',
          400: '#e8a020', 500: '#d49018', 600: '#b87c10', 700: '#8a5d0c',
          800: '#5c3e08', 900: '#2e1f04',
        },
        surface: {
          50: '#faf8f4', 100: '#f2ede4', 200: '#e5ded2',
          300: '#ddd8cc', 400: '#b5ae9f', 500: '#8a8070', 600: '#6b6355',
          700: '#4d4840', 800: '#2e2b26', 900: '#0f0f0f',
        }
      },
      fontFamily: {
        sans: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Noto Serif SC', 'serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
        'card-hover': '0 10px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
        'elevated': '0 20px 60px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
}
