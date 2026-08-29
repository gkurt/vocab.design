import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The phone holds one size in every state, so only the content region inside it moves. */
const PHONE_W = 120;
const PHONE_H = 236;
const BEZEL = 5;

type Cutout = { shape: string; inset: number; label: string };

/** Three housings, each with the top inset the device would report for it. */
const CUTOUTS: Record<string, Cutout> = {
  notch: { shape: 'width: 54px; height: 16px; top: 0; border-radius: 0 0 9px 9px', inset: 20, label: 'notch' },
  hole: { shape: 'width: 12px; height: 12px; top: 5px; border-radius: 50%', inset: 20, label: 'punch hole' },
  island: { shape: 'width: 44px; height: 15px; top: 4px; border-radius: 999px', inset: 22, label: 'island' },
};

const NOTES: Record<string, string> = {
  'notch-edge': 'Edge to edge: the app bar starts at the top of the display, so the notch covers the title and the menu.',
  'notch-inset': 'Inset: the content region starts 20dp down, below the notch, and the whole app bar is legible.',
  'hole-edge': 'Edge to edge: the punch hole lands on the title. A smaller housing is not a safer one.',
  'hole-inset': 'Inset: the same 20dp clears the hole, and the background is free to keep running underneath.',
  'island-edge': 'Edge to edge: the island is the widest of the three and takes the most of the bar with it.',
  'island-inset': 'Inset: 22dp reported for this housing, so the app bar sits clear of it.',
};

const segment = (key: string, label: string) => `
  <button class="sp-segment" type="button" data-part="seg-${key}" value="${key}" style="padding: 4px 8px; font-size: 11px">
    ${label}
  </button>`;

const row = (width: number) => `
  <span style="display: flex; align-items: center; gap: 6px; flex: 0 0 auto; height: 20px">
    <span class="sp-swatch" style="flex: 0 0 auto; width: 14px; height: 14px; --sp-swatch: var(--sp-accent-soft)"></span>
    <span class="sp-line" style="flex: 1 1 auto; width: ${width}%; height: 5px"></span>
  </span>`;

/**
 * Display cutout specimen: a phone whose sensor housing can be a notch, a punch hole or an
 * island, and whose content region either starts at the top of the display and loses its app
 * bar under the hardware, or starts at the inset the device reports and clears it.
 *
 * The subject is the content region, not the cutout artwork: the term names the hole, but the
 * only thing a layout can act on is where the content begins. Edge to edge is the
 * counter-example the region itself passes through, so the honest condition lives in
 * `data-pose` and the mount state (`inset`) satisfies it: identify refuses to ring a region
 * that is currently being eaten (SPEC §6). The phone shell, the housing, the picker and the
 * caption are scenery in the context register (SPEC §5).
 *
 * The phone is a fixed box and the caption a fixed height, so switching housing or mode moves
 * the content region and nothing else (SPEC §5). Each segment names the state it produces
 * rather than flipping the one it found (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Sensor housing</span>
          <span class="sp-label">what the layout has to dodge</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 14px; padding: 10px 12px">
          <div
            data-part="phone"
            style="position: relative; flex: 0 0 auto; width: ${PHONE_W}px; height: ${PHONE_H}px; padding: ${BEZEL}px;
                   background: #23262b; border-radius: 18px"
          >
            <div
              data-part="display"
              style="position: relative; width: 100%; height: 100%; overflow: hidden; border-radius: 13px;
                     background: var(--sp-sunken)"
            >
              <div
                data-part="content"
                data-subject
                data-pose="[data-mode=inset]"
                data-mode="inset"
                data-cutout="notch"
                style="position: absolute; left: 0; right: 0; bottom: 0; top: 20px; display: flex; flex-direction: column;
                       transition: top 0.22s var(--sp-ease)"
              >
                <span
                  data-part="app-bar"
                  style="display: flex; align-items: center; gap: 4px; flex: 0 0 auto; height: 24px; padding: 0 6px;
                         background: var(--sp-surface); border-bottom: 1px solid var(--sp-line)"
                >
                  <span data-part="bar-title" class="sp-heading" style="flex: 1 1 auto; min-width: 0; font-size: 11px; text-align: center">Harbour</span>
                  <span data-part="bar-action" class="sp-icon-button" style="flex: 0 0 auto; width: 18px; height: 18px">${icon('kebab', 'sp-icon--dots')}</span>
                </span>
                <div style="display: flex; flex-direction: column; gap: 6px; flex: 1 1 auto; min-height: 0; padding: 8px 6px; overflow: hidden">
                  ${[86, 64, 92, 72, 80, 58].map(row).join('')}
                </div>
              </div>
              <span
                class="sp-context"
                data-part="cutout"
                style="position: absolute; left: 50%; translate: -50% 0; z-index: 2; background: #14161a;
                       width: 54px; height: 16px; top: 0; border-radius: 0 0 9px 9px"
              ></span>
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 4px">
            <sp-segmented data-stage-mode class="sp-segmented" data-part="shapes" data-axis="Housing" data-value="notch" style="align-self: flex-start">
              ${segment('notch', 'notch')}${segment('hole', 'punch hole')}${segment('island', 'island')}
            </sp-segmented>
            <sp-segmented data-stage-mode class="sp-segmented" data-part="modes" data-axis="Content region" data-term="inset" data-value="inset" style="align-self: flex-start; margin-top: 8px">
              ${segment('inset', 'inset to clear it')}${segment('edge', 'edge to edge')}
            </sp-segmented>
            <span class="sp-text" data-part="readout" style="height: 78px; margin-top: 10px"></span>
          </div>
        </div>
      </div>
    </div>
  `;

  const content = part(root, 'content');
  const cutout = part(root, 'cutout');
  const readout = part(root, 'readout');

  const apply = (shapeKey: string, modeKey: string) => {
    const housing = CUTOUTS[shapeKey];
    const note = NOTES[`${shapeKey}-${modeKey}`];
    if (!housing || !note) return;
    cutout.setAttribute('style', `position: absolute; left: 50%; translate: -50% 0; z-index: 2; background: #14161a; ${housing.shape}`);
    content.dataset.cutout = shapeKey;
    content.dataset.mode = modeKey;
    content.style.top = modeKey === 'inset' ? `${housing.inset}px` : '0px';
    readout.textContent = note;
  };

  // Each segment names the housing or the mode it produces, so a resumed script reaches a
  // state rather than toggling the one it found (SPEC §8).
  part(root, 'shapes').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail, content.dataset.mode ?? 'inset'));
  part(root, 'modes').addEventListener('change', (event) =>
    apply(content.dataset.cutout ?? 'notch', (event as CustomEvent<string>).detail),
  );

  apply('notch', 'inset');
}
