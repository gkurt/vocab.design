import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';
import '#src/kit/segmented.ts';

const FADE_MS = 420;

/**
 * The two plates. Their paint is stated here rather than taken from the kit for the
 * same reason `.sp-swatch` takes its colour from the demo: the kit has one accent on
 * purpose, and a dissolve between two pictures needs two pictures.
 */
const DAWN = {
  id: 'dawn',
  label: 'Dawn',
  title: 'Low tide, 05:40',
  note: 'Cape shoreline',
  wash: 'linear-gradient(155deg, #f7b267, #b3568f 58%, #4b3a8c)',
};

const DUSK = {
  id: 'dusk',
  label: 'Dusk',
  title: 'High tide, 20:10',
  note: 'Cape shoreline',
  wash: 'linear-gradient(155deg, #2f5fa8, #24356e 56%, #131628)',
};

const PLATES = [DAWN, DUSK];

/**
 * Dissolve specimen: one slot whose picture is exchanged at the low point of a single
 * fade. Down to zero, swap, back up, and nothing moves at any point, which is the
 * claim the term makes about direction.
 *
 * This is deliberately the single-element shape rather than the two-element one: a
 * crossfade stacks two panels so both are partly visible at the midpoint, and here the
 * midpoint shows neither, because there is only ever one plate. The swap happens
 * exactly at zero opacity so the seam is never on screen.
 *
 * The subject is the plate, the thing being dissolved; the segmented control and the
 * frame around it are scenery. Each segment resolves to an absolute plate rather than
 * flipping whatever is showing, so a fast-forwarded or resumed pass lands on the one it
 * named (SPEC §8). The swap is timed on the stage's clock, and the reduced-motion
 * reader gets the exchange with no waiting in the dark.
 *
 * Under the plate there used to be a line reading "One slot, opacity only. Nothing slides, so
 * nothing claims a direction." No field-notes app writes that under its own picture, and the
 * article says it better, so it went and the frame lost the 44px it was holding for it.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const segments = PLATES.map(
    (plate) => `<button class="sp-segment sp-grow" data-part="seg-${plate.id}" value="${plate.id}">${plate.label}</button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 356px; height: 240px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Field notes</span>
          <span class="sp-label">Plate 12</span>
        </div>
        <div class="sp-body">
          <sp-segmented data-stage-mode class="sp-segmented sp-context" data-part="picker" data-axis="Plate" data-value="dawn" style="width: 100%">
            ${segments}
          </sp-segmented>
          <div style="position: relative; height: 122px; margin-top: 12px">
            <figure
              data-part="plate"
              data-subject
              data-showing="dawn"
              data-state="settled"
              style="position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: flex-end;
                     gap: 2px; margin: 0; padding: 12px; border-radius: var(--sp-radius); color: #ffffff;
                     background-image: ${DAWN.wash}; transition: opacity ${FADE_MS / 2}ms linear"
            >
              <figcaption data-part="plate-title" style="font-size: 14px; font-weight: 600">${DAWN.title}</figcaption>
              <span data-part="plate-note" style="font-size: 12px; opacity: 0.82">${DAWN.note}</span>
            </figure>
          </div>
        </div>
      </div>
    </div>
  `;

  const plate = part(root, 'plate');
  const title = part(root, 'plate-title');
  const note = part(root, 'plate-note');
  let swapping: number | undefined;

  const paint = (id: string) => {
    const next = PLATES.find((entry) => entry.id === id);
    if (!next) return;
    plate.style.backgroundImage = next.wash;
    title.textContent = next.title;
    note.textContent = next.note;
    plate.dataset.showing = next.id;
  };

  const show = (id: string) => {
    if (plate.dataset.showing === id) return;
    clock.clearTimeout(swapping);
    plate.dataset.state = 'dissolving';
    plate.style.opacity = '0';

    const half = prefersReducedMotion(root) ? 0 : FADE_MS / 2;
    swapping = clock.setTimeout(() => {
      paint(id);
      plate.style.opacity = '1';
      plate.dataset.state = 'settled';
    }, half);
  };

  part(root, 'picker').addEventListener('change', (event) => show((event as CustomEvent<string>).detail));
}
