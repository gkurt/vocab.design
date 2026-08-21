import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const BADGE_STYLE = [
  'position: absolute',
  'top: -3px',
  'right: -5px',
  'display: inline-flex',
  'align-items: center',
  'justify-content: center',
  'min-width: 17px',
  'height: 17px',
  'padding: 0 4px',
  'border: 2px solid var(--sp-surface)',
  'border-radius: 999px',
  'background: var(--sp-accent)',
  'color: var(--sp-accent-ink)',
  'font-size: 10px',
  'font-weight: 700',
  'line-height: 1',
  // Not interactive is half the definition, so the marker takes no input at all.
  'pointer-events: none',
].join('; ');

/**
 * Badge specimen: a count stuck to an icon button, and a countless dot stuck to a
 * second one. The subject is the marker itself, not its host: a badge has no meaning
 * away from the thing it is attached to, but the thing it is attached to is not the
 * term.
 *
 * Its non-interactivity is shown honestly rather than asserted. The badge takes no
 * pointer events, and the count changes because a message arrives (a scenery control
 * in the context register), never because anyone pressed the badge.
 *
 * The count goes from one digit to two without moving anything (SPEC §5): the marker
 * is out of the flow and the toolbar is sized for the two-digit state.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 252px">
        <div class="sp-topbar">
          <span class="sp-heading sp-grow sp-context">Mailbox</span>
          <span data-part="host-count" style="position: relative; display: inline-flex; margin-right: 8px">
            <span class="sp-context" style="display: inline-flex">
              <button class="sp-icon-button" type="button" data-part="inbox" aria-label="Inbox, 9 unread">${icon('inbox')}</button>
            </span>
            <span data-part="badge" data-subject data-count="9" style="${BADGE_STYLE}">9<span class="sp-visually-hidden"> unread</span></span>
          </span>
          <span class="sp-context" data-part="host-dot" style="position: relative; display: inline-flex">
            <button class="sp-icon-button" type="button" data-part="bell" aria-label="Alerts, updated">${icon('bell')}</button>
            <span
              data-part="dot"
              style="position: absolute; top: 0; right: 0; width: 9px; height: 9px; border: 2px solid var(--sp-surface); border-radius: 50%; background: var(--sp-accent); pointer-events: none"
            ></span>
          </span>
        </div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column">
          <ul class="sp-list sp-surface" style="padding: 4px 6px">
            <li class="sp-list-item"><span class="sp-avatar">RK</span><span class="sp-grow">Rota for next week</span><span class="sp-label">09:14</span></li>
            <li class="sp-list-item"><span class="sp-avatar">TM</span><span class="sp-grow">Invoice 4192 is due</span><span class="sp-label">08:02</span></li>
            <li class="sp-list-item"><span class="sp-avatar">JD</span><span class="sp-grow">Re: harbour photos</span><span class="sp-label">Yesterday</span></li>
          </ul>
          <div class="sp-row sp-row--between" style="margin-top: auto">
            <span class="sp-text" data-part="readout" style="white-space: nowrap">Nothing has arrived yet</span>
            <button class="sp-button sp-button--sm" type="button" data-part="arrive" style="flex: 0 0 auto">Message arrives</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const badge = part(root, 'badge');
  const inbox = part(root, 'inbox');
  const readout = part(root, 'readout');
  let count = 9;

  // The badge is a reading of its host, so the host's own accessible name carries the
  // count too: a bare numeral beside an icon announces as a bare numeral.
  const bump = () => {
    count += 1;
    badge.dataset.count = String(count);
    badge.innerHTML = `${count}<span class="sp-visually-hidden"> unread</span>`;
    inbox.setAttribute('aria-label', `Inbox, ${count} unread`);
    readout.textContent = 'One message arrived, one count went up';
  };

  part(root, 'arrive').addEventListener('click', bump);
}
