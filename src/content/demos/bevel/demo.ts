import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/**
 * Bevel specimen: the desktop control era's two-tone border, drawn on a grey panel.
 * The panel is raised (light top and left, dark bottom and right), the field is the
 * same pair swapped so it reads sunken, and pressing the button exchanges its pair
 * and nudges the label a pixel, which is the whole of a 1995 down state.
 *
 * The four tones are stated inline because they are the term: the kit's line and
 * surface colours describe a flat edge, and a bevel drawn from them would not read.
 * The face swap is written in script for the same reason a demo has no stylesheet:
 * a state rule needs a selector, and this paint belongs to this specimen alone.
 *
 * Two lines of site voice were removed. A caption under the panel explained which edges
 * take the light, and a hint beside the button read "Press it: the two tones trade
 * places." No 1995 dialog printed either sentence, and the article carries both, so the
 * panel now holds only what such a dialog held.
 */
const LIGHT = '#ffffff';
const DARK = '#404040';
const INNER_LIGHT = '#dfdfdf';
const INNER_DARK = '#808080';
const FACE = '#d4d0c8';
const INK = '#16181c';

/** Long enough that the exchanged borders are readable, short enough to loop. */
const PRESS_MS = 900;

function setFace(el: HTMLElement, raised: boolean): void {
  el.style.borderColor = raised ? `${LIGHT} ${DARK} ${DARK} ${LIGHT}` : `${DARK} ${LIGHT} ${LIGHT} ${DARK}`;
  el.style.boxShadow = raised
    ? `inset 1px 1px 0 ${INNER_LIGHT}, inset -1px -1px 0 ${INNER_DARK}`
    : `inset 1px 1px 0 ${INNER_DARK}, inset -1px -1px 0 ${INNER_LIGHT}`;
}

export function mount(root: HTMLElement, clock: DemoClock): void {
  const bevelBase = 'border-width: 2px; border-style: solid';

  root.innerHTML = `
    <div class="sp-app">
      <div data-part="panel" data-subject
           style="width: 296px; padding: 14px; background: ${FACE}; color: ${INK}; font-size: 12px; ${bevelBase}">
        <div data-part="emboss"
             style="font-size: 13px; font-weight: 700; letter-spacing: 0.02em; color: #6f6b64; text-shadow: 1px 1px 0 ${LIGHT}">
          Appearance
        </div>
        <div data-part="rule" aria-hidden="true"
             style="height: 2px; margin: 8px 0 12px; ${bevelBase}; border-width: 1px 0 0 0; border-top-color: ${INNER_DARK}; box-shadow: 0 1px 0 ${LIGHT}"></div>

        <div data-part="field" style="padding: 5px 8px; background: #ffffff; ${bevelBase}">
          C:\\WINDOWS\\SYSTEM\\SHELL32.DLL
        </div>

        <div style="display: flex; align-items: center; gap: 10px; margin-top: 14px">
          <button data-part="button" type="button"
                  style="padding: 6px 16px; background: ${FACE}; color: ${INK}; font: inherit; font-size: 12px; cursor: pointer; ${bevelBase}">
            <span data-part="label" style="display: inline-block">Apply</span>
          </button>
        </div>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const field = part(root, 'field');
  const button = part(root, 'button');
  const label = part(root, 'label');

  setFace(panel, true);
  setFace(field, false);
  setFace(button, true);

  let release: number | undefined;

  // Absolute: a click always lands on the pressed face, so a resumed or fast-forwarded
  // pass shows the same state (SPEC §8). The clock returns it, since the demo has to
  // be watchable on a loop and a button left down is a broken one.
  button.addEventListener('click', () => {
    setFace(button, false);
    label.style.transform = 'translate(1px, 1px)';
    button.setAttribute('data-pressed', '');
    clock.clearTimeout(release);
    release = clock.setTimeout(() => {
      setFace(button, true);
      label.style.transform = '';
      button.removeAttribute('data-pressed');
    }, PRESS_MS);
  });
}
