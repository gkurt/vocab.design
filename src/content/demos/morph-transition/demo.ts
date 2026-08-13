import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const MOVE_MS = 420;
const MOVE = [
  `left ${MOVE_MS}ms var(--sp-ease)`,
  `top ${MOVE_MS}ms var(--sp-ease)`,
  `width ${MOVE_MS}ms var(--sp-ease)`,
  `height ${MOVE_MS}ms var(--sp-ease)`,
  `border-radius ${MOVE_MS}ms var(--sp-ease)`,
].join(', ');

/** The two boxes the container interpolates between, in the slot's own coordinates. */
const COMPACT = { left: 10, top: 10, width: 158, height: 76, radius: 8 };
const OPEN = { left: 0, top: 0, width: 356, height: 196, radius: 12 };

/**
 * Morph specimen: one container that changes shape instead of being replaced. Opening
 * interpolates the card's position, size, and corner radius to the detail panel's in a
 * single move, while the two sets of contents cross over inside it, so the surface the
 * reader clicked is the surface they end up reading. Closing runs the same move backwards.
 *
 * The subject is the morphing surface. The slot it moves inside, the cards it covers, and
 * the bar above are scenery: they are the room reserved for the move, not the move.
 *
 * The slot holds its own size and the surface is absolutely positioned in it, so growing
 * the container cannot push anything around it (SPEC §5). Open and close are two controls
 * resolving to two states rather than one control flipping whichever state it finds (SPEC
 * §8). The move is a CSS transition, so `motion.css` flattens it for a reader who asked for
 * less movement and the two states simply swap. `data-state` is cleared on the stage's
 * clock, so a pose cannot let a morph finish under a reader inspecting it (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const box = (b: typeof COMPACT) =>
    `left: ${b.left}px; top: ${b.top}px; width: ${b.width}px; height: ${b.height}px; border-radius: ${b.radius}px`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 396px; height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Specimens</span>
          <span class="sp-label" data-part="readout">closed</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div
            data-part="slot"
            style="position: relative; width: ${OPEN.width}px; height: ${OPEN.height}px"
          >
            <div
              class="sp-surface sp-context"
              style="position: absolute; left: 178px; top: 10px; width: 168px; height: 76px; padding: 10px"
            >
              <span class="sp-heading" style="font-size: 13px">Sea holly</span>
              <span class="sp-line" style="display: block; width: 74%; margin-top: 10px"></span>
            </div>
            <div
              class="sp-surface sp-context"
              style="position: absolute; left: 10px; top: 98px; width: 336px; height: 88px; padding: 10px"
            >
              <span class="sp-heading" style="font-size: 13px">Marram grass</span>
              <span class="sp-line" style="display: block; width: 88%; margin-top: 10px"></span>
              <span class="sp-line" style="display: block; width: 62%; margin-top: 8px"></span>
            </div>

            <div
              data-part="surface"
              data-subject
              data-state="settled"
              style="position: absolute; overflow: hidden; background: var(--sp-surface);
                     border: 1px solid var(--sp-line); box-shadow: var(--sp-shadow); ${box(COMPACT)};
                     transition: ${MOVE}"
            >
              <div
                data-part="compact"
                class="sp-row"
                style="position: absolute; left: 0; top: 0; width: ${COMPACT.width}px; height: ${COMPACT.height}px;
                       gap: 9px; padding: 10px; opacity: 1; transition: opacity 160ms linear 140ms"
              >
                <span class="sp-swatch" style="flex: 0 0 34px; align-self: stretch; --sp-swatch: var(--sp-accent-soft)"></span>
                <span class="sp-stack sp-grow" style="gap: 6px; min-width: 0">
                  <span class="sp-heading" style="font-size: 13px">Thrift</span>
                  <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="open" style="align-self: flex-start">
                    Open
                  </button>
                </span>
              </div>

              <div
                data-part="detail"
                class="sp-stack"
                style="position: absolute; left: 0; top: 0; width: ${OPEN.width}px; height: ${OPEN.height}px;
                       gap: 10px; padding: 12px; opacity: 0; visibility: hidden;
                       transition: opacity 200ms linear, visibility 200ms linear"
              >
                <div class="sp-row sp-row--between">
                  <span class="sp-heading">Thrift</span>
                  <button class="sp-icon-button" type="button" data-part="close" aria-label="Close">${icon('close')}</button>
                </div>
                <span class="sp-swatch" style="height: 58px; --sp-swatch: var(--sp-accent-soft)"></span>
                <span class="sp-text">Armeria maritima. Cliff tops and salt marsh, flowering May to August.</span>
                <span class="sp-line" style="width: 84%"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const surface = part(root, 'surface');
  const compact = part(root, 'compact');
  const detail = part(root, 'detail');
  const readout = part(root, 'readout');
  let settling: number | undefined;

  const pose = (open: boolean) => {
    if (open === (surface.dataset.open !== undefined)) return;
    const target = open ? OPEN : COMPACT;
    clock.clearTimeout(settling);

    if (open) surface.dataset.open = '';
    else surface.removeAttribute('data-open');
    surface.dataset.state = 'moving';
    surface.style.left = `${target.left}px`;
    surface.style.top = `${target.top}px`;
    surface.style.width = `${target.width}px`;
    surface.style.height = `${target.height}px`;
    surface.style.borderRadius = `${target.radius}px`;

    // The leaving contents go first and the arriving ones follow, so the container is
    // never showing both at once halfway through its travel.
    compact.style.opacity = open ? '0' : '1';
    compact.style.transitionDelay = open ? '0ms' : '160ms';
    detail.style.opacity = open ? '1' : '0';
    detail.style.visibility = open ? 'visible' : 'hidden';
    detail.style.transitionDelay = open ? '180ms' : '0ms';
    readout.textContent = open ? 'expanded' : 'closed';

    settling = clock.setTimeout(() => {
      surface.dataset.state = 'settled';
    }, MOVE_MS + 80);
  };

  part(root, 'open').addEventListener('click', () => pose(true));
  part(root, 'close').addEventListener('click', () => pose(false));
}
