import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const READINGS = { clean: 'All changes saved', dirty: 'Unsaved changes' } as const;

/**
 * Unsaved changes guard specimen: an editor that will not let a back click throw
 * work away in silence. The subject is the guard dialog, not the editor and not the
 * status line: a confirmation dialog is its own term, and what this one adds is the
 * condition it appears under.
 *
 * Back opens the guard only while the document is dirty, which is the pattern's own
 * rule rather than a shortcut; Keep editing is the explicit dismissal, so the script
 * never has to flip a state to reach one (SPEC §8). The status line holds the width
 * of its longest reading from mount, so the title beside it never moves (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 272px">
        <div class="sp-topbar sp-context">
          <button class="sp-icon-button" data-part="back" type="button" aria-label="Back to notes">${icon('chevronLeft')}</button>
          <span class="sp-heading sp-grow">Harbour notes</span>
          <span class="sp-text" data-part="state" data-state="clean" role="status">${READINGS.clean}</span>
        </div>

        <div class="sp-body sp-context" data-part="edit-view" style="display: flex; flex-direction: column; gap: 10px">
          <textarea class="sp-input" data-part="editor" rows="4" spellcheck="false" aria-label="Harbour notes"
                    style="height: 116px; resize: none; line-height: 1.5">The east quay reopens in spring.</textarea>
          <div class="sp-row" style="justify-content: flex-end">
            <button class="sp-button sp-button--sm" data-part="save" type="button">Save</button>
          </div>
        </div>

        <div class="sp-body sp-context" data-part="left-view" hidden>
          <ul class="sp-list sp-surface">
            <li class="sp-list-item"><span class="sp-grow">Harbour notes</span><span class="sp-text" data-part="left-note">Edited 9:04</span></li>
            <li class="sp-list-item"><span class="sp-grow">Ferry timetable</span><span class="sp-text">Monday</span></li>
          </ul>
        </div>

        <div class="sp-scrim" data-part="scrim"></div>
        <div class="sp-dialog" data-part="guard" data-subject role="alertdialog" aria-modal="true" aria-labelledby="ucg-title" style="width: 330px">
          <div class="sp-heading" id="ucg-title">Leave without saving?</div>
          <p class="sp-text" style="margin: 6px 0 16px">Your edits to Harbour notes have not been saved. Going back now loses them.</p>
          <div class="sp-row sp-row--between">
            <button class="sp-button sp-button--quiet sp-button--sm" data-part="save-leave" type="button">Save and leave</button>
            <div class="sp-row">
              <button class="sp-button sp-button--ghost sp-button--sm" data-part="keep" type="button">Keep editing</button>
              <button class="sp-button sp-button--sm" data-part="discard" type="button">Discard</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const status = part(root, 'state');
  const editor = part(root, 'editor') as HTMLTextAreaElement;
  const guard = part(root, 'guard');
  const scrim = part(root, 'scrim');
  const saved = editor.value;

  let reserved = 0;
  for (const text of Object.values(READINGS)) {
    status.textContent = text;
    reserved = Math.max(reserved, status.offsetWidth);
  }
  status.style.minWidth = `${reserved}px`;
  status.style.textAlign = 'right';
  status.textContent = READINGS.clean;

  const setOpen = (open: boolean) => {
    flag(guard, 'data-open', open);
    flag(scrim, 'data-open', open);
  };

  const markClean = () => {
    status.dataset.state = 'clean';
    status.textContent = READINGS.clean;
  };

  const leave = (note: string) => {
    setOpen(false);
    markClean();
    part(root, 'left-note').textContent = note;
    part(root, 'edit-view').hidden = true;
    part(root, 'left-view').hidden = false;
  };

  // Dirty means the values differ from the saved ones, not that the field was touched.
  editor.addEventListener('input', () => {
    const dirty = editor.value !== saved;
    status.dataset.state = dirty ? 'dirty' : 'clean';
    status.textContent = dirty ? READINGS.dirty : READINGS.clean;
  });

  part(root, 'save').addEventListener('click', markClean);

  // A clean document has nothing to guard, so the guard is not raised at all.
  part(root, 'back').addEventListener('click', () => {
    if (status.dataset.state !== 'dirty') return leave('Edited 9:04');
    setOpen(true);
  });

  part(root, 'keep').addEventListener('click', () => setOpen(false));
  part(root, 'discard').addEventListener('click', () => leave('Edited 9:04'));
  part(root, 'save-leave').addEventListener('click', () => leave('Edited just now'));
  root.addEventListener('keydown', (event) => {
    // Escape takes the answer that cannot lose anything.
    if (event.key === 'Escape') setOpen(false);
  });
}
