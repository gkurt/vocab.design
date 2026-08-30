import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The spanned window, and the hardware running down the middle of it. */
const SURFACE_W = 400;
const SURFACE_H = 186;
const SEAM_W = 10;
/** How far either side of the seam a layout has to leave alone. */
const KEEP = 12;
const SEAM_X = (SURFACE_W - SEAM_W) / 2;
const BAND_X = SEAM_X - KEEP;
const BAND_W = SEAM_W + KEEP * 2;
/** Where a pane's edge goes when the layout uses the seam as its gutter. */
const HALF = SURFACE_W / 2;

const HATCH = 'repeating-linear-gradient(45deg, var(--sp-accent-soft) 0 3px, transparent 3px 8px)';

type Mode = 'unaware' | 'avoided' | 'split';

const BAND_STATE: Record<Mode, string> = { unaware: 'crossed', avoided: 'clear', split: 'gutter' };

const NOTES: Record<Mode, string> = {
  unaware: 'Unaware: one pane straight across both screens, so the seam takes the middle of the sentence and half of the button.',
  avoided: 'Avoided: the same single pane, reflowed so that nothing it cares about lands on the seam.',
  split: 'Split: the layout uses the seam as its gutter, notes on one screen and the note being edited on the other.',
};

const lines = (widths: number[], height = 6) =>
  widths.map((width) => `<div class="sp-line" style="width: ${width}%; height: ${height}px"></div>`).join('');

