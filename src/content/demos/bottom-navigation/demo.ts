import { type IconName, icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

type Destination = { key: string; label: string; glyph: IconName; screen: string };

/** Stacked icon over label, each destination taking an equal share of the bar. */
const ITEM = 'display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 6px 2px; font-size: 11px';

const message = (initials: string, wide: number, short: number) => `
  <li class="sp-list-item">
    <span class="sp-avatar">${initials}</span>
    <div class="sp-stack sp-grow" style="gap: 5px">
      <div class="sp-line" style="width: ${wide}%"></div>
      <div class="sp-line" style="width: ${short}%"></div>
    </div>
  </li>`;

const marked = (glyph: IconName, wide: number) => `
  <li class="sp-list-item">
    ${icon(glyph)}
    <div class="sp-line" style="width: ${wide}%"></div>
  </li>`;

const DESTINATIONS = [
  {
    key: 'inbox',
    label: 'Inbox',
    glyph: 'inbox',
    screen: `<ul class="sp-list">${message('AR', 78, 54)}${message('MK', 64, 46)}${message('TS', 82, 38)}</ul>`,
  },
  {
    key: 'search',
    label: 'Search',
    glyph: 'search',
    screen: `
      <span class="sp-label">Recent</span>
      <div class="sp-row sp-row--wrap" style="margin-top: 8px">
        <span class="sp-chip">tide charts</span>
        <span class="sp-chip">gulls</span>
        <span class="sp-chip">field notes</span>
      </div>`,
  },
  {
    key: 'saved',
    label: 'Saved',
    glyph: 'star',
    screen: `<ul class="sp-list">${marked('star', 84)}${marked('star', 62)}${marked('star', 74)}</ul>`,
  },
  {
    key: 'alerts',
    label: 'Alerts',
    glyph: 'bell',
    screen: `<ul class="sp-list">${marked('bell', 70)}${marked('bell', 88)}</ul>`,
  },
] as const satisfies readonly Destination[];

/**
 * Bottom navigation specimen: the application's whole top level in one row at the
 * end of a phone screen. The bar is the subject; the screen it is switching, and
 * the title above it, are the scenery that proves the switch happened.
 *
 * Choosing a destination reaches a state rather than flipping one (SPEC §8): the
 * same tap always lands on the same destination, wherever the pass is picked up.
 * Nothing outside the screen area moves, since the frame, the title row, and the
 * bar are all fixed and only the panel inside them is exchanged (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const items = DESTINATIONS.map(
    (dest) => `
      <li style="flex: 1 1 0">
        <span class="sp-nav-item" data-part="dest-${dest.key}" style="${ITEM}">
          ${icon(dest.glyph)}<span>${dest.label}</span>
        </span>
      </li>`,
  ).join('');
  const screens = DESTINATIONS.map((dest) => `<div data-part="screen-${dest.key}" hidden>${dest.screen}</div>`).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 198px; height: 292px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" data-part="title">Inbox</span>
        </div>
        <div class="sp-body sp-context">${screens}</div>
        <nav
          data-part="bar"
          data-subject
          aria-label="Main"
          style="flex: 0 0 auto; padding: 4px; border-top: 1px solid var(--sp-line); background: var(--sp-surface)"
        >
          <ul class="sp-nav" style="flex-direction: row">${items}</ul>
        </nav>
      </div>
    </div>
  `;

  const title = part(root, 'title');

  const go = (chosen: Destination) => {
    for (const dest of DESTINATIONS) {
      const item = part(root, `dest-${dest.key}`);
      const current = dest.key === chosen.key;
      flag(item, 'data-current', current);
      if (current) item.setAttribute('aria-current', 'page');
      else item.removeAttribute('aria-current');
      part(root, `screen-${dest.key}`).hidden = !current;
    }
    title.textContent = chosen.label;
  };

  for (const dest of DESTINATIONS) part(root, `dest-${dest.key}`).addEventListener('click', () => go(dest));

  go(DESTINATIONS[0]);
}
