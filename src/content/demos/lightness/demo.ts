import { flag, part, partsOf } from '#src/kit/parts.ts';

/**
 * Hue and chroma held while lightness walks from near black to near white. The chroma
 * is deliberately modest: a higher one would fall outside sRGB at the pale end, and a
 * clamped stop would mean the specimen had changed two things instead of one.
 */
const HELD = { h: 262, c: 0.06 };

/** Lightness as whole numbers, since a `data-part` name cannot carry a decimal point. */
const STOPS = [
  { l: 22, name: 'deep' },
  { l: 38, name: 'dark' },
  { l: 55, name: 'mid' },
  { l: 72, name: 'light' },
  { l: 90, name: 'pale' },
];
const START = 55;

const colorAt = (l: number) => `oklch(${l / 100} ${HELD.c} ${HELD.h})`;
const washAt = (l: number) => `color-mix(in oklab, ${colorAt(l)} 16%, var(--sp-surface))`;

/**
 * Lightness specimen: one hue at one chroma, five steps from near black to near white.
 * The band is the term, and it is also the axis a ramp is cut along, which is why the
 * steps are the same shape as the ones a palette ships.
 */
export function mount(root: HTMLElement): void {
  const band = STOPS.map(
    ({ l }) => `
      <button data-part="stop-${l}" aria-label="lightness ${l / 100}"
              style="flex: 1 1 0; height: 44px; padding: 0; border: 0; cursor: pointer; background: ${colorAt(l)}"></button>`,
  ).join('');

  const ticks = STOPS.map(
    ({ l }) => `<span class="sp-label" data-part="tick" style="flex: 1 1 0; text-align: center; font-size: 10px">${l / 100}</span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 340px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Held constant</span>
          <span class="sp-text">H 262 · C 0.06</span>
        </div>

        <div class="sp-row" data-part="ramp" data-subject data-lightness="${START}"
             style="gap: 0; margin-top: 12px; border-radius: 6px; overflow: hidden">${band}</div>
        <div class="sp-row" style="gap: 0; margin-top: 5px">${ticks}</div>

        <div class="sp-row sp-context" data-part="sample"
             style="margin-top: 16px; padding: 10px 12px; border: 1px solid var(--sp-line); border-radius: var(--sp-radius); background: ${washAt(START)}">
          <span class="sp-swatch" data-part="dot" style="width: 16px; height: 16px; border-radius: 50%; --sp-swatch: ${colorAt(START)}"></span>
          <span class="sp-grow sp-text sp-text--ink" data-part="name">Reads as mid</span>
          <span class="sp-text" data-part="value" style="width: 52px; text-align: right">L ${START / 100}</span>
        </div>
      </div>
    </div>
  `;

  const ramp = part(root, 'ramp');
  const sample = part(root, 'sample');
  const dot = part(root, 'dot');
  const name = part(root, 'name');
  const value = part(root, 'value');
  const picks = STOPS.map((stop) => ({ stop, el: part(root, `stop-${stop.l}`) }));
  const ticked = partsOf(root, 'tick');

  const paint = (l: number) => {
    const chosen = STOPS.find((stop) => stop.l === l);
    if (!chosen) return;
    ramp.dataset.lightness = String(l);
    picks.forEach((pick, index) => {
      const on = pick.stop.l === l;
      flag(pick.el, 'data-selected', on);
      pick.el.style.boxShadow = on ? 'inset 0 0 0 2px var(--sp-surface), inset 0 0 0 4px var(--sp-ink)' : '';
      const tick = ticked[index];
      if (tick) tick.style.color = on ? 'var(--sp-ink)' : '';
    });
    sample.style.background = washAt(l);
    dot.style.setProperty('--sp-swatch', colorAt(l));
    name.textContent = `Reads as ${chosen.name}`;
    value.textContent = `L ${l / 100}`;
  };
  paint(START);

  for (const pick of picks) pick.el.addEventListener('click', () => paint(pick.stop.l));
}
