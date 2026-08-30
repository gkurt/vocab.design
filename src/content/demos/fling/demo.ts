import { localPoint } from '#src/kit/measure.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const VIEW = { w: 200, h: 176 };
const ROW = 32;
const ROWS = 24;
const MAX = ROWS * ROW - VIEW.h;

/** How fast the surface eats a throw: distance carried is the release speed times TAU. */
const TAU = 0.32;
const COAST_MS = 1300;
const TICK_MS = 40;

/** A real release is judged on the samples from its last moments, above this speed. */
const SAMPLE_MS = 120;
const FLING_MIN = 260;

const TITLES = [
  'Harbour lights',
  'Slow ferry',
  'Nightjar',
  'Paper boats',
  'Tin roof',
  'Low tide',
  'Halfway home',
  'Corner shop',
  'Second wind',
  'Blue hour',
  'Long division',
  'Gutter song',
];

const rows = Array.from({ length: ROWS }, (_, i) => {
  const title = TITLES[i % TITLES.length];
  return `
    <div class="sp-row" style="gap: 8px; height: ${ROW}px; padding: 0 10px; flex: 0 0 auto">
      <span class="sp-label" style="width: 16px; text-align: right; font-variant-numeric: tabular-nums">${i + 1}</span>
      <span class="sp-text sp-text--ink sp-grow" style="font-size: 12px; white-space: nowrap; overflow: hidden">${title}</span>
    </div>`;
}).join('');

/**
 * A fixed anchor the script grabs, carrying no paint at all: a drawn stop point would annotate
 * the choreography rather than the term, and the ghost cursor is the only pointer artifact the
 * stage draws (SPEC §5).
 */
const dot = (name: string, x: number, y: number) => `
  <span
    data-part="${name}"
    style="position: absolute; left: ${x - 7}px; top: ${y - 7}px; width: 14px; height: 14px; pointer-events: none"
  ></span>`;

