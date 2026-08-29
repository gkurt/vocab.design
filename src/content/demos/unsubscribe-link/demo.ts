import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Form = 'plain' | 'buried';

const FOOTER: Record<Form, string> = {
  plain: `
    <span class="sp-text" style="font-size: 11px">You get this because you asked for it.</span>
    <span class="sp-text sp-text--ink" data-part="footer-link" style="font-size: 11px; text-decoration: underline">Unsubscribe from Harbour Weekly</span>`,
  buried: `
    <span class="sp-text" style="font-size: 8px; line-height: 1.5">
      Harbour Weekly is a trading name of Harbour Media Group. This message and any files transmitted with it are
      confidential. You are receiving it because you or someone at your organisation once expressed an interest. To <span data-part="footer-link" style="text-decoration: none">update your communication preferences</span>
      visit your account area and sign in. Registered office 20 Harbour Row.
    </span>`,
};

/**
 * Unsubscribe link specimen: an open message with two exits in it. The one at the top
 * belongs to the mail app, drawn from the message's own List-Unsubscribe header, and it
 * takes one click. The one at the bottom belongs to the sender, and a segmented pick
 * says whether they wrote it plainly or buried it in the small print. Either way the
 * top one is what a reader uses, which is the whole point: the exit has left the mail.
 *
 * The subject is the client's unsubscribe control, the narrowest element the term names.
 * The message, its footer and the app chrome around it are the setting, so they sit in
 * the context register (SPEC §5), and the control's own text stays in full register.
 *
 * The control spends itself rather than disappearing, so the subject is on stage in
 * every resting state the script visits (SPEC §7), and the receipt line keeps its room
 * from mount so confirming moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context">
          ${icon('inbox')}<span class="sp-heading sp-grow">Harbour Weekly</span><span class="sp-label">Mailing list</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">

          <div class="sp-surface sp-row" data-part="client-bar" style="flex: 0 0 auto; gap: 10px; padding: 8px 10px">
            <span class="sp-grow sp-context" style="min-width: 0">
              <span class="sp-text sp-text--ink" data-part="bar-line" style="display: block; font-size: 11px">This message is from a mailing list.</span>
              <span class="sp-text" style="display: block; font-size: 10px">Your mail app added this control from the message's own header.</span>
            </span>
            <button class="sp-button sp-button--sm" data-part="header-unsub" data-subject type="button" style="flex: 0 0 auto">Unsubscribe</button>
          </div>

          <div class="sp-row sp-context" data-part="receipt-slot" style="flex: 0 0 auto; gap: 6px; height: 16px">
            <span
              class="sp-row"
              data-part="receipt"
              style="gap: 6px; visibility: hidden; opacity: 0; transition: opacity 0.22s"
            >
              ${icon('check')}<span class="sp-text" style="font-size: 11px">Out of the list. No sign-in, no survey, one request.</span>
            </span>
          </div>

          <div class="sp-stack sp-context" data-part="message" style="flex: 0 0 auto; gap: 7px; padding: 0 2px">
            <div class="sp-line" style="width: 62%"></div>
            <div class="sp-line" style="width: 88%"></div>
            <div class="sp-line" style="width: 74%"></div>
          </div>

          <div
            class="sp-surface sp-context sp-stack"
            data-part="footer"
            data-form="plain"
            style="flex: 0 0 auto; gap: 3px; height: 66px; margin-top: auto; padding: 7px 9px; overflow: hidden"
          >${FOOTER.plain}</div>

        </div>
      </div>
      <sp-segmented class="sp-segmented" data-axis="Footer" data-part="form" data-value="plain">
        <button class="sp-segment" data-part="form-plain" value="plain">Sender wrote it plainly</button>
        <button class="sp-segment" data-part="form-buried" value="buried">Sender buried it</button>
      </sp-segmented>
    </div>
  `;

  const footer = part(root, 'footer');
  const unsub = part(root, 'header-unsub');
  const receipt = part(root, 'receipt');
  const barLine = part(root, 'bar-line');

  part(root, 'form').addEventListener('change', (event) => {
    const next: Form = (event as CustomEvent<string>).detail === 'buried' ? 'buried' : 'plain';
    footer.dataset.form = next;
    footer.innerHTML = FOOTER[next];
  });

  // One request and it is done, so the control spends itself rather than staying
  // pressable: a second press would demonstrate an exit that did not work.
  unsub.addEventListener('click', () => {
    if (unsub.getAttribute('aria-disabled') === 'true') return;
    unsub.setAttribute('aria-disabled', 'true');
    unsub.textContent = 'Unsubscribed';
    barLine.textContent = 'You will not get this list again.';
    receipt.style.visibility = 'visible';
    receipt.style.opacity = '1';
  });
}
