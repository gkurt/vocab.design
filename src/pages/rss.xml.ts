import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getTerms } from '#src/lib/terms.ts';
import { pageUrl } from '#src/lib/url.ts';

/**
 * Newest entries first, so following the dictionary is a subscription rather than a
 * habit of checking. Capped because the whole collection is a thousand items and a feed
 * reader wants what changed, not the archive: the archive is /glossary.
 */
const LIMIT = 100;

export async function GET(context: APIContext): Promise<Response> {
  const terms = await getTerms();
  const items = terms
    .filter((t) => t.data.status !== 'stub')
    // Entries published on the same day are ordered by name, so the feed is stable
    // between builds instead of reshuffling whatever the collection happened to yield.
    .sort((a, b) => b.data.created.getTime() - a.data.created.getTime() || a.data.name.localeCompare(b.data.name))
    .slice(0, LIMIT)
    .map((t) => ({
      title: t.data.name,
      description: t.data.definition,
      pubDate: t.data.created,
      link: pageUrl(t.data.slug),
      categories: [t.data.category, ...t.data.tags],
    }));

  return rss({
    title: 'vocab.design',
    description: 'A linked visual dictionary of design and UI vocabulary: new entries as they are published.',
    site: context.site ?? 'https://vocab.design',
    // Off by default, and a feed is one more place a page gets named (SPEC §3).
    trailingSlash: false,
    items,
    customData: '<language>en</language>',
  });
}
