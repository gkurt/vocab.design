import { readdirSync, readFileSync } from 'node:fs';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { pagefindDev } from './src/integrations/pagefind-dev.ts';
import { SECTIONS } from './src/lib/routes.ts';

const TERMS_DIR = 'src/content/terms';
const base = (process.env.BASE_URL || '/').replace(/\/$/, '');

/**
 * Slug to `modified` day, read straight off the frontmatter because the content
 * collection does not exist yet while this config is being evaluated. It answers both
 * sitemap questions: which paths are terms, and when each one last changed.
 */
const days = new Map<string, string>();
for (const file of readdirSync(TERMS_DIR)) {
  if (!file.endsWith('.mdx')) continue;
  const modified = /^modified:\s*(\S+)/m.exec(readFileSync(`${TERMS_DIR}/${file}`, 'utf8'))?.[1];
  if (modified) days.set(file.slice(0, -4), modified);
}
/** The listing pages change when any term does, which is the honest lastmod for them. */
const newest = [...days.values()].sort().at(-1);

/** The path a sitemap entry is really about, with the deploy's base prefix taken off. */
function pathOf(url: string): string {
  const { pathname } = new URL(url);
  return (base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname).replace(/^\/|\/$/g, '');
}

export default defineConfig({
  site: process.env.SITE || 'https://vocab.design',
  base: process.env.BASE_URL || '/',
  trailingSlash: 'never',
  // One spelling per page, and it is the one without the slash. `file` is what makes that
  // spelling the real 200: the directory format serves /toast/ and redirects /toast to it,
  // so every canonical URL would have named a redirect. GitHub Pages serves toast.html at
  // /toast, which is the whole reason this is available to us.
  build: { format: 'file' },
  integrations: [
    mdx(),
    sitemap({
      /**
       * A sitemap is an index of canonical documents, so this is an allowlist and
       * everything it does not name is dropped. What that removes: the ~3,900 alias URLs,
       * which exist only to redirect to a term and would have made four fifths of the
       * file redirects; the specimen documents, which are the inside of an <iframe> (SPEC
       * §6) and must not compete with the page embedding them; and /search, which is a
       * tool rather than a document. Anything genuinely new and top-level has to be added
       * to SECTIONS to be listed, which is the trade for never listing junk.
       */
      filter: (page) => {
        const path = pathOf(page);
        if (path === '') return true;
        const [section] = path.split('/') as [string, ...string[]];
        if (section === 'search') return false;
        return (SECTIONS as readonly string[]).includes(section) || days.has(path);
      },
      serialize: (item) => {
        const lastmod = days.get(pathOf(item.url)) ?? newest;
        if (lastmod) item.lastmod = new Date(lastmod).toISOString();
        return item;
      },
    }),
    // Lets /search work under `astro dev` against the last build's index (dev only).
    pagefindDev(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
