/**
 * Top-level names the site spends on itself. Terms and aliases live at the root (SPEC
 * §3), which makes this list load-bearing twice over: a term slugifying to one of these
 * would shadow a real route, and a sitemap that allowlists these plus the term slugs is
 * left with exactly the alias redirects to drop.
 */
export const SECTIONS = ['browse', 'glossary', 'random', 'search', 'tags'] as const;
/* `browse` and `tags` are namespace prefixes rather than directory indexes: the front page
   is the directory, and `/browse/{category}` and `/tags/{tag}` live under them, so both
   names stay spent. Both are also redirects to the front page rather than 404s (see
   REDIRECTS): Google indexed and ranks `/browse`, and `/tags` is the same shape of URL a
   reader would try by hand. `random` is spent on a page of its own. */

/**
 * Paths that exist only to name another page. They are published (a 404 on a URL Google
 * already ranks is worse than a redirect) and excluded from the sitemap, which indexes
 * canonical documents. The ~3,900 alias redirects are dropped by the same filter, but by
 * exhaustion rather than by name: they are the root paths that are not term slugs.
 *
 * `/random` belongs here for a different reason from the other two: it names a different
 * page on every visit, so there is no canonical document for a sitemap to point at.
 */
export const REDIRECTS = new Set(['/browse', '/tags', '/random']);

/**
 * The sections, plus the two namespaces that are not pages at all: the frame documents
 * (SPEC §6) and the capture set the share images are shot from (SPEC §10).
 */
export const RESERVED = new Set<string>([...SECTIONS, 'specimen', 'capture']);

/**
 * Every non-term path prose is allowed to link to: the pages, the exports, the feed.
 * `/browse` and `/tags` are absent because both are only redirects, and `/random` because
 * it names a different page every time; a prose link to a category or a facet names the
 * leaf directly, which `bun validate` checks against the enums.
 */
export const SITE_ROUTES = new Set(['/', '/glossary', '/search', '/llms.txt', '/llms-full.txt', '/terms.json', '/rss.xml']);
