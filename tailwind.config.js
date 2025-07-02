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
          50: '#f0f9f9',
          100: '#deeef0',
          200: '#c1dee3',
          300: '#96c6ce',
          400: '#6ba8b2',
          500: '#4c8a96',
          600: '#2d5f5f',
          700: '#2a5658',
          800: '#274849',
          900: '#253d3f',
        },
        secondary: {
          50: '#f4f7f5',
          100: '#e6eeea',
          200: '#cfded6',
          300: '#abc8b8',
          400: '#6b9080',
          500: '#5a7f70',
          600: '#4a6a5c',
          700: '#3d564b',
          800: '#33463e',
          900: '#2c3b35',
        },
        accent: {
          50: '#fdf4f2',
          100: '#fce7e1',
          200: '#f9d2c9',
          300: '#f4b3a4',
          400: '#ec8370',
          500: '#e07a5f',
          600: '#d15738',
          700: '#b1432b',
          800: '#923827',
          900: '#783326',
        },
        surface: '#f4f4f9',
        success: '#52b788',
        warning: '#f4a261',
        error: '#e76f51',
        info: '#4ecdc4',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
'100%': { transform: 'translateY(0)', opacity: '1' },
      },
      pulseSoft: {
        '0%, 100%': { opacity: '1' },
        '50%': { opacity: '0.6' },
      },
    },
    scale: {
      '102': '1.02',
      '103': '1.03',
    },
  },
},
plugins: [],
}