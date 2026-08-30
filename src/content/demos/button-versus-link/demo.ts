import { part } from '#src/kit/parts.ts';

const LIST_URL = 'example.com/invoices';
const INVOICE_URL = 'example.com/invoices/2043';

const STATUS = {
  rest: 'Due 14 March. No reminders sent.',
  acted: 'Reminder sent just now.',
} as const;

/**
 * Button versus link specimen: two controls with the same paint, one of each element,
 * with the consequence of using them drawn where it actually shows up. The button
 * changes the invoice in front of you and leaves the address alone; the link changes
 * the address, and advertises where it goes before it is pressed.
 *
 * The subject is the button. The term names a decision between two elements, so the
 * pair is the demonstration, but the button is the half the term is usually invoked to
 * defend: it is what a navigating control should have been, or should not have been.
 * The link, the address bar, and the invoice's own status line are scenery. Both controls
 * use the ghost style, whose paint holds no accent, so the context register can quiet the
 * comparison without breaking the point that the two look identical.
 *
 * Each control once carried a caption reading its element and its keys ("button · Enter and
 * Space"), and the status line read "One drawing, two elements." at rest and narrated each
 * press after it. That is the site talking inside an invoice page, and the article says all
 * of it at length, so the captions are gone and the line prints what the invoice would
 * really print: what is owed, and that a reminder went out. Following the link changes only
 * the address, which is the whole of what the link did.
 *
 * Nothing here navigates, since a specimen changes nothing outside itself: the link's
 * default is prevented and the address bar is written instead.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-chip sp-grow" data-part="address" data-page="list" style="justify-content: flex-start; cursor: default">${LIST_URL}</span>
        </div>
        <div class="sp-body">
          <div class="sp-surface" style="padding: 12px">
            <div class="sp-row sp-row--between sp-context">
              <span class="sp-heading" style="font-size: 14px">Invoice 2043</span>
              <span class="sp-chip" data-part="status" data-state="unpaid" style="cursor: default">Unpaid</span>
            </div>
            <div class="sp-row" style="align-items: flex-start; gap: 12px; margin-top: 12px">
              <div class="sp-stack" style="gap: 4px">
                <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="action" data-subject>Send reminder</button>
              </div>
              <div class="sp-stack sp-context" style="gap: 4px">
                <a class="sp-button sp-button--ghost sp-button--sm" href="https://${INVOICE_URL}" data-part="destination"
                   style="display: inline-flex; align-items: center; text-decoration: none">Open full invoice</a>
              </div>
            </div>
          </div>
          <div class="sp-row sp-context" style="height: 22px; margin-top: 8px">
            <span class="sp-text" data-part="peek" style="font-size: 12px; white-space: nowrap"></span>
            <span class="sp-text sp-grow" data-part="outcome" data-event="none"
                  style="font-size: 12px; white-space: nowrap; text-align: right">${STATUS.rest}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const address = part(root, 'address');
  const status = part(root, 'status');
  const outcome = part(root, 'outcome');
  const peek = part(root, 'peek');
  const destination = part(root, 'destination');

  // Each control reaches its own state, so a pass joined halfway still shows the right
  // one (SPEC §8); neither undoes the other.
  part(root, 'action').addEventListener('click', () => {
    status.dataset.state = 'sent';
    status.textContent = 'Reminder sent';
    outcome.dataset.event = 'acted';
    outcome.textContent = STATUS.acted;
  });

  // The address readout a browser gives every link and no button: where this goes,
  // before it is pressed.
  destination.addEventListener('pointerenter', () => {
    peek.textContent = INVOICE_URL;
  });
  destination.addEventListener('pointerleave', () => {
    peek.textContent = '';
  });

  destination.addEventListener('click', (event) => {
    event.preventDefault();
    address.dataset.page = 'invoice';
    address.textContent = INVOICE_URL;
    // The link moved the address and nothing else, so the invoice's own status line stands.
    outcome.dataset.event = 'navigated';
  });
}
