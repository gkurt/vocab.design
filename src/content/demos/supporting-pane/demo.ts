import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The app window is one fixed box in every size class, so only its interior rearranges. */
const WINDOW_W = 440;
const WINDOW_H = 178;
/** One size per placement, held by the pane itself, so the focus pane is the only thing that reflows. */
const SIDE_W = 136;
const BELOW_H = 84;
const SHEET_H = 92;

const NOTES: Record<string, string> = {
  beside: 'Wide window: the pane sits beside the focus pane and takes about a third of it.',
  below: 'Narrower: a third of this window would be too narrow to read, so the pane drops below.',
  behind: 'Narrowest: no room beside or below, so the pane waits behind a control and arrives as a sheet.',
};

/**
 * The sheet at rest: clipped away at the window's floor, so nothing of it is on stage.
 * The parking is a clip rather than a translate because a pane pushed below the floor is
 * still content the window has to hold, and the window's own box is what it cannot leave
 * (SPEC §5). A clip changes what is painted and never what is measured.
 */
const SHEET_CLOSED: Record<string, string> = {
  position: 'absolute',
  width: 'auto',
  height: `${SHEET_H}px`,
  borderTop: '1px solid var(--sp-line)',
  borderLeft: '0',
  boxShadow: 'var(--sp-shadow)',
  clipPath: 'inset(100% 0 0 0)',
  opacity: '0',
  visibility: 'hidden',
};

const SHEET_OPEN: Record<string, string> = { clipPath: 'inset(0 0 0 0)', opacity: '1', visibility: 'visible' };

/** Geometry per placement. `left/right/bottom` are set once and simply ignored while the pane is static. */
const PANE_STYLE: Record<string, Record<string, string>> = {
  beside: {
    position: 'static',
    width: `${SIDE_W}px`,
    height: 'auto',
    borderTop: '0',
    borderLeft: '1px solid var(--sp-line)',
    boxShadow: 'none',
    clipPath: 'none',
    opacity: '1',
    visibility: 'visible',
  },
  below: {
    position: 'static',
    width: 'auto',
    height: `${BELOW_H}px`,
    borderTop: '1px solid var(--sp-line)',
    borderLeft: '0',
    boxShadow: 'none',
    clipPath: 'none',
    opacity: '1',
    visibility: 'visible',
  },
  behind: SHEET_CLOSED,
};

const segment = (value: string, label: string) => `
  <button class="sp-segment" type="button" data-part="seg-${value}" value="${value}" style="padding: 4px 10px; font-size: 12px">
    ${label}
  </button>`;

const comment = (initials: string, width: number) => `
  <span style="display: flex; align-items: center; gap: 7px; flex: 0 0 auto; height: 18px">
    <span class="sp-avatar" style="width: 18px; height: 18px; font-size: 9px">${initials}</span>
    <span class="sp-line" style="flex: 1 1 auto; width: ${width}%; height: 6px"></span>
  </span>`;

const prose = (widths: number[]) =>
  widths.map((w) => `<span class="sp-line" style="flex: 0 0 auto; width: ${w}%; height: 7px"></span>`).join('');

