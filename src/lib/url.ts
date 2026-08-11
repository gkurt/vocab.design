// import.meta.env only exists under Astro/Vite; the e2e teardown imports this
// module from a plain runtime, where both values fall back harmlessly.
const env: Partial<ImportMetaEnv> = import.meta.env ?? {};

let base = env.BASE_URL === '/' ? '' : env.BASE_URL || '';
if (base.endsWith('/')) base = base.slice(0, -1);

export function pageUrl(page: string): string {
  if (!page.startsWith('/')) page = `/${page}`;
  return `${base}${page}`;
}

export function absoluteUrl(page: string): string {
  return `${env.SITE ?? 'https://vocab.design'}${pageUrl(page)}`;
}
