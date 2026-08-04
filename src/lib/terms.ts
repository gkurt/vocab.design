import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';
import { type Term, termSchema } from '#src/lib/schema.ts';

export interface TermEntry {
  entry: CollectionEntry<'terms'>;
  data: Term;
}

/**
 * The one way to read terms. Astro validates collection entries against a
 * derived JSON schema but does not apply Zod output transforms, so defaults
 * (empty relations, aliases, …) only exist after re-parsing through termSchema.
 */
export async function getTerms(): Promise<TermEntry[]> {
  const entries = await getCollection('terms');
  return entries.map((entry) => ({ entry, data: termSchema.parse(entry.data) }));
}
