import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import { localPoint } from '#src/kit/measure.ts';

const TABLE_W = 446;
const ORDER_W = 88;
const STATUS_W = 96;
const TOTAL_W = 76;
/** Everything the other three columns are not using, which is the widest Customer may get. */
const MAX = TABLE_W - ORDER_W - STATUS_W - TOTAL_W;
const MIN = 76;
const DEFAULT_W = 130;
/** Drag stops, in Customer-column widths, so a scripted drag lands somewhere nameable. */
const STOPS = [84, 172];

const ROWS = [
  { order: '4821', customer: 'Marguerite Okonkwo', status: 'Packing', total: '248.00' },
  { order: '4822', customer: 'Dale Freeman', status: 'Shipped', total: '96.50' },
  { order: '4823', customer: 'Aoife Ni Bhraonain', status: 'Shipped', total: '412.00' },
  { order: '4824', customer: 'Sam Petit', status: 'Delivered', total: '58.20' },
];

const LONGEST = 'Marguerite Okonkwo';
const CELL_PAD = 22;

const NOTE: Record<string, string> = {
  fixed: 'Fixed: the width someone chose is the width the column keeps, ellipsis and all.',
  fit: 'Fit to content: the column asks its widest cell how much room it actually needs.',
  fill: 'Fill: the column takes whatever room the other three columns left over.',
};

const clamp = (n: number, low: number, high: number) => Math.max(low, Math.min(high, n));
const band = (width: number) => (width < 118 ? 'narrow' : width > 158 ? 'wide' : 'medium');

const truncate = 'overflow: hidden; text-overflow: ellipsis';

