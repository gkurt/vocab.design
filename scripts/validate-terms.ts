import { readdir } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { parse } from 'yaml';
import * as z from 'zod/v4';
import { RESERVED, SITE_ROUTES } from '#src/lib/routes.ts';
import { CATEGORIES, TAGS, type Tag, type Term, termSchema } from '#src/lib/schema.ts';
import { slugify } from '#src/lib/slug.ts';
import { FAMILY_EDGES, FAMILY_FLOOR, isTermTag, TERM_TAGS } from '#src/lib/tags.ts';

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
/** A comparison switch and its parts: the whole element, then its segments' values. */
const SEGMENTED = /<sp-segmented\b[\s\S]*?<\/sp-segmented>/g;
const SEGMENT_VALUE = /class="sp-segment[^"]*"[^>]*?\bvalue="([^"]*)"/g;
/** The pose selector, which is where the stage already learns which state is the term. */
const POSE_VALUE = /data-pose="([^"]*)"/;
/**
 * A NEGATED clause names the state that DISQUALIFIES the subject, so a value inside one
 * is the foil rather than the term: `:not([data-gap=apart])` means apart is the one state
 * the term is not. Stripped before the pose is read, or the mark lands on exactly the
 * wrong segment and the gate then insists it stay there.
 */
const POSE_NEGATION = /:not\([^)]*\)/g;
/**
 * The counter-example pair, one spelling (SPEC §5.1). Nineteen demos had reached for
 * twelve, because a switch label is invented by whoever is authoring that term and read
 * by nobody who has seen the others. The specific claim belongs in the verdict line
 * beside the switch, which is why the labels can afford to be this blunt.
 */
const FOIL_LABELS = { term: 'With', foil: 'Without' } as const;
/**
 * The specimens whose `<sp-segmented>` is the thing the term names, or sits inside the
 * element that is (SPEC §5.1). For these the control is the exhibit rather than a way of
 * looking at it, so it stays where the demo drew it and never moves to the strip. Every
 * other switch on the site is the reader's way of changing what the scene shows.
 */
const SWITCH_IS_SUBJECT = new Set([
  'accessibility-overlay',
  'generative-ui',
  'ornament',
  'rotor',
  'rule-builder',
  'scope-bar',
  'segmented-control',
  'time-picker',
]);

/**
 * Specimens whose "verdict" is the product's own line, not the author's (SPEC §5.1).
 *
 * The test is whether the demo DRAWS the thing that produces the text. `inline-validation`
 * prints into the field's own slot and is pointed at by `aria-describedby`, which is a real
 * form message; `key-sequence` prints into a leader-key HUD whose kbd chips and timeout meter
 * are on screen; `containing-block` reads "Containing block: the card", a legend naming a box
 * the figure draws. Everything else called a verdict is the site talking about the specimen,
 * and no checkout says "the advertised 42.00 won the click" about itself.
 *
 * `type-to-confirm` is `inline-validation`'s case again: a hint beside a field, pointed at by
 * the input's `aria-describedby`. `onboarding-checklist`'s footnote is the product reassuring
 * its own user ("All set. Your workspace is ready to use."), which is copy a real checklist
 * prints, not the site's reading of it.
 */
const VERDICT_IS_FICTION = new Set(['containing-block', 'inline-validation', 'key-sequence', 'onboarding-checklist', 'type-to-confirm']);

