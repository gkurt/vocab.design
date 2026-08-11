import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE || 'https://vocab.design',
  base: process.env.BASE_URL || '/',
  // Specimen documents (SPEC §6) are the inside of an <iframe>, not pages: they are
  // embedded by a term page, carry no prose, and must not compete with it in search.
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/specimen/') })],
  vite: {
    plugins: [tailwindcss()],
  },
});
