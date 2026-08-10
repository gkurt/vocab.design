import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const PLANTS = [
  { key: 'monstera', name: 'Monstera', shelf: 'Shelf A' },
  { key: 'fiddle', name: 'Fiddle leaf fig', shelf: 'Shelf B' },
  { key: 'snake', name: 'Snake plant', shelf: 'Shelf A' },
  { key: 'pothos', name: 'Pothos', shelf: 'Shelf C' },
  { key: 'peace-lily', name: 'Peace lily', shelf: 'Shelf B' },
  { key: 'rubber', name: 'Rubber plant', shelf: 'Shelf C' },
];

/**
 * Search field specimen: the input, the magnifier that identifies it, and the
 * clear control that a query (unlike a value) always earns. The subject is that
 * composite, not the `<input>` alone: the adornments are what make it a search
 * field rather than a text field.
 *
 * The clear control is drawn over the input and the input reserves its room in
 * padding from mount (SPEC §5), so the first keystroke reveals it without moving
 * the caret the reader is typing at. The results keep a fixed box for the same
 * reason: filtering narrows what is inside it and never walks the field up the frame.
 *
 * `role="searchbox"` on a text input rather than `type="search"`: the native type
 * draws a cancel button of its own in Chromium, which would put a second clear
 * glyph beside the one this specimen is about.
 */
export function mount(root: HTMLElement): void {
  const rows = PLANTS.map(
    ({ key, name, shelf }) => `
      <li class="sp-list-item" data-part="result-${key}" data-name="${name.toLowerCase()}">
        <span class="sp-grow">${name}</span>
        <span class="sp-label">${shelf}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 392px; height: 244px">
        <div class="sp-topbar">
          <span class="sp-heading sp-context">Plants</span>
          <div class="sp-grow" data-part="search" data-subject style="position: relative">
            <span aria-hidden="true" data-part="search-icon" style="position: absolute; left: 9px; top: 50%; translate: 0 -50%; display: flex; color: var(--sp-muted)">${icon('search')}</span>
            <input
              class="sp-input"
              data-part="search-input"
              role="searchbox"
              aria-label="Search plants"
              aria-controls="plant-results"
              placeholder="Search plants"
              autocomplete="off"
              spellcheck="false"
              style="padding-left: 31px; padding-right: 29px"
            />
            <button
              class="sp-icon-button"
              data-part="search-clear"
              type="button"
              aria-label="Clear search"
              hidden
              style="position: absolute; right: 3px; top: 50%; translate: 0 -50%; width: 23px; height: 23px"
            >${icon('close')}</button>
          </div>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-row sp-row--between" style="margin-bottom: 8px">
            <span class="sp-label" data-part="count" data-matches="${PLANTS.length}">${PLANTS.length} plants</span>
            <span class="sp-label">All shelves</span>
          </div>
          <div style="height: 132px">
            <ul class="sp-list sp-scroll" id="plant-results" data-part="results" style="height: 100%">${rows}</ul>
            <p class="sp-text" data-part="no-results" hidden style="margin: 0; padding-top: 10px">No plants match that.</p>
          </div>
        </div>
      </div>
    </div>
  `;

  const input = part(root, 'search-input') as HTMLInputElement;
  const clear = part(root, 'search-clear');
  const results = part(root, 'results');
  const noResults = part(root, 'no-results');
  const count = part(root, 'count');
  const items = [...results.children] as HTMLElement[];

  const apply = () => {
    const query = input.value.trim().toLowerCase();
    let matches = 0;
    for (const item of items) {
      const hit = query === '' || (item.dataset.name ?? '').includes(query);
      item.hidden = !hit;
      if (hit) matches++;
    }
    count.dataset.matches = String(matches);
    count.textContent = query === '' ? `${items.length} plants` : `${matches} of ${items.length} plants`;
    results.hidden = matches === 0;
    noResults.hidden = matches > 0;
    clear.hidden = input.value === '';
  };

  input.addEventListener('input', apply);

  // Clearing is one gesture and reaches one state, never a toggle (SPEC §8).
  clear.addEventListener('click', () => {
    input.value = '';
    apply();
  });

  // Escape is the keyboard's version of the clear control, so it reaches the same state.
  input.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || input.value === '') return;
    input.value = '';
    apply();
  });
}
