import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const PAGES = [
  { key: 'payout', title: 'Receive your first payout', section: 'Payments' },
  { key: 'refund', title: 'What to do if you did not receive a refund', section: 'Refunds' },
  { key: 'alerts', title: 'Receive email notifications', section: 'Notifications' },
  { key: 'invoice', title: 'Download an invoice', section: 'Billing' },
  { key: 'transfer', title: 'Transfer a subscription', section: 'Account' },
] as const;

/** Every word the index knows, which is all a spelling suggestion has to work from. */
const VOCABULARY = [...new Set(PAGES.flatMap((page) => page.title.toLowerCase().split(/[\s,]+/)))].filter((word) => word.length > 3);

/** Levenshtein distance: the arithmetic a correction is picked with. */
function distance(a: string, b: string): number {
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min((row[j - 1] ?? 0) + 1, (previous[j] ?? 0) + 1, (previous[j - 1] ?? 0) + cost);
    }
    previous = row;
  }
  return previous[b.length] ?? b.length;
}

/** The nearest word in the index, two keystrokes away at most: past that it is a guess. */
function correctionFor(query: string): string | undefined {
  let best: string | undefined;
  let bestScore = 3;
  for (const word of VOCABULARY) {
    const score = distance(query, word);
    if (score < bestScore) {
      best = word;
      bestScore = score;
    }
  }
  return best;
}

const matchesFor = (query: string) => PAGES.filter((page) => query.length > 0 && page.title.toLowerCase().includes(query));

/**
 * Did you mean specimen: a help centre search mistyped on purpose, answered by the strip
 * that names the correction. Both conventions live in the one strip, because they are one
 * term wearing two manners: the substitution runs the corrected query and offers the way
 * back, the suggestion runs the literal query and offers the correction. Each button
 * reaches an absolute state rather than flipping one (SPEC §8).
 *
 * The subject is the strip, not the search and not the results: the term names the
 * sentence the interface says about the query, and the field, the index, and the frame
 * are scenery (SPEC §5). The strip keeps its box from mount and only fades in, and the
 * results sit in a fixed slot, so neither the correction arriving nor the result sets
 * swapping moves anything else (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const rows = PAGES.map(
    (page) => `
      <li class="sp-list-item" data-part="hit-${page.key}" hidden style="border-top: 0; border-radius: 6px">
        <span class="sp-text sp-text--ink sp-grow" style="min-width: 0">${page.title}</span>
        <span class="sp-label">${page.section}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 286px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Help centre</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-row sp-context" style="gap: 8px">
            ${icon('search')}
            <input class="sp-input" data-part="query" type="text" spellcheck="false" aria-label="Search the help centre" placeholder="Search the help centre" />
          </div>
          <div
            class="sp-row sp-surface"
            data-part="strip"
            data-subject
            data-mode="none"
            role="status"
            style="flex: 0 0 auto; min-height: 34px; gap: 10px; padding: 0 10px; opacity: 0; transition: opacity 0.16s var(--sp-ease)"
          >
            <span class="sp-text sp-grow" data-part="strip-text" style="min-width: 0"></span>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="literal" type="button" hidden>Search instead</button>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="suggest" type="button" hidden>Did you mean</button>
          </div>
          <div class="sp-surface sp-context sp-grow" style="position: relative; min-height: 0; padding: 4px; overflow: hidden">
            <ul class="sp-list" data-part="results" style="margin: 0; padding: 0">${rows}</ul>
            <span class="sp-text" data-part="empty" hidden style="display: block; padding: 10px">Type a word to search the help centre.</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const input = part(root, 'query') as HTMLInputElement;
  const strip = part(root, 'strip');
  const stripText = part(root, 'strip-text');
  const literalButton = part(root, 'literal');
  const suggestButton = part(root, 'suggest');
  const empty = part(root, 'empty');

  /** Which query the results answer: the reader's own words, or the nearest spelling. */
  let mode: 'none' | 'corrected' | 'literal' = 'none';

  const render = () => {
    const typed = input.value.trim();
    const query = typed.toLowerCase();
    const literalHits = matchesFor(query);
    const correction = literalHits.length === 0 && query.length > 3 ? correctionFor(query) : undefined;
    // A correction only takes the query over when the literal one came back empty.
    if (correction === undefined) mode = 'none';
    else if (mode === 'none') mode = 'corrected';

    const answering = mode === 'corrected' && correction ? correction : typed;
    const hits = mode === 'corrected' && correction ? matchesFor(correction) : literalHits;
    for (const page of PAGES) part(root, `hit-${page.key}`).hidden = !hits.includes(page);

    empty.hidden = hits.length > 0;
    empty.textContent = query.length === 0 ? 'Type a word to search the help centre.' : `No pages match “${typed}”.`;

    strip.dataset.mode = mode;
    strip.style.opacity = mode === 'none' ? '0' : '1';
    literalButton.hidden = mode !== 'corrected';
    suggestButton.hidden = mode !== 'literal';
    if (correction === undefined) {
      stripText.textContent = '';
      return;
    }
    // Both words are always on screen: a strip that names only the word it ran leaves
    // the reader unsure whether their spelling or their memory was wrong.
    const lead = mode === 'corrected' ? 'Showing results for' : 'Results for';
    stripText.innerHTML = `${lead} <span style="font-weight: 600; color: var(--sp-ink)">${answering}</span>`;
    literalButton.textContent = `Search instead for ${typed}`;
    suggestButton.textContent = `Did you mean ${correction}?`;
  };

  input.addEventListener('input', () => {
    mode = 'none';
    render();
  });

  literalButton.addEventListener('click', () => {
    mode = 'literal';
    render();
  });

  suggestButton.addEventListener('click', () => {
    mode = 'corrected';
    render();
  });

  render();
}
