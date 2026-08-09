import { flag, part } from '#src/kit/parts.ts';

/**
 * Modal dialog specimen: a destructive action opens a window that owns the
 * scene. The scrim is the visible half of modality, so the specimen shows the
 * page still there and still unreachable.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Settings</span>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-surface" style="padding: 14px">
            <div class="sp-heading">Delete this project</div>
            <p class="sp-text" style="margin-top: 4px">Boards, files, and history go with it.</p>
            <button class="sp-button sp-button--sm" data-part="open" style="margin-top: 12px">Delete project</button>
          </div>
        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <div class="sp-dialog" data-part="dialog" data-subject role="dialog" aria-modal="true" aria-labelledby="dialog-title">
          <div class="sp-heading" id="dialog-title">Delete “Northwind”?</div>
          <p class="sp-text" style="margin-top: 6px">This removes 14 boards and cannot be undone.</p>
          <div class="sp-row" style="justify-content: flex-end; margin-top: 16px">
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="cancel">Cancel</button>
            <button class="sp-button sp-button--sm" data-part="confirm">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const dialog = part(root, 'dialog');
  const scrim = part(root, 'scrim');
  const setOpen = (open: boolean) => {
    flag(dialog, 'data-open', open);
    flag(scrim, 'data-open', open);
  };

  part(root, 'open').addEventListener('click', () => setOpen(true));
  part(root, 'cancel').addEventListener('click', () => setOpen(false));
  part(root, 'confirm').addEventListener('click', () => setOpen(false));
  scrim.addEventListener('click', () => setOpen(false));
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
}
