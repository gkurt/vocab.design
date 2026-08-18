import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Written = 'none' | 'scope' | 'headers';

/** Which header cells the focused cell is tied to in each state. */
const TIED: Record<Written, string[]> = {
  none: [],
  scope: ['h-rev3', 'r-nw'],
  headers: ['h-q3', 'h-rev3', 'r-nw'],
};

const SAYS: Record<Written, string> = {
  none: '“42”',
  scope: '“Revenue, Northwest, 42”',
  headers: '“Q3, Revenue, Northwest, 42”',
};

const MARKUP: Record<Written, string> = {
  none: '<td>42</td>',
  scope: '<th scope="col">Revenue</th> … <td>42</td>',
  headers: '<td headers="h-q3 h-rev3 r-nw">42</td>',
};

/** The markup line is shown as text, so its angle brackets go into the template escaped. */
const escapeAngles = (text: string) => text.replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const CAPTION: Record<Written, string> = {
  none: 'Every header here is a real th and it is still bold and grey and nothing else. A visually obvious header is not an associated one.',
  scope: 'scope ties each cell to its own column and row. The quarter spanning two columns above is the level scope alone does not reach.',
  headers: 'id and headers name the headers in the order they should be spoken, which is the only way the spanning quarter comes across.',
};

/**
 * Header association specimen: a two-level table header over a small grid, with a segmented
 * control picking how the association is written. Nothing, then `scope`, then `id` and
 * `headers`. One data cell carries the reader's cursor throughout, the headers it is tied to
 * light up, and a strip shows what the cursor's stop actually announces.
 *
 * The subject is that data cell. The association is a relationship rather than an element, and
 * the cell is where it is verifiable: it is the cell that either says what it is or does not,
 * and in the `headers` state it is the cell that carries the markup. A ring around a header
 * would name a column header, and a ring around the table would name a data table. The picker,
 * the rest of the grid, the markup line, the announcement strip and the caption are scenery
 * (SPEC §5). The table itself stays out of the context register, since the register would reach
 * through it to the subject inside.
 *
 * Writing nothing is the counter-example and it is a state the cell itself passes through, so
 * the honest condition lives in `data-pose` and the mount state satisfies it: identify refuses
 * to ring a cell that is associated with nothing, and plays on (SPEC §6).
 *
 * The attributes are really set, so the subject snapshot records what the cell claims. The cursor
 * is drawn with `data-sim-focus` and nothing calls `.focus()`: attract never moves real focus
 * (SPEC §7), and a screen reader's cursor is not the browser's focus in any case. Each read-out
 * holds its own height and the grid never changes shape, so no state moves anything (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">The association is written with</span>
          <sp-segmented class="sp-segmented" data-part="written" data-value="scope">
            <button class="sp-segment" type="button" data-part="seg-none" value="none"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Nothing</button>
            <button class="sp-segment" type="button" data-part="seg-scope" value="scope"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">scope</button>
            <button class="sp-segment" type="button" data-part="seg-headers" value="headers"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">id and headers</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" style="margin-top: 8px; padding: 8px 10px">
          <table class="sp-table" data-part="grid" style="--sp-cell-pad: 4px 9px; font-size: 12px">
            <caption class="sp-visually-hidden">Revenue and units by region</caption>
            <thead>
              <tr>
                <th data-part="h-corner" rowspan="2"></th>
                <th data-part="h-q3" id="h-q3" colspan="2" style="text-align: center">Q3</th>
                <th data-part="h-q4" id="h-q4" colspan="2" style="text-align: center">Q4</th>
              </tr>
              <tr>
                <th data-part="h-rev3" id="h-rev3">Revenue</th>
                <th data-part="h-units3" id="h-units3">Units</th>
                <th data-part="h-rev4" id="h-rev4">Revenue</th>
                <th data-part="h-units4" id="h-units4">Units</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th data-part="r-nw" id="r-nw">Northwest</th>
                <td data-part="cell" data-subject data-written="scope" data-linked data-pose="[data-linked]"
                    data-sim-focus>42</td>
                <td>610</td>
                <td>51</td>
                <td>705</td>
              </tr>
              <tr>
                <th data-part="r-se" id="r-se">Southeast</th>
                <td>38</td>
                <td>540</td>
                <td>44</td>
                <td>590</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 17px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">The cell is written</span>
          <span class="sp-text sp-text--ink" data-part="markup" data-written="scope"
                style="flex: 0 0 auto; font-size: 11px; white-space: nowrap">${escapeAngles(MARKUP.scope)}</span>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 6px; height: 17px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">The cursor stops here and says</span>
          <span class="sp-text sp-text--ink" data-part="says" data-written="scope"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">${SAYS.scope}</span>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-written="scope"
           style="margin: 7px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${CAPTION.scope}</p>
      </div>
    </div>
  `;

  const cell = part(root, 'cell');
  const markup = part(root, 'markup');
  const says = part(root, 'says');
  const caption = part(root, 'caption');
  const columnHeaders = ['h-rev3', 'h-units3', 'h-rev4', 'h-units4'].map((name) => part(root, name));
  const groupHeaders = ['h-q3', 'h-q4'].map((name) => part(root, name));
  const rowHeaders = ['r-nw', 'r-se'].map((name) => part(root, name));
  const allHeaders = [...columnHeaders, ...groupHeaders, ...rowHeaders];

  const apply = (written: Written) => {
    for (const header of allHeaders) {
      header.removeAttribute('scope');
      header.style.removeProperty('background');
      header.removeAttribute('data-tied');
    }
    cell.removeAttribute('headers');

    if (written === 'scope') {
      for (const header of columnHeaders) header.setAttribute('scope', 'col');
      for (const header of rowHeaders) header.setAttribute('scope', 'row');
    }
    // id and headers on their own: the ids are already on the header cells, and the data cell
    // names the ones that describe it, in the order they should be spoken.
    if (written === 'headers') cell.setAttribute('headers', 'h-q3 h-rev3 r-nw');

    // The headers this one cell is tied to, painted inline: the demo has no stylesheet, and the
    // tint is this term's own claim about which cells are in the announcement.
    for (const name of TIED[written]) {
      const header = part(root, name);
      header.setAttribute('data-tied', '');
      header.style.background = 'var(--sp-accent-soft)';
    }

    cell.dataset.written = written;
    flag(cell, 'data-linked', written !== 'none');
    markup.dataset.written = written;
    markup.textContent = MARKUP[written];
    says.dataset.written = written;
    says.textContent = SAYS[written];
    caption.dataset.written = written;
    caption.textContent = CAPTION[written];
  };

  apply('scope');

  part(root, 'written').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Written);
  });
}
