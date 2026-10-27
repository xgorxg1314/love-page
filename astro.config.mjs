import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import playformCompress from '@playform/compress';

export default defineConfig({
  site: 'https://xgorxg1314.github.io',
  base: '/love-page/',
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
  integrations: [sitemap(), playformCompress()],
  i18n: {
    defaultLocale: 'zh-cn',
    locales: ['zh-cn', 'en-us'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
