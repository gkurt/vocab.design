import { readdir } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { parse } from 'yaml';
import * as z from 'zod/v4';
import { CATEGORIES, TAGS, type Tag, type Term, termSchema } from '#src/lib/schema.ts';
import { slugify } from '#src/lib/slug.ts';
import { HEAD_TERMS } from '#src/lib/tags.ts';

/**
 * Content gates (SPEC §11): schema validation, slug/alias uniqueness, relation
 * integrity + symmetry (stubs exempt), tag membership floors, prose link resolution,
 * stub minimality, demo file existence, the things a specimen must carry before the
 * e2e harness can judge it, and the
 * stage-escape rules of SPEC §5-§7 (bare timers, pointer/modal/view-transition
 * escapes, transitionend waits, ungated script animation, invalid selectors).
 */
const TERMS_DIR = 'src/content/terms';
const DEMOS_DIR = 'src/content/demos';
const SYMMETRIC = ['contrastWith', 'seeAlso'] as const;
/** A timer call that is not `clock.`-qualified, so the stage cannot freeze or stop it. */
const BARE_TIMER = /(?<![.\w])((?:set|clear)(?:Timeout|Interval)|(?:request|cancel)AnimationFrame)\s*\(/;
/** APIs that reach past the stage: they capture the reader's real pointer or paint over the page. */
const ESCAPES_STAGE = /\.(requestPointerLock|showModal)\s*\(/;
/** Document-scope transitions belong to `demo: iframe` specimens only (SPEC §7). */
const VIEW_TRANSITION_CALL = /\.startViewTransition\s*(\(|\?\.)/;
/** Nothing may wait on transitionend: it never fires under reduced motion (SPEC §6). */
const TRANSITIONEND_WAIT = /addEventListener\(\s*['"]transitionend|\.ontransitionend\s*=/;
/** Kit custom elements, and the module each one's registration lives in. */
const KIT_ELEMENTS: Record<string, string> = { 'sp-segmented': 'segmented.ts', 'sp-combobox': 'combobox.ts' };
/** Comments, stripped before a markup rule reads a demo: naming an element is not using one. */
const COMMENTS = /\/\*[\s\S]*?\*\/|\/\/[^\n]*/g;
/** An unquoted attribute value starting with a digit is not a valid CSS identifier. */
const UNQUOTED_DIGIT_SELECTOR = /\[[\w-]+=\d[^\]]*\]/;
/** Routes that are not terms: the index, the tag directory, and the two machine-readable exports. */
const SITE_ROUTES = new Set(['/', '/browse', '/glossary', '/search', '/tags', '/llms.txt', '/terms.json']);
/**
 * Top-level names the site spends on itself. Terms and aliases live at the root, so a
 * term or alias slugifying to one of these would silently shadow a real route.
 */
const RESERVED = new Set(['tags', 'specimen', 'browse', 'glossary', 'search']);
/** A tag facet earns its place by collecting this many terms; below it, it is noise (SPEC §2.5). */
const TAG_FLOOR = 8;
/** More than this on one term is tag soup: the chips stop discriminating anything (SPEC §2.5). */
const TAGS_PER_TERM = 4;
/** An internal link in prose. Prose links and `relations` are the two ways a reader crosses the graph. */
const PROSE_LINK = /\]\((\/[^)\s]*)\)/g;
/** A domain named in prose. Sites the prose points a reader at have to be anchors. */
const BARE_DOMAIN = /\b[a-z0-9][a-z0-9-]*(?:\.[a-z0-9-]+)*\.(?:design|org|com|net|io|dev|app)\b/g;

/**
 * Domains named in prose without being links (SPEC §2.4): a reader told about
 * deceptive.design deserves an anchor, not a string to retype. Links and code
 * are stripped first, so the rule judges only bare mentions; raw `https://`
 * URLs left in prose are bare mentions too.
 */
/** Just the day, so a date error reads as the frontmatter spells it. */
function day(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function bareDomains(body: string): string[] {
  const prose = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`\n]*`/g, '')
    .replace(/\[[^\]]*\]\([^)]*\)/g, '');
  return [...prose.matchAll(BARE_DOMAIN)].map((m) => m[0]);
}

/**
 * Internal links in prose. Code is stripped first so an example in a fence is not a
 * claim about a route; the links themselves are what this rule is about, so unlike
 * `bareDomains` it keeps them.
 */
function proseLinks(body: string): string[] {
  const prose = body.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
  return [...prose.matchAll(PROSE_LINK)].flatMap((m) => m[1] ?? []);
}

