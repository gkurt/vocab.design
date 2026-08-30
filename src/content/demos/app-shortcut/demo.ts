import type { IconName } from '#src/kit/icons.ts';
import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import { pressureHold } from '#src/kit/touch.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The phone screen's box, stated once: opening the menu never resizes anything (SPEC §5). */
const SCREEN = { w: 336, h: 206 };
const MENU_W = 160;
/** How far up from the screen's bottom edge the menu is anchored, clear of the icon row. */
const MENU_BOTTOM = 80;
/** The fraction of the force ramp a press must reach before the launcher answers it. */
const OPEN_AT = 0.4;

interface App {
  key: string;
  name: string;
  glyph: IconName;
  wash: string;
  /** Two to four entry points, the most likely one first: the whole list is read with a finger down. */
  actions: string[];
}

const APPS: App[] = [
  { key: 'mail', name: 'Mail', glyph: 'inbox', wash: 'linear-gradient(160deg, #5b8def, #2f5bd0)', actions: ['New message', 'Search mail'] },
  {
    key: 'notes',
    name: 'Notes',
    glyph: 'pencil',
    wash: 'linear-gradient(160deg, #f2b134, #d18e12)',
    actions: ['New note', 'New checklist', 'Scan a page'],
  },
  {
    key: 'calendar',
    name: 'Calendar',
    glyph: 'calendar',
    wash: 'linear-gradient(160deg, #ef7c5c, #d1492f)',
    actions: ['New event', "Today's agenda"],
  },
  { key: 'tasks', name: 'Tasks', glyph: 'check', wash: 'linear-gradient(160deg, #4fc3a1, #1f8f74)', actions: ['Add task', 'Due today'] },
];

/**
 * App shortcut specimen: a phone home screen whose icons answer a held finger with the app's own
 * short list of entry points. The screen is a touch surface (`data-touch`), so the script's `hold`
 * step presses it as a fingertip whose force climbs at a finger's rate; the launcher answers once
 * the press is past its threshold, and the menu stays up after the finger lifts, because a long
 * press is not a tap. A real reader reaches the same signal through `pressureHold` (SPEC §7): a
 * held mouse button buys the same depth with time.
 *
 * The subject is the menu, the narrowest element the term names. The icon is a launcher and the
 * gesture is a long press; the word names only the list the launcher draws for an app that is not
 * running, which is why the readout keeps saying so. There is one menu element, retargeted and
 * refilled per icon rather than one per app, so the specimen always has exactly one subject, and
 * it is honestly an app shortcut menu whenever it is up, so no `data-pose` condition is needed.
 * When it is down, identify summons it by fast-forwarding the script.
 *
 * The menu is absolutely positioned against the screen and anchored above the icon row, so opening
 * it moves nothing (SPEC §5); its own height follows its item count, which is the menu being the
 * thing that changes rather than an incidental shift. A press held on a second icon retargets the
 * menu to that app rather than toggling anything, so a pass resumed anywhere lands on a state
 * (SPEC §8), and choosing an item is the only dismissal.
 *
 * A line under the screen used to read "Hold an icon: the launcher asks the app for its
 * entry points...", which was the site instructing the reader from inside the phone. The
 * article says it, so the line went and the frame lost the height it was holding for it.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const launcher = (app: App) => `
    <button
      type="button"
      data-part="icon-${app.key}"
      aria-label="${app.name}"
      style="display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 0 0 auto; width: 56px; padding: 0; border: 0;
             background: transparent; touch-action: none; cursor: pointer"
    >
      <span
        style="display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 12px;
               background: ${app.wash}; color: #ffffff; box-shadow: 0 2px 7px rgb(16 24 40 / 0.32)"
      >${icon(app.glyph)}</span>
      <span style="color: #ffffff; font-size: 11px; text-shadow: 0 1px 2px rgb(16 24 40 / 0.5)">${app.name}</span>
    </button>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 262px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Home screen</span>
          <span class="sp-label" data-part="readout" data-ran="none" style="font-size: 11px; white-space: nowrap"
            >Nothing launched yet</span
          >
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 9px 12px">
          <div
            data-part="screen"
            data-touch
            data-menu="closed"
            style="position: relative; width: ${SCREEN.w}px; height: ${SCREEN.h}px; border-radius: 14px; overflow: hidden;
                   background: linear-gradient(158deg, #33406a 0%, #4d5f96 52%, #8171ad 100%)"
          >
            <div
              class="sp-row"
              style="position: absolute; left: 10px; right: 10px; bottom: 12px; justify-content: space-around; gap: 0"
            >
              ${APPS.map(launcher).join('')}
            </div>

            <div
              class="sp-menu"
              data-part="menu"
              data-subject
              data-app="notes"
              role="menu"
              style="left: 48px; bottom: ${MENU_BOTTOM}px; width: ${MENU_W}px; transform-origin: bottom left"
            >
              <span class="sp-label" data-part="menu-app" style="display: block; padding: 1px 8px 4px; font-size: 11px">Notes</span>
              <div class="sp-stack" data-part="menu-items" style="gap: 0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const screen = part(root, 'screen');
  const menu = part(root, 'menu');
  const menuApp = part(root, 'menu-app');
  const items = part(root, 'menu-items');
  const readout = part(root, 'readout');

  /** Where each icon sits inside the screen, measured once on mount before any style is written. */
  const anchors = new Map<string, number>();
  for (const app of APPS) {
    const el = part(root, `icon-${app.key}`);
    const centre = el.offsetLeft + el.offsetWidth / 2;
    anchors.set(app.key, Math.round(Math.min(Math.max(centre - MENU_W / 2, 8), SCREEN.w - MENU_W - 8)));
  }

  const close = () => {
    flag(menu, 'data-open', false);
    screen.dataset.menu = 'closed';
  };

  const open = (app: App) => {
    menu.dataset.app = app.key;
    menuApp.textContent = app.name;
    menu.style.left = `${anchors.get(app.key) ?? 8}px`;
    items.innerHTML = app.actions
      .map(
        (action, index) => `
          <button class="sp-menu-item" type="button" role="menuitem" data-part="item-${index + 1}" style="padding: 5px 8px; font-size: 12px; white-space: nowrap"
            >${action}</button>`,
      )
      .join('');
    for (const [index, action] of app.actions.entries()) {
      part(root, `item-${index + 1}`).addEventListener('click', () => {
        close();
        // The menu is gone the moment it is used, so the evidence lands on the readout (SPEC §8).
        readout.dataset.ran = `${app.key}-${index + 1}`;
        readout.textContent = `${action}, opened from the ${app.name} icon`;
      });
    }
    // Reaching a state rather than flipping one: a press always opens, and only a choice closes.
    flag(menu, 'data-open', true);
    screen.dataset.menu = 'open';
  };

  // One press signal for the script's fingertip, a real finger, and a held mouse button (SPEC §7).
  // A bare tap never gets past the threshold, which is the honest answer to one: it launches instead.
  for (const app of APPS) {
    pressureHold(part(root, `icon-${app.key}`), clock, {
      onForce: (force) => {
        if (force < OPEN_AT) return;
        if (menu.dataset.app === app.key && menu.hasAttribute('data-open')) return;
        open(app);
      },
      onEnd: () => {
        // The finger lifting leaves the menu up: the list is read after the press, not during it.
      },
    });
  }

  close();
}
