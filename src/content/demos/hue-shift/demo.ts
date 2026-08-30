import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Body = { key: string; label: string; base: number; high: number; low: number };

/**
 * Three objects, each with its own hue budget. `high` is where the lit side rotates to and
 * `low` where the shadow does, both written out rather than derived, because how far a hue
 * may travel before it stops being the same colour is a judgement per hue.
 */
const BODIES: Body[] = [
  { key: 'blue', label: 'Blue', base: 258, high: 78, low: 306 },
  { key: 'green', label: 'Green', base: 148, high: 96, low: 252 },
  { key: 'red', label: 'Red', base: 28, high: 84, low: 336 },
];

const START = 'blue';

/** One hue held all the way down: the lit side is a tint of it, the shadow a shade of it. */
const flat = (b: Body) =>
  `radial-gradient(circle at 33% 27%, oklch(0.93 0.05 ${b.base}) 0%, oklch(0.63 0.15 ${b.base}) 44%, oklch(0.28 0.07 ${b.base}) 100%)`;

/** The same lightness ladder with the hue steered: warm into the light, cool into the dark. */
const shifted = (b: Body) =>
  `radial-gradient(circle at 33% 27%, oklch(0.93 0.13 ${b.high}) 0%, oklch(0.63 0.16 ${b.base}) 44%, oklch(0.31 0.13 ${b.low}) 100%)`;

const WHEEL = `conic-gradient(from 0deg, ${[0, 60, 120, 180, 240, 300, 360].map((h) => `oklch(0.68 0.19 ${h})`).join(', ')})`;

const pin = (name: string, angle: number, fill: string) => `
  <span data-part="${name}" style="position: absolute; left: 50%; top: 50%; width: 0; height: 0; rotate: ${angle}deg">
    <span style="position: absolute; left: -5px; top: -30px; width: 10px; height: 10px; border-radius: 50%;
                 background: ${fill}; box-shadow: 0 0 0 2px rgb(255 255 255 / 0.95), 0 1px 2px rgb(0 0 0 / 0.45)"></span>
  </span>`;

/**
 * Hue shift specimen: one lightness ladder rendered twice on the same object. The left
 * sphere steers hue as it goes light and dark, the right one holds a single hue and only
 * changes how much of it there is. The wheel beside them says where the three hues sit.
 *
 * The subject is the hue-shifted sphere. The naive twin is the comparison, and it, the
 * wheel, the picker and the readout stay in the context register (SPEC §5). Changing the
 * object hue re-renders both spheres, so the subject is a hue shift in every state.
 *
 * Every box is fixed size and only paint and a rotation change, so nothing moves.
 *
 * Three strings were the site reading the picture aloud from inside it. A caption saying
 * "Both spheres travel the same lightness values. Only the left one lets the hue travel with
 * them." and a note saying "lightness ladder unchanged" are gone; the twin's label, "One hue,
 * dimmed", now just names it "One hue", parallel to the shifted sphere beside it. The article
 * makes the same points at length.
 */
export function mount(root: HTMLElement): void {
  const start = BODIES.find((b) => b.key === START) ?? BODIES[0];
  if (!start) return;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 438px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Object hue" data-value="${START}">
            ${BODIES.map((b) => `<button class="sp-segment" data-part="seg-${b.key}" value="${b.key}">${b.label}</button>`).join('')}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 16px; margin-top: 12px; align-items: flex-start; justify-content: center">
          <div class="sp-stack" style="flex: 0 0 auto; gap: 6px; align-items: center">
            <div data-part="ball" data-subject data-hue="${START}"
                 style="width: 116px; height: 116px; border-radius: 50%; background-image: ${shifted(start)}"></div>
            <span class="sp-label">Hue shifted</span>
          </div>

          <div class="sp-stack sp-context" style="flex: 0 0 auto; gap: 6px; align-items: center">
            <div data-part="flat"
                 style="width: 116px; height: 116px; border-radius: 50%; background-image: ${flat(start)}"></div>
            <span class="sp-label">One hue</span>
          </div>

          <div class="sp-stack sp-context" style="flex: 0 0 auto; gap: 6px; align-items: center">
            <div data-part="wheel" style="position: relative; width: 76px; height: 76px; border-radius: 50%; background-image: ${WHEEL}">
              ${pin('pin-high', start.high, '#ffffff')}
              ${pin('pin-base', start.base, '#23262b')}
              ${pin('pin-low', start.low, '#ffffff')}
            </div>
            <span class="sp-label" style="font-size: 10px">Hues used</span>
          </div>
        </div>

        <div class="sp-row sp-context" style="margin-top: 10px">
          <span class="sp-text" data-part="readout" style="font-size: 10.5px">light ${start.high}, body ${start.base}, shadow ${start.low}</span>
        </div>
      </div>
    </div>
  `;

  const ball = part(root, 'ball');
  const flatBall = part(root, 'flat');
  const readout = part(root, 'readout');

  const render = (key: string) => {
    const body = BODIES.find((b) => b.key === key);
    if (!body) return;
    ball.dataset.hue = key;
    ball.style.backgroundImage = shifted(body);
    flatBall.style.backgroundImage = flat(body);
    part(root, 'pin-high').style.rotate = `${body.high}deg`;
    part(root, 'pin-base').style.rotate = `${body.base}deg`;
    part(root, 'pin-low').style.rotate = `${body.low}deg`;
    readout.textContent = `light ${body.high}, body ${body.base}, shadow ${body.low}`;
  };
  render(START);

  part(root, 'segmented').addEventListener('change', (event) => render((event as CustomEvent<string>).detail));
}
