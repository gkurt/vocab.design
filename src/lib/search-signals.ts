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
