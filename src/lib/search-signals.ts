/**
 * The two derived signals a search reports, kept here because they are the definitions
 * of what "the reader found the right thing" means on this site, and because a definition
 * deserves tests.
 *
 * A headword or an alias is the answer to "what is this called", so a query that lands on
 * a name has succeeded, and one that only matched prose has half succeeded: the reader
 * described the thing and got an article that talks about it. That second case is the
 * interesting one. Sometimes it means the vocabulary is missing an alias we should add;
 * sometimes the reader simply typed a sentence. Read it as a lead, never as a bug.
 */

/** Compare the way a reader types, not the way a page is titled. */
function normalize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
}

/** Every word the reader typed is in the top result's headword. */
export function namesTopResult(query: string, title: string | undefined): boolean {
  if (!title) return false;
  const words = normalize(query);
  if (words.length === 0) return false;
  const name = normalize(title);
  return words.every((word) => name.includes(word));
}

/** How many words the salvage pass had to drop before anything matched (0 if none). */
export function droppedWords(query: string, ran: string | undefined): number {
  if (!ran) return 0;
  const kept = new Set(normalize(ran));
  return normalize(query).filter((word) => !kept.has(word)).length;
}

/**
 * Whether Pagefind found the words that were typed, or merely something near them.
 *
 * This is the existence test a typo needs, and Pagefind's result count cannot answer it:
 * the last word of a query is matched loosely, so `tost` comes back with 1,060 results
 * topped by "Back to top" (it matched `to`) and `accordian` comes back with four (it
 * matched `according`). A search that fails here does not look like a failure at all.
 *
 * The excerpt is where the truth is, because `<mark>` is put around what actually
 * matched. `grip` marks `grip,` in Column resizer, so the corpus really does have that
 * word and a reader who typed it was right; `paralax` marks `P.` in Pilcrow, so it does
 * not, and the word is worth respelling.
 *
 * A marked word that merely STARTS with what was typed counts as found, because that is
 * a reader mid-word rather than a reader who slipped: every settled keystroke runs a
 * search, so `skeuo` and `skeuomorphis` are searches too, and both are going well.
 */
export function matchedTyping(query: string, excerpt: string): boolean {
  const marked = new Set<string>();
  for (const match of excerpt.matchAll(/<mark>(.*?)<\/mark>/g)) {
    for (const word of normalize(match[1] ?? '')) marked.add(word);
  }
  const words = normalize(query);
  if (words.length === 0 || marked.size === 0) return false;
  return words.every((word) => marked.has(word) || [...marked].some((found) => found.startsWith(word)));
}
