import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const PAGES = 12;
const PER_PAGE = 5;
/** Slots in the window, held constant so the row cannot change width (SPEC §5). */
const SLOTS = 7;
/** The two indices a gap can ever land on, given a seven-slot window. */
const GAP_AT: Record<number, string> = { 1: 'gap-left', 5: 'gap-right' };

const SUBJECTS = ['Quay survey', 'Tide table', 'Berth plan', 'Cargo manifest', 'Crane log', 'Pilot notes'];
const YEARS = ['2019', '2021', '2022', '2023', '2024'];

const title = (n: number): string => `${SUBJECTS[(n - 1) % SUBJECTS.length]} ${1900 + n}`;
const stamp = (n: number): string => YEARS[(n - 1) % YEARS.length] ?? '';

/** First page, last page, the current page with a neighbour either side, gaps between. */
function windowFor(current: number): (number | 'gap')[] {
  if (PAGES <= SLOTS) return Array.from({ length: PAGES }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, 'gap', PAGES];
  if (current >= PAGES - 3) return [1, 'gap', PAGES - 4, PAGES - 3, PAGES - 2, PAGES - 1, PAGES];
  return [1, 'gap', current - 1, current, current + 1, 'gap', PAGES];
}

/**
 * Pagination specimen: sixty records cut into twelve pages of five, with the numbered
 * row that addresses them. The subject is that row, not the list: appending is what
 * every paging pattern does, and giving each slice a number you can point at is what
 * this one is for.
 *
 * Two things are held still on purpose. The window is always seven slots wide, each a
 * fixed square, so an ellipsis appearing or a two-digit page arriving cannot resize the
 * row; and the result list is five rows of fixed height whose text is rewritten in
 * place, so replacing a page never changes the frame's shape.
 */
export function mount(root: HTMLElement): void {
  const rows = Array.from(
    { length: PER_PAGE },
    (_, i) => `
      <li class="sp-list-item" data-part="row-${i + 1}">
        <span class="sp-grow" data-part="row-${i + 1}-title"></span>
        <span class="sp-text" data-part="row-${i + 1}-stamp"></span>
      </li>`,
  ).join('');

  const slots = Array.from({ length: SLOTS }, (_, i) => {
    const gap = GAP_AT[i]
      ? `<span class="sp-text" data-part="${GAP_AT[i]}" aria-hidden="true" hidden style="width: 30px; text-align: center">…</span>`
      : '';
    return `
      <span style="display: inline-flex; width: 30px; justify-content: center">
        <button
          class="sp-button sp-button--ghost sp-button--sm"
          type="button"
          data-slot="${i}"
          style="width: 30px; padding: 0; text-align: center"
        ></button>
        ${gap}
      </span>`;
  }).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Archive</span>
          <span class="sp-label">60 records</span>
        </div>
        <div class="sp-body sp-context" style="padding: 10px 12px">
          <ul class="sp-list sp-surface" data-part="list" style="padding: 0 4px">${rows}</ul>
        </div>
        <div
          class="sp-row sp-row--between"
          style="flex: 0 0 auto; padding: 8px 12px; border-top: 1px solid var(--sp-line)"
        >
          <span class="sp-text sp-context" data-part="range" role="status" style="width: 108px"></span>
          <nav class="sp-row" data-part="pager" data-subject aria-label="Archive pages" style="gap: 3px">
            <button class="sp-icon-button" type="button" data-part="prev" aria-label="Previous page">
              ${icon('chevronLeft')}
            </button>
            ${slots}
            <button class="sp-icon-button" type="button" data-part="next" aria-label="Next page">
              ${icon('chevronRight')}
            </button>
          </nav>
        </div>
      </div>
    </div>
  `;

  const pager = part(root, 'pager');
  const range = part(root, 'range');
  const prev = part(root, 'prev') as HTMLButtonElement;
  const next = part(root, 'next') as HTMLButtonElement;
  const buttons = [...pager.querySelectorAll<HTMLButtonElement>('button[data-slot]')];
  const gaps = Object.values(GAP_AT).map((name) => part(root, name));
  const cells = Array.from({ length: PER_PAGE }, (_, i) => ({
    row: part(root, `row-${i + 1}`),
    title: part(root, `row-${i + 1}-title`),
    stamp: part(root, `row-${i + 1}-stamp`),
  }));

  let current = 1;

  const draw = () => {
    const first = (current - 1) * PER_PAGE + 1;
    cells.forEach((cell, i) => {
      const n = first + i;
      cell.row.dataset.item = String(n);
      cell.title.textContent = title(n);
      cell.stamp.textContent = stamp(n);
    });
    range.textContent = `${first} to ${first + PER_PAGE - 1} of ${PAGES * PER_PAGE}`;

    for (const gap of gaps) gap.hidden = true;
    windowFor(current).forEach((value, i) => {
      const button = buttons[i];
      if (!button) return;
      if (value === 'gap') {
        button.hidden = true;
        button.removeAttribute('data-part');
        button.removeAttribute('aria-current');
        flag(button, 'data-selected', false);
        const gap = root.querySelector<HTMLElement>(`[data-part="${GAP_AT[i]}"]`);
        if (gap) gap.hidden = false;
        return;
      }
      button.hidden = false;
      button.textContent = String(value);
      button.dataset.part = `page-${value}`;
      button.dataset.page = String(value);
      // The state a screen reader gets, and the state the eye gets, said separately.
      const isCurrent = value === current;
      if (isCurrent) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
      flag(button, 'data-selected', isCurrent);
      button.setAttribute('aria-label', `Page ${value}`);
    });

    prev.disabled = current === 1;
    next.disabled = current === PAGES;
  };

  const goTo = (page: number) => {
    const target = Math.min(Math.max(page, 1), PAGES);
    if (target === current) return;
    current = target;
    draw();
  };

  // Every number is an absolute destination, which is the term: no step reaches a page
  // by flipping whatever it found (SPEC §8).
  for (const button of buttons) button.addEventListener('click', () => goTo(Number(button.dataset.page)));
  prev.addEventListener('click', () => {
    if (!prev.disabled) goTo(current - 1);
  });
  next.addEventListener('click', () => {
    if (!next.disabled) goTo(current + 1);
  });

  draw();
}
