import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Range = 'month' | 'quarter';

const FIGURES: Record<Range, { heading: string; rows: { label: string; value: string; share: number }[] }> = {
  month: {
    heading: 'Spending by category, March',
    rows: [
      { label: 'Groceries', value: '412.60', share: 74 },
      { label: 'Transport', value: '88.20', share: 16 },
    ],
  },
  quarter: {
    heading: 'Spending by category, Q1',
    rows: [
      { label: 'Groceries', value: '1,204.10', share: 68 },
      { label: 'Transport', value: '319.45', share: 18 },
    ],
  },
};

/**
 * Generative UI specimen: a request answered with a small interface instead of a
 * paragraph. Asking assembles a panel out of parts this app already ships (a heading,
 * two stat rows, a range picker), and the recipe line names what was assembled, so the
 * reader can see the answer is a composition of known components rather than markup
 * invented on the spot.
 *
 * Nothing is fetched and no request is faked: the figures are static and the panel is
 * built from them the moment Ask is pressed, which is what a specimen can honestly show
 * (SPEC §5, no network).
 *
 * The subject is the assembled panel, the narrowest element the term names. The prompt
 * row, the Clear control, and the placeholder it replaces are scenery (SPEC §5). No
 * `data-pose`: the panel is the term in either range it can show.
 *
 * The result area is a fixed box holding the placeholder and the panel in the same
 * place, so assembling an answer never resizes the frame (SPEC §5). Ask builds, Clear
 * empties, and the range is an absolute pick: nothing toggles (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 272px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Ledger assistant</span>
          <span class="sp-label" style="font-size: 11px">Composes from this app's own parts</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">

          <div class="sp-row sp-context" style="gap: 8px">
            ${icon('search')}
            <input class="sp-input" data-part="prompt" type="text" spellcheck="false" aria-label="Ask the ledger" placeholder="Ask about your spending" />
            <button class="sp-button sp-button--sm" data-part="ask" type="button" aria-disabled="true">Ask</button>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="clear" type="button">Clear</button>
          </div>

          <div style="position: relative; flex: 1 1 auto; min-height: 0">
            <div class="sp-surface sp-context sp-empty" data-part="placeholder" style="position: absolute; inset: 0; gap: 6px">
              <span class="sp-text" style="font-size: 12px">An answer here is a panel, not a paragraph.</span>
              <span class="sp-label" style="font-size: 10px">Ask, and the parts are picked for the question.</span>
            </div>

            <section
              class="sp-surface"
              data-part="result"
              data-subject
              data-range="month"
              style="position: absolute; inset: 0; display: flex; flex-direction: column; gap: 8px; padding: 10px 12px; visibility: hidden"
            >
              <div class="sp-row sp-row--between" style="gap: 8px">
                <span class="sp-heading" data-part="result-heading" style="font-size: 13px">${FIGURES.month.heading}</span>
                <sp-segmented class="sp-segmented" data-axis="Range" data-part="range" data-value="month">
                  <button class="sp-segment" data-part="range-month" value="month" style="padding: 3px 10px; font-size: 12px">March</button>
                  <button class="sp-segment" data-part="range-quarter" value="quarter" style="padding: 3px 10px; font-size: 12px">Q1</button>
                </sp-segmented>
              </div>
              <div class="sp-stack" data-part="stats" style="gap: 8px"></div>
              <span class="sp-label" data-part="recipe" style="margin-top: auto; font-size: 10px">
                Assembled for this question: heading, 2 stat rows, 1 range picker.
              </span>
            </section>
          </div>

        </div>
      </div>
    </div>
  `;

  const input = part(root, 'prompt') as HTMLInputElement;
  const ask = part(root, 'ask');
  const placeholder = part(root, 'placeholder');
  const result = part(root, 'result');
  const heading = part(root, 'result-heading');
  const stats = part(root, 'stats');

  const draw = (range: Range) => {
    const figures = FIGURES[range];
    result.dataset.range = range;
    heading.textContent = figures.heading;
    stats.innerHTML = figures.rows
      .map(
        (row, i) => `
          <div data-part="stat-${i}">
            <div class="sp-row sp-row--between" style="height: 18px">
              <span class="sp-text sp-text--ink" style="font-size: 12px">${row.label}</span>
              <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600; font-variant-numeric: tabular-nums">${row.value}</span>
            </div>
            <div class="sp-progress" style="margin-top: 4px"><div class="sp-progress-fill" style="--sp-value: ${row.share}%"></div></div>
          </div>`,
      )
      .join('');
  };

  // Both screens keep their box and take turns being seen, which is also what lets the
  // panel's own segmented control measure its thumb before it is ever shown.
  const show = (built: boolean) => {
    result.style.visibility = built ? 'visible' : 'hidden';
    placeholder.style.visibility = built ? 'hidden' : 'visible';
  };

  input.addEventListener('input', () => {
    ask.setAttribute('aria-disabled', String(input.value.trim().length === 0));
  });

  ask.addEventListener('click', () => {
    if (input.value.trim().length === 0) return;
    draw('month');
    show(true);
  });

  part(root, 'clear').addEventListener('click', () => {
    input.value = '';
    ask.setAttribute('aria-disabled', 'true');
    show(false);
  });

  part(root, 'range').addEventListener('change', (event) => {
    draw((event as CustomEvent<string>).detail === 'quarter' ? 'quarter' : 'month');
  });

  draw('month');
  show(false);
}
