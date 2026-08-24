/**
 * The nearest thing in the dictionary to what someone actually typed.
 *
 * Two doors get typed at and both get typed at badly: the URL bar, where a wrong guess
 * lands on the 404 page (`/skeumorphism`), and the search box, where the same slip
 * matches nothing at all. The dictionary is the finite side of that problem: 1,057
 * headwords and 3,866 aliases, published as `/paths.json` for exactly this. Typos are
 * the infinite side, which is why none of them are written down anywhere.
 *
 * A correction is only worth making when it is unambiguous. Everything here is capped by
 * an edit budget that scales with the length of the word, and a tie between two different
 * terms is answered with nothing rather than with a coin flip.
 */

import { slugify } from '#src/lib/slug.ts';

/** `/paths.json`: every slug the site answers to, aliases pointing at the term they resolve to. */
export interface Paths {
  terms: Record<string, string>;
  aliases: Record<string, string>;
}

export interface Near {
  slug: string;
  /** The term slug this resolves to: itself for a headword, the target for an alias. */
  target: string;
  score: number;
}

/**
 * How wrong a word may be and still be the same word. Short words are left alone: `tab`,
 * `nav` and `grid` are each one edit from something else in this vocabulary, so a budget
 * that reaches them corrects a reader who was right.
 */
export function editBudget(word: string): number {
  if (word.length < 4) return 0;
  return word.length < 8 ? 1 : 2;
}

/**
 * Damerau-Levenshtein (optimal string alignment), abandoned as soon as the row cannot
 * come back under the cap. Transposition counts as one edit rather than two, because
 * `tosat` is one slip of two fingers and `skeuomrophism` is the same slip in a longer
 * word, which is most of what a fast typist produces.
 */
export function distance(a: string, b: string, cap: number): number {
  if (Math.abs(a.length - b.length) > cap) return cap + 1;
  let beforePrevious: number[] = [];
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let value = Math.min((previous[j] ?? 0) + 1, (row[j - 1] ?? 0) + 1, (previous[j - 1] ?? 0) + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        value = Math.min(value, (beforePrevious[j - 2] ?? 0) + 1);
      }
      row.push(value);
      if (value < best) best = value;
    }
    if (best > cap) return cap + 1;
    beforePrevious = previous;
    previous = row;
  }
  return previous[b.length] ?? cap + 1;
}

/**
 * Every slug within reach of the query, nearest first. `contains` adds the other kind of
 * near miss, where one string is inside the other (`grid` is a fair reach at
 * `bento-grid`), scored at the cap so a real edit-distance match always outranks it.
 * That belongs to the 404 page, where any suggestion beats a dead end; a correction that
 * runs a search on the reader's behalf must never use it.
 */
export function nearest(query: string, paths: Paths, options: { cap?: number; contains?: boolean } = {}): Near[] {
  const cap = options.cap ?? editBudget(query);
  const found: Near[] = [];
  const consider = (slug: string, target: string) => {
    let score = distance(query, slug, cap);
    if (score > cap) {
      if (!options.contains || (!slug.includes(query) && !query.includes(slug))) return;
      score = cap;
    }
    found.push({ slug, target, score });
  };
  for (const slug of Object.keys(paths.terms)) consider(slug, slug);
  for (const [slug, target] of Object.entries(paths.aliases)) {
    if (paths.terms[target]) consider(slug, target);
  }
  return found.sort((a, b) => a.score - b.score || a.slug.length - b.slug.length || a.slug.localeCompare(b.slug));
}

/**
 * The whole query as a headword the dictionary knows, or null. `segmented controll`
 * slugifies to `segmented-controll`, which is one edit from a real term, so a
 * multi-word name is corrected by the same pass as a single word.
 *
 * Null when two different terms are equally close: `Showing results for` is a claim, and
 * a claim made by coin flip is worse than admitting the word is not here.
 */
export function correction(query: string, paths: Paths): string | null {
  const slug = slugify(query);
  if (!slug) return null;
  // A spelling the site already answers to is never a misspelling of another one, and it
  // has to be settled before the prefix rule below, which would otherwise hide the query
  // from itself and leave a correct word to be corrected by its neighbour.
  if (paths.terms[slug] || paths.aliases[slug]) return null;
  const [best, runnerUp] = nearest(slug, paths, { cap: editBudget(slug) })
    // A word half typed is not a word misspelled. Every settled keystroke runs a search,
    // so without this the box announces a correction at `skeuomorphi` and again at
    // `skeuomorphis`, which is the reader being finished for rather than helped. Pagefind
    // matches a prefix on its own, so these are the searches that already work.
    .filter((near) => !near.slug.startsWith(slug));
  if (!best || best.score === 0) return null;
  if (runnerUp && runnerUp.score === best.score && runnerUp.target !== best.target) return null;
  return paths.terms[best.slug] ?? best.slug.replace(/-/g, ' ');
}

/** The dictionary as single words, for fixing one word of a longer question. */
export function vocabulary(paths: Paths): Set<string> {
  const words = new Set<string>();
  for (const slug of [...Object.keys(paths.terms), ...Object.keys(paths.aliases)]) {
    for (const word of slug.split('-')) words.add(word);
  }
  return words;
}

/**
 * One word, spelled the way the dictionary spells it, or null. Unambiguous only, and
 * only for a word the vocabulary does not already contain: a caller must still establish
 * that the corpus has never seen it, because plenty of ordinary English (`grip`, `dots`)
 * is absent from the slugs and one edit away from something that is not.
 */
export function nearestWord(word: string, words: Set<string>): string | null {
  const lower = word.toLowerCase();
  if (words.has(lower)) return null;
  const cap = editBudget(lower);
  if (cap === 0) return null;
  let best: string | null = null;
  let bestScore = cap + 1;
  let tied = false;
  for (const candidate of words) {
    if (candidate.startsWith(lower)) return null; // Being typed, not misspelled.
    const score = distance(lower, candidate, cap);
    if (score > cap) continue;
    if (score < bestScore) {
      best = candidate;
      bestScore = score;
      tied = false;
    } else if (score === bestScore && candidate !== best) {
      tied = true;
    }
  }
  return tied ? null : best;
}
