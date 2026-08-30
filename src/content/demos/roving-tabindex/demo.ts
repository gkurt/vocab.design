import { part } from '#src/kit/parts.ts';

const ITEMS = [
  { key: 'left', label: 'Left' },
  { key: 'center', label: 'Center' },
  { key: 'right', label: 'Right' },
  { key: 'justify', label: 'Justify' },
];

const ITEM = [
  'display: flex',
  'flex-direction: column',
  'align-items: center',
  'gap: 2px',
  'width: 74px',
  'padding: 6px 0',
  'cursor: pointer',
].join('; ');

const SAMPLE = 'The ferry leaves at seven, weather permitting, and the harbour master posts any delay on the noticeboard by six.';

/**
 * Roving tabindex specimen: a toolbar whose four items share one tab stop. The number
 * under each item is its live `tabindex`, so the invariant the technique rests on is on
 * screen: exactly one zero, everything else minus one, and the arrow keys move the zero.
 *
 * The subject is the toolbar, since the term names the group's focus arrangement rather
 * than any one item in it. The items are `div`s with an explicit role: the whole point is
 * that only one of them is in the tab sequence, and a real `<button>` would be reachable
 * by Tab whatever its tabindex said.
 *
 * Two pieces of the site's own commentary have gone. A row of chips under the sample drew the
 * page's tab order for the reader ("Tab order: Search · Alignment, one stop · Save"), which no
 * editor prints about itself, and the title bar carried a running note of the invariant
 * ("tabindex 0 on Left", "Applied align left"). The number under each item is the invariant,
 * live and taken from the same line that sets the attribute, so neither was telling the reader
 * anything the toolbar was not already showing.
 *
 * Focus is simulated, never taken (SPEC §7): the ring is the kit's `data-sim-focus`, so a
 * reader scrolling past never has their keyboard stolen. Pressing an item moves the zero
 * onto it as well as running its command, because a reader who clicks and then presses an
 * arrow expects to carry on from where they clicked. Every item holds a fixed width, so
 * the number changing between "0" and "-1" cannot move the row (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const items = ITEMS.map(
    ({ key, label }, index) => `
      <div
        class="sp-button sp-button--quiet sp-button--sm"
        role="button"
        aria-label="Align ${label.toLowerCase()}"
        tabindex="${index === 0 ? '0' : '-1'}"
        data-part="item-${key}"
        style="${ITEM}"
      >
        <span>${label}</span>
        <span class="sp-label" data-part="index-${key}" style="width: 100%; text-align: center">${index === 0 ? '0' : '-1'}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Format</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px">
          <div
            class="sp-row sp-surface"
            role="toolbar"
            aria-label="Alignment"
            data-part="toolbar"
            data-subject
            style="gap: 6px; padding: 4px"
          >${items}</div>
          <p class="sp-prose" data-part="sample" data-align="left" style="width: 306px; margin: 0; --sp-measure: 48ch; text-align: left">${SAMPLE}</p>
        </div>
      </div>
    </div>
  `;

  const sample = part(root, 'sample');
  const cells = ITEMS.map(({ key }) => part(root, `item-${key}`));
  const numbers = ITEMS.map(({ key }) => part(root, `index-${key}`));

  let at = 0;

  const rove = (next: number) => {
    at = Math.min(Math.max(next, 0), cells.length - 1);
    for (const [index, cell] of cells.entries()) {
      const active = index === at;
      // The invariant, written twice on purpose: the attribute the browser reads and the
      // number the reader reads can never disagree, because both come from this line.
      cell.tabIndex = active ? 0 : -1;
      const number = numbers[index];
      if (number) number.textContent = active ? '0' : '-1';
      if (active) cell.setAttribute('data-sim-focus', '');
      else cell.removeAttribute('data-sim-focus');
    }
  };

  const apply = (index: number) => {
    const item = ITEMS[index];
    if (!item) return;
    sample.dataset.align = item.key;
    sample.style.textAlign = item.key;
  };

  rove(0);

  for (const [index, cell] of cells.entries()) {
    cell.addEventListener('click', () => {
      rove(index);
      apply(index);
    });
  }

  root.addEventListener('keydown', (event) => {
    const { key } = event;
    if (key === 'ArrowRight' || key === 'ArrowDown') rove(at + 1);
    else if (key === 'ArrowLeft' || key === 'ArrowUp') rove(at - 1);
    else if (key === 'Home') rove(0);
    else if (key === 'End') rove(cells.length - 1);
    else if (key === 'Enter' || key === ' ') apply(at);
    else return;
    // The group has handled the key, so the page must not also scroll on it.
    event.preventDefault();
  });
}
