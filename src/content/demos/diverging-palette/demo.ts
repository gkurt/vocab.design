import { part, partsOf } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Monthly temperature anomaly in degrees, which is a quantity with a real zero. */
const VALUES = [-5.2, -3.4, -1.1, 0.6, 2.3, 4.1, 6.2, 7.4, 5, 1.8, -2.6, -4.8];
const SPAN = 8;
const HEIGHT = 46;

/** Where the neutral is put. One is the value the data actually turns at; the other is not. */
const CENTRES: Record<string, number> = { zero: 0, offset: 4 };
const NOTES: Record<string, string> = {
  zero: 'The join sits on zero, so one arm means colder than normal and the other warmer, and distance out means how much.',
  offset:
    'The join has been dragged to +4. Four warm months are now painted in the cool arm, and only the colour moved: the bars are unchanged.',
};

const START = 'zero';

/** Cool arm, neutral, warm arm. Both arms leave the same pale middle, in opposite hues. */
const colorAt = (value: number, centre: number) => {
  const t = Math.max(-1, Math.min(1, (value - centre) / SPAN));
  const away = Math.abs(t);
  return `oklch(${(0.93 - 0.42 * away).toFixed(3)} ${(0.005 + 0.135 * away).toFixed(3)} ${t < 0 ? 248 : 28})`;
};

/** The palette itself, drawn as the band the bars are read against. */
const rampFor = (centre: number) => {
  const stops = [];
  for (let i = 0; i <= 10; i++) {
    const value = -SPAN + (i / 10) * SPAN * 2;
    stops.push(`${colorAt(value, centre)} ${i * 10}%`);
  }
  return `linear-gradient(90deg, ${stops.join(', ')})`;
};

const signed = (value: number) => (value > 0 ? `+${value}` : String(value));

/**
 * Diverging palette specimen: a year of temperature anomalies as bars above and below a
 * zero axis, coloured from a two-armed palette whose neutral is drawn on the band beneath
 * them. The control moves the neutral off zero, which repaints months that were warmer than
 * normal in the cool arm while their bars stay exactly where they were.
 *
 * The subject is the scale with its bars, the narrowest element that holds the encoding.
 * The control, the axis caption, and the note are scenery (SPEC §5). The mis-centred state
 * is one the subject itself passes through, so the honest condition is declared in
 * `data-pose` and the mount state satisfies it: identify refuses to ring a palette whose
 * neutral is not on the value it claims (SPEC §6).
 *
 * Every bar keeps its geometry in both states and the note holds a fixed height, so moving
 * the neutral repaints and moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const centre = CENTRES[START] ?? 0;

  const bars = VALUES.map((value, i) => {
    const size = Math.round((Math.abs(value) / SPAN) * HEIGHT);
    const up = value >= 0;
    const edge = up ? 'bottom: 50%; border-radius: 3px 3px 0 0' : 'top: 50%; border-radius: 0 0 3px 3px';
    return `
      <span style="flex: 1 1 0; position: relative">
        <span class="sp-swatch" data-part="bar" data-month="${i}" data-sign="${up ? 'up' : 'down'}"
              style="position: absolute; left: 0; right: 0; ${edge}; height: ${size}px; --sp-swatch: ${colorAt(value, centre)}"></span>
      </span>`;
  }).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 420px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-axis="Neutral at" data-term="zero" data-part="segmented" data-value="${START}">
            <button class="sp-segment" data-part="seg-zero" value="zero">0</button>
            <button class="sp-segment" data-part="seg-offset" value="offset">+4</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" data-part="scale" data-subject data-pose="[data-centre=zero]" data-centre="${START}"
             style="margin-top: 10px; padding: 12px">
          <div class="sp-row" style="gap: 8px; align-items: stretch">
            <div class="sp-stack" style="flex: 0 0 24px; height: ${HEIGHT * 2}px; justify-content: space-between; gap: 0">
              <span class="sp-label" style="font-size: 9px">+8</span>
              <span class="sp-label" style="font-size: 9px">0</span>
              <span class="sp-label" style="font-size: 9px">-8</span>
            </div>
            <div data-part="chart" style="position: relative; flex: 1 1 auto; display: flex; gap: 6px; height: ${HEIGHT * 2}px">
              <span style="position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: var(--sp-line)"></span>
              ${bars}
            </div>
          </div>

          <div style="position: relative; margin: 10px 0 0 32px">
            <div data-part="ramp" style="height: 14px; border-radius: 4px; background: ${rampFor(centre)}"></div>
            <span data-part="pin" style="position: absolute; top: -3px; bottom: -3px; width: 2px; border-radius: 1px;
                  background: var(--sp-ink); left: 50%; translate: -1px 0"></span>
            <span class="sp-label" data-part="marker" data-at="${centre}"
                  style="position: absolute; top: 15px; left: 50%; translate: -50% 0; color: var(--sp-ink); font-size: 10px">0</span>
          </div>
          <div class="sp-row sp-row--between" style="margin: 16px 0 0 32px">
            <span class="sp-label" style="font-size: 10px">colder</span>
            <span class="sp-label" style="font-size: 10px">warmer</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="note" data-centre="${START}"
           style="margin: 10px 0 0; height: 34px; font-size: 11px">${NOTES[START]}</p>
      </div>
    </div>
  `;

  const scale = part(root, 'scale');
  const ramp = part(root, 'ramp');
  const pin = part(root, 'pin');
  const marker = part(root, 'marker');
  const note = part(root, 'note');
  const barEls = partsOf(root, 'bar');

  const place = (name: string) => {
    const at = CENTRES[name];
    if (at === undefined) return;
    scale.dataset.centre = name;
    ramp.style.background = rampFor(at);
    const pos = `${((at + SPAN) / (SPAN * 2)) * 100}%`;
    pin.style.left = pos;
    marker.style.left = pos;
    marker.dataset.at = String(at);
    marker.textContent = signed(at);
    barEls.forEach((bar, i) => {
      const value = VALUES[i];
      if (value !== undefined) bar.style.setProperty('--sp-swatch', colorAt(value, at));
    });
    note.dataset.centre = name;
    note.textContent = NOTES[name] ?? '';
  };
  place(START);

  part(root, 'segmented').addEventListener('change', (event) => place((event as CustomEvent<string>).detail));
}
