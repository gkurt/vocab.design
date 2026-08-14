import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

/**
 * Provider marks, drawn here rather than taken from the kit set: they are the one part
 * of this pattern that is not the house's to restyle, and no other specimen needs them.
 * All three are one colour at one size, which is the parity the row is judged on.
 */
const MARKS = {
  google: '<path d="M12.2 10.6h8.4a8.6 8.6 0 1 1-2.5-5.9" fill="none" stroke="currentcolor" stroke-width="1.8" stroke-linejoin="round" />',
  apple: `
    <path d="M16.3 12.7c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8s-1.8-.8-2.9-.8c-1.5 0-2.9.9-3.6 2.2-1.6 2.7-.4 6.8 1.1 9 .7 1.1 1.6 2.3 2.8 2.3 1.1 0 1.5-.7 2.9-.7s1.7.7 2.9.7 2-1.1 2.7-2.2c.9-1.3 1.2-2.5 1.2-2.6-.1 0-2.4-.9-2.4-3.7z" />
    <path d="M14.4 6.1c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.7-.9 2.8 1 .1 2-.5 2.6-1.3z" />`,
  microsoft: `
    <rect x="3.6" y="3.6" width="7.6" height="7.6" /><rect x="12.8" y="3.6" width="7.6" height="7.6" />
    <rect x="3.6" y="12.8" width="7.6" height="7.6" /><rect x="12.8" y="12.8" width="7.6" height="7.6" />`,
} as const;

type Provider = keyof typeof MARKS;

const LABEL: Record<Provider, string> = { google: 'Google', apple: 'Apple', microsoft: 'Microsoft' };

function mark(name: Provider): string {
  return `<svg viewBox="0 0 24 24" width="17" height="17" fill="currentcolor" aria-hidden="true" style="flex: 0 0 auto">${MARKS[name]}</svg>`;
}

function providerButton(name: Provider): string {
  return `
    <button class="sp-button sp-button--ghost" data-part="provider-${name}" type="button"
            style="display: flex; align-items: center; justify-content: flex-start; gap: 10px; width: 100%; padding: 6px 12px; font-size: 13px">
      ${mark(name)}Continue with ${LABEL[name]}
    </button>`;
}

/**
 * Social login specimen: the row of provider buttons, the consent screen a provider
 * puts in front of the handoff, and the account that comes back. Nothing is typed,
 * because the reader already has the account this pattern borrows.
 *
 * The subject is the provider group, not the sign-in screen. The heading, the email
 * fallback below the divider, the consent screen, and the frame are scenery (SPEC §5):
 * the word names the row of borrowed identities, which is the thing a reader points at
 * when they say social login. The group is on stage at mount, so identify has nothing
 * to summon.
 *
 * The three screens share one slot, and all three provider buttons are one size, one
 * weight, and one glyph size, so the group holds still and reads as a set of equals.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 306px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Studio</span><span class="sp-label">Sign in</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column">

          <section data-part="choose-step" style="display: flex; flex-direction: column; gap: 7px; flex: 1 1 auto">
            <span class="sp-heading sp-context" style="font-size: 14px">Sign in to Studio</span>
            <div class="sp-stack" data-part="providers" data-subject style="gap: 6px">
              ${providerButton('google')}${providerButton('apple')}${providerButton('microsoft')}
            </div>
            <div class="sp-row sp-context" style="gap: 8px">
              <span class="sp-divider sp-grow"></span><span class="sp-label">or</span><span class="sp-divider sp-grow"></span>
            </div>
            <div class="sp-row sp-context" style="gap: 8px">
              <input class="sp-input sp-grow" data-part="email" type="email" placeholder="you@example.com" aria-label="Email address" />
              <button class="sp-button sp-button--sm" data-part="email-continue" type="button">Continue</button>
            </div>
            <span class="sp-label sp-context" data-part="email-note" role="status" style="height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap"></span>
          </section>

          <section data-part="consent-step" data-provider="" class="sp-context" hidden style="display: flex; flex-direction: column; gap: 8px; flex: 1 1 auto">
            <span class="sp-row" style="gap: 8px">
              <span data-part="consent-mark" style="display: flex"></span>
              <span class="sp-heading" data-part="consent-title" style="font-size: 14px">Google</span>
            </span>
            <span class="sp-text">Studio wants to sign you in. It will receive:</span>
            <span class="sp-row" style="gap: 8px">${icon('check')}<span class="sp-text sp-text--ink">Your name, Ada Mbeki</span></span>
            <span class="sp-row" style="gap: 8px">${icon('check')}<span class="sp-text sp-text--ink">Your email, ada@studio.example</span></span>
            <div class="sp-row" style="gap: 8px; margin-top: auto">
              <button class="sp-button sp-button--sm" data-part="allow" type="button">Continue</button>
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="deny" type="button">Cancel</button>
            </div>
          </section>

          <section data-part="done-step" class="sp-context" hidden style="display: flex; flex-direction: column; gap: 8px; flex: 1 1 auto">
            <span class="sp-row" style="gap: 8px">${icon('check')}<span class="sp-heading" style="font-size: 14px">Signed in as Ada Mbeki</span></span>
            <span class="sp-text" data-part="done-note">Studio never held a password for this account. Coming back by email would need the same account linked.</span>
          </section>

        </div>
      </div>
    </div>
  `;

  const choose = part(root, 'choose-step');
  const consent = part(root, 'consent-step');
  const done = part(root, 'done-step');
  const consentMark = part(root, 'consent-mark');
  const consentTitle = part(root, 'consent-title');

  const show = (screen: 'choose' | 'consent' | 'done') => {
    choose.hidden = screen !== 'choose';
    consent.hidden = screen !== 'consent';
    done.hidden = screen !== 'done';
  };

  for (const name of Object.keys(MARKS) as Provider[]) {
    part(root, `provider-${name}`).addEventListener('click', () => {
      consent.dataset.provider = name;
      consentMark.innerHTML = mark(name);
      consentTitle.textContent = LABEL[name];
      show('consent');
    });
  }

  // Both ways out of the consent screen are explicit, so neither step depends on the
  // state it finds (SPEC §8). Cancel comes back to the row with nothing spent.
  part(root, 'allow').addEventListener('click', () => show('done'));
  part(root, 'deny').addEventListener('click', () => show('choose'));

  // The email route is the fallback the divider promises, and it is a different word:
  // it says so in a line that keeps its room from mount rather than growing the screen.
  part(root, 'email-continue').addEventListener('click', () => {
    part(root, 'email-note').textContent = 'That route sends a code instead, and it is where linking has to happen.';
  });
}
