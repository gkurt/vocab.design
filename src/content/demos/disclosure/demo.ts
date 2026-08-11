import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

/**
 * Disclosure specimen: one button, one region, and nothing else in the scene has
 * an opinion about it. The subject is the button, since that is what the word
 * names and what carries the state: `aria-expanded` says which way the region is,
 * and the chevron only draws the same sentence.
 *
 * The region is the last thing in the frame, so the room it takes when it arrives
 * comes out of empty space rather than out of the summary above it (SPEC §5).
 * The trigger toggles, which is legal here because the toggling is the term
 * (SPEC §8): the script drives both directions itself.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 264px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Order 4192</span></div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column">
          <div class="sp-surface" style="padding: 10px 12px">
            <div class="sp-row sp-row--between">
              <span class="sp-text sp-text--ink">Two items</span>
              <span class="sp-text">£64.00</span>
            </div>
            <div class="sp-divider" style="margin: 8px 0"></div>
            <div class="sp-row sp-row--between">
              <span class="sp-text sp-text--ink">Standard delivery</span>
              <span class="sp-text">Free</span>
            </div>
          </div>
          <button
            class="sp-button sp-button--quiet sp-button--sm sp-row"
            type="button"
            data-part="toggle"
            data-subject
            aria-expanded="false"
            aria-controls="vd-delivery"
            style="align-self: flex-start; margin-top: 12px; padding-left: 0"
          >
            ${icon('chevronRight', 'sp-icon--chevron')} Delivery details
          </button>
          <div class="sp-stack" data-part="region" id="vd-delivery" hidden style="gap: 6px; margin-top: 8px; padding-left: 6px">
            <div class="sp-row sp-row--between">
              <span class="sp-label">Carrier</span>
              <span class="sp-text">Evri, tracked</span>
            </div>
            <div class="sp-row sp-row--between">
              <span class="sp-label">Arrives</span>
              <span class="sp-text">Thursday 14 March</span>
            </div>
            <div class="sp-row sp-row--between">
              <span class="sp-label">Leaves from</span>
              <span class="sp-text">Sheffield depot</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const toggle = part(root, 'toggle');
  const region = part(root, 'region');

  // `hidden`, not opacity: a region the button says is gone must be gone from the
  // accessibility tree too, or the button is describing a page that does not exist.
  toggle.addEventListener('click', () => {
    const open = region.hidden;
    region.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  });
}
