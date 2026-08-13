import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';
import '#src/kit/segmented.ts';

const WIPE_MS = 620;
/** Linear on purpose: a travelling boundary that eases reads as a boundary slowing down. */
const TRAVEL = `clip-path ${WIPE_MS}ms linear`;
const EDGE_TRAVEL = `left ${WIPE_MS}ms linear`;

/**
 * The two plates. Their paint is stated here rather than taken from the kit for the same
 * reason `.sp-swatch` takes its colour from the demo: a wipe between two pictures needs
 * two pictures, and the kit has one accent on purpose.
 */
const HARBOUR = {
  id: 'harbour',
  label: 'Harbour',
  title: 'Harbour, 06:10',
  wash: 'linear-gradient(140deg, #f0a35e, #c2557f 56%, #4a3b8f)',
};

const OFFSHORE = {
  id: 'offshore',
  label: 'Offshore',
  title: 'Offshore, 18:45',
  wash: 'linear-gradient(140deg, #2f6ba8, #1f3d76 58%, #101528)',
};

const PLATES = [HARBOUR, OFFSHORE];

/**
 * Wipe specimen: one slot, two stationary plates, and a straight edge that travels
 * across. The top plate carries an `inset()` clip that runs from fully closed on the
 * left to fully open, so the boundary walks left to right on the way in and back the way
 * it came on the way out. Neither picture moves at any point, which is the whole claim
 * the term makes against a slide, and the accent rule rides the same span so the leading
 * edge is visible as an edge.
 *
 * The subject is the slot, since the term names what happens between the two plates
 * rather than either plate; the picker, the frame, and the caption are scenery.
 *
 * A clip changes what is painted and never what is measured, so both plates stay laid
 * out at full size for the whole span and nothing around them moves (SPEC §5). Each
 * segment resolves to an absolute plate rather than flipping whichever one is showing
 * (SPEC §8). The travel is two CSS transitions started in the same tick with identical
 * linear timing, so `motion.css` flattens both together for a reader who asked for less
 * movement, and `data-state` is cleared on the stage's clock so a pose cannot let the
 * edge finish its trip under a reader inspecting it (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const segments = PLATES.map(
    (plate) => `<button class="sp-segment sp-grow" data-part="seg-${plate.id}" value="${plate.id}">${plate.label}</button>`,
  ).join('');

  const plate = (entry: typeof HARBOUR, index: number) => {
    // The second plate is the one that is wiped in, so it is the one that is clipped.
    const clip = index === 1 ? `clip-path: inset(0 100% 0 0); transition: ${TRAVEL}` : '';
    return `
      <figure
        data-part="plate-${entry.id}"
        style="position: absolute; inset: 0; z-index: ${index}; display: flex; flex-direction: column; justify-content: flex-end;
               margin: 0; padding: 12px; color: #ffffff; background-image: ${entry.wash}; ${clip}"
      >
        <figcaption style="font-size: 14px; font-weight: 600">${entry.title}</figcaption>
      </figure>`;
  };

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 360px; height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Coast reel</span>
          <span class="sp-label">Plate 2 of 2</span>
        </div>
        <div class="sp-body">
          <sp-segmented class="sp-segmented sp-context" data-part="picker" data-value="harbour" style="width: 100%">
            ${segments}
          </sp-segmented>
          <div
            data-part="slot"
            data-subject
            data-showing="harbour"
            data-state="settled"
            style="position: relative; height: 118px; margin-top: 12px; overflow: hidden; border-radius: var(--sp-radius)"
          >
            ${plate(HARBOUR, 0)}
            ${plate(OFFSHORE, 1)}
            <span
              data-part="edge"
              aria-hidden="true"
              style="position: absolute; z-index: 2; top: 0; bottom: 0; left: 0; width: 3px; margin-left: -1.5px;
                     background: var(--sp-accent); transition: ${EDGE_TRAVEL}"
            ></span>
          </div>
          <p class="sp-text sp-context" style="margin: 8px 0 0">
            Neither picture moves. Only the boundary between them travels.
          </p>
        </div>
      </div>
    </div>
  `;

  const slot = part(root, 'slot');
  const incoming = part(root, `plate-${OFFSHORE.id}`);
  const edge = part(root, 'edge');
  let settling: number | undefined;

  const show = (id: string) => {
    if (slot.dataset.showing === id) return;
    clock.clearTimeout(settling);
    const open = id === OFFSHORE.id;
    incoming.style.clipPath = open ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)';
    edge.style.left = open ? '100%' : '0%';
    slot.dataset.showing = id;
    slot.dataset.state = 'wiping';
    settling = clock.setTimeout(() => {
      slot.dataset.state = 'settled';
    }, WIPE_MS + 60);
  };

  part(root, 'picker').addEventListener('change', (event) => show((event as CustomEvent<string>).detail));
}
