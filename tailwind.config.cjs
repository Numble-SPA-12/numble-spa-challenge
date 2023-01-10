/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/pages/**/*.{html,js}',
    'src/components/**/*.{html,js}',
    'src/index.html',
  ],
  theme: {
    extend: {
      width: {
        main: '640px',
      },
    },
  },
  plugins: [],
};
