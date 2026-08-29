import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const MONO = 'ui-monospace, monospace';

/** The card that clips, in page coordinates, and the surface anchored inside it. */
const PANEL = { x: 20, y: 24, w: 190, h: 128 };
const SURFACE = { x: 116, y: 88, w: 190 };

type Mode = {
  /** Which slot holds the surface: the promoted layer, or the clipping card. */
  layer: 'top' | 'page';
  className: string;
  /** Cleared for the dialog, which the kit centres itself. */
  left: string;
  top: string;
  width: string;
  scrim: boolean;
  note: string;
};

const MODES: Record<string, Mode> = {
  dialog: {
    layer: 'top',
    className: 'sp-dialog',
    left: '',
    top: '',
    width: '240px',
    scrim: true,
    note: 'showModal() promotes the dialog and paints its ::backdrop over the page.',
  },
  popover: {
    layer: 'top',
    className: 'sp-popover',
    left: `${SURFACE.x}px`,
    top: `${SURFACE.y}px`,
    width: `${SURFACE.w}px`,
    scrim: false,
    note: 'A popover is promoted too, clearing the card and the 99999 ribbon alike.',
  },
  plain: {
    layer: 'page',
    // The page slot is offset from the panel's border box by the panel's own border, so
    // the surface lands on the same pixel in either slot.
    className: 'sp-popover',
    left: `${SURFACE.x - PANEL.x - 1}px`,
    top: `${SURFACE.y - PANEL.y - 1}px`,
    width: `${SURFACE.w}px`,
    scrim: false,
    note: 'Back in the page: clipped by the card, and painted under a z-index of 99999.',
  },
};

/**
 * Top layer specimen: one surface shown three times over the same page, promoted as a modal
 * dialog, promoted as a popover, and left in the page as an ordinary absolutely positioned
 * box. The card holding it clips, and a sibling ribbon carries `z-index: 99999`, so the
 * unpromoted case loses twice while the promoted cases lose neither way.
 *
 * The subject is the surface, not the layer it moves between: a layer is not a thing that
 * can be ringed, and the narrowest element the term actually names is the one that has been
 * promoted into it (SPEC §5), which is the same call the stacking context specimen makes
 * about the element establishing one. The unpromoted state is the counter-example the term
 * needs, so the surface declares `data-layer=top` as its pose condition and identify refuses
 * to ring a box that is not in the top layer (SPEC §6). Mount is the dialog, which satisfies
 * it.
 *
 * The promotion is staged rather than real: a `<dialog>` opened with showModal() would enter
 * the page's own top layer and cover the site around this stage, so the layer here is a
 * sibling of the page painted above it, and the readout says what the browser would be doing.
 *
 * Both slots are fixed boxes over the same coordinates, and nothing under them moves when
 * the surface changes slots (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">The surface is</span>
          <sp-segmented class="sp-segmented" data-axis="Element" data-part="switcher" data-value="dialog">
            <button class="sp-segment" type="button" data-part="seg-dialog" value="dialog">a dialog</button>
            <button class="sp-segment" type="button" data-part="seg-popover" value="popover">a popover</button>
            <button class="sp-segment" type="button" data-part="seg-plain" value="plain">a plain div</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div
            data-part="page"
            style="position: relative; flex: 0 0 auto; width: 444px; height: 186px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
          >
            <div
              data-part="panel"
              style="position: absolute; left: ${PANEL.x}px; top: ${PANEL.y}px; width: ${PANEL.w}px; height: ${PANEL.h}px; z-index: 1; padding: 10px; background: var(--sp-sunken); border: 1px solid var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
            >
              <div class="sp-context">
                <span class="sp-heading" style="font-size: 12px">Order card</span>
                <span style="display: block; margin-top: 5px; font-family: ${MONO}; font-size: 11px; color: var(--sp-muted)">overflow: hidden</span>
                <div class="sp-stack" style="margin-top: 10px; gap: 7px">
                  <div class="sp-line" style="width: 82%"></div>
                  <div class="sp-line" style="width: 60%"></div>
                </div>
              </div>
              <div data-part="slot-page" style="position: absolute; inset: 0; z-index: 10"></div>
            </div>
            <div
              class="sp-context"
              data-part="ribbon"
              style="position: absolute; left: 16px; top: 112px; right: 16px; height: 30px; z-index: 99999; display: flex; align-items: center; gap: 10px; padding: 0 12px; background: var(--sp-accent-soft); border: 1px solid var(--sp-accent); border-radius: 6px"
            >
              <span style="font-family: ${MONO}; font-size: 11.5px">z-index: 99999</span>
              <span class="sp-label">a sibling that used to win everything</span>
            </div>
            <div data-part="layer" style="position: absolute; inset: 0; z-index: 2147483000">
              <div class="sp-scrim" data-part="scrim"></div>
              <div data-part="slot-top" style="position: absolute; inset: 0"></div>
            </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="display: block; flex: 0 0 auto; width: 440px; height: 40px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const surface = document.createElement('div');
  surface.dataset.part = 'surface';
  surface.setAttribute('data-subject', '');
  surface.setAttribute('data-pose', '[data-layer=top]');
  surface.setAttribute('data-open', '');
  surface.style.setProperty('--sp-arrow-x', '20px');
  surface.innerHTML = `
    <span class="sp-heading" style="font-size: 13px">Order 4127</span>
    <span class="sp-text" style="display: block; margin-top: 4px; font-size: 12px">Shipped Tuesday, two parcels.</span>`;

  const slots = { top: part(root, 'slot-top'), page: part(root, 'slot-page') };
  const scrim = part(root, 'scrim');
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const mode = MODES[key];
    if (!mode) return;
    surface.className = mode.className;
    surface.dataset.layer = mode.layer;
    surface.style.left = mode.left;
    surface.style.top = mode.top;
    surface.style.width = mode.width;
    slots[mode.layer].append(surface);
    if (mode.scrim) scrim.setAttribute('data-open', '');
    else scrim.removeAttribute('data-open');
    readout.textContent = mode.note;
  };

  // Each segment names what the surface is, so a step lands on that surface rather than
  // flipping whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('dialog');
}
