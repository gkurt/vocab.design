import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const MAIL = [
  { from: 'Priya', subject: 'Design review notes' },
  { from: 'Sam', subject: 'Invoice for March' },
  { from: 'Otis', subject: 'Offsite logistics' },
];

/**
 * Keyboard shortcut specimen: a mail list where E archives whatever row is
 * selected, and the toolbar button that does the same thing wears the key it
 * answers to. The subject is that button: the term is the binding a command
 * carries, and the button is where the binding is visible.
 *
 * Both marks a row can take sit in a slot reserved from the start, so a shortcut
 * firing never moves the list under the reader (SPEC §5), and running a command
 * twice on the same row is the same as running it once, so a looped pass always
 * ends up in the same place.
 *
 * The status bar used to read "Select a message, then press its key", which is the site
 * telling the reader what to do in a mail app's own type. It is a conversation count now,
 * beside the archived count that was always there; the keys themselves are still shown the
 * way a real toolbar shows them, on the buttons they accelerate.
 */
export function mount(root: HTMLElement): void {
  const rows = MAIL.map(
    ({ from, subject }, index) => `
      <li class="sp-list-item" data-part="row-${index + 1}" role="option" aria-selected="false">
        <span class="sp-avatar sp-context">${from.slice(0, 2).toUpperCase()}</span>
        <span class="sp-grow sp-text sp-text--ink">${subject}</span>
        <span style="display: inline-flex; align-items: center; justify-content: flex-end; gap: 6px; width: 94px">
          <span data-part="star-${index + 1}" hidden>${icon('star', 'sp-icon--filled')}</span>
          <span class="sp-chip" data-part="tag-${index + 1}" hidden>Archived</span>
        </span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar">
          <span class="sp-heading sp-grow sp-context">Inbox</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="archive" data-subject>
            Archive <span class="sp-kbd">E</span>
          </button>
          <button class="sp-button sp-button--ghost sp-button--sm sp-context" type="button" data-part="star">
            Star <span class="sp-kbd">S</span>
          </button>
        </div>
        <div class="sp-body sp-context" style="padding: 0">
          <ul class="sp-list" role="listbox" aria-label="Messages" data-part="list">${rows}</ul>
        </div>
        <div class="sp-topbar sp-context" style="border-bottom: 0; border-top: 1px solid var(--sp-line)">
          <span class="sp-label sp-grow">${MAIL.length} conversations</span>
          <span class="sp-text" data-part="count" style="width: 92px; text-align: right">Archived: 0</span>
        </div>
      </div>
    </div>
  `;

  const messages = MAIL.map((_, index) => part(root, `row-${index + 1}`));
  const count = part(root, 'count');
  let selected: number | undefined;

  const select = (index: number) => {
    selected = index;
    for (const [at, row] of messages.entries()) {
      flag(row, 'data-selected', at === index);
      row.setAttribute('aria-selected', String(at === index));
    }
  };

  /** Absolute and idempotent: running a command on a row already in that state is a no-op. */
  const runOn = (attribute: string, markPart: string) => {
    if (selected === undefined) return;
    const row = messages[selected];
    if (!row) return;
    flag(row, attribute, true);
    part(root, `${markPart}-${selected + 1}`).hidden = false;
    count.textContent = `Archived: ${messages.filter((each) => each.hasAttribute('data-archived')).length}`;
  };

  const archive = () => runOn('data-archived', 'tag');
  const star = () => runOn('data-starred', 'star');

  for (const [index, row] of messages.entries()) row.addEventListener('click', () => select(index));

  // The button and the key run the same command: that is what makes one a shortcut
  // for the other rather than a second feature.
  part(root, 'archive').addEventListener('click', archive);
  part(root, 'star').addEventListener('click', star);

  root.addEventListener('keydown', (event) => {
    // A single-letter binding is only safe while nothing is being typed into, and a
    // chorded one belongs to the browser until proven otherwise.
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const key = event.key.toLowerCase();
    if (key === 'e') archive();
    else if (key === 's') star();
    else return;
    event.preventDefault();
  });
}
