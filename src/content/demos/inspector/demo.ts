import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/** The rail holds its width and its internal geometry, so a change of selection moves nothing. */
const RAIL_W = 150;
/** The object's own colour, stated rather than tokenised: it is what the pane reports. */
const RECT_FILL = '#4f6ef2';
const TEXT_FILL = '#1f2937';

const field = (key: string, label: string, value: string) => `
  <span style="display: flex; align-items: center; gap: 5px; flex: 1 1 0; min-width: 0">
    <span class="sp-label" style="flex: 0 0 auto; font-size: 11px">${label}</span>
    <input
      class="sp-input"
      data-part="field-${key}"
      value="${value}"
      aria-label="${label}"
      style="width: 100%; min-width: 0; padding: 4px 6px; font-size: 12px"
    />
  </span>`;

const group = (label: string) => `<span class="sp-label" style="display: block; margin-top: 10px; font-size: 11px">${label}</span>`;

const swatchRow = (hex: string) => `
  <span style="display: flex; align-items: center; gap: 7px; margin-top: 6px; height: 20px">
    <span class="sp-swatch" style="flex: 0 0 auto; width: 20px; height: 20px; --sp-swatch: ${hex}"></span>
    <span style="font-size: 12px">${hex.toUpperCase()}</span>
  </span>`;

const pair = (a: string, b: string) => `<span style="display: flex; gap: 6px; margin-top: 6px">${a}${b}</span>`;

/** One property set per kind of object, so the pane is a function of the selection. */
const SETS: Record<string, string> = {
  rect: `
    <span class="sp-heading" style="font-size: 12px">Rectangle</span>
    ${pair(field('x', 'X', '24'), field('y', 'Y', '22'))}
    ${pair(field('w', 'W', '120'), field('h', 'H', '64'))}
    ${group('Fill')}
    ${swatchRow(RECT_FILL)}`,
  text: `
    <span class="sp-heading" style="font-size: 12px">Text</span>
    ${pair(field('font', 'Aa', 'Geist'), '')}
    ${pair(field('size', 'Size', '15'), field('leading', 'Line', '1.4'))}
    ${group('Colour')}
    ${swatchRow(TEXT_FILL)}`,
  none: `
    <div class="sp-empty" data-part="rail-empty" style="gap: 6px; padding: 8px">
      <span class="sp-empty-mark">${icon('sliders')}</span>
      <span class="sp-text" style="font-size: 12px">Nothing selected</span>
    </div>`,
};

/**
 * Inspector specimen: a canvas with two objects on it and a trailing rail that shows the
 * properties of whichever one is selected, including the case where none is.
 *
 * The subject is the rail. The canvas, its objects and the toolbar are scenery in the
 * context register (SPEC §5), which is also what keeps the selected object from competing
 * with the pane that reports it. The rail is honest in every state the script reaches,
 * empty included, since an inspector with nothing selected is still an inspector, so no
 * `data-pose` is needed.
 *
 * Selection is an explicit click on an object or on the empty canvas, never a toggle, so a
 * script resumed at any point reaches the selection it named (SPEC §8). The rail's width
 * and its internal boxes are fixed, so swapping a rectangle's position controls for a text
 * object's type controls moves nothing on either side of the divider (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Berth plan</span>
          <span class="sp-label">click an object, or the empty canvas</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 10px; padding: 10px">
          <div
            class="sp-context"
            data-part="canvas"
            style="position: relative; flex: 1 1 auto; min-width: 0; background: var(--sp-surface);
                   border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
          >
            <span
              data-part="canvas-empty"
              style="position: absolute; left: 0; right: 0; top: 168px; bottom: 0; cursor: default"
            ></span>
            <span
              data-part="obj-rect"
              data-selected
              style="position: absolute; left: 24px; top: 22px; width: 120px; height: 64px; border-radius: 6px;
                     background: ${RECT_FILL}; cursor: pointer"
            ></span>
            <span
              data-part="obj-text"
              style="position: absolute; left: 24px; top: 108px; width: 190px; padding: 4px 6px; cursor: pointer;
                     color: ${TEXT_FILL}; font-size: 15px; font-weight: 600; line-height: 1.4"
            >Harbour rates</span>
          </div>

          <div
            class="sp-surface"
            data-part="rail"
            data-subject
            data-selection="rect"
            style="display: flex; flex-direction: column; flex: 0 0 ${RAIL_W}px; padding: 10px; overflow: hidden"
          >
            <span class="sp-label" style="flex: 0 0 auto; height: 20px">Inspector</span>
            <div data-part="rail-body" style="flex: 1 1 auto; min-height: 0; margin-top: 6px"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const rail = part(root, 'rail');
  const railBody = part(root, 'rail-body');
  const objects = ['rect', 'text'].map((key) => [key, part(root, `obj-${key}`)] as const);

  const select = (key: string) => {
    const set = SETS[key];
    if (!set) return;
    rail.dataset.selection = key;
    railBody.innerHTML = set;
    for (const [name, object] of objects) {
      const on = name === key;
      flag(object, 'data-selected', on);
      object.style.outline = on ? '2px solid var(--sp-accent)' : '';
      object.style.outlineOffset = on ? '3px' : '';
    }
  };

  // Every target names the selection it produces (an object, or the canvas itself), so a
  // scripted step reaches that selection rather than flipping the one it found (SPEC §8).
  for (const [key, object] of objects) object.addEventListener('click', () => select(key));
  part(root, 'canvas-empty').addEventListener('click', () => select('none'));

  select('rect');
}
