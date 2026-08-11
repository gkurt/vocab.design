import { part } from '#src/kit/parts.ts';

type Item = { name: string; type: 'chairs' | 'tables' | 'lamps'; stock: boolean };
type Value = { id: string; label: string; test: (item: Item) => boolean };
type Group = { id: string; label: string; values: Value[] };

const ITEMS: Item[] = [
  { name: 'Cane chair', type: 'chairs', stock: true },
  { name: 'Bar stool', type: 'chairs', stock: false },
  { name: 'Oak side table', type: 'tables', stock: true },
  { name: 'Walnut desk', type: 'tables', stock: true },
  { name: 'Arc floor lamp', type: 'lamps', stock: true },
  { name: 'Reading lamp', type: 'lamps', stock: false },
];

const GROUPS: Group[] = [
  {
    id: 'type',
    label: 'Type',
    values: [
      { id: 'chairs', label: 'Chairs', test: (item) => item.type === 'chairs' },
      { id: 'tables', label: 'Tables', test: (item) => item.type === 'tables' },
      { id: 'lamps', label: 'Lamps', test: (item) => item.type === 'lamps' },
    ],
  },
  {
    id: 'stock',
    label: 'Availability',
    values: [{ id: 'in-stock', label: 'In stock', test: (item) => item.stock }],
  },
];

const VALUES = GROUPS.flatMap((group) => group.values);

function facetRow(value: Value): string {
  return `
    <div class="sp-row" data-part="facet-${value.id}" data-value="${value.id}" style="cursor: pointer">
      <button class="sp-checkbox" type="button" role="checkbox" aria-checked="false" aria-labelledby="fs-${value.id}" data-part="box-${value.id}"></button>
      <span class="sp-text sp-text--ink sp-grow" id="fs-${value.id}">${value.label}</span>
      <span class="sp-text" data-part="count-${value.id}">0</span>
    </div>`;
}

function groupBlock(group: Group, index: number): string {
  return `
    ${index > 0 ? '<div class="sp-divider" style="margin: 10px 0"></div>' : ''}
    <div class="sp-label">${group.label}</div>
    <div class="sp-stack" style="gap: 7px; margin-top: 6px">${group.values.map(facetRow).join('')}</div>`;
}

/**
 * Faceted search specimen: a rail of attribute groups narrowing a result list,
 * each value carrying the count it would leave. The subject is the rail, not the
 * results and not the frame: a list of things is not the term, and what the word
 * names is the apparatus that cuts it down.
 *
 * A facet row selects rather than toggles, and the applied chip above the results
 * is the only way back out (SPEC §8), so a script resumed at any point lands on
 * the same filter state. Results live in a scroll container and the chip row keeps
 * its height whether it holds chips or not, so narrowing never moves the rail
 * (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 290px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Furniture</span>
          <span class="sp-text" data-part="total" role="status">6 shown</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 12px">
          <div class="sp-surface" data-part="facets" data-subject style="flex: 0 0 auto; width: 152px; padding: 10px 12px">
            ${GROUPS.map(groupBlock).join('')}
          </div>
          <div class="sp-context sp-grow" style="display: flex; flex-direction: column; gap: 8px; min-width: 0">
            <div class="sp-row" data-part="chips" style="flex: 0 0 auto; height: 24px; overflow: hidden"></div>
            <ul class="sp-list sp-scroll sp-surface sp-grow" data-part="results" data-shown="6" style="padding: 0 4px"></ul>
          </div>
        </div>
      </div>
    </div>
  `;

  const chips = part(root, 'chips');
  const results = part(root, 'results');
  const total = part(root, 'total');
  const chosen = new Set<string>();

  /** Every group's constraint but one: what a facet's own count is measured against. */
  const matches = (item: Item, skip?: string): boolean =>
    GROUPS.every((group) => {
      if (group.id === skip) return true;
      const picked = group.values.filter((value) => chosen.has(value.id));
      return picked.length === 0 || picked.some((value) => value.test(item));
    });

  const paint = () => {
    const shown = ITEMS.filter((item) => matches(item));
    results.dataset.shown = String(shown.length);
    results.innerHTML = shown
      .map(
        (item) => `
          <li class="sp-list-item">
            <span class="sp-grow">${item.name}</span>
            <span class="sp-text">${item.stock ? 'In stock' : 'Backordered'}</span>
          </li>`,
      )
      .join('');
    total.textContent = `${shown.length} shown`;

    for (const group of GROUPS) {
      for (const value of group.values) {
        // The number this value would leave if it were the next thing ticked.
        const left = ITEMS.filter((item) => matches(item, group.id) && value.test(item)).length;
        part(root, `count-${value.id}`).textContent = String(left);
        part(root, `box-${value.id}`).setAttribute('aria-checked', String(chosen.has(value.id)));
      }
    }

    const applied = VALUES.filter((value) => chosen.has(value.id));
    chips.innerHTML = applied.length
      ? applied
          .map(
            (value) => `
              <button class="sp-chip" type="button" data-part="chip-${value.id}" data-value="${value.id}" data-selected>
                ${value.label}<span class="sp-chip-remove" aria-hidden="true">✕</span>
              </button>`,
          )
          .join('')
      : '<span class="sp-text" data-part="chips-empty">No filters applied</span>';
  };

  for (const value of VALUES) {
    // The row listens, not the box: the label is part of a checkbox's target, and a
    // synthesized click gets none of the activation a real label would (SPEC §8).
    part(root, `facet-${value.id}`).addEventListener('click', () => {
      // Selects, never flips: the chip above the results owns the way back out.
      if (chosen.has(value.id)) return;
      chosen.add(value.id);
      paint();
    });
  }

  chips.addEventListener('click', (event) => {
    const chip = (event.target as HTMLElement).closest<HTMLElement>('[data-value]');
    if (!chip?.dataset.value) return;
    chosen.delete(chip.dataset.value);
    paint();
  });

  paint();
}
