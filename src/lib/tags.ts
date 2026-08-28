import { TAGS, type Tag } from '#src/lib/schema.ts';
import type { TermEntry } from '#src/lib/terms.ts';

/**
 * What each tag is a facet OF, in the reader's words (SPEC §2.5). An ordinary tag carries
 * no definition of its own, so this line is the whole of its editorial content and its
 * page's description. A term-named facet has a definition too, on the term's page, so its
 * blurb says what the grouping collects and leaves defining the word to the term.
 */
export const TAG_BLURBS: Record<Tag, string> = {
  a11y: 'Terms filed under their own kind that exist because of accessibility.',
  ai: 'The vocabulary of interfaces an assistant drives, or that drive one.',
  'assistive-tech': 'The software that reads an interface out, and the ways people drive it.',
  auth: 'Signing in, staying in, and proving you are a person.',
  canvas: 'An unbounded workspace, panned and zoomed, with things placed on it.',
  commerce: 'Choosing, paying, and the pressure applied along the way.',
  consent: 'Permission asked for, and the ways it is manufactured.',
  'content-design': 'The words in the interface, chosen as carefully as the pixels.',
  'dark-pattern': 'Every deceptive pattern that declares the term, from confirmshaming to the roach motel.',
  dataviz: 'Charts and the parts they are assembled from.',
  depth: 'Making a flat screen read as raised, layered, or three dimensional.',
  'design-tools': 'Vocabulary that comes from the tools designs are drawn in.',
  devtools: 'Vocabulary that comes from the tools software is built with.',
  dragging: 'Picking something up, moving it, and letting it go.',
  editorial: 'Vocabulary the page inherited from print and publishing.',
  email: 'Designing for an inbox, and for the renderers mail arrives in.',
  errors: 'Something went wrong, and the ways back out of it.',
  fonts: 'The files type arrives in, and what they can do.',
  forms: 'Assembling a form, filling it in, and telling someone it is wrong.',
  gamification: 'Progress, streaks, and rewards used as motivation.',
  grids: 'Columns, rows, and the structure a page is laid against.',
  i18n: 'Scripts, directions, and languages other than the one it was drawn in.',
  icons: 'Small drawings standing in for words.',
  illustration: 'Drawn artwork inside an interface, and the styles it is drawn in.',
  keyboard: 'Reaching and driving an interface without a pointer.',
  media: 'Video, audio, images, and the controls and alternatives they need.',
  menus: 'A list of commands, opened from something.',
  messaging: 'Conversations, presence, and things that arrive unannounced.',
  microinteraction: 'The loops that are kinds of one, and the ripples and toasts that are parts of one.',
  navigation: 'Getting somewhere else, and knowing where you are.',
  onboarding: 'The first run, the empty screen, and teaching in place.',
  overlays: 'Surfaces that open over the page, and how they give it back.',
  'perceived-performance': 'Making a wait read as shorter than it is.',
  perception: 'How eyes and attention actually take an interface in.',
  'platform-registers': 'Vocabulary that exists because of one platform: TV, watch, phone, desktop, headset.',
  pointer: 'What a mouse or a pen can do that a finger cannot.',
  progress: 'How far along something is, and how much of it is left.',
  'responsive-web-design': "LukeW's layout patterns, the five ways a page reflows as the viewport narrows.",
  retro: 'Looks borrowed from an earlier era, on purpose.',
  'screen-size': 'Designing for a screen whose size you do not know.',
  scroll: 'Everything that happens because a page is longer than a screen.',
  search: 'Asking for something by typing, and narrowing what comes back.',
  selection: 'Marking what an action will apply to.',
  sound: 'Interfaces that are heard: speech, alerts, and audio.',
  spacing: 'The empty room between things, and the scales it comes from.',
  tables: 'Rows, columns, and reading across both.',
  'text-editing': 'Writing and editing text in place.',
  theming: 'One interface, more than one palette.',
  time: 'Dates, clocks, calendars, and saying when.',
  tokens: 'Design decisions stored as names so they can be repointed.',
  touch: 'Input from a finger rather than a cursor.',
  wcag: 'Terms that are, or come straight from, a WCAG success criterion.',
  'web-platform': 'Terms that name a web platform feature, not a design idea.',
  windowing: 'Windows, panes, and the frame around an application.',
};

/**
 * TERM-NAMED facets (SPEC §2.5): a tag that is also a term, with a definition, an article
 * and a specimen of its own. A reader hunting the facet list for "dark pattern" has no way
 * to know whether the site filed the deceptive patterns as a tag or as a relation, so it
 * is both: the tag is real, and the word keeps its page.
 *
 * Membership is DERIVED from the members' own `variantOf` and `partOf` and never declared,
 * so the same fact is recorded once, joining is an authoring decision rather than a tagging
 * one, and no member spends one of its four tag slots on it. `bun validate` rejects a term
 * that declares one in frontmatter.
 *
 * The two facet floors do not apply here, because they exist to stop a category
 * subdivision from posing as a cross-cutting concern, and a name that is itself a defined
 * term is the concept rather than a filing convenience: dark pattern's members are all
 * `pattern` and responsive web design's are all `layout`. What DOES apply is the floor read
 * from the other side, `FAMILY_FLOOR`, and a term-named facet must actually carry members.
 */
