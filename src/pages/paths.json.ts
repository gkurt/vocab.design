import { slugify } from '#src/lib/slug.ts';
import { getTerms } from '#src/lib/terms.ts';

/**
 * Every path the site answers to, small enough to fetch from the 404 page and guess
 * from. The full dataset is /terms.json, which is 870KB and the wrong thing to download
 * to correct a typo: this is the same question asked with slugs only, and aliases carry
 * the slug they resolve to rather than repeating a name.
 */
export async function GET(): Promise<Response> {
  const terms = await getTerms();
  const names: Record<string, string> = {};
  const aliases: Record<string, string> = {};
  for (const { data } of terms.sort((a, b) => a.data.slug.localeCompare(b.data.slug))) {
    names[data.slug] = data.name;
    for (const alias of data.aliases) aliases[slugify(alias.name)] = data.slug;
  }
  return Response.json({ terms: names, aliases });
}
