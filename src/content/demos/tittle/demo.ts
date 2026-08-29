import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * The kit's own sans, which this site loads itself, so the marker below can be
 * placed against metrics that are the same in every browser that renders this
 * page rather than against whatever local serif happened to answer (SPEC §5).
 */
const FACE = "'Geist Variable', ui-sans-serif, system-ui, sans-serif";
const SIZE = 120;

/*
 * The tittle's own extent, measured off the loaded face by scanning the drawn
 * glyph for the ink above the gap: left edge and width from the glyph origin,
 * bottom edge and height from the baseline, all as fractions of the em. A dot
 * is a contour inside a glyph and has no box of its own, so these are what a
 * box for it has to be built from (SPEC §5).
 */
type Dot = { left: number; bottom: number; width: number; height: number };

const LETTERS = {
  i: {
    char: 'i',
    dot: { left: 0.08, bottom: 0.615, width: 0.085, height: 0.095 } as Dot,
    read: 'U+0069, lowercase i',
    note: 'The dot is a second contour inside the same glyph, floating clear of the stem at about ascender height.',
  },
  j: {
    char: 'j',
    dot: { left: 0.095, bottom: 0.615, width: 0.085, height: 0.095 } as Dot,
    read: 'U+006A, lowercase j',
    note: 'The j carries one too, at the same height, over a stem that continues below the baseline.',
  },
  dotless: {
    char: 'ı',
    dot: null,
    read: 'U+0131, dotless i',
    note: 'Turkish and Azerbaijani have a letter with no tittle at all. It is a different letter, not an i with the mark removed.',
  },
  capital: {
    char: 'İ',
    dot: { left: 0.115, bottom: 0.73, width: 0.105, height: 0.105 } as Dot,
    read: 'U+0130, capital I with dot above',
    note: 'The Turkish capital of a dotted i keeps its tittle, which is why uppercasing an i depends on the locale.',
  },
} as const;

type Key = keyof typeof LETTERS;

const IS_KEY = (value: string): value is Key => value in LETTERS;

/** A little air around the dot, so the marker reads as a box rather than as ink. */
const PAD = 0.042;

const place = (dot: Dot) =>
  `left: ${(dot.left - PAD).toFixed(3)}em; bottom: ${(dot.bottom - PAD).toFixed(3)}em;` +
  ` width: ${(dot.width + PAD * 2).toFixed(3)}em; height: ${(dot.height + PAD * 2).toFixed(3)}em`;

/** The box the demo draws for the dot: the tittle's own extent, with a little air. */
const paint = (dot: Dot) =>
  `position: absolute; ${place(dot)}; border-radius: 4px; background: color-mix(in oklab, var(--sp-accent) 40%, transparent)`;

/**
 * Tittle specimen: one letter, very large, with the dot boxed. The marker is an
 * element the demo makes for a feature that has none of its own, sized to the
 * dot's measured extent and hung off a zero-height carrier whose bottom edge
 * lands on the baseline by inline layout, so it follows the letter rather than
 * being positioned against the panel (SPEC §5, and no read follows a style
 * write). The picker walks the letters that have one, the Turkish letter that
 * does not, and the Turkish capital that keeps it.
 *
 * The subject is the marker: the term names the dot, not the letter and not the
 * panel. The dotless letter is a state the subject cannot honestly be shown in,
 * so the honest condition is declared in `data-pose` and the specimen mounts on
 * the dotted i (SPEC §6).
 *
 * The panel keeps the subject out of the context register, since a scenery
 * wrapper would take the accent off the marker inside it; the letter needs no
 * dimming to be quiet, being ink on a plain surface. The panel and the note
 * keep fixed boxes, so a descender and a longer note move nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const first = LETTERS.i;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-axis="Letter" data-part="segmented" data-value="i">
            <button class="sp-segment" data-part="seg-i" value="i">i</button>
            <button class="sp-segment" data-part="seg-j" value="j">j</button>
            <button class="sp-segment" data-part="seg-dotless" value="dotless">dotless ı</button>
            <button class="sp-segment" data-part="seg-capital" value="capital">capital İ</button>
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 16px; align-items: flex-start; margin-top: 8px">
          <div data-part="panel" class="sp-surface"
               style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto;
                      width: 132px; height: 168px; overflow: hidden">
            <span data-part="glyph" data-letter="i"
                  style="font-family: ${FACE}; font-size: ${SIZE}px; line-height: 1.2; white-space: nowrap"><span
              style="position: relative; display: inline-block; width: 0; height: 0; vertical-align: baseline"><span
                data-part="marker" data-subject data-dotted data-pose="[data-dotted]"
                style="${paint(first.dot)}"></span></span>${first.char}</span>
          </div>
          <div class="sp-stack sp-context" style="gap: 8px; padding-top: 6px">
            <span class="sp-chip" data-part="readout" style="cursor: default; align-self: flex-start">${first.read}</span>
            <p class="sp-text" data-part="note" style="margin: 0; width: 258px; height: 78px">${first.note}</p>
            <span class="sp-label" style="width: 258px">A dot is a contour inside a glyph, so the box around it is the demo's own drawing.</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const glyph = part(root, 'glyph');
  const marker = part(root, 'marker');
  const readout = part(root, 'readout');
  const note = part(root, 'note');

  part(root, 'segmented').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    if (!IS_KEY(value)) return;
    const letter = LETTERS[value];
    glyph.dataset.letter = value;
    glyph.lastChild?.replaceWith(letter.char);
    flag(marker, 'data-dotted', letter.dot !== null);
    marker.hidden = letter.dot === null;
    if (letter.dot) marker.style.cssText = paint(letter.dot);
    readout.textContent = letter.read;
    note.textContent = letter.note;
  });
}
