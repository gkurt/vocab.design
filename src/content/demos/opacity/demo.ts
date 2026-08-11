import { flag, part } from '#src/kit/parts.ts';

/** The gallery behind the panel: structure loud enough that a fade has something to reveal. */
const TILES = [25, 70, 140, 195, 265, 325];

const STOPS = [100, 75, 50, 25, 10];
const START = 100;

/**
 * Opacity specimen: one panel over a backdrop with plenty to see, stepping down through
 * absolute opacity stops. The panel is the subject and the whole of it fades together,
 * heading, text, border and button, which is the part that separates opacity from an
 * alpha channel on a single colour.
 */
export function mount(root: HTMLElement): void {
  const tiles = TILES.map((angle) => `<span class="sp-swatch" style="--sp-swatch: oklch(0.68 0.14 ${angle})"></span>`).join('');

  const chips = STOPS.map((pct) => `<button class="sp-chip" data-part="stop-${pct}">${pct}%</button>`).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-grid sp-context"
             style="position: absolute; inset: 0; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); padding: 8px">
          ${tiles}
        </div>

        <div class="sp-window" data-part="panel" data-subject data-opacity="${START}"
             style="position: absolute; top: 50%; left: 50%; translate: -50% -50%; width: 240px; opacity: ${START / 100}; box-shadow: var(--sp-shadow)">
          <div class="sp-row sp-row--between">
            <span class="sp-heading">Export</span>
            <span class="sp-label" data-part="readout">${START}%</span>
          </div>
          <p class="sp-text" style="margin: 6px 0 0">Six frames, one sheet.</p>
          <div class="sp-row" style="margin-top: 12px">
            <button class="sp-button sp-button--sm">Save</button>
            <button class="sp-button sp-button--sm sp-button--ghost">Cancel</button>
          </div>
        </div>
      </div>

      <div class="sp-row sp-context" data-part="stops">${chips}</div>
    </div>
  `;

  const panel = part(root, 'panel');
  const readout = part(root, 'readout');
  const picks = STOPS.map((pct) => ({ pct, el: part(root, `stop-${pct}`) }));

  const fade = (pct: number) => {
    panel.dataset.opacity = String(pct);
    panel.style.opacity = String(pct / 100);
    readout.textContent = `${pct}%`;
    for (const pick of picks) flag(pick.el, 'data-selected', pick.pct === pct);
  };
  fade(START);

  for (const pick of picks) pick.el.addEventListener('click', () => fade(pick.pct));
}
