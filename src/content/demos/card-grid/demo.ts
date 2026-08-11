const CARDS = [
  { title: 'Field notebook', meta: '12 pages' },
  { title: 'Tide log', meta: '4 pages' },
  { title: 'Survey report with a long title', meta: '31 pages' },
  { title: 'Weekly digest', meta: '2 pages' },
  { title: 'Harbour map', meta: '1 page' },
  { title: 'Species index', meta: '18 pages' },
];

/**
 * Card grid specimen: six peers at one width, on rows of one height, in a field
 * whose column count comes from the space rather than from a number. The subject
 * is the grid itself, since the term names the arrangement and not the card.
 *
 * The third title is longer than its cell on purpose: it is clamped to one line,
 * so the tallest content in a row cannot inflate the row (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const cards = CARDS.map(
    (card, index) => `
      <li class="sp-surface" data-part="card-${index + 1}" style="padding: 8px; overflow: hidden">
        <div style="height: 46px; border-radius: 5px; background: var(--sp-sunken)"></div>
        <div class="sp-text sp-text--ink" data-part="title-${index + 1}"
             style="margin-top: 8px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">${card.title}</div>
        <div class="sp-label" style="margin-top: 2px">${card.meta}</div>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 432px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Templates</span>
          <span class="sp-label">6 of 24</span>
        </div>
        <ul
          class="sp-grid"
          data-part="grid"
          data-subject
          style="margin: 12px 0 0; padding: 0; list-style: none; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr))"
        >
          ${cards}
        </ul>
      </div>
    </div>
  `;
}
