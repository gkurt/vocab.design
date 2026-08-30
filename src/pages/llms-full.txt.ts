import { CATEGORIES } from '#src/lib/schema.ts';
import { getTerms } from '#src/lib/terms.ts';

/** The vocabulary itself (SPEC §10): every term with its definition, under its category. */
export async function GET(): Promise<Response> {
  const terms = await getTerms();
  const published = terms.filter((t) => t.data.status !== 'stub').sort((a, b) => a.data.name.localeCompare(b.data.name));
  const sections = CATEGORIES.flatMap((category) => {
    const members = published.filter((t) => t.data.category === category);
    if (members.length === 0) return [];
    return [
      `## ${category}`,
      '',
      ...members.map((t) => `- [${t.data.name}](https://vocab.design/${t.data.slug}.md): ${t.data.definition}`),
      '',
    ];
  });
  const body = [
    '# vocab.design',
    '',
    `> All ${published.length.toLocaleString('en-US')} terms in the dictionary, with their definitions, under the category`,
    '> each is filed in. Every link is to the term as raw markdown; the same term is an',
    '> HTML page at https://vocab.design/{slug}. Content is CC BY 4.0.',
    '',
    'What the categories and tags mean, and what other kinds of page there are, is in',
    '[llms.txt](https://vocab.design/llms.txt). Aliases, relations and implementations are',
    'in [terms.json](https://vocab.design/terms.json).',
    '',
    ...sections,
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
