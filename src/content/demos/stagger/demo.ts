import { part } from '#src/kit/parts.ts';

const ROWS = [
  { initials: 'AM', name: 'Ada mentioned you' },
  { initials: 'JR', name: 'Jo assigned you a card' },
  { initials: 'PK', name: 'Pia left a comment' },
  { initials: 'TS', name: 'Tomas shared a board' },
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

  // The offset has to be long enough against the 0.42s entrance to read as a cascade:
  // shorten it much and all four rows are in flight at once, which is a fade-in with
  // extra steps rather than a stagger.
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 320px; --sp-stagger: 180ms">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Notifications</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="replay">Replay</button>
        </div>
        <ul class="sp-list" data-part="list" data-subject style="margin-top: 6px">${items}</ul>
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
