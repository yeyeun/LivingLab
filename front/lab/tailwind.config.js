/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js, jsx, ts, tsx}'],
  theme: {
    extend: {
      fontFamily: {
        NotoSansKR: ['Noto Sans KR', 'sans-serif'],
        Jua: ['Jua', 'sans-serif'],
      },
      colors: {
        mainColor: '#6AC5B7',
        subColor: '#89540A',
      },
      gridTemplateColumns: {
        custom: '586px minmax(0px, 1fr) minmax(0px, 1fr)',
      },
      spacing: {
        2.5: '0.625rem', // 10px
      },
    },
  },
  plugins: [],
};
