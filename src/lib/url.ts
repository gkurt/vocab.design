const base = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL;

export function pageUrl(page: string): string {
  return `${base}${page}`;
}

export function absoluteUrl(page: string): string {
  return `${import.meta.env.SITE}${pageUrl(page)}`;
}
