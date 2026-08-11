import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** A pause in typing, not a keystroke, is what starts a save. */
const SETTLE_MS = 900;
/** How long the write takes to come back. */
const ROUND_TRIP_MS = 900;

const READINGS = {
  idle: 'All changes saved',
  dirty: 'Unsaved changes',
  saving: 'Saving…',
  saved: 'Saved just now',
} as const;

type State = keyof typeof READINGS;

/**
 * Autosave specimen: an editor with no Save button, and a status line that says
 * what the document's state actually is. The subject is that line, because it is
 * the whole of what a reader can point at: the saving itself is invisible, and
 * the line is the only guarantee offered in exchange for the button being gone.
 *
 * All four readings are measured at mount and the widest one is held from then on
 * (SPEC §5), so the status never grows or shrinks the row it sits in.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 330px">
        <div class="sp-row sp-row--between">
          <span class="sp-heading sp-context">Meeting notes</span>
          <span class="sp-text" data-part="status" data-subject data-state="idle" role="status">${READINGS.idle}</span>
        </div>
        <textarea
          class="sp-input sp-context"
          data-part="editor"
          rows="4"
          spellcheck="false"
          aria-label="Meeting notes"
          style="height: 84px; margin-top: 12px; resize: none; line-height: 1.5"
        >Ship the colour ramp on Thursday.</textarea>
        <p class="sp-text sp-context" style="margin: 12px 0 0">Nothing here asks you to save. The line above is the receipt.</p>
      </div>
    </div>
  `;

  const status = part(root, 'status');
  const editor = part(root, 'editor') as HTMLTextAreaElement;

  let reserved = 0;
  for (const text of Object.values(READINGS)) {
    status.textContent = text;
    reserved = Math.max(reserved, status.offsetWidth);
  }
  status.style.minWidth = `${reserved}px`;
  status.style.textAlign = 'right';
  status.textContent = READINGS.idle;

  const show = (state: State) => {
    status.dataset.state = state;
    status.textContent = READINGS[state];
    // Pending work the interface has already committed to, drawn the way the kit draws it.
    status.className = state === 'saving' ? 'sp-text sp-pending' : 'sp-text';
  };

  let settle: number | undefined;
  let write: number | undefined;

  editor.addEventListener('input', () => {
    clock.clearTimeout(settle);
    clock.clearTimeout(write);
    show('dirty');
    settle = clock.setTimeout(() => {
      show('saving');
      write = clock.setTimeout(() => show('saved'), ROUND_TRIP_MS);
    }, SETTLE_MS);
  });
}
