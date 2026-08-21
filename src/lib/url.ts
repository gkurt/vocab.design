// import.meta.env only exists under Astro/Vite; the e2e teardown imports this
// module from a plain runtime, where both values fall back harmlessly.
const env: Partial<ImportMetaEnv> = import.meta.env ?? {};

let base = env.BASE_URL === '/' ? '' : env.BASE_URL || '';
if (base.endsWith('/')) base = base.slice(0, -1);

export function pageUrl(page: string): string {
  if (!page.startsWith('/')) page = `/${page}`;
  return `${base}${page}`;
}

/**
 * The site's own spelling of a page, from a path that carries the file name instead.
 * Under `build.format: 'file'` Astro reports `Astro.url.pathname` as `/toast.html`, and
 * Pagefind indexes files so it hands back the same shape, but the page is published as
 * `/toast` and everything that names it (canonical, analytics, a search result's href)
 * has to agree on that one spelling.
 */
export function canonicalPath(pathname: string): string {
  const path = pathname.replace(/(?:^|\/)index\.html$/, '/').replace(/\.html$/, '');
  return path.length > 1 ? path.replace(/\/$/, '') : '/';
}

export function absoluteUrl(page: string): string {
  return `${env.SITE ?? 'https://vocab.design'}${pageUrl(page)}`;
}
