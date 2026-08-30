import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import { localSize } from '#src/kit/measure.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/*
 * The kit's own sans, because half-leading is not about letterform: it is about
 * the box a line of interface text sits in, and that is the face this site's
 * interface text is set in.
 */
const FACE = "'Geist Variable', ui-sans-serif, system-ui, sans-serif";
const WORD = 'Handgloves';
const SIZE = 34;

/**
 * Every offered value has to leave a band the stage can read as a box rather
 * than as a hairline (SPEC §5), so the smallest one here clears the font's own
 * content area by several pixels instead of hugging it.
 */
const LEADINGS = ['1.8', '2.3', '2.8'] as const;
type Leading = (typeof LEADINGS)[number];
const IS_LEADING = (value: string): value is Leading => LEADINGS.includes(value as Leading);

/** Room for the tallest line box, so a pick moves nothing below it (SPEC §5). */
const ROW = Math.round(SIZE * 2.8) + 8;

/**
 * Half-leading specimen: one line of text with its line box drawn. The grey
 * block is the font's own content area, painted by the inline span's background,
 * which ignores line height entirely. The two accent strips above and below are
 * what is left of the line box once that content area is taken out, and they are
 * always equal, which is the whole term. The picker moves the line height and
 * both strips grow together.
 *
 * The content area is measured once, at mount, in the state it is mounted in
 * (AGENTS.md: a read never follows a style write). Every later band height is
 * arithmetic on that one reading, since a numeric line height times the font
 * size is the line box exactly, so no pick is ever followed by a measurement.
 *
 * The subject is the upper strip. Half-leading is one of the two halves and has
 * no element of its own in a text box, so the demo gives it one, sized to the
 * band's extent (SPEC §5); ringing the line would claim the term names the text.
 * Every offered line height leaves the band a real box, so the subject is the
 * term at every resting state and needs no `data-pose`.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const band = (name: string, edge: string, subject = '') => `
    <span data-part="${name}" ${subject} style="position: absolute; left: 0; right: 0; ${edge}: 0; height: 0;
          background: color-mix(in oklab, var(--sp-accent) 32%, transparent)"></span>`;

  const segment = (value: Leading) =>
    `<button class="sp-segment" data-part="seg-${value.replace('.', '-')}" value="${value}">${value}</button>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Line height" data-value="1.8">
            ${LEADINGS.map(segment).join('')}
          </sp-segmented>
        </div>
        <div style="display: flex; align-items: center; justify-content: center; height: ${ROW}px; margin-top: 4px">
          <span data-part="box" style="position: relative; display: inline-block">
            <span data-part="line" data-leading="1.8"
                  style="display: block; font-family: ${FACE}; font-size: ${SIZE}px; line-height: 1.8; white-space: nowrap">
              <span data-part="content" style="background: color-mix(in oklab, var(--sp-ink) 15%, transparent)">${WORD}</span>
            </span>
            ${band('band-top', 'top', 'data-subject')}
            ${band('band-bottom', 'bottom')}
          </span>
        </div>
        <div class="sp-row sp-row--between sp-context" style="height: 26px">
          <span class="sp-label" style="color: var(--sp-ink)">grey: content area</span>
          <span class="sp-chip" data-part="readout" style="cursor: default; font-variant-numeric: tabular-nums"></span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 6px">
          The leftover is halved, never appended: one half above the letters, one below.
        </p>
      </div>
    </div>
  `;

  const line = part(root, 'line');
  const content = part(root, 'content');
  const top = part(root, 'band-top');
  const bottom = part(root, 'band-bottom');
  const readout = part(root, 'readout');

  /* The one reading, taken on the mounted state and never repeated after a write. */
  let contentHeight = localSize(content).height;

  const draw = (value: Leading) => {
    const px = Math.max(0, Math.round((SIZE * Number(value) - contentHeight) / 2));
    top.style.height = `${px}px`;
    bottom.style.height = `${px}px`;
    readout.textContent = `${px}px above, ${px}px below`;
  };

  draw('1.8');
  /* The webfont may still be arriving, and the content area is its metric. */
  clock.setTimeout(() => {
    contentHeight = localSize(content).height;
    const value = line.dataset.leading;
    if (value && IS_LEADING(value)) draw(value);
  }, 400);

  part(root, 'segmented').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    if (!IS_LEADING(value)) return;
    line.dataset.leading = value;
    line.style.lineHeight = value;
    draw(value);
  });
}
