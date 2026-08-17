import { part } from '#src/kit/parts.ts';

type Band = 'under50' | 'mid' | 'over100';
type Item = { name: string; cat: 'boots' | 'jackets' | 'packs'; band: Band; brand: 'fjord' | 'tarn'; price: string };
type Option = { id: string; label: string; short: string; test: (item: Item) => boolean };
type Group = { id: string; label: string; kind: 'checkbox' | 'radio'; options: Option[] };

const ITEMS: Item[] = [
  { name: 'Fell boot', cat: 'boots', band: 'over100', brand: 'fjord', price: '£145' },
  { name: 'Scree boot', cat: 'boots', band: 'mid', brand: 'tarn', price: '£88' },
  { name: 'Tor boot', cat: 'boots', band: 'under50', brand: 'fjord', price: '£42' },
  { name: 'Bog boot', cat: 'boots', band: 'under50', brand: 'fjord', price: '£38' },
  { name: 'Ridge jacket', cat: 'jackets', band: 'over100', brand: 'fjord', price: '£210' },
  { name: 'Gale jacket', cat: 'jackets', band: 'mid', brand: 'tarn', price: '£74' },
  { name: 'Mist jacket', cat: 'jackets', band: 'mid', brand: 'fjord', price: '£96' },
  { name: 'Squall jacket', cat: 'jackets', band: 'under50', brand: 'tarn', price: '£45' },
  { name: 'Crag pack', cat: 'packs', band: 'mid', brand: 'tarn', price: '£65' },
  { name: 'Cairn pack', cat: 'packs', band: 'under50', brand: 'tarn', price: '£29' },
  { name: 'Beck pack', cat: 'packs', band: 'over100', brand: 'fjord', price: '£118' },
  { name: 'Slate pack', cat: 'packs', band: 'over100', brand: 'tarn', price: '£132' },
];

const GROUPS: Group[] = [
  {
    id: 'cat',
    label: 'Category',
    kind: 'checkbox',
    options: [
      { id: 'boots', label: 'Boots', short: 'Boots', test: (i) => i.cat === 'boots' },
      { id: 'jackets', label: 'Jackets', short: 'Jackets', test: (i) => i.cat === 'jackets' },
      { id: 'packs', label: 'Packs', short: 'Packs', test: (i) => i.cat === 'packs' },
    ],
  },
  {
    id: 'price',
    label: 'Price',
    kind: 'radio',
    options: [
      { id: 'under50', label: 'Under £50', short: 'Under £50', test: (i) => i.band === 'under50' },
      { id: 'mid', label: '£50 to £100', short: '£50 to £100', test: (i) => i.band === 'mid' },
      { id: 'over100', label: 'Over £100', short: 'Over £100', test: (i) => i.band === 'over100' },
    ],
  },
  {
    id: 'brand',
    label: 'Brand',
    kind: 'checkbox',
    options: [
      { id: 'fjord', label: 'Fjordline', short: 'Fjordline', test: (i) => i.brand === 'fjord' },
      { id: 'tarn', label: 'Tarn', short: 'Tarn', test: (i) => i.brand === 'tarn' },
    ],
  },
];

const OPTIONS = GROUPS.flatMap((group) => group.options.map((option) => [group, option] as const));

const control = (group: Group, option: Option) =>
  group.kind === 'checkbox'
    ? `<button class="sp-checkbox" type="button" role="checkbox" aria-checked="false" aria-label="${option.label}" data-part="box-${option.id}"></button>`
    : `<span
         data-part="box-${option.id}"
         role="radio"
         aria-checked="false"
         aria-label="${option.label}"
         style="display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 16px; height: 16px;
                border: 1px solid var(--sp-line); border-radius: 50%; background: var(--sp-surface)"
       ><span data-part="dot-${option.id}" style="width: 8px; height: 8px; border-radius: 50%; background: var(--sp-accent); opacity: 0"></span></span>`;

const row = (group: Group, option: Option) => `
  <div class="sp-row" data-part="facet-${option.id}" data-value="${option.id}" style="gap: 7px; height: 16px; cursor: pointer">
    ${control(group, option)}
    <span class="sp-grow" style="font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${option.label}</span>
    <span class="sp-text" data-part="count-${option.id}" style="flex: 0 0 auto; font-size: 11px; font-variant-numeric: tabular-nums">0</span>
  </div>`;

const block = (group: Group, index: number) => `
  <div class="sp-stack" style="gap: 4px; ${index > 0 ? 'margin-top: 9px' : ''}">
    <span class="sp-label" style="font-size: 11px; line-height: 13px">${group.label}</span>
    <div class="sp-stack" style="gap: 4px">${group.options.map((option) => row(group, option)).join('')}</div>
  </div>`;

