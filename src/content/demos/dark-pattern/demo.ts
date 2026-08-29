import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const CAPTION = {
  deceptive: 'Delivery protection upsell (the mistake)',
  fair: 'Delivery protection upsell (the fair version)',
} as const;

const VERDICT = {
  deceptive: 'One answer glows, the other is greyed, lowercased, and phrased to shame. The default is the seller’s.',
  fair: 'Both answers are the same size and the same weight, and neither one is an accusation.',
} as const;

/** The buried refusal: small, low contrast, lowercase, and written as a confession. */
const QUIET_DECLINE = [
  'border: 0',
  'background: transparent',
  'font: inherit',
  'font-size: 10px',
  'color: var(--sp-muted)',
  'opacity: 0.55',
  'cursor: pointer',
  'padding: 0',
  'text-decoration: underline',
].join('; ');

const BODY = {
  deceptive: `
    <span class="sp-heading" style="font-size: 14px">Protect this order</span>
    <button
      class="sp-button"
      data-part="accept"
      type="button"
      style="margin-top: 8px; padding: 10px 18px; font-size: 15px; box-shadow: 0 0 0 4px var(--sp-accent-soft), 0 6px 14px rgb(53 87 232 / 0.35)"
    >Yes, protect my order for 3.99</button>
    <button class="sp-button" data-part="decline-quiet" type="button" style="${QUIET_DECLINE}; margin-top: 10px">
      no thanks, i don’t mind if it arrives broken
    </button>`,
  fair: `
    <span class="sp-heading" style="font-size: 14px">Delivery protection, 3.99</span>
    <div class="sp-row" style="gap: 8px; margin-top: 10px">
      <button class="sp-button" data-part="accept" type="button" style="padding: 8px 14px">Add protection</button>
      <button class="sp-button sp-button--ghost" data-part="decline-fair" type="button" style="padding: 8px 14px">No protection</button>
    </div>
    <span class="sp-text" style="margin-top: 10px; font-size: 11px">Either answer takes you to payment.</span>`,
} as const;

type Mode = keyof typeof BODY;

/**
 * Dark pattern specimen: the upsell step of a checkout, drawn once the way it ships
 * and once the way it would look if both answers were treated as answers. The
 * deceptive version is the resting state and the caption above it says so, because
 * the term names the manipulation: pointing identify at the fair version would be
 * pointing it at a different word.
 *
 * The subject is the choice block, not the checkout around it. The order summary,
 * the caption, the verdict line, and the state control are scenery (SPEC §5). The
 * block holds one height for both states, so switching between them moves nothing
 * (SPEC §5), and each state control reaches its own state rather than flipping the
 * other's (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Checkout</span><span class="sp-text">Step 2 of 3</span></div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface" style="padding: 8px 10px">
            <div class="sp-row sp-row--between"><span class="sp-text sp-text--ink">Reading lamp, brass</span><span class="sp-text">48.00</span></div>
            <div class="sp-row sp-row--between" style="margin-top: 4px"><span class="sp-text sp-text--ink">Delivery</span><span class="sp-text">4.50</span></div>
          </div>
          <span class="sp-label" data-part="caption">${CAPTION.deceptive}</span>
          <div
            class="sp-surface"
            data-part="choice"
            data-subject
            data-pose="[data-mode=deceptive]"
            data-mode="deceptive"
            style="display: flex; flex-direction: column; align-items: flex-start; height: 116px; padding: 12px 14px; background: var(--sp-surface)"
          >${BODY.deceptive}</div>
        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="font-size: 11px; width: 300px">${VERDICT.deceptive}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="deceptive" data-axis="Dark pattern" data-term="deceptive">
          <button class="sp-segment" data-part="mode-deceptive" value="deceptive">With</button>
          <button class="sp-segment" data-part="mode-fair" value="fair">Without</button>
        </sp-segmented>
      
    </div>
  `;

  const choice = part(root, 'choice');
  const caption = part(root, 'caption');
  const verdict = part(root, 'verdict');

  part(root, 'mode').addEventListener('change', (event) => {
    const next: Mode = (event as CustomEvent<string>).detail === 'fair' ? 'fair' : 'deceptive';
    choice.dataset.mode = next;
    choice.innerHTML = BODY[next];
    caption.textContent = CAPTION[next];
    verdict.textContent = VERDICT[next];
  });
}
