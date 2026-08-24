import type { IconName } from '#src/kit/icons.ts';
import { icon } from '#src/kit/icons.ts';
import { localPoint, localSize } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

const HUD = { w: 152, h: 94 };
const GRIP_H = 22;
/** Where the panel starts: over the top right of the canvas, stated rather than measured. */
const START = { x: 300, y: 14 };

interface Tool {
  key: string;
  name: string;
  glyph: IconName;
}

const TOOLS: Tool[] = [
  { key: 'preview', name: 'Preview', glyph: 'eye' },
  { key: 'adjust', name: 'Adjust', glyph: 'sliders' },
  { key: 'mark', name: 'Mark', glyph: 'star' },
];

/** The three exposures the filmstrip switches between, drawn rather than loaded (no network, SPEC §5). */
const SHOTS: Record<string, string> = {
  '1': 'linear-gradient(180deg, #23364f 0%, #4c6f93 46%, #d0a878 100%)',
  '2': 'linear-gradient(180deg, #3b1f3a 0%, #8d4a52 52%, #e8a765 100%)',
  '3': 'linear-gradient(180deg, #10222a 0%, #2f5d63 50%, #8fb5a4 100%)',
};

/**
 * HUD panel specimen: a photo viewer whose only controls float over the picture. The panel is dark
 * and translucent, so the sky and the hills read straight through it, it holds three real tools,
 * and it is dragged by its title strip to the other side of the canvas when it covers something.
 * The filmstrip underneath stays live the whole time, which is the claim: a HUD hovers over the
 * content without taking it over.
 *
 * The subject is the panel, the narrowest element the term names. The window chrome is scenery in
 * the context register; the photo and its filmstrip are scenery of a different kind, drawn paint
 * with no kit accent in them to quieten. The panel is honestly a HUD at both positions the script
 * visits, so no `data-pose` condition is needed.
 *
 * The panel is out of flow, so moving it cannot disturb anything under it (SPEC §5), and it is
 * clamped to the canvas at every step, so it never leaves the stage. Its paint is stated inline
 * because a dark blurred surface with a light hairline is what the term is: the kit's one shadow
 * and one radius cannot say it. The drag captures the pointer on a trusted pointerdown so a real
 * reader's drag survives leaving the strip, and ends on pointerup and pointercancel, never
 * pointerleave (SPEC §7).
 */
