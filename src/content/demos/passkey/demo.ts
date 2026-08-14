import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long the device spends signing the challenge before the sheet closes. */
const VERIFY_MS = 800;

/** The unlock glyph. Drawn here rather than taken from the kit set: the ridges are
 *  this term's own artwork, and no other specimen needs a fingerprint. */
const FINGERPRINT = `
  <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentcolor" stroke-width="1.5"
       stroke-linecap="round" aria-hidden="true" style="display: block">
    <path d="M4 9.4A9 9 0 0 1 12 4.6c1.5 0 2.9.35 4.1 1" />
    <path d="M6.2 15.6A13 13 0 0 0 6.6 12a5.4 5.4 0 0 1 8.2-4.6" />
    <path d="M17.4 9.6c.4.75.6 1.6.6 2.4 0 1.9-.2 3.5-.6 4.9" />
    <path d="M8.6 18.5A11 11 0 0 0 10 12a2 2 0 0 1 4 0v1.4" />
    <path d="M12 10.2a2 2 0 0 1 2 2c0 2.4-.3 4.3-1 5.9" />
  </svg>`;

/**
 * Passkey specimen: the sign-in sheet offers the passkey route, and choosing it raises
 * the system prompt that is the whole visible surface of WebAuthn. Approving it signs
 * the challenge on the device and lands signed in; nothing is ever typed.
 *
 * The subject is that prompt, not the sign-in screen behind it. The screen, the
 * password fallback, and the frame are the setting the term needs (SPEC §5): the word
 * names the credential and the unlock gesture it asks for, which is the sheet. The
 * prompt is absent at mount, so identify summons it, and the choreography opens it
 * with an explicit trigger and closes it with explicit controls (SPEC §8).
 *
 * The two screens share one slot and the sheet is drawn over the scene, so neither
 * opening the prompt nor signing in moves anything behind it (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 288px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Studio</span><span class="sp-label">studio.example</span></div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column">

          <section data-part="signin-step" style="display: flex; flex-direction: column; gap: 8px; flex: 1 1 auto">
            <span class="sp-heading" style="font-size: 14px">Sign in to Studio</span>
            <span class="sp-text">Ada Mbeki has a passkey saved on this device.</span>
            <input class="sp-input" data-part="email" type="email" value="ada@studio.example" readonly aria-label="Email address" />
            <button class="sp-button" data-part="use-passkey" type="button">Sign in with a passkey</button>
            <div class="sp-row" style="gap: 8px">
              <span class="sp-divider sp-grow"></span><span class="sp-label">or</span><span class="sp-divider sp-grow"></span>
            </div>
            <button class="sp-button sp-button--ghost" data-part="use-password" type="button">Use a password instead</button>
          </section>

          <section data-part="done-step" hidden style="display: flex; flex-direction: column; gap: 8px; flex: 1 1 auto">
            <span class="sp-row" style="gap: 8px">${icon('check')}<span class="sp-heading" style="font-size: 14px">Signed in as Ada Mbeki</span></span>
            <span class="sp-text">The device signed a challenge for studio.example. No secret was sent, and none was stored.</span>
          </section>

        </div>

        <div class="sp-scrim" data-part="scrim"></div>
        <div
          class="sp-dialog"
          data-part="prompt"
          data-subject
          data-state="asking"
          role="dialog"
          aria-label="Use Touch ID"
          style="display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center"
        >
          <span data-part="prompt-mark" style="color: var(--sp-accent); transition: color 0.2s ease">${FINGERPRINT}</span>
          <span class="sp-heading" data-part="prompt-title" style="font-size: 14px">Use Touch ID?</span>
          <span class="sp-text" data-part="prompt-body" style="height: 40px">studio.example wants to verify you with the passkey on this device.</span>
          <div class="sp-row" data-part="prompt-actions" style="gap: 8px; height: 30px; margin-top: 2px">
            <button class="sp-button sp-button--sm" data-part="approve" type="button">Approve</button>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="cancel" type="button">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const scrim = part(root, 'scrim');
  const prompt = part(root, 'prompt');
  const title = part(root, 'prompt-title');
  const body = part(root, 'prompt-body');
  const actions = part(root, 'prompt-actions');
  const mark = part(root, 'prompt-mark');
  const signin = part(root, 'signin-step');
  const done = part(root, 'done-step');
  let verifying: number | undefined;

  const closePrompt = () => {
    clock.clearTimeout(verifying);
    flag(prompt, 'data-open', false);
    flag(scrim, 'data-open', false);
    prompt.dataset.state = 'asking';
    title.textContent = 'Use Touch ID?';
    body.textContent = 'studio.example wants to verify you with the passkey on this device.';
    mark.style.color = 'var(--sp-accent)';
    actions.style.visibility = 'visible';
  };

  part(root, 'use-passkey').addEventListener('click', () => {
    if (!done.hidden) return;
    flag(prompt, 'data-open', true);
    flag(scrim, 'data-open', true);
  });

  // Both ways out of the sheet are explicit, so neither depends on the state it finds
  // (SPEC §8). Cancel simply declines, and the sign-in screen is still there.
  part(root, 'cancel').addEventListener('click', closePrompt);

  part(root, 'approve').addEventListener('click', () => {
    if (prompt.dataset.state !== 'asking') return;
    prompt.dataset.state = 'signing';
    title.textContent = 'Signing the challenge';
    body.textContent = 'The private key stays here. Only a signature leaves.';
    mark.style.color = 'var(--sp-muted)';
    // Hidden, not removed: the actions row keeps its height, so the sheet does not
    // resize as it changes state (SPEC §5).
    actions.style.visibility = 'hidden';
    verifying = clock.setTimeout(() => {
      closePrompt();
      signin.hidden = true;
      done.hidden = false;
    }, VERIFY_MS);
  });
}
