import { readdir } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { parse } from 'yaml';
import * as z from 'zod/v4';
import { type Term, termSchema } from '#src/lib/schema.ts';
import { slugify } from '#src/lib/slug.ts';

/**
 * Content gates (SPEC §11): schema validation, slug/alias uniqueness, relation
 * integrity + symmetry (stubs exempt), stub minimality, demo file existence, and
 * the two things a specimen must carry before the e2e harness can judge it.
 */
const TERMS_DIR = 'src/content/terms';
const DEMOS_DIR = 'src/content/demos';
const SYMMETRIC = ['contrastWith', 'seeAlso'] as const;
/** A timer call that is not `clock.`-qualified, so the stage cannot freeze or stop it. */
const BARE_TIMER = /(?<![.\w])((?:set|clear)(?:Timeout|Interval)|(?:request|cancel)AnimationFrame)\s*\(/;
/** A domain named in prose. Sites the prose points a reader at have to be anchors. */
const BARE_DOMAIN = /\b[a-z0-9][a-z0-9-]*(?:\.[a-z0-9-]+)*\.(?:design|org|com|net|io|dev|app)\b/g;

/**
 * Domains named in prose without being links (SPEC §2.4): a reader told about
 * deceptive.design deserves an anchor, not a string to retype. Links and code
 * are stripped first, so the rule judges only bare mentions; raw `https://`
 * URLs left in prose are bare mentions too.
 */
function bareDomains(body: string): string[] {
  const prose = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`\n]*`/g, '')
    .replace(/\[[^\]]*\]\([^)]*\)/g, '');
  return [...prose.matchAll(BARE_DOMAIN)].map((m) => m[0]);
}

const errors: string[] = [];
const terms = new Map<string, Term>();

const files = (await readdir(TERMS_DIR)).filter((f) => f.endsWith('.mdx')).sort();
for (const file of files) {
  const text = await Bun.file(join(TERMS_DIR, file)).text();
  if (text.includes('—')) errors.push(`${file}: em-dash found; editorial style bans them (SPEC §2.4)`);
  const frontmatter = text.match(/^---\n([\s\S]*?)\n---/)?.[1];
  if (!frontmatter) {
    errors.push(`${file}: missing frontmatter`);
    continue;
  }
  const body = text.slice(text.indexOf('---', 3) + 3);
  for (const domain of bareDomains(body))
    errors.push(`${file}: "${domain}" is named in prose without being a link; anchor it to the actual site (SPEC §2.4)`);
  const result = termSchema.safeParse(parse(frontmatter));
  if (!result.success) {
    errors.push(`${file}: ${z.prettifyError(result.error)}`);
    continue;
  }
  const term = result.data;
  if (term.slug !== basename(file, '.mdx')) errors.push(`${file}: slug "${term.slug}" does not match filename`);
  if (terms.has(term.slug)) errors.push(`${file}: duplicate slug "${term.slug}"`);
  terms.set(term.slug, term);
}

const aliasOwners = new Map<string, string>();
for (const term of terms.values()) {
  for (const alias of term.aliases) {
    const aliasSlug = slugify(alias.name);
    if (terms.has(aliasSlug)) errors.push(`${term.slug}: alias "${alias.name}" collides with the term "${aliasSlug}"`);
    const owner = aliasOwners.get(aliasSlug);
    if (owner) errors.push(`${term.slug}: alias "${alias.name}" already claimed by "${owner}"`);
    aliasOwners.set(aliasSlug, term.slug);
  }
}

for (const term of terms.values()) {
  const relationEntries = Object.entries(term.relations) as [keyof Term['relations'], string[]][];
  for (const [kind, targets] of relationEntries) {
    for (const target of targets) {
      const other = terms.get(target);
      if (!other) {
        errors.push(`${term.slug}: relation ${kind} → "${target}" has no entry (create at least a stub, SPEC §2.3)`);
        continue;
      }
      const symmetric = SYMMETRIC.some((s) => s === kind);
      if (symmetric && term.status !== 'stub' && other.status !== 'stub' && !other.relations[kind].includes(term.slug))
        errors.push(`${term.slug}: ${kind} → "${target}" is not declared symmetrically`);
    }
  }

  if (term.status === 'published' && !term.useWhen) errors.push(`${term.slug}: published terms need useWhen (SPEC §2.3)`);

  if (term.status === 'stub') {
    const hasRelations = Object.values(term.relations).some((r) => r.length > 0);
    if (hasRelations || term.implementations.length > 0 || term.demo !== 'none')
      errors.push(`${term.slug}: stubs carry only name/slug/category/definition (SPEC §2.3)`);
  }

  if (term.demo !== 'none') {
    for (const piece of ['demo.ts', 'choreography.ts']) {
      if (!(await Bun.file(join(DEMOS_DIR, term.slug, piece)).exists())) errors.push(`${term.slug}: demo declared but missing ${piece}`);
    }
    const demoFile = Bun.file(join(DEMOS_DIR, term.slug, 'demo.ts'));
    if (await demoFile.exists()) {
      const source = await demoFile.text();
      if (!source.includes('data-subject')) errors.push(`${term.slug}: demo must mark its subject with data-subject (SPEC §5)`);

      // A pose is the live specimen with its clock held (SPEC §6). A timer taken from
      // the global scope is one the stage cannot reach: it keeps running under the
      // pose, dismisses the subject mid-inspection, and outlives its own mount.
      const stray = source.match(BARE_TIMER);
      if (stray) errors.push(`${term.slug}: demo calls the global ${stray[1]}; use the clock the stage passes mount() (SPEC §6)`);
    }

    // A script with nothing to prove passes the smoke test by saying nothing (SPEC §8).
    const scriptFile = Bun.file(join(DEMOS_DIR, term.slug, 'choreography.ts'));
    if ((await scriptFile.exists()) && !(await scriptFile.text()).includes('assert:'))
      errors.push(`${term.slug}: choreography needs at least one assert, or it proves nothing (SPEC §8)`);
  }
}

if (errors.length > 0) {
  console.error(`✗ ${errors.length} content error(s):\n${errors.map((e) => `  - ${e}`).join('\n')}`);
  process.exit(1);
}
console.log(
  `✓ ${terms.size} terms valid (${[...terms.values()].filter((t) => t.status !== 'stub').length} published/draft, ${[...terms.values()].filter((t) => t.status === 'stub').length} stubs)`,
);
