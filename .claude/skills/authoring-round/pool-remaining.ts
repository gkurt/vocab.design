import { readFileSync, readdirSync } from 'node:fs';

/**
 * Lists the unauthored candidate pool per category, core-priority first.
 * Run from the repo root: `bun .claude/skills/authoring-round/pool-remaining.ts`
 */
const cands = JSON.parse(readFileSync('research/enumeration/candidates.json', 'utf8'));
const existing = new Set(readdirSync('src/content/terms').map((f) => f.replace('.mdx', '')));
const byCat: Record<string, { slug: string; priority: string }[]> = {};
for (const r of cands) {
  if (existing.has(r.slug)) continue;
  (byCat[r.category] ??= []).push({ slug: r.slug, priority: r.priority ?? 'tail' });
}
const order = { head: 0, core: 1, common: 2, tail: 3 } as Record<string, number>;
for (const [cat, list] of Object.entries(byCat)) {
  list.sort((a, b) => (order[a.priority] ?? 4) - (order[b.priority] ?? 4) || a.slug.localeCompare(b.slug));
  console.log(`\n== ${cat} (${list.length}) ==`);
  console.log(list.map((x) => `${x.slug}[${x.priority}]`).join(' '));
}
