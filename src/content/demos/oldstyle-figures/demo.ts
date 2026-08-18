import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Checked against the file this site loads: Source Serif 4 Variable answers `frac`
 * and `pnum` but does nothing at all for `onum`, so `font-variant-numeric:
 * oldstyle-nums` here would be silence rather than a demonstration. The oldstyle
 * set is therefore modelled from the face's own measured metrics, at 100 px: digit
 * height 66, x-height 50, so a hanging numeral is dropped by 0.16em (which lands its
 * top on the x-height and its tail below the baseline) and an x-height numeral is
 * scaled by 50/66. The rising pair, 6 and 8, is drawn at digit height in both sets,
 * so it is left alone.
 *
 * Transforms move the drawing without touching the advance, so both settings keep
 * the lining widths. A real oldstyle set brings its own, narrower ones; the heights
 * are what this term is about and those are honest here.
 */
const FACE = "'Source Serif 4 Variable', Georgia, serif";
const SIZE = 30;
/** Measured off the loaded face: x-height and digit height as fractions of the em. */
const X_HEIGHT = 0.5;
const DIGIT = 0.66;
const DROP = DIGIT - X_HEIGHT;

const HANGING = '34579';
const RISING = '68';

type Mode = 'lining' | 'oldstyle';

const IS_MODE = (value: string): value is Mode => value === 'lining' || value === 'oldstyle';

const READS: Record<Mode, string> = {
  lining: 'lining: every numeral at cap height',
  oldstyle: 'oldstyle: three heights, one of them below the baseline',
};

function digit(ch: string, mode: Mode): string {
  if (mode === 'lining' || RISING.includes(ch)) return `<span style="display: inline-block">${ch}</span>`;
  const style = HANGING.includes(ch)
    ? `transform: translateY(${DROP}em)`
    : `transform: scale(${(X_HEIGHT / DIGIT).toFixed(3)}); transform-origin: 50% 100%`;
  return `<span style="display: inline-block; ${style}">${ch}</span>`;
}

const setNumerals = (text: string, mode: Mode): string => [...text].map((ch) => digit(ch, mode)).join('');

/**
 * A rule running out from the end of the line, thick enough that the stage reads it
 * as a box rather than as a hairline. They start after the last numeral rather than
 * crossing the words, so the heights are sighted along rather than struck through.
 */
function rule(name: string, height: number, color: string, dashed = false): string {
  const paint = dashed ? `border-top: 2px dashed ${color}` : `background: ${color}`;
  return `<span data-part="${name}" style="position: absolute; left: 10px; right: 0; bottom: ${height}em; height: 2px; ${paint}"></span>`;
}

/**
 * Oldstyle figures specimen: one sentence of running prose set with lining numerals
 * and then with oldstyle ones, the x-height and digit-height rules drawn across the
 * line so the change is a change in height rather than an impression. The row of ten
 * numerals underneath says which digits sit, which rise, and which hang.
 *
 * The subject is one number in the sentence, the narrowest thing the term names: the
 * numerals, not the sentence and not the specimen. The picker, the digit row and the
 * rules are the demo's own instrumentation and sit in the context register (SPEC §5).
 * Lining is the counter-example the subject itself passes through, so the honest
 * condition is declared in `data-pose` and the specimen mounts oldstyle (SPEC §6).
 *
 * A transform moves no advance, so switching the setting moves nothing on the page
 * either (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">figure style</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="oldstyle">
            <button class="sp-segment" data-part="seg-lining" value="lining">lining</button>
            <button class="sp-segment" data-part="seg-oldstyle" value="oldstyle">oldstyle</button>
          </sp-segmented>
        </div>
        <div style="display: flex; align-items: baseline; height: 62px; margin-top: 6px; font-size: ${SIZE}px">
          <p data-part="sentence" style="margin: 0; font-family: ${FACE}; font-size: ${SIZE}px; line-height: 1; white-space: nowrap">
            <span>In the winter of </span><span data-part="year" data-subject data-pose="[data-figures=oldstyle]"
              data-figures="oldstyle">${setNumerals('1867', 'oldstyle')}</span>
          </p>
          <i class="sp-context" data-part="rules" style="position: relative; flex: 1 1 auto; height: 0; font-size: ${SIZE}px">
            ${rule('rule-cap', DIGIT, 'color-mix(in oklab, var(--sp-accent) 60%, transparent)')}
            ${rule('rule-x', X_HEIGHT, 'color-mix(in oklab, var(--sp-accent) 60%, transparent)')}
            ${rule('rule-base', 0, 'color-mix(in oklab, var(--sp-ink) 26%, transparent)', true)}
          </i>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 4px; height: 40px">
          <span data-part="set" data-figures="oldstyle"
                style="font-family: ${FACE}; font-size: 22px; letter-spacing: 0.06em">${setNumerals('0123456789', 'oldstyle')}</span>
          <span class="sp-label">rules: digit height, x-height, baseline</span>
        </div>
        <div class="sp-row sp-context" style="margin-top: 6px; height: 26px">
          <span class="sp-chip" data-part="readout" style="cursor: default">${READS.oldstyle}</span>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 6px">
          Neither face here carries an oldstyle set, so the heights are modelled: the hanging numerals
          are dropped by the difference between the two rules. The widths stay the lining ones.
        </p>
      </div>
    </div>
  `;

  const year = part(root, 'year');
  const set = part(root, 'set');
  const readout = part(root, 'readout');

  part(root, 'segmented').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    if (!IS_MODE(value)) return;
    year.dataset.figures = value;
    year.innerHTML = setNumerals('1867', value);
    set.dataset.figures = value;
    set.innerHTML = setNumerals('0123456789', value);
    readout.textContent = READS[value];
  });
}
