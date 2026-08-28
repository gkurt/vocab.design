import * as z from 'zod/v4';

export const CATEGORIES = [
  'component',
  'layout',
  'pattern',
  'interaction',
  'motion',
  'typography',
  'color',
  'surface',
  'aesthetic',
  'accessibility',
] as const;

/** Tracked design systems for the implementations table (SPEC §9). */
export const SYSTEMS = ['aria-apg', 'material', 'hig', 'fluent', 'carbon', 'polaris', 'radix', 'base-ui', 'shadcn'] as const;

/**
 * Cross-cutting facets, closed on purpose (SPEC §2.5). The enum is collision
 * control rather than curation: without it parallel authors would invent
 * `mobile`, `mobile-first` and `small-screen` for one concern in a single round.
 * Adding a tag here is an ordinary authoring move, not a ceremony; what
 * `bun validate` holds it to is a floor of three members, so a tag nobody else
 * ever reaches for fails rather than ships.
 *
 * Three are TERM-NAMED facets (dark-pattern, microinteraction,
 * responsive-web-design): the tag is also a term with a definition and a
 * specimen, its membership is derived from the members' own relations rather
 * than declared here, and the floor does not apply because the name is the
 * concept rather than a filing convenience. `TERM_TAGS` in src/lib/tags.ts is
 * the list, and no term may declare one in its frontmatter.
 */
export const TAGS = [
  'a11y',
  'ai',
  'assistive-tech',
  'auth',
  'canvas',
  'commerce',
  'consent',
  'content-design',
  'dark-pattern',
  'dataviz',
  'depth',
  'design-tools',
  'devtools',
  'dragging',
  'editorial',
  'email',
  'errors',
  'fonts',
  'forms',
  'gamification',
  'grids',
  'i18n',
  'icons',
  'illustration',
  'keyboard',
  'media',
  'menus',
  'messaging',
  'microinteraction',
  'navigation',
  'onboarding',
  'overlays',
  'perceived-performance',
  'perception',
  'platform-registers',
  'pointer',
  'progress',
  'responsive-web-design',
  'retro',
  'screen-size',
  'scroll',
  'search',
  'selection',
  'sound',
  'spacing',
  'tables',
  'text-editing',
  'theming',
  'time',
  'tokens',
  'touch',
  'wcag',
  'web-platform',
  'windowing',
] as const;

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'must be a kebab-case slug');

/**
 * A frontmatter day, which arrives spelled three different ways: the YAML parser hands
 * over a `Date`, the content-layer store round-trips that through JSON and hands back an
 * ISO string, and a `Date` built inside Vite's SSR realm fails `instanceof Date` in ours
 * (`expected date, received Date`). So the value is rebuilt from whatever turned up
 * rather than type-checked in place, and only a genuinely unreadable one fails.
 */
const day = z.preprocess((value) => {
  if (value === null || value === undefined) return value;
  const date = new Date(value as string | number | Date);
  return Number.isNaN(date.getTime()) ? value : date;
}, z.date());

const relationsSchema = z.object({
  contrastWith: z.array(slug).default([]),
  variantOf: z.array(slug).default([]),
  partOf: z.array(slug).default([]),
  seeAlso: z.array(slug).default([]),
});

export const termSchema = z.object({
  name: z.string().min(1),
  slug,
  category: z.enum(CATEGORIES),
  status: z.enum(['stub', 'draft', 'published']),
  /**
   * When the entry was first published, and when its content last changed. Both live in
   * frontmatter rather than being read off git, because a rename, a reformat or a
   * squashed history would silently rewrite the record. The feed orders by `created`,
   * the sitemap's `lastmod` is `modified`, so getting `modified` wrong costs a recrawl.
   */
  created: day,
  modified: day,
  definition: z.string().min(1).max(200),
  aliases: z.array(z.object({ name: z.string().min(1), source: z.string().optional() })).default([]),
  tags: z.array(z.enum(TAGS)).default([]),
  relations: relationsSchema.prefault({}),
  implementations: z.array(z.object({ system: z.enum(SYSTEMS), name: z.string().min(1), url: z.url() })).default([]),
  sources: z.array(z.object({ title: z.string().min(1), url: z.url() })).default([]),
  demo: z.enum(['none', 'inline', 'iframe']).default('none'),
  /**
   * May this specimen stand in the window (SPEC §3)? Curation rather than metadata: the
   * front page shows ONE specimen and rotates it, so the flag is a judgement about the
   * demonstration, not about the article, and it is set by hand after watching the thing
   * play. Every term keeps its own specimen either way; this only decides what a first-time
   * reader is shown before they have chosen anything. Off by default, so a new term joins
   * the dictionary without joining the shop window.
   */
  exhibit: z.boolean().default(false),
  /** The situation this word is for; powers the generated "Which word?" table (SPEC §2.3). */
  useWhen: z.string().min(1).max(90).optional(),
});

export type Term = z.infer<typeof termSchema>;
export type Category = (typeof CATEGORIES)[number];
export type Tag = (typeof TAGS)[number];
