import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Density is spacing, so each setting is one cell-padding step and nothing else. */
const PADS: Record<string, string> = {
  comfortable: '10px 12px',
  cozy: '6px 12px',
  compact: '3px 10px',
};

const ROWS = [
  { key: 1, symbol: 'ARLO', side: 'Buy', qty: '1,200', price: '18.40' },
  { key: 2, symbol: 'BNTX', side: 'Sell', qty: '340', price: '96.15' },
  { key: 3, symbol: 'CRWV', side: 'Buy', qty: '80', price: '212.00' },
  { key: 4, symbol: 'DKNG', side: 'Buy', qty: '2,500', price: '41.72' },
  { key: 5, symbol: 'EQIX', side: 'Sell', qty: '15', price: '804.30' },
  { key: 6, symbol: 'FTNT', side: 'Buy', qty: '640', price: '73.90' },
  { key: 7, symbol: 'GTLB', side: 'Sell', qty: '910', price: '52.18' },
  { key: 8, symbol: 'HUBS', side: 'Buy', qty: '120', price: '588.05' },
];

/**
 * Density specimen: one table, one fixed box, three spacing settings. The subject is
 * the region that re-densifies, because density is a property of an area rather than of
 * any control in it: nothing about a row changes except the space around its text, and
 * the result is how many rows the same box can hold.
 *
 * The switcher is instrumentation, so it sits in the scenery register (SPEC §5), and the
 * region keeps a fixed height in every setting: the point is that the box stays the same
 * size while its contents get tighter, which would be lost if the box grew instead.
 *
 * Which rows fit is measured rather than assumed, so the claim survives a font that
 * rounds differently, and it is published as `data-clipped` so a script can read it.
 */
export function mount(root: HTMLElement): void {
  const body = ROWS.map(
    (row) => `
      <tr data-part="row-${row.key}">
        <td style="width: 92px">${row.symbol}</td>
        <td class="sp-text" style="width: 72px">${row.side}</td>
        <td style="width: 96px; text-align: right">${row.qty}</td>
        <td style="text-align: right">${row.price}</td>
      </tr>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 284px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Fills</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-axis="Density" data-value="comfortable">
            <button class="sp-segment" type="button" data-part="seg-comfortable" value="comfortable">Comfortable</button>
            <button class="sp-segment" type="button" data-part="seg-cozy" value="cozy">Cozy</button>
            <button class="sp-segment" type="button" data-part="seg-compact" value="compact">Compact</button>
          </sp-segmented>
        </div>
        <div class="sp-body">
          <div
            class="sp-surface"
            data-part="region"
            data-subject
            data-density="comfortable"
            style="height: 172px; overflow: hidden; --sp-cell-pad: ${PADS.comfortable}"
          >
            <table class="sp-table" aria-label="Filled orders">
              <thead>
                <tr>
                  <th style="width: 92px">Symbol</th>
                  <th style="width: 72px">Side</th>
                  <th style="width: 96px; text-align: right">Qty</th>
                  <th style="text-align: right">Price</th>
                </tr>
              </thead>
              <tbody>${body}</tbody>
            </table>
          </div>
          <div class="sp-row sp-context" style="height: 24px; margin-top: 6px">
            <span class="sp-text" data-part="fit" style="width: 140px"></span>
          </div>
        </div>
      </div>
    </div>
  `;

  const region = part(root, 'region');
  const fit = part(root, 'fit');
  const rows = ROWS.map((row) => part(root, `row-${row.key}`));

  const measure = () => {
    const edge = region.getBoundingClientRect().bottom;
    let fits = 0;
    for (const row of rows) {
      // A row is only counted when the whole of it is inside the box: half a row is a
      // scroll, which is the cost density is bought to avoid.
      const clipped = row.getBoundingClientRect().bottom > edge + 0.5;
      flag(row, 'data-clipped', clipped);
      if (!clipped) fits++;
    }
    fit.textContent = `${fits} of ${ROWS.length} rows fit`;
  };

  // Each segment names a setting, so the switch lands on that setting rather than
  // stepping to the next one (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    const pad = PADS[value];
    if (!pad) return;
    region.dataset.density = value;
    region.style.setProperty('--sp-cell-pad', pad);
    measure();
  });

  measure();
}
