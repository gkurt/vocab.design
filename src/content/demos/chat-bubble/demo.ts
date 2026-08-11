import { part } from '#src/kit/parts.ts';

const BASE = 'max-width: 74%; padding: 7px 11px; font-size: 13px; line-height: 1.45';
const RECEIVED = `${BASE}; align-self: flex-start; border-radius: 12px 12px 12px 3px`;
const SENT = `${BASE}; align-self: flex-end; background: var(--sp-accent); color: var(--sp-accent-ink); border-color: var(--sp-accent); border-radius: 12px 12px 3px 12px`;

const bubble = (style: string, text: string, attrs = '') => `<div class="sp-surface" ${attrs} style="${style}">${text}</div>`;

/**
 * Chat bubble specimen: a short thread with a composer under it. The subject is
 * one sent bubble, not the thread and not the row it sits in: the word names the
 * container around a single message. The other bubbles are peers of the term
 * rather than scenery, so they keep the normal register; the title bar and the
 * composer are the scenery.
 *
 * Sending appends inside the scroll container, which owns a fixed height, so the
 * composer and the title bar never move (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 260px">
        <div class="sp-topbar sp-context">
          <span class="sp-avatar">R</span>
          <span class="sp-heading sp-grow">Rosa Ibarra</span>
        </div>
        <div
          class="sp-body sp-scroll"
          data-part="thread"
          style="display: flex; flex-direction: column; gap: 8px; padding: 10px"
        >
          ${bubble(RECEIVED, 'Did the type ramp land?')}
          ${bubble(SENT, 'Merged this morning.', 'data-part="bubble-sent" data-subject')}
          ${bubble(RECEIVED, 'Nice. Did the caption size move with it?')}
        </div>
        <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 8px; padding: 8px 10px; border-top: 1px solid var(--sp-line)">
          <input class="sp-input" data-part="composer-input" placeholder="Message" autocomplete="off" />
          <button class="sp-button sp-button--sm" data-part="send">Send</button>
        </div>
      </div>
    </div>
  `;

  const thread = part(root, 'thread');
  const input = part(root, 'composer-input') as HTMLInputElement;

  part(root, 'send').addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    thread.insertAdjacentHTML('beforeend', bubble(SENT, text, 'data-part="bubble-new"'));
    input.value = '';
    thread.scrollTop = thread.scrollHeight;
  });
}
