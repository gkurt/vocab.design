import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const channel = (hex: string, at: number) => Number.parseInt(hex.slice(at, at + 2), 16) / 255;

/** Undo the sRGB transfer curve, then weight the channels by how much light each carries. */
const linear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const luminance = (hex: string) => 0.2126 * linear(channel(hex, 1)) + 0.7152 * linear(channel(hex, 3)) + 0.0722 * linear(channel(hex, 5));

/** CIE L*: the same quantity rescaled so equal numeric steps look like equal steps. */
const lstar = (y: number) => (y > 0.008856 ? 116 * Math.cbrt(y) - 16 : 903.3 * y);

/** Five samples chosen so the channel weights are legible: green far right, blue near zero,
    and a mid grey landing on top of pure red rather than halfway up. */
const SAMPLES = [
  { key: 'white', name: 'White', hex: '#FFFFFF' },
  { key: 'green', name: 'Green', hex: '#00FF00' },
  { key: 'grey', name: 'Grey 50%', hex: '#808080' },
  { key: 'red', name: 'Red', hex: '#FF0000' },
  { key: 'blue', name: 'Blue', hex: '#0000FF' },
];

type Axis = { key: string; label: string; ticks: string[]; at: (hex: string) => number; read: (hex: string) => string; note: string };

const AXES: Axis[] = [
  {
    key: 'y',
    label: 'Luminance Y',
    ticks: ['0', '0.25', '0.5', '0.75', '1'],
    at: (hex) => luminance(hex),
    read: (hex) => `Y ${luminance(hex).toFixed(3)}`,
    note: 'Grey 50% lands near a fifth of the way along, on top of pure red. Half the channel value is nowhere near half the light.',
  },
  {
    key: 'lstar',
    label: 'Lightness L*',
    ticks: ['0', '25', '50', '75', '100'],
    at: (hex) => lstar(luminance(hex)) / 100,
    read: (hex) => `L* ${lstar(luminance(hex)).toFixed(1)}`,
    note: 'The same five colours rescaled to perception. Grey 50% now sits in the middle, which is the number a person would have guessed.',
  },
];

const START = 'y';

/** Gridlines at 0, 25, 50, 75 and 100 percent, drawn as paint so the lanes stay one node each. */
const RULES = `repeating-linear-gradient(to right, var(--sp-line) 0 1px, transparent 1px 25%),
               linear-gradient(to left, var(--sp-line) 0 1px, transparent 1px)`;

/**
 * Relative luminance specimen: five colours placed on a ruled 0 to 1 scale at the position
 * their own luminance computes to, so the weighting is seen rather than asserted. Pure green
 * sits far right and pure blue barely leaves the wall, and a 50 percent grey lands on top of
 * pure red at about a fifth rather than in the middle. Switching the scale to L* rescales the
 * same five values to perception, which is the axis a ramp is built on.
 *
 * The subject is the luminance scale. The term names the measurement, and the measurement is
 * where each chip sits; the axis control, the formula and the note are instrumentation and
 * stay in the context register (SPEC §5). The L* setting is a state the subject itself passes
 * through and it is not this term, so the honest condition is declared in `data-pose` and the
 * mount state satisfies it: identify keeps playing rather than ringing a perceptual scale
 * (SPEC §6).
 *
 * Only the chips' offsets and the readouts change, and both lanes and readouts are fixed
 * size, so switching axis moves nothing but the chips (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const start = AXES.find((a) => a.key === START) ?? AXES[0];
  if (!start) return;

  const ticks = start.ticks
    .map((label, i) => {
      const shift = i === 0 ? '0' : i === start.ticks.length - 1 ? '-100%' : '-50%';
      return `<span class="sp-text" data-part="tick-${i}"
                    style="position: absolute; left: ${i * 25}%; transform: translateX(${shift});
                           font-size: 10px; line-height: 1">${label}</span>`;
    })
    .join('');

  const lanes = SAMPLES.map(
    (sample) => `
      <div class="sp-row" style="gap: 10px; height: 22px">
        <span class="sp-text" style="flex: 0 0 58px; font-size: 11px; color: var(--sp-ink)">${sample.name}</span>
        <span style="position: relative; flex: 1 1 auto; height: 20px; background-image: ${RULES}">
          <span class="sp-swatch" data-part="chip-${sample.key}"
                style="position: absolute; top: 2px; left: ${(start.at(sample.hex) * 100).toFixed(2)}%; width: 16px; height: 16px;
                       transform: translateX(-50%); border-radius: 4px; transition: left 0.35s var(--sp-ease);
                       box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.5); --sp-swatch: ${sample.hex}"></span>
        </span>
        <span class="sp-text" data-part="value-${sample.key}"
              style="flex: 0 0 52px; text-align: right; font-size: 11px; font-variant-numeric: tabular-nums">${start.read(sample.hex)}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 448px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${START}" data-axis="Scale" data-term="y">
            ${AXES.map((a) => `<button class="sp-segment" data-part="seg-${a.key}" value="${a.key}">${a.label}</button>`).join('')}
          </sp-segmented>
        </div>

        <div data-part="scale" data-subject data-pose="[data-axis=y]" data-axis="${START}"
             style="margin-top: 12px; padding: 8px 10px 10px; border-radius: var(--sp-radius);
                    border: 1px solid var(--sp-line); background: var(--sp-surface)">
          <div class="sp-row" style="gap: 10px; height: 14px">
            <span style="flex: 0 0 58px"></span>
            <span data-part="ticks" style="position: relative; flex: 1 1 auto; height: 12px">${ticks}</span>
            <span style="flex: 0 0 52px"></span>
          </div>
          ${lanes}
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 10px">
          <span class="sp-text" style="font-size: 11px; color: var(--sp-ink)">Y = 0.2126 R + 0.7152 G + 0.0722 B</span>
          <span class="sp-text" style="font-size: 10.5px">channels linearised first</span>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note"
           style="margin: 7px 0 0; height: 30px; font-size: 11px; line-height: 1.4">${start.note}</p>
      </div>
    </div>
  `;

  const scale = part(root, 'scale');
  const note = part(root, 'note');

  const place = (key: string) => {
    const axis = AXES.find((a) => a.key === key);
    if (!axis) return;
    scale.dataset.axis = key;
    axis.ticks.forEach((label, i) => {
      part(root, `tick-${i}`).textContent = label;
    });
    for (const sample of SAMPLES) {
      part(root, `chip-${sample.key}`).style.left = `${(axis.at(sample.hex) * 100).toFixed(2)}%`;
      part(root, `value-${sample.key}`).textContent = axis.read(sample.hex);
    }
    note.textContent = axis.note;
  };
  place(START);

  part(root, 'segmented').addEventListener('change', (event) => place((event as CustomEvent<string>).detail));
}
