import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/** Chosen, not measured: the panel's contents are the demo's own, so the room it
 *  will take is known at mount and can be reserved without reading any layout back. */
const DETAIL_H = 76;
/** Header, three rows, and the one open panel the region always has room for. */
const REGION_H = 216;

type Order = { id: string; place: string; status: string; total: string; carrier: string; tracking: string; note: string };

const ORDERS = [
  {
    id: '4192',
    place: 'Falmouth',
    status: 'Packing',
    total: '£86.00',
    carrier: 'Depot pickup',
    tracking: 'not yet issued',
    note: 'Two of four items picked, waiting on the third pallet.',
  },
  {
    id: '4193',
    place: 'Kirkwall',
    status: 'Dispatched',
    total: '£240.00',
    carrier: 'Northwind Freight',
    tracking: 'NW 88213 QT',
    note: 'Left the depot at 06:40, two stops remaining before yours.',
  },
  {
    id: '4194',
    place: 'Whitby',
    status: 'Delivered',
    total: '£54.50',
    carrier: 'Coastal Courier',
    tracking: 'CC 40119 BB',
    note: 'Signed for by A. Marceau at 11:12 on Thursday.',
  },
] as const satisfies readonly Order[];

const CELL = 'border-bottom: 1px solid var(--sp-line)';

/**
 * Expandable row specimen: three orders in a table, any of which opens a detail panel
 * under itself. The twisty in the row opens it; the toolbar's Collapse shuts whatever
 * is open, so neither control ever flips a state it found (SPEC §8), and only one row
 * is open at a time, which is what keeps the distance between two rows readable.
 *
 * The subject is the row group `data-part="row-4193"`: a `<tbody>` holding the summary
 * row and its detail region, which is the whole of what the term names (the row plus
 * what it opens) and the narrowest element that contains both. The other two orders are
 * peers rather than scenery, so they stay in the normal register; the frame, the header
 * and the toolbar are `.sp-context`.
 *
 * The growth is the term, so it is contained (SPEC §5): the table region is a fixed
 * height with the one panel's room already reserved inside it, so rows below the open
 * one move within the table while the panel, the region and everything outside hold
 * still. The panel's height is a constant rather than a measurement, so nothing is ever
 * read back after a style write.
 */
export function mount(root: HTMLElement): void {
  const groups = ORDERS.map(
    (order) => `
      <tbody data-part="row-${order.id}" ${order.id === '4193' ? 'data-subject' : ''}>
        <tr data-part="summary-${order.id}">
          <td style="width: 34px; padding: 4px 2px 4px 8px; ${CELL}">
            <button
              class="sp-icon-button"
              type="button"
              data-part="toggle-${order.id}"
              aria-expanded="false"
              aria-controls="vd-row-${order.id}"
              aria-label="Show detail for order ${order.id}"
              style="width: 22px; height: 22px"
            >${icon('chevronRight', 'sp-icon--chevron')}</button>
          </td>
          <td style="${CELL}">Order ${order.id}</td>
          <td class="sp-text" style="width: 120px; ${CELL}">${order.place}</td>
          <td class="sp-text" style="width: 110px; ${CELL}">${order.status}</td>
          <td style="width: 92px; text-align: right; ${CELL}">${order.total}</td>
        </tr>
        <tr>
          <td colspan="5" style="padding: 0; border-bottom: 0">
            <div
              data-part="drawer-${order.id}"
              id="vd-row-${order.id}"
              role="region"
              aria-label="Order ${order.id} detail"
              style="height: 0; overflow: hidden; transition: height 0.24s var(--sp-ease)"
            >
              <div
                data-part="detail-${order.id}"
                style="display: flex; flex-direction: column; gap: 7px; height: ${DETAIL_H}px; padding: 10px 12px;
                       background: var(--sp-sunken); border-bottom: 1px solid var(--sp-line)"
              >
                <div class="sp-row" style="gap: 22px">
                  <span class="sp-stack" style="gap: 1px"><span class="sp-label" style="font-size: 10px">Carrier</span><span style="font-size: 12px">${order.carrier}</span></span>
                  <span class="sp-stack" style="gap: 1px"><span class="sp-label" style="font-size: 10px">Tracking</span><span style="font-size: 12px">${order.tracking}</span></span>
                </div>
                <span class="sp-text" style="font-size: 12px">${order.note}</span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 460px; height: 284px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Orders, this week</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="collapse" style="padding: 3px 9px; font-size: 12px">Collapse</button>
        </div>

        <div class="sp-body">
          <div class="sp-surface" style="height: ${REGION_H}px; overflow: hidden">
            <table class="sp-table" data-part="table" aria-label="Orders">
              <thead class="sp-context">
                <tr>
                  <th style="width: 34px; ${CELL}"></th>
                  <th style="${CELL}">Order</th>
                  <th style="width: 120px; ${CELL}">Destination</th>
                  <th style="width: 110px; ${CELL}">Status</th>
                  <th style="width: 92px; text-align: right; ${CELL}">Total</th>
                </tr>
              </thead>
              ${groups}
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  const open = (id: string | undefined) => {
    for (const order of ORDERS) {
      const on = order.id === id;
      const group = part(root, `row-${order.id}`);
      const toggle = part(root, `toggle-${order.id}`);
      flag(group, 'data-open', on);
      toggle.setAttribute('aria-expanded', String(on));
      toggle.setAttribute('aria-label', `${on ? 'Hide' : 'Show'} detail for order ${order.id}`);
      part(root, `drawer-${order.id}`).style.height = on ? `${DETAIL_H}px` : '0';
      part(root, `summary-${order.id}`).toggleAttribute('data-selected', on);
    }
  };

  // Each twisty opens its own row rather than flipping whatever it found, so a pass
  // resumed at any point lands in the same place (SPEC §8).
  for (const order of ORDERS) part(root, `toggle-${order.id}`).addEventListener('click', () => open(order.id));
  part(root, 'collapse').addEventListener('click', () => open(undefined));

  open(undefined);
}
