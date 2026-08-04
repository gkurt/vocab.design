const DIACRITICS = /[\u0300-\u036f]/g;

/** Normalize a term or alias name into its canonical URL slug: lowercase ASCII, hyphen-separated. */
export function slugify(name: string): string {
  return name
    .normalize('NFKD')
    .replace(DIACRITICS, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
