import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * The face the page asked for and the one it got, as local stacks: a specimen
 * about which drawing stands in for which cannot be set in the kit's single
 * sans (SPEC §5). They were picked for a wide x-height gap, because that is the
 * mismatch `size-adjust` exists to close.
 */
const WEB = "Verdana, 'DejaVu Sans', 'Liberation Sans', sans-serif";
const FALLBACK = "'Times New Roman', 'Liberation Serif', 'Nimbus Roman', serif";
const SAMPLE = 'Handgloves 0123';
const SIZE = 30;
const COLUMN = 406;
const LINE = 54;
/** Big enough that one x-height reads back with useful precision. */
const PROBE = 200;

const rule = (offset: string, style: string) =>
  `<span style="position: absolute; left: 0; bottom: ${offset}; width: ${COLUMN}px; height: 0; border-top: ${style}"></span>`;

/**
 * The band from the baseline to the target x-height, set in the face that owns
 * it: `1ex` resolves against the element's own font, so the web font's metric is
 * drawn on a line the web font is not setting. Negative z-index puts it behind
 * the glyphs inside the stacking context the line establishes.
 */
const band = () =>
  `<span style="position: absolute; left: 0; bottom: 0; z-index: -1; width: ${COLUMN}px; height: 1ex;
     background: var(--sp-accent-soft); font-family: ${WEB}; font-size: ${SIZE}px"></span>`;

const probe = (name: string, family: string) =>
  `<span data-part="probe-${name}" style="position: absolute; left: -9999px; display: inline-block; width: 0;
     height: 1ex; font-family: ${family}; font-size: ${PROBE}px"></span>`;

/**
 * Fallback font specimen: the same line set twice, once in the face the page
 * asked for and once in the stand-in it fell through to. Both sit on a tinted
 * band that is the web font's own x-height, and the stand-in's lowercase falls
 * short of the top of it. A control in the scenery applies the `size-adjust`
 * that closes the gap, and the letters grow into the band they were rattling in.
 *
 * The band and the rules are the fonts' own metrics rather than the demo's
 * guess: each is a box anchored to the baseline by inline layout and sized by
 * `1ex`, which resolves against whichever face that element is set in. The band
 * on the stand-in's line therefore carries the web font's size, so it holds
 * still while the line under it is scaled.
 *
 * The one measurement is taken at mount, off two offscreen probes, in the state
 * it describes: how much bigger the stand-in has to be set to reach the same
 * x-height. No read follows a style write (SPEC §5).
 *
 * The subject is the fallback line. The term names the face that actually shows
 * up, and the narrowest thing on stage that is one is the run of text it sets;
 * the reference line above it, the readout, and the control are scenery. Tuned
 * or not, the line is still the stand-in, so there is no dishonest state here to
 * keep identify out of.
 *
 * Both lines are fixed boxes that clip, so a stand-in set a quarter larger
 * cannot move the caption under it, and both readings are written short enough
 * to hold the readout's single line, so neither state pushes the caption down
 * (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-axis="Metrics" data-part="segmented" data-value="off">
            <button class="sp-segment" data-part="seg-declared" value="off">as declared</button>
            <button class="sp-segment" data-part="seg-tuned" value="on">size-adjust</button>
          </sp-segmented>
        </div>
        <div class="sp-row sp-context" style="margin-top: 12px">
          <span class="sp-label">the face the page asked for</span>
        </div>
        <div class="sp-context" data-part="line-web"
             style="position: relative; z-index: 0; height: ${LINE}px; width: ${COLUMN}px; overflow: hidden;
                    white-space: nowrap; font-family: ${WEB}; font-size: ${SIZE}px; line-height: ${LINE}px">
          <span style="position: relative; display: inline-block; width: 0; height: 0; vertical-align: baseline">
            ${band()}
            ${rule('0', '1px solid var(--sp-line)')}
          </span>${SAMPLE}
        </div>
        <div class="sp-row sp-context" style="margin-top: 6px">
          <span class="sp-label">the face it fell through to</span>
        </div>
        <div data-part="fallback" data-subject data-tuned="off"
             style="position: relative; z-index: 0; height: ${LINE}px; width: ${COLUMN}px; overflow: hidden;
                    white-space: nowrap; font-family: ${FALLBACK}; font-size: ${SIZE}px; line-height: ${LINE}px">
          <span data-part="glyphs" style="font-size: ${SIZE}px">
            <span style="position: relative; display: inline-block; width: 0; height: 0; vertical-align: baseline">
              ${band()}
              ${rule('0', '1px solid var(--sp-line)')}
              ${rule('1ex', '1px dashed var(--sp-accent)')}
            </span>${SAMPLE}
          </span>
        </div>
        <div class="sp-row sp-context" style="height: 22px; margin-top: 4px">
          <span class="sp-text" data-part="readout"></span>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 6px">
          The tint is the x-height the real face would have brought, and the dashed rule is the one the
          stand-in brings. Closing that gap is arithmetic, not taste, and it is what stops a swap moving the page.
        </p>
        ${probe('web', WEB)}${probe('fallback', FALLBACK)}
      </div>
    </div>
  `;

  const line = part(root, 'fallback');
  const glyphs = part(root, 'glyphs');
  const readout = part(root, 'readout');

  const exOf = (name: string) => part(root, `probe-${name}`).getBoundingClientRect().height / PROBE;
  const factor = exOf('web') / exOf('fallback');
  const tuned = SIZE * factor;
  const percent = Math.round(factor * 100);

  const apply = (value: string) => {
    const on = value === 'on';
    line.dataset.tuned = on ? 'on' : 'off';
    glyphs.style.fontSize = `${(on ? tuned : SIZE).toFixed(1)}px`;
    readout.textContent = on
      ? `size-adjust: ${percent}% draws ${SIZE}px as ${tuned.toFixed(1)}px: x-heights agree.`
      : `Both are set at ${SIZE}px, and the stand-in draws smaller.`;
  };

  apply('off');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
