import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long the glyph stands in for the word "copied" before the button goes back to offering. */
const CONFIRM_MS = 1400;

const STATUS = {
  idle: 'Not copied yet',
  copied: 'Link copied',
  shared: 'Shared with the team',
} as const;

type Status = keyof typeof STATUS;

/**
 * Icon button specimen: a control whose entire label is a glyph, sitting in a
 * toolbar of them, next to a button that says its name in words. The subject is
 * the button itself and nothing around it, since the term names the control, not
 * the toolbar and not the icon inside it.
 *
 * Its accessible name lives in `aria-label`, because there is no text to read.
 * Confirmation has to happen in the glyph for the same reason, so the copy mark
 * swaps to a check and back; both marks are the same 16px box inside the same
 * fixed button, so nothing in the row moves while it does (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar">
          <span class="sp-heading sp-grow sp-context">Sprint 24 retro</span>
          <button class="sp-icon-button sp-context" data-part="rename" aria-label="Rename note">${icon('pencil')}</button>
          <button class="sp-icon-button" data-part="copy" data-subject aria-label="Copy link">
            <span data-part="copy-mark">${icon('copy')}</span>
            <span data-part="copy-done" hidden>${icon('check')}</span>
          </button>
          <button class="sp-icon-button sp-context" data-part="trash" aria-label="Move to trash">${icon('trash')}</button>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-surface" style="padding: 12px">
            <div class="sp-stack">
              <div class="sp-line" style="width: 88%"></div>
              <div class="sp-line" style="width: 72%"></div>
              <div class="sp-line" style="width: 80%"></div>
            </div>
          </div>
          <div class="sp-row" style="margin-top: 14px">
            <button class="sp-button sp-button--sm sp-row" data-part="share">${icon('share')}Share note</button>
            <span class="sp-text sp-grow" data-part="status" data-state="idle" role="status">${STATUS.idle}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const copy = part(root, 'copy');
  const mark = part(root, 'copy-mark');
  const done = part(root, 'copy-done');
  const status = part(root, 'status');

  const report = (state: Status) => {
    status.dataset.state = state;
    status.textContent = STATUS[state];
  };

  let revert: number | undefined;

  // The action is idempotent, so no pass can leave it showing the opposite of the
  // term: pressing copy copies, however many times the script reaches it (SPEC §8).
  copy.addEventListener('click', () => {
    report('copied');
    mark.hidden = true;
    done.hidden = false;
    clock.clearTimeout(revert);
    revert = clock.setTimeout(() => {
      done.hidden = true;
      mark.hidden = false;
    }, CONFIRM_MS);
  });

  // The same job done by a button that spends the room to say what it is.
  part(root, 'share').addEventListener('click', () => report('shared'));
}
