import { CATEGORY_BLURBS } from '#src/lib/categories.ts';
import { CATEGORIES } from '#src/lib/schema.ts';
import { facets, TERM_TAGS } from '#src/lib/tags.ts';
import { getTerms } from '#src/lib/terms.ts';

/**
 * The map of the site, for an agent that has landed on it (SPEC §10): what kinds of page
 * there are, what a URL of each kind looks like, and what the two closed enums mean. The
 * vocabulary itself is one link away in /llms-full.txt, because a directory that inlines
 * its contents is 245KB of definitions a reader has to scroll past to find the shape.
 */
export async function GET(): Promise<Response> {
  const terms = await getTerms();
  const published = terms.filter((t) => t.data.status !== 'stub');
  const categoryLines = CATEGORIES.map((category) => {
    const count = published.filter((t) => t.data.category === category).length;
    return `- ${category} (${count}): ${CATEGORY_BLURBS[category]}`;
  });
  const tagLines = facets(published).map((f) => `- ${f.tag} (${f.terms.length}): ${f.blurb}`);
  const body = [
    '# vocab.design',
    '',
    '> A linked visual dictionary of design and UI vocabulary: terms, definitions, aliases,',
    '> relations between concepts, and pointers to real implementations. Content is CC BY 4.0.',
    '',
    '## Pages',
    '',
    'The site is at https://vocab.design, and every path below is relative to it.',
    '',
    '- /{slug}: a term. Definition, article, live specimen, aliases, related terms, and the',
    '  design systems that implement it.',
    '- /{slug}.md: the same term as raw markdown.',
    '- /{alias}: a redirect to the term that spelling names. Aliases live at the root beside',
    '  the terms, so /snackbar answers as well as /toast.',
    '- /browse/{category}: every term in one category, with definitions.',
    '- /tags/{tag}: every term carrying one tag, grouped by category.',
    '- /glossary and /glossary/{letter}: A to Z over every term and every alias.',
    '- /search?q={query}: full text over headwords, aliases, definitions and articles,',
    '  filtered by category and by tag.',
    '',
    '## Data',
    '',
    `- [llms-full.txt](https://vocab.design/llms-full.txt): all ${published.length.toLocaleString('en-US')} terms with their definitions.`,
    '- [terms.json](https://vocab.design/terms.json): the whole dataset, including aliases,',
    '  relations, tags and implementations.',
    '- [rss.xml](https://vocab.design/rss.xml): the hundred most recently published terms.',
    '',
    '## Categories',
    '',
    'Every term has exactly one, and it is the kind of thing the term is.',
    '',
    ...categoryLines,
    '',
    '## Tags',
    '',
    'Cross-cutting groupings. A term carries any number of them, or none.',
    `Three tags are also terms, with a definition and a page of their own at /{tag}: ${TERM_TAGS.join(', ')}.`,
    '',
    ...tagLines,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
