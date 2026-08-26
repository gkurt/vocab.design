import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long the reply is being composed for, which is the pause the term is read in. */
const TYPING_MS = 1500;

const BUBBLE = ['max-width: 80%', 'padding: 7px 10px', 'font-size: 12px', 'line-height: 1.45'].join('; ');

const said = (text: string, extra = ''): string => `
  <div
    style="${BUBBLE}; align-self: flex-start; border-radius: 12px 12px 12px 4px; background: var(--sp-surface);
           border: 1px solid var(--sp-line)"
    ${extra}
  >${text}</div>`;

const asked = (text: string, extra = ''): string => `
  <div
    style="${BUBBLE}; align-self: flex-end; border-radius: 12px 12px 4px 12px; background: var(--sp-accent);
           color: var(--sp-accent-ink)"
    ${extra}
  >${text}</div>`;

const chipRow = (name: string, labels: [string, string][]): string => `
  <div class="sp-row sp-row--wrap" data-part="${name}" style="gap: 6px">
    ${labels.map(([key, label]) => `<button class="sp-chip" type="button" data-part="${key}">${label}</button>`).join('')}
  </div>`;

const dot = (index: number): string => `
  <span
    class="sp-pulse"
    style="width: 5px; height: 5px; border-radius: 50%; background: var(--sp-muted); animation-delay: -${(index * 0.6).toFixed(1)}s"
  ></span>`;

/**
 * Conversational interface specimen: a transcript that is the whole screen, a composer under
 * it, and suggestion chips doing the work a menu bar would do on a screen made of controls.
 * Picking one appends the reader's turn, the reply is composed, and the transcript is a turn
 * longer: the state of this interface is what it says, some distance up the scroll.
 *
 * The subject is the transcript, which is what the term names. The bar above it and the
 * composer below are scenery, and the turns and the pause between them are parts with words
 * of their own (chat bubble, typing indicator) rather than things this specimen invents.
 *
 * The chips reach a state rather than flipping one (SPEC §8): choosing one is a turn, and a
 * turn is never taken back. The transcript scrolls to the newest turn, which is the only
 * thing that moves; nothing outside it shifts.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 236px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Assistant</span>
          <span class="sp-label">Thursday</span>
        </div>

        <div class="sp-body" style="padding: 12px">
          <div
            class="sp-scroll"
            data-part="transcript"
            data-subject
            role="log"
            style="display: flex; flex-direction: column; gap: 8px; height: 100%"
          >
            ${said('I can look at your calendar, draft a reply, or find a file.')}
            ${chipRow('chips', [
              ['chip-free', 'Free time Friday'],
              ['chip-draft', 'Draft a reply'],
            ])}
          </div>
        </div>

        <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 8px; padding: 10px 12px; border-top: 1px solid var(--sp-line)">
          <div class="sp-grow">
            <input class="sp-input" data-part="composer" type="text" placeholder="Ask anything" aria-label="Message" />
          </div>
          <button class="sp-icon-button" type="button" data-part="send" aria-label="Send">${icon('chevronRight')}</button>
        </div>
      </div>
    </div>
  `;

  const transcript = part(root, 'transcript');
  const toBottom = () => {
    transcript.scrollTop = transcript.scrollHeight;
  };

  /** One turn taken: the phrase goes in as the reader's, and the reply is composed for it. */
  const take = (phrase: string, reply: string) => {
    part(root, 'chips').remove();
    transcript.insertAdjacentHTML('beforeend', asked(phrase, 'data-part="user-turn"'));
    transcript.insertAdjacentHTML(
      'beforeend',
      `<div
         class="sp-row"
         data-part="typing"
         aria-label="Composing a reply"
         style="align-self: flex-start; gap: 4px; padding: 9px 11px; border-radius: 12px 12px 12px 4px;
                background: var(--sp-surface); border: 1px solid var(--sp-line)"
       >${dot(0)}${dot(1)}${dot(2)}</div>`,
    );
    toBottom();

    clock.setTimeout(() => {
      part(root, 'typing').remove();
      transcript.insertAdjacentHTML('beforeend', said(reply, 'data-part="reply"'));
      transcript.insertAdjacentHTML(
        'beforeend',
        chipRow('chips-2', [
          ['chip-hold', 'Hold 10 to 11'],
          ['chip-later', 'Not today'],
        ]),
      );
      toBottom();
    }, TYPING_MS);
  };

  part(root, 'chip-free').addEventListener('click', () => take('Free time Friday', 'You are free 10 to 11, and after 3.'));
  part(root, 'chip-draft').addEventListener('click', () => take('Draft a reply', 'Here is a short reply to the Thursday thread.'));
}
