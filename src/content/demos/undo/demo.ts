import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long the way back stays on offer before the send stands. */
const WINDOW_MS = 3200;
const DRAFT = 'Six at the ferry office, then';

/**
 * Undo specimen: a message sends the moment the button is pressed, and the offer to
 * take it back arrives with it. The subject is that offer, not the row it undoes:
 * sending is what every composer does, and keeping a way out of it afterwards is
 * what this term names.
 *
 * The action is deliberately not a deletion, so the specimen next door (soft delete)
 * stays about storage while this one stays about the moment. Undo puts the state back
 * rather than issuing an opposite command: the row leaves the thread and the draft
 * returns to the composer, exactly as it was.
 *
 * The window is a clock timer, so identify can freeze it and inspect the offer rather
 * than watch it lapse (SPEC §6), and the offer is drawn over the scene, so nothing in
 * the frame moves when it comes or goes (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-avatar">PR</span>
          <span class="sp-heading sp-grow">Priya Rana</span>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px">
          <ul class="sp-list sp-scroll sp-surface sp-grow" data-part="thread" style="padding: 0 4px">
            <li class="sp-list-item"><span class="sp-grow">Are we still on for tonight?</span><span class="sp-text">9:02</span></li>
            <li class="sp-list-item"><span class="sp-grow">The tide turns at seven</span><span class="sp-text">9:04</span></li>
          </ul>
          <div class="sp-row" style="flex: 0 0 auto">
            <input class="sp-input" data-part="composer" type="text" spellcheck="false" aria-label="Message" value="${DRAFT}" />
            <button class="sp-button sp-button--sm" data-part="send" type="button">Send</button>
          </div>
        </div>
        <div class="sp-toast" data-part="toast" data-subject role="status" style="bottom: 56px">
          <span class="sp-grow" data-part="toast-text">Message sent</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="undo" type="button">Undo</button>
        </div>
      </div>
    </div>
  `;

  const thread = part(root, 'thread');
  const composer = part(root, 'composer') as HTMLInputElement;
  const toast = part(root, 'toast');
  const toastText = part(root, 'toast-text');

  let timer: number | undefined;
  /** The row the current offer would take back, and the text it would hand back. */
  let pending: { row: HTMLElement; text: string } | undefined;

  const send = () => {
    if (pending) return;
    const text = composer.value.trim() || DRAFT;
    composer.value = '';
    thread.insertAdjacentHTML(
      'beforeend',
      `<li class="sp-list-item" data-part="outgoing">
         <span class="sp-grow">${text}</span>
         <span class="sp-text">Sent</span>
       </li>`,
    );
    const row = part(root, 'outgoing');
    thread.scrollTop = thread.scrollHeight;
    pending = { row, text };
    toastText.textContent = 'Message sent';
    flag(toast, 'data-open', true);
    clock.clearTimeout(timer);
    // Lapsing retires the offer, not the message: the row is still there afterwards.
    timer = clock.setTimeout(() => {
      const offer = pending;
      pending = undefined;
      flag(toast, 'data-open', false);
      // The row leaves the offer by name as well, so the next send owns "outgoing".
      if (offer) offer.row.dataset.part = 'delivered';
    }, WINDOW_MS);
  };

  const undo = () => {
    const offer = pending;
    if (!offer) return;
    clock.clearTimeout(timer);
    pending = undefined;
    flag(toast, 'data-open', false);
    // Put the state back, rather than issue an opposite command: the row goes and
    // the draft comes back whole, in the composer it left.
    offer.row.remove();
    composer.value = offer.text;
  };

  part(root, 'send').addEventListener('click', send);
  part(root, 'undo').addEventListener('click', undo);
}
