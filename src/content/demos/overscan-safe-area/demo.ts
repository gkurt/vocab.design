import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The panel, and the two conventional insets measured off it: five percent, then ten. */
const PANEL_W = 316;
const PANEL_H = 178;
const ACTION = { x: Math.round(PANEL_W * 0.05), y: Math.round(PANEL_H * 0.05) };
const TITLE = { x: Math.round(PANEL_W * 0.1), y: Math.round(PANEL_H * 0.1) };
/** How far past the panel edge the unaware layout reaches, so the crop is visible. */
const OVER = 9;

const HATCH = 'repeating-linear-gradient(45deg, rgb(255 255 255 / 0.2) 0 4px, transparent 4px 9px)';

type Mode = 'title' | 'action' | 'edge';

const INSETS: Record<Mode, string> = {
  title: `${TITLE.y}px ${TITLE.x}px`,
  action: `${ACTION.y}px ${ACTION.x}px`,
  edge: `-${OVER}px -${OVER}px`,
};

const NOTES: Record<Mode, string> = {
  title: `Inside title safe (${TITLE.x} by ${TITLE.y} on this panel): text, buttons and anything focusable are clear of the crop on every set.`,
  action: `Out at action safe (${ACTION.x} by ${ACTION.y}): fine for artwork and motion, but the title and the button now sit in the strip a set may crop.`,
  edge: 'Laid out to the physical edge: this set crops the outer frame, so the title loses its top and the button loses its end.',
};

/**
 * Overscan safe area specimen: a television panel with the physical edge, the action safe inset
 * and the title safe inset drawn as nested guides, and one content region laid out at each of the
 * three in turn. At the edge the set's own crop takes the top of the title and the end of the
 * button, which is the whole reason the margin exists.
 *
 * The subject is the inset band itself, `data-part="band"`: the term names the margin kept clear,
 * not the region left over and not the content that respects it. The band has no element of its
 * own in a layout, so it is given one, hatched over exactly the five percent a set crops, with the
 * tighter title safe line drawn inside it (SPEC §5). Its box is the
 * panel it insets, which is the one imprecision in the choice and the reason the hatch is drawn:
 * the ink says margin even where the box says screen. The set, the guides, the picker, the legend
 * and the caption are scenery in the context register. The band is the margin in every state (the
 * set crops the same pixels whatever the layout does), so no `data-pose` condition is needed.
 *
 * The panel is a fixed box and the caption a fixed height, so moving the content between the
 * three insets moves nothing else (SPEC §5). The clipping at the edge is the term's own subject
 * matter rather than a container failing to hold its content. Each segment names an inset instead
 * of stepping to the next one (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Television layout</span>
          <sp-segmented class="sp-segmented" data-part="insets" data-value="title" data-axis="Inset">
            <button class="sp-segment" type="button" data-part="seg-title" value="title" style="padding: 4px 8px; font-size: 11px">title safe</button>
            <button class="sp-segment" type="button" data-part="seg-action" value="action" style="padding: 4px 8px; font-size: 11px">action safe</button>
            <button class="sp-segment" type="button" data-part="seg-edge" value="edge" style="padding: 4px 8px; font-size: 11px">to the edge</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 8px 12px">
          <div
            class="sp-context"
            data-part="set"
            style="flex: 0 0 auto; padding: 5px; border-radius: 10px; background: var(--sp-ink); box-shadow: var(--sp-shadow)"
          >
            <div
              data-part="panel"
              style="position: relative; width: ${PANEL_W}px; height: ${PANEL_H}px; overflow: hidden; border-radius: 4px;
                     background: linear-gradient(155deg, #24314f 0%, #3b4a76 55%, #63527f 100%)"
            >
              <span
                data-part="band"
                data-subject
                aria-hidden="true"
                style="position: absolute; inset: 0; z-index: 1; pointer-events: none"
              >
                <span style="position: absolute; top: 0; left: 0; right: 0; height: ${ACTION.y}px; background: ${HATCH}"></span>
                <span style="position: absolute; bottom: 0; left: 0; right: 0; height: ${ACTION.y}px; background: ${HATCH}"></span>
                <span style="position: absolute; top: ${ACTION.y}px; bottom: ${ACTION.y}px; left: 0; width: ${ACTION.x}px; background: ${HATCH}"></span>
                <span style="position: absolute; top: ${ACTION.y}px; bottom: ${ACTION.y}px; right: 0; width: ${ACTION.x}px; background: ${HATCH}"></span>
              </span>
              <span
                data-part="guide-action"
                aria-hidden="true"
                style="position: absolute; inset: ${ACTION.y - 2}px ${ACTION.x - 2}px; z-index: 2; border: 2px dashed rgb(255 255 255 / 0.6);
                       border-radius: 3px; pointer-events: none"
              ></span>
              <span
                data-part="guide-title"
                aria-hidden="true"
                style="position: absolute; inset: ${TITLE.y - 2}px ${TITLE.x - 2}px; z-index: 2; border: 2px solid rgb(255 255 255 / 0.85);
                       border-radius: 3px; pointer-events: none"
              ></span>
              <div
                data-part="content"
                data-mode="title"
                style="position: absolute; inset: ${INSETS.title}; z-index: 3; display: flex; flex-direction: column;
                       justify-content: space-between; color: #ffffff;
                       transition: inset 0.32s var(--sp-ease)"
              >
                <span class="sp-heading" data-part="title" style="font-size: 15px; line-height: 1.1; color: #ffffff">Tonight, channel four</span>
                <div class="sp-row" data-part="tiles" style="gap: 8px">
                  <span class="sp-swatch" style="width: 46px; height: 30px; --sp-swatch: rgb(255 255 255 / 0.35)"></span>
                  <span class="sp-swatch" style="width: 46px; height: 30px; --sp-swatch: rgb(255 255 255 / 0.28)"></span>
                  <span class="sp-swatch" style="width: 46px; height: 30px; --sp-swatch: rgb(255 255 255 / 0.22)"></span>
                </div>
                <div class="sp-row sp-row--between" style="gap: 8px">
                  <button class="sp-button sp-button--sm" type="button" data-part="cta" style="font-size: 12px">Resume</button>
                  <span class="sp-label" data-part="clock" style="font-size: 11px; color: rgb(255 255 255 / 0.8)">21:04</span>
                </div>
              </div>
            </div>
          </div>

          <div class="sp-row sp-context" style="flex: 0 0 auto; gap: 12px; height: 16px">
            <span class="sp-label" style="display: flex; align-items: center; gap: 5px; font-size: 10px">
              <span style="width: 14px; height: 0; border-top: 2px dashed var(--sp-muted)"></span>crop, 5%
            </span>
            <span class="sp-label" style="display: flex; align-items: center; gap: 5px; font-size: 10px">
              <span style="width: 14px; height: 0; border-top: 2px solid var(--sp-ink)"></span>title safe, 10%
            </span>
          </div>

          <span
            class="sp-text sp-context"
            data-part="caption"
            data-mode="title"
            style="flex: 0 0 auto; width: 440px; height: 34px; font-size: 12px; line-height: 1.4; text-align: center"
          ></span>
        </div>
      </div>
    </div>
  `;

  const content = part(root, 'content');
  const caption = part(root, 'caption');

  const apply = (mode: Mode) => {
    content.dataset.mode = mode;
    content.style.inset = INSETS[mode];
    caption.dataset.mode = mode;
    caption.textContent = NOTES[mode];
  };

  part(root, 'insets').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail as Mode));

  apply('title');
}
