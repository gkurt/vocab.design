import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The slots, stated once: the overlay draws these boxes and the frame is built to them. */
const BAR_H = 38;
const RAIL_W = 60;
const FAB = 46;

interface Screen {
  key: string;
  label: string;
  title: string;
  body: string;
  note: string;
}

const line = (width: number) => `<div class="sp-line" style="width: ${width}%"></div>`;

const inbox = `
  <div class="sp-list" style="width: 320px">
    ${['Harbour Board', 'Trinity Pilots', 'Customs office']
      .map(
        (name, i) => `
      <div class="sp-list-item" style="padding: 6px 8px">
        <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 10px">${name.slice(0, 1)}</span>
        <span class="sp-grow sp-stack" style="gap: 5px">
          <span style="font-size: 12px; font-weight: 500">${name}</span>
          ${line(60 + i * 12)}
        </span>
      </div>`,
      )
      .join('')}
  </div>`;

const calendar = `
  <div class="sp-stack" style="gap: 6px">
    <div class="sp-row" style="gap: 4px">
      ${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d) => `<span class="sp-label" style="width: 26px; text-align: center; font-size: 10px">${d}</span>`).join('')}
    </div>
    ${[0, 1, 2]
      .map(
        (week) => `
      <div class="sp-row" style="gap: 4px">
        ${Array.from({ length: 7 }, (_, day) => {
          const n = week * 7 + day + 1;
          const today = n === 9 ? ' data-today' : '';
          return `<span class="sp-day"${today} style="width: 26px; height: 24px; font-size: 11px">${n}</span>`;
        }).join('')}
      </div>`,
      )
      .join('')}
  </div>`;

const files = `
  <div class="sp-row" style="gap: 10px">
    ${['Survey.pdf', 'Berths.csv', 'Tides.xlsx']
      .map(
        (name) => `
      <div class="sp-surface" style="width: 96px; padding: 10px; background: var(--sp-sunken)">
        <div class="sp-stack" style="gap: 6px">
          <div style="height: 34px; border-radius: 4px; background: var(--sp-line)"></div>
          <span class="sp-label" style="font-size: 10px">${name}</span>
        </div>
      </div>`,
      )
      .join('')}
  </div>`;

const SCREENS: Screen[] = [
  { key: 'inbox', label: 'Inbox', title: 'Inbox', body: inbox, note: 'Three screens, one frame. The inbox hands the scaffold a list.' },
  {
    key: 'calendar',
    label: 'Calendar',
    title: 'March',
    body: calendar,
    note: 'A month now, and the bar, the rail and the action button did not move.',
  },
  { key: 'files', label: 'Files', title: 'Files', body: files, note: 'Cards now. A screen chooses its content, never its arrangement.' },
];

