import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long the way back stays on screen before the item is left to the bin. */
const WINDOW_MS = 3000;

const NOTES = [
  { id: 'ferry', name: 'Ferry timetable', when: 'Monday' },
  { id: 'tide', name: 'Tide tables', when: 'Yesterday' },
  { id: 'quay', name: 'Quay works log', when: '9:04' },
] as const;

/**
 * Soft delete specimen: a note leaves the list, the bin's count goes up, and a row
 * appears offering the way back. The subject is that row, because it is what the
 * pattern trades a confirmation dialog for: deleting first and asking never only
 * works if the undo is right where the deletion happened.
 *
 * The window is a clock timer, so identify can freeze it and inspect the offer
 * instead of watching it expire (SPEC §6), and the row's space is measured and held
 * from mount, so a deletion never shoves the list around (SPEC §5). Letting the
 * window lapse does not delete anything further: the count stays up, which is the
 * honest half of the pattern.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Notes</span>
          <span class="sp-row sp-text" data-part="trash" data-count="0" style="gap: 6px">${icon('trash')}<span data-part="trash-text">Trash 0</span></span>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px">
          <ul class="sp-list sp-surface sp-grow" data-part="list"></ul>
          <div data-part="slot" style="flex: 0 0 auto">
            <div class="sp-row sp-surface" data-part="undo-row" data-subject role="status" style="padding: 8px 10px; box-shadow: var(--sp-shadow)">
              <span class="sp-text sp-text--ink sp-grow" data-part="undo-text">Deleted</span>
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="undo" type="button">Undo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const list = part(root, 'list');
  const slot = part(root, 'slot');
  const row = part(root, 'undo-row');
  const rowText = part(root, 'undo-text');
  const trash = part(root, 'trash');
  const trashText = part(root, 'trash-text');

  // The offer keeps its room whether it is up or not, so the list never jumps.
  slot.style.height = `${slot.offsetHeight}px`;
  row.hidden = true;

  const deleted = new Set<string>();
  let timer: number | undefined;

  const paint = () => {
    list.innerHTML = NOTES.filter((note) => !deleted.has(note.id))
      .map(
        (note) => `
          <li class="sp-list-item" data-part="row-${note.id}">
            <span class="sp-grow">${note.name}</span>
            <span class="sp-text">${note.when}</span>
            <button class="sp-icon-button" data-part="del-${note.id}" data-note="${note.id}" type="button" aria-label="Delete ${note.name}">
              ${icon('trash')}
            </button>
          </li>`,
      )
      .join('');
    trash.dataset.count = String(deleted.size);
    trashText.textContent = `Trash ${deleted.size}`;
  };

  list.addEventListener('click', (event) => {
    const id = (event.target as HTMLElement).closest<HTMLElement>('[data-note]')?.dataset.note;
    const note = NOTES.find((candidate) => candidate.id === id);
    if (!note || deleted.has(note.id)) return;
    deleted.add(note.id);
    paint();
    rowText.textContent = `${note.name} moved to Trash`;
    row.dataset.note = note.id;
    row.hidden = false;
    clock.clearTimeout(timer);
    // Lapsing retires the offer, not the item: it is still in the bin afterwards.
    timer = clock.setTimeout(() => {
      row.hidden = true;
    }, WINDOW_MS);
  });

  part(root, 'undo').addEventListener('click', () => {
    const id = row.dataset.note;
    if (!id) return;
    clock.clearTimeout(timer);
    deleted.delete(id);
    row.hidden = true;
    paint();
  });

  paint();
}
