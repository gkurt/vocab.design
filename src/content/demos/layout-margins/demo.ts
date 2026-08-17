import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The arena the surface resizes inside: fixed, so only the surface itself changes size. */
const ARENA_W = 436;
const ARENA_H = 180;

type Size = { width: number; margin: number; note: string };

const SIZES: Record<string, Size> = {
  narrow: {
    width: 216,
    margin: 16,
    note: 'The tinted band is the margin: 16 px each side, the same on every screen in the product.',
  },
  medium: {
    width: 320,
    margin: 24,
    note: 'The tinted band is the margin: 24 px each side. It steps up with the window, it does not scale.',
  },
  wide: {
    width: 432,
    margin: 32,
    note: 'The tinted band is the margin: 32 px each side. Surplus width goes here, not into longer lines.',
  },
};

/** The tinted band is the margin itself, drawn as the surface's own padding. */
const BAND = 'color-mix(in srgb, var(--sp-accent) 16%, var(--sp-sunken))';

/**
 * Layout margins specimen: one surface at three widths, with the reserved band between its
 * edge and its content drawn as tint and stated as a number.
 *
 * The subject is the content container the margins hold in, not the surface around it and
 * not the tinted band: the ring lands on the column, and the inset the term names is the
 * space immediately outside it. The band stays out of the context register because it is
 * the measurement being read, not scenery; the picker, the readout and the legend are the
 * instrumentation and wear the register (SPEC §5).
 *
 * The surface resizes inside a fixed arena, since a width change is the thing being shown
 * and must not push the readout around (SPEC §5). The margin is one padding value written
 * to the surface, so the band and the column can never disagree about where the inset is.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Window width</span>
          <sp-segmented class="sp-segmented" data-part="switcher" data-value="narrow">
            <button class="sp-segment" type="button" data-part="seg-narrow" value="narrow">narrow</button>
            <button class="sp-segment" type="button" data-part="seg-medium" value="medium">medium</button>
            <button class="sp-segment" type="button" data-part="seg-wide" value="wide">wide</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px">
          <div style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: ${ARENA_W}px; height: ${ARENA_H}px">
            <div
              data-part="surface"
              style="display: flex; width: ${SIZES.narrow?.width}px; height: 100%; padding: ${SIZES.narrow?.margin}px;
                     background: ${BAND}; border: 1px solid var(--sp-line); border-radius: 12px"
            >
              <div
                data-part="content"
                data-subject
                data-margin="16"
                style="display: flex; flex-direction: column; gap: 6px; flex: 1 1 auto; min-width: 0; padding: 9px 12px;
                       background: var(--sp-surface); border-radius: 6px"
              >
                <span class="sp-heading" style="flex: 0 0 auto; font-size: 13px">Berth transfer</span>
                <div class="sp-line" style="flex: 0 0 auto; height: 7px; width: 96%"></div>
                <div class="sp-line" style="flex: 0 0 auto; height: 7px; width: 88%"></div>
                <div class="sp-line" style="flex: 0 0 auto; height: 7px; width: 61%"></div>
                <span class="sp-button sp-button--sm" style="flex: 0 0 auto; align-self: flex-start; margin-top: auto; cursor: default">Confirm</span>
              </div>
            </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 40px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const surface = part(root, 'surface');
  const content = part(root, 'content');
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const size = SIZES[key];
    if (!size) return;
    surface.style.width = `${size.width}px`;
    surface.style.padding = `${size.margin}px`;
    content.dataset.margin = String(size.margin);
    readout.textContent = size.note;
  };

  // Each segment names a width, so a scripted step lands on that width rather than
  // stepping to whichever one comes next (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('narrow');
}