export function mount(root: HTMLElement): void {
  const tool = (item: Tool) => `
    <button
      class="sp-icon-button"
      type="button"
      data-part="tool-${item.key}"
      aria-label="${item.name}"
      style="width: 34px; height: 30px; border-radius: 7px; color: #f2f5fa; background: rgb(255 255 255 / 0.08);
             border: 1px solid rgb(255 255 255 / 0.14)"
    >${icon(item.glyph)}</button>
  `;

  const thumb = (id: string) => `
    <button
      type="button"
      data-part="thumb-${id}"
      aria-label="Frame ${id}"
      style="width: 52px; height: 34px; padding: 0; border-radius: 5px; border: 2px solid rgb(255 255 255 / 0.28);
             background: ${SHOTS[id]}; cursor: pointer"
    ></button>
  `;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 288px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">IMG_2841.raw</span>
          <span class="sp-label" style="font-size: 11px">Nothing docked, nothing cropped</span>
        </div>

        <div
          data-part="canvas"
          data-shot="1"
          style="position: relative; flex: 1 1 auto; min-height: 0; overflow: hidden; background: ${SHOTS['1']};
                 transition: background 0.3s ease"
        >
          <span style="position: absolute; left: 58px; top: 34px; width: 44px; height: 44px; border-radius: 50%;
                       background: rgb(255 245 214 / 0.86); filter: blur(1px)"></span>
          <span style="position: absolute; left: -40px; bottom: 42px; width: 340px; height: 170px; border-radius: 50% 50% 0 0;
                       background: rgb(18 26 38 / 0.42)"></span>
          <span style="position: absolute; right: -60px; bottom: 34px; width: 320px; height: 130px; border-radius: 50% 50% 0 0;
                       background: rgb(12 18 28 / 0.55)"></span>

          <div
            data-part="strip"
            class="sp-row"
            style="position: absolute; left: 0; right: 0; bottom: 10px; justify-content: center; gap: 8px"
          >
            ${['1', '2', '3'].map(thumb).join('')}
          </div>

          <span data-part="aim-left" aria-hidden="true" style="position: absolute; left: 108px; top: 42px; width: 4px; height: 4px"></span>

          <div
            data-part="hud"
            data-subject
            data-corner="tr"
            role="group"
            aria-label="Image tools"
            style="position: absolute; left: ${START.x}px; top: ${START.y}px; width: ${HUD.w}px; height: ${HUD.h}px;
                   border-radius: 10px; background: rgb(14 18 26 / 0.58); border: 1px solid rgb(255 255 255 / 0.18);
                   box-shadow: 0 10px 24px rgb(4 8 14 / 0.42); backdrop-filter: blur(9px) saturate(1.2); color: #eef2f8;
                   display: flex; flex-direction: column; overflow: hidden"
          >
            <div
              data-part="grip"
              style="display: flex; align-items: center; gap: 6px; flex: 0 0 auto; height: ${GRIP_H}px; padding: 0 8px;
                     border-bottom: 1px solid rgb(255 255 255 / 0.14); background: rgb(255 255 255 / 0.06);
                     cursor: grab; touch-action: none; font-size: 11px; font-weight: 500"
            >
              <span style="flex: 1 1 auto">Tools</span>
              <span data-part="readout" data-tool="none" style="opacity: 0.7; font-weight: 400">none</span>
            </div>
            <div class="sp-row" style="gap: 6px; padding: 8px; justify-content: center">
              ${TOOLS.map(tool).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const canvas = part(root, 'canvas');
  const hud = part(root, 'hud');
  const grip = part(root, 'grip');
  const readout = part(root, 'readout');

  const place = (x: number, y: number, box: { width: number; height: number }) => {
    const left = Math.min(Math.max(0, x), box.width - HUD.w);
    const top = Math.min(Math.max(0, y), box.height - HUD.h);
    hud.style.left = `${left}px`;
    hud.style.top = `${top}px`;
    const side = left + HUD.w / 2 < box.width / 2 ? 'l' : 'r';
    hud.dataset.corner = `${top + HUD.h / 2 < box.height / 2 ? 't' : 'b'}${side}`;
  };

  /** The canvas box and the grab offset, both taken when the press lands, in the
      specimen's own pixels: the panel is placed by writing a length (SPEC §5). */
  let box: { width: number; height: number } | undefined;
  let offset = { x: 0, y: 0 };
  grip.addEventListener('pointerdown', (event) => {
    // Mandatory guard: the player's synthetic pointers cannot be captured and the call throws (SPEC §7).
    if (event.isTrusted) grip.setPointerCapture(event.pointerId);
    box = localSize(canvas);
    offset = localPoint(event, hud);
    grip.style.cursor = 'grabbing';
  });
  grip.addEventListener('pointermove', (event) => {
    if (!box) return;
    const at = localPoint(event, canvas);
    place(at.x - offset.x, at.y - offset.y, box);
  });
  // Ends on up and cancel, never on leave: boundary events do not fire while capture holds.
  const release = () => {
    box = undefined;
    grip.style.cursor = 'grab';
  };
  grip.addEventListener('pointerup', release);
  grip.addEventListener('pointercancel', release);

  /** Selection is painted here rather than in the kit: both controls live on dark glass. */
  const pickTool = (key: string) => {
    for (const item of TOOLS) {
      const el = part(root, `tool-${item.key}`);
      const on = item.key === key;
      if (on) el.setAttribute('data-selected', '');
      else el.removeAttribute('data-selected');
      el.style.background = on ? 'rgb(255 255 255 / 0.3)' : 'rgb(255 255 255 / 0.08)';
      el.style.borderColor = on ? 'rgb(255 255 255 / 0.52)' : 'rgb(255 255 255 / 0.14)';
    }
    const chosen = TOOLS.find((item) => item.key === key);
    readout.dataset.tool = key;
    readout.textContent = chosen ? chosen.name.toLowerCase() : 'none';
  };

  const pickShot = (id: string) => {
    canvas.dataset.shot = id;
    canvas.style.background = SHOTS[id] ?? '';
    for (const n of ['1', '2', '3']) {
      const el = part(root, `thumb-${n}`);
      if (n === id) el.setAttribute('data-selected', '');
      else el.removeAttribute('data-selected');
      el.style.borderColor = n === id ? 'rgb(255 255 255 / 0.92)' : 'rgb(255 255 255 / 0.28)';
    }
  };

  // Naming the tool and the frame rather than flipping either, so a pass resumed anywhere lands
  // in the same place (SPEC §8).
  for (const item of TOOLS) part(root, `tool-${item.key}`).addEventListener('click', () => pickTool(item.key));
  for (const id of ['1', '2', '3']) part(root, `thumb-${id}`).addEventListener('click', () => pickShot(id));
  pickShot('1');
}
