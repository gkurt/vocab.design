import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

type FileRow = { key: string; label: string };

const FILES = [
  { key: 'brand', label: 'Brand guide.pdf' },
  { key: 'sitemap', label: 'Site map.png' },
  { key: 'forecast', label: 'Q3 forecast.xlsx' },
] as const satisfies readonly FileRow[];

/**
 * Confirmation dialog specimen: a delete stopped part way through so the person can
 * say whether they meant it. The dialog is the subject; the file list and its count
 * are the scenery that shows the answer being carried out.
 *
 * The dialog is out of flow over the frame, and the list keeps its box while a row
 * leaves it, so the count below never moves (SPEC §5). The trigger only ever opens,
 * and both ways out are explicit: Keep file, Escape, or the scrim (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const rows = FILES.map(
    (file) => `
      <li class="sp-list-item" data-part="row-${file.key}">
        <span class="sp-grow">${file.label}</span>
        <button class="sp-icon-button" data-part="delete-${file.key}" aria-label="Delete ${file.label}">${icon('trash')}</button>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Project files</span></div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column">
          <ul class="sp-list sp-grow" data-part="files">${rows}</ul>
          <span class="sp-text" data-part="count" role="status">3 files</span>
        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <div
          class="sp-dialog"
          data-part="dialog"
          data-subject
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="cd-title"
          aria-describedby="cd-body"
        >
          <div class="sp-heading" id="cd-title" data-part="dialog-title">Delete this file?</div>
          <p class="sp-text" id="cd-body" style="margin: 6px 0 0">Deleting removes it for everyone on the project. This cannot be undone.</p>
          <div class="sp-row" style="justify-content: flex-end; margin-top: 16px">
            <button class="sp-button sp-button--ghost" data-part="keep">Keep file</button>
            <button class="sp-button" data-part="confirm">Delete file</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const dialog = part(root, 'dialog');
  const scrim = part(root, 'scrim');
  const title = part(root, 'dialog-title');
  const count = part(root, 'count');
  const list = part(root, 'files');

  let pending: FileRow | undefined;

  const setOpen = (open: boolean) => {
    flag(dialog, 'data-open', open);
    flag(scrim, 'data-open', open);
    if (!open) pending = undefined;
  };

  /** Opens, never toggles, and always to the same state: this row, this question. */
  const ask = (file: FileRow) => {
    pending = file;
    title.textContent = `Delete "${file.label}"?`;
    setOpen(true);
  };

  const confirm = () => {
    if (!pending) return;
    part(root, `row-${pending.key}`).remove();
    count.textContent = `${list.children.length} files`;
    setOpen(false);
  };

  for (const file of FILES) part(root, `delete-${file.key}`).addEventListener('click', () => ask(file));
  part(root, 'confirm').addEventListener('click', confirm);
  part(root, 'keep').addEventListener('click', () => setOpen(false));
  scrim.addEventListener('click', () => setOpen(false));
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
}
