import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Orientation = 'landscape' | 'portrait';

/** The device shell in each orientation. The viewport inside it is the shell minus its bezel. */
const SHELL: Record<Orientation, { w: number; h: number }> = {
  portrait: { w: 86, h: 140 },
  landscape: { w: 140, h: 86 },
};

const CAPTION: Record<Orientation, string> = {
  landscape:
    'Criterion 1.3.4 asks that view and operation not be restricted to one orientation unless it is essential. A mounted device cannot be turned.',
  portrait: 'Upright, nothing looks wrong. A lock costs nothing at all until the reader is the one who cannot turn the device.',
};

/**
 * Orientation lock specimen: the same app in two builds, side by side, on a device the reader
 * turns with a segmented control. One build reflows into the width it is given; the other is
 * locked to portrait and answers landscape with a wall. The specimen mounts turned, because
 * that is the orientation in which the lock is the thing on screen.
 *
 * The subject is the locked app's viewport, the narrowest element the term names: the lock is
 * a property of the app rather than of the hardware, so a ring around the device shell would
 * name a phone. Upright is a state the same viewport passes through with nothing to show, so
 * the honest condition lives in `data-pose` and the mount state satisfies it: identify refuses
 * to pose a locked app that happens to be the right way up, and plays on (SPEC §6). The
 * segmented control, both device shells, the labels, the reflowing build and the caption are
 * scenery (SPEC §5).
 *
 * Each shell sits on a fixed baseline with its label under it, so the caption below never moves
 * and the change is the shape of the device (SPEC §5). Each segment reaches its own orientation rather than toggling
 * (SPEC §8); the shells animate with a CSS transition, so nothing is measured after a write and
 * reduced motion lands it instantly, and no timer is needed.
 */
export function mount(root: HTMLElement): void {
  const listRow = () => `
    <div class="sp-row" style="gap: 5px">
      <span style="flex: 0 0 auto; width: 6px; height: 6px; border-radius: 50%; background: var(--sp-accent)"></span>
      <span class="sp-line" style="flex: 1 1 auto; height: 5px"></span>
    </div>`;

  const app = (key: string) => `
    <div class="sp-stack" data-part="app-${key}" style="height: 100%; padding: 6px; gap: 5px">
      <span class="sp-label" style="font-size: 9px">Inbox</span>
      <div data-part="rows-${key}" style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 6px">
        ${listRow()}${listRow()}${listRow()}${listRow()}
      </div>
    </div>`;

  const wall = `
    <div class="sp-empty" data-part="wall" style="gap: 5px; padding: 6px">
      <svg class="sp-icon" viewBox="0 0 24 24" aria-hidden="true" style="width: 22px; height: 22px; color: var(--sp-muted)">
        <rect x="8" y="3.5" width="8" height="17" rx="2"></rect>
        <path d="M4.4 13.6a8 8 0 0 0 2.6 4.7"></path>
        <path d="m3 12.1 1.4 1.8 1.8-1.4"></path>
      </svg>
      <span class="sp-text" style="font-size: 9px; line-height: 1.3">Rotate your device</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-axis="Orientation" data-term="landscape" data-part="segmented" data-value="landscape">
            <button class="sp-segment" data-part="seg-portrait" value="portrait"
                    style="padding: 5px 10px; font-size: 12px">Upright</button>
            <button class="sp-segment" data-part="seg-landscape" value="landscape"
                    style="padding: 5px 10px; font-size: 12px">Turned</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="margin-top: 10px; height: 160px; gap: 24px; align-items: flex-end;
                                   justify-content: center">
          <div style="flex: 0 0 auto; display: flex; flex-direction: column; align-items: center; gap: 6px">
            <div class="sp-surface" data-part="shell-locked"
                 style="width: 140px; height: 86px; padding: 5px; background: var(--sp-sunken); border-radius: 12px;
                        transition: width 0.28s var(--sp-ease), height 0.28s var(--sp-ease)">
              <div class="sp-surface" data-part="view-locked" data-subject data-pose="[data-blocked]" data-blocked
                   style="width: 100%; height: 100%; overflow: hidden; border-radius: 8px">
                ${app('locked')}${wall}
              </div>
            </div>
            <span class="sp-label sp-context" style="height: 14px; font-size: 10px">Locked to portrait</span>
          </div>

          <div class="sp-context" style="flex: 0 0 auto; display: flex; flex-direction: column; align-items: center; gap: 6px">
            <div class="sp-surface" data-part="shell-fluid"
                 style="width: 140px; height: 86px; padding: 5px; background: var(--sp-sunken); border-radius: 12px;
                        transition: width 0.28s var(--sp-ease), height 0.28s var(--sp-ease)">
              <div class="sp-surface" data-part="view-fluid"
                   style="width: 100%; height: 100%; overflow: hidden; border-radius: 8px">
                ${app('fluid')}
              </div>
            </div>
            <span class="sp-label" style="height: 14px; font-size: 10px">Reflows either way</span>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-orientation="landscape"
           style="margin: 9px 0 0; height: 32px; font-size: 11px">${CAPTION.landscape}</p>
      </div>
    </div>
  `;

  const locked = part(root, 'view-locked');
  const appLocked = part(root, 'app-locked');
  const wallEl = part(root, 'wall');
  const caption = part(root, 'caption');

  const apply = (orientation: Orientation) => {
    const size = SHELL[orientation];
    for (const key of ['shell-locked', 'shell-fluid']) {
      const shell = part(root, key);
      shell.style.width = `${size.w}px`;
      shell.style.height = `${size.h}px`;
    }
    // Upright, the same four rows fall into one column; turned, they take the extra width.
    for (const key of ['rows-locked', 'rows-fluid'])
      part(root, key).style.gridTemplateColumns = orientation === 'landscape' ? '1fr 1fr' : '1fr';

    const blocked = orientation === 'landscape';
    flag(locked, 'data-blocked', blocked);
    flag(appLocked, 'hidden', blocked);
    flag(wallEl, 'hidden', !blocked);
    caption.dataset.orientation = orientation;
    caption.textContent = CAPTION[orientation];
  };

  apply('landscape');

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Orientation);
  });
}
