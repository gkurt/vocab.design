import { readdirSync, readFileSync } from 'node:fs';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { pagefindDev } from './src/integrations/pagefind-dev.ts';
import { REDIRECTS, SECTIONS } from './src/lib/routes.ts';

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
  /**
   * Stated rather than inherited. The client router turns prefetching on by itself, and
   * these are its own defaults written down: a link is fetched when a reader hovers or
   * focuses it, which on a dictionary is a good bet, since hovering a headword is most of
   * the way to reading it. `hover` and not `viewport`, because a glossary letter is
   * hundreds of links and none of them is a prediction. Both are refused for a reader on
   * a metered or slow connection, and `/random` opts out by hand (it answers differently
   * every time, so there is nothing to have fetched early).
   */
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [
    mdx(),
    sitemap({
      /**
       * A sitemap is an index of canonical documents, so this is an allowlist and
       * everything it does not name is dropped. What that removes: the ~3,900 alias URLs,
       * which exist only to redirect to a term and would have made four fifths of the
       * file redirects, and `/browse`, which redirects to the front page for the same
       * reason; the specimen documents, which are the inside of an <iframe> (SPEC
       * §6) and must not compete with the page embedding them; and /search, which is a
       * tool rather than a document. Anything genuinely new and top-level has to be added
       * to SECTIONS to be listed, which is the trade for never listing junk.
       */
      filter: (page) => {
        const path = pathOf(page);
        if (path === '') return true;
        if (REDIRECTS.has(`/${path}`)) return false;
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
