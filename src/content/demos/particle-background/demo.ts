import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const FIELD = { w: 434, h: 176 };
/** ~30 frames a second: the field is ambient, and a lower rate is a cheaper field. */
const FRAME_MS = 33;
const COUNT = 26;
/** Two dots closer than this get a line, its opacity falling off with the distance. */
const LINK = 76;

type Register = 'dots' | 'constellation' | 'starfield';

type Dot = { x: number; y: number; vx: number; vy: number; r: number };

/** A written-down sequence, so every mount lays out the same field. */
function seeded(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function drift(rand: () => number): Dot[] {
  return Array.from({ length: COUNT }, () => {
    const angle = rand() * Math.PI * 2;
    const speed = 0.14 + rand() * 0.3;
    return {
      x: rand() * FIELD.w,
      y: rand() * FIELD.h,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: 1.1 + rand() * 1.5,
    };
  });
}

const REACH = Math.min(FIELD.w, FIELD.h) / 2;

/** A star's distance from the vanishing point sets both its speed and its size. */
function star(rand: () => number, from: number): Dot {
  const angle = rand() * Math.PI * 2;
  const distance = from + rand() * (REACH - from);
  const away = distance / REACH;
  const speed = 0.3 + away * 1.1;
  return {
    x: FIELD.w / 2 + Math.cos(angle) * distance,
    y: FIELD.h / 2 + Math.sin(angle) * distance,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    r: 0.7 + away * 1.6,
  };
}

/**
 * Particle background specimen: an ambient field behind a hero, in the three registers the
 * term is usually named after. Drifting dots wander and wrap; the constellation register
 * draws a line between any two dots close enough to each other; the starfield streams
 * outward from the middle and respawns at it. One canvas carries all three, which is what
 * the article says to do and what keeps a field of this size cheap.
 *
 * The subject is the field layer itself, the canvas (SPEC §5). The hero plate over it is
 * scenery, and it is opaque on purpose: text over a moving field has no stable contrast
 * ground, so the demo shows the fix the article asks for rather than pretending the
 * problem away. The canvas takes no pointer events, since a decorative field never should.
 *
 * The kit is frozen and `requestAnimationFrame` is not a demo's to call, so the loop is a
 * short `DemoClock` timeout that reschedules itself: the stage can freeze it for a pose and
 * stop it on remount. `motion.css` cannot reach a canvas, so the demo asks
 * `prefersReducedMotion` itself and paints exactly one arrangement instead of starting the
 * loop at a reader who asked for less movement.
 *
 * Every register is a real particle background, so the subject never stops being the term
 * and no `data-pose` is needed. Nothing in the scene is positioned by the field, so the
 * field cannot move anything (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 9px">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Backdrop</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="register" data-axis="Style" data-value="constellation">
            <button class="sp-segment" type="button" data-part="seg-dots" value="dots">Dots</button>
            <button class="sp-segment" type="button" data-part="seg-constellation" value="constellation">Constellation</button>
            <button class="sp-segment" type="button" data-part="seg-starfield" value="starfield">Starfield</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div
            data-part="hero"
            style="position: relative; width: ${FIELD.w}px; height: ${FIELD.h}px; overflow: hidden;
                   border-radius: 6px; background: linear-gradient(142deg, #101a3a, #1d1244 58%, #0e2038);
                   display: flex; align-items: center; justify-content: center"
          >
            <canvas
              data-part="field"
              data-subject
              data-register="constellation"
              aria-hidden="true"
              style="position: absolute; inset: 0; width: ${FIELD.w}px; height: ${FIELD.h}px; pointer-events: none"
            ></canvas>
            <div
              class="sp-context"
              data-part="plate"
              style="position: relative; width: 232px; padding: 13px 16px 15px; text-align: center;
                     border-radius: var(--sp-radius); background: rgb(8 11 27 / 0.66)"
            >
              <span class="sp-heading" data-part="headline" style="font-size: 16px; color: #ffffff">Fieldwork</span>
              <p class="sp-text" style="margin: 5px 0 0; color: rgb(232 236 250 / 0.76)">
                The plate is opaque so the letters keep one ground.
              </p>
              <button
                class="sp-button sp-button--sm"
                type="button"
                data-part="cta"
                style="margin-top: 11px; background: #ffffff; color: #14183a"
              >Read the report</button>
            </div>
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 460px; margin: 0; text-align: center">
        <span data-part="note">Twenty-six agents, linked when they pass close.</span>
      </p>
    </div>
  `;

  const canvas = part(root, 'field') as HTMLCanvasElement;
  const note = part(root, 'note');
  const view = root.ownerDocument.defaultView ?? window;
  const ratio = Math.min(view.devicePixelRatio || 1, 2);
  canvas.width = Math.round(FIELD.w * ratio);
  canvas.height = Math.round(FIELD.h * ratio);
  const ctx = canvas.getContext('2d');
  const reduced = prefersReducedMotion(root);

  const rand = seeded(20260819);
  let register: Register = 'constellation';
  let dots = drift(rand);
  let timer: number | undefined;

  const NOTES: Record<Register, string> = {
    dots: 'Twenty-six agents wandering, wrapping at the edges.',
    constellation: 'Twenty-six agents, linked when they pass close.',
    starfield: 'The same agents, streaming out from one vanishing point.',
  };

  const step = (): void => {
    if (register === 'starfield') {
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i] as Dot;
        dot.x += dot.vx;
        dot.y += dot.vy;
        const out = dot.x < -6 || dot.x > FIELD.w + 6 || dot.y < -6 || dot.y > FIELD.h + 6;
        if (out) dots[i] = star(rand, 0);
      }
      return;
    }
    for (const dot of dots) {
      dot.x += dot.vx;
      dot.y += dot.vy;
      if (dot.x < -4) dot.x = FIELD.w + 4;
      if (dot.x > FIELD.w + 4) dot.x = -4;
      if (dot.y < -4) dot.y = FIELD.h + 4;
      if (dot.y > FIELD.h + 4) dot.y = -4;
    }
  };

  const draw = (): void => {
    if (!ctx) return;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, FIELD.w, FIELD.h);

    if (register === 'constellation') {
      ctx.lineWidth = 1;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i] as Dot;
          const b = dots[j] as Dot;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);
          if (distance > LINK) continue;
          ctx.strokeStyle = `rgba(188, 205, 255, ${(1 - distance / LINK) * 0.42})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    ctx.fillStyle = 'rgba(224, 232, 255, 0.86)';
    for (const dot of dots) {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const tick = (): void => {
    step();
    draw();
    timer = clock.setTimeout(tick, FRAME_MS);
  };

  const run = (): void => {
    clock.clearTimeout(timer);
    timer = undefined;
    draw();
    // One arrangement, held still, is the whole accessible answer for idle motion.
    if (reduced) return;
    timer = clock.setTimeout(tick, FRAME_MS);
  };

  // Each segment names a register outright, so a resumed pass lands on the one it asked
  // for rather than stepping to whatever comes next (SPEC §8).
  part(root, 'register').addEventListener('change', (event) => {
    register = (event as CustomEvent<string>).detail as Register;
    canvas.dataset.register = register;
    note.textContent = NOTES[register];
    dots = register === 'starfield' ? Array.from({ length: COUNT }, () => star(rand, 4)) : drift(rand);
    run();
  });

  run();
}
