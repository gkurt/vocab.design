import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const CODE = '481207';
const DIGITS = CODE.length;
/** How long the message spends in flight before it shows up in the sim inbox. */
const DELIVERY_MS = 1100;

/**
 * One-time code login specimen: an address is named, a code arrives on it, and the
 * code is carried back into the same tab that asked for it. The message is simulated
 * inside the frame, because the whole claim of the pattern is that the reader never
 * has to leave.
 *
 * The subject is the code entry step, not the whole sign-in. The address screen, the
 * sim inbox, and the frame around them are the setting the term needs in order to be
 * watchable, and the word names the step where the second channel is redeemed
 * (SPEC §5). The boxes-per-digit component is a separate term and is deliberately not
 * re-derived here: this specimen uses one plain field so the flow is what is on show.
 *
 * The two screens share one fixed-height slot and the inbox keeps its room from
 * mount, so neither advancing nor delivery moves anything (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 320px; height: 294px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Studio</span><span class="sp-label">Sign in</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">

          <div data-part="stage" style="flex: 0 0 auto; height: 176px">
            <section class="sp-surface sp-context" data-part="address-step"
                     style="display: flex; flex-direction: column; gap: 8px; height: 100%; padding: 14px">
              <span class="sp-heading" style="font-size: 14px">Sign in</span>
              <span class="sp-text">No password. We send a ${DIGITS} digit code to your inbox and you type it back here.</span>
              <input class="sp-input" data-part="email" type="email" value="ada@studio.example" readonly aria-label="Email address" />
              <button class="sp-button" data-part="send" type="button" style="margin-top: auto">Send code</button>
            </section>

            <section class="sp-surface" data-part="code-step" data-state="waiting" data-subject hidden
                     style="display: flex; flex-direction: column; gap: 8px; height: 100%; padding: 14px">
              <span class="sp-heading" style="font-size: 14px">Enter the code</span>
              <span class="sp-text">Sent to ada@studio.example. It lasts 10 minutes.</span>
              <div class="sp-row" style="gap: 8px">
                <input
                  class="sp-input"
                  data-part="code"
                  type="text"
                  inputmode="numeric"
                  autocomplete="one-time-code"
                  spellcheck="false"
                  aria-label="${DIGITS} digit code"
                  placeholder="000000"
                  style="flex: 1 1 auto; height: 38px; text-align: center; font-size: 17px; letter-spacing: 5px; font-variant-numeric: tabular-nums"
                />
                <button class="sp-button" data-part="verify" type="button" aria-disabled="true">Verify</button>
              </div>
              <div class="sp-row sp-row--between" style="margin-top: auto">
                <span class="sp-label" data-part="code-status" role="status" style="min-width: 0; overflow: hidden; white-space: nowrap">Waiting for the code</span>
                <button class="sp-button sp-button--quiet sp-button--sm" data-part="resend" type="button" style="font-size: 12px">Resend</button>
              </div>
            </section>
          </div>

          <div class="sp-context" data-part="inbox-slot" style="flex: 0 0 auto; height: 44px">
            <div class="sp-surface sp-row" data-part="inbox"
                 style="gap: 8px; height: 100%; padding: 0 10px; opacity: 0; visibility: hidden; translate: 0 6px; transition: opacity 0.24s, visibility 0.24s, translate 0.24s var(--sp-ease)">
              ${icon('inbox')}
              <span class="sp-grow" style="min-width: 0">
                <span class="sp-text sp-text--ink" style="font-size: 12px">Studio</span><br />
                <span class="sp-text" style="font-size: 12px">Your code is ${CODE}</span>
              </span>
              <span class="sp-label">now</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  const addressStep = part(root, 'address-step');
  const codeStep = part(root, 'code-step');
  const codeField = part(root, 'code') as HTMLInputElement;
  const verify = part(root, 'verify');
  const status = part(root, 'code-status');
  const inbox = part(root, 'inbox');
  let delivery: number | undefined;

  const deliver = () => {
    clock.clearTimeout(delivery);
    inbox.style.opacity = '0';
    inbox.style.visibility = 'hidden';
    inbox.style.translate = '0 6px';
    delivery = clock.setTimeout(() => {
      inbox.style.opacity = '1';
      inbox.style.visibility = 'visible';
      inbox.style.translate = '0 0';
      if (codeStep.dataset.state === 'waiting') status.textContent = 'Code sent, check below';
    }, DELIVERY_MS);
  };

  part(root, 'send').addEventListener('click', () => {
    addressStep.hidden = true;
    codeStep.hidden = false;
    deliver();
  });

  // Resend reaches the same state every time: the message goes out again and the
  // reader stays exactly where they were (SPEC §8).
  part(root, 'resend').addEventListener('click', () => {
    if (codeStep.dataset.state === 'verified') return;
    status.textContent = 'Sending another code';
    deliver();
  });

  codeField.addEventListener('input', () => {
    if (codeStep.dataset.state === 'verified') return;
    const typed = codeField.value.replace(/\D/g, '').slice(0, DIGITS);
    codeField.value = typed;
    const full = typed.length === DIGITS;
    flag(codeStep, 'data-filled', full);
    verify.setAttribute('aria-disabled', String(!full));
    if (full) status.textContent = 'Ready to check';
  });

  verify.addEventListener('click', () => {
    // Spent once it has been used, and not offered before there is a full code to check.
    if (verify.getAttribute('aria-disabled') === 'true') return;
    if (codeField.value !== CODE) {
      // A wrong code never costs the reader what they typed.
      status.textContent = 'That code did not match';
      return;
    }
    codeStep.dataset.state = 'verified';
    codeField.readOnly = true;
    verify.setAttribute('aria-disabled', 'true');
    status.textContent = 'Signed in as Ada Mbeki';
  });
}
