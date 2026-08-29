import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const FACTS: [string, string][] = [
  ['Owner', 'Rosa Marin'],
  ['Created', '4 April 2025'],
  ['Status', 'In review'],
  ['Size', '18.4 MB'],
];

const pair = ([name, value]: [string, string], i: number) => `
  <div
    class="sp-row"
    data-part="pair-${i}"
    style="gap: 10px; padding: 7px 0; ${i === 0 ? '' : 'border-top: 1px solid var(--sp-line);'}"
  >
    <dt class="sp-label" data-part="term-${i}" style="width: 82px; flex: 0 0 auto">${name}</dt>
    <dd class="sp-text sp-text--ink" style="margin: 0">${value}</dd>
  </div>`;

const row = ([name, value]: [string, string]) => `<tr><td>${name}</td><td>${value}</td></tr>`;

/**
 * Description list specimen: the details of one asset written as `dl`/`dt`/`dd` pairs,
 * with the same four facts crammed into a two-column table beside it as the misuse the
 * term is usually confused with.
 *
 * The subject is the list itself, not the panel it sits in: the term names the paired
 * markup and its ruled rows, and the card, the heading, the layout control, and the
 * table beside it are all scenery.
 *
 * Two layouts, one markup, which is the reason to use the element: the control
 * restyles the pairs without touching what they say. The list's column is tall enough
 * for the stacked arrangement, so growing it moves nothing beside or below it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Harbour survey.pdf</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="layout" data-axis="Layout" data-value="rows">
            <button class="sp-segment" data-part="seg-rows" value="rows">Rows</button>
            <button class="sp-segment" data-part="seg-stacked" value="stacked">Stacked</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; gap: 12px; padding: 12px">
          <div class="sp-surface" style="flex: 1 1 0; padding: 4px 12px 10px">
            <dl data-part="list" data-subject data-layout="rows" style="margin: 0">
              ${FACTS.map(pair).join('')}
            </dl>
          </div>
          <div class="sp-stack sp-context" style="flex: 1 1 0; gap: 6px; min-width: 0">
            <div class="sp-surface" style="overflow: hidden">
              <table class="sp-table" data-part="table" style="--sp-cell-pad: 5px 10px">
                <thead><tr><th>Field</th><th>Value</th></tr></thead>
                <tbody>${FACTS.map(row).join('')}</tbody>
              </table>
            </div>
            <p class="sp-text" style="margin: 0; font-size: 12px">
              The same facts as a table: a header row that says nothing, and a column
              nobody would sort.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  const list = part(root, 'list');
  const pairs = FACTS.map((_, i) => part(root, `pair-${i}`));
  const terms = FACTS.map((_, i) => part(root, `term-${i}`));

  const layout = (mode: string) => {
    const stacked = mode === 'stacked';
    list.dataset.layout = stacked ? 'stacked' : 'rows';
    for (const box of pairs) {
      box.style.flexDirection = stacked ? 'column' : 'row';
      box.style.alignItems = stacked ? 'flex-start' : 'center';
      box.style.gap = stacked ? '2px' : '10px';
    }
    for (const term of terms) term.style.width = stacked ? 'auto' : '82px';
  };

  // Each segment names the layout it wants, so a pass joined anywhere lands on the
  // arrangement the segment says (SPEC §8).
  part(root, 'layout').addEventListener('change', (event) => layout((event as CustomEvent<string>).detail));

  layout('rows');
}
