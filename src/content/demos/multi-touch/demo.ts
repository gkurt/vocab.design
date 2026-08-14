import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const CANVAS = { w: 300, h: 150 };
const CENTRE = { x: CANVAS.w / 2, y: CANVAS.h / 2 };

/** The whole mapping in two numbers: the gap two resting fingers hold, and what it means. */
const BASE_GAP = 120;
const OPEN_GAP = 264;
const MAX_SCALE = 2.6;

const DOT = 26;
const STEP_MS = 30;
const STEPS = 14;

const contact = (name: string, label: string) => `
  <span
    data-part="dot-${name}"
    style="position: absolute; left: 0; top: 0; width: ${DOT}px; height: ${DOT}px; margin: ${-DOT / 2}px 0 0 ${-DOT / 2}px; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 2px solid #ffffff; background: rgb(255 255 255 / 0.28); color: #ffffff; font-size: 11px; font-weight: 600; pointer-events: none"
  >${label}</span>`;

/**
 * Multi-touch specimen: a photo canvas carrying two drawn contacts, where the distance
 * between them is the scale of the picture. The subject is the canvas: the term names the
 * surface that can tell two contacts apart rather than either contact or the window around
 * it, and the canvas is the narrowest element that holds the pair and the mapping at once.
 * The topbar, the gap readout, and the two simulation buttons are instrumentation and stay
 * in the context register.
 *
 * The two-pointer wiring is real, keyed by `pointerId` exactly as a gesture recognizer
 * keys it, so a reader on a touchscreen who takes the stage over gets the actual pinch:
 * with two live contacts the dots follow the fingers and the scale follows the distance.
 * One contact says so and changes nothing, which is the honest answer a mouse gets.
 *
 * The player has one cursor, so the scripted path reaches the spread and closed states
 * through labelled simulation controls (the long-press idiom), each of which drives the
 * gap to an absolute value rather than toggling it. The step loop runs on the stage's
 * clock and jumps to its end state under reduced motion, since no CSS rule can reach it.
 *
 * The picture scales by a transform inside a clipped canvas and every readout holds its
 * width, so zooming moves nothing but the photograph (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Photos</span>
          <span class="sp-text" data-part="readout" style="width: 220px; text-align: right; white-space: nowrap">Two contacts resting</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px">
          <div
            class="sp-surface"
            data-part="canvas"
            data-subject
            data-contacts="0"
            data-gesture="rest"
            data-scale="1.00"
            style="position: relative; width: ${CANVAS.w}px; height: ${CANVAS.h}px; overflow: hidden; touch-action: none; user-select: none; cursor: crosshair"
          >
            <span
              data-part="photo"
              style="position: absolute; inset: 0; transform: scale(1); transform-origin: 50% 50%; background: linear-gradient(150deg, #24303d, #4a7290 58%, #8fb8c9)"
            >
              <span style="position: absolute; left: 34px; top: 20px; width: 52px; height: 52px; border-radius: 50%; background: #f0c37c"></span>
              <span style="position: absolute; left: 116px; top: 50px; width: 26px; height: 36px; background: rgb(16 24 40 / 0.46)"></span>
              <span style="position: absolute; left: 148px; top: 60px; width: 18px; height: 26px; background: rgb(16 24 40 / 0.34)"></span>
              <span style="position: absolute; left: 172px; top: 42px; width: 14px; height: 44px; background: rgb(16 24 40 / 0.52)"></span>
              <span style="position: absolute; left: 0; right: 0; top: 86px; height: 2px; background: rgb(255 255 255 / 0.4)"></span>
              <span style="position: absolute; left: 0; right: 0; bottom: 0; height: 54px; background: linear-gradient(rgb(16 24 40 / 0), rgb(16 24 40 / 0.55))"></span>
            </span>
            <span
              data-part="span"
              style="position: absolute; left: 0; top: 0; width: 0; height: 2px; transform-origin: 0 50%; background: rgb(255 255 255 / 0.65); pointer-events: none"
            ></span>
            ${contact('a', '1')}${contact('b', '2')}
          </div>
          <span
            class="sp-label sp-context"
            data-part="gap"
            style="width: ${CANVAS.w}px; text-align: center; font-variant-numeric: tabular-nums"
          >gap ${BASE_GAP} px maps to scale 1.00</span>
        </div>
      </div>
      <div class="sp-row sp-context">
        <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="sim-open">Simulate pinch open</button>
        <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="sim-close">Simulate pinch closed</button>
      </div>
    </div>
  `;

  const canvas = part(root, 'canvas');
  const photo = part(root, 'photo');
  const span = part(root, 'span');
  const dotA = part(root, 'dot-a');
  const dotB = part(root, 'dot-b');
  const readout = part(root, 'readout');
  const gapLabel = part(root, 'gap');

  const contacts = new Map<number, { x: number; y: number }>();
  let timer: number | undefined;
  let gap = BASE_GAP;
  /** The last state the surface committed to, and whether this touch ever had a pair. */
  let settled = 'rest';
  let paired = false;

  const say = (text: string) => {
    readout.textContent = text;
  };

  /** Place both contacts, and let the distance between them be the scale. */
  const draw = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    gap = Math.hypot(b.x - a.x, b.y - a.y);
    const scale = Math.min(MAX_SCALE, Math.max(1, gap / BASE_GAP));
    dotA.style.left = `${a.x}px`;
    dotA.style.top = `${a.y}px`;
    dotB.style.left = `${b.x}px`;
    dotB.style.top = `${b.y}px`;
    span.style.left = `${a.x}px`;
    span.style.top = `${a.y - 1}px`;
    span.style.width = `${Math.round(gap)}px`;
    span.style.transform = `rotate(${(Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI}deg)`;
    photo.style.transform = `scale(${scale.toFixed(3)})`;
    canvas.dataset.scale = scale.toFixed(2);
    gapLabel.textContent = `gap ${Math.round(gap)} px maps to scale ${scale.toFixed(2)}`;
  };

  /** The simulated pair: both contacts on the canvas centre line, `wide` apart. */
  const spread = (wide: number) => {
    draw({ x: CENTRE.x - wide / 2, y: CENTRE.y }, { x: CENTRE.x + wide / 2, y: CENTRE.y });
  };

  const settle = (target: number, gesture: string) => {
    spread(target);
    settled = gesture;
    canvas.dataset.gesture = gesture;
    say(`Pinched ${gesture === 'spread' ? 'open' : 'closed'}: scale ${canvas.dataset.scale}`);
  };

  const simulate = (target: number, gesture: string) => {
    clock.clearTimeout(timer);
    if (prefersReducedMotion(root)) return settle(target, gesture);
    const from = gap;
    canvas.dataset.gesture = 'pinching';
    canvas.dataset.contacts = '2';
    let step = 0;
    const tick = () => {
      step += 1;
      const t = step / STEPS;
      const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      spread(from + (target - from) * eased);
      say(`Pinching: ${Math.round(gap)} px apart`);
      if (step >= STEPS) return settle(target, gesture);
      timer = clock.setTimeout(tick, STEP_MS);
    };
    timer = clock.setTimeout(tick, STEP_MS);
  };

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
      // A touch landing mid-simulation takes the surface back to its last committed state,
      // so the readout can never be left claiming a pinch that stopped happening.
      canvas.dataset.gesture = settled;
      return say('One contact: a pinch needs two');
    }
    paired = true;
    canvas.dataset.gesture = 'pinching';
    const [a, b] = live();
    if (a && b) draw(a, b);
  });

  root.addEventListener('pointermove', (event) => {
    if (!contacts.has(event.pointerId)) return;
    contacts.set(event.pointerId, at(event));
    if (contacts.size < 2) return;
    const [a, b] = live();
    if (a && b) draw(a, b);
    say(`Pinching: ${Math.round(gap)} px apart`);
  });

  const release = (event: PointerEvent) => {
    if (!contacts.delete(event.pointerId)) return;
    canvas.dataset.contacts = String(contacts.size);
    if (contacts.size > 0) return;
    // A lone contact never became a gesture, so the surface goes back to saying what it
    // was saying rather than reporting a pinch nobody made.
    if (!paired) {
      canvas.dataset.gesture = settled;
      return say('One contact lifted: a pinch needs two');
    }
    paired = false;
    settled = gap > BASE_GAP + 20 ? 'spread' : 'closed';
    canvas.dataset.gesture = settled;
    say(`Pinched ${settled === 'spread' ? 'open' : 'closed'}: scale ${canvas.dataset.scale}`);
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  part(root, 'sim-open').addEventListener('click', () => simulate(OPEN_GAP, 'spread'));
  part(root, 'sim-close').addEventListener('click', () => simulate(BASE_GAP, 'closed'));

  spread(BASE_GAP);
}