/**
 * Fling specimen: a track list that keeps travelling after the contact leaves it, with the
 * release velocity and the distance carried afterwards written out beside it.
 *
 * The subject is the surface that carries the momentum. The term names what a contact does
 * to a scrolling surface, and the narrowest element that is the term is the box holding the
 * travel, not the rows riding in it and not the window around it. The readouts and the reset
 * are instrumentation in the context register, and the two ends of the scripted strokes are
 * unpainted anchors.
 *
 * The pointer wiring is real: a press starts a drag, moves track one to one, and the release
 * is judged on the samples from its last 120 ms, exactly as a recognizer judges one.
 * A reader who throws the list on a touchscreen therefore gets the coast, and a reader who
 * drags and stops before lifting does not.
 *
 * Both halves are performed, and the release is the only difference between them. A drag
 * settles for a beat before it lets go, so its last samples carry no speed and the list stops
 * with the hand; a drag released while still travelling hands over the speed it was moving at.
 * The script says which it wants (`release: 'moving'`, with `ms` short enough that the stroke
 * is quick), and the same recognizer judges both, so neither state is asserted into being.
 * The coast runs on the stage's clock and lands on its rest position under reduced motion,
 * since no CSS rule can reach it.
 *
 * The surface is a fixed box with a translated track inside it, so a coast moves the rows and
 * nothing else (SPEC §5).
 *
 * A line along the foot of the frame used to instruct the reader to let go while the list was
 * still moving. No library app prints that about itself, and the readouts already report the
 * release speed and the distance carried, so it went and the frame lost the height it held.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 272px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Library</span>
          <span class="sp-text" data-part="readout" style="width: 350px; text-align: right; white-space: nowrap">Resting at the top of the list</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 12px">
          <div
            class="sp-surface"
            data-part="surface"
            data-subject
            data-carry="idle"
            data-touch
            style="position: relative; flex: 0 0 auto; width: ${VIEW.w}px; height: ${VIEW.h}px; overflow: hidden; touch-action: none; user-select: none"
          >
            <div data-part="track" style="position: absolute; left: 0; right: 0; top: 0; display: flex; flex-direction: column; transform: translateY(0px)">${rows}</div>
            <span style="position: absolute; inset: 0; pointer-events: none">
              ${dot('grip', VIEW.w / 2, 138)}
              ${dot('grip-end', VIEW.w / 2, 48)}
            </span>
          </div>

          <div class="sp-stack sp-context sp-grow" style="gap: 8px; width: 196px">
            <div class="sp-stack" style="gap: 2px">
              <span class="sp-label">Speed at release</span>
              <span class="sp-heading" data-part="velocity" style="font-variant-numeric: tabular-nums">0 px/s</span>
            </div>
            <div class="sp-divider"></div>
            <div class="sp-stack" style="gap: 2px">
              <span class="sp-label">Carried after release</span>
              <span class="sp-heading" data-part="carried" style="font-variant-numeric: tabular-nums">0 px</span>
            </div>
            <div class="sp-divider"></div>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="reset">Back to the top</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const surface = part(root, 'surface');
  const track = part(root, 'track');
  const readout = part(root, 'readout');
  const velocity = part(root, 'velocity');
  const carried = part(root, 'carried');

  let timer: number | undefined;
  let offset = 0;
  let dragging = false;
  let grabbedAt = 0;
  let grabbedFrom = 0;
  let samples: { t: number; y: number }[] = [];

  const say = (carry: string, text: string) => {
    surface.dataset.carry = carry;
    readout.textContent = text;
  };

  const place = (next: number) => {
    offset = Math.max(0, Math.min(MAX, next));
    track.style.transform = `translateY(${-offset}px)`;
  };

  const stopCoast = () => {
    clock.clearTimeout(timer);
    timer = undefined;
  };

  const settle = (from: number) => {
    stopCoast();
    velocity.textContent = '0 px/s';
    const gone = Math.round(offset - from);
    carried.textContent = `${gone} px`;
    say('settled', `Carried ${gone} px on its own, then stopped`);
  };

  /** Spend the release velocity against a constant friction, which is what a surface does
   *  with a throw. Reduced motion gets the rest position and none of the travel. */
  const coast = (speed: number) => {
    stopCoast();
    const from = offset;
    const distance = speed * TAU;
    velocity.textContent = `${Math.round(Math.abs(speed))} px/s`;
    if (prefersReducedMotion(root)) {
      place(from + distance);
      return settle(from);
    }
    say('coasting', `Let go at ${Math.round(Math.abs(speed))} px/s, still travelling`);
    let elapsed = 0;
    const tick = () => {
      elapsed += TICK_MS;
      const t = elapsed / 1000;
      place(from + distance * (1 - Math.exp(-t / TAU)));
      velocity.textContent = `${Math.round(Math.abs(speed) * Math.exp(-t / TAU))} px/s`;
      if (elapsed >= COAST_MS) return settle(from);
      timer = clock.setTimeout(tick, TICK_MS);
    };
    timer = clock.setTimeout(tick, TICK_MS);
  };

  surface.addEventListener('pointerdown', (event) => {
    // A real drag has to survive leaving the surface; a synthetic pointer cannot be captured.
    if (event.isTrusted) surface.setPointerCapture(event.pointerId);
    stopCoast();
    dragging = true;
    grabbedAt = localPoint(event, root).y;
    grabbedFrom = offset;
    samples = [{ t: performance.now(), y: grabbedAt }];
    velocity.textContent = '0 px/s';
    carried.textContent = '0 px';
    say('dragging', 'Holding the list, tracking one to one');
  });

  root.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const y = localPoint(event, root).y;
    place(grabbedFrom + (grabbedAt - y));
    samples.push({ t: performance.now(), y });
    say('dragging', `Held at ${Math.round(offset)} px in`);
  });

  const release = () => {
    if (!dragging) return;
    dragging = false;
    // The judgement a recognizer makes: only the samples from the last moments count, so a
    // contact that stopped before it lifted has no speed left to hand over.
    const now = performance.now();
    const recent = samples.filter((sample) => now - sample.t <= SAMPLE_MS);
    const first = recent[0];
    const last = recent.at(-1);
    const span = first && last ? last.t - first.t : 0;
    const speed = first && last && span >= 12 ? ((first.y - last.y) / span) * 1000 : 0;
    samples = [];
    if (Math.abs(speed) < FLING_MIN) {
      velocity.textContent = `${Math.round(Math.abs(speed))} px/s`;
      carried.textContent = '0 px';
      return say('none', 'Released at rest: the list stopped with the hand');
    }
    coast(speed);
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  part(root, 'reset').addEventListener('click', () => {
    stopCoast();
    place(0);
    velocity.textContent = '0 px/s';
    carried.textContent = '0 px';
    say('idle', 'Resting at the top of the list');
  });
}
