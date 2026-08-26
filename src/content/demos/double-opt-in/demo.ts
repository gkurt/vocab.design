import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long the confirmation spends in flight before it lands at the address. */
const DELIVERY_MS = 900;

/**
 * Double opt-in specimen: a signup that is not yet a subscription, and the one act that
 * turns it into one. Submitting the form puts the address on the list as unconfirmed,
 * which the ledger at the foot of the frame says out loud; the confirmation arrives at
 * the address itself, and only pressing the control inside it moves the count.
 *
 * The subject is the confirmation control in the delivered mail, since the term names
 * that second step rather than the form that precedes it (SPEC §5). The form, the mail
 * around the control and the ledger are the setting, so they sit in the context
 * register. The control is absent at mount, so identify summons it, and the delivery
 * beat is load-bearing, which the choreography marks with a visible assert (SPEC §6).
 *
 * The mail and the empty slot share one fixed box and the pending note keeps its room
 * from mount, so nothing in the frame moves as the flow advances (SPEC §5). Every
 * control reaches one state and spends itself, so a pass can be interrupted anywhere
 * without demonstrating the opposite (SPEC §8).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 274px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Harbour Weekly</span><span class="sp-label">Subscribe</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 9px">
          <div class="sp-row" style="align-items: stretch; gap: 10px; flex: 1 1 auto; min-height: 0">

            <section class="sp-context" style="display: flex; flex-direction: column; gap: 6px; flex: 0 0 auto; width: 184px">
              <span class="sp-label" style="font-size: 10px">1 &middot; The form</span>
              <input class="sp-input" data-part="email" type="email" value="ada@studio.example" readonly aria-label="Email address" style="font-size: 12px" />
              <button class="sp-button sp-button--sm" data-part="subscribe" type="button">Subscribe</button>
              <span class="sp-text" data-part="pending-note" style="height: 46px; font-size: 11px; line-height: 1.35; visibility: hidden">
                Recorded as unconfirmed. Nothing else is sent to this address until somebody acts from inside it.
              </span>
            </section>

            <section style="display: flex; flex-direction: column; gap: 6px; flex: 1 1 auto; min-width: 0">
              <span class="sp-label sp-context" style="font-size: 10px">2 &middot; The address answers</span>
              <div data-part="mail-slot" style="position: relative; flex: 1 1 auto; min-height: 0">
                <div class="sp-surface sp-context sp-row" data-part="mail-empty" style="position: absolute; inset: 0; gap: 8px; padding: 0 10px">
                  ${icon('inbox')}<span class="sp-text" style="font-size: 11px">Nothing sent yet.</span>
                </div>
                <div
                  class="sp-surface"
                  data-part="mail"
                  style="position: absolute; inset: 0; display: flex; flex-direction: column; gap: 5px; padding: 8px 10px; opacity: 0; visibility: hidden; transition: opacity 0.22s, visibility 0.22s"
                >
                  <span class="sp-text sp-text--ink sp-context" style="font-size: 11px; font-weight: 500">Harbour Weekly</span>
                  <span class="sp-text sp-context" style="font-size: 11px; line-height: 1.3">Did you ask for this? Confirm and we start sending.</span>
                  <button class="sp-button sp-button--sm" data-part="confirm" data-subject type="button" style="margin-top: auto">Confirm subscription</button>
                </div>
              </div>
            </section>

          </div>

          <div
            class="sp-row sp-row--between sp-context"
            data-part="ledger"
            data-confirmed="412"
            data-awaiting="0"
            style="flex: 0 0 auto; gap: 8px; height: 20px"
          >
            <span class="sp-label" style="font-size: 10px">The list</span>
            <span class="sp-text" data-part="ledger-text" style="font-size: 11px">412 confirmed &middot; 0 awaiting confirmation</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const subscribe = part(root, 'subscribe');
  const note = part(root, 'pending-note');
  const mail = part(root, 'mail');
  const mailEmpty = part(root, 'mail-empty');
  const confirm = part(root, 'confirm');
  const ledger = part(root, 'ledger');
  const ledgerText = part(root, 'ledger-text');

  const setLedger = (confirmed: number, awaiting: number) => {
    ledger.dataset.confirmed = String(confirmed);
    ledger.dataset.awaiting = String(awaiting);
    ledgerText.textContent = `${confirmed} confirmed · ${awaiting} awaiting confirmation`;
  };

  subscribe.addEventListener('click', () => {
    if (subscribe.getAttribute('aria-disabled') === 'true') return;
    subscribe.setAttribute('aria-disabled', 'true');
    subscribe.textContent = 'Signed up, not subscribed';
    note.style.visibility = 'visible';
    setLedger(412, 1);
    clock.setTimeout(() => {
      mailEmpty.hidden = true;
      mail.style.opacity = '1';
      mail.style.visibility = 'visible';
    }, DELIVERY_MS);
  });

  confirm.addEventListener('click', () => {
    if (confirm.getAttribute('aria-disabled') === 'true') return;
    confirm.setAttribute('aria-disabled', 'true');
    confirm.textContent = 'Confirmed';
    setLedger(413, 0);
  });
}
