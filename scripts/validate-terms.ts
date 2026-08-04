import { readdir } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { parse } from 'yaml';
import * as z from 'zod/v4';
import { type Term, termSchema } from '#src/lib/schema.ts';
import { slugify } from '#src/lib/slug.ts';

/**
 * Content gates (SPEC §11): schema validation, slug/alias uniqueness, relation
 * integrity + symmetry (stubs exempt), stub minimality, and demo file existence.
 */
const TERMS_DIR = 'src/content/terms';
const DEMOS_DIR = 'src/content/demos';
const SYMMETRIC = ['contrastWith', 'seeAlso'] as const;

const errors: string[] = [];
const terms = new Map<string, Term>();

const files = (await readdir(TERMS_DIR)).filter((f) => f.endsWith('.mdx')).sort();
for (const file of files) {
  const text = await Bun.file(join(TERMS_DIR, file)).text();
  const frontmatter = text.match(/^---\n([\s\S]*?)\n---/)?.[1];
  if (!frontmatter) {
    errors.push(`${file}: missing frontmatter`);
    continue;
  }
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
    if ((await demoFile.exists()) && !(await demoFile.text()).includes('data-subject'))
      errors.push(`${term.slug}: demo must mark its subject with data-subject (SPEC §5)`);
  }
}

if (errors.length > 0) {
  console.error(`✗ ${errors.length} content error(s):\n${errors.map((e) => `  - ${e}`).join('\n')}`);
  process.exit(1);
}
console.log(
  `✓ ${terms.size} terms valid (${[...terms.values()].filter((t) => t.status !== 'stub').length} published/draft, ${[...terms.values()].filter((t) => t.status === 'stub').length} stubs)`,
);
