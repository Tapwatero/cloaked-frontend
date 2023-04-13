/* eslint-disable */
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle 2s ease-in-out infinite',
        shake: 'shake 0.2s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': {transform: 'rotate(-10deg)'},
          '50%': {transform: 'rotate(10deg)'},
        },
        shake: {
          '0%, 100%': {transform: 'rotate(-4deg)'},
          '50%': {transform: 'rotate(4deg)'},
        }
      }
    }
  },
  plugins: [],
}
