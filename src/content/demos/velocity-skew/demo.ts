import { localPoint } from '#src/kit/measure.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const LANE = { w: 434, h: 108 };
const CARD = { w: 96, h: 64, top: 12 };
/** Where the card's centre may sit, so neither the card nor its leaning corners leave the lane. */
const PAD = 10;
const START = 74;

/** Degrees of skew per pixel per millisecond, and the ceiling: past about fourteen degrees a card
    stops reading as fast and starts reading as broken. */
const SKEW_PER_V = 24;
const MAX_SKEW = 14;
const STRETCH_PER_V = 0.18;
const MAX_STRETCH = 0.12;
/** The decay: how much of the current velocity survives each tick once the input stops. */
const TICK = 40;
const DECAY = 0.88;
/** Below this the card is square again, and the loop has nothing left to do. */
const FLAT = 0.5;
/** A lean worth calling one, and how much bigger one gesture's lean has to be to count as faster. */
const SOME = 1;
const FASTER = 1.4;

const dot = (name: string, x: number) => `
  <span
    data-part="${name}"
    style="position: absolute; left: ${x - 4}px; top: 84px; width: 8px; height: 8px; border-radius: 50%;
           background: var(--sp-ink); opacity: 0.5"
  ></span>`;

const cell = (key: string, label: string, initial: string) => `
  <div class="sp-stack" style="gap: 2px; width: 136px">
    <span class="sp-label" style="font-size: 11px">${label}</span>
    <span class="sp-label sp-text--ink" data-part="read-${key}" style="font-size: 13px; font-variant-numeric: tabular-nums">${initial}</span>
  </div>`;