/**
 * Faceted filter specimen: the panel itself, three groups deep, each option carrying the
 * number of results it would leave, beside the list it is cutting down.
 *
 * The subject is the facet rail: the grouped set of options is what the word names, not the
 * results it narrows and not the two pane scene around them. The applied chips, the Clear
 * all, the result list and the window chrome are scenery in the context register.
 *
 * The counts are computed the way a real facet count is, with every other group's
 * constraints applied but not its own, so what a row promises is what ticking it delivers.
 * An option that would leave nothing goes `aria-disabled` rather than disappearing, which
 * is both the honest behaviour and what keeps the rail from reflowing under the pointer.
 *
 * A facet row only ever selects (SPEC §8): the chips and Clear all own the way back out, so
 * a pass resumed at any point lands on the same filter state. The chip row and the rail both
 * keep their box whether they hold anything or not, so narrowing moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 306px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Outdoor gear</span>
          <span class="sp-text" data-part="total" role="status" style="font-size: 12px">12 results</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 12px">
          <div
            class="sp-surface"
            data-part="facets"
            data-subject
            role="group"
            aria-label="Filters"
            style="flex: 0 0 auto; width: 200px; padding: 10px 11px; overflow: hidden"
          >
            ${GROUPS.map(block).join('')}
          </div>
          <div class="sp-context sp-grow" style="display: flex; flex-direction: column; gap: 8px; min-width: 0">
            <div class="sp-row" style="flex: 0 0 auto; height: 24px; gap: 6px">
              <div class="sp-row" data-part="chips" style="flex: 1 1 auto; min-width: 0; gap: 5px; overflow: hidden"></div>
              <button
                class="sp-button sp-button--ghost sp-button--sm"
                type="button"
                data-part="clear"
                style="flex: 0 0 auto; padding: 3px 8px; font-size: 11px"
              >Clear all</button>
            </div>
            <ul class="sp-list sp-scroll sp-surface sp-grow" data-part="results" data-shown="12" style="min-height: 0; padding: 0 4px"></ul>
          </div>
        </div>
      </div>
    </div>
  `;

  const chips = part(root, 'chips');
  const results = part(root, 'results');
  const total = part(root, 'total');
  /** One value per single-select group, a set of values per multi-select one. */
  const chosen = new Map<string, Set<string>>(GROUPS.map((group) => [group.id, new Set<string>()]));

  const picked = (group: Group) => chosen.get(group.id) ?? new Set<string>();

  /** Every group's constraint but one: what a facet's own count is measured against. */
  const matches = (item: Item, skip?: string): boolean =>
    GROUPS.every((group) => {
      if (group.id === skip) return true;
      const on = group.options.filter((option) => picked(group).has(option.id));
      return on.length === 0 || on.some((option) => option.test(item));
    });

  const paint = () => {
    const shown = ITEMS.filter((item) => matches(item));
    results.dataset.shown = String(shown.length);
    results.innerHTML = shown
      .map(
        (item) => `
          <li class="sp-list-item" style="padding: 6px 8px; gap: 6px; font-size: 12px">
            <span class="sp-grow" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${item.name}</span>
            <span class="sp-text" style="flex: 0 0 auto; font-size: 11px">${item.price}</span>
          </li>`,
      )
      .join('');
    total.textContent = `${shown.length} result${shown.length === 1 ? '' : 's'}`;

    for (const [group, option] of OPTIONS) {
      const left = ITEMS.filter((item) => matches(item, group.id) && option.test(item)).length;
      const on = picked(group).has(option.id);
      const facet = part(root, `facet-${option.id}`);
      const box = part(root, `box-${option.id}`);
      part(root, `count-${option.id}`).textContent = String(left);
      box.setAttribute('aria-checked', String(on));
      // Zero would leave nothing, so the row says so rather than vanishing.
      facet.setAttribute('aria-disabled', String(left === 0 && !on));
      facet.style.opacity = left === 0 && !on ? '0.45' : '1';
      facet.style.cursor = left === 0 && !on ? 'not-allowed' : 'pointer';
      if (group.kind === 'radio') {
        part(root, `dot-${option.id}`).style.opacity = on ? '1' : '0';
        box.style.borderColor = on ? 'var(--sp-accent)' : 'var(--sp-line)';
      }
    }

    const applied = OPTIONS.filter(([group, option]) => picked(group).has(option.id));
    chips.innerHTML = applied.length
      ? applied
          .map(
            ([, option]) => `
              <button class="sp-chip" type="button" data-part="chip-${option.id}" data-value="${option.id}" data-selected style="padding: 2px 7px; font-size: 11px">
                ${option.short}<span class="sp-chip-remove" aria-hidden="true">✕</span>
              </button>`,
          )
          .join('')
      : '<span class="sp-text" data-part="chips-empty" style="font-size: 11px">No filters applied</span>';
  };

  for (const [group, option] of OPTIONS) {
    // The row listens, not the box: a label is part of a checkbox's target, and a
    // synthesized click gets none of the activation a real label would (SPEC §8).
    part(root, `facet-${option.id}`).addEventListener('click', () => {
      const on = picked(group);
      if (on.has(option.id)) return;
      if (ITEMS.filter((item) => matches(item, group.id) && option.test(item)).length === 0) return;
      // Single-select groups replace; multi-select ones add. Neither ever unticks:
      // the chips and Clear all own the way back out.
      if (group.kind === 'radio') on.clear();
      on.add(option.id);
      paint();
    });
  }

  chips.addEventListener('click', (event) => {
    const chip = (event.target as HTMLElement).closest<HTMLElement>('[data-value]');
    const value = chip?.dataset.value;
    if (!value) return;
    for (const set of chosen.values()) set.delete(value);
    paint();
  });

  part(root, 'clear').addEventListener('click', () => {
    for (const set of chosen.values()) set.clear();
    paint();
  });

  paint();
}
