import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * A real oldstyle set, in a face that carries one. Vollkorn's default figures
 * ARE the oldstyle ones, which is the honest arrangement for a book face, so the
 * switch turns the lining set on rather than the oldstyle set off: `lnum` is the
 * feature the file has, and asking for `onum` here would be asking for something
 * that is already true.
 *
 * The two guides are the face's own answer as well. They are placed in `ex` and
 * `cap`, the units that mean the loaded font's x-height and cap height, so the
 * rules land where this file says they land rather than where a measurement of
 * some other file said.
 */
const FACE = "'Vollkorn', Georgia, serif";
const SIZE = 30;
/** A guide the stage can read is a box, never a hairline (SPEC §8). */
const RULE = 2;
/** The window's inner width, which the guides span. */
const SPAN = 404;

const YEAR = '1867';
const SET = '0123456789';

type Mode = 'lining' | 'oldstyle';

const IS_MODE = (value: string): value is Mode => value === 'lining' || value === 'oldstyle';

const VERDICT = {
  oldstyle: 'The 1 sits on the x-height rule, the 8 and the 6 rise past it, and the 7 hangs below the baseline.',
  lining: 'Every numeral is drawn to one height, and the number reads as capitals dropped into the sentence.',
} as const;

/**
 * Oldstyle figures specimen: one sentence of running prose set with the face's own
 * oldstyle numerals and then with its lining ones, the x-height and cap-height
 * rules drawn across the line so the change is a change in height rather than an
 * impression. The row of ten numerals underneath says which digits sit, which
 * rise, and which hang.
 *
 * The subject is one number in the sentence, the narrowest thing the term names: the
 * numerals, not the sentence and not the specimen. The picker, the digit row and the
 * rules are the demo's own instrumentation and sit in the context register (SPEC §5).
 * Lining is the counter-example the subject itself passes through, so the honest
 * condition is declared in `data-pose` and the specimen mounts oldstyle (SPEC §6).
 *
 * A real oldstyle set brings its own widths, so the number does change width here.
 * Nothing else can move with it: the guides hang off a carrier that sits before the
 * text on the same baseline, and the numeral row below is alone on its line (SPEC §5).
 *
 * Three lines of the site's own voice have gone from the window: a chip naming the set
 * ("oldstyle: three heights, one of them below the baseline"), a key to the guides
 * ("rules: digit height, x-height, baseline"), and a heading over the picker ("figure
 * style"), which the strip labels already.
 */
export function mount(root: HTMLElement): void {
  /**
   * A rule running across the window at one of the face's own heights, thick enough
   * that the stage reads it as a box rather than as a hairline. The words are
   * positioned, so they paint over the guides rather than under them: a rule at full
   * strength across a line of type reads as a strikethrough, not as a baseline grid.
   */
  const rule = (name: string, bottom: string, color: string, dashed = false) => {
    const paint = dashed ? `border-top: ${RULE}px dashed ${color}` : `background: ${color}`;
    return `<span data-part="${name}" style="position: absolute; left: 0; width: ${SPAN}px; height: ${RULE}px; ${bottom}; ${paint}"></span>`;
  };

  /* The carrier holds nothing in flow: any whitespace inside it would open a line
     box and take its baseline off the text's own, which is where the rules hang. It
     sits before the words, so a change in the number's width cannot move it. */
  const rules =
    rule('rule-cap', 'bottom: calc(0.7em - 1px); bottom: calc(1cap - 1px)', 'color-mix(in oklab, var(--sp-accent) 35%, transparent)') +
    rule('rule-x', 'bottom: calc(1ex - 1px)', 'color-mix(in oklab, var(--sp-accent) 35%, transparent)') +
    rule('rule-base', 'bottom: 0', 'color-mix(in oklab, var(--sp-ink) 22%, transparent)', true);

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="oldstyle" data-axis="Figure style" data-term="oldstyle">
          <button class="sp-segment" data-part="seg-lining" value="lining">lining</button>
          <button class="sp-segment" data-part="seg-oldstyle" value="oldstyle">oldstyle</button>
        </sp-segmented>
        <div style="display: flex; align-items: center; height: 62px; margin-top: 6px">
          <p data-part="sentence" style="margin: 0; font-family: ${FACE}; font-size: ${SIZE}px; line-height: 1; white-space: nowrap"
            ><i class="sp-context" data-part="rules" style="position: relative; display: inline-block; width: 0; height: 0; vertical-align: baseline">${rules}</i
            ><span style="position: relative">In the winter of </span><span data-part="year" data-subject data-pose="[data-figures=oldstyle]"
              data-figures="oldstyle" style="position: relative">${YEAR}</span></p>
        </div>
        <div class="sp-row sp-context" style="margin-top: 4px; height: 40px">
          <span data-part="set" data-figures="oldstyle"
                style="font-family: ${FACE}; font-size: 22px; letter-spacing: 0.06em">${SET}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 6px">${VERDICT.oldstyle}</p>
      </div>
    </div>
  `;

  const year = part(root, 'year');
  const set = part(root, 'set');
  const caption = part(root, 'caption');

  part(root, 'segmented').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    if (!IS_MODE(value)) return;
    for (const el of [year, set]) {
      el.dataset.figures = value;
      el.style.fontVariantNumeric = value === 'lining' ? 'lining-nums' : 'normal';
    }
    caption.textContent = VERDICT[value];
  });
}
