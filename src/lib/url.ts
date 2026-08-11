let base = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL || '';
if (base.endsWith('/')) base = base.slice(0, -1);

export function pageUrl(page: string): string {
  if (!page.startsWith('/')) page = `/${page}`;
  return `${base}${page}`;
}

export function absoluteUrl(page: string): string {
  return `${import.meta.env.SITE}${pageUrl(page)}`;
}
