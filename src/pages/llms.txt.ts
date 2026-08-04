import { getTerms } from '#src/lib/terms.ts';

export async function GET(): Promise<Response> {
  const terms = await getTerms();
  const lines = terms
    .filter((t) => t.data.status !== 'stub')
    .sort((a, b) => a.data.slug.localeCompare(b.data.slug))
    .map((t) => `- [${t.data.name}](https://vocab.design/${t.data.slug}.md): ${t.data.definition}`);
  const body = [
    '# vocab.design',
    '',
    '> A linked visual dictionary of design and UI vocabulary: terms, definitions, aliases,',
    '> relations between concepts, and pointers to real implementations. Content is CC BY 4.0.',
    '',
    'Every term is served as HTML at /{slug} and as raw markdown at /{slug}.md.',
    'The full dataset is at https://vocab.design/terms.json.',
    '',
    '## Terms',
    '',
    ...lines,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
