import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * The card, and the arithmetic that sized it: 280 across, 280 / 1.618 tall, split so the
 * larger part is a square and the remainder is the same rectangle again, smaller.
 */
const CARD = { width: 280, height: 173 };
const SQUARE = 173;
const REMAINDER = CARD.width - SQUARE;

const NOTES: Record<string, string> = {
  ruled: 'Cut the square off, and the remainder has the same ratio again.',
  plain: 'Without the rules it is just a card, which is rather the point.',
};

/** One ratio, applied to type instead of to boxes: 16, then 26, then 42. */
const SIZES = [42, 26, 16];

/**
 * Golden ratio specimen: a card 280 by 173, which is one to 1.618, divided so that the media
 * half is a square and the text half is another golden rectangle. A ruled overlay draws the
 * split and the next one after it; beside the card the same ratio is applied to three type
 * sizes instead of to two boxes.
 *
 * The subject is the card. The proportion is only visible in something built to it, so the
 * narrowest honest element is the box that obeys it; the ruler strip, the type ladder, the
 * switcher and the caption are the scene it is read against (SPEC §5). The card is the term
 * in both states, since the rules are annotation rather than a change to the proportion, so
 * no `data-pose` is needed (SPEC §6).
 *
 * The card and the ruler strip both keep fixed boxes, so drawing or hiding the rules moves
 * nothing (SPEC §5), and each segment names a state of the ruling rather than flipping it
 * (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const ladder = SIZES.map(
    (size) => `
      <div class="sp-row sp-row--between" style="align-items: baseline">
        <span style="font-size: ${size}px; line-height: 1; font-weight: 600">Aa</span>
        <span class="sp-label">${size}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Proportion</span>
          <sp-segmented class="sp-segmented" data-axis="Overlay" data-part="switcher" data-value="ruled">
            <button class="sp-segment" type="button" data-part="seg-ruled" value="ruled">ruled</button>
            <button class="sp-segment" type="button" data-part="seg-plain" value="plain">plain</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 16px">
          <div class="sp-row" style="align-items: flex-start; gap: 20px">
            <div class="sp-stack" style="flex: 0 0 auto; gap: 0">
              <div data-part="ruler" style="position: relative; width: ${CARD.width}px; height: 20px">
                <span
                  class="sp-label"
                  data-part="mark-large"
                  hidden
                  style="position: absolute; left: 0; bottom: 2px; width: ${SQUARE}px; text-align: center; color: var(--sp-accent)"
                >1.618</span>
                <span
                  class="sp-label"
                  data-part="mark-small"
                  hidden
                  style="position: absolute; left: ${SQUARE}px; bottom: 2px; width: ${REMAINDER}px; text-align: center; color: var(--sp-accent)"
                >1</span>
              </div>
              <div
                class="sp-surface"
                data-part="card"
                data-subject
                style="position: relative; display: grid; grid-template-columns: ${SQUARE}px 1fr; width: ${CARD.width}px; height: ${CARD.height}px; overflow: hidden"
              >
                <div style="display: flex; align-items: flex-end; padding: 10px; background: var(--sp-accent-soft)">
                  <span class="sp-label" style="color: var(--sp-accent)">Falmouth, 06:12</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 7px; min-width: 0; padding: 10px">
                  <span class="sp-heading" style="font-size: 13px">Berth 14</span>
                  <div class="sp-line" style="width: 92%"></div>
                  <div class="sp-line" style="width: 74%"></div>
                  <div class="sp-line" style="width: 84%"></div>
                  <span class="sp-grow"></span>
                  <span class="sp-button sp-button--sm" style="cursor: default; text-align: center">Book</span>
                </div>
                <div data-part="rules" style="position: absolute; inset: 0; pointer-events: none">
                  <div style="position: absolute; left: ${SQUARE}px; top: 0; bottom: 0; border-left: 1px dashed var(--sp-accent)"></div>
                  <div style="position: absolute; left: ${SQUARE}px; right: 0; top: ${REMAINDER}px; border-top: 1px dashed var(--sp-accent)"></div>
                </div>
              </div>
            </div>
            <div class="sp-stack sp-context" style="flex: 0 0 auto; width: 124px; gap: 8px">
              <span class="sp-label" style="color: var(--sp-ink); font-weight: 600">the same step</span>
              ${ladder}
              <span class="sp-label">each one × 1.618</span>
            </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="flex: 0 0 auto; height: 22px; max-width: 442px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const rules = part(root, 'rules');
  const markLarge = part(root, 'mark-large');
  const markSmall = part(root, 'mark-small');
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const note = NOTES[key];
    if (!note) return;
    const ruled = key === 'ruled';
    for (const layer of [rules, markLarge, markSmall]) flag(layer, 'hidden', !ruled);
    readout.textContent = note;
  };

  // Each segment names a state of the ruling, so the switch lands on that state rather
  // than flipping whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('ruled');
}
