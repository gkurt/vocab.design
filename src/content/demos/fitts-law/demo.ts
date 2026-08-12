import { flag, part } from '#src/kit/parts.ts';

/** The two constants of the model, which belong to the device and the hand, not to the UI. */
const INTERCEPT_MS = 50;
const SLOPE_MS_PER_BIT = 150;

const TARGET = [
  'position: absolute',
  'display: flex',
  'align-items: center',
  'justify-content: center',
  'padding: 0',
  'border-radius: 6px',
  'cursor: pointer',
].join('; ');

const NOTE = 'position: absolute; white-space: nowrap; font-size: 11px';

/**
 * Fitts's law specimen: one starting point and two targets that differ in both terms of
 * the model, plus the edge case the law is famous for. Each target reads out its own
 * index of difficulty, measured from where it actually sits rather than typed in, and
 * the predicted movement time that follows from it.
 *
 * The subject is the whole scene, and that is a decision rather than a shortcut: the
 * term is a relation between distance, size and time, so it is the comparison itself
 * (SPEC §5). There is no narrower element that could be ringed without the ring saying
 * something false, and nothing here could be dimmed as scenery without dimming half of
 * what is being claimed. Marking the wrapper withdraws the identify control, which is
 * the honest outcome: the answer to "which part of this is the term" is all of it.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" data-subject>
      <div class="sp-frame sp-frame--wide">
        <div class="sp-topbar">
          <span class="sp-heading sp-grow">Aim</span>
          <span class="sp-text" data-part="readout" data-target="none" style="width: 172px; text-align: right">Nothing hit yet</span>
        </div>
        <div class="sp-body" data-part="field" style="position: relative; overflow: hidden; padding: 0">
          <span
            data-part="home"
            style="position: absolute; left: 16px; top: 130px; width: 12px; height: 12px; border-radius: 50%; background: var(--sp-ink)"
          ></span>
          <span class="sp-label" style="${NOTE}; left: 12px; top: 146px">start</span>

          <button
            class="sp-button"
            type="button"
            aria-label="Far small target"
            data-part="far"
            style="${TARGET}; left: 292px; top: 24px; width: 14px; height: 14px"
          ></button>
          <span class="sp-label" data-part="far-note" style="${NOTE}; left: 176px; top: 20px; width: 108px; text-align: right"></span>

          <button
            class="sp-button"
            type="button"
            aria-label="Near large target"
            data-part="near"
            style="${TARGET}; left: 118px; top: 100px; width: 44px; height: 44px"
          ></button>
          <span class="sp-label" data-part="near-note" style="${NOTE}; left: 170px; top: 112px"></span>

          <button
            class="sp-button"
            type="button"
            aria-label="Edge target"
            data-part="edge"
            style="${TARGET}; right: 0; top: 0; bottom: 0; width: 16px; height: auto; border-radius: 0"
          ></button>
          <span class="sp-label" style="${NOTE}; right: 26px; top: 56px; text-align: right">edge: W is unbounded,</span>
          <span class="sp-label" style="${NOTE}; right: 26px; top: 72px; text-align: right">the pointer cannot overshoot it</span>

          <span class="sp-label" style="${NOTE}; left: 12px; top: 172px">Time grows with distance D, shrinks with width W.</span>
        </div>
      </div>
    </div>
  `;

  const readout = part(root, 'readout');

  const centre = (el: HTMLElement) => {
    const box = el.getBoundingClientRect();
    return { x: box.left + box.width / 2, y: box.top + box.height / 2, w: box.width };
  };

  // Measured on the mounted scene, before anything has been written to it, so the
  // numbers describe the specimen the reader is looking at rather than the markup.
  const start = centre(part(root, 'home'));

  const hit = (el: HTMLElement, text: string, name: string) => {
    flag(el, 'data-hit', true);
    // The kit has no hit state to borrow, and the mark is this specimen's own claim,
    // so it is painted from the tokens the kit's selected primitives already use.
    el.style.background = 'var(--sp-ink)';
    readout.dataset.target = name;
    readout.textContent = text;
  };

  for (const name of ['far', 'near'] as const) {
    const target = part(root, name);
    const box = centre(target);
    const distance = Math.hypot(box.x - start.x, box.y - start.y);
    const index = Math.log2((2 * distance) / box.w);
    const time = Math.round(INTERCEPT_MS + SLOPE_MS_PER_BIT * index);
    const summary = `ID ${index.toFixed(1)} bits, about ${time} ms`;
    part(root, `${name}-note`).innerHTML = `D ${Math.round(distance)} px, W ${Math.round(box.w)} px<br />${summary}`;
    target.addEventListener('click', () => hit(target, summary, name));
  }

  const edge = part(root, 'edge');
  edge.addEventListener('click', () => hit(edge, 'Edge: ID collapses, no aim', 'edge'));
}
