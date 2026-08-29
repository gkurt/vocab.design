import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const NOTE = {
  before: 'The order is still a draft. Everything on this screen can still be changed.',
  after: 'A page of its own: a reference to quote, what was bought, and when it lands.',
} as const;

/**
 * Confirmation page specimen: the screen that closes a transaction. Placing the order
 * is the explicit trigger, and what arrives is a durable page rather than a message
 * that leaves on its own: the success sentence, a reference to quote, the summary of
 * what was agreed, the date it lands, and one onward action.
 *
 * The subject is the confirmation panel, not the checkout that led to it: the term
 * names the closing screen, and the basket and its Place order button are the
 * transaction it closes (SPEC §5). No `data-pose`: the panel is the term in the only
 * state it has. Start over is instrumentation, so it sits outside the subject.
 *
 * Both screens share one reserved box of the same height, so committing swaps what is
 * drawn without moving the frame around it (SPEC §5). Place order reaches the
 * confirmed state and Start over returns to the mount state; neither toggles (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 254px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Rowan &amp; Vale</span>
          <span class="sp-label" data-part="step" style="font-size: 11px">Checkout, step 3 of 3</span>
        </div>
        <div class="sp-body" style="position: relative">

          <section class="sp-surface sp-context" data-part="checkout" style="display: flex; flex-direction: column; gap: 7px; height: 100%; padding: 12px 14px">
            <span class="sp-heading" style="font-size: 13px">Review and pay</span>
            <div class="sp-row sp-row--between" style="height: 16px">
              <span class="sp-text" style="font-size: 12px">Cotton overshirt, size M</span>
              <span class="sp-text sp-text--ink" style="font-size: 12px; font-variant-numeric: tabular-nums">78.00</span>
            </div>
            <div class="sp-row sp-row--between" style="height: 16px">
              <span class="sp-text" style="font-size: 12px">Delivery, standard</span>
              <span class="sp-text sp-text--ink" style="font-size: 12px; font-variant-numeric: tabular-nums">4.50</span>
            </div>
            <span class="sp-divider"></span>
            <div class="sp-row sp-row--between" style="height: 18px">
              <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">Total</span>
              <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600; font-variant-numeric: tabular-nums">82.50</span>
            </div>
            <button class="sp-button" data-part="place" type="button" style="width: 100%; margin-top: auto">Place order</button>
          </section>

          <section
            class="sp-surface"
            data-part="receipt"
            data-subject
            hidden
            style="position: absolute; inset: 12px; display: flex; flex-direction: column; gap: 8px; padding: 12px 14px"
          >
            <div class="sp-row" style="gap: 8px; height: 20px">
              ${icon('check')}
              <span class="sp-heading" data-part="receipt-title" style="font-size: 14px">Order placed</span>
            </div>
            <div
              class="sp-row sp-row--between"
              data-part="reference"
              style="gap: 8px; padding: 6px 10px; background: var(--sp-accent-soft); border-radius: 6px"
            >
              <span class="sp-text" style="font-size: 11px">Order reference</span>
              <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600; letter-spacing: 0.04em">K7Q-4218-MB</span>
            </div>
            <span class="sp-text" data-part="receipt-summary" style="font-size: 12px">
              Cotton overshirt, size M. 82.50 paid by card ending 4192.
            </span>
            <span class="sp-text" data-part="receipt-next" style="font-size: 12px">
              Arriving Tuesday 26 May. A copy of this page is on its way to your inbox.
            </span>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="track" type="button" style="width: 100%; margin-top: auto">
              Track this order
            </button>
          </section>

        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 12px">
        <span class="sp-text" data-stage-verdict data-part="note" style="width: 300px; font-size: 11px">${NOTE.before}</span>
        <button class="sp-button sp-button--ghost sp-button--sm" data-part="restart" type="button">Start over</button>
      </div>
    </div>
  `;

  const checkout = part(root, 'checkout');
  const receipt = part(root, 'receipt');
  const step = part(root, 'step');
  const note = part(root, 'note');

  const show = (placed: boolean) => {
    checkout.hidden = placed;
    receipt.hidden = !placed;
    step.textContent = placed ? 'Order complete' : 'Checkout, step 3 of 3';
    note.textContent = placed ? NOTE.after : NOTE.before;
  };

  part(root, 'place').addEventListener('click', () => show(true));
  part(root, 'restart').addEventListener('click', () => show(false));
}
