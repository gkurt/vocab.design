import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/** The drawn mark is the same on both controls; only the region around it differs. */
const GLYPH = 16;
const ROOMY = 44;
const TIGHT = 20;
/** How far off each glyph's centre both presses land, which is inside one box and outside the other. */
const PRESS_OFFSET = 15;

const CONTROL = (size: number) =>
  [
    'position: relative',
    'display: flex',
    'align-items: center',
    'justify-content: center',
    `width: ${size}px`,
    `height: ${size}px`,
    'padding: 0',
    'border-radius: 8px',
  ].join('; ');

/** The region itself, drawn: the box that answers a press rather than the one that is inked. */
const REGION = 'position: absolute; inset: 0; border: 1px dashed var(--sp-accent); border-radius: 8px; pointer-events: none';

/** Where a press is about to land. A child of whatever it lands on, so a click bubbles there. */
const SPOT = [
  'position: absolute',
  'width: 12px',
  'height: 12px',
  'margin: -6px 0 0 -6px',
  'border-radius: 50%',
  'border: 1px solid var(--sp-accent)',
  'background: color-mix(in oklab, var(--sp-accent) 26%, transparent)',
  'pointer-events: none',
].join('; ');

/**
 * Touch target specimen: two controls with the same sixteen pixel glyph and very
 * different regions around it. Each carries a marked press point the same fifteen
 * pixels off its glyph's centre. On the roomy control that point is still inside the
 * region and the press lands; on the tight one it has fallen into the gap between
 * controls and nothing happens.
 *
 * The subject is the roomy control, since the term names one control's activation
 * region rather than the pair or the row they sit in. The regions are drawn as dashed
 * boxes because the region is the thing the term is about and it is otherwise
 * invisible, and the scenery control's box goes neutral with the context register.
 *
 * Nothing here is faked: the press points are children of the element a real press at
 * that spot would reach, so the click a scripted step dispatches on one bubbles to the
 * control and the one dispatched on the other bubbles past it.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Player</span>
          <span class="sp-text" data-part="readout" style="width: 132px; text-align: right">Nothing pressed yet</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px">
          <div class="sp-row" data-part="row" style="align-items: center; gap: 44px">
            <div class="sp-stack" style="align-items: center; gap: 10px; width: 128px">
              <button
                class="sp-button sp-button--quiet"
                type="button"
                aria-label="Favourite"
                data-part="roomy"
                data-subject
                style="${CONTROL(ROOMY)}"
              >
                ${icon('heart')}
                <span style="${REGION}"></span>
                <span data-part="press-in" style="${SPOT}; left: ${ROOMY / 2 - PRESS_OFFSET}px; top: ${ROOMY / 2 - PRESS_OFFSET}px"></span>
              </button>
              <div class="sp-stack" style="align-items: center; gap: 2px">
                <span class="sp-label">Target ${ROOMY} px</span>
                <span class="sp-text" style="font-size: 11px">glyph ${GLYPH} px, padding does the rest</span>
              </div>
            </div>
            <div class="sp-stack sp-context" style="align-items: center; gap: 10px; width: 128px">
              <div style="position: relative; display: flex; align-items: center; justify-content: center; width: ${TIGHT}px; height: ${TIGHT}px">
                <button class="sp-button sp-button--quiet" type="button" aria-label="Repeat" data-part="tight" style="${CONTROL(TIGHT)}">
                  ${icon('star')}
                  <span style="${REGION}"></span>
                </button>
                <span data-part="press-out" style="${SPOT}; left: ${TIGHT / 2 - PRESS_OFFSET}px; top: ${TIGHT / 2 - PRESS_OFFSET}px"></span>
              </div>
              <div class="sp-stack" style="align-items: center; gap: 2px">
                <span class="sp-label">Target ${TIGHT} px</span>
                <span class="sp-text" style="font-size: 11px">glyph ${GLYPH} px, nothing spare</span>
              </div>
            </div>
          </div>
          <div style="height: 18px">
            <span class="sp-label sp-context" data-part="missed" hidden>Same offset, no control underneath it.</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const roomy = part(root, 'roomy');
  const tight = part(root, 'tight');
  const missed = part(root, 'missed');
  const readout = part(root, 'readout');

  const land = (on: HTMLElement, name: string) => {
    flag(on, 'data-selected', true);
    // A quiet button carries no fill of its own, so the landed state is painted from
    // the same tokens the kit's own selected primitives use.
    on.style.background = 'var(--sp-accent-soft)';
    readout.textContent = `Pressed: ${name}`;
    missed.hidden = true;
  };

  roomy.addEventListener('click', () => land(roomy, 'Favourite'));
  tight.addEventListener('click', () => land(tight, 'Repeat'));

  // A press that reached neither control, reported rather than silently swallowed: the
  // gap between two small targets is where a fingertip actually goes wrong.
  part(root, 'row').addEventListener('click', (event) => {
    const at = event.target as Node;
    if (roomy.contains(at) || tight.contains(at)) return;
    readout.textContent = 'Pressed: nothing';
    missed.hidden = false;
  });
}
