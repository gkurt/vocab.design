import { type IconName, icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const NAV: { key: string; label: string; glyph: IconName; heading: string; note: string }[] = [
  { key: 'inbox', label: 'Inbox', glyph: 'inbox', heading: 'Inbox', note: '12 unread since Tuesday.' },
  { key: 'agenda', label: 'Agenda', glyph: 'calendar', heading: 'Agenda', note: 'Three slots left this week.' },
  { key: 'saved', label: 'Saved', glyph: 'star', heading: 'Saved', note: 'Eight threads kept for later.' },
  { key: 'settings', label: 'Settings', glyph: 'sliders', heading: 'Settings', note: 'Notifications, rules, signatures.' },
];

const RAIL = 76;
const ITEM_H = 46;
const ITEM_GAP = 6;
const STEP = ITEM_H + ITEM_GAP;
const PILL_W = 46;
const PILL_H = 30;

/**
 * Navigation rail specimen: the Material strip at the leading edge, four destinations
 * as icon over label, an action slot above them, and the pill indicator travelling to
 * whichever destination was picked.
 *
 * The subject is the rail, not the window: the term names one column of destinations,
 * and the pane beside it is the thing being navigated rather than part of the term.
 * The action slot inside the rail is scenery too, since the rail's own accent is the
 * indicator and a second accent above it would be competing for the same claim.
 *
 * The indicator is one element travelling between fixed slots rather than a highlight
 * per item, which is the behaviour the component is known for. Its stops are arithmetic
 * from the item metrics above, so nothing is measured after a style write (SPEC §5),
 * and every destination is an absolute pick rather than a step through a list (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const items = NAV.map(
    ({ key, label, glyph }, index) => `
      <button
        type="button"
        data-part="nav-${key}"
        data-key="${key}"
        style="position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center;
               gap: 2px; width: 100%; height: ${ITEM_H}px; margin-bottom: ${index === NAV.length - 1 ? 0 : ITEM_GAP}px;
               padding: 0; border: 0; background: transparent; color: var(--sp-muted); font: inherit; cursor: pointer"
      >
        <span style="display: flex; align-items: center; justify-content: center; height: ${PILL_H}px">${icon(glyph)}</span>
        <span style="font-size: 11px; line-height: 1">${label}</span>
      </button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 282px; flex-direction: row">
        <nav
          data-part="rail"
          data-subject
          aria-label="Sections"
          style="width: ${RAIL}px; flex: 0 0 auto; display: flex; flex-direction: column; align-items: center;
                 gap: 10px; padding: 10px 0; background: var(--sp-surface); border-right: 1px solid var(--sp-line)"
        >
          <button
            class="sp-button sp-context"
            type="button"
            data-part="compose"
            aria-label="New message"
            style="display: flex; align-items: center; justify-content: center; width: 44px; height: 36px;
                   padding: 0; border-radius: 12px"
          >${icon('plus')}</button>
          <div data-part="items" style="position: relative; width: 100%">
            <span
              data-part="indicator"
              aria-hidden="true"
              style="position: absolute; left: ${(RAIL - PILL_W) / 2}px; top: 0; width: ${PILL_W}px; height: ${PILL_H}px;
                     border-radius: 999px; background: var(--sp-accent-soft); transition: top 0.24s var(--sp-ease)"
            ></span>
            ${items}
          </div>
        </nav>
        <main class="sp-context sp-grow" data-part="pane" data-view="inbox" style="padding: 14px 16px; background: var(--sp-sunken)">
          <span class="sp-heading" data-part="pane-title">Inbox</span>
          <p class="sp-text" data-part="pane-note" style="margin: 6px 0 12px; height: 18px">12 unread since Tuesday.</p>
          <div class="sp-stack">
            <div class="sp-surface" style="height: 34px"></div>
            <div class="sp-surface" style="height: 34px"></div>
            <div class="sp-surface" style="height: 34px"></div>
          </div>
        </main>
      </div>
    </div>
  `;

  const indicator = part(root, 'indicator');
  const pane = part(root, 'pane');
  const title = part(root, 'pane-title');
  const note = part(root, 'pane-note');
  const buttons = NAV.map((entry) => part(root, `nav-${entry.key}`));

  const go = (key: string) => {
    const index = NAV.findIndex((entry) => entry.key === key);
    const entry = NAV[index];
    if (!entry) return;
    indicator.style.top = `${index * STEP}px`;
    buttons.forEach((button, i) => {
      const current = i === index;
      button.style.color = current ? 'var(--sp-ink)' : 'var(--sp-muted)';
      if (current) button.setAttribute('data-current', '');
      else button.removeAttribute('data-current');
      if (current) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    pane.dataset.view = key;
    title.textContent = entry.heading;
    note.textContent = entry.note;
  };

  for (const button of buttons) button.addEventListener('click', () => go(button.dataset.key ?? ''));

  go('inbox');
}
