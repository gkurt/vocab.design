import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long the next batch takes to arrive. */
const FETCH_MS = 700;
const BATCH = 4;

const PEOPLE = [
  ['Ada M.', 'Design'],
  ['Bo T.', 'Design'],
  ['Cy R.', 'Platform'],
  ['Dee L.', 'Support'],
  ['Eli K.', 'Platform'],
  ['Fay N.', 'Design'],
  ['Gil A.', 'Research'],
  ['Hana P.', 'Support'],
  ['Ivo S.', 'Platform'],
  ['Jo W.', 'Research'],
  ['Kit B.', 'Design'],
  ['Lior D.', 'Support'],
] as const;

const LABEL = { rest: 'Load more', busy: 'Loading…', done: 'All 12 loaded' } as const;

function row(index: number): string {
  const [name, team] = PEOPLE[index] ?? ['', ''];
  return `
    <li class="sp-list-item" data-part="row-${index + 1}">
      <span class="sp-avatar">${name.slice(0, 1)}</span>
      <span class="sp-grow">${name}</span>
      <span class="sp-text">${team}</span>
    </li>`;
}

/**
 * Load more specimen: a list that ends in a button rather than in more list. The
 * subject is the button, since that is the whole term: appending is what every
 * paging pattern does, and asking first is what this one is called for.
 *
 * The batch lands inside the scroll container, so the button and the count below
 * it never move, and the button holds the width of its widest label from mount
 * (SPEC §5) so it cannot resize as it changes what it says.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Members</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <ul class="sp-list sp-scroll sp-surface sp-grow sp-context" data-part="list" style="padding: 0 4px">
            ${[0, 1, 2, 3].map(row).join('')}
          </ul>
          <div class="sp-row sp-row--between">
            <span class="sp-text sp-context" data-part="count" role="status">4 of ${PEOPLE.length}</span>
            <button class="sp-button sp-button--sm" data-part="more" data-subject type="button">${LABEL.rest}</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const list = part(root, 'list');
  const count = part(root, 'count');
  const more = part(root, 'more') as HTMLButtonElement;

  let reserved = 0;
  for (const text of Object.values(LABEL)) {
    more.textContent = text;
    reserved = Math.max(reserved, more.offsetWidth);
  }
  more.style.minWidth = `${reserved}px`;
  more.textContent = LABEL.rest;

  let shown = BATCH;

  more.addEventListener('click', () => {
    if (shown >= PEOPLE.length || more.dataset.loading !== undefined) return;
    // A button that stays silent while it works invites a second press.
    more.dataset.loading = '';
    more.textContent = LABEL.busy;
    more.setAttribute('aria-busy', 'true');

    clock.setTimeout(() => {
      const next = Math.min(shown + BATCH, PEOPLE.length);
      // Appended, never replaced: what the reader was already looking at stays put.
      list.insertAdjacentHTML('beforeend', Array.from({ length: next - shown }, (_, i) => row(shown + i)).join(''));
      shown = next;
      count.textContent = `${shown} of ${PEOPLE.length}`;
      delete more.dataset.loading;
      more.removeAttribute('aria-busy');
      if (shown >= PEOPLE.length) {
        more.textContent = LABEL.done;
        more.disabled = true;
        return;
      }
      more.textContent = LABEL.rest;
    }, FETCH_MS);
  });
}
