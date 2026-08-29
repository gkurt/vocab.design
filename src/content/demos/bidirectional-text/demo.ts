import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Hebrew rather than Arabic, checked in the browser: both render here, and Hebrew
 * needs no contextual shaping, so the specimen is about ordering rather than about
 * whether the machine had a shaping engine. The sentence is
 * "support for CSS Grid was added in 2017", which is four directional runs: two
 * Hebrew, one Latin, one numeric, with a neutral hyphen at each boundary, where
 * the algorithm's sharp edges actually are.
 */
type Run = { index: number; text: string; dir: 'rtl' | 'ltr' };

const RUNS: Run[] = [
  { index: 1, text: 'התמיכה ב-', dir: 'rtl' },
  { index: 2, text: 'CSS Grid', dir: 'ltr' },
  { index: 3, text: ' נוספה ב-', dir: 'rtl' },
  { index: 4, text: '2017', dir: 'ltr' },
];

const BASES = {
  rtl: { dir: 'rtl', read: 'dir="rtl": each run keeps its direction' },
  ltr: { dir: 'ltr', read: 'no dir: the runs land in typing order' },
} as const;

type Base = keyof typeof BASES;
const IS_BASE = (value: string): value is Base => value in BASES;

/** Room for the sentence at its tallest, so a pick moves nothing below it (SPEC §5). */
const LINE = 40;

/**
 * Bidirectional text specimen: one Hebrew sentence containing a Latin run and a
 * number, set twice. With the base direction declared, the algorithm orders the
 * runs right to left while each run keeps its own internal order. With it left
 * off, the paragraph inherits the page's direction and the runs come out in the
 * order they were typed, which is the failure everyone has seen: the year at the
 * wrong end of the line.
 *
 * The chips above the sentence are the memory order, numbered, and they never
 * move. The readout under it is the visual order, read off the live layout: the
 * left-to-right sequence of run numbers, measured after the direction is set
 * (a `dir` change is not a transitioned property, so the read is honest).
 *
 * The subject is the Latin run, the run whose direction differs from the text
 * around it, given its own element (SPEC §5). With the base direction left
 * undeclared it stops being that run, so the honest condition is declared in
 * `data-pose` and the specimen mounts with `dir="rtl"` (SPEC §6). The chips, the
 * readout and the caption are the demo's own instrumentation.
 */
export function mount(root: HTMLElement): void {
  const chip = ({ index, text, dir }: Run) => `
    <span class="sp-chip" data-part="chip-${index}" style="cursor: default; gap: 5px">
      <span style="color: var(--sp-muted); font-variant-numeric: tabular-nums">${index}</span>
      <span dir="${dir}">${text}</span>
    </span>`;

  const run = ({ index, text }: Run) =>
    `<span data-part="run-${index}"${index === 2 ? ' data-subject data-base="rtl" data-pose="[data-base=rtl]"' : ''}>${text}</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 460px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Base direction" data-term="rtl" data-part="segmented" data-value="rtl">
            <button class="sp-segment" data-part="seg-rtl" value="rtl">dir="rtl"</button>
            <button class="sp-segment" data-part="seg-ltr" value="ltr">not declared</button>
          </sp-segmented>
        </div>
        <span class="sp-label sp-context" style="display: block; margin-top: 10px">the order it was typed</span>
        <div class="sp-row sp-row--wrap sp-context" data-part="memory" style="gap: 6px; margin-top: 4px">
          ${RUNS.map(chip).join('')}
        </div>
        <div style="height: ${LINE}px; margin-top: 12px">
          <p data-part="sentence" dir="rtl" data-base="rtl"
             style="margin: 0; font-size: 21px; line-height: 1.4">${RUNS.map(run).join('')}</p>
        </div>
        <div class="sp-row sp-context" style="height: 30px">
          <span class="sp-chip" data-part="order" style="cursor: default; font-variant-numeric: tabular-nums"></span>
          <span class="sp-chip" data-part="readout" style="cursor: default">${BASES.rtl.read}</span>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 6px">
          Four runs: two Hebrew, one Latin, one numeric. The characters never move, only the sequence they
          are drawn in, and the hyphen at each boundary has no direction of its own to argue with.
        </p>
      </div>
    </div>
  `;

  const sentence = part(root, 'sentence');
  const subject = part(root, 'run-2');
  const order = part(root, 'order');
  const readout = part(root, 'readout');
  const runs = RUNS.map(({ index }) => [index, part(root, `run-${index}`)] as const);

  const apply = (value: string) => {
    if (!IS_BASE(value)) return;
    sentence.dir = BASES[value].dir;
    sentence.dataset.base = value;
    subject.dataset.base = value;
    readout.textContent = BASES[value].read;
    /* The visual order, read off the layout the browser just produced. */
    const seq = runs
      .map(([index, el]) => [index, el.getBoundingClientRect().left] as const)
      .sort((a, b) => a[1] - b[1])
      .map(([index]) => index);
    order.dataset.seq = seq.join('-');
    order.textContent = `left to right: ${seq.join(' · ')}`;
  };

  apply('rtl');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
