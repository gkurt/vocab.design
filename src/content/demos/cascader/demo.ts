import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const COL_W = 116;
const COL_H = 98;
const PANEL_PAD = 4;

const key = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const REGIONS = [
  {
    name: 'United States',
    states: [
      { name: 'California', cities: ['Oakland', 'Fresno', 'San Jose'] },
      { name: 'Texas', cities: ['Austin', 'Dallas', 'El Paso'] },
    ],
  },
  {
    name: 'Canada',
    states: [
      { name: 'Ontario', cities: ['Ottawa', 'Kingston'] },
      { name: 'Quebec', cities: ['Laval', 'Gatineau'] },
    ],
  },
  {
    name: 'Mexico',
    states: [
      { name: 'Jalisco', cities: ['Zapopan', 'Tonala'] },
      { name: 'Sonora', cities: ['Hermosillo', 'Guaymas'] },
    ],
  },
];

/** How wide the panel is with `levels` columns showing: the growth is the term, and the panel
 *  is out of flow, so it can widen without moving anything (SPEC §5). */
const panelWidth = (levels: number) => PANEL_PAD * 2 + COL_W * levels + (levels - 1);

/**
 * Cascader specimen: one field holding one value, where the value is a path. Pressing the field
 * opens the first level; choosing a country opens the states beside it, already filtered, and
 * choosing a state opens its cities. Picking a leaf commits the whole path into the field and
 * closes the panel, and reopening restores every level of that path rather than starting over.
 *
 * The subject is the panel, the levels themselves: the field is a select's field and the row of
 * options in one column is a listbox, and what the word names is the set of levels that open one
 * out of another. Identify summons it, since the panel is closed at rest, and its `data-pose`
 * asks for at least two levels: a panel showing one column is not yet visibly a cascade, and a
 * ring around it would identify a plain listbox (SPEC §6). The window chrome, the field and the
 * confirmation line are scenery.
 *
 * The panel is out of flow and grows rightwards as levels arrive, which is the term's own size
 * change contained where it belongs; the columns share one fixed height, so a state with two
 * cities is the same box as one with three. One delegated listener reads `data-level` off the
 * row, so a rebuilt column never needs rebinding and nothing synthesizes a second click
 * (SPEC §8). Every pick names a level outright rather than toggling it, and the evidence a
 * commit leaves is on the field's own path readout, never on an option inside the panel the
 * commit has just closed (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 286px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Shipping address</span>
          <span class="sp-label" style="font-size: 11px">One field, one path</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 14px 16px">
          <span class="sp-label sp-context" id="vd-cascader-label" style="font-size: 11px">Region</span>

          <div style="position: relative; flex: 0 0 auto; width: 306px">
            <button
              class="sp-button sp-button--ghost sp-row sp-row--between"
              type="button"
              data-part="field"
              role="combobox"
              aria-haspopup="tree"
              aria-expanded="false"
              aria-labelledby="vd-cascader-label"
              style="width: 100%; gap: 8px; font-size: 12.5px"
            >
              <span
                class="sp-grow"
                data-part="path"
                data-depth="0"
                data-value="none"
                style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: left; color: var(--sp-muted)"
                >Choose a region</span
              >
              ${icon('chevronDown')}
            </button>

            <div
              class="sp-popover"
              data-part="panel"
              data-subject
              data-pose="[data-levels='2'], [data-levels='3']"
              data-levels="1"
              role="tree"
              aria-label="Region"
              style="min-width: 0; width: ${panelWidth(1)}px; left: 0; top: calc(100% + 8px); padding: ${PANEL_PAD}px;
                     --sp-arrow-x: 18px; transition: width 0.2s var(--sp-ease), opacity 0.18s, visibility 0.18s, transform 0.18s var(--sp-ease)"
            >
              <div class="sp-row" style="gap: 0; align-items: stretch">
                <ul
                  class="sp-list sp-scroll"
                  data-part="col-1"
                  role="group"
                  style="flex: 0 0 auto; width: ${COL_W}px; height: ${COL_H}px; margin: 0; padding: 0; list-style: none"
                ></ul>
                <ul
                  class="sp-list sp-scroll"
                  data-part="col-2"
                  role="group"
                  hidden
                  style="flex: 0 0 auto; width: ${COL_W}px; height: ${COL_H}px; margin: 0; padding: 0 0 0 1px; list-style: none;
                         border-left: 1px solid var(--sp-line)"
                ></ul>
                <ul
                  class="sp-list sp-scroll"
                  data-part="col-3"
                  role="group"
                  hidden
                  style="flex: 0 0 auto; width: ${COL_W}px; height: ${COL_H}px; margin: 0; padding: 0 0 0 1px; list-style: none;
                         border-left: 1px solid var(--sp-line)"
                ></ul>
              </div>
            </div>
          </div>

          <span class="sp-grow"></span>

          <div class="sp-row sp-context" style="gap: 8px; flex: 0 0 auto">
            <span class="sp-label" style="font-size: 11px; white-space: nowrap">Delivers to</span>
            <span
              class="sp-text sp-text--ink"
              data-part="delivers"
              data-city="none"
              style="flex: 1 1 auto; min-width: 0; height: 18px; font-size: 12px; line-height: 18px; white-space: nowrap; overflow: hidden"
              >Nowhere yet</span
            >
          </div>
        </div>
      </div>
    </div>
  `;

  const field = part(root, 'field');
  const panel = part(root, 'panel');
  const path = part(root, 'path');
  const delivers = part(root, 'delivers');
  const cols = [1, 2, 3].map((index) => part(root, `col-${index}`));

  /** The chosen name at each level; an empty string is "nothing chosen here yet". */
  const chosen = ['', '', ''];

  const row = (level: number, name: string, selected: boolean, more: boolean) => `
    <li
      class="sp-option"
      data-part="opt-${key(name)}"
      data-level="${level}"
      data-name="${name}"
      role="treeitem"
      aria-selected="${selected}"
      style="display: flex; align-items: center; gap: 6px; padding: 5px 7px; font-size: 12px; cursor: pointer"
    >
      <span class="sp-grow" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${name}</span>
      ${more ? `<span style="display: flex; flex: 0 0 auto; color: var(--sp-muted)">${icon('chevronRight')}</span>` : ''}
    </li>`;

  const render = () => {
    const region = REGIONS.find((entry) => entry.name === chosen[0]);
    const state = region?.states.find((entry) => entry.name === chosen[1]);
    const levels = state ? 3 : region ? 2 : 1;

    const bodies = [
      REGIONS.map((entry) => row(1, entry.name, entry.name === chosen[0], true)).join(''),
      (region?.states ?? []).map((entry) => row(2, entry.name, entry.name === chosen[1], true)).join(''),
      (state?.cities ?? []).map((city) => row(3, city, city === chosen[2], false)).join(''),
    ];

    for (const [index, col] of cols.entries()) {
      col.innerHTML = bodies[index] ?? '';
      col.toggleAttribute('hidden', index + 1 > levels);
    }

    panel.dataset.levels = String(levels);
    panel.style.width = `${panelWidth(levels)}px`;
  };

  const setOpen = (open: boolean) => {
    flag(panel, 'data-open', open);
    field.setAttribute('aria-expanded', String(open));
  };

  const commit = () => {
    const full = chosen.filter(Boolean).join(' / ');
    path.dataset.depth = String(chosen.filter(Boolean).length);
    path.dataset.value = key(chosen[2] ?? '') || 'none';
    path.textContent = full;
    path.style.color = 'var(--sp-ink)';
    delivers.dataset.city = key(chosen[2] ?? '') || 'none';
    delivers.textContent = full;
    setOpen(false);
  };

  // One delegated listener: a rebuilt column never needs rebinding (SPEC §8).
  panel.addEventListener('click', (event) => {
    const option = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-level]');
    if (!option) return;
    const level = Number(option.dataset.level);
    chosen[level - 1] = option.dataset.name ?? '';
    // Choosing at one level clears the levels below it: the next column is filtered, not stale.
    for (let deeper = level; deeper < chosen.length; deeper += 1) chosen[deeper] = '';
    render();
    if (level === 3) commit();
  });

  // The field only ever opens; the panel is dismissed by committing a leaf or pressing away.
  field.addEventListener('click', () => setOpen(true));
  root.addEventListener('pointerdown', (event) => {
    const target = event.target as Node;
    if (!panel.contains(target) && !field.contains(target)) setOpen(false);
  });
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  render();
}
