/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js, jsx, ts, tsx}"],
  theme: {
    extend: {
      fontFamily: {
        NotoSansKR : ["Noto Sans KR", "sans-serif"],
        Jua : ["Jua", "sans-serif"]
      },
      colors : {
        'mainColor' : '#6AC5B7',
        'subColor' : '#89540A'
      }
    },
  },
  plugins: [],
};
