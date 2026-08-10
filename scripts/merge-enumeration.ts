/**
 * Merge the per-category enumeration sweeps (research/enumeration/<category>.json)
 * into candidates.json, reporting anything the canonicalize stage must resolve:
 * duplicate slugs, collisions with existing terms, editorial violations, and
 * implementation systemIds missing from systems.json. SPEC §11, stages 1→2.
 */
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { CATEGORIES } from '#src/lib/schema.ts';

const DIR = join(import.meta.dir, '..', 'research', 'enumeration');
const TERMS_DIR = join(import.meta.dir, '..', 'src', 'content', 'terms');

interface Candidate {
  name: string;
  slug: string;
  category: string;
  definition: string;
  useWhen?: string;
  aliases?: { name: string; source?: string }[];
  relatedSlugs?: string[];
  priority?: string;
  demo?: string;
  sources?: { title: string; url: string }[];
  implementations?: { systemId: string; name: string; url: string; verified?: boolean }[];
  notes?: string;
  /** Which category file(s) the record came from; filled by this script. */
  sweptFrom?: string[];
}

const problems: string[] = [];
const warn = (msg: string) => problems.push(msg);

const existing = new Set((await readdir(TERMS_DIR)).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, '')));

const systemsFile = Bun.file(join(DIR, 'systems.json'));
const systems: { id: string }[] = (await systemsFile.exists()) ? await systemsFile.json() : [];
const systemIds = new Set(systems.map((s) => s.id));
if (systemIds.size === 0) warn('systems.json missing or empty; systemId cross-check skipped');

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const bySlug = new Map<string, Candidate>();
let read = 0;

for (const category of CATEGORIES) {
  const file = Bun.file(join(DIR, `${category}.json`));
  if (!(await file.exists())) {
    warn(`missing sweep file: ${category}.json`);
    continue;
  }
  let records: Candidate[];
  try {
    records = await file.json();
  } catch (e) {
    warn(`${category}.json is not valid JSON: ${e}`);
    continue;
  }
  for (const r of records) {
    read++;
    const at = `${category}.json → ${r.slug ?? r.name ?? '?'}`;
    if (!r.name || !r.slug || !r.definition) warn(`${at}: missing name/slug/definition`);
    if (r.slug && !SLUG.test(r.slug)) warn(`${at}: slug is not kebab-case`);
    if (!CATEGORIES.includes(r.category as (typeof CATEGORIES)[number])) warn(`${at}: unknown category "${r.category}"`);
    if (r.definition && r.definition.length > 200) warn(`${at}: definition over 200 chars (${r.definition.length})`);
    if (r.useWhen && r.useWhen.length > 90) warn(`${at}: useWhen over 90 chars (${r.useWhen.length})`);
    for (const [field, value] of Object.entries(r)) {
      if (typeof value === 'string' && value.includes('—')) warn(`${at}: em-dash in ${field}`);
    }
    if (existing.has(r.slug)) {
      warn(`${at}: collides with an existing term, dropped (fold any new aliases into that term instead)`);
      continue;
    }
    for (const impl of r.implementations ?? []) {
      if (systemIds.size > 0 && !systemIds.has(impl.systemId))
        warn(`${at}: implementation systemId "${impl.systemId}" not in systems.json`);
      if (impl.verified === false) warn(`${at}: unverified implementation row (${impl.systemId}) needs a probe pass`);
    }
    const prior = bySlug.get(r.slug);
    if (prior) {
      prior.sweptFrom!.push(category);
      warn(`duplicate slug "${r.slug}" (${prior.category} vs ${category}); kept first, canonicalize must pick`);
      continue;
    }
    bySlug.set(r.slug, { ...r, sweptFrom: [category] });
  }
}

const candidates = [...bySlug.values()].sort((a, b) => a.slug.localeCompare(b.slug));
await Bun.write(join(DIR, 'candidates.json'), `${JSON.stringify(candidates, null, 2)}\n`);

const byCategory = new Map<string, number>();
const byPriority = new Map<string, number>();
let implRows = 0;
let implVerified = 0;
for (const c of candidates) {
  byCategory.set(c.category, (byCategory.get(c.category) ?? 0) + 1);
  byPriority.set(c.priority ?? 'unset', (byPriority.get(c.priority ?? 'unset') ?? 0) + 1);
  implRows += c.implementations?.length ?? 0;
  implVerified += (c.implementations ?? []).filter((i) => i.verified).length;
}

console.log(`read ${read} records → ${candidates.length} unique candidates (existing terms: ${existing.size})`);
console.log(`by category: ${[...byCategory.entries()].map(([k, v]) => `${k} ${v}`).join(' · ')}`);
console.log(`by priority: ${[...byPriority.entries()].map(([k, v]) => `${k} ${v}`).join(' · ')}`);
console.log(`implementations: ${implRows} rows, ${implVerified} verified, ${systemIds.size} systems in registry`);
if (problems.length > 0) {
  console.log(`\n${problems.length} issue(s) for canonicalize:`);
  for (const p of problems) console.log(`  - ${p}`);
}