const errors: string[] = [];
const terms = new Map<string, Term>();
/** Bodies keyed by file, so prose links can be judged once every alias is known. */
const bodies = new Map<string, string>();

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
  bodies.set(file, body);
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
  if (RESERVED.has(term.slug)) errors.push(`${term.slug}: slug collides with a site route`);
  for (const alias of term.aliases) {
    const aliasSlug = slugify(alias.name);
    if (RESERVED.has(aliasSlug)) errors.push(`${term.slug}: alias "${alias.name}" slugifies to "${aliasSlug}", a site route`);
    if (terms.has(aliasSlug)) errors.push(`${term.slug}: alias "${alias.name}" collides with the term "${aliasSlug}"`);
    const owner = aliasOwners.get(aliasSlug);
    if (owner) errors.push(`${term.slug}: alias "${alias.name}" already claimed by "${owner}"`);
    aliasOwners.set(aliasSlug, term.slug);
  }
}

/**
 * Prose links resolve (SPEC §2.3). Nothing else checks them: these are plain markdown
 * links, not collection references, so a typo builds clean and ships as a 404. Aliases
 * count, since `[slug].astro` redirects them, and so do tag pages. Runs after the alias
 * map so a link to an alias is not a false alarm.
 */
for (const [file, body] of bodies) {
  for (const target of proseLinks(body)) {
    if (SITE_ROUTES.has(target)) continue;
    const tag = target.match(/^\/tags\/([a-z0-9-]+)\/?$/)?.[1];
    if (tag) {
      if (!(TAGS as readonly string[]).includes(tag)) errors.push(`${file}: prose links to "${target}", which is not a tag (SPEC §2.5)`);
      continue;
    }
    const browsed = target.match(/^\/browse\/([a-z-]+)\/?$/)?.[1];
    if (browsed) {
      if (!(CATEGORIES as readonly string[]).includes(browsed))
        errors.push(`${file}: prose links to "${target}", which is not a category (SPEC §2.2)`);
      continue;
    }
    // The glossary is sliced by first letter, with everything non-alphabetic at /other.
    if (/^\/glossary\/([a-z]|other)\/?$/.test(target)) continue;
    const slug = target.replace(/^\//, '').replace(/\/$/, '');
    if (terms.has(slug) || aliasOwners.has(slug)) continue;
    errors.push(`${file}: prose links to "${target}", which is not a term, an alias, or a site route (SPEC §2.3)`);
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

  if (term.modified < term.created) errors.push(`${term.slug}: modified ${day(term.modified)} predates created ${day(term.created)}`);

  if (term.status === 'stub') {
    const hasRelations = Object.values(term.relations).some((r) => r.length > 0);
    if (hasRelations || term.tags.length > 0 || term.implementations.length > 0 || term.demo !== 'none')
      errors.push(`${term.slug}: stubs carry only name/slug/category/definition and their dates (SPEC §2.3)`);
  }

  if (term.tags.length > TAGS_PER_TERM)
    errors.push(`${term.slug}: ${term.tags.length} tags is soup, keep it to ${TAGS_PER_TERM} (SPEC §2.5)`);
  if (new Set(term.tags).size !== term.tags.length) errors.push(`${term.slug}: repeats a tag`);

  if (term.demo !== 'none') {
    for (const piece of ['demo.ts', 'choreography.ts']) {
      if (!(await Bun.file(join(DEMOS_DIR, term.slug, piece)).exists())) errors.push(`${term.slug}: demo declared but missing ${piece}`);
    }
    const demoFile = Bun.file(join(DEMOS_DIR, term.slug, 'demo.ts'));
    /** Kept beyond the block below so the choreography gates can read the demo too. */
    let demoSource = '';
    if (await demoFile.exists()) {
      const source = await demoFile.text();
      demoSource = source;
      if (!source.includes('data-subject')) errors.push(`${term.slug}: demo must mark its subject with data-subject (SPEC §5)`);

      // A pose is the live specimen with its clock held (SPEC §6). A timer taken from
      // the global scope is one the stage cannot reach: it keeps running under the
      // pose, dismisses the subject mid-inspection, and outlives its own mount.
      const stray = source.match(BARE_TIMER);
      if (stray) errors.push(`${term.slug}: demo calls the global ${stray[1]}; use the clock the stage passes mount() (SPEC §6)`);

      const escapee = source.match(ESCAPES_STAGE);
      if (escapee) errors.push(`${term.slug}: demo calls ${escapee[1]}(), which reaches past the stage; simulate it and say so (SPEC §7)`);
      if (term.demo !== 'iframe' && VIEW_TRANSITION_CALL.test(source))
        errors.push(`${term.slug}: startViewTransition is document-scoped; only a \`demo: iframe\` specimen may call it (SPEC §7)`);
      if (TRANSITIONEND_WAIT.test(source))
        errors.push(`${term.slug}: demo waits on transitionend, which never fires under reduced motion; time it on the clock (SPEC §6)`);
      if (source.includes('.animate(') && !source.includes('prefersReducedMotion'))
        errors.push(`${term.slug}: demo animates in script without asking prefersReducedMotion (SPEC §6)`);

      // A kit custom element only upgrades where its module has been imported, and one
      // that never upgrades answers a click with silence: the choreography presses a
      // segment, the thumb does not move, and the assert fails with nothing to point at.
      const markup = source.replace(COMMENTS, '');
      for (const [element, module] of Object.entries(KIT_ELEMENTS)) {
        if (markup.includes(`<${element}`) && !markup.includes(`kit/${module}`))
          errors.push(`${term.slug}: demo uses <${element}> without importing #src/kit/${module}, so it never upgrades (SPEC §5)`);
      }
    }

    // A script with nothing to prove passes the smoke test by saying nothing (SPEC §8).
    const scriptFile = Bun.file(join(DEMOS_DIR, term.slug, 'choreography.ts'));
    if (await scriptFile.exists()) {
      const script = await scriptFile.text();
      if (!script.includes('assert:')) errors.push(`${term.slug}: choreography needs at least one assert, or it proves nothing (SPEC §8)`);
      const invalid = script.match(UNQUOTED_DIGIT_SELECTOR);
      if (invalid)
        errors.push(`${term.slug}: choreography selector ${invalid[0]} has an unquoted value starting with a digit; quote it (SPEC §8)`);
      // Every two-contact gesture performs as touch, so its scene has to say it is a touch
      // surface: without data-touch the ghost stays an arrow and the demo is a costume (SPEC §7).
      const pair = script.match(/\b(pinch|twoFingerTap|twoFingerScrub):/)?.[1];
      if (pair && demoSource && !demoSource.includes('data-touch'))
        errors.push(`${term.slug}: choreography uses ${pair} but the demo declares no data-touch scope (SPEC §7)`);
    }
  }
}

/**
 * Tag facets (SPEC §2.5). A tag that collects too few terms is noise, and one whose
 * members all sit in a single category is a subcategory wearing a tag's clothes: the
 * cross-cutting reach is the whole reason a tag exists rather than a tenth category.
 */
const tagMembers = new Map<Tag, Term[]>(TAGS.map((tag) => [tag, []]));
for (const term of terms.values()) for (const tag of term.tags) tagMembers.get(tag)?.push(term);
for (const [tag, members] of tagMembers) {
  if (members.length < TAG_FLOOR) errors.push(`tag "${tag}": ${members.length} members, needs ${TAG_FLOOR} (SPEC §2.5)`);
  const categories = new Set(members.map((t) => t.category));
  if (members.length > 0 && categories.size < 2)
    errors.push(`tag "${tag}": every member is a ${[...categories][0]}, which makes it a subcategory (SPEC §2.5)`);
}

/**
 * Head terms (SPEC §2.5). /tags lists them so a reader hunting the facet list for
 * "dark pattern" is handed the term, which only works while each one is a real
 * published page and is not also a tag: a family carried twice is the thing the
 * head-term rule exists to prevent.
 */
for (const { slug } of HEAD_TERMS) {
  const term = terms.get(slug);
  if (!term) {
    errors.push(`head term "${slug}" in src/lib/tags.ts has no entry (SPEC §2.5)`);
    continue;
  }
  if (term.status === 'stub') errors.push(`head term "${slug}" is a stub; /tags points readers at it (SPEC §2.5)`);
  if ((TAGS as readonly string[]).includes(slug)) errors.push(`"${slug}" is both a head term and a tag; pick one (SPEC §2.5)`);
}

if (errors.length > 0) {
  console.error(`✗ ${errors.length} content error(s):\n${errors.map((e) => `  - ${e}`).join('\n')}`);
  process.exit(1);
}
console.log(
  `✓ ${terms.size} terms valid (${[...terms.values()].filter((t) => t.status !== 'stub').length} published/draft, ${[...terms.values()].filter((t) => t.status === 'stub').length} stubs)`,
);
console.log(`✓ ${TAGS.length} tags valid (${[...terms.values()].filter((t) => t.tags.length > 0).length} terms tagged)`);
