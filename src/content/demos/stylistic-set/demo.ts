import { flag, part, partsOf } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Checked in the browser against every face this site loads, and against the
 * system faces beside them: not one carries a stylistic set. `ss01` through
 * `ss12`, `salt` and `cv01` change nothing at all in Geist, Source Serif 4,
 * Georgia or Helvetica, which is the term's own trap (a tag the file does not
 * have fails silently) and would also be a specimen whose two states were
 * identical. So the alternates are DRAWN over the face's own glyphs, and the
 * caption says so: the switch stands for the substitution, the strokes stand
 * for the alternate drawings. Every one of the three is a real convention
 * (slashed zero, footed one, tailed l), and this site's own mono face already
 * draws all three by default, which is where they were taken from.
 */
const SIZE = 56;
/** A drawn stroke has to be a box the stage can read, not a hairline (SPEC §8). */
const STROKE = 3.5;

type Cell = { char: string; part: string; mark?: string };

/**
 * The five characters a code face's set is usually about: three the set redraws
 * and the two they get mistaken for, left exactly as the family drew them.
 *
 * Marks are placed against two things the demo never measures at runtime. Down: a
 * zero-height carrier sitting first in the cell, whose bottom edge inline layout
 * puts on the text baseline (the trick lining-figures rules its guides with), so
 * `bottom: 0` inside it is the baseline exactly. Across: em offsets from the
 * carrier, which sits at the cell's left edge, against this face's own advances
 * (0 is 0.66em wide, 1 is 0.38em, l is 0.27em, read off the loaded file).
 */
const CELLS: Cell[] = [
  {
    char: '0',
    part: 'zero',
    // The slash: one bar through the counter, leaning the way a slashed zero leans.
    mark: `left: calc(0.33em - ${STROKE / 2}px); bottom: 0.03em; width: ${STROKE}px; height: 0.62em;
           background: currentcolor; transform: rotate(22deg)`,
  },
  { char: 'O', part: 'oh' },
  {
    char: '1',
    part: 'one',
    // The foot: a bar on the baseline, spanning most of the digit's advance.
    mark: `left: 0.02em; bottom: 0; width: 0.34em; height: ${STROKE}px; background: currentcolor`,
  },
  {
    char: 'l',
    part: 'el',
    // The tail: the stem's bottom turning right and lifting, drawn as a rounded corner.
    mark: `left: 0.09em; bottom: 0; width: 0.23em; height: 0.115em;
           border-bottom: ${STROKE}px solid currentcolor; border-right: ${STROKE}px solid currentcolor;
           border-bottom-right-radius: 0.10em`,
  },
  { char: 'I', part: 'eye' },
];

const READ = {
  on: 'ss01 on: three drawings swapped as one group',
  off: 'ss01 off: the family’s own drawings',
} as const;

/**
 * Stylistic set specimen: five characters, one switch, three of them redrawn
 * together. The switch is absolute (0 and 1, the values the feature takes), and
 * what it demonstrates is the grouping: nothing here can be turned on one glyph
 * at a time, which is what makes a set a set rather than three requests.
 *
 * The subject is the glyph run the feature is applied to (SPEC §5): a set is
 * asked of a run of text, and the two characters it leaves alone are part of that
 * run. The off state is the counter-example the run itself passes through, so the
 * honest condition is declared in `data-pose` and the specimen mounts with the
 * set on (SPEC §6). The picker, the label and the caption are the demo's own
 * instrumentation and stay in the context register.
 *
 * Nothing is measured and nothing moves: the marks are absolutely positioned
 * inside their own cells, so switching the set cannot shift a neighbour (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const cell = ({ char, part: name, mark }: Cell) => `
    <span data-part="cell-${name}" style="position: relative; display: inline-block; line-height: 1">
      <i style="display: inline-block; width: 0; height: 0; vertical-align: baseline; position: relative">
        ${mark ? `<span data-part="mark-${name}" style="position: absolute; ${mark}"></span>` : ''}
      </i>${char}</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">font-feature-settings: "ss01"</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="on" data-axis="Value" data-term="on">
            <button class="sp-segment" data-part="seg-off" value="off">0</button>
            <button class="sp-segment" data-part="seg-on" value="on">1</button>
          </sp-segmented>
        </div>
        <span class="sp-label sp-context" style="display: block; margin-top: 12px">
          the five that get mistaken for each other
        </span>
        <div class="sp-row" data-part="run" data-subject data-ss="on" data-pose="[data-ss=on]"
             style="gap: 20px; align-items: baseline; height: 76px; font-size: ${SIZE}px">
          ${CELLS.map(cell).join('')}
        </div>
        <div class="sp-row sp-context" style="height: 30px">
          <span class="sp-chip" data-part="readout" style="cursor: default">${READ.on}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 4px">
          No face this site loads carries a stylistic set, so the slash, the foot and the tail are drawn on:
          the switch stands for the substitution. What is real is the grouping, and that the O and the I are
          left alone.
        </p>
      </div>
    </div>
  `;

  const run = part(root, 'run');
  const marks = partsOf(root, 'mark-zero').concat(partsOf(root, 'mark-one'), partsOf(root, 'mark-el'));
  const readout = part(root, 'readout');

  const apply = (value: string) => {
    if (value !== 'on' && value !== 'off') return;
    run.dataset.ss = value;
    for (const mark of marks) flag(mark, 'hidden', value === 'off');
    readout.textContent = READ[value];
  };

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
