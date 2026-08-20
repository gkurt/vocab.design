import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const SCENE = { w: 450, h: 232 };
const WINDOW = { x: 62, y: 2, w: 326, h: 150 };
/** The strip hangs below the window's bottom edge, outside it, and inside the stage body. */
const ORNAMENT = { w: 214, h: 42, gap: 14 };

const VIEWS = [
  { key: 'grid', label: 'Grid', say: 'Grid view. The controls are outside the window.' },
  { key: 'single', label: 'Single', say: 'One photo, and the ornament never covered it.' },
  { key: 'info', label: 'Info', say: 'Details. The window keeps every pixel it had.' },
] as const;

type ViewKey = (typeof VIEWS)[number]['key'];

interface Picker extends HTMLElement {
  value: string;
}

const tile = (x: number, y: number, w: number, h: number) =>
  `<span style="position: absolute; left: ${x}px; top: ${y}px; width: ${w}px; height: ${h}px; border-radius: 5px; background: var(--sp-sunken)"></span>`;

/**
 * Ornament specimen: a spatial window with its controls on a strip floating below its bottom
 * edge. Picking a view from the strip changes what the window shows, and the window's content
 * area is never covered, which is the reason the panel is outside the frame at all.
 *
 * The scene is a gaze scope (`data-gaze`, SPEC §7): the ghost is an eye resting where the
 * reader looks and an activation draws as the hand's pinch, which is how this platform's input
 * actually works. Events stay a mouse's, so the demo wires nothing but the segmented control's
 * own `change`; the hover paint under the eye is the player's mirror, not the demo's.
 *
 * The subject is the ornament strip: the floating panel is the term, not the window it serves
 * and not the segmented control it happens to hold. The window, its content and the caption are
 * the scene around it in the context register.
 *
 * The strip is absolutely positioned clear of the window and inset from the stage body, which
 * clips (SPEC §5), and the three views are stacked in one fixed box, so switching them moves
 * nothing at all.
 */
export function mount(root: HTMLElement): void {
  const ornamentLeft = WINDOW.x + (WINDOW.w - ORNAMENT.w) / 2;
  const ornamentTop = WINDOW.y + WINDOW.h + ORNAMENT.gap;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Photos, in the room</span>
          <span class="sp-text" data-part="readout" style="width: 292px; text-align: right; white-space: nowrap; font-size: 12px">Grid view. The controls are outside the window.</span>
        </div>

        <div class="sp-body" style="background: linear-gradient(160deg, var(--sp-sunken), var(--sp-bg) 70%)">
          <div
            data-part="scene"
            data-gaze
            data-view="grid"
            style="position: relative; width: ${SCENE.w}px; height: ${SCENE.h}px"
          >
            <div
              class="sp-surface sp-context"
              data-part="window"
              style="position: absolute; left: ${WINDOW.x}px; top: ${WINDOW.y}px; width: ${WINDOW.w}px; height: ${WINDOW.h}px;
                     display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 10px 24px rgb(16 24 40 / 0.2)"
            >
              <div class="sp-row" style="flex: 0 0 auto; gap: 8px; padding: 6px 10px; border-bottom: 1px solid var(--sp-line)">
                <span class="sp-heading" style="font-size: 12px">Harbour, June</span>
                <span class="sp-label sp-grow" style="font-size: 10.5px; text-align: right">24 photos</span>
              </div>

              <div style="position: relative; flex: 1 1 auto">
                <span data-part="view-grid" style="position: absolute; inset: 10px">
                  ${tile(0, 0, 96, 44)}${tile(104, 0, 96, 44)}${tile(208, 0, 96, 44)}
                  ${tile(0, 52, 96, 44)}${tile(104, 52, 96, 44)}${tile(208, 52, 96, 44)}
                </span>

                <span data-part="view-single" hidden style="position: absolute; inset: 10px">
                  ${tile(0, 0, 200, 96)}
                  <span class="sp-stack" style="position: absolute; left: 212px; top: 2px; gap: 3px">
                    <span class="sp-label" style="font-size: 10px">Taken</span>
                    <span style="font-size: 11.5px">14 June, 07:12</span>
                  </span>
                </span>

                <span data-part="view-info" hidden class="sp-stack" style="position: absolute; inset: 10px; gap: 7px">
                  <span class="sp-row sp-row--between" style="gap: 12px"><span class="sp-label" style="font-size: 10.5px">Camera</span><span style="font-size: 11.5px">Coastal 35</span></span>
                  <div class="sp-divider"></div>
                  <span class="sp-row sp-row--between" style="gap: 12px"><span class="sp-label" style="font-size: 10.5px">Place</span><span style="font-size: 11.5px">Falmouth harbour</span></span>
                  <div class="sp-divider"></div>
                  <span class="sp-row sp-row--between" style="gap: 12px"><span class="sp-label" style="font-size: 10.5px">Shared with</span><span style="font-size: 11.5px">Coastal team</span></span>
                </span>
              </div>
            </div>

            <div
              data-part="ornament"
              data-subject
              style="position: absolute; left: ${ornamentLeft}px; top: ${ornamentTop}px; width: ${ORNAMENT.w}px; height: ${ORNAMENT.h}px;
                     display: flex; align-items: center; justify-content: center; padding: 0 8px; border: 1px solid var(--sp-line);
                     border-radius: 999px; background: var(--sp-surface); box-shadow: 0 14px 28px rgb(16 24 40 / 0.26)"
            >
              <sp-segmented class="sp-segmented" data-part="views" data-value="grid" aria-label="Window view">
                ${VIEWS.map(
                  (view) => `
                  <button class="sp-segment" type="button" data-part="seg-${view.key}" value="${view.key}" style="padding: 4px 11px; font-size: 12px; white-space: nowrap">${view.label}</button>`,
                ).join('')}
              </sp-segmented>
            </div>

            <span
              class="sp-label sp-context"
              style="position: absolute; left: 0; right: 0; top: ${ornamentTop + ORNAMENT.h + 6}px; text-align: center; white-space: nowrap; font-size: 11px"
            >The strip belongs to the window and sits outside its edge.</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const readout = part(root, 'readout');
  const views = part(root, 'views') as Picker;

  const show = (key: ViewKey) => {
    scene.dataset.view = key;
    for (const view of VIEWS) part(root, `view-${view.key}`).toggleAttribute('hidden', view.key !== key);
    readout.textContent = VIEWS.find((view) => view.key === key)?.say ?? '';
  };

  views.addEventListener('change', (event) => show((event as CustomEvent<string>).detail as ViewKey));

  show('grid');
}
