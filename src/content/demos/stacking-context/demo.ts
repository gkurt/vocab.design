import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const MONO = 'ui-monospace, monospace';

type Mode = { css: string; spelling: string; context: boolean; note: string };

/**
 * Real CSS, not a simulation: with a context on Card A the tooltip's 9999 sorts only
 * against Card A's own children, and Card B, a later sibling in the same parent, paints
 * over the whole card. Remove the trigger and the tooltip joins the outer ordering.
 */
const MODES: Record<string, Mode> = {
  transform: {
    css: 'translate(0)',
    spelling: 'transform: translate(0)',
    context: true,
    note: 'A transform makes a context. The 9999 stops at its edge.',
  },
  opacity: {
    css: '',
    spelling: 'opacity: 0.99',
    context: true,
    note: 'Opacity below 1 does it too, and the card looks identical.',
  },
  none: {
    css: '',
    spelling: 'position: relative',
    context: false,
    note: 'No trigger, no context. Now the 9999 competes with the page.',
  },
};

const card = (name: string, title: string, extra: string, body: string) => `
  <div
    data-part="${name}"
    ${extra}
    style="position: relative; flex: 0 0 auto; width: 180px; height: 118px; padding: 12px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
  >
    <span class="sp-heading" style="font-size: 13px">${title}</span>
    ${body}
  </div>`;

/**
 * Stacking context specimen: a tooltip carrying `z-index: 9999` that still renders under
 * the neighbouring card, because the card it lives in established a context of its own.
 *
 * The subject is the card that creates the context, since a stacking context is not a
 * thing you can see but a property of the element establishing one, and that element is
 * the narrowest thing the term names. The state with no trigger is the counter-example the
 * term needs, and there the card establishes nothing, so it declares `data-context` as its
 * pose condition: identify refuses to ring a card that is not making one (SPEC §6). Mount
 * is the transform state, which satisfies it.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Card A" data-part="switcher" data-value="transform">
            <button class="sp-segment" type="button" data-part="seg-transform" value="transform">transform</button>
            <button class="sp-segment" type="button" data-part="seg-opacity" value="opacity">opacity</button>
            <button class="sp-segment" type="button" data-part="seg-none" value="none">neither</button>
          </sp-segmented>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 14px 12px">
          <div class="sp-row" style="flex: 0 0 auto; gap: 16px">
            ${card(
              'card-a',
              'Card A',
              'data-subject data-pose="[data-context]" data-context',
              `<span class="sp-text" style="display: block; margin-top: 6px; font-size: 12px">holds the tooltip</span>
               <div class="sp-tooltip" data-part="tip" data-open style="left: 108px; top: 52px; width: 152px; z-index: 9999; text-align: center; white-space: normal; --sp-arrow-x: 22px">z-index: 9999</div>`,
            )}
            ${card(
              'card-b',
              'Card B',
              'class="sp-context"',
              '<span class="sp-text" style="display: block; margin-top: 6px; font-size: 12px">a later sibling, nothing special about it</span>',
            )}
          </div>
          <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 8px; height: 26px">
            <span class="sp-label">Card A</span>
            <span
              data-part="chip"
              style="display: inline-flex; align-items: center; justify-content: center; width: 200px; padding: 3px 8px; border: 1px solid var(--sp-line); border-radius: 999px; background: var(--sp-surface); font-family: ${MONO}; font-size: 11.5px"
            ></span>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 22px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const cardA = part(root, 'card-a');
  const chip = part(root, 'chip');
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const mode = MODES[key];
    if (!mode) return;
    cardA.style.transform = mode.css;
    cardA.style.opacity = key === 'opacity' ? '0.99' : '';
    if (mode.context) cardA.setAttribute('data-context', '');
    else cardA.removeAttribute('data-context');
    chip.textContent = mode.spelling;
    readout.textContent = mode.note;
  };

  // Each segment names the property Card A carries, so a step lands on that property
  // rather than flipping whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('transform');
}
