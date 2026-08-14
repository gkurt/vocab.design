import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const CANVAS = { w: 300, h: 150 };
const CENTRE = { x: CANVAS.w / 2, y: CANVAS.h / 2 };

/** The span two resting fingers hold, and the range the photo is allowed to turn. */
const SPAN = 116;
const LIMIT = 25;
/** How close to a cardinal angle a live turn has to come before it sticks there. */
const DETENT = 5;

const RIGHT_ANGLE = 15;
const LEFT_ANGLE = -10;

const DOT = 26;
const STEP_MS = 30;
const STEPS = 14;

const contact = (name: string, label: string) => `
  <span
    data-part="dot-${name}"
    style="position: absolute; left: 0; top: 0; width: ${DOT}px; height: ${DOT}px; margin: ${-DOT / 2}px 0 0 ${-DOT / 2}px; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 2px solid #ffffff; background: rgb(255 255 255 / 0.28); color: #ffffff; font-size: 11px; font-weight: 600; pointer-events: none"
  >${label}</span>`;

/**
 * Rotate gesture specimen: a photo canvas carrying two drawn contacts, where the angle of
 * the segment between them is the angle of the picture. A strong horizon runs across the
 * photograph so a turn of ten degrees is legible at specimen size, and the photograph is
 * inset well past the canvas on every side so a rotation never uncovers a corner.
 *
 * The subject is the canvas: the term names the surface that turns under two orbiting
 * contacts, not either contact and not the window around it, and the canvas is the
 * narrowest element that holds the pair and the mapping at once. The topbar, the angle
 * readout and the two simulation controls are instrumentation in the context register.
 *
 * The two-pointer wiring is real and keyed by `pointerId`, exactly as a gesture recognizer
 * keys it, so a reader on a touchscreen who takes the stage over gets the actual turn, with
 * the cardinal detents a live rotation needs. One contact says so and changes nothing.
 *
 * The player has one cursor, so the scripted path reaches its two angles through labelled
 * controls, each driving the rotation to an absolute value rather than turning it further.
 * The step loop runs on the stage's clock and jumps to its end state under reduced motion,
 * since no CSS rule can reach it. Detents are applied to the live gesture only: a simulated
 * sweep that stuck at zero on its way past would be reporting a snap nobody made.
 *
 * Everything but the photograph holds its place and its width, so a turn moves only the
 * picture (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Photos</span>
          <span class="sp-text" data-part="readout" style="width: 228px; text-align: right; white-space: nowrap">Two contacts resting</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px">
          <div
            class="sp-surface"
            data-part="canvas"
            data-subject
            data-contacts="0"
            data-gesture="rest"
            data-angle="0"
            style="position: relative; width: ${CANVAS.w}px; height: ${CANVAS.h}px; overflow: hidden; touch-action: none; user-select: none; cursor: crosshair"
          >
            <span
              data-part="photo"
              style="position: absolute; inset: -70px; transform: rotate(0deg); transform-origin: 50% 50%; background: linear-gradient(#5c7fb0, #a8c2dc 46%, #d9c9a6 46%, #b79a68)"
            >
              <span style="position: absolute; left: 108px; top: 92px; width: 44px; height: 44px; border-radius: 50%; background: #f6dda0"></span>
              <span style="position: absolute; left: 0; right: 0; top: 50%; height: 3px; margin-top: -1.5px; background: rgb(16 24 40 / 0.42)"></span>
              <span style="position: absolute; left: 232px; top: 96px; width: 54px; height: 46px; background: rgb(16 24 40 / 0.38)"></span>
              <span style="position: absolute; left: 300px; top: 112px; width: 38px; height: 30px; background: rgb(16 24 40 / 0.28)"></span>
              <span style="position: absolute; left: 96px; top: 168px; width: 250px; height: 4px; background: rgb(255 255 255 / 0.35)"></span>
            </span>
            <span
              data-part="span"
              style="position: absolute; left: 0; top: 0; width: 0; height: 2px; transform-origin: 0 50%; background: rgb(255 255 255 / 0.7); pointer-events: none"
            ></span>
            ${contact('a', '1')}${contact('b', '2')}
          </div>
          <span
            class="sp-label sp-context"
            data-part="angle"
            style="width: ${CANVAS.w}px; text-align: center; font-variant-numeric: tabular-nums"
          >fingers level, photo turned 0&deg;</span>
        </div>
      </div>
      <div class="sp-row sp-context">
        <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="sim-right">Simulate turn right</button>
        <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="sim-left">Simulate turn left</button>
      </div>
    </div>
  `;

  const canvas = part(root, 'canvas');
  const photo = part(root, 'photo');
  const span = part(root, 'span');
  const dotA = part(root, 'dot-a');
  const dotB = part(root, 'dot-b');
  const readout = part(root, 'readout');
  const angleLabel = part(root, 'angle');

  const contacts = new Map<number, { x: number; y: number }>();
  let timer: number | undefined;
  let turn = 0;
  /** The angle the surface has committed to, and the reading the fingers started from. */
  let settled = 0;
  let baseTurn = 0;
  let baseAngle = 0;
  let paired = false;

  const say = (text: string) => {
    readout.textContent = text;
  };

  const degrees = (a: { x: number; y: number }, b: { x: number; y: number }) => (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;

  /** Place both contacts, and let the segment between them carry the picture's angle. */
  const place = (a: { x: number; y: number }, b: { x: number; y: number }, deg: number) => {
    turn = deg;
    dotA.style.left = `${a.x}px`;
    dotA.style.top = `${a.y}px`;
    dotB.style.left = `${b.x}px`;
    dotB.style.top = `${b.y}px`;
    span.style.left = `${a.x}px`;
    span.style.top = `${a.y - 1}px`;
    span.style.width = `${Math.round(Math.hypot(b.x - a.x, b.y - a.y))}px`;
    span.style.transform = `rotate(${degrees(a, b).toFixed(2)}deg)`;
    photo.style.transform = `rotate(${deg.toFixed(2)}deg)`;
    const shown = Math.round(deg);
    canvas.dataset.angle = String(shown);
    angleLabel.textContent = shown === 0 ? 'fingers level, photo turned 0°' : `fingers at ${shown}°, photo turned ${shown}°`;
  };

  /** The simulated pair: both contacts on a line through the centre, `deg` off level. */
  const orbit = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    const dx = (Math.cos(rad) * SPAN) / 2;
    const dy = (Math.sin(rad) * SPAN) / 2;
    place({ x: CENTRE.x - dx, y: CENTRE.y - dy }, { x: CENTRE.x + dx, y: CENTRE.y + dy }, deg);
  };

  const settle = (target: number) => {
    orbit(target);
    settled = target;
    canvas.dataset.gesture = target === 0 ? 'rest' : 'turned';
    say(`Turned to ${Math.round(target)}°`);
  };

  const simulate = (target: number) => {
    clock.clearTimeout(timer);
    if (prefersReducedMotion(root)) return settle(target);
    const from = turn;
    canvas.dataset.gesture = 'turning';
    canvas.dataset.contacts = '2';
    let step = 0;
    const tick = () => {
      step += 1;
      const t = step / STEPS;
      const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      orbit(from + (target - from) * eased);
      say(`Turning: ${Math.round(turn)}° off level`);
      if (step >= STEPS) return settle(target);
      timer = clock.setTimeout(tick, STEP_MS);
    };
    timer = clock.setTimeout(tick, STEP_MS);
  };

  /** Cardinal detents, for the live gesture only: fingers wobble and level should stick. */
  const detent = (deg: number) => (Math.abs(deg) <= DETENT ? 0 : deg);

  const at = (event: PointerEvent) => {
    const box = canvas.getBoundingClientRect();
    return { x: event.clientX - box.left, y: event.clientY - box.top };
  };

  const live = () => [...contacts.values()];

  canvas.addEventListener('pointerdown', (event) => {
    clock.clearTimeout(timer);
    contacts.set(event.pointerId, at(event));
    canvas.dataset.contacts = String(contacts.size);
    if (contacts.size < 2) {
      // A touch landing mid-simulation takes the surface back to its last committed angle,
      // so the readout can never be left claiming a turn that stopped happening.
      canvas.dataset.gesture = settled === 0 ? 'rest' : 'turned';
      return say('One contact: a turn needs two');
    }
    paired = true;
    canvas.dataset.gesture = 'turning';
    const [a, b] = live();
    if (!a || !b) return;
    baseAngle = degrees(a, b);
    baseTurn = settled;
    place(a, b, settled);
  });

  root.addEventListener('pointermove', (event) => {
    if (!contacts.has(event.pointerId)) return;
    contacts.set(event.pointerId, at(event));
    if (contacts.size < 2) return;
    const [a, b] = live();
    if (!a || !b) return;
    const raw = baseTurn + (degrees(a, b) - baseAngle);
    const next = detent(Math.max(-LIMIT, Math.min(LIMIT, raw)));
    place(a, b, next);
    say(next === 0 ? 'Snapped level' : `Turning: ${Math.round(next)}° off level`);
  });

  const release = (event: PointerEvent) => {
    if (!contacts.delete(event.pointerId)) return;
    canvas.dataset.contacts = String(contacts.size);
    if (contacts.size > 0) return;
    // A lone contact never became a gesture, so the surface goes back to saying what it
    // was saying rather than reporting a turn nobody made.
    if (!paired) {
      canvas.dataset.gesture = settled === 0 ? 'rest' : 'turned';
      return say('One contact lifted: a turn needs two');
    }
    paired = false;
    // The contacts lift where they were, so the surface commits to the angle it is
    // already showing rather than snapping the dots back to a simulated pair.
    settled = turn;
    canvas.dataset.gesture = Math.round(turn) === 0 ? 'rest' : 'turned';
    say(`Turned to ${Math.round(turn)}°`);
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  part(root, 'sim-right').addEventListener('click', () => simulate(RIGHT_ANGLE));
  part(root, 'sim-left').addEventListener('click', () => simulate(LEFT_ANGLE));

  orbit(0);
}
