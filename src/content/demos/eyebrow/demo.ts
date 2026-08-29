import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const NOTES: Record<string, string> = {
  with: 'Category, then claim, then detail. The shelf label is read before the headline and costs one line.',
  without: 'The headline has to carry the category as well, and a reader scanning a column of cards has nothing to sort them by.',
};

/**
 * Eyebrow specimen: one article card, read in the order its type sets. The segmented
 * pick takes the eyebrow away and leaves its line empty, which is both the honest
 * comparison and the reason nothing below it moves (SPEC §5): the row keeps its
 * height and the headline holds its position while the card loses its shelf label.
 *
 * The subject is the eyebrow line itself, which is the narrowest thing the term
 * names; the numbered reading order beside the card, the card's own headline and
 * deck, and the readout are scenery in the context register. The empty state hides
 * the subject rather than dishonestly restyling it, so identify's summon brings the
 * eyebrow back rather than a pose condition refusing a state.
 */
export function mount(root: HTMLElement): void {
  const order = (n: number) => `<span class="sp-label sp-context" style="flex: 0 0 14px; text-align: right">${n}</span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">The line above the headline</span>
          <sp-segmented class="sp-segmented" data-axis="Eyebrow" data-part="segmented" data-value="with">
            <button class="sp-segment" data-part="seg-with" value="with">with</button>
            <button class="sp-segment" data-part="seg-without" value="without">without</button>
          </sp-segmented>
        </div>
        <div class="sp-surface" data-part="card" style="margin-top: 12px; padding: 14px 16px">
          <div class="sp-row" style="gap: 10px; height: 18px">
            ${order(1)}
            <span data-part="eyebrow" data-subject
                  style="font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
                         color: var(--sp-accent)">Field notes</span>
          </div>
          <div class="sp-row" style="gap: 10px; margin-top: 6px">
            ${order(2)}
            <span class="sp-context" data-part="headline" style="font-size: 19px; font-weight: 600; line-height: 1.25">The measure that fits the eye</span>
          </div>
          <div class="sp-row" style="gap: 10px; margin-top: 6px; align-items: flex-start">
            ${order(3)}
            <p class="sp-text sp-context" data-part="deck" style="margin: 0">Why a column of 66 characters is easier to read than a
              wider one, and what to do when the layout will not give you the room.</p>
          </div>
        </div>
        <p class="sp-text sp-context" data-part="readout" style="margin-top: 10px; height: 39px"></p>
      </div>
    </div>
  `;

  const eyebrow = part(root, 'eyebrow');
  const card = part(root, 'card');
  const readout = part(root, 'readout');

  const apply = (value: string) => {
    const note = NOTES[value];
    if (!note) return;
    card.dataset.eyebrow = value;
    // The line keeps its room either way; only the label goes.
    eyebrow.style.opacity = value === 'with' ? '1' : '0';
    readout.textContent = note;
  };

  apply('with');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