/**
 * Column resizer specimen: a four column order table whose Customer boundary can be
 * dragged, with the sizing policy named absolutely and the column's width read out live.
 *
 * The subject is the resizer itself, `data-part="grip"`: the strip on the boundary, not the
 * table it belongs to and not the column it sizes. It is drawn as an eight pixel hit area
 * around a two pixel rule, because a real resizer is wider than the line it moves, and
 * because the stage reads a box thinner than about two pixels as absent. The table, the
 * policy picker and the read-out are scenery.
 *
 * Nothing reflows but the column being sized. The other three columns are fixed and the
 * slack lives in a trailing filler column, so widening Customer eats the slack rather than
 * squeezing its neighbours (SPEC §5). That is a claim the choreography can actually check:
 * after every resize the demo measures the other headers and publishes them on the table as
 * `data-others`, so an assert fails if a drag ever moved a column it should not have.
 *
 * The content width is measured once on mount, from a hidden probe holding the longest
 * name, rather than guessed: nothing is written to the column before it is read, which is
 * the order a measurement has to happen in (SPEC §5). Dragging in any policy hands the
 * column back to `fixed`, and double clicking the grip fits it, which is the gesture the
 * definition names. Both drive the picker through the kit element's own `value` setter, so
 * the specimen never synthesizes a click of its own (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const head = `
    <tr>
      <th style="width: ${ORDER_W}px">Order</th>
      <th data-part="th-customer" style="position: relative">Customer</th>
      <th data-part="th-status" style="width: ${STATUS_W}px">Status</th>
      <th data-part="th-total" style="width: ${TOTAL_W}px; text-align: right">Total</th>
      <th data-part="th-filler" aria-hidden="true"></th>
    </tr>`;

  const body = ROWS.map(
    (row) => `
      <tr>
        <td style="font-variant-numeric: tabular-nums">${row.order}</td>
        <td data-part="cell-${row.order}" style="${truncate}">${row.customer}</td>
        <td>${row.status}</td>
        <td style="text-align: right; font-variant-numeric: tabular-nums">${row.total}</td>
        <td></td>
      </tr>`,
  ).join('');

  const stops = STOPS.map(
    (width) => `
      <span
        data-part="stop-${width}"
        aria-hidden="true"
        style="position: absolute; top: 4px; left: ${ORDER_W + width}px; width: 6px; height: 6px; translate: -50% 0;
               pointer-events: none"
      ></span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 229px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Orders</span>
          <span
            class="sp-label"
            data-part="readout"
            data-width="${DEFAULT_W}"
            data-band="${band(DEFAULT_W)}"
            role="status"
            style="width: 148px; text-align: right; font-size: 12px; font-variant-numeric: tabular-nums"
          >Customer ${DEFAULT_W}px</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 12px">
          <div class="sp-surface" style="width: 448px; overflow: hidden">
            <div data-part="boundary" style="position: relative">
              <table class="sp-table" data-part="table" data-mode="fixed" data-others="" style="table-layout: fixed">
                <colgroup>
                  <col style="width: ${ORDER_W}px" />
                  <col data-part="col-customer" style="width: ${DEFAULT_W}px" />
                  <col style="width: ${STATUS_W}px" />
                  <col style="width: ${TOTAL_W}px" />
                  <col />
                </colgroup>
                <thead>${head}</thead>
                <tbody>${body}</tbody>
              </table>

              <span
                data-part="grip"
                data-subject
                role="separator"
                aria-label="Resize the Customer column"
                aria-orientation="vertical"
                style="position: absolute; top: 0; bottom: 0; left: ${ORDER_W + DEFAULT_W}px; width: 8px; translate: -50% 0;
                       display: flex; justify-content: center; cursor: col-resize; touch-action: none"
              ><span data-part="grip-bar" aria-hidden="true" style="width: 2px; height: 100%; background: var(--sp-line)"></span></span>

              ${stops}

              <span
                data-part="probe"
                aria-hidden="true"
                style="position: absolute; top: 0; left: 0; visibility: hidden; white-space: nowrap; font-size: 13px"
              >${LONGEST}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="sp-stack sp-context" style="align-items: center; gap: 8px; width: 476px">
        <sp-segmented class="sp-segmented" data-part="picker" data-value="fixed">
          <button class="sp-segment" type="button" data-part="seg-fixed" value="fixed" style="padding: 4px 10px; font-size: 12px">Fixed</button>
          <button class="sp-segment" type="button" data-part="seg-fit" value="fit" style="padding: 4px 10px; font-size: 12px">Fit content</button>
          <button class="sp-segment" type="button" data-part="seg-fill" value="fill" style="padding: 4px 10px; font-size: 12px">Fill</button>
        </sp-segmented>
        <span
          class="sp-label"
          data-part="note"
          data-mode="fixed"
          role="status"
          style="height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden"
        >${NOTE.fixed}</span>
      </div>
    </div>
  `;

  const boundary = part(root, 'boundary');
  const table = part(root, 'table');
  const col = part(root, 'col-customer');
  const grip = part(root, 'grip');
  const gripBar = part(root, 'grip-bar');
  const readout = part(root, 'readout');
  const note = part(root, 'note');
  const picker = part(root, 'picker') as HTMLElement & { value: string };

  // Measured before anything is written to the column, on the state as mounted (SPEC §5).
  const FIT = clamp(Math.round(part(root, 'probe').offsetWidth) + CELL_PAD, MIN, MAX);

  let width = DEFAULT_W;
  let mode = 'fixed';
  let held = false;

  const setWidth = (next: number) => {
    width = Math.round(clamp(next, MIN, MAX));
    col.style.width = `${width}px`;
    grip.style.left = `${ORDER_W + width}px`;
    readout.dataset.width = String(width);
    readout.dataset.band = band(width);
    readout.textContent = `Customer ${width}px`;
    // The neighbours, as rendered: publishing them is what lets an assert prove that
    // sizing one column moved none of the others. Nothing here transitions width, so the
    // read after the write is the real one.
    const others = [part(root, 'th-status'), part(root, 'th-total')].map((th) => Math.round(th.offsetWidth)).join('-');
    table.dataset.others = others;
  };

  const setMode = (next: string) => {
    mode = next;
    table.dataset.mode = next;
    note.dataset.mode = next;
    note.textContent = NOTE[next] ?? '';
    if (next === 'fit') setWidth(FIT);
    else if (next === 'fill') setWidth(MAX);
    else setWidth(width);
  };

  /** Dragging is always an explicit width, so it hands the column back to the fixed policy. */
  const toFixed = () => {
    if (mode === 'fixed') return;
    picker.value = 'fixed';
  };

  grip.addEventListener('pointerdown', (event) => {
    held = true;
    // Capture keeps the drag alive past the grip's edge. A synthetic pointer has none to
    // capture and the call would throw, so only a real one asks.
    if (event.isTrusted) grip.setPointerCapture(event.pointerId);
    gripBar.style.background = 'var(--sp-accent)';
    gripBar.style.width = '3px';
    toFixed();
  });

  grip.addEventListener('dblclick', () => {
    picker.value = 'fit';
  });

  root.addEventListener('pointermove', (event) => {
    if (!held) return;
    setWidth(localPoint(event as PointerEvent, boundary).x - ORDER_W);
  });

  const release = (event: Event) => {
    if (!held) return;
    held = false;
    gripBar.style.background = 'var(--sp-line)';
    gripBar.style.width = '2px';
    setWidth(localPoint(event as PointerEvent, boundary).x - ORDER_W);
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  picker.addEventListener('change', (event) => setMode((event as CustomEvent<string>).detail));

  setMode('fixed');
}