/** Comments, stripped before a markup rule reads a demo: naming an element is not using one. */
const COMMENTS = /\/\*[\s\S]*?\*\/|\/\/[^\n]*/g;
/** An unquoted attribute value starting with a digit is not a valid CSS identifier. */
const UNQUOTED_DIGIT_SELECTOR = /\[[\w-]+=\d[^\]]*\]/;
/** A tag facet earns a page by collecting this many terms; below it, it is a note (SPEC §2.5). */
const TAG_FLOOR = 3;
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

      // A pose names the states in which the subject is still the term; data-identify names the
      // one state in which the term is legible (SPEC §5.1). Declaring both would ask identify two
      // questions at once, and only the first is read.
      if (source.includes('data-pose=') && source.includes('data-identify='))
        errors.push(`${term.slug}: declares both data-pose and data-identify; they answer different questions, pick one (SPEC §5.1)`);

      // A verdict is the author's reading of the state, not the product's, so it belongs in
      // the strip beside the switch that produced it (SPEC §5.1). Printed inside the mock in
      // the mock's own type it is one more line the reader has to work out is not the fiction.
      //
      // What counts is BEHAVIOUR, not the part's name. The first version of this gate asked
      // for `data-part="verdict"` and passed 204 specimens carrying the identical thing under
      // `caption`, `note` or `legend`: owned-element's CAPTION record is keyed to the switch
      // and reads "Same DOM, adopted tree", which is a verdict however it is spelled. So the
      // gate asks the two questions that make one: does the specimen have a mode switch, and
      // does this prose CHANGE. A caption that never changes is a different complaint, with a
      // different answer (the article usually already says it, so it is deleted, not moved).
      //
      // The part name has to match EXACTLY. A suffix means the element is structural rather
      // than editorial: chart's `legend-series` is a chart's own legend and gutter's
      // `legend-gutter` reads "gutter 24px, 3 of them, columns 180px" over the columns it
      // measures. Both draw the instrument their text comes from, so both are fiction.
      if (!VERDICT_IS_FICTION.has(term.slug) && !source.includes('data-stage-verdict')) {
        const voice = [
          ...source.matchAll(/const (\w+)\s*=\s*part\(root,\s*'(verdict|caption|note|legend|aside|hint|why|footnote|explain)'\)/g),
        ];
        const changing = voice.filter(([, binding]) => new RegExp(`\\b${binding}\\.(textContent|innerHTML)\\s*=`).test(source));
        if (source.includes('data-part="verdict"') || (source.includes('data-stage-mode') && changing.length > 0))
          errors.push(
            `${term.slug}: a verdict is drawn inside the specimen; mark it data-stage-verdict so the stage draws it in the strip (SPEC §5.1)`,
          );
      }

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

      // A switch that changes what the specimen is showing has to say what it changes and
      // which state the headword names (SPEC §5.1). Without the first, a segment is the
      // value of nothing: "As shipped" beside a delivery line reads as a postage option.
      // Without the second, a reader cannot tell the term from the foil it is shown
      // against, and the order will not tell them: every switch reads baseline to change,
      // which puts the term first for a defect and second for a feature.
      for (const control of source.replace(COMMENTS, '').match(SEGMENTED) ?? []) {
        // A demo may build its options from an array, in which case no literal value is
        // written anywhere and the only honest thing a source gate can say is nothing:
        // a value carrying `${` is template source, not a segment.
        const values = [...control.matchAll(SEGMENT_VALUE)].map((m) => m[1]).filter((v) => v && !v.includes('${'));
        const generated = /\$\{/.test(control);
        const axis = control.match(/data-axis="([^"]*)"/)?.[1];
        const marked = control.match(/data-term="([^"]*)"/)?.[1];
        if (marked && !axis) errors.push(`${term.slug}: switch marks data-term but names no data-axis (SPEC §5.1)`);
        if (marked && values.length > 0 && !generated && !values.includes(marked))
          errors.push(`${term.slug}: switch data-term="${marked}" matches no segment value (SPEC §5.1)`);
        // The stage already knows, so the two may not disagree: a pose naming one state
        // and a mark naming another would point identify and the reader different ways.
        const posed = (source.match(POSE_VALUE)?.[1] ?? '').replace(POSE_NEGATION, '');
        const named = values.filter((value) => posed.includes(`=${value}]`));
        if (marked && named.length === 1 && named[0] !== marked)
          errors.push(`${term.slug}: switch data-term="${marked}" contradicts data-pose, which poses "${named[0]}" (SPEC §5.1)`);
        if (!marked && named.length === 1 && axis)
          errors.push(`${term.slug}: switch names an axis but not the state data-pose already calls the term (SPEC §5.1)`);
        // A mode switch is the exhibit's control and belongs in the strip, not inside the
        // fiction (SPEC §5.1). Drawn in the demo it becomes part of the mock product: 154 of
        // them once sat in a simulated app's title bar beside an invented brand, at the same
        // weight, and no wording rescues that. The exemption is for a control that IS what
        // the term names, where the switch is the specimen rather than a way of looking at it.
        if (!control.includes('data-stage-mode') && !SWITCH_IS_SUBJECT.has(term.slug))
          errors.push(
            `${term.slug}: switch is drawn inside the specimen; mark it data-stage-mode so the stage draws it in the strip (SPEC §5.1)`,
          );
      }

      // One spelling for the deceptive-pattern family (SPEC §5.1). The enum stops here
      // rather than covering every counter-example, because "made fair" is an ethical
      // word: a broken heading order or a stuck hover is wrong, not unfair, and forcing
      // those into these labels would cost the accuracy the enum is meant to buy.
      const family = term.slug === 'dark-pattern' || (term.relations.variantOf ?? []).includes('dark-pattern');
      if (family) {
        for (const control of source.replace(COMMENTS, '').match(SEGMENTED) ?? []) {
          const labels = [...control.matchAll(/class="sp-segment"[^>]*>([^<]*)</g)].map((m) => m[1]?.trim() ?? '');
          if (labels.length !== 2) continue;
          const [present, absent] = labels;
          if (present !== FOIL_LABELS.term || absent !== FOIL_LABELS.foil)
            errors.push(
              `${term.slug}: deceptive-pattern switch reads "${present} | ${absent}"; the family spells it "${FOIL_LABELS.term} | ${FOIL_LABELS.foil}" (SPEC §5.1)`,
            );
        }
      }

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
      // Every multi-contact gesture performs as touch, so its scene has to say it is a touch
      // surface: without data-touch the ghost stays an arrow and the demo is a costume (SPEC §7).
      const pair = script.match(/\b(pinch|tap|scrub):/)?.[1];
      if (pair && demoSource && !demoSource.includes('data-touch'))
        errors.push(`${term.slug}: choreography uses ${pair} but the demo declares no data-touch scope (SPEC §7)`);
      // A contact count is 2 or 3: one contact is a plain click, and gestures past three
      // do not exist, so a step asking for either is a demo inventing input (SPEC §8).
      for (const [, count] of script.matchAll(/\bfingers:\s*(\d+)/g)) {
        if (Number(count) < 2 || Number(count) > 3)
          errors.push(`${term.slug}: choreography asks for ${count} contacts; a contact gesture is 2 or 3 fingers (SPEC §8)`);
      }
      // A thrown drag hands over distance/time, so its travel has to be quick enough to read
      // as a throw and long enough to sample: too slow and a recognizer honestly calls it a
      // hand at rest, which is the opposite of what the step was reached for (SPEC §8).
      for (const [thrown] of script.matchAll(/\{\s*drag:\s*\{[^}]*\}/g)) {
        if (!thrown.includes(`release: 'moving'`)) continue;
        const ms = Number(thrown.match(/\bms:\s*(\d+)/)?.[1] ?? Number.NaN);
        if (Number.isNaN(ms))
          errors.push(`${term.slug}: a drag released while moving must state its ms, since the travel time is the speed (SPEC §8)`);
        else if (ms < 80 || ms > 1200)
          errors.push(`${term.slug}: a thrown drag travels for 80 to 1200 ms; ${ms} ms is not a throw a recognizer reads (SPEC §8)`);
      }
    }
  }
}