/**
 * Velocity skew specimen: a card that leans and stretches in proportion to how fast it is being
 * dragged, and eases back to square the moment the input stops. The distortion is not scripted and
 * has no duration of its own: it is the current speed rendered as a shape, which is why the same
 * gesture over a longer distance in the same time produces a bigger lean. The read-out prints the
 * velocity, the skew it maps to and the stretch, so the number driving the picture is on screen
 * beside it.
 *
 * The subject is the skewed card. The lane, the drop marks, the read-out and the reset control are
 * the scene. Every state the card passes through is the term (a card at rest is a velocity of zero,
 * honestly reported), so no `data-pose` is needed. Two facts are latched for a script to read without
 * racing the decay: `data-peak` says whether the last gesture produced a lean at all, and
 * `data-versus` compares that lean with the one before it, which is the proportionality claim stated
 * as a ratio rather than as an absolute anyone would have to time.
 *
 * The decay runs on the stage's clock, one tick every 40 ms, and stops itself as soon as the card is
 * square: nothing here animates while the specimen is idle. The demo wires no hover or press paint of
 * its own, since the player mirrors its own pointer into the kit's spellings already (SPEC §7). Under
 * `prefersReducedMotion` the card still moves with the pointer and simply never distorts, and the
 * read-out says so rather than printing a lean nobody will see.
 *
 * The card moves by a transform inside a lane fixed at mount, and every read-out cell holds its own
 * width, so a drag moves nothing but the card (SPEC §5).
 *
 * The topbar once read "Drag the card", which was the site instructing the reader from inside the
 * product. It is the lane's own name now; the card still says what it invites.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Lane</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="reset">Put it back</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px; padding: 12px">
          <div
            data-part="lane"
            style="position: relative; flex: 0 0 auto; width: ${LANE.w}px; height: ${LANE.h}px; border-radius: 6px;
                   border: 1px solid var(--sp-line); background: var(--sp-surface); overflow: hidden;
                   touch-action: none; user-select: none"
          >
            <span class="sp-context">
              ${dot('spot-a', START)}
              ${dot('spot-b', 160)}
              ${dot('spot-c', 366)}
            </span>
            <div
              data-part="card" data-subject data-motion="square" data-peak="none" data-versus="none"
              style="position: absolute; left: ${-CARD.w / 2}px; top: ${CARD.top}px; width: ${CARD.w}px; height: ${CARD.h}px;
                     display: flex; align-items: center; justify-content: center; border-radius: 8px;
                     background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 12px; font-weight: 600;
                     cursor: grab; transform-origin: 50% 50%; transform: translateX(${START}px); will-change: transform"
            >drag me</div>
          </div>

          <div class="sp-row sp-context" data-part="readout" style="flex: 0 0 auto; gap: 8px">
            ${cell('v', 'velocity', '0.00 px/ms')}
            ${cell('skew', 'skewX', '0.0°')}
            ${cell('stretch', 'scaleX', '1.00')}
          </div>
          <span
            class="sp-text sp-context" data-stage-verdict data-part="note"
            style="flex: 0 0 auto; height: 32px; font-size: 12px; line-height: 1.35"
          >Nothing is animating: the shape is the current speed, and the speed is currently nothing.</span>
        </div>
      </div>
    </div>
  `;

  const card = part(root, 'card');
  const readV = part(root, 'read-v');
  const readSkew = part(root, 'read-skew');
  const readStretch = part(root, 'read-stretch');
  const note = part(root, 'note');
  const reduced = prefersReducedMotion(root);

  const MIN_X = CARD.w / 2 + PAD;
  const MAX_X = LANE.w - 2 - CARD.w / 2 - PAD;

  let x = START;
  let velocity = 0;
  let peak = 0;
  let before: number | undefined;
  let dragging = false;
  let lastX = 0;
  let lastAt = 0;
  let ticking: number | undefined;

  const clamp = (value: number, low: number, high: number) => Math.min(Math.max(value, low), high);

  const paint = () => {
    const skew = reduced ? 0 : clamp(velocity * SKEW_PER_V, -MAX_SKEW, MAX_SKEW);
    const stretch = reduced ? 0 : Math.min(Math.abs(velocity) * STRETCH_PER_V, MAX_STRETCH);
    card.style.transform = `translateX(${x.toFixed(1)}px) skewX(${(-skew).toFixed(2)}deg) scaleX(${(1 + stretch).toFixed(3)})`;
    card.dataset.motion = Math.abs(skew) < FLAT ? 'square' : 'distorting';
    readV.textContent = `${velocity.toFixed(2)} px/ms`;
    readSkew.textContent = reduced ? 'held at 0.0°' : `${skew.toFixed(1)}°`;
    readStretch.textContent = reduced ? 'held at 1.00' : (1 + stretch).toFixed(2);

    if (Math.abs(skew) > peak) peak = Math.abs(skew);
    card.dataset.peak = peak < SOME ? 'none' : 'some';
  };

  const stop = () => {
    clock.clearTimeout(ticking);
    ticking = undefined;
  };

  /** The return to square: a decay, not a tween. It has no target and no duration, only a rate. */
  const tick = () => {
    velocity *= DECAY;
    if (Math.abs(velocity * SKEW_PER_V) < FLAT) velocity = 0;
    paint();
    if (velocity === 0 && !dragging) {
      stop();
      note.textContent = 'Back to square. The decay had no target to reach, only a rate to fade at.';
      return;
    }
    ticking = clock.setTimeout(tick, TICK);
  };

  const run = () => {
    if (ticking === undefined) ticking = clock.setTimeout(tick, TICK);
  };

  root.addEventListener('pointerdown', (event) => {
    if (!card.contains(event.target as Node)) return;
    // Mandatory guard: the player's synthetic pointers cannot be captured and the call throws (SPEC §7).
    if (event.isTrusted) card.setPointerCapture(event.pointerId);
    dragging = true;
    peak = 0;
    velocity = 0;
    lastX = localPoint(event, root).x;
    lastAt = performance.now();
    paint();
    note.textContent = 'Holding. Speed, not distance, is what the shape reads.';
    run();
  });

  root.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const now = performance.now();
    const dt = Math.max(now - lastAt, 8);
    const at = localPoint(event, root).x;
    const dx = at - lastX;
    lastX = at;
    lastAt = now;
    x = clamp(x + dx, MIN_X, MAX_X);
    velocity = clamp(dx / dt, -2, 2);
    paint();
    note.textContent = `Moving at ${Math.abs(velocity).toFixed(2)} px per millisecond, and leaning by that much.`;
  });

  const release = () => {
    if (!dragging) return;
    dragging = false;
    // The proportionality claim, stated against the gesture before it rather than against a number
    // that would depend on how fast the machine happened to deliver the moves.
    const versus = peak > (before ?? 0) * FASTER ? 'faster' : peak * FASTER < (before ?? 0) ? 'slower' : 'similar';
    card.dataset.versus = before === undefined ? 'first' : versus;
    before = peak;
    note.textContent = 'Let go. The lean is decaying back to square on its own.';
    run();
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  // Naming the resting position rather than toggling one, so a resumed pass lands where it says.
  part(root, 'reset').addEventListener('click', () => {
    stop();
    dragging = false;
    velocity = 0;
    peak = 0;
    x = START;
    paint();
    note.textContent = 'Put back. The shape is the current speed, and the speed is nothing again.';
  });

  paint();
  if (reduced) note.textContent = 'Reduced motion: the card still moves with the pointer, and never distorts.';
}
