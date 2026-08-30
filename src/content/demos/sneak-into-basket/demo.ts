import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'sneaky' | 'fair';

const VERDICT = {
  sneaky: 'The extra line was added by a box that was already ticked, on the delivery screen.',
  fair: 'The same offer, left off: nothing reaches the basket that the buyer did not choose.',
} as const;

/** The upstream control, drawn both ways: the deception is the default, not the offer. */
const OFFER = {
  sneaky: `
    <span class="sp-text" style="display: block; font-size: 10px">Recommended for you</span>
    <span class="sp-row" style="gap: 8px; margin-top: 4px">
      <button class="sp-checkbox" data-part="opt-in" type="button" role="checkbox" aria-checked="true" data-checked></button>
      <span class="sp-text" style="font-size: 11px">Keep my parcel protected, and my order on its usual delivery date.</span>
    </span>`,
  fair: `
    <span class="sp-text" style="display: block; font-size: 10px">Optional extra</span>
    <span class="sp-row" style="gap: 8px; margin-top: 4px">
      <button class="sp-checkbox" data-part="opt-in" type="button" role="checkbox" aria-checked="false"></button>
      <span class="sp-text" style="font-size: 11px">Add parcel protection for 2.99. Your delivery date is the same either way.</span>
    </span>`,
} as const;

const TOTAL = { sneaky: '75.49', fair: '72.50' } as const;

const line = (label: string, amount: string, extra = '') => `
  <div class="sp-row sp-row--between" ${extra}>
    <span class="sp-text" style="font-size: 12px">${label}</span>
    <span class="sp-text sp-text--ink" style="font-size: 12px">${amount}</span>
  </div>`;

/**
 * Sneak into basket specimen: the delivery step of a checkout above, the order summary below,
 * and one line in the summary that nobody asked for. Both halves are on screen at once so the
 * snuck item can be traced back to the control that added it, which is the part the buyer
 * never gets to see: in a real flow the tick box is several screens behind the total.
 *
 * The offer panel was headed "Delivery, two screens back", which is the site explaining its
 * own staging inside the checkout; it is headed "Delivery" now, and the docblock above and
 * the article carry the fact that the tick box is really screens behind the total.
 *
 * The subject is the snuck line in the summary, the narrowest element the term names. The
 * checkout around it, the offer above it, and the state control below are scenery. Because
 * the fair state is the same summary with nothing snuck into it, the honest condition is
 * declared in `data-pose` on the row (SPEC §6): identify refuses to pose the fair state,
 * where ringing that line would be pointing at the opposite of the term. The specimen mounts
 * in the deceptive state for the same reason the caption says so out loud.
 *
 * The row keeps its slot in both states, so switching moves nothing in the summary and the
 * total stays where it was (SPEC §5). Each state control reaches its own state rather than
 * flipping the other's (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Checkout</span>
          <span class="sp-text">Step 2 of 3</span>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface" data-part="offer" style="padding: 8px 10px">
            <span class="sp-label" style="display: block; font-size: 10px">Delivery</span>
            ${OFFER.sneaky}
          </div>
          <div class="sp-surface sp-grow" style="display: flex; flex-direction: column; gap: 4px; padding: 8px 10px">
            <span class="sp-label" style="font-size: 10px">Your basket</span>
            ${line('Trail runners, size 9', '68.00')}
            ${line('Delivery', '4.50')}
            <div data-part="sneak-slot" style="height: 18px">
              ${line('Parcel protection', '2.99', 'data-part="sneak-row" data-subject data-mode="sneaky" data-pose="[data-mode=sneaky]"')}
            </div>
            <div class="sp-divider" style="margin: 2px 0"></div>
            <div class="sp-row sp-row--between">
              <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">Total</span>
              <span class="sp-text sp-text--ink" data-part="total" data-mode="sneaky" style="font-size: 12px; font-weight: 600">${TOTAL.sneaky}</span>
            </div>
          </div>
        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="font-size: 11px; width: 296px">${VERDICT.sneaky}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="sneaky" data-axis="Sneak into basket" data-term="sneaky">
          <button class="sp-segment" data-part="mode-sneaky" value="sneaky">With</button>
          <button class="sp-segment" data-part="mode-fair" value="fair">Without</button>
        </sp-segmented>
      
    </div>
  `;

  const offer = part(root, 'offer');
  const row = part(root, 'sneak-row');
  const total = part(root, 'total');
  const verdict = part(root, 'verdict');

  part(root, 'mode').addEventListener('change', (event) => {
    const next: Mode = (event as CustomEvent<string>).detail === 'fair' ? 'fair' : 'sneaky';
    // The offer is rebuilt rather than toggled: each state is reached, never flipped.
    offer.innerHTML = `<span class="sp-label" style="display: block; font-size: 10px">Delivery</span>${OFFER[next]}`;
    row.dataset.mode = next;
    row.hidden = next === 'fair';
    total.dataset.mode = next;
    total.textContent = TOTAL[next];
    verdict.textContent = VERDICT[next];
  });
}
