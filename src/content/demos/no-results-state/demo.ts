import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const CATALOGUE = [
  { slug: 'windsor-chair', label: 'Windsor chair, oak' },
  { slug: 'folding-chair', label: 'Folding chair, ash' },
  { slug: 'reading-lamp', label: 'Reading lamp, brass' },
  { slug: 'wool-throw', label: 'Wool throw, grey' },
  { slug: 'ceramic-jug', label: 'Ceramic jug' },
  { slug: 'linen-napkins', label: 'Linen napkins' },
] as const;

/** Every word the catalogue knows, which is all a "did you mean" has to work from. */
const WORDS = [...new Set(CATALOGUE.flatMap((item) => item.label.toLowerCase().split(/[\s,]+/)))].filter((w) => w.length > 3);

/** Levenshtein distance, capped by the caller: the arithmetic behind a spelling suggestion. */
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

function suggestionFor(query: string): string | undefined {
  let best: string | undefined;
  let bestScore = 3;
  for (const word of WORDS) {
    const score = distance(query, word);
    if (score < bestScore) {
      best = word;
      bestScore = score;
    }
  }
  return best;
}

/**
 * No results specimen: a search that excludes everything, answered by a region that
 * says what was searched for, offers the nearest spelling, and hands back a way to
 * loosen the search. The query is mistyped on purpose, because a typo is the most
 * likely reason a list goes empty.
 *
 * The subject is the no results region. The field, the catalogue, and the frame are
 * scenery: the term names what the results area becomes, not the search that got it
 * there. Both states live in one fixed-height slot, so the swap moves nothing
 * (SPEC §5), and the field keeps its query throughout, since wiping it is the usual
 * way this state turns hostile.
 */
export function mount(root: HTMLElement): void {
  const rows = CATALOGUE.map(
    (item) => `
      <li class="sp-list-item" data-part="item-${item.slug}">
        <span class="sp-grow">${item.label}</span>
        <span class="sp-text">In stock</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Catalogue</span></div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-row" style="gap: 8px">
            ${icon('search')}
            <input class="sp-input" data-part="query" type="text" spellcheck="false" aria-label="Search the catalogue" placeholder="Search" />
          </div>
          <div class="sp-surface sp-grow" style="position: relative; min-height: 0; overflow: hidden">
            <ul class="sp-list sp-scroll" data-part="results" style="height: 100%; padding: 0 4px">${rows}</ul>
            <div
              class="sp-empty"
              data-part="noresults"
              data-subject
              data-query=""
              role="status"
              hidden
              style="position: absolute; inset: 0; background: var(--sp-surface); gap: 6px"
            >
              <span class="sp-empty-mark">${icon('search')}</span>
              <span class="sp-text sp-text--ink" data-part="echo">Nothing matches</span>
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="suggest" type="button" data-word="">Did you mean</button>
              <button class="sp-button sp-button--sm" data-part="clear" type="button">Clear the search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const input = part(root, 'query') as HTMLInputElement;
  const results = part(root, 'results');
  const panel = part(root, 'noresults');
  const echo = part(root, 'echo');
  const suggest = part(root, 'suggest');

  const render = () => {
    const query = input.value.trim().toLowerCase();
    let matches = 0;
    for (const item of CATALOGUE) {
      const hit = query.length === 0 || item.label.toLowerCase().includes(query);
      part(root, `item-${item.slug}`).hidden = !hit;
      if (hit) matches++;
    }
    // The query is quoted back, because by now the reader has stopped looking at the field.
    panel.dataset.query = query;
    echo.textContent = `Nothing in the catalogue matches “${input.value.trim()}”`;
    const word = query.length > 0 ? suggestionFor(query) : undefined;
    suggest.dataset.word = word ?? '';
    suggest.hidden = word === undefined;
    if (word) suggest.textContent = `Did you mean ${word}?`;
    panel.hidden = matches > 0 || query.length === 0;
    // The list keeps its scroll position rather than its box: hiding it under the
    // panel would leave the panel painting over half-drawn rows.
    results.style.visibility = panel.hidden ? 'visible' : 'hidden';
  };

  input.addEventListener('input', render);

  suggest.addEventListener('click', () => {
    input.value = suggest.dataset.word ?? '';
    render();
  });

  part(root, 'clear').addEventListener('click', () => {
    input.value = '';
    render();
  });
}
