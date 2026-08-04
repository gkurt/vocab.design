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
  relations: relationsSchema.prefault({}),
  implementations: z.array(z.object({ system: z.enum(SYSTEMS), name: z.string().min(1), url: z.url() })).default([]),
  sources: z.array(z.object({ title: z.string().min(1), url: z.url() })).default([]),
  demo: z.enum(['none', 'inline', 'iframe']).default('none'),
  prompting: z.string().optional(),
});

export type Term = z.infer<typeof termSchema>;
export type Category = (typeof CATEGORIES)[number];