/**
 * Spanned layout specimen: one window stretched across a two-screen device, laid out three ways
 * against the seam running down its middle. Unaware puts a sentence and a button straight over
 * the seam and loses the middle of both; avoided keeps the single pane and reflows clear of it;
 * split uses the seam as the gutter of a two-pane arrangement.
 *
 * The subject is `data-part="band"`, the strip of the window lying over the seam plus the margin
 * either side of it: the term is what the layout does about that strip, so the strip is the
 * narrowest element the term names. It is drawn rather than implied, since a channel in a layout
 * has no element of its own (SPEC §5), and it is honestly the term in all three states, which the
 * seam-crossing content would not be (it exists in one) and the pane boundary would not be (it
 * exists in another). The device, the three layouts, the picker and the caption are scenery in
 * the context register.
 *
 * The three layouts are stacked in the same fixed box and swapped by `hidden`, so a pick changes
 * the arrangement without moving the device or the caption (SPEC §5). The seam is drawn over the
 * content, because hardware is: content laid across it is genuinely not there to be read. Each
 * segment names an arrangement rather than stepping to the next one (SPEC §8).
 *
 * The title bar used to read "Spanned across both screens", which is the site describing the
 * arrangement in the window the arrangement is being shown in. It carries the notes app's own
 * name now, and the spanning is left to the picture.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Marina notes</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Layout" data-part="modes" data-value="unaware">
            <button class="sp-segment" type="button" data-part="seg-unaware" value="unaware" style="padding: 4px 8px; font-size: 11px">unaware</button>
            <button class="sp-segment" type="button" data-part="seg-avoided" value="avoided" style="padding: 4px 8px; font-size: 11px">avoided</button>
            <button class="sp-segment" type="button" data-part="seg-split" value="split" style="padding: 4px 8px; font-size: 11px">split</button>
          </sp-segmented>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 8px 12px">
          <div
            data-part="device"
            style="flex: 0 0 auto; padding: 5px; border-radius: 12px; background: var(--sp-ink)"
          >
            <div
              data-part="surface"
              style="position: relative; width: ${SURFACE_W}px; height: ${SURFACE_H}px; overflow: hidden; border-radius: 6px;
                     background: var(--sp-surface)"
            >
              <div
                class="sp-context"
                data-part="layout-unaware"
                style="position: absolute; inset: 0; z-index: 1; display: flex; flex-direction: column; gap: 10px; padding: 12px"
              >
                <span class="sp-heading" style="font-size: 13px">Berth 14, winter lift</span>
                <span class="sp-text sp-text--ink" data-part="sentence" style="font-size: 12px; line-height: 1.5">
                  The starboard cleat is lifting and wants replacing before the yard hauls her out for the winter.
                </span>
                <div style="display: flex; flex-direction: column; gap: 6px">${lines([100, 94])}</div>
                <div class="sp-row" style="justify-content: center; margin-top: auto">
                  <button class="sp-button sp-button--sm" type="button" data-part="save" data-cut style="font-size: 12px">Save note</button>
                </div>
              </div>

              <div
                class="sp-context"
                data-part="layout-avoided"
                style="position: absolute; inset: 0; z-index: 1; display: flex; gap: ${BAND_W}px; padding: 12px"
                hidden
              >
                <div style="display: flex; flex-direction: column; gap: 9px; flex: 1 1 0; min-width: 0">
                  <span class="sp-heading" style="font-size: 13px">Berth 14</span>
                  <span class="sp-text sp-text--ink" style="font-size: 12px; line-height: 1.45">
                    The starboard cleat is lifting and wants replacing.
                  </span>
                  <button class="sp-button sp-button--sm" type="button" data-part="save-avoided" style="align-self: flex-start; font-size: 12px">Save note</button>
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px; flex: 1 1 0; min-width: 0">
                  <span class="sp-label" style="font-size: 11px">Yard reply</span>
                  ${lines([96, 88, 92, 70])}
                </div>
              </div>

              <div data-part="layout-split" style="position: absolute; inset: 0; z-index: 1; display: flex" hidden>
                <div
                  class="sp-context"
                  data-part="pane-list"
                  style="display: flex; flex-direction: column; gap: 4px; width: ${HALF}px; padding: 10px ${KEEP + 8}px 10px 10px; overflow: hidden"
                >
                  <span class="sp-label" style="font-size: 11px">Notes</span>
                  <div class="sp-list-item" style="padding: 5px 7px; font-size: 12px">Berth 14, winter lift</div>
                  <div class="sp-list-item" data-selected style="padding: 5px 7px; font-size: 12px">Fuel berth closed</div>
                  <div class="sp-list-item" style="padding: 5px 7px; font-size: 12px">Pontoon C decking</div>
                </div>
                <div
                  class="sp-context"
                  data-part="pane-detail"
                  style="display: flex; flex-direction: column; gap: 8px; width: ${HALF}px; padding: 10px 10px 10px ${KEEP + 8}px; overflow: hidden;
                         background: var(--sp-sunken)"
                >
                  <span class="sp-heading" style="font-size: 13px">Fuel berth closed</span>
                  <div style="display: flex; flex-direction: column; gap: 6px">${lines([94, 86, 90])}</div>
                  <button class="sp-button sp-button--sm" type="button" data-part="save-split" style="align-self: flex-start; margin-top: auto; font-size: 12px">Save note</button>
                </div>
              </div>

              <span
                data-part="band"
                data-subject
                data-mode="crossed"
                aria-hidden="true"
                style="position: absolute; top: 0; bottom: 0; left: ${BAND_X}px; width: ${BAND_W}px; z-index: 2;
                       background: ${HATCH}; border-left: 2px dashed var(--sp-accent); border-right: 2px dashed var(--sp-accent);
                       pointer-events: none"
              ></span>

              <span
                data-part="seam"
                aria-hidden="true"
                style="position: absolute; top: 0; bottom: 0; left: ${SEAM_X}px; width: ${SEAM_W}px; z-index: 3;
                       background: var(--sp-ink); box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.4); pointer-events: none"
              ></span>
            </div>
          </div>

          <span
            class="sp-text sp-context"
            data-stage-verdict data-part="caption"
            data-mode="unaware"
            style="flex: 0 0 auto; width: 440px; height: 34px; font-size: 12px; line-height: 1.4; text-align: center"
          ></span>
        </div>
      </div>
    </div>
  `;

  const band = part(root, 'band');
  const caption = part(root, 'caption');
  const layouts: Record<Mode, HTMLElement> = {
    unaware: part(root, 'layout-unaware'),
    avoided: part(root, 'layout-avoided'),
    split: part(root, 'layout-split'),
  };

  const apply = (mode: Mode) => {
    for (const key of Object.keys(layouts) as Mode[]) layouts[key].hidden = key !== mode;
    band.dataset.mode = BAND_STATE[mode];
    caption.dataset.mode = mode;
    caption.textContent = NOTES[mode];
  };

  part(root, 'modes').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail as Mode));

  apply('unaware');
}
