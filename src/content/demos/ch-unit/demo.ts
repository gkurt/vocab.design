import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Two faces this site actually loads, so both rulers are real files rather than
 * whatever the machine had: the kit's own sans, and the serif the chrome sets its
 * headwords in. Measured in the browser at the same size, their zeros are 0.66em
 * and 0.53em wide, which is the whole point of the lower ruler: the same ch count
 * is a different number of pixels in a different family.
 */
const SERIF = "'Source Serif 4 Variable', Georgia, serif";
/** Small enough that the widest offered column still fits the window (SPEC §5). */
const SIZE = 10;
const COUNTS = [30, 45, 60] as const;
type Count = (typeof COUNTS)[number];
const MAX = Math.max(...COUNTS);
const IS_COUNT = (value: string): value is `${Count}` => COUNTS.some((c) => String(c) === value);

const TEXT =
  'A column stated in characters keeps its shape when the type size changes, because the unit moves with the type. ' +
  'State the same column in pixels and it holds a different number of words at every size you try.';

/** Room for the narrowest column, which is the tallest one (SPEC §5). */
const COLUMN = 92;

/**
 * Ch unit specimen: one paragraph whose column is stated in `ch`, with a ruler of
 * zeros under it at the same size and in the same face. The ruler is the unit
 * drawn out: one zero is one ch, so the ruler and the column end at exactly the
 * same place, and the pick moves both. The second ruler is the same zero count in
 * a different family, which lands somewhere else entirely.
 *
 * The subject is the first cell of the upper ruler, which is exactly one ch wide.
 * The term names a length, and the narrowest element that traces that length is
 * one zero's advance, not the column that happens to be forty-five of them
 * (SPEC §5). The column, the second ruler and the readout are the demo's own
 * instrumentation and stay in the context register.
 *
 * The two advances are measured once, at mount, on the state the specimen mounts
 * in; every later readout is arithmetic on those two readings, so no pick is ever
 * followed by a measurement (AGENTS.md).
 */
export function mount(root: HTMLElement): void {
  const cells = (subject: boolean) =>
    Array.from(
      { length: MAX },
      (_, i) =>
        `<span ${subject && i === 0 ? 'data-part="unit" data-subject ' : ''}style="display: inline-block; width: 1ch; text-align: center">0</span>`,
    ).join('');

  const ruler = (name: string, face: string, subject: boolean) => `
    <div data-part="${name}" style="width: 45ch; overflow: hidden; white-space: nowrap; font-size: ${SIZE}px;
         line-height: 1.6; ${face}; transition: width 0.28s var(--sp-ease)">${cells(subject)}</div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 460px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">max-width</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="45">
            ${COUNTS.map((c) => `<button class="sp-segment" data-part="seg-${c}" value="${c}">${c}ch</button>`).join('')}
          </sp-segmented>
        </div>
        <div style="height: ${COLUMN}px; margin-top: 10px">
          <p class="sp-prose sp-context" data-part="column" data-ch="45"
             style="margin: 0; font-size: ${SIZE}px; --sp-measure: 45ch; transition: max-width 0.28s var(--sp-ease)">${TEXT}</p>
        </div>
        ${ruler('ruler-sans', '', true)}
        <div class="sp-context" style="margin-top: 6px">${ruler('ruler-serif', `font-family: ${SERIF}`, false)}</div>
        <div class="sp-row sp-context" style="height: 30px; margin-top: 6px">
          <span class="sp-chip" data-part="readout" style="cursor: default; font-variant-numeric: tabular-nums"></span>
        </div>
        <p class="sp-text sp-context" data-part="caption" style="margin-top: 2px">
          One zero, one ch. The upper ruler is the column's own face and ends where the column does; the lower
          one is the same count in a serif.
        </p>
      </div>
    </div>
  `;

  const column = part(root, 'column');
  const sans = part(root, 'ruler-sans');
  const serif = part(root, 'ruler-serif');
  const readout = part(root, 'readout');

  /* The two readings, taken on the mounted state and never repeated after a write. */
  const sansCh = part(root, 'unit').getBoundingClientRect().width;
  const serifCh = (serif.firstElementChild as HTMLElement | null)?.getBoundingClientRect().width ?? sansCh;

  const apply = (value: string) => {
    if (!IS_COUNT(value)) return;
    const count = Number(value);
    column.dataset.ch = value;
    column.style.setProperty('--sp-measure', `${count}ch`);
    sans.style.width = `${count}ch`;
    serif.style.width = `${count}ch`;
    readout.textContent = `${count}ch is ${Math.round(count * sansCh)}px here, ${Math.round(count * serifCh)}px in the serif`;
  };

  apply('45');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
