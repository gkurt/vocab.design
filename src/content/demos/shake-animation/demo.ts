import { part } from '#src/kit/parts.ts';

const CODE = '284015';

const MESSAGES = {
  idle: 'Six digits from your authenticator app.',
  reject: 'That code is not right, try again.',
  accept: 'Code accepted, signing you in.',
} as const;

/**
 * Shake specimen: a verification field that refuses a wrong code by moving,
 * then says so in words. The refusal is a one-shot `element.animate`, because
 * the kit's motion sheet gates the loops it owns and there is no loop here to
 * gate: the shake is scheduled by an event, runs once, and leaves the field on
 * its own resting frame.
 *
 * What the kit does have to be honoured by hand is the motion preference. A
 * `element.animate` keyframe set is out of reach of the `prefers-reduced-motion`
 * block in `motion.css`, so the demo asks the same question itself and simply
 * does not play. Nothing is lost by skipping it: the message below the field
 * carries the rejection, which is the rule the term itself is written under.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 306px">
        <div class="sp-stack sp-context" style="gap: 3px">
          <span class="sp-heading">Confirm it is you</span>
          <span class="sp-text">Sent to ada@example.com</span>
        </div>
        <div class="sp-field" data-part="field" data-subject style="margin-top: 14px">
          <label class="sp-label" for="sp-shake-code">Verification code</label>
          <input class="sp-input" id="sp-shake-code" data-part="code" placeholder="000000" inputmode="numeric" autocomplete="off" />
        </div>
        <p
          class="sp-text sp-context"
          data-part="message"
          data-tone="idle"
          style="min-height: 20px; margin: 8px 0 0; white-space: nowrap"
        >${MESSAGES.idle}</p>
        <button class="sp-button sp-context" type="button" data-part="verify" style="width: 100%; margin-top: 12px">Verify</button>
      </div>
    </div>
  `;

  const field = part(root, 'field');
  const code = part(root, 'code') as HTMLInputElement;
  const message = part(root, 'message');

  const view = root.ownerDocument.defaultView ?? window;
  const reduced = () => view.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const say = (tone: keyof typeof MESSAGES) => {
    message.dataset.tone = tone;
    message.textContent = MESSAGES[tone];
    // Quiet emphasis rather than a second colour: the message lives in the context
    // register, where a warn hue is remapped to neutral by design (SPEC §5).
    message.classList.toggle('sp-text--ink', tone !== 'idle');
  };

  const shake = () => {
    if (reduced()) return;
    // Decaying amplitude: a wobble of constant width reads as a loop, not a recoil.
    field.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-8px)' },
        { transform: 'translateX(7px)' },
        { transform: 'translateX(-4px)' },
        { transform: 'translateX(3px)' },
        { transform: 'translateX(0)' },
      ],
      { duration: 420, easing: 'ease-in-out' },
    );
  };

  part(root, 'verify').addEventListener('click', () => {
    if (code.value === CODE) {
      say('accept');
      return;
    }
    say('reject');
    // The field empties for the retry, so the next attempt starts from what the
    // reader typed rather than from what a resumed pass left behind (SPEC §8).
    code.value = '';
    shake();
  });
}
