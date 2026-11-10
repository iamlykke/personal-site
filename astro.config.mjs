import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.sergeiusachev.dev',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'always',
  },
});
