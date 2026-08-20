import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Version 1 geometry: 21 modules of data inside the four module quiet zone the spec demands. */
const MODULES = 21;
const QUIET = 4;
const SPAN = MODULES + QUIET * 2;
/** Device pixels per module. Below roughly two, a camera cannot resolve the grid at all. */
const MODULE_PX = 4;

/** The code's own paint. A matrix is dark on light in both themes, because the polarity is
 *  part of whether a decoder can read it, not part of the page's taste. */
const LIGHT = '#ffffff';
const DARK = '#14161a';

const rect = (x: number, y: number, w: number, h: number) =>
  `<rect x="${x + QUIET}" y="${y + QUIET}" width="${w}" height="${h}" fill="${DARK}"/>`;

/** A finder square: the heavy 7x7 eye a decoder locates the symbol by. */
const finder = (x: number, y: number) =>
  `${rect(x, y, 7, 7)}<rect x="${x + QUIET + 1}" y="${y + QUIET + 1}" width="5" height="5" fill="${LIGHT}"/>${rect(x + 2, y + 2, 3, 3)}`;

const reserved = (x: number, y: number) =>
  (x < 8 && y < 8) || (x >= MODULES - 8 && y < 8) || (x < 8 && y >= MODULES - 8) || x === 6 || y === 6;

/**
 * An abstract matrix: a plausible arrangement of modules, generated from a fixed seed so the
 * specimen is stable. It encodes nothing and decodes to nothing, which is why the demo never
 * claims it is scannable.
 */
function matrix(): string {
  const cells: string[] = [finder(0, 0), finder(MODULES - 7, 0), finder(0, MODULES - 7)];
  // Timing patterns: the alternating row and column that carry a decoder's grid reference.
  for (let i = 8; i < MODULES - 8; i += 2) {
    cells.push(rect(i, 6, 1, 1), rect(6, i, 1, 1));
  }
  let seed = 20260820;
  for (let y = 0; y < MODULES; y += 1) {
    for (let x = 0; x < MODULES; x += 1) {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      if (reserved(x, y)) continue;
      if (seed / 2147483648 < 0.48) cells.push(rect(x, y, 1, 1));
    }
  }
  return cells.join('');
}

interface Picker extends HTMLElement {
  value: string;
}

/**
 * QR code specimen: the one context that makes the matrix a component rather than a picture,
 * which is a pairing flow. The code sits in its own quiet zone with the remaining life of its
 * token under it and the same value printed as characters to type by hand, for a reader with
 * no second device. Naming the expired state greys the code and offers a refresh, since a
 * reader whose scan silently failed cannot tell a stale code from a bad camera angle.
 *
 * The subject is the code itself: the light box holding the matrix and the four module margin
 * around it, which is the symbol a camera reads and the narrowest element the term names. It
 * is honestly a QR code in both states (an expired code is a stale code, not a different
 * thing), so no `data-pose` condition is needed. The window chrome, the instructions, the
 * meter and the typed fallback are scenery, all of it in the context register so the only
 * chromatic thing on stage is the code.
 *
 * The picker names an absolute state so a pass picked up anywhere lands the same way, and the
 * refresh control drives it through the kit element's own `value` setter rather than
 * synthesizing a second click (SPEC §8). Both the status line and the refresh control sit in
 * slots sized from mount, so changing state moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const box = QUIET * 2 + MODULES;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 244px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Add a device</span>
          <sp-segmented class="sp-segmented" data-part="picker" data-value="live">
            <button class="sp-segment" type="button" data-part="seg-live" value="live" style="padding: 4px 10px; font-size: 12px">Live</button>
            <button class="sp-segment" type="button" data-part="seg-expired" value="expired" style="padding: 4px 10px; font-size: 12px">Expired</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 16px; padding: 16px">
          <div
            data-part="code"
            data-subject
            role="img"
            aria-label="Pairing code, also printed below as K3F 9QX 2M"
            style="flex: 0 0 auto; width: ${box * MODULE_PX}px; height: ${box * MODULE_PX}px; border-radius: 6px;
                   background: ${LIGHT}; transition: opacity 0.22s ease"
          >
            <svg viewBox="0 0 ${SPAN} ${SPAN}" width="${box * MODULE_PX}" height="${box * MODULE_PX}" aria-hidden="true"
                 shape-rendering="crispEdges" style="display: block">${matrix()}</svg>
          </div>

          <div class="sp-stack sp-context sp-grow" style="gap: 8px; min-width: 0">
            <span class="sp-heading" style="font-size: 13px">Scan with your phone</span>
            <span class="sp-text" style="font-size: 12px">Open the camera app and point it at the code. The device pairs itself.</span>

            <div class="sp-stack" style="flex: 0 0 auto; gap: 5px; height: 30px; align-items: flex-start">
              <div class="sp-progress sp-progress--meter" data-part="life" data-zone="ok" style="--sp-value: 58%; width: 150px; height: 5px"><div class="sp-progress-fill"></div></div>
              <span class="sp-label" data-part="status" data-state="live" style="font-size: 11px; height: 17px; line-height: 17px; white-space: nowrap"
                >Expires in 34 s</span
              >
            </div>

            <div class="sp-divider"></div>

            <div class="sp-row" style="gap: 8px; flex: 0 0 auto">
              <span class="sp-label" style="font-size: 11px; white-space: nowrap">No phone?</span>
              <span
                class="sp-text sp-text--ink"
                data-part="fallback"
                style="flex: 0 0 auto; font-size: 12px; font-weight: 600; letter-spacing: 0.14em; white-space: nowrap"
                >K3F 9QX 2M</span
              >
            </div>

            <div style="flex: 0 0 auto; height: 30px">
              <button class="sp-button sp-button--sm" type="button" data-part="refresh" hidden style="font-size: 12px">Get a new code</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const picker = part(root, 'picker') as Picker;
  const code = part(root, 'code');
  const life = part(root, 'life');
  const status = part(root, 'status');
  const refresh = part(root, 'refresh');

  const render = () => {
    const expired = picker.value === 'expired';
    code.style.opacity = expired ? '0.3' : '1';
    life.style.setProperty('--sp-value', expired ? '0%' : '58%');
    life.dataset.zone = expired ? 'warn' : 'ok';
    status.dataset.state = expired ? 'expired' : 'live';
    status.textContent = expired ? 'This code has expired' : 'Expires in 34 s';
    status.style.color = expired ? 'var(--sp-warn)' : 'var(--sp-muted)';
    flag(refresh, 'hidden', !expired);
  };

  picker.addEventListener('change', render);
  // The kit element's own setter moves the thumb and fires `change`: a demo never
  // synthesizes a second click to reach a state (SPEC §8).
  refresh.addEventListener('click', () => {
    picker.value = 'live';
  });

  render();
}
