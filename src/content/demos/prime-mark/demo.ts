import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * A serif, written as a local stack, because the whole term is the shape of one
 * small mark and the kit has one sans on purpose (SPEC §5). Named families
 * first, generic last.
 */
const FACE = "Georgia, 'Liberation Serif', 'Nimbus Roman', 'DejaVu Serif', serif";

const MARKS = {
  primes: {
    single: '′',
    double: '″',
    read: 'U+2032 prime, U+2033 double prime',
    note: 'A straight stroke leaning right, tapering to its foot. Nothing curls at either end. This is the mark a measurement takes.',
  },
  straight: {
    single: "'",
    double: '"',
    read: 'U+0027 apostrophe, U+0022 quotation mark',
    note: 'The typewriter had one upright tick doing the work of four marks, and the keyboard still has it.',
  },
  curly: {
    single: '’',
    double: '”',
    read: 'U+2019 and U+201D, the closing quotes',
    note: 'What autocorrect makes of a tick. Comma-shaped tails, curving the wrong way: quotation marks, not units.',
  },
} as const;

type Mode = keyof typeof MARKS;

const IS_MODE = (value: string): value is Mode => value in MARKS;

/** Room for the tallest setting, so a pick never moves the detail under it (SPEC §5). */
const LINE = 54;
const DETAIL = 104;

/**
 * Prime mark specimen: a height written as five feet ten inches, with the two
 * marks in it swapped between the three characters people reach for. The detail
 * beside it blows the foot mark up to a size where the difference is a shape
 * rather than a hunch: the prime leans and ends flat, the typewriter tick stands
 * upright, and the curly quote hooks over into a comma.
 *
 * The subject is the foot mark itself, which is the narrowest thing the term
 * names: not the measurement and not the line. Two of the three settings are
 * the mistake rather than the term, so the honest condition is declared in
 * `data-pose` and the specimen mounts on the primes (SPEC §6). The picker, the
 * detail and the notes are the demo's own instrumentation and stay in the
 * context register (SPEC §5).
 *
 * The characters swap in place, in boxes that are fixed at their widest, so a
 * pick moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">the mark used</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="primes">
            <button class="sp-segment" data-part="seg-primes" value="primes">primes</button>
            <button class="sp-segment" data-part="seg-straight" value="straight">straight</button>
            <button class="sp-segment" data-part="seg-curly" value="curly">curly</button>
          </sp-segmented>
        </div>
        <div style="display: flex; align-items: center; height: ${LINE}px; padding-left: 4px; margin-top: 4px">
          <span data-part="line" style="font-family: ${FACE}; font-size: 40px; line-height: 1.2; white-space: nowrap">5<span
            data-part="foot" data-subject data-marks="primes"
            data-pose="[data-marks=primes]">${MARKS.primes.single}</span> 10<span
            data-part="inch" data-marks="primes">${MARKS.primes.double}</span> tall</span>
        </div>
        <div class="sp-row sp-context" style="gap: 16px; align-items: flex-start; margin-top: 2px">
          <div data-part="detail" class="sp-surface"
               style="position: relative; flex: 0 0 auto; width: ${DETAIL}px; height: ${DETAIL}px; overflow: hidden">
            <span data-part="detail-mark" aria-hidden="true"
                  style="position: absolute; left: 0; right: 0; top: 24px; text-align: center;
                         font-family: ${FACE}; font-size: 96px; line-height: 1">${MARKS.primes.single}</span>
          </div>
          <div class="sp-stack" style="gap: 6px; padding-top: 2px">
            <span class="sp-chip" data-part="readout" style="cursor: default; align-self: flex-start">${MARKS.primes.read}</span>
            <p class="sp-text" data-part="note" style="margin: 0; width: 290px; height: 59px">${MARKS.primes.note}</p>
            <span class="sp-label">the foot mark, enlarged</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const foot = part(root, 'foot');
  const inch = part(root, 'inch');
  const detail = part(root, 'detail-mark');
  const readout = part(root, 'readout');
  const note = part(root, 'note');

  part(root, 'segmented').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    if (!IS_MODE(value)) return;
    const mark = MARKS[value];
    foot.dataset.marks = value;
    inch.dataset.marks = value;
    foot.textContent = mark.single;
    inch.textContent = mark.double;
    detail.textContent = mark.single;
    readout.textContent = mark.read;
    note.textContent = mark.note;
  });
}
