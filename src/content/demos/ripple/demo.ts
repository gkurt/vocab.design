import { localPoint, localSize } from '#src/kit/measure.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const RIPPLE_MS = 520;

/**
 * Ripple specimen: one button whose press feedback starts where the press was.
 * Pressing spawns a circle at the contact coordinates, sized to reach the furthest
 * corner, that grows over the control and fades as it goes. Two contact points are
 * driven from the script so the origin is visibly the pointer's and not the
 * button's centre, and a scenery readout names the offset the last press landed at.
 *
 * The subject is the rippling button: the term names the feedback that control
 * gives, and the panel around it is scenery that says where the press landed.
 *
 * The circle goes to `element.animate`, which `motion.css` cannot reach, so the demo
 * asks `prefersReducedMotion` itself and lays the wash over the whole control at
 * once instead of travelling it out from a point (SPEC §5). `data-rippling` is
 * cleared on the stage's clock, so a pose cannot let the wash finish underneath a
 * reader inspecting it (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  // Aim points, not decoration: a choreography targets `data-part` only and the
  // player clicks an element's centre, so a press at 22% and one at 78% of the same
  // button need two marks to aim at. They carry no paint and no size.
  const aim = (id: string, left: string) =>
    `<span data-part="spot-${id}" aria-hidden="true" style="position: absolute; top: 50%; left: ${left}; width: 1px; height: 1px"></span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 336px">
        <span class="sp-heading sp-context">Press anywhere on it</span>
        <button
          class="sp-button"
          type="button"
          data-part="surface"
          data-subject
          style="position: relative; overflow: hidden; width: 100%; height: 46px; margin-top: 12px; font-size: 14px"
        >
          <span style="position: relative">Add to library</span>
          ${aim('left', '22%')}
          ${aim('right', '78%')}
        </button>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 12px; min-height: 20px">
          <span class="sp-label">Origin</span>
          <span class="sp-label" data-part="readout" data-origin="none">no press yet</span>
        </div>
        <p class="sp-text sp-context" style="margin: 8px 0 0">
          The circle starts at the contact point and grows until it has covered the corner furthest from it.
        </p>
      </div>
    </div>
  `;

  const surface = part(root, 'surface');
  const readout = part(root, 'readout');
  let clearing: number | undefined;

  const settle = (ink: HTMLElement) => {
    ink.remove();
    surface.removeAttribute('data-rippling');
  };

  surface.addEventListener('pointerdown', (event: PointerEvent) => {
    const rect = localSize(surface);
    const { x, y } = localPoint(event, surface);
    // Reach the furthest corner, or the far edge of the control stays unwashed.
    const radius = Math.max(
      Math.hypot(x, y),
      Math.hypot(rect.width - x, y),
      Math.hypot(x, rect.height - y),
      Math.hypot(rect.width - x, rect.height - y),
    );
    const reduced = prefersReducedMotion(root);

    clock.clearTimeout(clearing);
    for (const previous of [...surface.querySelectorAll('[data-ink]')]) previous.remove();

    const ink = document.createElement('span');
    ink.dataset.ink = '';
    ink.setAttribute('aria-hidden', 'true');
    // The control's own content colour at a low alpha, which is what lets one rule
    // read correctly on a light control and a dark one alike.
    ink.style.cssText = reduced
      ? 'position: absolute; inset: 0; background: currentcolor; opacity: 0.16; pointer-events: none'
      : `position: absolute; left: ${x - radius}px; top: ${y - radius}px; width: ${radius * 2}px; height: ${radius * 2}px;
         border-radius: 50%; background: currentcolor; pointer-events: none; transform: scale(0); opacity: 0.38`;
    surface.append(ink);
    surface.setAttribute('data-rippling', '');

    readout.dataset.origin = x < rect.width / 2 ? 'left' : 'right';
    readout.textContent = `${Math.round(x)}px, ${Math.round(y)}px from the top left`;

    if (!reduced) {
      ink.animate(
        [
          { transform: 'scale(0)', opacity: 0.38 },
          { transform: 'scale(1)', opacity: 0 },
        ],
        {
          duration: RIPPLE_MS,
          easing: 'cubic-bezier(0.2, 0.6, 0.3, 1)',
          fill: 'forwards',
        },
      );
    }
    clearing = clock.setTimeout(() => settle(ink), RIPPLE_MS + 60);
  });
}
