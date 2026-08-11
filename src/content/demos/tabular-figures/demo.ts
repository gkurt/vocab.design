import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const ROWS = ['Revenue', 'Refunds', 'Fees', 'Net'];

/** Fixed frames rather than random numbers: a specimen has to run the same way twice. */
const FRAMES: Record<string, string[]> = {
  a: ['8,412.05', '1,970.36', '6,033.18', '9,258.47'],
  b: ['3,187.90', '4,506.11', '2,749.63', '8,011.24'],
  c: ['5,620.38', '7,193.05', '1,408.77', '3,865.92'],
};
const ORDER = ['a', 'b', 'c'];
const TICK_MS = 1400;

const column = (prefix: string) =>
  ROWS.map((_, i) => `<span data-part="${prefix}-${i}" style="text-align: right; font-size: 13px">${FRAMES.a?.[i] ?? ''}</span>`).join('');

/**
 * Tabular figures specimen: one ledger totalled twice, the same eight-character
 * amounts set in proportional figures on the left and tabular on the right,
 * re-totalling every beat. Proportional digits refuse to stack and the column's
 * inner edge twitches on every update; the tabular column holds still.
 *
 * The subject is the tabular column of numerals, not the panel: the term names
 * the figures, and the ledger around them is only somewhere to put them.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 360px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Ledger</span>
          <span class="sp-label">live</span>
        </div>
        <div class="sp-row" style="align-items: flex-start; gap: 16px; margin-top: 14px">
          <div class="sp-stack sp-context" style="gap: 6px; width: 74px">
            <span class="sp-label">&nbsp;</span>
            ${ROWS.map((label) => `<span class="sp-text sp-text--ink">${label}</span>`).join('')}
          </div>
          <div class="sp-stack sp-context" style="gap: 6px; width: 90px">
            <span class="sp-label" style="text-align: right">proportional</span>
            <div class="sp-stack" data-part="col-prop" data-frame="a"
                 style="gap: 6px; font-variant-numeric: proportional-nums">
              ${column('prop')}
            </div>
          </div>
          <div class="sp-stack" style="gap: 6px; width: 90px">
            <span class="sp-label sp-context" style="text-align: right">tabular</span>
            <div class="sp-stack" data-part="col-tab" data-subject data-frame="a"
                 style="gap: 6px; font-variant-numeric: tabular-nums">
              ${column('tab')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const prop = part(root, 'col-prop');
  const tab = part(root, 'col-tab');
  const cells = ROWS.map((_, i) => [part(root, `prop-${i}`), part(root, `tab-${i}`)] as const);

  let index = 0;
  const tick = () => {
    index = (index + 1) % ORDER.length;
    const name = ORDER[index] ?? 'a';
    const values = FRAMES[name] ?? FRAMES.a;
    cells.forEach(([left, right], i) => {
      const value = values?.[i] ?? '';
      left.textContent = value;
      right.textContent = value;
    });
    prop.dataset.frame = name;
    tab.dataset.frame = name;
    clock.setTimeout(tick, TICK_MS);
  };
  clock.setTimeout(tick, TICK_MS);
}
