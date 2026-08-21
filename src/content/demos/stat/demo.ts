const VALUE = 'font-size: 27px; font-weight: 600; line-height: 1.15; font-variant-numeric: tabular-nums; margin: 6px 0 8px';

/**
 * Stat specimen: one measure promoted to a headline, with two more beside it so
 * the block reads as the repeating unit a dashboard is built from. The subject is
 * the whole block rather than the number: label, value and delta are one thing,
 * and a bare figure with nothing naming it is not a stat.
 *
 * Nothing here moves, so the two neighbours are the demonstration's context and
 * the figures are set in tabular numerals, which is what keeps a live value from
 * reflowing its own row.
 *
 * Nothing here holds state, so the pass ends at its mount state and the tree persists across
 * attract iterations (`data-loop="keep"`).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" data-loop="keep">
      <div class="sp-frame sp-frame--wide" style="height: 230px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Overview</span></div>
        <div class="sp-body">
          <div class="sp-grid" style="grid-template-columns: repeat(3, 1fr)">
            <div class="sp-surface" data-part="stat" data-subject style="padding: 11px 12px">
              <div class="sp-label">Revenue</div>
              <div data-part="stat-value" style="${VALUE}">$48,210</div>
              <span class="sp-chip" data-part="stat-delta" data-selected style="cursor: default">+12.4%</span>
            </div>
            <div class="sp-surface sp-context" style="padding: 11px 12px">
              <div class="sp-label">Orders</div>
              <div style="${VALUE}">1,204</div>
              <span class="sp-chip" style="cursor: default">+3.1%</span>
            </div>
            <div class="sp-surface sp-context" style="padding: 11px 12px">
              <div class="sp-label">Refunds</div>
              <div style="${VALUE}">37</div>
              <span class="sp-chip" style="cursor: default">-1.8%</span>
            </div>
          </div>
          <p class="sp-text sp-context" style="margin: 12px 2px 0">Compared with the previous 30 days.</p>
        </div>
      </div>
    </div>
  `;
}
