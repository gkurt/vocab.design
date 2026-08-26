import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'record' | 'campaign';

const FOOT: Record<Mode, string> = {
  record: 'Sent because somebody placed an order. It joins no list and needs no way out of one.',
  campaign: 'The promotion took the room the delivery detail had, and the mail now needs consent and a way out.',
};

/**
 * Transactional email specimen: one receipt, twice. As a record it leads with the fact
 * the reader opened it for and spends the rest of its room on the details they will
 * search for later. With a campaign in it, the promotion takes exactly the room the
 * delivery detail had, which is the honest picture of what smuggling costs, and the
 * unsubscribe line the mail now needs appears at the foot.
 *
 * The subject is the message itself, since the term names a kind of mail rather than a
 * part of one, and the mail app around it is the setting (SPEC §5). The campaign state
 * is a mail this word does not describe, so the message declares the record as its
 * honest condition in `data-pose`: identify refuses to pose the state that is no longer
 * the term, and the mount state satisfies it (SPEC §6).
 *
 * Both states occupy one fixed slot, so the swap moves nothing (SPEC §5), and each
 * segment reaches its own state rather than flipping the other's (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Order #4471</span><span class="sp-label">Quay Books</span>
        </div>
        <div class="sp-body" style="padding: 10px">
          <article
            class="sp-surface"
            data-part="mail"
            data-subject
            data-pose="[data-mode=record]"
            data-mode="record"
            style="display: flex; flex-direction: column; gap: 8px; height: 100%; padding: 11px 12px"
          >
            <div class="sp-row sp-context" style="gap: 8px">
              <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 11px; font-weight: 500">Quay Books</span>
              <span class="sp-text" style="flex: 0 0 auto; font-size: 10px">Today 11:02</span>
            </div>

            <div data-part="lead" style="flex: 0 0 auto">
              <span class="sp-heading" style="display: block; font-size: 15px">Paid, and arriving Friday 12 September</span>
              <span class="sp-text" style="display: block; margin-top: 2px; font-size: 12px">Order #4471 &middot; 24.00 &middot; card ending 4192</span>
            </div>

            <div data-part="slot" style="position: relative; flex: 0 0 auto; height: 74px">
              <div class="sp-stack" data-part="detail" style="position: absolute; inset: 0; gap: 4px">
                <span class="sp-label" style="font-size: 10px">Sent to</span>
                <span class="sp-text" style="font-size: 12px">20 Harbour Row, Portsmouth PO1 2AA</span>
                <span class="sp-text" style="font-size: 12px">Two titles, tracked, no signature needed</span>
              </div>
              <div
                class="sp-surface"
                data-part="promo"
                hidden
                style="position: absolute; inset: 0; display: flex; align-items: center; gap: 10px; padding: 8px 10px; background: var(--sp-accent-soft); border-color: transparent"
              >
                <span class="sp-grow" style="min-width: 0">
                  <span class="sp-text sp-text--ink" style="display: block; font-size: 12px; font-weight: 600">Complete the shelf</span>
                  <span class="sp-text" style="display: block; font-size: 11px">20% off any three titles this week</span>
                </span>
                <button class="sp-button sp-button--sm" data-part="promo-cta" type="button" style="flex: 0 0 auto">Shop the sale</button>
              </div>
            </div>

            <div class="sp-row sp-context" data-part="foot" style="gap: 8px; height: 30px; margin-top: auto">
              <span class="sp-text sp-grow" data-part="foot-text" style="min-width: 0; font-size: 10px; line-height: 1.35">${FOOT.record}</span>
              <span
                class="sp-text sp-text--ink"
                data-part="unsub-note"
                style="flex: 0 0 auto; font-size: 10px; text-decoration: underline; visibility: hidden"
              >Unsubscribe</span>
            </div>
          </article>
        </div>
      </div>
      <sp-segmented class="sp-segmented" data-part="mode" data-value="record">
        <button class="sp-segment" data-part="mode-record" value="record">As a record</button>
        <button class="sp-segment" data-part="mode-campaign" value="campaign">With a campaign in it</button>
      </sp-segmented>
    </div>
  `;

  const mail = part(root, 'mail');
  const detail = part(root, 'detail');
  const promo = part(root, 'promo');
  const footText = part(root, 'foot-text');
  const unsub = part(root, 'unsub-note');

  part(root, 'mode').addEventListener('change', (event) => {
    const next: Mode = (event as CustomEvent<string>).detail === 'campaign' ? 'campaign' : 'record';
    mail.dataset.mode = next;
    detail.hidden = next === 'campaign';
    promo.hidden = next === 'record';
    footText.textContent = FOOT[next];
    unsub.style.visibility = next === 'campaign' ? 'visible' : 'hidden';
  });
}
