import { getTerms } from '#src/lib/terms.ts';

/** Full machine-readable dataset (SPEC §10) — agents are an audience. */
export async function GET(): Promise<Response> {
  const terms = await getTerms();
  return Response.json({
    set: 'vocab.design',
    url: 'https://vocab.design',
    license: 'CC BY 4.0',
    // `exhibit` is curation of the front page, not a fact about the word (SPEC §3).
    terms: terms.map(({ data: { exhibit: _exhibit, ...term } }) => term).sort((a, b) => a.slug.localeCompare(b.slug)),
  });
}
