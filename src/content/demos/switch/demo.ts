import { part, partsOf } from '#src/kit/parts.ts';

const STATUS_OFF = 'Alerts arrive the moment they are sent';
const STATUS_ON = 'Alerts are held until 8:00 AM';

const QUEUE = ['Ada commented on Q3 plan', 'Build 412 finished'];

/**
 * Switch specimen: one setting, flipped in place. The subject is the control alone,
 * not the row it sits in, since the label is scenery the term does not name.
 *
 * Everything the setting governs answers on the same tick as the flip: no Save, no
 * Apply, no pending state. That immediacy is the whole term, so the demo has no
 * timers at all and the clock stays unused.
 *
 * The verdict line and the queue count are both given their room up front (SPEC §5):
 * the two status strings are measured on mount, and the count sits at the end of a
 * row whose label grows, so appearing costs nothing that was already on screen.
 */
export function mount(root: HTMLElement): void {
  const queue = QUEUE.map(
    (text) => `
      <li class="sp-list-item">
        <span class="sp-grow">${text}</span>
        <span class="sp-text" data-part="when" style="width: 58px; text-align: right">now</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 250px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Notifications</span></div>
        <div class="sp-body sp-stack" style="gap: 12px">
          <div class="sp-surface" style="padding: 10px 12px">
            <div class="sp-row sp-row--between">
              <span class="sp-text sp-text--ink" id="vd-switch-label">Do not disturb</span>
              <button
                class="sp-switch"
                type="button"
                role="switch"
                aria-checked="false"
                aria-labelledby="vd-switch-label"
                data-part="switch"
                data-subject
              ></button>
            </div>
            <div data-part="status-slot" style="margin-top: 6px">
              <span class="sp-text" data-part="status" role="status">${STATUS_OFF}</span>
            </div>
          </div>
          <div class="sp-context sp-stack" style="gap: 6px">
            <div class="sp-row">
              <span class="sp-label sp-grow">Queue</span>
              <span class="sp-label" data-part="held-count" hidden>${QUEUE.length} held</span>
            </div>
            <ul class="sp-list sp-surface">${queue}</ul>
          </div>
        </div>
      </div>
    </div>
  `;

  const control = part(root, 'switch');
  const slot = part(root, 'status-slot');
  const status = part(root, 'status');
  const heldCount = part(root, 'held-count');
  const whens = partsOf(root, 'when');

  // Measured rather than guessed: the longer sentence is the only thing that could
  // wrap to a second line and push the queue down after mount.
  let reserved = 0;
  for (const text of [STATUS_OFF, STATUS_ON]) {
    status.textContent = text;
    reserved = Math.max(reserved, slot.offsetHeight);
  }
  status.textContent = STATUS_OFF;
  slot.style.height = `${reserved}px`;

  const apply = (on: boolean) => {
    control.setAttribute('aria-checked', String(on));
    status.textContent = on ? STATUS_ON : STATUS_OFF;
    for (const cell of whens) cell.textContent = on ? '8:00 AM' : 'now';
    heldCount.hidden = !on;
  };

  // The trigger toggles, and here the toggling is the term (SPEC §8): the script
  // drives both directions, so no pass can leave the setting in the wrong state.
  control.addEventListener('click', () => apply(control.getAttribute('aria-checked') !== 'true'));
}