export const TERM_TAGS = ['dark-pattern', 'microinteraction', 'responsive-web-design'] as const satisfies readonly Tag[];

/**
 * The edges that carry membership of a term-named facet, read from the named term's side
 * (SPEC §2.5): the terms that are kinds of it, and the terms that are parts of one.
 * Labelled with the same words the Related rail uses, so the site has one vocabulary for
 * a reverse edge.
 */
export const FAMILY_EDGES = [
  { kind: 'variantOf', label: 'Variants' },
  { kind: 'partOf', label: 'Contains' },
] as const;

/** A grouping this big would earn a tag even if its name were not a word, so it has to be one. */
export const FAMILY_FLOOR = 8;

/**
 * How many members a tag needs before the front page advertises it as a chip (SPEC §2.5).
 * Existence and display are separate questions, and this is the display half: a tag below
 * it still has a page, still filters the search, and is still reached from every term that
 * wears it, but the front page is a directory rather than an inventory and would rather
 * carry twenty broad groupings than eighty chips reading "3".
 *
 * It is the old membership floor, kept at the one place it was ever doing work.
 */
export const CHIP_FLOOR = 8;

export function isTermTag(tag: string): boolean {
  return (TERM_TAGS as readonly string[]).includes(tag);
}

/**
 * How a facet reads in the chrome. A term-named facet reads as its word, because that is
 * what it is (`dark pattern`, never `dark-pattern`); an ordinary tag has no word of its
 * own, so it reads as the tag, the same spelling a term page's chip carries. Derivable
 * from the tag alone, so anything listing the facets can label them without loading the
 * collection to find the named term.
 */
export function tagLabel(tag: string): string {
  return isTermTag(tag) ? tag.replaceAll('-', ' ') : tag;
}

/** Whether a term declares membership of `tag`, which is what derived membership reads. */
function declares(term: TermEntry, tag: string): boolean {
  return FAMILY_EDGES.some(({ kind }) => term.data.relations[kind].includes(tag));
}

const byName = (a: TermEntry, b: TermEntry) => a.data.name.localeCompare(b.data.name);

export interface TagFacet {
  tag: Tag;
  /** How the facet reads: its own name for a term-named facet, otherwise the tag itself. */
  label: string;
  blurb: string;
  /** Set when the facet's name is itself a term, which is where its definition lives. */
  term?: TermEntry;
  terms: TermEntry[];
}

/** Every tag with its members, name-sorted. Tags are a closed enum, so the order is the enum's. */
export function facets(terms: TermEntry[]): TagFacet[] {
  const bySlug = new Map(terms.map((t) => [t.data.slug, t]));
  return TAGS.map((tag) => {
    const named = isTermTag(tag);
    const term = named ? bySlug.get(tag) : undefined;
    const members = named ? terms.filter((t) => declares(t, tag)) : terms.filter((t) => t.data.tags.includes(tag));
    return { tag, label: tagLabel(tag), blurb: TAG_BLURBS[tag], term, terms: members.sort(byName) };
  });
}

/**
 * Whether the front page names this tag (SPEC §2.5): broad enough to be worth scanning, or
 * a word in its own right. A term-named facet is exempt from the display floor for the same
 * reason it is exempt from the membership floor: a reader looking up "responsive web
 * design" is looking up a term, and the front page is where the vocabulary is listed.
 */
export function isAdvertised(facet: TagFacet): boolean {
  return facet.terms.length >= CHIP_FLOOR || (facet.term !== undefined && facet.terms.length > 0);
}

export interface FamilyGroup {
  label: string;
  terms: TermEntry[];
}

export interface Family {
  tag: string;
  members: TermEntry[];
  groups: FamilyGroup[];
}

/**
 * The same members a term-named facet collects, grouped by the relation that joins them
 * instead of by category, which is the one thing the facet page cannot show. Undefined
 * for any term that does not name a facet.
 *
 * It comes back empty only for a partial collection, since `bun validate` holds every
 * term-named facet to carrying members.
 */
export function familyOf(named: TermEntry, terms: TermEntry[]): Family | undefined {
  const tag = named.data.slug;
  if (!isTermTag(tag)) return undefined;
  const groups = FAMILY_EDGES.map(({ kind, label }) => ({
    label,
    terms: terms.filter((t) => t.data.relations[kind].includes(tag)).sort(byName),
  })).filter((group) => group.terms.length > 0);
  return { tag, groups, members: groups.flatMap((g) => g.terms) };
}

/**
 * The term-named facets a term belongs to, for the chips it wears beside its declared
 * tags. Derived, so a member is in the facet the moment it declares the relation.
 */
export function derivedTags(term: TermEntry): Tag[] {
  return TERM_TAGS.filter((tag) => declares(term, tag));
}
