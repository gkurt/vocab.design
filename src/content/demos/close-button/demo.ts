import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

/**
 * Close button specimen: a filter panel with the dismiss control in its corner.
 * The subject is that control alone, not the panel it puts away, since the term
 * names the button and every layered surface carries one.
 *
 * The panel sits in a slot of its own height (SPEC §5), so dismissing it leaves
 * the list below exactly where it was. "Show filters" in the title bar is the
 * demo's own instrumentation and is scenery, and it also makes both directions
 * explicit states rather than one control that toggles (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Orders</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="show-filters">Show filters</button>
        </div>
        <div class="sp-body">
          <div style="height: 104px">
            <div class="sp-surface" data-part="panel" style="height: 100%; padding: 10px 12px">
              <div class="sp-row sp-row--between">
                <span class="sp-heading sp-context">Filters</span>
                <button class="sp-icon-button" type="button" data-part="close" data-subject aria-label="Close filters">
                  ${icon('close')}
                </button>
              </div>
              <div class="sp-row sp-row--wrap sp-context" style="margin-top: 12px">
                <span class="sp-chip" style="cursor: default">Unfulfilled</span>
                <span class="sp-chip" style="cursor: default">Last 30 days</span>
                <span class="sp-chip" style="cursor: default">Paid</span>
              </div>
            </div>
          </div>
          <div class="sp-stack sp-context" style="margin-top: 12px; gap: 10px">
            <div class="sp-line" style="width: 82%"></div>
            <div class="sp-line" style="width: 64%"></div>
            <div class="sp-line" style="width: 73%"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  part(root, 'close').addEventListener('click', () => {
    panel.hidden = true;
  });
  part(root, 'show-filters').addEventListener('click', () => {
    panel.hidden = false;
  });
}
