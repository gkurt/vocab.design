import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * Mica specimen: two windows over one colourful desktop, so the difference between
 * sampling and refracting is visible rather than described. The left window is Mica,
 * an opaque fill mixed once from the wallpaper's violet; the right one is acrylic,
 * genuinely translucent and blurring whatever passes behind it. Nothing of the
 * wallpaper is legible through the Mica window, which is the whole point of the term.
 *
 * The segmented control names the two window states outright (SPEC §8): active keeps
 * the sampled tint, inactive falls back to the neutral fill Windows uses when the
 * window stops listening. Both are Mica, so neither is a counter-example and no
 * `data-pose` is needed.
 *
 * The subject is the Mica window's surface: the term names that background material,
 * not the desktop it samples, the acrylic exhibit beside it, or the state control
 * (SPEC §5). Wallpaper and controls carry the context register. Only the fill colour
 * changes between states, so nothing moves.
 *
 * The line naming the fill changes with the switch, so it is the strip's verdict now
 * rather than a caption inside the frame. Two sentences went with the move: the Settings
 * pane read "Sampled once. Nothing behind the window shows through." and the acrylic
 * sample "Translucent. Refracts the desktop live, every frame.", which is the comparison
 * the two windows already make in front of the reader. The pane prints an ordinary display
 * setting instead, and the acrylic panel keeps its height so the desktop reads through it.
 */
const FILL = {
  active: { mica: '#e2d6f1', layer: 'rgb(255 255 255 / 0.66)', note: 'Tint sampled from the wallpaper' },
  inactive: { mica: '#f0f0f2', layer: 'rgb(255 255 255 / 0.72)', note: 'Neutral fallback, window inactive' },
} as const;

type State = keyof typeof FILL;
const START: State = 'active';

const WASH = 'linear-gradient(130deg, #2f4bd4, #7b3fc0 46%, #e0703c)';
const EDGE = 'rgb(16 24 40 / 0.22)';

/** One row of the Mica window's navigation, drawn on the material rather than over it. */
function navRow(label: string, current: boolean): string {
  const paint = current ? 'background: rgb(255 255 255 / 0.72); font-weight: 600' : '';
  return `<span style="display: block; padding: 4px 7px; border-radius: 5px; font-size: 11px; ${paint}">${label}</span>`;
}

export function mount(root: HTMLElement): void {
  const start = FILL[START];

  root.innerHTML = `
    <div class="sp-app" style="gap: 11px">
      <div class="sp-aurora sp-context" data-part="wallpaper" aria-hidden="true" style="--sp-aurora-wash: ${WASH}">
        <span class="sp-aurora-blob" style="left: -8%; top: -22%; --sp-blob: #ffd166; --sp-blob-size: 190px"></span>
        <span class="sp-aurora-blob" style="right: -10%; bottom: -26%; --sp-blob: #2ad4d8; --sp-blob-size: 200px"></span>
      </div>

      <div style="position: relative; display: flex; align-items: flex-start; gap: 16px">
        <div data-part="mica" data-subject data-focus="${START}"
             style="width: 210px; border-radius: 8px; overflow: hidden; border: 1px solid ${EDGE};
                    box-shadow: 0 10px 24px rgb(16 24 40 / 0.34); color: #23262b;
                    background-color: ${start.mica}; transition: background-color 0.3s var(--sp-ease)">
          <div data-part="mica-titlebar"
               style="display: flex; align-items: center; gap: 8px; padding: 6px 9px; font-size: 11px; font-weight: 600">
            <span style="flex: 1 1 auto">Settings</span>
            <span aria-hidden="true" style="letter-spacing: 3px; opacity: 0.55">&minus;&#9633;&times;</span>
          </div>
          <div style="display: flex; gap: 8px; padding: 0 9px 10px">
            <div style="flex: 0 0 66px">
              ${navRow('Display', true)}${navRow('Sound', false)}${navRow('Power', false)}
            </div>
            <div data-part="mica-layer"
                 style="flex: 1 1 auto; padding: 8px; border-radius: 6px; border: 1px solid rgb(16 24 40 / 0.08);
                        background: ${start.layer}; transition: background-color 0.3s var(--sp-ease)">
              <div style="font-size: 11px; font-weight: 600">Scale</div>
              <div style="margin-top: 3px; font-size: 10px; line-height: 1.45; opacity: 0.72">
                125% recommended. Sign out to apply the new size.
              </div>
            </div>
          </div>
        </div>

        <div class="sp-glass sp-context" data-part="acrylic" style="width: 132px; height: 92px; padding: 10px; border-radius: 8px">
          <div style="font-size: 11px; font-weight: 600">Acrylic</div>
        </div>
      </div>

      <div data-part="panel">
        <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${START}" data-axis="Window">
          <button class="sp-segment" data-part="seg-active" value="active">Active</button>
          <button class="sp-segment" data-part="seg-inactive" value="inactive">Inactive</button>
        </sp-segmented>
        <span class="sp-text" data-stage-verdict data-part="readout" style="font-size: 11px">${start.note}</span>
      </div>
    </div>
  `;

  const mica = part(root, 'mica');
  const layer = part(root, 'mica-layer');
  const readout = part(root, 'readout');

  const paint = (name: string) => {
    const next = FILL[name as State];
    if (!next) return;
    mica.dataset.focus = name;
    mica.style.backgroundColor = next.mica;
    layer.style.background = next.layer;
    readout.textContent = next.note;
  };

  part(root, 'segmented').addEventListener('change', (event) => paint((event as CustomEvent<string>).detail));
}
