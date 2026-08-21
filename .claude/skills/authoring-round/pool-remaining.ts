import { readFileSync, readdirSync } from 'node:fs';

/**
 * Lists the unauthored candidate pool per category, core-priority first, and the
 * stub backlog beside it.
 * Run from the repo root: `bun .claude/skills/authoring-round/pool-remaining.ts`
 *
 * Filtering the pool by FILENAME is what hid 24 stubs through 21 rounds: a stub is a
 * file, so it read as authored, and none of the 24 had a pool record to be skipped in
 * the first place. Status is the question, not existence, and the stubs get their own
 * work list because that is the only place they can appear.
 */
const cands = JSON.parse(readFileSync('research/enumeration/candidates.json', 'utf8'));

const TERMS_DIR = 'src/content/terms';
const published = new Set<string>();
const stubs: { slug: string; category: string }[] = [];
for (const file of readdirSync(TERMS_DIR).filter((f) => f.endsWith('.mdx'))) {
  const fm = readFileSync(`${TERMS_DIR}/${file}`, 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  const slug = file.replace('.mdx', '');
  if (/^status:\s*stub\s*$/m.test(fm)) stubs.push({ slug, category: fm.match(/^category:\s*(\S+)/m)?.[1] ?? '?' });
  else published.add(slug);
}

const byCat: Record<string, { slug: string; priority: string }[]> = {};
for (const r of cands) {
  if (published.has(r.slug)) continue;
  if (stubs.some((s) => s.slug === r.slug)) continue;
  (byCat[r.category] ??= []).push({ slug: r.slug, priority: r.priority ?? 'tail' });
}
const order = { head: 0, core: 1, common: 2, tail: 3 } as Record<string, number>;
if (Object.keys(byCat).length === 0) console.log(`\n== pool exhausted: all ${cands.length} candidates are on site ==`);
for (const [cat, list] of Object.entries(byCat)) {
  list.sort((a, b) => (order[a.priority] ?? 4) - (order[b.priority] ?? 4) || a.slug.localeCompare(b.slug));
  console.log(`\n== ${cat} (${list.length}) ==`);
  console.log(list.map((x) => `${x.slug}[${x.priority}]`).join(' '));
}

if (stubs.length > 0) {
  console.log(`\n== STUBS (${stubs.length}) ==`);
  console.log('Published pages with a definition and nothing else. They are already linked to, so');
  console.log('they outrank most of the pool: promote them in a round before authoring new terms.');
  const byStubCat: Record<string, string[]> = {};
  for (const s of stubs) (byStubCat[s.category] ??= []).push(s.slug);
  for (const [cat, list] of Object.entries(byStubCat)) console.log(`  ${cat} (${list.length}): ${list.sort().join(' ')}`);
}
