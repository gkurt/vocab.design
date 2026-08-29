import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import { localBox } from '#src/kit/measure.ts';

interface Row {
  key: string;
  order: string;
  customer: string;
  region: string;
  status: string;
  ship: string;
  items: string;
  total: string;
}

const ROWS: Row[] = [
  { key: '1', order: '4821', customer: 'M. Okonkwo', region: 'North', status: 'Packing', ship: '12 Mar', items: '3', total: '248.00' },
  { key: '2', order: '4822', customer: 'D. Freeman', region: 'South', status: 'Shipped', ship: '11 Mar', items: '1', total: '96.50' },
  { key: '3', order: '4823', customer: 'A. Ni Bhraonain', region: 'West', status: 'Shipped', ship: '11 Mar', items: '6', total: '412.00' },
  { key: '4', order: '4824', customer: 'S. Petit', region: 'North', status: 'Delivered', ship: '09 Mar', items: '2', total: '58.20' },
  { key: '5', order: '4825', customer: 'R. Halvorsen', region: 'East', status: 'Packing', ship: '13 Mar', items: '4', total: '187.75' },
  { key: '6', order: '4826', customer: 'T. Abaza', region: 'South', status: 'Delivered', ship: '08 Mar', items: '2', total: '64.00' },
];

const MODES = ['none', 'zebra', 'hover'];
const START = 'zebra';

const CUE: Record<string, string> = {
  none: 'No row cue',
  zebra: 'Alternating fill',
  hover: 'Follows the pointer',
};

const NOTE: Record<string, string> = {
  none: 'Seven columns and nothing between the rows: the eye drifts a line somewhere in the middle.',
  zebra: 'Alternating fills give the eye a rail to follow from the first column to the last.',
  hover: 'A band that follows the pointer is stronger, but it only helps the row being asked about.',
};

/**
 * Zebra striping specimen: a seven column order table shown three ways, unstriped, striped,
 * and with the kit's own row band following the pointer instead. Seven columns is the
 * point: the technique is for a row that has to be read a long way across.
 *
 * The subject is the striping itself, `data-part="stripes"`, meaning the alternating fills
 * as a layer: a band per shaded row, sized to the rows they sit under and drawn behind the
 * table rather than on its rows, since what the term names is the fills and not the table.
 * The layer covers the body rows only, not the header, so the ring identify draws is around
 * the thing being claimed. Everything else, the table, the picker and the cue read-out, is
 * scenery in the context register.
 *
 * Unstriped is a state the subject passes through while not being the term, so the layer
 * declares the honest condition in `data-pose` (SPEC §6): identify refuses to pose the
 * unstriped or hover states and plays on, and the mount state is the striped one. The
 * bands are measured once, from the rows as mounted, before anything is written to them
 * (SPEC §5); switching mode changes no geometry, so nothing ever moves.
 */
export function mount(root: HTMLElement): void {
  const head = `
    <tr>
      <th>Order</th><th>Customer</th><th>Region</th><th>Status</th>
      <th>Ship date</th><th style="text-align: right">Items</th><th style="text-align: right">Total</th>
    </tr>`;

  // No rule between rows: the row cue is the thing being compared, so the table must not
  // supply a second one that every mode would keep.
  const cell = (value: string, extra = '') => `<td style="border-bottom: 0; ${extra}">${value}</td>`;
  const num = 'font-variant-numeric: tabular-nums';

  const body = ROWS.map(
    (row) => `
      <tr data-part="row-${row.key}">
        ${cell(row.order, num)}
        ${cell(row.customer)}
        ${cell(row.region)}
        ${cell(row.status)}
        ${cell(row.ship, num)}
        ${cell(row.items, `text-align: right; ${num}`)}
        ${cell(row.total, `text-align: right; ${num}`)}
      </tr>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 250px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Orders, seven columns</span>
          <span
            class="sp-label"
            data-part="cue"
            data-mode="${START}"
            role="status"
            style="width: 140px; text-align: right; font-size: 12px; white-space: nowrap"
          >${CUE[START]}</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: 452px; overflow: hidden">
            <div data-part="rail" style="position: relative">
              <div
                data-part="stripes"
                data-subject
                data-mode="${START}"
                data-pose="[data-mode=zebra]"
                aria-hidden="true"
                style="position: absolute; left: 0; right: 0; top: 0; height: 0; pointer-events: none"
              >
                <div data-part="bands" style="position: absolute; inset: 0"></div>
              </div>

              <table
                class="sp-table sp-context"
                data-part="table"
                data-mode="${START}"
                style="position: relative; --sp-cell-pad: 4px 8px; font-size: 12px"
              >
                <thead>${head}</thead>
                <tbody>${body}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="sp-stack sp-context" style="align-items: center; gap: 8px; width: 476px">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="picker" data-value="${START}" data-axis="Row shading" data-term="zebra">
          <button class="sp-segment" type="button" data-part="seg-none" value="none" style="padding: 4px 10px; font-size: 12px">Plain</button>
          <button class="sp-segment" type="button" data-part="seg-zebra" value="zebra" style="padding: 4px 10px; font-size: 12px">Zebra</button>
          <button class="sp-segment" type="button" data-part="seg-hover" value="hover" style="padding: 4px 10px; font-size: 12px">Hover band</button>
        </sp-segmented>
        <span
          class="sp-label"
          data-part="note"
          data-mode="${START}"
          role="status"
          style="height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden"
        >${NOTE[START]}</span>
      </div>
    </div>
  `;

  const rail = part(root, 'rail');
  const stripes = part(root, 'stripes');
  const bands = part(root, 'bands');
  const table = part(root, 'table');
  const cue = part(root, 'cue');
  const note = part(root, 'note');

  // Measured from the rows as mounted, before a single band is written: the layer has to
  // land exactly on the rows it shades, and a read after a write would be the old value.
  const boxes = ROWS.map((row) => localBox(part(root, `row-${row.key}`), rail));
  const first = boxes[0];
  const last = boxes[boxes.length - 1];
  if (first && last) {
    stripes.style.top = `${first.top.toFixed(1)}px`;
    stripes.style.height = `${(last.top + last.height - first.top).toFixed(1)}px`;
    bands.innerHTML = boxes
      .map((box, i) =>
        i % 2 === 1
          ? `<div style="position: absolute; left: 0; right: 0; top: ${(box.top - first.top).toFixed(1)}px;
                        height: ${box.height.toFixed(1)}px; background: var(--sp-sunken)"></div>`
          : '',
      )
      .join('');
  }

  const setMode = (mode: string) => {
    if (!MODES.includes(mode)) return;
    stripes.dataset.mode = mode;
    table.dataset.mode = mode;
    if (mode === 'zebra') bands.removeAttribute('hidden');
    else bands.setAttribute('hidden', '');
    cue.dataset.mode = mode;
    cue.textContent = CUE[mode] ?? '';
    note.dataset.mode = mode;
    note.textContent = NOTE[mode] ?? '';
  };

  part(root, 'picker').addEventListener('change', (event) => setMode((event as CustomEvent<string>).detail));

  setMode(START);
}