/**
 * Tag facets (SPEC §2.5). One floor, and it is low: a tag that collects fewer than three
 * terms is a note rather than a grouping. Everything above it exists, has a page and
 * filters the search; whether it is also advertised on the front page is a display
 * question, settled by `CHIP_FLOOR` in src/lib/tags.ts rather than here.
 *
 * There is deliberately no cross-category requirement. It was meant to stop a
 * subcategory posing as a concern, but the facets that matter most are single-category
 * (every dark pattern is a `pattern`), so the rule spent its life being exempted.
 *
 * The floor exempts a term-named facet, whose name is a defined term rather than a
 * filing convenience. Those answer to their own two rules below instead.
 */
const tagMembers = new Map<Tag, Term[]>(TAGS.map((tag) => [tag, []]));
for (const term of terms.values()) for (const tag of term.tags) tagMembers.get(tag)?.push(term);
for (const [tag, members] of tagMembers) {
  if (isTermTag(tag)) continue;
  if (members.length < TAG_FLOOR) errors.push(`tag "${tag}": ${members.length} members, needs ${TAG_FLOOR} (SPEC §2.5)`);
}

/**
 * Term-named facets (SPEC §2.5): a tag that is also a term. The tag half only works while
 * the term half is a real published page, and the derivation only stays honest while
 * nobody declares one by hand, which would record membership twice and let the two drift.
 */