/**
 * Supporting pane specimen: a review screen whose focus pane holds the document and whose
 * supporting pane holds the comment thread written against it, moved by the size class from
 * beside, to below, to behind a control.
 *
 * The subject is the pane itself, the narrowest element the term names. The document, the
 * top bar, the size-class picker and the caption are scenery in the context register (SPEC
 * §5). The pane is a supporting pane in all three placements, sheet included, so no state
 * needs a `data-pose`.
 *
 * The window is a fixed box and each placement gives the pane a stated size, so a size class
 * rearranges the window's interior and moves nothing around it (SPEC §5). The document is the
 * one thing that gives room up: it is a scroller, because a pane taking a third of a short
 * window leaves the document less than it needs, and a document view that scrolls is the
 * honest answer where one that cut its last lines off is not. Each segment names
 * the placement it produces and the sheet has an explicit open and an explicit close, so a
 * script resumed at any point reaches a state rather than flipping the one it found (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Review: where the pane goes</span>
          <sp-segmented class="sp-segmented" data-part="sizes" data-value="beside">
            ${segment('beside', 'beside')}${segment('below', 'below')}${segment('behind', 'behind')}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div
            data-part="window"
            data-placement="beside"
            style="position: relative; display: flex; flex: 0 0 auto; width: ${WINDOW_W}px; height: ${WINDOW_H}px;
                   overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line);
                   border-radius: var(--sp-radius)"
          >
            <div
              class="sp-context"
              data-part="focus"
              style="display: flex; flex-direction: column; gap: 8px; flex: 1 1 auto; min-width: 0; min-height: 0; padding: 10px 12px"
            >
              <span style="display: flex; align-items: center; gap: 8px; flex: 0 0 auto; height: 24px">
                <span class="sp-heading sp-grow" style="font-size: 12px">Berth agreement</span>
                <span style="display: flex; justify-content: flex-end; flex: 0 0 auto; width: 104px; height: 24px">
                  <button
                    class="sp-button sp-button--ghost sp-button--sm"
                    type="button"
                    data-part="open-support"
                    hidden
                    style="display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px; font-size: 11px"
                  >
                    ${icon('inbox')} Comments
                  </button>
                </span>
              </span>
              <div class="sp-scroll" style="display: flex; flex-direction: column; gap: 7px; flex: 1 1 auto; min-height: 0">
                ${prose([96, 88, 93, 72, 90, 84, 66, 91, 58])}
              </div>
            </div>

            <div
              data-part="support"
              data-subject
              data-placement="beside"
              style="display: flex; flex-direction: column; gap: 6px; left: 0; right: 0; bottom: 0; z-index: 1;
                     flex: 0 0 auto; width: ${SIDE_W}px; padding: 8px; overflow: hidden;
                     background: var(--sp-surface); border-left: 1px solid var(--sp-line);
                     transition: clip-path 0.26s var(--sp-ease), opacity 0.2s, visibility 0.26s"
            >
              <span style="display: flex; align-items: center; gap: 6px; flex: 0 0 auto; height: 20px">
                <span class="sp-label sp-grow">Comments</span>
                <span style="display: flex; justify-content: flex-end; flex: 0 0 auto; width: 20px; height: 20px">
                  <button class="sp-icon-button" type="button" data-part="close-support" aria-label="Close" hidden style="width: 20px; height: 20px">
                    ${icon('close')}
                  </button>
                </span>
              </span>
              ${comment('RA', 100)}${comment('MK', 82)}
            </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="flex: 0 0 auto; height: 40px; max-width: ${WINDOW_W}px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const win = part(root, 'window');
  const support = part(root, 'support');
  const trigger = part(root, 'open-support');
  const closer = part(root, 'close-support');
  const readout = part(root, 'readout');

  const place = (key: string) => {
    const geometry = PANE_STYLE[key];
    const note = NOTES[key];
    if (!geometry || !note) return;
    win.dataset.placement = key;
    support.dataset.placement = key;
    win.style.flexDirection = key === 'beside' ? 'row' : 'column';
    Object.assign(support.style, geometry);
    flag(trigger, 'hidden', key !== 'behind');
    flag(closer, 'hidden', key !== 'behind');
    readout.textContent = note;
  };

  // The trigger only ever opens and the close button only ever closes, so neither step
  // depends on the state the script happened to resume in (SPEC §8).
  trigger.addEventListener('click', () => {
    if (support.dataset.placement !== 'behind') return;
    Object.assign(support.style, SHEET_OPEN);
  });
  closer.addEventListener('click', () => {
    if (support.dataset.placement !== 'behind') return;
    Object.assign(support.style, SHEET_CLOSED);
  });

  part(root, 'sizes').addEventListener('change', (event) => place((event as CustomEvent<string>).detail));

  place('beside');
}
