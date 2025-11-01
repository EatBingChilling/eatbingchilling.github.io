// tailwind.config.cjs
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mjs}'],
  darkMode: 'class',

  theme: {
    extend: {
      // 1. 把默认 sans 改成你自己的字体
      fontFamily: {
        sans: ['ChillRoundGothic_Medium', 'Roboto', 'sans-serif', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    // 2. 注册 .link 组件类，供 markdown.css 里 @apply link 使用
    require('tailwindcss/plugin')(function ({ addComponents }) {
      addComponents({
        '.link': {
          '@apply text-[var(--primary)] underline decoration-[var(--link-underline)] decoration-1 decoration-dashed underline-offset-4': {},
        },
      });
    }),
  ],
};
