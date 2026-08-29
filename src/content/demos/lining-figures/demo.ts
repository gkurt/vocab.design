import { part, partsOf } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Checked in the browser against what this page renders. Georgia is one of the
 * few widely installed faces whose default figures are oldstyle and which also
 * carries a real `lnum` set, so both settings here are the font's own drawings
 * rather than a model: `lining-nums` raises every digit to cap height and
 * `oldstyle-nums` gives the three heights back. The kit's own sans has one
 * figure set and could not show the difference at all (SPEC §5), so the
 * specimen declares a local serif stack, named families first and generic last.
 */
const FACE = "Georgia, 'Liberation Serif', 'Nimbus Roman', 'DejaVu Serif', serif";
const SIZE = 34;
const WORD = 'MAY';
const YEAR = '1987';
const SET = '0123456789';

const MODES = {
  lining: {
    css: 'lining-nums',
    read: 'lining: one height, level with the capitals',
  },
  oldstyle: {
    css: 'oldstyle-nums',
    read: 'oldstyle: three heights, one of them below the baseline',
  },
} as const;

type Mode = keyof typeof MODES;

const IS_MODE = (value: string): value is Mode => value in MODES;

/**
 * A guide running out from the end of the line, 2px thick so the stage reads it
 * as a box rather than as a hairline (SPEC §8). Each is placed by the font's own
 * metric: the `cap` and `ex` units are written twice, an em approximation first
 * and the real unit second, so a browser that does not know them still draws the
 * ruling near enough to read.
 */
function guide(name: string, bottom: string, color: string): string {
  return `<span data-part="${name}" style="position: absolute; left: 12px; right: 0; ${bottom}; height: 2px; background: ${color}"></span>`;
}

/**
 * Lining figures specimen: a date set in capitals and numerals, with the font's
 * two figure sets under one picker and the cap height and baseline ruled out
 * beside it. On lining the numerals stop level with the cap rule and all four
 * sit on the baseline. On oldstyle the same four digits break into three
 * heights, and the 9 drops below the baseline rule entirely.
 *
 * Nothing is measured and nothing is modelled. The rules are hung off a
 * zero-height carrier whose bottom edge lands on the baseline by inline layout,
 * and the cap rule's offset is the font's own `cap` unit, so the ruling is the
 * face's answer rather than the demo's guess (SPEC §5, no read after a write).
 *
 * The subject is the numerals, the narrowest thing the term names: not the date
 * and not the specimen. Oldstyle is the counter-example the subject itself
 * passes through, so the honest condition is declared in `data-pose` and the
 * specimen mounts lining (SPEC §6). The picker, the digit row, the rules and
 * the readout are the demo's own instrumentation and sit in the context
 * register (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const figures = (name: string, text: string, attrs = '', extra = '') =>
    `<span data-part="${name}" data-figures="lining" ${attrs}
           style="font-variant-numeric: ${MODES.lining.css}; ${extra}">${text}</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="lining" data-axis="Figure style" data-term="lining">
            <button class="sp-segment" data-part="seg-lining" value="lining">lining</button>
            <button class="sp-segment" data-part="seg-oldstyle" value="oldstyle">oldstyle</button>
          </sp-segmented>
        </div>
        <div style="display: flex; align-items: baseline; height: 66px; margin-top: 6px">
          <p data-part="date" style="margin: 0; font-family: ${FACE}; font-size: ${SIZE}px; line-height: 1.2; white-space: nowrap">
            <span>${WORD}&#8202;</span>${figures('year', YEAR, 'data-subject data-pose="[data-figures=lining]"')}
          </p>
          <i class="sp-context" data-part="rules"
             style="position: relative; flex: 1 1 auto; height: 0; font-family: ${FACE}; font-size: ${SIZE}px">
            ${guide('rule-cap', 'bottom: 0.7em; bottom: 1cap', 'color-mix(in oklab, var(--sp-accent) 60%, transparent)')}
            ${guide('rule-base', 'bottom: 0', 'color-mix(in oklab, var(--sp-ink) 30%, transparent)')}
          </i>
        </div>
        <div class="sp-row sp-row--between sp-context" style="height: 40px">
          ${figures('set', SET, '', `font-family: ${FACE}; font-size: 22px; letter-spacing: 0.06em`)}
          <span class="sp-label">rules: cap height and baseline</span>
        </div>
        <div class="sp-row sp-context" style="height: 28px">
          <span class="sp-chip" data-part="readout" style="cursor: default">${MODES.lining.read}</span>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 6px">
          Both settings are the face's own drawings. Height is one decision and width is another: lining or
          oldstyle, tabular or proportional, and the two combine freely.
        </p>
      </div>
    </div>
  `;

  const readout = part(root, 'readout');

  part(root, 'segmented').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    if (!IS_MODE(value)) return;
    for (const sample of [...partsOf(root, 'year'), ...partsOf(root, 'set')]) {
      sample.dataset.figures = value;
      sample.style.fontVariantNumeric = MODES[value].css;
    }
    readout.textContent = MODES[value].read;
  });
}
