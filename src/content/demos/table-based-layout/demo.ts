import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const WIDTH = 396;
/** Outlines rather than borders: an outline takes no room, so revealing the scaffolding
    cannot move the layout it is drawn on (SPEC §5). */
const OUTER = '2px solid var(--sp-accent)';
const CELL = '2px dashed var(--sp-accent)';
const NESTED = '2px dashed var(--sp-muted)';

const line = (width: string, height = '6px') => `<div class="sp-line" style="width: ${width}; height: ${height}"></div>`;

/**
 * Table-based layout specimen: a mail body built the way mail is still built, out of
 * one outer table with a second table inside a cell for the two-up row and a third
 * around the button, then the same layout with its scaffolding drawn on.
 *
 * Every width is an attribute and every gap is `cellpadding`, which is the technique
 * rather than a stylistic choice, and every table carries `role="presentation"` so the
 * markup stops claiming to be tabular data. The counts in the legend are read off the
 * DOM at mount, so the specimen states what it actually built.
 *
 * The subject is the outer layout table. The term names that table, not the mail's
 * contents and not the reveal control, and the scaffolding is annotation drawn on the
 * cells rather than a layer of its own. Both states are the same layout, so identify
 * has no dishonest state to refuse.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 440px; padding: 12px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-axis="Scaffolding" data-part="segmented" data-value="off">
            <button class="sp-segment" data-part="seg-off" value="off">Hidden</button>
            <button class="sp-segment" data-part="seg-on" value="on">Drawn</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="justify-content: center; margin-top: 10px">
          <table
            data-part="layout"
            data-subject
            data-scaffold="off"
            role="presentation"
            width="${WIDTH}"
            cellpadding="8"
            cellspacing="0"
            border="0"
            style="width: ${WIDTH}px; border-collapse: collapse; background: var(--sp-surface)"
          >
            <tbody>
              <tr>
                <td data-part="cell-head" style="border-bottom: 1px solid var(--sp-line)">
                  <span class="sp-label" style="color: var(--sp-ink); font-weight: 600; font-size: 12px">Northwind weekly</span>
                </td>
              </tr>
              <tr>
                <td data-part="cell-hero" align="center">
                  <div class="sp-stack" style="gap: 6px; align-items: center">
                    ${line('72%')}
                    ${line('48%')}
                    <table data-part="button" role="presentation" cellpadding="7" cellspacing="0" border="0"
                           style="margin-top: 4px; border-collapse: collapse">
                      <tbody><tr>
                        <td data-part="cell-button" bgcolor="#2F57D8" align="center" width="132" style="border-radius: 6px">
                          <span style="color: #FFFFFF; font-size: 12px; font-weight: 600">Read the issue</span>
                        </td>
                      </tr></tbody>
                    </table>
                  </div>
                </td>
              </tr>
              <tr>
                <td data-part="cell-columns" style="border-top: 1px solid var(--sp-line)">
                  <table data-part="inner" role="presentation" width="100%" cellpadding="6" cellspacing="0" border="0"
                         style="width: 100%; border-collapse: collapse">
                    <tbody><tr>
                      <td data-part="cell-left" width="50%" valign="top">
                        <div class="sp-stack" style="gap: 5px">${line('100%')}${line('84%')}${line('62%')}</div>
                      </td>
                      <td data-part="cell-right" width="50%" valign="top">
                        <div class="sp-stack" style="gap: 5px">${line('100%')}${line('76%')}${line('54%')}</div>
                      </td>
                    </tr></tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td data-part="cell-foot" align="center" style="border-top: 1px solid var(--sp-line)">
                  <span class="sp-label" style="font-size: 10px">Northwind, 12 Quay Street</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px">
          <span class="sp-text" data-part="legend" style="font-size: 11px"></span>
        </div>
      </div>
    </div>
  `;

  const layout = part(root, 'layout');
  const legend = part(root, 'legend');
  const nested = [...layout.querySelectorAll('table')];
  const cells = [...layout.querySelectorAll('td')];
  const outerCells = cells.filter((cell) => cell.closest('table') === layout);
  const roles = [layout, ...nested].filter((table) => table.getAttribute('role') === 'presentation').length;

  const apply = (mode: string) => {
    const on = mode === 'on';
    layout.dataset.scaffold = on ? 'on' : 'off';
    layout.style.outline = on ? OUTER : 'none';
    for (const table of nested) {
      table.style.outline = on ? NESTED : 'none';
      table.style.outlineOffset = '-1px';
    }
    // Inset, so two cells sharing an edge draw two rings rather than one thick band.
    for (const cell of cells) {
      cell.style.outline = on ? (outerCells.includes(cell) ? CELL : NESTED) : 'none';
      cell.style.outlineOffset = '-4px';
    }
    legend.textContent = on
      ? `${nested.length + 1} tables, ${cells.length} cells, role="presentation" on all ${roles} of them.`
      : 'A mail body: one header, a hero, two columns and a footer.';
  };
  apply('off');

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
