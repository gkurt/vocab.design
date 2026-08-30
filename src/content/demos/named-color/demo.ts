import { flag, part } from '#src/kit/parts.ts';

/** Twelve of the 148, spread across the list's range: food, flowers, minerals, and the one memorial. */
const COLORS: { name: string; hex: string }[] = [
  { name: 'tomato', hex: '#FF6347' },
  { name: 'coral', hex: '#FF7F50' },
  { name: 'papayawhip', hex: '#FFEFD5' },
  { name: 'khaki', hex: '#F0E68C' },
  { name: 'wheat', hex: '#F5DEB3' },
  { name: 'seagreen', hex: '#2E8B57' },
  { name: 'teal', hex: '#008080' },
  { name: 'cornflowerblue', hex: '#6495ED' },
  { name: 'dodgerblue', hex: '#1E90FF' },
  { name: 'rebeccapurple', hex: '#663399' },
  { name: 'thistle', hex: '#D8BFD8' },
  { name: 'gainsboro', hex: '#DCDCDC' },
];

const START = 'tomato';

const EDGE = 'inset 0 0 0 1px rgb(16 24 40 / 0.16)';

/**
 * Named colour specimen: twelve of the keywords CSS knows, each swatch painted with the
 * keyword itself rather than with its value, and a readout that states the sRGB value the
 * keyword resolves to. Picking a swatch is an absolute act: every cell names one colour.
 *
 * The subject is the grid of keywords rather than any one cell, because the term names the
 * vocabulary and a single swatch would claim the term was "tomato". The readout row stays in
 * the context register. The grid and the row are fixed size and the ring is drawn as a shadow,
 * so picking repaints and moves nothing (SPEC §5).
 *
 * A line under the grid read "The 148 keywords CSS inherited from X11, each pinned to one sRGB
 * value no theme can move." Nothing in a swatch picker prints its own history, and the article
 * carries both the count and the X11 inheritance, so it went.
 */
export function mount(root: HTMLElement): void {
  const cells = COLORS.map(
    ({ name }) => `
      <button class="sp-stack" data-part="cell-${name}" data-name="${name}" type="button"
              style="gap: 3px; padding: 0; border: 0; background: transparent; font: inherit; cursor: pointer; text-align: left">
        <span class="sp-swatch" style="width: 100%; height: 26px; box-shadow: ${EDGE}; --sp-swatch: ${name}"></span>
        <span class="sp-label" style="font-size: 10px; color: var(--sp-ink)">${name}</span>
      </button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-grid" data-part="grid" data-subject data-picked="${START}"
             style="grid-template-columns: repeat(3, 1fr)">${cells}</div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 12px">
          <span class="sp-row" style="gap: 6px">
            <span class="sp-swatch" data-part="readout-chip" style="width: 14px; height: 14px; box-shadow: ${EDGE}"></span>
            <span class="sp-text sp-text--ink" data-part="readout" data-name="${START}" style="font-size: 12px">&nbsp;</span>
          </span>
          <span class="sp-label" style="font-size: 11px">resolves to</span>
        </div>

      </div>
    </div>
  `;

  const grid = part(root, 'grid');
  const readout = part(root, 'readout');
  const chip = part(root, 'readout-chip');

  const pick = (name: string) => {
    const entry = COLORS.find((c) => c.name === name);
    if (!entry) return;
    grid.dataset.picked = name;
    for (const { name: other } of COLORS) {
      const cell = part(root, `cell-${other}`);
      const on = other === name;
      flag(cell, 'data-picked', on);
      const swatch = cell.querySelector<HTMLElement>('.sp-swatch');
      if (swatch) swatch.style.boxShadow = on ? `0 0 0 2px var(--sp-accent), ${EDGE}` : EDGE;
    }
    readout.dataset.name = name;
    readout.textContent = `${entry.name} = ${entry.hex}`;
    chip.style.setProperty('--sp-swatch', entry.name);
  };
  pick(START);

  for (const { name } of COLORS) {
    part(root, `cell-${name}`).addEventListener('click', () => pick(name));
  }
}
