import { localSize } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const SAMPLE = 'Cap height';
const SIZE = 40;
/** Generous leading, so the space the trim removes is a block rather than a hairline. */
const LEADING = 1.45;
/** Room for the untrimmed box at both settings, so a pick moves nothing below (SPEC §5). */
const ROW = Math.round(SIZE * LEADING) + 6;

/** What each pick cuts down to. Both are trims, so the subject is a trimmed box either way. */
const EDGES: Record<string, { edge: string }> = {
  cap: { edge: 'cap alphabetic' },
  ex: { edge: 'ex alphabetic' },
};

const SUPPORTED = typeof CSS !== 'undefined' && CSS.supports('text-box-trim', 'trim-both');

/**
 * Text box trim specimen: the same words in the same tinted box twice, once with
 * the font's own line box left intact and once trimmed. The tint is the box, so
 * the leftover space above the capitals and below the baseline is the visible
 * difference, and the readout gives it in pixels measured off the two boxes
 * rather than asserted.
 *
 * The subject is the trimmed box, which is what the term names. Both picks trim,
 * so the subject is the term at every resting state and needs no `data-pose`. The
 * untrimmed box above it is the reference, and it stays in the context register
 * with the labels, the readout and the caption.
 *
 * Both samples are `inline-block`: an inline box paints its background over the
 * font's content area and ignores the leading entirely, which would hide exactly
 * the space this specimen is about.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const box = (extra: string) => `display: inline-block; font-size: ${SIZE}px; line-height: ${LEADING}; font-weight: 600; ${extra}`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="text-box-edge" data-part="segmented" data-value="cap">
            <button class="sp-segment" data-part="seg-cap" value="cap">cap</button>
            <button class="sp-segment" data-part="seg-ex" value="ex">ex</button>
          </sp-segmented>
        </div>
        <div class="sp-row sp-context" style="gap: 12px; height: ${ROW}px; margin-top: 6px">
          <span class="sp-label" style="width: 84px">untrimmed</span>
          <span data-part="reference"
                style="${box('background: color-mix(in oklab, var(--sp-ink) 13%, transparent)')}">${SAMPLE}</span>
        </div>
        <div class="sp-row" style="gap: 12px; height: ${ROW}px">
          <span class="sp-label sp-context" style="width: 84px">trimmed</span>
          <span data-part="trimmed" data-subject data-edge="cap"
                style="${box('background: color-mix(in oklab, var(--sp-accent) 24%, transparent); text-box-trim: trim-both; text-box-edge: cap alphabetic')}">${SAMPLE}</span>
        </div>
        <div class="sp-row sp-row--between sp-context" data-part="readout" style="height: 18px; margin-top: 8px">
          <span class="sp-label" data-part="declaration" style="color: var(--sp-ink)"></span>
          <span class="sp-label" data-part="removed" style="font-variant-numeric: tabular-nums"></span>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 8px">
          The leftover is the font's own line box, not padding: removing it needed a property of its
          own, not a negative margin.
        </p>
      </div>
    </div>
  `;

  const reference = part(root, 'reference');
  const trimmed = part(root, 'trimmed');
  const declaration = part(root, 'declaration');
  const removed = part(root, 'removed');

  /**
   * Measured off the two boxes as they stand, never asserted: the amount depends on
   * the family's own ascent and descent, which no demo is entitled to guess.
   */
  const report = () => {
    if (!SUPPORTED) {
      removed.textContent = 'this browser has not shipped the property yet';
      return;
    }
    const gap = localSize(reference).height - localSize(trimmed).height;
    removed.textContent = `${Math.round(gap)}px of leftover removed`;
  };

  const apply = (value: string) => {
    const pick = EDGES[value];
    if (!pick) return;
    trimmed.dataset.edge = value;
    trimmed.style.setProperty('text-box-edge', pick.edge);
    declaration.textContent = `text-box: trim-both ${pick.edge}`;
    // A style write and a measurement never share a tick (AGENTS.md); the mount-state
    // reading below is the one that can be taken straight away.
    clock.setTimeout(report, 0);
  };

  apply('cap');
  report();
  // The webfont may still be arriving, and the leftover is a property of its metrics.
  clock.setTimeout(report, 400);
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
