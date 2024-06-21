/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js, jsx, ts, tsx}'],
  theme: {
    screens: {
      xs: '320px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
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
      keyframes: {
        spinIn: {
          to: { transform: 'rotate(18deg)'}
        },
        spinOut: {
          to: { transform: 'rotate(360deg)'}
        }
      },
      animation: {
        spinIn: 'spinIn 30s linear infinite',
        spinout: 'spinIn 10s linear infinite',
      },
      backdropFilter: ['hover', 'focus'],
      filter: { // 필터 유틸리티 활성화
        'none': 'none',
        'blur': 'blur(20px)',
      },
      transitionProperty: { // 트랜지션 속성 활성화
        'height': 'height',
        'spacing': 'margin, padding',
        'blur': 'filter',
      }
    },
  },
  plugins: [],
};
