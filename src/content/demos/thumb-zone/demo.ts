import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The reach bands, warm where the thumb rests and cold where it cannot go. The kit has
 *  one accent on purpose, so a three step heat map is mixed from it here (SPEC §5). */
const EASY = 'color-mix(in oklab, var(--sp-accent) 30%, var(--sp-surface))';
const STRETCH = 'color-mix(in oklab, var(--sp-accent) 13%, var(--sp-surface))';
const HARD = 'color-mix(in oklab, var(--sp-muted) 18%, var(--sp-surface))';

/** A right thumb pivots just off the bottom right corner; the bands are its sweep. */
const MAP = `radial-gradient(circle at 86% 104%, ${EASY} 0 41%, ${STRETCH} 41% 64%, ${HARD} 64%)`;

const NOTES: Record<string, string> = {
  bottom: 'The action sits in the easy band, under the thumb with no regrip.',
  top: 'In the far corner the same action is diagonally across from the thumb: regrip, or a second hand.',
};

const swatch = (paint: string, label: string) => `
  <span class="sp-row" style="gap: 8px">
    <span class="sp-swatch" style="flex: 0 0 auto; width: 14px; height: 14px; border: 1px solid var(--sp-line); --sp-swatch: ${paint}"></span>
    <span class="sp-text">${label}</span>
  </span>`;

/**
 * Thumb zone specimen: a phone with the reach map drawn under its interface, and the
 * primary action placed once in the easy band and once in the corner furthest from the
 * thumb.
 *
 * The subject is the reach map, the same decision the Z pattern specimen made: the term
 * names a region of the screen rather than any control placed in it, so the narrowest
 * honest element is the layer drawing the bands, and the interface laid over it is the
 * scene (SPEC §5). The map is the term in both states, so it carries no pose condition;
 * what moves is the action being judged against it. The legend stays out of the context
 * register because its swatches quote the subject's own paint, and the register would
 * repaint them into colours the map does not use.
 *
 * The panel beside the phone is the map's key, so it is titled and labelled the way a key
 * is: "Right thumb reach" over the band names alone. It used to gloss each band in the
 * site's voice ("easy: the thumb rests here", "hard: regrip or second hand"), which the
 * article covers at length. The line under it is the author's reading of where the action
 * landed and it changes with the switch, so it is a verdict and the stage draws it in the
 * strip rather than the panel printing it.
 *
 * Both action slots are always laid out and only their visibility changes, so moving the
 * action shifts nothing else on the screen (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Primary action</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Placement" data-part="switcher" data-value="bottom">
            <button class="sp-segment" type="button" data-part="seg-bottom" value="bottom">bottom bar</button>
            <button class="sp-segment" type="button" data-part="seg-top" value="top">top corner</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; gap: 16px; padding: 12px 14px">
          <div data-part="phone" style="flex: 0 0 auto; padding: 5px; background: var(--sp-ink); border-radius: 24px">
            <div data-part="screen" style="position: relative; width: 148px; height: 214px; background: var(--sp-surface); border-radius: 19px; overflow: hidden">
              <div data-part="map" data-subject style="position: absolute; inset: 0; background: ${MAP}"></div>
              <div class="sp-context" style="position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; padding: 10px">
                <div class="sp-row sp-row--between" style="height: 26px">
                  <span class="sp-heading" style="font-size: 12px">Orders</span>
                  <span data-part="actions-top" style="display: inline-flex">
                    <span class="sp-button sp-button--sm" style="cursor: default; font-size: 12px; padding: 4px 9px">Pay</span>
                  </span>
                </div>
                <div class="sp-stack" style="gap: 8px">
                  <div class="sp-line" style="width: 88%"></div>
                  <div class="sp-line" style="width: 66%"></div>
                  <div class="sp-line" style="width: 78%"></div>
                </div>
                <div class="sp-row" data-part="actions-bottom" style="gap: 8px; height: 34px">
                  <span class="sp-button" style="flex: 1 1 auto; justify-content: center; text-align: center; cursor: default; font-size: 13px; padding: 7px 0">Pay</span>
                  <span class="sp-icon-button" style="flex: 0 0 auto; background: var(--sp-surface); border: 1px solid var(--sp-line); cursor: default">${icon('heart')}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 10px">
            <span class="sp-label">Right thumb reach</span>
            <div class="sp-stack" style="gap: 6px">
              ${swatch(EASY, 'easy')}
              ${swatch(STRETCH, 'stretch')}
              ${swatch(HARD, 'hard')}
            </div>
            <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 60px"></span>
          </div>
        </div>
      </div>
    </div>
  `;

  const bottomActions = part(root, 'actions-bottom');
  const topActions = part(root, 'actions-top');
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const note = NOTES[key];
    if (!note) return;
    bottomActions.style.visibility = key === 'bottom' ? '' : 'hidden';
    topActions.style.visibility = key === 'top' ? '' : 'hidden';
    readout.textContent = note;
  };

  // Each segment names a placement, so a step lands on that placement rather than
  // flipping whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('bottom');
}