for (const tag of TERM_TAGS) {
  const term = terms.get(tag);
  if (!term) {
    errors.push(`term-named facet "${tag}" has no term entry; every facet in TERM_TAGS is a word first (SPEC §2.5)`);
    continue;
  }
  if (term.status === 'stub') errors.push(`term-named facet "${tag}" is a stub; its page carries the definition (SPEC §2.5)`);
  for (const other of terms.values())
    if (other.tags.includes(tag))
      errors.push(`${other.slug}: declares "${tag}", which is derived from variantOf/partOf and must not be declared (SPEC §2.5)`);
}

/**
 * The facet floor read from the other side (SPEC §2.5): a grouping this big would earn a
 * tag even if its name were not a word, so it has to be one. Without this the enum goes
 * stale silently, because a family grows by an authoring round adding members and never
 * by anyone editing src/lib/schema.ts.
 */
const family = new Map<string, number>();
for (const term of terms.values())
  for (const { kind } of FAMILY_EDGES) for (const target of term.relations[kind]) family.set(target, (family.get(target) ?? 0) + 1);
for (const [slug, size] of family)
  if (size >= FAMILY_FLOOR && !isTermTag(slug))
    errors.push(`"${slug}" carries a family of ${size}; add it to TAGS and TERM_TAGS or split it (SPEC §2.5)`);
// And the same rule the other way: a facet that collects nothing is not a facet.
for (const tag of TERM_TAGS)
  if (!family.has(tag)) errors.push(`term-named facet "${tag}" collects nothing; no term declares it with variantOf or partOf (SPEC §2.5)`);

/**
 * The front page's window (SPEC §3). `exhibit` is curation, so nothing here judges
 * whether a specimen is good; it only refuses the two flags that would stand an empty
 * stage on the front page, where the flagged term has no demo or is not published yet.
 */
const exhibited = [...terms.values()].filter((t) => t.exhibit);
for (const term of exhibited) {
  if (term.demo === 'none') errors.push(`${term.slug}: exhibit: true with demo: none; there is no specimen to show (SPEC §3)`);
  if (term.status !== 'published') errors.push(`${term.slug}: exhibit: true while status is "${term.status}"; finish it first (SPEC §3)`);
}

if (errors.length > 0) {
  console.error(`✗ ${errors.length} content error(s):\n${errors.map((e) => `  - ${e}`).join('\n')}`);
  process.exit(1);
}
console.log(
  `✓ ${terms.size} terms valid (${[...terms.values()].filter((t) => t.status !== 'stub').length} published/draft, ${[...terms.values()].filter((t) => t.status === 'stub').length} stubs)`,
);
console.log(`✓ ${TAGS.length} tags valid (${[...terms.values()].filter((t) => t.tags.length > 0).length} terms tagged)`);
console.log(`✓ ${exhibited.length} specimens cleared for the front page`);
console.log(
  `✓ ${TERM_TAGS.length} of them term-named (${TERM_TAGS.reduce((total, tag) => total + (family.get(tag) ?? 0), 0)} derived members)`,
);
