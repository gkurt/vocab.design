/**
 * What kind of page a path is, for grouping in analytics. The URL already tells a report
 * WHICH page was read; this tells it which kind, which is the part a path cannot answer
 * on a site where terms live at the root (`/toast` and `/browse` are not the same shape
 * of thing, and neither is `/tags/a11y`).
 *
 * Base-aware because production serves from a subpath: without stripping it, the home
 * page of `/vocab.design/` reads as a term.
 */

export type PageType = 'home' | 'term' | 'browse' | 'category' | 'glossary' | 'letter' | 'facets' | 'facet' | 'search';

export function pageType(pathname: string, base = '/'): PageType {
  const prefix = base.replace(/\/+$/, '');
  const path = prefix && pathname.startsWith(prefix) ? pathname.slice(prefix.length) : pathname;
  const segments = path.split('/').filter(Boolean);
  const [head, tail] = [segments.at(-2), segments.at(-1)];
  if (!tail) return 'home';
  if (head === 'browse') return 'category';
  if (head === 'glossary') return 'letter';
  if (head === 'tags') return 'facet';
  if (tail === 'browse') return 'browse';
  if (tail === 'glossary') return 'glossary';
  if (tail === 'tags') return 'facets';
  if (tail === 'search') return 'search';
  return 'term';
}
