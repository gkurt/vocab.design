import { readFileSync, readdirSync, writeFileSync } from 'node:fs';

/**
 * Briefs generator TEMPLATE. Copy to a scratch location, fill PLAN with this
 * round's 54 slugs and their demo hints, set OUT, run from the repo root with bun.
 * It refuses slugs that are already on site or missing from the pool, so a bad
 * roster fails here instead of mid-round.
 *
 * HINT ANATOMY (one string per term, 2-5 sentences): what the specimen shows and
 * how states are reached (absolute picks via segmented/controls, never toggles
 * unless the flip IS the term); the subject decision or "decide and note";
 * which existing terms the article must contrast or link, ESPECIALLY round-mates
 * and any on-site term whose article NAMED this one (pay the IOU by linking
 * back); any alias the collision check found to be claimed (say "do not claim X,
 * it belongs to Y"); any honesty duty (data-pose, captioned counter-example,
 * verify-what-actually-renders on the dev server).
 */
const OUT = 'briefs-ROUND.json'; // set an absolute scratch path before running

const TRACKED = new Set(['aria-apg', 'material', 'hig', 'fluent', 'carbon', 'polaris', 'radix', 'base-ui', 'shadcn']);

const PLAN: Record<string, Record<string, string>> = {
  component: {},
  layout: {},
  pattern: {},
  interaction: {},
  motion: {},
  typography: {},
  color: {},
  aesthetic: {},
  accessibility: {},
};

const cands = JSON.parse(readFileSync('research/enumeration/candidates.json', 'utf8'));
const existing = new Set(readdirSync('src/content/terms').map((f) => f.replace('.mdx', '')));
const out: Record<string, unknown[]> = {};
const problems: string[] = [];
for (const [category, slugs] of Object.entries(PLAN)) {
  out[category] = Object.entries(slugs).map(([slug, hint]) => {
    if (existing.has(slug)) problems.push(`${slug} already on site`);
    const r = cands.find((x: { slug: string }) => x.slug === slug);
    if (!r) problems.push(`${slug} not in candidates`);
    return {
      slug,
      name: r?.name ?? slug,
      category,
      priority: r?.priority ?? 'core',
      definition: r?.definition ?? '',
      useWhen: r?.useWhen ?? null,
      aliases: r?.aliases ?? [],
      implementations: (r?.implementations ?? []).filter((i: { systemId: string }) => TRACKED.has(i.systemId)),
      sources: (r?.sources ?? []).slice(0, 3),
      hint,
    };
  });
}
if (problems.length) throw new Error(problems.join('; '));
writeFileSync(OUT, JSON.stringify(out, null, 1));
console.log('written:', Object.entries(out).map(([k, v]) => `${k} ${(v as unknown[]).length}`).join(' · '));

// The workflow script has no filesystem access, so it cannot read these briefs: the roster
// has to be a literal in it. Print it ready to paste, because a roster retyped by hand is a
// roster that drifts, and the whole value of the verify gate knowing the round's shape is
// that the shape is right.
const roster = Object.fromEntries(Object.entries(out).map(([k, v]) => [k, (v as { slug: string }[]).map((t) => t.slug)]));
console.log('\nROSTER for the workflow template, paste it verbatim:');
console.log(`const ROSTER = ${JSON.stringify(roster, null, 2)}`);
