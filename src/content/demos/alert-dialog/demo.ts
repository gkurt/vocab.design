import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const IDLE = 'Screen reader: nothing announced, the page waits to be read.';
const ALERTED = 'Screen reader, at once: "Delete this workspace? 12 projects go with it."';

/**
 * Alert dialog specimen: the destructive question, wearing the role that makes a
 * screen reader say it immediately. The subject is the dialog. What separates it from
 * the confirmation-dialog specimen is what the two extra parts show: the announcement
 * line under the frame, and the initial focus resting on the safe answer.
 *
 * The dialog is a positioned div over a kit scrim, never `showModal()`, which would
 * paint outside the stage (SPEC §5). Focus is simulated with `data-sim-focus`, since
 * attract never moves real focus (SPEC §7). The trigger only opens; both ways out are
 * explicit (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 210px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow" style="font-size: 14px">Workspace settings</span></div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface sp-row" style="padding: 10px 12px; gap: 10px">
            <span class="sp-stack sp-grow" style="gap: 2px">
              <span class="sp-text sp-text--ink">Delete this workspace</span>
              <span class="sp-label" data-part="status">12 projects, 4 members</span>
            </span>
            <button class="sp-button sp-button--sm" data-part="danger" style="display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; flex: 0 0 auto">
              ${icon('trash')}<span>Delete</span>
            </button>
          </div>
          <span class="sp-line" style="width: 66%"></span>
          <span class="sp-line" style="width: 48%"></span>
        </div>
        <div class="sp-scrim" data-part="scrim"></div>
        <div
          class="sp-dialog"
          data-part="dialog"
          data-subject
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="ad-title"
          aria-describedby="ad-body"
          style="width: 300px"
        >
          <div class="sp-row" style="gap: 8px; align-items: flex-start">
            ${icon('alert')}
            <span class="sp-heading" id="ad-title" style="font-size: 14px">Delete this workspace?</span>
          </div>
          <p class="sp-text" id="ad-body" style="margin: 8px 0 0">12 projects go with it, for everyone. This cannot be undone.</p>
          <div class="sp-row" style="justify-content: flex-end; margin-top: 16px">
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="cancel">Keep workspace</button>
            <button class="sp-button sp-button--sm" data-part="confirm">Delete</button>
          </div>
        </div>
      </div>
      <p class="sp-text sp-context" data-stage-announce data-part="announce" data-state="idle" role="status" style="max-width: 460px; text-align: center; margin: 0; min-height: 20px">
        ${IDLE}
      </p>
    </div>
  `;

  const dialog = part(root, 'dialog');
  const scrim = part(root, 'scrim');
  const cancel = part(root, 'cancel');
  const announce = part(root, 'announce');
  const status = part(root, 'status');

  const setOpen = (open: boolean) => {
    flag(dialog, 'data-open', open);
    flag(scrim, 'data-open', open);
    // The role's whole effect, written where a sighted reader can see it: the message
    // is spoken the moment the dialog arrives, not when the reader gets to it.
    flag(cancel, 'data-sim-focus', open);
    announce.dataset.state = open ? 'alert' : 'idle';
    announce.textContent = open ? ALERTED : IDLE;
  };

  part(root, 'danger').addEventListener('click', () => setOpen(true));
  cancel.addEventListener('click', () => setOpen(false));
  part(root, 'confirm').addEventListener('click', () => {
    status.textContent = 'Deleted';
    setOpen(false);
  });
  scrim.addEventListener('click', () => setOpen(false));
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
}
