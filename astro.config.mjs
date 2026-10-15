import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // TODO: поменять на свой домен
  site: 'https://example.com',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'always',
  },
});
