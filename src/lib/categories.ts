import type { Category } from '#src/lib/schema.ts';

/**
 * What kind of thing is filed in each category (SPEC §2.2), for the browse pages.
 * A category answers "what kind of thing is this", so unlike a tag blurb it describes
 * the filing decision rather than a concern: every term has exactly one.
 */
export const CATEGORY_BLURBS: Record<Category, string> = {
  component: 'A named piece of interface you can point at, place, and reuse.',
  layout: 'How a page arranges its regions, and what governs the arrangement.',
  pattern: 'A recurring answer to a recurring problem, larger than any one component.',
  interaction: 'What a reader does, and how the interface answers.',
  motion: 'Change over time, and the vocabulary for describing it.',
  typography: 'Type, and the measurements and conventions that set it.',
  color: 'Colour as a system: palettes, roles, contrast, and schemes.',
  aesthetic: 'A named visual style, with a period and a set of moves.',
  accessibility: 'Terms that exist so an interface works for everyone.',
};
