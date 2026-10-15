import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // адрес на Vercel; когда будет свой домен — поменять здесь и в public/robots.txt
  site: 'https://personal-site-ashen-one.vercel.app',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'always',
  },
});
