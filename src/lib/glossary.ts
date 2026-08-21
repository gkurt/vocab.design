import type { Category } from '#src/lib/schema.ts';
import { slugify } from '#src/lib/slug.ts';
import type { TermEntry } from '#src/lib/terms.ts';

/**
 * One line of the glossary: a term's own name, or one of its aliases.
 *
 * Aliases are entries in their own right rather than footnotes (SPEC §1): they are the
 * spellings a reader actually arrives with, each already served by a redirect page, so
 * a glossary that listed only canonical names would omit 3,866 of the 4,923 ways in.
 */
export interface GlossaryEntry {
  /** What the reader is looking for. */
  label: string;
  href: string;
  category: Category;
  /** Set on an alias: the term it redirects to. */
  canonical?: { name: string; slug: string };
}

/** A–Z, with everything that does not start with a letter collected under `#`. */
export const LETTERS = [...'abcdefghijklmnopqrstuvwxyz', '#'] as const;

/** `#` cannot be a URL segment, so the non-alphabetic bucket is served at /glossary/other. */
export function letterParam(letter: string): string {
  return letter === '#' ? 'other' : letter;
}

/**
 * Which bucket a label files under, judged on its SLUG rather than its first character.
 * That is the rule readers expect: `@mention` files under M, `@font-face` under F,
 * `.notdef` under N, `-webkit-font-smoothing` under W, because the punctuation is not
 * the part anyone looks for. A name that really begins with a number (`8pt grid`,
 * `60fps`, `1.618`) has no letter to fall through to, so it lands in `#`.
 */
export function letterOf(label: string): string {
  const first = slugify(label).charAt(0);
  return first >= 'a' && first <= 'z' ? first : '#';
}

export function glossaryEntries(terms: TermEntry[]): GlossaryEntry[] {
  const entries: GlossaryEntry[] = [];
  for (const t of terms) {
    const d = t.data;
    entries.push({ label: d.name, href: `/${d.slug}`, category: d.category });
    for (const alias of d.aliases) {
      entries.push({
        label: alias.name,
        href: `/${slugify(alias.name)}`,
        category: d.category,
        canonical: { name: d.name, slug: d.slug },
      });
    }
  }
  return entries.sort((a, b) => a.label.localeCompare(b.label, 'en', { sensitivity: 'base' }));
}

export function byLetter(entries: GlossaryEntry[]): Map<string, GlossaryEntry[]> {
  const groups = new Map<string, GlossaryEntry[]>(LETTERS.map((l) => [l, []]));
  for (const entry of entries) groups.get(letterOf(entry.label))?.push(entry);
  return groups;
}
