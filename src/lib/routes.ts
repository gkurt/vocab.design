/**
 * Top-level names the site spends on itself. Terms and aliases live at the root (SPEC
 * §3), which makes this list load-bearing twice over: a term slugifying to one of these
 * would shadow a real route, and a sitemap that allowlists these plus the term slugs is
 * left with exactly the alias redirects to drop.
 */
export const SECTIONS = ['browse', 'glossary', 'search', 'tags'] as const;
/* `browse` and `tags` are namespace prefixes rather than pages: neither directory index
   exists any more (the front page is the directory), but `/browse/{category}` and
   `/tags/{tag}` still live under them, so both names stay spent. */

/**
 * The sections, plus the two namespaces that are not pages at all: the frame documents
 * (SPEC §6) and the capture set the share images are shot from (SPEC §10).
 */
export const RESERVED = new Set<string>([...SECTIONS, 'specimen', 'capture']);

/**
 * Every non-term path prose is allowed to link to: the pages, the exports, the feed.
 * `/browse` and `/tags` are absent because neither is a page; a prose link to a category
 * or a facet names the leaf directly, which `bun validate` checks against the enums.
 */
export const SITE_ROUTES = new Set(['/', '/glossary', '/search', '/llms.txt', '/terms.json', '/rss.xml']);
