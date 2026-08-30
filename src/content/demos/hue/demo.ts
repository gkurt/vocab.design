import { flag, part, partsOf } from '#src/kit/parts.ts';

/**
 * The two coordinates the specimen holds still. Written in oklch because that is the
 * model where holding them actually holds: rotating hue at a fixed HSL lightness
 * changes how light the colour reads as well as which colour it is.
 */
const HELD = { l: 0.62, c: 0.15 };

/** Six stops around the wheel, far enough apart that each has its own colour name. */
const STOPS = [
  { angle: 25, name: 'red' },
  { angle: 70, name: 'amber' },
  { angle: 140, name: 'green' },
  { angle: 195, name: 'teal' },
  { angle: 265, name: 'indigo' },
  { angle: 325, name: 'magenta' },
];
const START = 265;

const titled = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);

const colorAt = (angle: number) => `oklch(${HELD.l} ${HELD.c} ${angle})`;
const washAt = (angle: number) => `color-mix(in oklab, ${colorAt(angle)} 16%, var(--sp-surface))`;

/**
 * Hue specimen: one lightness and one chroma, held, while the hue angle walks the
 * wheel. The band is the term; the sample below it is what the reader is really
 * being shown, since the only thing that changes about it is its name.
 *
 * The sample row used to read "Reads as indigo", which is the site telling the reader what
 * to see. It prints the colour's name the way a palette panel does, and nothing else. The
 * row above it was headed "Held constant", which is the exhibit describing its own method;
 * a colour panel heads that row with the model it is working in, so it reads "oklch".
 */
export function mount(root: HTMLElement): void {
  const band = STOPS.map(
    ({ angle }) => `
      <button data-part="stop-${angle}" aria-label="hue ${angle}"
              style="flex: 1 1 0; height: 44px; padding: 0; border: 0; cursor: pointer; background: ${colorAt(angle)}"></button>`,
  ).join('');

  const ticks = STOPS.map(
    ({ angle }) => `<span class="sp-label" data-part="tick" style="flex: 1 1 0; text-align: center; font-size: 10px">${angle}</span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 340px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">oklch</span>
          <span class="sp-text">L 0.62 · C 0.15</span>
        </div>

        <div class="sp-row" data-part="strip" data-subject data-hue="${START}"
             style="gap: 0; margin-top: 12px; border-radius: 6px; overflow: hidden">${band}</div>
        <div class="sp-row" style="gap: 0; margin-top: 5px">${ticks}</div>

        <div class="sp-row sp-context" data-part="sample"
             style="margin-top: 16px; padding: 10px 12px; border: 1px solid var(--sp-line); border-radius: var(--sp-radius); background: ${washAt(START)}">
          <span class="sp-swatch" data-part="dot" style="width: 16px; height: 16px; border-radius: 50%; --sp-swatch: ${colorAt(START)}"></span>
          <span class="sp-grow sp-text sp-text--ink" data-part="name">Indigo</span>
          <span class="sp-text" data-part="value" style="width: 52px; text-align: right">H ${START}</span>
        </div>
      </div>
    </div>
  `;

  const strip = part(root, 'strip');
  const sample = part(root, 'sample');
  const dot = part(root, 'dot');
  const name = part(root, 'name');
  const value = part(root, 'value');
  const picks = STOPS.map((stop) => ({ stop, el: part(root, `stop-${stop.angle}`) }));
  const ticked = partsOf(root, 'tick');

  const paint = (angle: number) => {
    const chosen = STOPS.find((stop) => stop.angle === angle);
    if (!chosen) return;
    strip.dataset.hue = String(angle);
    picks.forEach((pick, index) => {
      const on = pick.stop.angle === angle;
      flag(pick.el, 'data-selected', on);
      pick.el.style.boxShadow = on ? 'inset 0 0 0 2px var(--sp-surface), inset 0 0 0 4px var(--sp-ink)' : '';
      const tick = ticked[index];
      if (tick) tick.style.color = on ? 'var(--sp-ink)' : '';
    });
    sample.style.background = washAt(angle);
    dot.style.setProperty('--sp-swatch', colorAt(angle));
    name.textContent = titled(chosen.name);
    value.textContent = `H ${angle}`;
  };
  paint(START);

  for (const pick of picks) pick.el.addEventListener('click', () => paint(pick.stop.angle));
}
