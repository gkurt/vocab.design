import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const SCREENS = [
  { id: 'inbox', label: 'Inbox' },
  { id: 'message', label: 'Message' },
];

const ROWS = [
  { initials: 'AM', name: 'Ada M.', line: 'Colour ramp is ready' },
  { initials: 'JR', name: 'Jo R.', line: 'Two notes on the spec' },
  { initials: 'PK', name: 'Pia K.', line: 'Shipping Thursday' },
];

/**
 * Slide specimen: two screens on one track, moved by translating the track. The
 * direction is not stated anywhere in the demo: it falls out of which index the
 * track is asked for, which is exactly the argument the term makes on screen.
 *
 * Nav items resolve to an absolute index through one `go()`, so a pass that is
 * fast-forwarded or resumed lands on the screen it named rather than on
 * whichever one it was not showing (SPEC §8). The viewport holds its height and
 * clips, and the screens are flex items of a fixed-width row, so the screen
 * arriving takes exactly the room the one leaving gave up (SPEC §5).
 *
 * The off-screen half is still in the DOM, which is why `data-current` and
 * `aria-hidden` carry the state: clipped is not the same as gone, for a reader
 * stepping through by keyboard or for a script asking what is on screen.
 */
export function mount(root: HTMLElement): void {
  const rows = ROWS.map(
    (row) => `
      <li class="sp-list-item">
        <span class="sp-avatar">${row.initials}</span>
        <span class="sp-stack sp-grow" style="gap: 2px">
          <span class="sp-text sp-text--ink">${row.name}</span>
          <span class="sp-label">${row.line}</span>
        </span>
      </li>`,
  ).join('');

  const nav = SCREENS.map(
    (screen) => `<button class="sp-nav-item" type="button" data-part="nav-${screen.id}" style="flex: 1">${screen.label}</button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 366px; height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Mail</span>
          <span class="sp-label" data-part="where">Inbox</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface" data-part="viewport" style="flex: 1 1 auto; min-height: 0; overflow: hidden">
            <div
              class="sp-row"
              data-part="track"
              data-subject
              data-index="0"
              style="height: 100%; gap: 0; align-items: stretch; translate: 0 0; transition: translate 0.36s var(--sp-ease)"
            >
              <section data-part="screen-inbox" style="flex: 0 0 100%; padding: 4px 6px">
                <ul class="sp-list">${rows}</ul>
              </section>
              <section data-part="screen-message" class="sp-stack" style="flex: 0 0 100%; gap: 8px; padding: 12px">
                <span class="sp-row" style="gap: 8px">
                  <span class="sp-avatar">AM</span>
                  <span class="sp-heading" style="font-size: 13px">Colour ramp is ready</span>
                </span>
                <span class="sp-line" style="width: 94%"></span>
                <span class="sp-line" style="width: 88%"></span>
                <span class="sp-line" style="width: 62%"></span>
                <span class="sp-row" style="gap: 6px; margin-top: 2px">
                  <span class="sp-chip" style="cursor: default">${icon('share')} Reply</span>
                </span>
              </section>
            </div>
          </div>
          <div class="sp-row sp-context" style="gap: 4px">${nav}</div>
        </div>
      </div>
    </div>
  `;

  const track = part(root, 'track');
  const where = part(root, 'where');

  const go = (to: number) => {
    const index = Math.min(Math.max(to, 0), SCREENS.length - 1);
    track.dataset.index = String(index);
    track.style.translate = `${index * -100}% 0`;
    SCREENS.forEach((screen, i) => {
      const panel = part(root, `screen-${screen.id}`);
      flag(panel, 'data-current', i === index);
      panel.setAttribute('aria-hidden', String(i !== index));
      const item = part(root, `nav-${screen.id}`);
      flag(item, 'data-current', i === index);
      if (i === index) where.textContent = screen.label;
    });
  };

  SCREENS.forEach((screen, i) => {
    part(root, `nav-${screen.id}`).addEventListener('click', () => go(i));
  });

  go(0);
}
