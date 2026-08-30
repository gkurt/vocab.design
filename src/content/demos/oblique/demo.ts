import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Checked against what this page really renders. Georgia (and the Linux
 * fallbacks beside it) carries a drawn italic, which is the reference this term
 * has to be told apart from, and the kit's own sans does not (SPEC §5), so the
 * comparison needs a local serif stack: named families first, generic last.
 *
 * `font-style: oblique 12deg` is deliberately NOT how the slant is applied here.
 * Checked in the browser: on a family that ships a drawn italic, font matching
 * hands the italic face over for an oblique request, so the declaration would
 * quietly draw the very thing the specimen is holding the oblique against. The
 * shear is therefore applied to the roman itself, which is what an oblique is.
 */
const SERIF = "Georgia, 'Liberation Serif', 'Nimbus Roman', 'DejaVu Serif', serif";
const WORD = 'afterglow';
const ANGLE = 12;
const SHEAR = `display: inline-block; transform: skewX(-${ANGLE}deg); transform-origin: 0 100%`;

const MODES = {
  roman: {
    css: 'font-style: normal',
    decl: 'font-style: normal',
    note: 'The reference. Every letter as the family draws it standing up.',
  },
  italic: {
    css: 'font-style: italic',
    decl: 'font-style: italic',
    note: 'The a closes to one storey and the f grows a descender: different letters, not the same ones leaning.',
  },
  oblique: {
    css: SHEAR,
    decl: `transform: skewX(-${ANGLE}deg)`,
    note: 'Same letters, leaning. Nothing is redrawn, so the live letter lands exactly on the pale one behind it.',
  },
} as const;

type Mode = keyof typeof MODES;

const IS_MODE = (value: string): value is Mode => value in MODES;

/** Room for the tallest setting, so a pick never moves the detail under it (SPEC §5). */
const LINE = 54;
const DETAIL = 104;
const GLYPH = 'a';

/**
 * Oblique specimen: one word set as the family's roman, as its drawn italic, and
 * as the roman sheared. The detail beside it stacks the live letter over a pale
 * ghost of the roman sheared by the same angle, at the same size and origin, so
 * the claim is checkable rather than asserted: on the oblique setting the two
 * coincide exactly, and on the italic setting they cannot be made to.
 *
 * The chip beside the detail prints the declaration actually in force, which is what a
 * specimen viewer shows: it used to read "the roman sheared 12 degrees", the site naming
 * its own exhibit. The line under the note ("the pale letter behind is the roman, sheared")
 * went for the same reason, and the note in the strip already says the two coincide.
 *
 * The subject is the set line, which is the text the slant is applied to. Two of
 * the three settings are the reference rather than the term, so the honest
 * condition is declared in `data-pose` and the specimen mounts oblique
 * (SPEC §6). The picker, the detail and the notes are the demo's own
 * instrumentation and stay in the context register (SPEC §5).
 *
 * The line row, the detail box and the note all keep a fixed box, so the drawn
 * italic's wider advances and the longer note cannot move anything (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const lineStyle = (css: string) => `font-family: ${SERIF}; font-size: 40px; line-height: 1.2; white-space: nowrap; ${css}`;
  const glyphStyle = (css: string) =>
    `position: absolute; left: 26px; bottom: 10px; font-family: ${SERIF}; font-size: 74px; line-height: 1; ${css}`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Style" data-term="oblique" data-part="segmented" data-value="oblique">
            <button class="sp-segment" data-part="seg-roman" value="roman">roman</button>
            <button class="sp-segment" data-part="seg-italic" value="italic">italic</button>
            <button class="sp-segment" data-part="seg-oblique" value="oblique">oblique</button>
          </sp-segmented>
        </div>
        <div style="display: flex; align-items: center; height: ${LINE}px; padding-left: 4px; margin-top: 4px; overflow: hidden">
          <span data-part="line" data-subject data-slant="oblique" data-sheared data-pose="[data-sheared]"
                style="${lineStyle(MODES.oblique.css)}">${WORD}</span>
        </div>
        <div class="sp-row sp-context" style="gap: 16px; align-items: flex-start; margin-top: 2px">
          <div data-part="detail" class="sp-surface"
               style="position: relative; flex: 0 0 auto; width: ${DETAIL}px; height: ${DETAIL}px; overflow: hidden">
            <span data-part="detail-ghost" aria-hidden="true"
                  style="${glyphStyle(`${SHEAR}; color: color-mix(in oklab, var(--sp-ink) 20%, transparent)`)}">${GLYPH}</span>
            <span data-part="detail-live" aria-hidden="true"
                  style="${glyphStyle(MODES.oblique.css)}">${GLYPH}</span>
          </div>
          <div class="sp-stack" style="gap: 6px; padding-top: 2px">
            <span class="sp-chip" data-part="readout" style="cursor: default; align-self: flex-start">${MODES.oblique.decl}</span>
            <p class="sp-text" data-stage-verdict data-part="note" style="margin: 0; width: 290px; height: 59px">${MODES.oblique.note}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  const line = part(root, 'line');
  const live = part(root, 'detail-live');
  const readout = part(root, 'readout');
  const note = part(root, 'note');

  part(root, 'segmented').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    if (!IS_MODE(value)) return;
    const mode = MODES[value];
    line.dataset.slant = value;
    flag(line, 'data-sheared', value === 'oblique');
    line.style.cssText = lineStyle(mode.css);
    live.style.cssText = glyphStyle(mode.css);
    readout.textContent = mode.decl;
    note.textContent = mode.note;
  });
}
