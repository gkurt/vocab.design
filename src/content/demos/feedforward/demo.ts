import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/** The picked ones sit at the end, so the act takes the tail and the rows that stay hold their place. */
const FILES = [
  { name: 'notes.md', size: '12 KB', picked: false },
  { name: 'sketch.png', size: '640 KB', picked: false },
  { name: 'Q3 report.pdf', size: '1.4 MB', picked: true },
  { name: 'logo-final.svg', size: '82 KB', picked: true },
  { name: 'invoice-118.pdf', size: '2.7 MB', picked: true },
];

const DOOMED = FILES.map((f, i) => (f.picked ? i : -1)).filter((i) => i >= 0);
const FREED = '4.2 MB';

const rows = FILES.map(
  (file, i) => `
    <li
      class="sp-list-item"
      data-part="row-${i}"
      style="padding: 7px 9px; font-size: 12px; border-radius: 0"
    >
      <span class="sp-checkbox" role="checkbox" aria-checked="${file.picked}" style="width: 14px; height: 14px"></span>
      <span class="sp-grow" data-part="name-${i}" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${file.name}</span>
      <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">${file.size}</span>
    </li>`,
).join('');

/**
 * Feedforward specimen: a Delete button that states its consequence before it is pressed.
 * Bringing the pointer (or the keyboard) to the button reveals exactly what pressing it
 * will do, three items, 4.2 MB, no undo, and marks the rows it would take. Pressing it
 * then does precisely that, which is what makes the statement worth reading.
 *
 * The subject is the consequence panel: the term names the claim made about the outcome,
 * so the pin belongs on the sentence that makes it, not on the button that triggers it
 * and not on the rows it is about. Those are the scene, in the context register. The panel
 * is off stage at rest, which identify handles by summoning it (SPEC §6).
 *
 * The reveal answers a real pointerenter and a real focus, because reach is half the
 * point: an announcement that exists only under a mouse does not exist for a keyboard.
 * Nothing here is wired merely to repaint hover, which the player mirrors by itself
 * (SPEC §7).
 *
 * The panel and the receipt share one slot reserved from mount, the list holds its height
 * whatever is left in it, and the rows the act takes are the last ones, so a consequence
 * appearing, retreating, or being carried out moves nothing else (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Archive</span>
          <span class="sp-text" data-part="readout" data-state="rest" style="flex: 0 0 auto; width: 268px; text-align: right; white-space: nowrap">3 of 5 files selected</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 12px; align-items: flex-start">
          <div class="sp-surface sp-context" style="flex: 0 0 auto; width: 226px; height: 168px; overflow: hidden">
            <ul class="sp-list" data-part="list" style="height: 100%">${rows}</ul>
          </div>
          <div class="sp-stack" style="flex: 1 1 auto; gap: 10px">
            <button
              class="sp-button"
              type="button"
              data-part="delete"
              style="width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 6px; white-space: nowrap; flex: 0 0 auto"
            >
              ${icon('trash')}<span data-part="delete-label">Delete 3 files</span>
            </button>
            <div style="position: relative; height: 116px">
              <div
                class="sp-surface"
                data-part="preview"
                data-subject
                style="position: absolute; inset: 0; padding: 9px 10px; opacity: 0; visibility: hidden;
                       transition: opacity 160ms var(--sp-ease), visibility 160ms"
              >
                <div class="sp-row" style="gap: 6px; align-items: center">
                  ${icon('alert')}<span class="sp-heading" style="font-size: 12px">If you press this</span>
                </div>
                <div class="sp-stack" style="gap: 3px; margin-top: 7px; font-size: 11px; line-height: 1.35">
                  <span>3 files are deleted</span>
                  <span>${FREED} is freed</span>
                  <span data-part="no-undo" style="font-weight: 600">There is no undo</span>
                </div>
              </div>
              <div
                class="sp-surface sp-context"
                data-part="result"
                hidden
                style="position: absolute; inset: 0; padding: 9px 10px; font-size: 11px; line-height: 1.35"
              >
                <div class="sp-heading" style="font-size: 12px">Done</div>
                <div style="margin-top: 7px">3 files deleted, ${FREED} freed. Exactly what the panel said.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-stage-verdict data-part="caption" style="width: 452px; font-size: 11px; line-height: 1.35; text-align: center">
        The panel is not a warning about the button, it is a statement about the result: what will happen, to how many things, and whether it can be taken back.
      </span>
    </div>
  `;

  const button = part(root, 'delete');
  const preview = part(root, 'preview');
  const readout = part(root, 'readout');
  const rowEls = FILES.map((_, i) => part(root, `row-${i}`));
  const nameEls = FILES.map((_, i) => part(root, `name-${i}`));

  let spent = false;

  /** The rows the act would take, marked as such while the claim is up. */
  const doom = (on: boolean) => {
    for (const i of DOOMED) {
      const row = rowEls[i];
      const name = nameEls[i];
      if (!row || !name) continue;
      flag(row, 'data-doomed', on);
      row.style.background = on ? 'var(--sp-accent-soft)' : '';
      name.style.textDecoration = on ? 'line-through' : '';
    }
  };

  /** Reaches the shown state or the hidden one; never flips whatever it finds (SPEC §8). */
  const show = (on: boolean) => {
    if (spent) return;
    preview.style.opacity = on ? '1' : '0';
    preview.style.visibility = on ? 'visible' : 'hidden';
    doom(on);
    readout.dataset.state = on ? 'warned' : 'rest';
    readout.textContent = on ? 'Consequence stated, nothing done yet' : '3 of 5 files selected';
  };

  button.addEventListener('pointerenter', () => show(true));
  button.addEventListener('pointerleave', () => show(false));
  // The same claim on the keyboard's terms: a consequence only a mouse can reach is a
  // consequence most readers never get.
  button.addEventListener('focus', () => show(true));
  button.addEventListener('blur', () => show(false));

  button.addEventListener('click', () => {
    if (spent) return;
    show(false);
    spent = true;
    for (const i of DOOMED) {
      const row = rowEls[i];
      if (row) row.hidden = true;
    }
    part(root, 'result').hidden = false;
    part(root, 'delete-label').textContent = 'Deleted';
    button.setAttribute('aria-disabled', 'true');
    flag(button, 'data-done', true);
    readout.dataset.state = 'done';
    readout.textContent = `3 files deleted, ${FREED} freed`;
  });
}
