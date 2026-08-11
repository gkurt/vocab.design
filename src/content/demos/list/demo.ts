import { flag, part } from '#src/kit/parts.ts';

const PEOPLE = [
  { key: 'ada', initial: 'A', name: 'Ada Whitfield', meta: '2m' },
  { key: 'ben', initial: 'B', name: 'Ben Oyelaran', meta: '14m' },
  { key: 'cai', initial: 'C', name: 'Cai Marchetti', meta: '1h' },
  { key: 'dev', initial: 'D', name: 'Devi Ramachandran', meta: 'Yesterday' },
];

/**
 * List specimen: four rows built from one layout, which is the term. The subject
 * is the list element rather than any row: a single row is an item, and what the
 * word names is the set the shared shape makes out of them.
 *
 * Selection is exclusive and set rather than flipped (SPEC §8), so a pass that
 * starts anywhere lands on the same state.
 */
export function mount(root: HTMLElement): void {
  const rows = PEOPLE.map(
    ({ key, initial, name, meta }) => `
      <li
        class="sp-list-item"
        role="option"
        aria-selected="false"
        data-part="row-${key}"
      >
        <span class="sp-avatar">${initial}</span>
        <span class="sp-grow">${name}</span>
        <span class="sp-text">${meta}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Reviewers</span></div>
        <div class="sp-body" style="padding: 6px">
          <ul class="sp-list" data-part="list" data-subject role="listbox" aria-label="Reviewers">${rows}</ul>
        </div>
      </div>
    </div>
  `;

  const all = PEOPLE.map(({ key }) => part(root, `row-${key}`));
  const select = (row: HTMLElement) => {
    for (const other of all) {
      const on = other === row;
      other.setAttribute('aria-selected', String(on));
      flag(other, 'data-selected', on);
    }
  };

  for (const row of all) row.addEventListener('click', () => select(row));
}
