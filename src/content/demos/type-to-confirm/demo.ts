import { flag, part } from '#src/kit/parts.ts';

const PROJECT = 'northwind-web';

const HINTS = {
  waiting: `Type ${PROJECT} exactly, including the hyphen.`,
  mismatch: 'That is not the project name yet.',
  ready: 'Names match. The delete button is live.',
} as const;

/**
 * Type to confirm specimen: the guard that will not let a reflex through. The
 * subject is the field and its instructions, not the dialog around it, since a
 * confirmation dialog is its own term and what this one adds is the matching.
 *
 * The confirm button is kept present and merely `aria-disabled` rather than
 * removed, so it can say why it cannot be used, and the hint keeps the room its
 * longest reading needs so the dialog cannot resize under the reader (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 270px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Project settings</span></div>
        <div class="sp-body sp-context">
          <div class="sp-surface" data-part="danger" style="padding: 12px">
            <div class="sp-heading">${PROJECT}</div>
            <p class="sp-text" style="margin: 6px 0 12px">Deleting removes the repository, its issues, and its history. This cannot be undone.</p>
            <button class="sp-button" data-part="open" type="button">Delete project</button>
          </div>
          <div class="sp-surface" data-part="gone" hidden style="padding: 12px">
            <div class="sp-heading">Project deleted</div>
            <p class="sp-text" style="margin: 6px 0 0">${PROJECT} and everything in it is gone.</p>
          </div>
        </div>

        <div class="sp-scrim" data-part="scrim"></div>
        <div class="sp-dialog" data-part="dialog" role="alertdialog" aria-modal="true" aria-labelledby="ttc-title">
          <div class="sp-heading sp-context" id="ttc-title">Delete this project?</div>
          <div class="sp-field" data-part="guard" data-subject data-state="waiting" style="margin-top: 12px">
            <label class="sp-label" for="ttc-input">Type <b>${PROJECT}</b> to confirm</label>
            <input class="sp-input" id="ttc-input" data-part="guard-input" type="text" autocomplete="off" spellcheck="false" aria-describedby="ttc-hint" />
            <div data-part="slot">
              <span class="sp-text" id="ttc-hint" data-part="hint" role="status">${HINTS.waiting}</span>
            </div>
          </div>
          <div class="sp-row sp-context" style="justify-content: flex-end; margin-top: 14px">
            <button class="sp-button sp-button--ghost" data-part="cancel" type="button">Cancel</button>
            <button class="sp-button" data-part="confirm" type="button" aria-disabled="true">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const dialog = part(root, 'dialog');
  const scrim = part(root, 'scrim');
  const guard = part(root, 'guard');
  const input = part(root, 'guard-input') as HTMLInputElement;
  const slot = part(root, 'slot');
  const hint = part(root, 'hint');
  const confirm = part(root, 'confirm');

  let reserved = 0;
  for (const text of Object.values(HINTS)) {
    hint.textContent = text;
    reserved = Math.max(reserved, slot.offsetHeight);
  }
  slot.style.height = `${reserved}px`;
  hint.textContent = HINTS.waiting;

  const judge = () => {
    const value = input.value.trim();
    const state = value === PROJECT ? 'ready' : value === '' ? 'waiting' : 'mismatch';
    guard.dataset.state = state;
    hint.textContent = HINTS[state];
    // Present either way: a control that vanishes cannot explain itself.
    flag(confirm, 'data-ready', state === 'ready');
    confirm.setAttribute('aria-disabled', String(state !== 'ready'));
  };

  const setOpen = (open: boolean) => {
    flag(dialog, 'data-open', open);
    flag(scrim, 'data-open', open);
  };

  // Opens, and always onto the same empty guard: the typing is never carried over.
  part(root, 'open').addEventListener('click', () => {
    input.value = '';
    judge();
    setOpen(true);
  });

  input.addEventListener('input', judge);
  part(root, 'cancel').addEventListener('click', () => setOpen(false));
  scrim.addEventListener('click', () => setOpen(false));
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  confirm.addEventListener('click', () => {
    if (confirm.dataset.ready === undefined) return;
    setOpen(false);
    part(root, 'danger').hidden = true;
    part(root, 'gone').hidden = false;
  });
}
