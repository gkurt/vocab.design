import type { IconName } from '#src/kit/icons.ts';
import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const SCREEN = { w: 440, h: 208 };
const TILE = 32;

interface App {
  key: string;
  name: string;
  glyph: IconName;
  wash: string;
  /** Pinned items keep their place in the strip whether or not they are running. */
  pinned: boolean;
}

const APPS: App[] = [
  { key: 'mail', name: 'Mail', glyph: 'inbox', wash: 'linear-gradient(160deg, #5b8def, #2f5bd0)', pinned: true },
  { key: 'calendar', name: 'Calendar', glyph: 'calendar', wash: 'linear-gradient(160deg, #ef7c5c, #d1492f)', pinned: true },
  { key: 'notes', name: 'Notes', glyph: 'pencil', wash: 'linear-gradient(160deg, #f2b134, #d18e12)', pinned: true },
  { key: 'settings', name: 'Settings', glyph: 'sliders', wash: 'linear-gradient(160deg, #8c95a6, #626b7c)', pinned: true },
  { key: 'preview', name: 'Preview', glyph: 'eye', wash: 'linear-gradient(160deg, #4fc3a1, #1f8f74)', pinned: false },
];

const PINNED = APPS.filter((app) => app.pinned);
const PIN_COUNT = PINNED.length;

/**
 * Dock specimen: the shell's own strip along the bottom of a desktop, holding four pinned
 * launchers, then a separator, then the one application that is running without being
 * pinned, then the trash. Every tile carries a running indicator under it, and pressing a
 * pinned launcher starts that app, which is the moment the strip's three jobs come apart:
 * the icon does not move, a dot appears under it, and the window it owns comes to the front.
 *
 * The subject is the strip itself, not one tile and not the desktop: the term names the row
 * and the sections inside it. It is honestly a dock in every state the script visits (a dock
 * with nothing running is still a dock), so no `data-pose` condition is needed. The desktop
 * wash, the window and the count line are scenery in the context register.
 *
 * Hover magnification is deliberately absent: that behaviour is its own term, and a dock
 * with it switched off (the macOS default) is still a dock. Running dots are drawn at full
 * size and faded rather than added, and the window is present from mount with only its
 * contents changing, so launching an app moves nothing (SPEC §5). Pressing a launcher sets
 * that app running and frontmost rather than toggling either, so a pass resumed anywhere
 * lands on a state instead of undoing one (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const tile = (app: App) => `
    <button
      type="button"
      data-part="tile-${app.key}"
      aria-label="${app.name}"
      style="display: flex; flex-direction: column; align-items: center; gap: 3px; flex: 0 0 auto; padding: 0; border: 0;
             background: transparent; cursor: pointer"
    >
      <span
        style="display: flex; align-items: center; justify-content: center; width: ${TILE}px; height: ${TILE}px; border-radius: 9px;
               background: ${app.wash}; color: #ffffff; box-shadow: 0 2px 6px rgb(16 24 40 / 0.3)"
      >${icon(app.glyph)}</span>
      <span
        data-part="dot-${app.key}"
        style="width: 5px; height: 5px; border-radius: 50%; background: #ffffff; box-shadow: 0 0 3px rgb(16 24 40 / 0.4);
               opacity: 0; transition: opacity 0.2s"
      ></span>
    </button>`;

  const divider = (n: number) => `
    <span
      data-part="divider-${n}"
      aria-hidden="true"
      style="flex: 0 0 auto; width: 2px; height: 28px; border-radius: 1px; background: rgb(255 255 255 / 0.45)"
    ></span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 296px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Desktop</span>
          <span class="sp-label" data-part="readout" data-pinned="${PIN_COUNT}" data-running="1" style="font-size: 11px; white-space: nowrap"
            >${PIN_COUNT} pinned, 1 running</span
          >
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; padding: 10px 12px">
          <div
            style="position: relative; width: ${SCREEN.w}px; height: ${SCREEN.h}px; border-radius: 8px; overflow: hidden;
                   background: linear-gradient(165deg, #2f3b63 0%, #4a5a92 54%, #7d6ba8 100%)"
          >
            <div
              class="sp-context"
              data-part="window"
              data-front="preview"
              style="position: absolute; left: 36px; top: 16px; width: 250px; height: 96px; border-radius: 8px; padding: 8px 10px;
                     background: rgb(255 255 255 / 0.9); border: 1px solid rgb(255 255 255 / 0.5); box-shadow: 0 6px 18px rgb(16 24 40 / 0.28)"
            >
              <span class="sp-heading" data-part="window-title" style="font-size: 12px; color: #23262b">Preview</span>
              <div class="sp-stack" style="gap: 6px; margin-top: 9px">
                <span class="sp-line" style="width: 88%; background: rgb(35 38 43 / 0.18)"></span>
                <span class="sp-line" style="width: 62%; background: rgb(35 38 43 / 0.18)"></span>
                <span class="sp-line" style="width: 74%; background: rgb(35 38 43 / 0.18)"></span>
              </div>
            </div>

            <div
              class="sp-row"
              data-part="dock"
              data-subject
              data-front="preview"
              style="position: absolute; left: 50%; bottom: 10px; translate: -50% 0; align-items: flex-end; gap: 8px;
                     padding: 6px 8px; border-radius: 14px; background: rgb(255 255 255 / 0.22);
                     border: 1px solid rgb(255 255 255 / 0.32); backdrop-filter: blur(8px)"
            >
              ${PINNED.map(tile).join('')}
              ${divider(1)}
              ${APPS.filter((app) => !app.pinned)
                .map(tile)
                .join('')}
              ${divider(2)}
              <button
                type="button"
                data-part="tile-trash"
                aria-label="Trash"
                style="display: flex; flex-direction: column; align-items: center; gap: 3px; flex: 0 0 auto; padding: 0; border: 0;
                       background: transparent; cursor: pointer"
              >
                <span
                  style="display: flex; align-items: center; justify-content: center; width: ${TILE}px; height: ${TILE}px;
                         border-radius: 9px; background: rgb(255 255 255 / 0.26); color: #ffffff"
                >${icon('trash')}</span>
                <span style="width: 5px; height: 5px"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const dock = part(root, 'dock');
  const readout = part(root, 'readout');
  const windowEl = part(root, 'window');
  const title = part(root, 'window-title');

  /** Which apps are running. Preview is the unpinned one, so it is running by definition. */
  const running = new Set<string>(['preview']);

  const render = () => {
    for (const app of APPS) {
      const dot = part(root, `dot-${app.key}`);
      dot.style.opacity = running.has(app.key) ? '1' : '0';
    }
    readout.dataset.running = String(running.size);
    readout.textContent = `${PIN_COUNT} pinned, ${running.size} running`;
  };

  const front = (key: string) => {
    const app = APPS.find((entry) => entry.key === key);
    if (!app) return;
    // Pressing a launcher reaches a state: running and frontmost, never a toggle (SPEC §8).
    running.add(app.key);
    dock.dataset.front = app.key;
    windowEl.dataset.front = app.key;
    title.textContent = app.name;
    render();
  };

  for (const app of APPS) part(root, `tile-${app.key}`).addEventListener('click', () => front(app.key));

  render();
}
