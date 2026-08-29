import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Measured in the browser before authoring, and this is the one term in its round
 * whose property really does render: `-webkit-font-smoothing: antialiased` against
 * `subpixel-antialiased` puts down about 11% less ink at 15px and 14% less at
 * 40px in the face this site loads. So the two sample lines are REAL, and the
 * weight difference a reader sees between them is the real one.
 *
 * What cannot be real is the magnification. A screenshot of this page records
 * finished pixels, and the subpixel stripes that produced them are below the
 * level any capture keeps, so the magnified edge is DRAWN: the same slanted stem
 * edge sampled per colour stripe (subpixel) or per whole pixel (greyscale), from
 * one coverage calculation. The caption says so.
 */
const COLS = 8;
const ROWS = 5;
const CELL = 19;
/** The stem's left and right edges in pixel units, and how far they lean per row. */
const EDGE = { left: 1.15, right: 4.5, lean: 0.24 };

type Mode = { key: string; label: string; css: string; read: string };

const MODES: Mode[] = [
  {
    key: 'subpixel',
    label: 'subpixel',
    css: 'subpixel-antialiased',
    read: 'subpixel-antialiased: each stripe shaded on its own',
  },
  {
    key: 'grayscale',
    label: 'antialiased',
    css: 'antialiased',
    read: 'antialiased: the whole pixel shaded grey',
  },
];

const SAMPLE = 'Handgloves';

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/** Ink over one span of a pixel row, as a fraction of that span's width. */
function coverage(from: number, to: number, row: number): number {
  const left = EDGE.left + EDGE.lean * row;
  const right = EDGE.right + EDGE.lean * row;
  const overlap = Math.min(to, right) - Math.max(from, left);
  return clamp(overlap / (to - from));
}

/**
 * Font smoothing specimen: the same line rendered at both settings for real, and
 * one letter's edge magnified so the two ways of shading an edge pixel can be
 * told apart.
 *
 * The subject is the magnified edge (SPEC §5), the thing the term names: not the
 * sample lines, which are the type the decision is applied to, and not the window.
 * Both modes are honest states of it, so no `data-pose` is needed. The samples,
 * the picker and the readout are the demo's own instrumentation and stay in the
 * context register.
 *
 * Nothing is measured after a write: every cell's colour is arithmetic on the
 * coverage, the patch is a fixed box, and the tag marking which sample is
 * magnified swaps visibility inside a slot of its own, so nothing moves (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const sample = (mode: Mode) => `
    <div class="sp-stack" data-part="sample-${mode.key}" style="gap: 2px">
      <span class="sp-row" style="gap: 6px; height: 16px">
        <span class="sp-label" style="white-space: nowrap">${mode.css}</span>
        <span class="sp-label" data-part="tag-${mode.key}" style="white-space: nowrap; color: var(--sp-accent)"
              ${mode.key === MODES[0]?.key ? '' : 'hidden'}>&#x2192; magnified</span>
      </span>
      <span style="font-size: 19px; line-height: 1.3; -webkit-font-smoothing: ${mode.css}">${SAMPLE}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Smoothing" data-value="subpixel">
            ${MODES.map((mode) => `<button class="sp-segment" data-part="seg-${mode.key}" value="${mode.key}">${mode.label}</button>`).join(
              '',
            )}
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 20px; margin-top: 12px; align-items: flex-start">
          <div class="sp-stack sp-context" style="gap: 12px; flex: 1 1 auto; min-width: 0">
            ${MODES.map(sample).join('')}
          </div>
          <div class="sp-stack" style="gap: 6px; flex: 0 0 auto; align-items: center">
            <div data-part="patch" data-subject data-mode="subpixel"
                 style="position: relative; width: ${COLS * CELL}px; height: ${ROWS * CELL}px;
                        background: #ffffff; border-radius: 3px; overflow: hidden"></div>
            <span class="sp-label sp-context" style="white-space: nowrap">one stem edge, magnified</span>
          </div>
        </div>
        <div class="sp-row sp-context" style="height: 30px; margin-top: 10px">
          <span class="sp-chip" data-part="readout" style="cursor: default; white-space: nowrap">${MODES[0]?.read ?? ''}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 4px">
          The two lines are real: greyscale genuinely lays down less ink on this machine. The magnified pixels
          are drawn, because a screenshot keeps no record of the colour stripes that made it.
        </p>
      </div>
    </div>
  `;

  const patch = part(root, 'patch');
  const readout = part(root, 'readout');

  const draw = (mode: Mode) => {
    const cells: string[] = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const stripes = [0, 1, 2].map((k) => coverage(col + k / 3, col + (k + 1) / 3, row));
        const mean = (stripes[0] ?? 0) + (stripes[1] ?? 0) + (stripes[2] ?? 0);
        const lit = mode.key === 'grayscale' ? [mean / 3, mean / 3, mean / 3] : stripes;
        // One square per pixel, painted the colour those three stripe intensities
        // add up to: white where nothing covers it, black where the stem does, and
        // a coloured fringe only where the stripes disagree.
        const rgb = lit.map((cover) => Math.round(255 * (1 - cover))).join(',');
        const edge = row === 2 && col === 1 ? ' data-part="pixel-edge"' : '';
        cells.push(`<span${edge} style="position: absolute; left: ${col * CELL}px; top: ${row * CELL}px;
          width: ${CELL}px; height: ${CELL}px; background: rgb(${rgb});
          box-shadow: inset 0 0 0 0.5px rgb(0 0 0 / 0.16)"></span>`);
      }
    }
    patch.innerHTML = cells.join('');
    patch.dataset.mode = mode.key;
    readout.textContent = mode.read;
    for (const other of MODES) flag(part(root, `tag-${other.key}`), 'hidden', other.key !== mode.key);
  };

  draw(MODES[0] as Mode);

  part(root, 'segmented').addEventListener('change', (event) => {
    const mode = MODES.find((m) => m.key === (event as CustomEvent<string>).detail);
    if (mode) draw(mode);
  });
}
