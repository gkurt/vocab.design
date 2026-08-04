import type { APIContext } from 'astro';
import { stringify } from 'yaml';
import { getTerms } from '#src/lib/terms.ts';

/** Raw-markdown twin of every term page (SPEC §10) — the agent-facing format. */
export async function getStaticPaths() {
  const terms = await getTerms();
  return terms.map((term) => ({ params: { slug: term.data.slug }, props: { term } }));
}

export function GET({ props }: APIContext): Response {
  const { term } = props;
  const body = `---\n${stringify(term.data)}---\n\n${term.entry.body ?? ''}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
