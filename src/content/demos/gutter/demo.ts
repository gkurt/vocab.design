import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const RACK = 420;
const MARGIN = 20;
const CONTENT = RACK - MARGIN * 2;
const COLUMNS = 3;
const SIZES = [8, 16, 24];
const START = 16;

const BAND = 'position: absolute; top: 0; bottom: 0; pointer-events: none';

const CARDS = ['Ferry', 'Chandler', 'Slipway']
  .map(
    (name) => `
      <div class="sp-surface" style="padding: 10px; display: flex; flex-direction: column; gap: 8px">
        <span class="sp-label">${name}</span>
        <div class="sp-line" style="width: 90%"></div>
        <div class="sp-line" style="width: 68%"></div>
      </div>`,
  )
  .join('');

/**
 * Gutter specimen: three columns in a rack of fixed width, with the two gutters and
 * the two outer margins drawn as bands so the difference between them is visible
 * rather than asserted. Stepping the gutter narrows the columns and leaves the rack
 * and its margins exactly where they were, which is the whole distinction.
 *
 * The subject is one gutter band. Both gutters are painted identically, because a
 * subject may not be emphasised (SPEC §5) and a highlighted gutter beside a plain one
 * would be claiming the wrong thing: they are the same strip of space twice.
 *
 * Band positions are arithmetic from the rack width, the margin and the gutter, the
 * same three numbers the grid itself is given, so nothing here measures a layout it
 * has just written.
 */
export function mount(root: HTMLElement): void {
  const segments = SIZES.map(
    (size) => `<button class="sp-segment" type="button" data-part="seg-${size}" value="${size}">${size}px</button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 470px; height: 286px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Gutter</span>
          <sp-segmented class="sp-segmented" data-part="switcher" data-value="${START}">${segments}</sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px">
          <div data-part="rack" data-gutter="${START}" style="position: relative; width: ${RACK}px; height: 132px; padding-inline: ${MARGIN}px">
            <div class="sp-grid" data-part="grid" style="grid-template-columns: repeat(${COLUMNS}, 1fr); gap: ${START}px; height: 100%">
              ${CARDS}
            </div>
            <div class="sp-context" data-part="margin-left" style="${BAND}; left: 0; width: ${MARGIN}px; background: var(--sp-line); opacity: 0.7"></div>
            <div class="sp-context" data-part="margin-right" style="${BAND}; right: 0; width: ${MARGIN}px; background: var(--sp-line); opacity: 0.7"></div>
            <div data-part="gutter-1" data-subject data-size="${START}" style="${BAND}; background: var(--sp-accent-soft)"></div>
            <div data-part="gutter-2" data-size="${START}" style="${BAND}; background: var(--sp-accent-soft)"></div>
          </div>
          <div class="sp-row sp-context" style="gap: 16px; height: 18px">
            <span class="sp-row" style="gap: 6px">
              <span class="sp-swatch" style="width: 14px; height: 14px; --sp-swatch: var(--sp-accent-soft)"></span>
              <span class="sp-label" data-part="legend-gutter" style="font-variant-numeric: tabular-nums"></span>
            </span>
            <span class="sp-row" style="gap: 6px">
              <span class="sp-swatch" style="width: 14px; height: 14px; --sp-swatch: var(--sp-line)"></span>
              <span class="sp-label">margin ${MARGIN}px, outside the grid</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;

  const rack = part(root, 'rack');
  const grid = part(root, 'grid');
  const bands = [part(root, 'gutter-1'), part(root, 'gutter-2')];
  const legend = part(root, 'legend-gutter');

  const apply = (gutter: number) => {
    const column = (CONTENT - gutter * (COLUMNS - 1)) / COLUMNS;
    rack.dataset.gutter = String(gutter);
    grid.style.gap = `${gutter}px`;
    bands.forEach((band, index) => {
      band.dataset.size = String(gutter);
      band.style.left = `${MARGIN + column * (index + 1) + gutter * index}px`;
      band.style.width = `${gutter}px`;
    });
    legend.textContent = `gutter ${gutter}px, ${COLUMNS - 1} of them, columns ${Math.round(column)}px`;
  };

  // Each segment names a gutter, so the switch lands on that size rather than
  // stepping to the next one (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply(Number((event as CustomEvent<string>).detail)));

  apply(START);
}
