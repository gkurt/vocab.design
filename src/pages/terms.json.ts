import { getTerms } from '#src/lib/terms.ts';

/** Full machine-readable dataset (SPEC §10) — agents are an audience. */
export async function GET(): Promise<Response> {
  const terms = await getTerms();
  return Response.json({
    set: 'vocab.design',
    url: 'https://vocab.design',
    license: 'CC BY 4.0',
    terms: terms.map((t) => t.data).sort((a, b) => a.slug.localeCompare(b.slug)),
  });
}