/**
 * Scaffold specimen: one app frame whose slots are drawn over it, with three screens dropping
 * their content into the body slot in turn.
 *
 * The subject is the slot skeleton, `data-part="slots"`: an overlay sized to the regions the
 * frame positions, given its own element because the arrangement has none of its own (SPEC §5).
 * Marking the app frame itself would claim the whole scene is the term and withdraw identify,
 * and the frame is not the term: the named, reusable positions are. The bar, the rail, the
 * body content, the action button and the picker are scenery in the context register.
 *
 * That the frame holds still is the claim, so it is measured rather than asserted by eye: after
 * every screen change the demo reads the three slot boxes as rendered and publishes them on the
 * overlay as `data-slots`, which an assert can hold to the same string across all three screens.
 * Nothing here transitions a box, so the read after a content swap is the real one (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const railItem = (name: 'inbox' | 'calendar' | 'copy', key: string) => `
    <span class="sp-nav-item" data-part="rail-${key}" style="display: flex; justify-content: center; padding: 7px 0">${icon(name)}</span>`;

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="position: relative; width: 476px; height: 226px">
        <div
          class="sp-topbar sp-context"
          data-part="slot-bar"
          style="flex: 0 0 auto; height: ${BAR_H}px; padding: 0 14px"
        >
          <span class="sp-heading sp-grow" data-part="title" style="font-size: 13px">Inbox</span>
          <span class="sp-avatar" style="width: 22px; height: 22px; font-size: 10px">K</span>
        </div>

        <div class="sp-body" style="display: flex; padding: 0; background: var(--sp-surface)">
          <div
            class="sp-nav sp-context"
            data-part="slot-rail"
            style="flex: 0 0 ${RAIL_W}px; gap: 4px; padding: 8px; background: var(--sp-sunken); border-right: 1px solid var(--sp-line)"
          >
            ${railItem('inbox', 'inbox')}
            ${railItem('calendar', 'calendar')}
            ${railItem('copy', 'files')}
          </div>

          <div
            class="sp-context"
            data-part="slot-body"
            data-screen="inbox"
            style="position: relative; flex: 1 1 auto; min-width: 0; display: flex; align-items: center; justify-content: center; padding: 12px ${FAB + 18}px 12px 16px; overflow: hidden"
          >
            <div data-part="content"></div>
            <button
              class="sp-button sp-context"
              type="button"
              data-part="fab"
              aria-label="Compose"
              style="position: absolute; right: 14px; bottom: 14px; display: inline-flex; align-items: center; justify-content: center;
                     width: ${FAB}px; height: ${FAB}px; padding: 0; border-radius: 16px; box-shadow: var(--sp-shadow)"
            >${icon('plus')}</button>
          </div>
        </div>

        <div
          data-part="slots"
          data-subject
          data-slots=""
          aria-hidden="true"
          style="position: absolute; inset: 0; pointer-events: none"
        >
          <span style="position: absolute; left: 4px; right: 4px; top: 4px; height: ${BAR_H - 8}px; border: 2px dashed var(--sp-accent); border-radius: 6px"></span>
          <span style="position: absolute; left: 4px; top: ${BAR_H + 4}px; width: ${RAIL_W - 8}px; bottom: 4px; border: 2px dashed var(--sp-accent); border-radius: 6px"></span>
          <span style="position: absolute; left: ${RAIL_W + 4}px; right: 4px; top: ${BAR_H + 4}px; bottom: 4px; border: 2px dashed var(--sp-accent); border-radius: 6px"></span>
          <span style="position: absolute; right: 10px; bottom: 10px; width: ${FAB + 8}px; height: ${FAB + 8}px; border: 2px dashed var(--sp-accent); border-radius: 20px"></span>
          <span class="sp-label" style="position: absolute; left: 50%; top: 11px; translate: -50% 0; font-size: 10px; color: var(--sp-accent)">app bar</span>
          <span class="sp-label" style="position: absolute; left: 12px; bottom: 10px; font-size: 10px; color: var(--sp-accent)">rail</span>
          <span class="sp-label" style="position: absolute; left: ${RAIL_W + 10}px; top: ${BAR_H + 10}px; font-size: 10px; color: var(--sp-accent)">body</span>
          <span class="sp-label" style="position: absolute; right: 12px; bottom: ${FAB + 22}px; font-size: 10px; color: var(--sp-accent)">action</span>
        </div>
      </div>

      <div class="sp-stack sp-context" style="align-items: center; gap: 7px; width: 476px">
        <sp-segmented class="sp-segmented" data-part="screens" data-value="inbox" data-axis="Screen">
          ${SCREENS.map(
            (screen) => `
            <button class="sp-segment" type="button" data-part="seg-${screen.key}" value="${screen.key}" style="padding: 4px 12px; font-size: 12px">${screen.label}</button>`,
          ).join('')}
        </sp-segmented>
        <span class="sp-label" data-part="note" role="status" style="height: 16px; width: 452px; font-size: 11px; line-height: 16px; text-align: center"></span>
      </div>
    </div>
  `;

  const bar = part(root, 'slot-bar');
  const rail = part(root, 'slot-rail');
  const body = part(root, 'slot-body');
  const slots = part(root, 'slots');
  const content = part(root, 'content');
  const title = part(root, 'title');
  const note = part(root, 'note');
  const railItems = new Map(SCREENS.map((screen) => [screen.key, part(root, `rail-${screen.key}`)]));

  const show = (key: string) => {
    const screen = SCREENS.find((entry) => entry.key === key);
    if (!screen) return;
    content.innerHTML = screen.body;
    title.textContent = screen.title;
    body.dataset.screen = screen.key;
    note.textContent = screen.note;
    for (const [name, item] of railItems) {
      if (name === screen.key) item.setAttribute('data-current', '');
      else item.removeAttribute('data-current');
    }
    // The frame's own geometry, as rendered: publishing it is what lets an assert prove the
    // scaffold did not move when the screen inside it changed.
    slots.dataset.slots = [
      Math.round(bar.offsetHeight),
      Math.round(rail.offsetWidth),
      Math.round(body.offsetWidth),
      Math.round(body.offsetHeight),
    ].join('-');
  };

  part(root, 'screens').addEventListener('change', (event) => show((event as CustomEvent<string>).detail));

  show('inbox');
}
