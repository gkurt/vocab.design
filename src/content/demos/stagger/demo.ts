import { part } from '#src/kit/parts.ts';

const ROWS = [
  { initials: 'AM', name: 'Ada mentioned you' },
  { initials: 'JR', name: 'Jo assigned you a card' },
  { initials: 'PK', name: 'Pia left a comment' },
  { initials: 'TS', name: 'Tomas shared a board' },
  { initials: 'LC', name: 'Lena approved the spec' },
  { initials: 'DW', name: 'Dee closed an issue' },
];

/**
 * Stagger specimen: one entrance, played by each row a beat after the one
 * above. The offset is the term, so the specimen is the whole list, and the
 * replay control lets you watch the cascade again.
 */
export function mount(root: HTMLElement): void {
  const items = ROWS.map(
    (row, index) => `
      <li class="sp-list-item sp-stagger-item" data-part="item-${index + 1}" style="--sp-i: ${index}">
        <span class="sp-avatar">${row.initials}</span>
        <span class="sp-grow sp-text sp-text--ink">${row.name}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app" data-subject>
      <div class="sp-window" style="width: 320px; --sp-stagger: 110ms">
        <div class="sp-row sp-row--between">
          <span class="sp-heading">Notifications</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="replay">Replay</button>
        </div>
        <ul class="sp-list" data-part="list" style="margin-top: 6px">${items}</ul>
      </div>
    </div>
  `;

  part(root, 'replay').addEventListener('click', () => {
    for (const item of root.querySelectorAll<HTMLElement>('.sp-stagger-item')) {
      item.classList.remove('sp-stagger-item');
      void item.offsetWidth; // Force a reflow so the animation restarts rather than continues.
      item.classList.add('sp-stagger-item');
    }
  });
}
