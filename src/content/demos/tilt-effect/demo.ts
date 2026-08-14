import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';

const FIELD = { w: 420, h: 190 };
const CARD = { w: 232, h: 150 };
const CENTRE = { x: FIELD.w / 2, y: FIELD.h / 2 };
/** Under ten degrees on each axis: past that the card reads as distorted, not tipped. */
const MAX = 8;

const mark = (name: string, x: number, y: number) => `
  <span data-part="${name}" aria-hidden="true" style="position: absolute; left: ${x}px; top: ${y}px; width: 1px; height: 1px; pointer-events: none"></span>`;

/**
 * 3D tilt specimen: one card in a perspective container, leaning toward wherever the
 * pointer is. The pointer's place inside the field is normalised to a pair running from
 * minus one to one; the horizontal number drives `rotateY` and the vertical one drives a
 * negated `rotateX`, so the corner nearest the pointer is the corner that comes forward.
 * A soft highlight tracks the same coordinates, which is what sells the surface as
 * something catching light rather than as a box that skewed.
 *
 * The subject is the tilting card. The field, the aiming marks, and the angle readout are
 * instrumentation: the readout is there so the mapping can be read off the specimen
 * rather than guessed at, and it stays in the context register.
 *
 * Angles are measured against the field's own box, never the card's, because the card is
 * the thing being rotated and its measured rect moves with the tilt. `data-tilt` names
 * the coarse direction so a script can prove the mapping, and it is set whatever the
 * motion preference, while the transform and the highlight are both gated: a reader who
 * asked for less movement gets a flat card that never leans (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Now playing</span>
          <span class="sp-text" data-part="readout" style="width: 210px; text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums">rotateX 0.0, rotateY 0.0</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div
            data-part="field"
            style="position: relative; width: ${FIELD.w}px; height: ${FIELD.h}px; background: var(--sp-surface); border: 1px solid var(--sp-line);
                   border-radius: 6px; perspective: 800px; touch-action: none"
          >
            <div
              data-part="card"
              data-subject
              data-tilt="flat"
              style="position: absolute; left: ${CENTRE.x - CARD.w / 2}px; top: ${CENTRE.y - CARD.h / 2}px; width: ${CARD.w}px; height: ${CARD.h}px;
                     border-radius: 10px; padding: 14px; overflow: hidden; background: linear-gradient(150deg, var(--sp-accent), #6f4bd8);
                     color: var(--sp-accent-ink); box-shadow: var(--sp-shadow); display: flex; flex-direction: column; justify-content: flex-end;
                     transform: rotateX(0deg) rotateY(0deg); transition: transform 0.28s var(--sp-ease)"
            >
              <span
                data-part="sheen"
                aria-hidden="true"
                style="position: absolute; inset: 0; pointer-events: none; opacity: 0;
                       background: radial-gradient(circle at 50% 50%, rgb(255 255 255 / 0.5), transparent 62%); transition: opacity 0.28s linear"
              ></span>
              <span style="position: relative; font-size: 15px; font-weight: 600">Slipway Sessions</span>
              <span style="position: relative; font-size: 12px; opacity: 0.85">Harbour Quartet, 2021</span>
            </div>
            ${mark('top-left', 140, 58)}
            ${mark('bottom-right', 280, 132)}
            ${mark('centre', CENTRE.x, CENTRE.y)}
          </div>
        </div>
      </div>
    </div>
  `;

  const field = part(root, 'field');
  const card = part(root, 'card');
  const sheen = part(root, 'sheen');
  const readout = part(root, 'readout');
  const reduced = prefersReducedMotion(root);

  const clamp = (n: number) => Math.min(Math.max(n, -1), 1);

  field.addEventListener('pointermove', (event: PointerEvent) => {
    const box = field.getBoundingClientRect();
    const nx = clamp((event.clientX - box.left - CENTRE.x) / (CARD.w / 2));
    const ny = clamp((event.clientY - box.top - CENTRE.y) / (CARD.h / 2));
    const rotateY = nx * MAX;
    const rotateX = -ny * MAX;

    const across = nx < -0.2 ? 'left' : nx > 0.2 ? 'right' : 'centre';
    const down = ny < -0.2 ? 'top' : ny > 0.2 ? 'bottom' : 'middle';
    card.dataset.tilt = across === 'centre' && down === 'middle' ? 'flat' : `${down}-${across}`;
    readout.textContent = `rotateX ${rotateX.toFixed(1)}, rotateY ${rotateY.toFixed(1)}`;

    if (reduced) return;
    card.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    // The highlight is where the light would be catching, which is where the pointer is.
    sheen.style.background = `radial-gradient(circle at ${(50 + nx * 40).toFixed(0)}% ${(50 + ny * 40).toFixed(0)}%, rgb(255 255 255 / 0.5), transparent 62%)`;
    sheen.style.opacity = '1';
  });

  field.addEventListener('pointerleave', () => {
    card.dataset.tilt = 'flat';
    readout.textContent = 'rotateX 0.0, rotateY 0.0';
    if (reduced) return;
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    sheen.style.opacity = '0';
  });
}
