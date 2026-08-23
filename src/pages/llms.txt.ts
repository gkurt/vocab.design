import { facets, families } from '#src/lib/tags.ts';
import { getTerms } from '#src/lib/terms.ts';

export async function GET(): Promise<Response> {
  const terms = await getTerms();
  const lines = terms
    .filter((t) => t.data.status !== 'stub')
    .sort((a, b) => a.data.slug.localeCompare(b.data.slug))
    .map((t) => `- [${t.data.name}](https://vocab.design/${t.data.slug}.md): ${t.data.definition}`);
  const facetLines = facets(terms).map(
    (f) => `- ${f.tag} (${f.terms.length}) ${f.blurb} Members: ${f.terms.map((t) => t.data.slug).join(', ')}`,
  );
  const familyLines = families(terms)
    .filter((f) => f.members.length > 0)
    .map((f) => `- ${f.slug} (${f.members.length}) ${f.why} Members: ${f.members.map((t) => t.data.slug).join(', ')}`);
  const body = [
    '# vocab.design',
    '',
    '> A linked visual dictionary of design and UI vocabulary: terms, definitions, aliases,',
    '> relations between concepts, and pointers to real implementations. Content is CC BY 4.0.',
    '',
    'Every term is served as HTML at /{slug} and as raw markdown at /{slug}.md.',
    'The full dataset is at https://vocab.design/terms.json.',
    '',
    '## Facets',
    '',
    'Cross-cutting groupings, listed at /tags and one page each at /tags/{facet}.',
    'A term has exactly one category and any number of facets.',
    '',
    ...facetLines,
    '',
    '## Families',
    '',
    'A grouping whose own name is a term, so it is published at /{slug} rather than as a facet',
    'and /tags/{slug} redirects there. Members declare it with variantOf or partOf.',
    '',
    ...familyLines,
    '',
    '## Terms',
    '',
    ...lines,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
