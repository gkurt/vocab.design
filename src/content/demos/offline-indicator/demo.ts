import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long the queue takes to flush once the connection is back. */
const FLUSH_MS = 600;

const OFFLINE_TEXT = {
  idle: 'Offline. You can keep reading and writing.',
  queued: 'Offline. 1 message queued, it sends on reconnect.',
} as const;

/**
 * Offline indicator specimen: the notice that stays for as long as the condition
 * does. The subject is the pill, not the app behind it: what the term names is the
 * persistent claim about the connection, and the queued message beside it is the
 * consequence the pill is talking about.
 *
 * The pill's room is measured at mount and held whether it is showing or not
 * (SPEC §5), so losing the network never pushes the conversation down the frame.
 * The network control is instrumentation, so it is scenery, and it picks a state
 * rather than toggling one (SPEC §8).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Northwind crew</span></div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <div data-part="slot">
            <div class="sp-row sp-surface" data-part="pill" data-subject role="status" style="gap: 8px; padding: 6px 10px">
              <span class="sp-swatch sp-pulse" style="width: 8px; height: 8px; flex: 0 0 auto; --sp-swatch: var(--sp-warn)"></span>
              <span class="sp-text sp-text--ink sp-grow" data-part="pill-text">${OFFLINE_TEXT.idle}</span>
            </div>
          </div>
          <ul class="sp-list sp-scroll sp-context sp-grow" data-part="thread">
            <li class="sp-list-item"><span class="sp-avatar">R</span><span class="sp-grow">Boat is loaded</span><span class="sp-text">9:02</span></li>
            <li class="sp-list-item"><span class="sp-avatar">T</span><span class="sp-grow">See you at the dock</span><span class="sp-text">9:04</span></li>
          </ul>
        </div>
        <div class="sp-divider"></div>
        <div class="sp-row sp-context" style="flex: 0 0 auto; padding: 10px 12px; gap: 8px">
          <input class="sp-input" data-part="composer" type="text" spellcheck="false" aria-label="Message" placeholder="Message" />
          <button class="sp-button sp-button--sm" data-part="send" type="button">Send</button>
        </div>
      </div>
      <sp-segmented class="sp-segmented sp-context" data-part="net" data-value="online">
        <button class="sp-segment" data-part="net-online" value="online">Online</button>
        <button class="sp-segment" data-part="net-offline" value="offline">Offline</button>
      </sp-segmented>
    </div>
  `;

  const slot = part(root, 'slot');
  const pill = part(root, 'pill');
  const pillText = part(root, 'pill-text');
  const thread = part(root, 'thread');
  const composer = part(root, 'composer') as HTMLInputElement;

  // The notice keeps its room whether it is up or not, so the thread never jumps.
  slot.style.height = `${slot.offsetHeight}px`;
  pill.hidden = true;

  let online = true;
  let queued: HTMLElement | undefined;

  const paint = () => {
    pill.hidden = online;
    pillText.textContent = queued ? OFFLINE_TEXT.queued : OFFLINE_TEXT.idle;
  };

  const send = () => {
    // One message in the queue is enough to make the point, and it keeps a
    // replayed script landing in the same place every time.
    if (queued) return;
    const text = composer.value.trim() || 'On my way';
    composer.value = '';
    thread.insertAdjacentHTML(
      'beforeend',
      `<li class="sp-list-item" data-part="queued" data-pending>
         <span class="sp-avatar">Y</span>
         <span class="sp-grow">${text}</span>
         <span class="sp-text sp-pending" data-part="queued-mark">Queued</span>
       </li>`,
    );
    queued = part(root, 'queued');
    thread.scrollTop = thread.scrollHeight;
    paint();
  };

  const setNetwork = (next: 'online' | 'offline') => {
    online = next === 'online';
    paint();
    if (!online || !queued) return;
    // Reconnecting is as visible as disconnecting was, and it names what got sent.
    clock.setTimeout(() => {
      const row = queued;
      if (!row) return;
      row.removeAttribute('data-pending');
      // The row leaves the queue by name as well as by state, so the next send
      // looks up its own row rather than this delivered one.
      row.dataset.part = 'sent';
      const mark = part(row, 'queued-mark');
      mark.className = 'sp-text';
      mark.textContent = 'Sent';
      queued = undefined;
      paint();
    }, FLUSH_MS);
  };

  part(root, 'send').addEventListener('click', send);
  part(root, 'net').addEventListener('change', (event) => setNetwork((event as CustomEvent<string>).detail as 'online' | 'offline'));
}
