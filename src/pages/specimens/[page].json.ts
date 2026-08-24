import type { APIRoute, GetStaticPaths } from 'astro';
import { feedPage, feedPages } from '#src/lib/exhibit.ts';
import { getTerms } from '#src/lib/terms.ts';
import { pageUrl } from '#src/lib/url.ts';

/**
 * The carousel's feed (SPEC §3): more specimens for a reader who stays past the dozen the
 * front page is built with. Paged rather than whole, because the whole pool is 69KB
 * gzipped and a page of sixty is five: the cost should follow how long someone actually
 * watches, and a reader who leaves in the first minute fetches nothing at all.
 *
 * Each page carries the term's own link, built here. A URL assembled in the browser from
 * a base is the bug that only shows up on a site served from a subpath (SPEC §10), and
 * there is no reason for the script to do arithmetic the build can do.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const pages = feedPages(await getTerms());
  return Array.from({ length: pages }, (_, i) => ({ params: { page: String(i + 1) } }));
};

export const GET: APIRoute = async ({ params }) => {
  const terms = await getTerms();
  const page = Number(params.page);
  return Response.json({
    page,
    pages: feedPages(terms),
    terms: feedPage(terms, page).map((term) => ({ ...term, href: pageUrl(term.slug) })),
  });
};
