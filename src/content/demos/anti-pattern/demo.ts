import { localBox, localSize } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';

/** The settings the app shipped with, alphabetical, the errand the reader came for second. */
const SHIPPED = [
  'Ask before quitting',
  'Confirm before deleting',
  'Group messages by thread',
  'Mark as read on scroll',
  'Play a sound on send',
  'Show remote images',
  'Use system accent colour',
];

/** The errand: the one switch this reader opened the window to find. */
const ERRAND = SHIPPED[1] as string;

/**
 * Four arguments nobody wanted to lose, in the order they were settled. Every one of them
 * files above the errand, so the pile pushes it down a row at a time rather than an
 * animation doing it.
 */
const SETTLED = ['Auto-hide the sidebar', 'Blur images until opened', 'Bounce the dock icon', 'Collapse quoted text'];

const NOTE = {
  errand: 'You came to turn off delete confirmation.',
  buried: 'The switch you came for is below the fold.',
} as const;

/**
 * Anti-pattern specimen: settling a design argument by adding a preference, four times.
 * Each option is defensible on its own and the pile is the failure, because a preferences
 * window is where a person is supposed to get what they want, and the switch this reader
 * opened it for ends up under four settlements they had no stake in. The remedy is the
 * cause, which is the whole of the term.
 *
 * The subject is the preferences LIST rather than the window or the button: the pile is
 * what the term names, and the add control is instrumentation, so it stays scenery
 * (SPEC §5). That control read "Settle it with an option" beside a line saying "Two people
 * disagree about a default.": the line was the site narrating the fiction and is gone, and
 * the button now says plainly what pressing it does. The specimen mounts already scrolling,
 * so the term is legible at rest as well as in the pose the share image holds. The list's height is fixed and the note holds one
 * line in both of its states, so adding an option moves nothing outside the scroller
 * (SPEC §5); the clipping inside it is the demonstration rather than a spill.
 *
 * Whether the errand is still reachable is measured rather than counted, and through
 * `localBox`/`localSize` rather than a pair of client rects: the row's top is compared
 * against the scroller's own height, so a card at half size and a narrow phone column
 * both bury it on the same press as the authored width does (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 440px">
        <div class="sp-row sp-row--between" style="margin-bottom: 10px">
          <span class="sp-heading sp-context">Preferences</span>
          <span class="sp-text sp-context" data-part="count" style="font-size: 11px">${SHIPPED.length} options</span>
        </div>
        <div class="sp-scroll sp-surface" data-part="list" data-subject style="height: 152px">
          <ul class="sp-list">${SHIPPED.map(row).join('')}</ul>
        </div>
        <span class="sp-text sp-context" data-stage-verdict data-part="note" data-state="errand" style="display: block; height: 18px; margin-top: 10px; font-size: 11px">
          ${NOTE.errand}
        </span>
      </div>
      <div class="sp-row" style="width: 440px; margin-top: 12px; justify-content: flex-end">
        <button class="sp-button sp-button--ghost sp-button--sm sp-context" data-part="add" type="button">Add an option</button>
      </div>
    </div>
  `;

  const list = part(root, 'list');
  const rows = list.querySelector('ul') as HTMLUListElement;
  const errand = part(root, 'errand');
  const count = part(root, 'count');
  const note = part(root, 'note');
  const add = part(root, 'add') as HTMLButtonElement;
  let settled = 0;

  list.addEventListener('click', (event) => {
    const control = (event.target as HTMLElement).closest('[role=switch]');
    if (control) control.setAttribute('aria-checked', control.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
  });

  // Settling is one-way inside a pass, so the script reaches the buried state rather than
  // flipping it (SPEC §8); a remount is what gives the reader their errand back.
  add.addEventListener('click', () => {
    if (settled >= SETTLED.length) return;
    file(rows, SETTLED[settled] as string);
    settled += 1;
    count.textContent = `${SHIPPED.length + settled} options`;
    if (settled >= SETTLED.length) {
      add.disabled = true;
      add.textContent = 'Nothing left to add';
    }
    report();
  });

  function report(): void {
    const buried = localBox(errand, list).top >= localSize(list).height;
    flag(errand, 'data-buried', buried);
    note.dataset.state = buried ? 'buried' : 'errand';
    note.textContent = buried ? NOTE.buried : NOTE.errand;
  }

  report();
}

/** File a new option where it belongs, so the list stays the alphabetical one it shipped as. */
function file(rows: HTMLUListElement, label: string): void {
  const next = [...rows.children].find((li) => (li.querySelector('[data-label]')?.textContent ?? '').trim() > label);
  if (next) next.insertAdjacentHTML('beforebegin', row(label));
  else rows.insertAdjacentHTML('beforeend', row(label));
}

/** One preference. The errand is the only row anything asks about. */
function row(label: string): string {
  const isErrand = label === ERRAND;
  return `
    <li class="sp-list-item"${isErrand ? ' data-part="errand"' : ''}>
      <span class="sp-text sp-grow" data-label style="font-size: 12px">${label}</span>
      <button class="sp-switch" type="button" role="switch" aria-checked="${isErrand}" aria-label="${label}"></button>
    </li>
  `;
}
