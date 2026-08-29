import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The two ends of every mix. Far apart in hue, so the space argument has something to say. */
const A = '#1D63D2';
const B = '#F2B23A';

/** Nine mixtures, so the strip reads as a walk between the ends rather than as a pair. */
const RATIOS = [10, 20, 30, 40, 50, 60, 70, 80, 90];

const NOTES: Record<string, string> = {
  srgb: 'In srgb the raw channel numbers are interpolated, so a blue and an amber meet in the middle as mud.',
  oklab: 'In oklab the walk is a straight line through a perceptual space, so the midpoints hold an even lightness.',
  oklch: 'In oklch the walk goes around the hue circle rather than across it, so the middle stays saturated.',
};

const START = 'srgb';

const mix = (space: string, pct: number) => `color-mix(in ${space}, ${A} ${pct}%, ${B})`;

/**
 * color-mix() specimen: the same two colours mixed at the same nine ratios, with the
 * interpolation space chosen as an absolute state. Nothing about the ends or the
 * percentages changes; only the space the walk happens in does, and the middle of the
 * strip is where that is legible.
 *
 * The subject is the strip of mixtures, not the window: the two end swatches are the
 * arguments rather than the result, so they stay in the context register with the space
 * control. Every cell is a fixed share of a fixed row and the note is a fixed height, so
 * changing space repaints and moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const cells = RATIOS.map(
    (pct) => `
      <span class="sp-swatch" data-part="cell-${pct}" style="flex: 1 1 0; height: 72px; border-radius: 0; --sp-swatch: ${mix(START, pct)}"></span>`,
  ).join('');

  const ticks = RATIOS.map((pct) => `<span class="sp-label" style="flex: 1 1 0; text-align: center; font-size: 10px">${pct}</span>`).join(
    '',
  );

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Space" data-part="segmented" data-value="${START}">
            <button class="sp-segment" data-part="seg-srgb" value="srgb">srgb</button>
            <button class="sp-segment" data-part="seg-oklab" value="oklab">oklab</button>
            <button class="sp-segment" data-part="seg-oklch" value="oklch">oklch</button>
          </sp-segmented>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 12px">
          <span class="sp-row" style="gap: 6px">
            <span class="sp-swatch" style="width: 16px; height: 16px; --sp-swatch: ${A}"></span>
            <span class="sp-text" style="font-size: 12px">${A}</span>
          </span>
          <span class="sp-row" style="gap: 6px">
            <span class="sp-text" style="font-size: 12px">${B}</span>
            <span class="sp-swatch" style="width: 16px; height: 16px; --sp-swatch: ${B}"></span>
          </span>
        </div>

        <div data-part="strip" data-subject data-space="${START}"
             style="display: flex; margin-top: 8px; border-radius: var(--sp-radius); overflow: hidden">${cells}</div>
        <div class="sp-row sp-context" style="gap: 0; margin-top: 4px">${ticks}</div>

        <p class="sp-text sp-context" data-stage-verdict data-part="note" style="margin: 10px 0 0; min-height: 40px">${NOTES[START]}</p>
      </div>
    </div>
  `;

  const strip = part(root, 'strip');
  const note = part(root, 'note');

  part(root, 'segmented').addEventListener('change', (event) => {
    const space = (event as CustomEvent<string>).detail;
    strip.dataset.space = space;
    for (const pct of RATIOS) part(root, `cell-${pct}`).style.setProperty('--sp-swatch', mix(space, pct));
    note.textContent = NOTES[space] ?? '';
  });
}
