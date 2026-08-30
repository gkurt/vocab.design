import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'balanced' | 'account';

const CAPTION = {
  balanced: 'Two paths in one row, the same size and the same weight, and neither one pre-selected.',
  account: 'The counter-example: the account form is the step, and the guest path has shrunk to small print under it.',
} as const;

const GUEST_LABEL = {
  balanced: 'Continue as guest',
  account: 'continue without an account',
} as const;

const GUEST_CLASS = {
  balanced: 'sp-button sp-button--sm',
  account: '',
} as const;

/** In the account-first variant the same control is still there, and buried: the whole claim. */
const GUEST_STYLE = {
  balanced: 'padding: 7px 12px',
  account: [
    'border: 0',
    'background: transparent',
    'font: inherit',
    'font-size: 10px',
    'color: var(--sp-muted)',
    'text-decoration: underline',
    'padding: 0',
    'cursor: pointer',
  ].join('; '),
} as const;

const AREA = {
  balanced: `
    <div class="sp-row" style="height: 100%; gap: 10px; align-items: stretch">
      <div class="sp-surface" style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 6px; padding: 10px 12px">
        <span class="sp-heading" style="font-size: 13px">Check out as a guest</span>
        <span class="sp-text sp-grow" style="font-size: 11px">Pay now. We offer to save your details afterwards.</span>
        <span data-part="guest-slot" style="display: flex"></span>
      </div>
      <div class="sp-surface sp-context" style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 6px; padding: 10px 12px">
        <span class="sp-heading" style="font-size: 13px">Sign in</span>
        <span class="sp-text sp-grow" style="font-size: 11px">Your saved address and cards are already here.</span>
        <span style="display: flex">
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="signin" type="button" style="padding: 7px 12px">Sign in</button>
        </span>
      </div>
    </div>`,
  account: `
    <div class="sp-surface sp-context" style="height: 100%; display: flex; flex-direction: column; gap: 8px; padding: 12px">
      <span class="sp-heading" style="font-size: 13px">Create an account to continue</span>
      <div class="sp-row" style="gap: 8px">
        <input class="sp-input" data-part="email" type="text" aria-label="Email address" placeholder="Email address" style="flex: 1 1 0; min-width: 0; padding: 5px 9px; font-size: 12px" />
        <input class="sp-input" data-part="password" type="password" aria-label="Choose a password" placeholder="Choose a password" style="flex: 1 1 0; min-width: 0; padding: 5px 9px; font-size: 12px" />
      </div>
      <div class="sp-row" style="gap: 14px; margin-top: 2px">
        <button class="sp-button sp-button--sm" data-part="create" type="button">Create account and continue</button>
        <span data-part="guest-slot" style="display: flex"></span>
      </div>
    </div>`,
} as const;

/**
 * Guest checkout specimen: the entry step of a checkout, drawn the way the pattern asks
 * for it (two paths side by side, one row, one size) and drawn again as the account wall
 * it is defined against. The segmented control under the frame picks between them and the
 * caption names which is which, so the dishonest layout is never presented as the term.
 *
 * A second line beside the switch used to read "Two paths in one row, the same size and the same
 * weight, and neither one pre-selected." and change with it. Two verdicts is one too many, so that
 * reading is now the verdict itself and the line under the switch is gone; the caption's old text
 * only named the step, which the frame already does.
 *
 * The subject is the guest control itself, the narrowest element the term names, and it
 * is the *same element* in both states: the account-first variant does not delete it, it
 * shrinks it into small print, which is the whole argument. Because one of its states is
 * the counter-example, it carries `data-pose` for the balanced condition, and the mount
 * state satisfies it (SPEC §6). The bag summary, the sign-in panel and the caption are
 * scenery (SPEC §5).
 *
 * The choice area holds one height for both states and the frame never grows, so
 * switching between the two moves nothing around them (SPEC §5), and each segment reaches
 * an absolute state rather than flipping the other's (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Wren &amp; Halliday</span>
          <span class="sp-label" style="font-size: 11px">Step 1 of 3</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">

          <div class="sp-surface sp-context sp-row sp-row--between" style="flex: 0 0 auto; height: 32px; padding: 0 10px">
            <span class="sp-text sp-text--ink" style="font-size: 12px">Reading lamp, brass</span>
            <span class="sp-text" style="font-size: 12px">52.50</span>
          </div>

          <span class="sp-label sp-context" data-stage-verdict data-part="caption" style="flex: 0 0 auto; height: 14px; font-size: 11px">${CAPTION.balanced}</span>

          <div data-part="area" style="flex: 0 0 auto; height: 124px">${AREA.balanced}</div>

        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 12px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Version" data-term="balanced" data-part="mode" data-value="balanced">
          <button class="sp-segment" data-part="mode-balanced" value="balanced" style="padding: 5px 10px">Balanced</button>
          <button class="sp-segment" data-part="mode-account" value="account" style="padding: 5px 10px">Account first</button>
        </sp-segmented>
      </div>
    </div>
  `;

  const area = part(root, 'area');
  const caption = part(root, 'caption');

  // The guest control outlives both layouts: it is the subject, and the variant's point is
  // that it is still on screen, just demoted. Built once and re-homed into whichever slot
  // the current layout offers it.
  const guest = document.createElement('button');
  guest.type = 'button';
  guest.dataset.part = 'guest';
  guest.setAttribute('data-subject', '');
  guest.setAttribute('data-pose', '[data-mode=balanced]');

  const show = (mode: Mode) => {
    area.innerHTML = AREA[mode];
    guest.dataset.mode = mode;
    guest.className = GUEST_CLASS[mode];
    guest.setAttribute('style', GUEST_STYLE[mode]);
    guest.textContent = GUEST_LABEL[mode];
    part(area, 'guest-slot').append(guest);
    caption.textContent = CAPTION[mode];
  };

  part(root, 'mode').addEventListener('change', (event) => {
    show((event as CustomEvent<string>).detail === 'account' ? 'account' : 'balanced');
  });

  show('balanced');
}
