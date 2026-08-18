import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const BOOK = { w: 320, h: 156 };
const HALF = BOOK.w / 2;
const FOLD_W = 14;
const TURN_MS = 900;
/** The fold's position across the spread: at the outer edge it is flat, at the spine it has turned. */
const FLAT = BOOK.w;
const TURNED = HALF;

const leafClip = (f: number) => `inset(0 ${BOOK.w - f}px 0 0)`;
const flapClip = (f: number) => `inset(0 ${f - HALF}px 0 0)`;
const flapShift = (f: number) => `translateX(${2 * f - BOOK.w}px)`;
const foldShift = (f: number) => `translateX(${f - FOLD_W / 2}px)`;

const page = (number: string, widths: number[]) => `
  <span class="sp-label" style="font-size: 11px">${number}</span>
  ${widths.map((w) => `<span class="sp-line" style="display: block; width: ${w}%; margin-top: 9px"></span>`).join('')}`;

const PAGE_STYLE = `position: absolute; top: 0; width: ${HALF}px; height: ${BOOK.h}px; padding: 12px 14px;
                    background: var(--sp-surface)`;

/**
 * Page curl specimen: a spread whose right leaf folds back across the spine and lands on the left,
 * carrying its own reverse with it. The geometry is the cheap approximation rather than a mesh: the
 * part of the leaf past the fold is clipped away, its reverse is translated back across the fold by
 * the same distance, and a narrow gradient strip rides the fold line doing the work of the bend.
 * Reflecting a sheet about a vertical line lands its back upright, which is why the reverse needs a
 * translate and no mirror at all, and why a real book's turning page stays readable mid-turn.
 *
 * The subject is the turning leaf, marked on the group that carries the front, the reverse and the
 * fold together. A narrower mark is not available: at the end of the turn the front is clipped to
 * nothing and the reverse is the whole of what the reader sees, so a ring on either one alone would
 * trace an empty box at one of the two resting states. The spread beneath, the spine, the buttons
 * and the readout are the scene.
 *
 * Turn reaches the turned state and Back reaches the flat one, so neither step flips whatever it
 * finds (SPEC §8). `motion.css` cannot reach an `element.animate` keyframe set, so the demo asks
 * `prefersReducedMotion` itself and lands the fold where it was headed with no travel. The book
 * holds a box fixed at mount and every moving part is absolutely placed inside it, so nothing in
 * the scene shifts (SPEC §5); the settle beat comes from the stage's clock.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-page="1" data-state="rested" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Reader</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="back">Back</button>
          <button class="sp-button sp-button--sm" type="button" data-part="turn">Turn</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px">
          <div
            data-part="book"
            style="position: relative; width: ${BOOK.w}px; height: ${BOOK.h}px; border: 1px solid var(--sp-line);
                   border-radius: 6px; background: var(--sp-surface); overflow: hidden; box-shadow: var(--sp-shadow)"
          >
            <div class="sp-context">
              <div data-part="under-left" style="${PAGE_STYLE}; left: 0">${page('1', [100, 100, 84, 100, 62])}</div>
              <div data-part="under-right" style="${PAGE_STYLE}; left: ${HALF}px">${page('4', [100, 92, 100, 76])}</div>
              <span style="position: absolute; left: ${HALF - 1}px; top: 0; width: 2px; height: ${BOOK.h}px; background: var(--sp-line)"></span>
            </div>

            <div data-part="page" data-subject style="position: absolute; inset: 0; pointer-events: none">
              <div
                data-part="leaf"
                style="${PAGE_STYLE}; left: ${HALF}px; clip-path: ${leafClip(FLAT)}"
              >${page('2', [100, 88, 100, 100, 70])}</div>
              <div
                data-part="flap"
                style="${PAGE_STYLE}; left: 0; background: var(--sp-sunken); clip-path: ${flapClip(FLAT)};
                       transform: ${flapShift(FLAT)}"
              >${page('3', [100, 100, 74, 100])}</div>
              <span
                data-part="fold" aria-hidden="true"
                style="position: absolute; left: 0; top: 0; width: ${FOLD_W}px; height: ${BOOK.h}px; opacity: 0;
                       transform: ${foldShift(FLAT)};
                       background: linear-gradient(to right, rgb(0 0 0 / 0.18), rgb(255 255 255 / 0.5) 45%, rgb(0 0 0 / 0.1))"
              ></span>
            </div>
          </div>
          <span class="sp-label sp-context" data-part="readout" style="font-size: 11px">Spread 1: pages 1 and 2</span>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const leaf = part(root, 'leaf');
  const flap = part(root, 'flap');
  const fold = part(root, 'fold');
  const readout = part(root, 'readout');
  const reduced = prefersReducedMotion(root);

  let running: Animation[] = [];
  let settling: number | undefined;

  const land = (to: number) => {
    for (const animation of running) animation.cancel();
    running = [];
    leaf.style.clipPath = leafClip(to);
    flap.style.clipPath = flapClip(to);
    flap.style.transform = flapShift(to);
    fold.style.transform = foldShift(to);
    fold.style.opacity = '0';
    scene.dataset.page = to === TURNED ? '2' : '1';
    scene.dataset.state = 'rested';
    readout.textContent = to === TURNED ? 'Spread 2: pages 3 and 4' : 'Spread 1: pages 1 and 2';
  };

  const travel = (from: number, to: number) => {
    clock.clearTimeout(settling);
    for (const animation of running) animation.cancel();
    if (reduced) return land(to);

    const timing = { duration: TURN_MS, easing: 'cubic-bezier(0.4, 0.05, 0.25, 1)', fill: 'forwards' as const };
    scene.dataset.state = 'turning';
    running = [
      leaf.animate([{ clipPath: leafClip(from) }, { clipPath: leafClip(to) }], timing),
      flap.animate(
        [
          { clipPath: flapClip(from), transform: flapShift(from) },
          { clipPath: flapClip(to), transform: flapShift(to) },
        ],
        timing,
      ),
      // The light on the bend arrives with the fold and leaves with it, so a resting spread carries
      // no strip at either edge.
      fold.animate(
        [
          { transform: foldShift(from), opacity: 0 },
          { opacity: 1, offset: 0.14 },
          { opacity: 1, offset: 0.86 },
          { transform: foldShift(to), opacity: 0 },
        ],
        timing,
      ),
    ];
    settling = clock.setTimeout(() => land(to), TURN_MS + 70);
  };

  // Turn reaches the turned spread and Back reaches the flat one: neither is a toggle, so a
  // resumed pass lands on the spread the step named.
  part(root, 'turn').addEventListener('click', () => travel(FLAT, TURNED));
  part(root, 'back').addEventListener('click', () => travel(TURNED, FLAT));

  land(FLAT);
}
