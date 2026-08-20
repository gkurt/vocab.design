import * as z from 'zod/v4';

export const CATEGORIES = [
  'component',
  'layout',
  'pattern',
  'interaction',
  'motion',
  'typography',
  'color',
  'aesthetic',
  'accessibility',
] as const;

/** Tracked design systems for the implementations table (SPEC §9). */
export const SYSTEMS = ['aria-apg', 'material', 'hig', 'fluent', 'carbon', 'polaris', 'radix', 'base-ui', 'shadcn'] as const;

/**
 * Cross-cutting facets, closed on purpose (SPEC §2.5). A tag is a reader-facing
 * grouping with no definition of its own: where the family name is itself
 * vocabulary (dark pattern, microinteraction, skeuomorphism, responsive web
 * design) relations carry the family and no tag exists. `bun validate` holds
 * every tag to its minimum membership and to spanning more than one category,
 * so a facet that is really a subcategory fails rather than ships.
 */
export const TAGS = [
  'a11y',
  'ai',
  'auth',
  'commerce',
  'dataviz',
  'editorial',
  'forms',
  'gamification',
  'keyboard',
  'media',
  'messaging',
  'navigation',
  'onboarding',
  'perceived-performance',
  'platform-registers',
  'scroll',
  'search',
  'selection',
  'tables',
  'theming',
  'tokens',
  'touch',
  'web-platform',
] as const;

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'must be a kebab-case slug');

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
  definition: z.string().min(1).max(200),
  aliases: z.array(z.object({ name: z.string().min(1), source: z.string().optional() })).default([]),
  tags: z.array(z.enum(TAGS)).default([]),
  relations: relationsSchema.prefault({}),
  implementations: z.array(z.object({ system: z.enum(SYSTEMS), name: z.string().min(1), url: z.url() })).default([]),
  sources: z.array(z.object({ title: z.string().min(1), url: z.url() })).default([]),
  demo: z.enum(['none', 'inline', 'iframe']).default('none'),
  /** The situation this word is for; powers the generated "Which word?" table (SPEC §2.3). */
  useWhen: z.string().min(1).max(90).optional(),
});

export type Term = z.infer<typeof termSchema>;
export type Category = (typeof CATEGORIES)[number];
export type Tag = (typeof TAGS)[number];
