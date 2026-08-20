import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The window onto the strip, and the strip itself: the difference is the room to coast. */
const VIEW = 400;
const CARD = 120;
const GAP = 10;

/** Deceleration, in px per ms squared, and the frame the coast is advanced on. */
const FRICTION = 0.0006;
const TICK_MS = 16;
/** Below this the release was a stop, not a throw; above this the coast counts as one. */
const FLING_MIN = 0.08;
const COAST_MIN = 40;
/** A release long after the last move is a hand that had already stopped moving. */
const STALE_MS = 250;
/** How far back the throw is judged. Per-frame input (a real mouse, the player's drag)
 * ends on a truncated final delta, so a two-sample estimate is noise; a window is how
 * real momentum implementations read a throw. */
const VELOCITY_WINDOW_MS = 100;

const SHOTS = [
  'linear-gradient(150deg, #24303d, #4a7290)',
  'linear-gradient(150deg, #4a7290, #8fb8c9)',
  'linear-gradient(150deg, #d8c39a, #9c7c53)',
  'linear-gradient(150deg, #b6603f, #e8b17a)',
  'linear-gradient(150deg, #2f4a3a, #7fa06a)',
  'linear-gradient(150deg, #7fa06a, #d9d7a6)',
  'linear-gradient(150deg, #5b4a7a, #9d84c4)',
  'linear-gradient(150deg, #1e222c, #57606f)',
] as const;

const CONTENT = SHOTS.length * (CARD + GAP) - GAP;
const MAX = CONTENT - VIEW;

/**
 * Momentum scrolling specimen: a photo strip thrown with a flick, which keeps travelling
 * after the pointer has gone and decelerates to a stop. The subject is the strip, since
 * the term names what the scrolled surface does with a gesture that has already ended;
 * the ruler under it and the readouts beside it are the instruments watching it.
 *
 * The coast is the demonstration, so it is really computed: the velocity is measured
 * over the stroke's last ~100 ms (the way real momentum scrollers judge a throw, so a
 * per-frame stream's truncated final delta never decides it alone), and a constant
 * deceleration is applied on the stage's clock until the speed runs out. It is an `element.animate`-class move in that CSS cannot gate it, so it asks
 * `prefersReducedMotion` itself and lands on the resting offset at once instead. The
 * distance travelled after the lift is stated out loud, because that number is the only
 * thing a stopped-dead scroller could not produce.
 *
 * The strip is a fixed window with a transformed track inside it and every readout holds
 * its width, so nothing the throw does moves anything around it (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const cards = SHOTS.map(
    (wash, i) => `
      <span
        data-part="card-${i}"
        style="flex: 0 0 auto; width: ${CARD}px; height: 100%; border-radius: 6px; background: ${wash}"
      ></span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Recent captures</span>
          <span class="sp-text" data-part="readout" style="width: 210px; text-align: right; white-space: nowrap">Flick the strip and let go</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 12px">
          <div
            data-part="strip"
            data-subject
            data-phase="idle"
            data-coast="none"
            style="position: relative; overflow: hidden; width: ${VIEW}px; height: 116px; border-radius: var(--sp-radius); border: 1px solid var(--sp-line); background: var(--sp-surface); cursor: grab; touch-action: none"
          >
            <div
              data-part="track"
              style="position: absolute; inset: 6px auto 6px 0; display: flex; gap: ${GAP}px; width: ${CONTENT}px; transform: translateX(0px)"
            >${cards}</div>
          </div>
          <div class="sp-row sp-context" style="gap: 10px">
            <div class="sp-progress" data-part="ruler" style="flex: 1 1 auto">
              <div class="sp-progress-fill" data-part="ruler-fill" style="--sp-value: 0%; transition: none"></div>
            </div>
            <span
              class="sp-label"
              data-part="travelled"
              style="width: 150px; text-align: right; font-variant-numeric: tabular-nums"
            >0 px after the lift</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const strip = part(root, 'strip');
  const track = part(root, 'track');
  const fill = part(root, 'ruler-fill');
  const readout = part(root, 'readout');
  const travelled = part(root, 'travelled');

  let offset = 0;
  let coasted = 0;
  let timer: number | undefined;
  let held: { x: number; at: number } | undefined;
  /** The stroke's recent samples, pruned to the velocity window as it is drawn. */
  let trail: { x: number; at: number }[] = [];

  const clamp = (value: number) => Math.min(MAX, Math.max(0, value));

  const render = () => {
    track.style.transform = `translateX(${-offset}px)`;
    fill.style.setProperty('--sp-value', `${(offset / MAX) * 100}%`);
  };

  const say = (phase: string, text: string) => {
    strip.dataset.phase = phase;
    readout.textContent = text;
  };

  const settle = () => {
    clock.clearTimeout(timer);
    timer = undefined;
    strip.dataset.coast = coasted >= COAST_MIN ? 'some' : 'none';
    travelled.textContent = `${Math.round(coasted)} px after the lift`;
    say('rest', coasted >= COAST_MIN ? `Coasted ${Math.round(coasted)} px on its own` : 'Stopped where the hand stopped');
  };

  /** One frame of the coast: move by the current speed, then take friction out of it. */
  const coast = (speed: number) => {
    let velocity = speed;
    const tick = () => {
      const before = offset;
      offset = clamp(offset + velocity * TICK_MS);
      coasted += Math.abs(offset - before);
      travelled.textContent = `${Math.round(coasted)} px after the lift`;
      render();
      velocity -= Math.sign(velocity) * FRICTION * TICK_MS;
      if (Math.abs(velocity) < FLING_MIN / 4 || offset === 0 || offset === MAX) return settle();
      say('coast', `Coasting at ${Math.abs(velocity).toFixed(2)} px per ms`);
      timer = clock.setTimeout(tick, TICK_MS);
    };
    tick();
  };

  strip.addEventListener('pointerdown', (event) => {
    clock.clearTimeout(timer);
    timer = undefined;
    coasted = 0;
    strip.dataset.coast = 'none';
    travelled.textContent = '0 px after the lift';
    held = { x: event.clientX, at: performance.now() };
    trail = [{ x: event.clientX, at: held.at }];
    say('drag', 'Holding the strip');
  });

  root.addEventListener('pointermove', (event) => {
    const prev = trail[trail.length - 1];
    if (!held || !prev) return;
    const now = performance.now();
    offset = clamp(offset - (event.clientX - prev.x));
    trail.push({ x: event.clientX, at: now });
    while (trail.length > 2 && now - (trail[1]?.at ?? now) > VELOCITY_WINDOW_MS) trail.shift();
    render();
    say('drag', 'Dragging with the pointer');
  });

  const release = () => {
    if (!held) return;
    held = undefined;
    const newest = trail[trail.length - 1];
    const oldest = trail[0];
    if (!newest || !oldest) return settle();
    const span = newest.at - oldest.at;
    const stale = performance.now() - newest.at > STALE_MS;
    // Content moves against the pointer, so the offset's velocity is the stroke's negated.
    const velocity = span > 0 && !stale ? -(newest.x - oldest.x) / span : 0;
    if (Math.abs(velocity) < FLING_MIN) return settle();
    say('coast', 'Let go: the strip keeps going');
    if (!prefersReducedMotion(root)) return coast(velocity);
    // A move CSS cannot reach has to gate itself: land on where the throw would have ended.
    const projected = clamp(offset + (Math.sign(velocity) * (velocity * velocity)) / (2 * FRICTION));
    coasted = Math.abs(projected - offset);
    offset = projected;
    render();
    settle();
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);
}
