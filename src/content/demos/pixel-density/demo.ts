import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The mark is 11 CSS pixels square, magnified so one device pixel is a visible block. */
const CSS_PX = 11;
const BOX = 132;

const NOTES: Record<string, string> = {
  '1': 'Ratio 1: eleven CSS pixels across, eleven device pixels across. One sample each, and the stair steps are the shape.',
  '2': 'Ratio 2: the same eleven CSS pixel box, painted with twenty two device pixels. The box did not grow, the samples did.',
  '3': 'Ratio 3: thirty three device pixels in the same box. A 1x file stretched over that is the softness people notice.',
};

/**
 * A right pointing play mark punched out of a disc. Both a curve and two diagonals, which
 * are the edges a coarse sampling grid mangles first.
 */
function inMark(u: number, v: number): boolean {
  const dx = u - 0.5;
  const dy = v - 0.5;
  if (dx * dx + dy * dy > 0.4 * 0.4) return false;
  if (u < 0.4 || u > 0.7) return true;
  const half = 0.22 * (1 - (u - 0.4) / 0.3);
  return Math.abs(dy) > half;
}

/**
 * The mark rasterized at `n` samples per side, emitted as one block per contiguous run so
 * a 33 by 33 grid costs rows of rectangles rather than a thousand elements. Every edge
 * lands on a sample boundary, which is what makes this a raster rather than a drawing.
 */
function raster(n: number): string {
  const cell = BOX / n;
  const blocks: string[] = [];
  for (let row = 0; row < n; row++) {
    const v = (row + 0.5) / n;
    let start = -1;
    for (let col = 0; col <= n; col++) {
      const on = col < n && inMark((col + 0.5) / n, v);
      if (on && start < 0) start = col;
      if (!on && start >= 0) {
        blocks.push(
          `<span style="position: absolute; left: ${start * cell}px; top: ${row * cell}px; width: ${(col - start) * cell}px; height: ${cell}px; background: var(--sp-ink)"></span>`,
        );
        start = -1;
      }
    }
  }
  return blocks.join('');
}

/** The sampling grid, translucent so it reads over the ink as well as over the plate. */
const RULE = 'color-mix(in srgb, var(--sp-muted) 38%, transparent)';
const GRID = `repeating-linear-gradient(to right, ${RULE} 0 1px, transparent 1px var(--sp-cell)),
              repeating-linear-gradient(to bottom, ${RULE} 0 1px, transparent 1px var(--sp-cell))`;

const plate = (attrs: string) => `
  <div ${attrs} style="position: relative; width: ${BOX}px; height: ${BOX}px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 4px; overflow: hidden">
    <div data-part="ink" style="position: absolute; inset: 0"></div>
    <span aria-hidden="true" style="position: absolute; inset: 0; background-image: ${GRID}"></span>
  </div>`;

/**
 * Pixel density specimen: one mark rasterized at three device pixel ratios, beside a fixed
 * 1x copy of itself, over a magnified grid where one cell is one device pixel.
 *
 * The subject is the plate whose density changes, not the pair: the term names what the
 * screen does to one raster, and the 1x copy is the reference it is read against. That
 * reference stays out of the context register for the reason thumb zone's legend does:
 * a comparison repainted into different colours from the subject would not be a
 * comparison. Both plates draw their blocks in `--sp-ink` rather than the accent so the
 * two halves are pigment-identical and only the sampling differs.
 *
 * The CSS box is a constant, stated once and never written again. That is the whole claim:
 * density buys samples, never room, so nothing on stage may change size when the ratio does.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Device pixel ratio</span>
          <sp-segmented class="sp-segmented" data-part="switcher" data-value="1">
            <button class="sp-segment" type="button" data-part="seg-1x" value="1">1x</button>
            <button class="sp-segment" type="button" data-part="seg-2x" value="2">2x</button>
            <button class="sp-segment" type="button" data-part="seg-3x" value="3">3x</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px 14px">
          <div style="display: flex; gap: 24px">
            <div class="sp-stack sp-context" style="gap: 6px; align-items: center">
              <span class="sp-label">shipped at 1x</span>
              ${plate('data-part="reference"')}
            </div>
            <div class="sp-stack" style="gap: 6px; align-items: center">
              <span class="sp-label" data-part="subject-label">shipped at 1x</span>
              ${plate('data-part="plate" data-subject data-dpr="1"')}
            </div>
          </div>
          <span class="sp-label sp-context">one cell is one device pixel</span>
          <span class="sp-text sp-context" data-part="readout" style="height: 42px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const reference = part(root, 'reference');
  const plateEl = part(root, 'plate');
  const label = part(root, 'subject-label');
  const readout = part(root, 'readout');

  const draw = (host: HTMLElement, ratio: number) => {
    host.style.setProperty('--sp-cell', `${BOX / (CSS_PX * ratio)}px`);
    part(host, 'ink').innerHTML = raster(CSS_PX * ratio);
  };

  const apply = (value: string) => {
    const note = NOTES[value];
    const ratio = Number(value);
    if (!note || !ratio) return;
    plateEl.dataset.dpr = value;
    label.textContent = `shipped at ${value}x`;
    readout.textContent = note;
    draw(plateEl, ratio);
  };

  // Each segment names a ratio, so a scripted step lands on that ratio rather than
  // stepping to whichever one comes next (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  draw(reference, 1);
  apply('1');
}
