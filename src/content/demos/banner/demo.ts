import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

/**
 * Banner specimen: a message strip in the page's own flow at the top of a section,
 * carrying one action and one dismissal. The subject is the strip.
 *
 * Persistence is the term, so the script simply waits long enough that a toast would
 * have cleaned itself up, and the strip is still there. It leaves only when someone
 * dismisses it, and the dismissal is claimed through the readout that stays rather
 * than through the strip that went (SPEC §8).
 *
 * The frame's height is fixed, so nothing outside the page moves when the strip goes;
 * inside it the content rises, which is the honest consequence of the dismissal the
 * reader asked for (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 254px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Orders</span></div>
        <div
          class="sp-row"
          data-part="banner"
          data-subject
          style="flex: 0 0 auto; gap: 10px; padding: 9px 10px 9px 12px; background: var(--sp-accent-soft); border-bottom: 1px solid var(--sp-accent)"
        >
          <span class="sp-row" style="flex: 0 0 auto; color: var(--sp-accent)">${icon('alert')}</span>
          <span class="sp-grow sp-text sp-text--ink" style="font-size: 13px">Your card expires this month.</span>
          <button class="sp-button sp-button--sm" type="button" data-part="fix" style="flex: 0 0 auto">Update card</button>
          <button class="sp-icon-button" type="button" data-part="dismiss" aria-label="Dismiss this message" style="flex: 0 0 auto">${icon('close')}</button>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column">
          <div class="sp-surface" style="padding: 10px 12px">
            <div class="sp-row sp-row--between"><span class="sp-text sp-text--ink">Order 4192</span><span class="sp-text">Dispatched</span></div>
            <div class="sp-divider" style="margin: 9px 0"></div>
            <div class="sp-row sp-row--between"><span class="sp-text sp-text--ink">Order 4188</span><span class="sp-text">Delivered</span></div>
            <div class="sp-divider" style="margin: 9px 0"></div>
            <div class="sp-row sp-row--between"><span class="sp-text sp-text--ink">Order 4171</span><span class="sp-text">Refunded</span></div>
          </div>
          <p class="sp-text" data-part="state" data-state="showing" style="margin: auto 0 0 2px; font-size: 12px; white-space: nowrap">
            Still there. A toast would have cleaned itself up by now.
          </p>
        </div>
      </div>
    </div>
  `;

  const banner = part(root, 'banner');
  const state = part(root, 'state');

  // `hidden`, not opacity: a strip the page says is dealt with must be gone from the
  // accessibility tree too. The evidence of the dismissal lives on the readout, which
  // stays, rather than on the strip, which does not (SPEC §8).
  part(root, 'dismiss').addEventListener('click', () => {
    banner.hidden = true;
    state.dataset.state = 'dismissed';
    state.textContent = 'Dismissed. It should not come back on the next page view.';
  });
}
