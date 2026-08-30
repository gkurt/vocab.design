import { flag, part, partsOf } from '#src/kit/parts.ts';

/**
 * Hue and lightness held while saturation walks from grey to the pure hue. Written in
 * hsl because saturation is that model's own coordinate: the perceptual spaces call
 * their cousin chroma and measure it differently.
 */
const HELD = { h: 258, l: 52 };

const STOPS = [
  { pct: 0, name: 'grey' },
  { pct: 18, name: 'muted' },
  { pct: 40, name: 'soft' },
  { pct: 65, name: 'vivid' },
  { pct: 92, name: 'electric' },
];
const START = 40;

const colorAt = (pct: number) => `hsl(${HELD.h} ${pct}% ${HELD.l}%)`;
const washAt = (pct: number) => `color-mix(in oklab, ${colorAt(pct)} 16%, var(--sp-surface))`;

/**
 * Saturation specimen: one hue at one lightness, five distances from grey. The band is
 * the term; the sample below reads as the same colour throughout and only changes how
 * much it insists on it.
 *
 * The header used to read "Held constant" against "H 258 · L 52%", which is the site
 * describing the experiment it set up rather than anything a colour tool prints. It shows
 * the picked colour's own notation now, so the two channels that never move are still on
 * screen and the reader can watch only the middle number change.
 */
export function mount(root: HTMLElement): void {
  const band = STOPS.map(
    ({ pct }) => `
      <button data-part="stop-${pct}" aria-label="saturation ${pct} percent"
              style="flex: 1 1 0; height: 44px; padding: 0; border: 0; cursor: pointer; background: ${colorAt(pct)}"></button>`,
  ).join('');

  const ticks = STOPS.map(
    ({ pct }) => `<span class="sp-label" data-part="tick" style="flex: 1 1 0; text-align: center; font-size: 10px">${pct}%</span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 340px">
        <div class="sp-row sp-context" style="justify-content: flex-end">
          <span class="sp-text" data-part="notation" style="font-variant-numeric: tabular-nums">${colorAt(START)}</span>
        </div>

        <div class="sp-row" data-part="ramp" data-subject data-saturation="${START}"
             style="gap: 0; margin-top: 12px; border-radius: 6px; overflow: hidden">${band}</div>
        <div class="sp-row" style="gap: 0; margin-top: 5px">${ticks}</div>

        <div class="sp-row sp-context" data-part="sample"
             style="margin-top: 16px; padding: 10px 12px; border: 1px solid var(--sp-line); border-radius: var(--sp-radius); background: ${washAt(START)}">
          <span class="sp-swatch" data-part="dot" style="width: 16px; height: 16px; border-radius: 50%; --sp-swatch: ${colorAt(START)}"></span>
          <span class="sp-grow sp-text sp-text--ink" data-part="name">Reads as soft</span>
          <span class="sp-text" data-part="value" style="width: 52px; text-align: right">S ${START}%</span>
        </div>
      </div>
    </div>
  `;

  const ramp = part(root, 'ramp');
  const sample = part(root, 'sample');
  const dot = part(root, 'dot');
  const name = part(root, 'name');
  const value = part(root, 'value');
  const notation = part(root, 'notation');
  const picks = STOPS.map((stop) => ({ stop, el: part(root, `stop-${stop.pct}`) }));
  const ticked = partsOf(root, 'tick');

  const paint = (pct: number) => {
    const chosen = STOPS.find((stop) => stop.pct === pct);
    if (!chosen) return;
    ramp.dataset.saturation = String(pct);
    picks.forEach((pick, index) => {
      const on = pick.stop.pct === pct;
      flag(pick.el, 'data-selected', on);
      pick.el.style.boxShadow = on ? 'inset 0 0 0 2px var(--sp-surface), inset 0 0 0 4px var(--sp-ink)' : '';
      const tick = ticked[index];
      if (tick) tick.style.color = on ? 'var(--sp-ink)' : '';
    });
    sample.style.background = washAt(pct);
    dot.style.setProperty('--sp-swatch', colorAt(pct));
    name.textContent = `Reads as ${chosen.name}`;
    value.textContent = `S ${pct}%`;
    notation.textContent = colorAt(pct);
  };
  paint(START);

  for (const pick of picks) pick.el.addEventListener('click', () => paint(pick.stop.pct));
}
