import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long the message spends in flight before it lands in the sim inbox. */
const DELIVERY_MS = 1100;

/**
 * Magic link specimen: an address is named, a message arrives carrying one link, and
 * following that link is the whole sign-in. The inbox is simulated inside the frame
 * because the link is the part of the pattern that lives outside the app, and a
 * specimen that could not show it would be showing the waiting screen instead.
 *
 * The subject is the link in the message, not the flow around it. The sign-in screen,
 * the waiting screen, and the mail client are the setting the term needs in order to
 * be watchable (SPEC §5), and the word names the thing that carries the proof. The
 * link is absent at mount, so identify summons it: the delivery beat is load-bearing
 * and the choreography marks it with a visible assert (SPEC §6).
 *
 * The three screens share one fixed-height slot and the message keeps its room from
 * mount, so neither advancing nor delivery moves anything (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 306px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Studio</span><span class="sp-label">Sign in</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">

          <div data-part="stage" class="sp-context" style="flex: 0 0 auto; height: 139px">
            <section data-part="email-step" style="display: flex; flex-direction: column; gap: 8px; height: 100%">
              <span class="sp-heading" style="font-size: 14px">Sign in</span>
              <span class="sp-text">No password. We mail you a link, you click it, you are in.</span>
              <input class="sp-input" data-part="email" type="email" value="ada@studio.example" readonly aria-label="Email address" />
              <button class="sp-button" data-part="send" type="button" style="margin-top: auto">Send sign-in link</button>
            </section>

            <section data-part="wait-step" hidden style="display: flex; flex-direction: column; gap: 8px; height: 100%">
              <span class="sp-heading" style="font-size: 14px">Check your email</span>
              <span class="sp-text">
                We sent a link to ada@studio.example. It works once and expires in 15 minutes.
              </span>
              <div class="sp-row sp-row--between" style="margin-top: auto">
                <span class="sp-label" data-part="wait-status" role="status">Waiting for the message</span>
                <button class="sp-button sp-button--quiet sp-button--sm" data-part="resend" type="button" style="font-size: 12px">Resend</button>
              </div>
            </section>

            <section data-part="done-step" hidden style="display: flex; flex-direction: column; gap: 8px; height: 100%">
              <span class="sp-row" style="gap: 8px">${icon('check')}<span class="sp-heading" style="font-size: 14px">Signed in as Ada Mbeki</span></span>
              <span class="sp-text">That link is spent. The next sign-in gets a new one.</span>
            </section>
          </div>

          <div class="sp-surface" data-part="inbox" style="flex: 0 0 auto; height: 88px; padding: 10px">
            <div class="sp-row sp-context" style="gap: 6px; height: 16px">
              ${icon('inbox')}<span class="sp-label sp-grow">Inbox</span><span class="sp-label" data-part="inbox-note">empty</span>
            </div>
            <div
              class="sp-row"
              data-part="message"
              style="gap: 10px; height: 44px; margin-top: 8px; opacity: 0; visibility: hidden; translate: 0 6px; transition: opacity 0.24s, visibility 0.24s, translate 0.24s var(--sp-ease)"
            >
              <span class="sp-grow sp-context" style="min-width: 0">
                <span class="sp-text sp-text--ink" style="font-size: 12px">Studio</span><br />
                <span class="sp-text" style="font-size: 12px">Your sign-in link, good for one use</span>
              </span>
              <button class="sp-button sp-button--sm" data-part="link" data-subject type="button">Sign in to Studio</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  const emailStep = part(root, 'email-step');
  const waitStep = part(root, 'wait-step');
  const doneStep = part(root, 'done-step');
  const message = part(root, 'message');
  const link = part(root, 'link');
  const note = part(root, 'inbox-note');
  const status = part(root, 'wait-status');
  let delivery: number | undefined;

  const deliver = () => {
    clock.clearTimeout(delivery);
    message.style.opacity = '0';
    message.style.visibility = 'hidden';
    message.style.translate = '0 6px';
    note.textContent = 'empty';
    delivery = clock.setTimeout(() => {
      message.style.opacity = '1';
      message.style.visibility = 'visible';
      message.style.translate = '0 0';
      note.textContent = '1 new';
      status.textContent = 'Link delivered, open it below';
    }, DELIVERY_MS);
  };

  part(root, 'send').addEventListener('click', () => {
    emailStep.hidden = true;
    waitStep.hidden = false;
    doneStep.hidden = true;
    status.textContent = 'Waiting for the message';
    deliver();
  });

  // Resend reaches the same state every time: a fresh message, the reader unmoved (SPEC §8).
  part(root, 'resend').addEventListener('click', () => {
    if (!doneStep.hidden) return;
    status.textContent = 'Sending another link';
    deliver();
  });

  // Single use is the term's own claim, so the link spends itself rather than staying
  // pressable: a second click would demonstrate a link this pattern does not issue.
  link.addEventListener('click', () => {
    if (link.getAttribute('aria-disabled') === 'true') return;
    link.setAttribute('aria-disabled', 'true');
    waitStep.hidden = true;
    emailStep.hidden = true;
    doneStep.hidden = false;
  });
}
