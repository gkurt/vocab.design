import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Checked against the files this site actually loads. Geist Variable carries a
 * real weight axis, so `font-weight: 800` is drawn rather than smeared and no
 * bold request here can be made to synthesize. It carries no italic file, so
 * `font-style: italic` is genuinely sheared by the browser, and
 * `font-synthesis: none` genuinely refuses it. The specimen therefore shows the
 * synthesis that really happens on this page, with the drawn weight beside it,
 * instead of staging a smear the browser would not produce.
 */
const FACE = "'Geist Variable', ui-sans-serif, system-ui, sans-serif";
const WORD = 'Handgloves';

const MODES = {
  real: {
    css: 'font-weight: 800; font-style: normal; font-synthesis: auto',
    read: 'font-weight: 800',
    note: 'A drawn weight: the stems thicken more than the hairlines and the counters are redrawn.',
  },
  faux: {
    css: 'font-weight: 400; font-style: italic; font-synthesis: auto',
    read: 'font-style: italic',
    note: 'The browser shears the roman by a fixed angle. Same letters, leaning: not a drawn italic.',
  },
  off: {
    css: 'font-weight: 400; font-style: italic; font-synthesis: none',
    read: 'font-synthesis: none',
    note: 'Nothing is invented, so the missing style shows as plain roman instead of being disguised.',
  },
} as const;

type Mode = keyof typeof MODES;

const IS_MODE = (value: string): value is Mode => value in MODES;

/** Room for the tallest setting, so the line never moves the detail under it (SPEC §5). */
const LINE = 52;
const DETAIL = 108;

/**
 * Faux bold specimen: one word set as a style the file contains, as a style it
 * does not (which the browser manufactures), and as the same request with
 * synthesis refused. The detail beside it stacks the live letter over a ghost of
 * the untouched roman at the same size and position, so the shear is read off
 * the offset between them rather than asserted, and the drawn weight is read as
 * a different drawing rather than a thicker one.
 *
 * The subject is the set line, which is the text the synthesis happens to. Two
 * of the three settings are the reference rather than the term, so the honest
 * condition is declared in `data-pose` and the specimen mounts synthesized
 * (SPEC §6). The picker, the detail and the notes are the demo's own
 * instrumentation and stay in the context register (SPEC §5).
 *
 * Both boxes are fixed, so a setting that sets wider or leans further moves
 * nothing (SPEC §5).
 *
 * Two pieces of the site's own voice have left the frame. The readout chip glossed each
 * setting ("font-style: italic, with no italic file loaded") and now prints the bare
 * declaration in force, which is all a readout of a declaration should say. And a line
 * under it read "the pale letter behind is the untouched roman", a caption on the demo's
 * own instrument; the ghost letter is legible as a comparison without being announced, and
 * the strip's verdict says what the offset between the two means.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Style" data-term="faux" data-value="faux" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-real" value="real">real</button>
            <button class="sp-segment" data-part="seg-faux" value="faux">synthesized</button>
            <button class="sp-segment" data-part="seg-off" value="off">refused</button>
          </sp-segmented>
        </div>
        <div style="height: ${LINE}px; display: flex; align-items: center; margin-top: 6px; overflow: hidden">
          <span data-part="line" data-subject data-mode="faux" data-faked data-pose="[data-faked]"
                style="font-family: ${FACE}; font-size: 34px; white-space: nowrap; ${MODES.faux.css}">${WORD}</span>
        </div>
        <div class="sp-row sp-context" style="gap: 16px; align-items: flex-start; margin-top: 4px">
          <div data-part="detail" class="sp-surface"
               style="position: relative; flex: 0 0 auto; width: ${DETAIL}px; height: ${DETAIL}px; overflow: hidden">
            <span aria-hidden="true"
                  style="position: absolute; left: 22px; bottom: 12px; font-family: ${FACE}; font-size: 78px; line-height: 1;
                         font-weight: 400; color: color-mix(in oklab, var(--sp-ink) 18%, transparent)">n</span>
            <span data-part="detail-live" aria-hidden="true"
                  style="position: absolute; left: 22px; bottom: 12px; font-family: ${FACE}; font-size: 78px; line-height: 1;
                         ${MODES.faux.css}">n</span>
          </div>
          <div class="sp-stack" style="gap: 6px; padding-top: 4px">
            <span class="sp-chip" data-part="readout" style="cursor: default; align-self: flex-start">${MODES.faux.read}</span>
            <p class="sp-text" data-stage-verdict data-part="note" style="margin: 0">${MODES.faux.note}</p>
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
    line.dataset.mode = value;
    flag(line, 'data-faked', value === 'faux');
    line.style.cssText = `font-family: ${FACE}; font-size: 34px; white-space: nowrap; ${mode.css}`;
    live.style.cssText = `position: absolute; left: 22px; bottom: 12px; font-family: ${FACE}; font-size: 78px; line-height: 1; ${mode.css}`;
    readout.textContent = mode.read;
    note.textContent = mode.note;
  });
}
