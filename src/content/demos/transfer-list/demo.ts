import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

type Side = 'available' | 'chosen';

const ITEMS: { key: string; label: string; side: Side }[] = [
  { key: 'region', label: 'Region', side: 'available' },
  { key: 'channel', label: 'Channel', side: 'available' },
  { key: 'discount', label: 'Discount', side: 'available' },
  { key: 'refunds', label: 'Refunds', side: 'available' },
  { key: 'date', label: 'Date', side: 'chosen' },
  { key: 'revenue', label: 'Revenue', side: 'chosen' },
  { key: 'orders', label: 'Orders', side: 'chosen' },
];

const SIDES: Side[] = ['available', 'chosen'];

const options = (side: Side): string =>
  ITEMS.filter((item) => item.side === side)
    .map(
      (item) =>
        `<li class="sp-option" role="option" aria-selected="false" data-part="opt-${item.key}" data-in="${item.side}">${item.label}</li>`,
    )
    .join('');

const column = (side: Side, label: string, count: number): string => `
  <div class="sp-stack" style="flex: 1 1 0; gap: 4px; min-width: 0">
    <span class="sp-label">${label} (<span data-part="count-${side}">${count}</span>)</span>
    <ul
      class="sp-listbox sp-listbox--static"
      role="listbox"
      aria-label="${label} columns"
      data-part="list-${side}"
      style="height: 140px; max-height: 140px"
    >${options(side)}</ul>
  </div>`;

/**
 * Transfer list specimen: the pool on the left, the chosen set on the right, and the
 * two buttons that carry an item across. The subject is the whole group, because the
 * term names the arrangement rather than either list: a listbox on its own is a
 * listbox, and what makes this a transfer list is having a second one to move into.
 *
 * Each list holds a fixed height, so a list losing or gaining a row never resizes the
 * other one, and the counts sit in text where a move can be read rather than counted
 * (SPEC §5). Selection is single and absolute: a click selects the row it landed on,
 * so a pass resumed halfway still moves the item the script meant.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Report columns</span>
          <span class="sp-text">7 fields</span>
        </div>
        <div class="sp-body">
          <div class="sp-row" data-part="transfer" data-subject style="align-items: stretch; gap: 10px">
            ${column('available', 'Available', 4)}
            <div class="sp-stack" style="justify-content: center; gap: 6px; flex: 0 0 auto">
              <button
                class="sp-icon-button"
                type="button"
                data-part="move-right"
                aria-disabled="true"
                aria-label="Move to chosen"
              >${icon('chevronRight')}</button>
              <button
                class="sp-icon-button"
                type="button"
                data-part="move-left"
                aria-disabled="true"
                aria-label="Move to available"
              >${icon('chevronLeft')}</button>
            </div>
            ${column('chosen', 'Chosen', 3)}
          </div>
        </div>
      </div>
    </div>
  `;

  const cells = new Map(ITEMS.map((item) => [item.key, part(root, `opt-${item.key}`)]));
  const lists: Record<Side, HTMLElement> = { available: part(root, 'list-available'), chosen: part(root, 'list-chosen') };
  const counts: Record<Side, HTMLElement> = { available: part(root, 'count-available'), chosen: part(root, 'count-chosen') };
  const buttons: Record<Side, HTMLElement> = { available: part(root, 'move-left'), chosen: part(root, 'move-right') };
  let selected: string | undefined;

  const sideOf = (key: string): Side => (cells.get(key)?.dataset.in === 'chosen' ? 'chosen' : 'available');

  const render = () => {
    for (const [key, cell] of cells) cell.setAttribute('aria-selected', String(key === selected));
    for (const side of SIDES) {
      counts[side].textContent = String([...cells.values()].filter((cell) => cell.dataset.in === side).length);
      // Spent, not gone: a move button keeps its place and says why it cannot be used.
      const live = selected !== undefined && sideOf(selected) !== side;
      buttons[side].setAttribute('aria-disabled', String(!live));
    }
  };

  // A move reaches a side rather than swapping sides, so a repeated pass lands an item
  // where the script says it goes whichever list it started in (SPEC §8).
  const move = (to: Side) => {
    if (selected === undefined) return;
    const cell = cells.get(selected);
    if (!cell || cell.dataset.in === to) return;
    lists[to].append(cell);
    cell.dataset.in = to;
    selected = undefined;
    render();
  };

  for (const [key, cell] of cells) {
    cell.addEventListener('click', () => {
      selected = key;
      render();
    });
  }

  buttons.chosen.addEventListener('click', () => move('chosen'));
  buttons.available.addEventListener('click', () => move('available'));

  render();
}
