/**
 * Top-level names the site spends on itself. Terms and aliases live at the root (SPEC
 * §3), which makes this list load-bearing twice over: a term slugifying to one of these
 * would shadow a real route, and a sitemap that allowlists these plus the term slugs is
 * left with exactly the alias redirects to drop.
 */
export const SECTIONS = ['browse', 'glossary', 'search', 'tags'] as const;

/** The sections, plus the frame documents, which are not pages at all (SPEC §6). */
export const RESERVED = new Set<string>([...SECTIONS, 'specimen']);

/** Every non-term path prose is allowed to link to: the sections, the exports, the feed. */
export const SITE_ROUTES = new Set(['/', '/browse', '/glossary', '/search', '/tags', '/llms.txt', '/terms.json', '/rss.xml']);
