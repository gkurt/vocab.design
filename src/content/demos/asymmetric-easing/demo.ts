import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const ARENA_H = 116;
/** The pair. Arrival gets the longer, decelerating half; departure the shorter, accelerating one. */
const ENTER = { ms: 340, ease: 'cubic-bezier(0, 0, 0.2, 1)', name: 'ease-out', curve: 'M2 32 C 8 8, 18 2, 32 2' };
const EXIT = { ms: 180, ease: 'cubic-bezier(0.4, 0, 1, 1)', name: 'ease-in', curve: 'M2 32 C 16 32, 26 26, 32 2' };
/** The bar scale: the longer of the two fills it, so the shorter one reads as a fraction. */
const BAR_W = 132;

/**
 * Asymmetric easing specimen: one panel with two different transitions, driven by an
 * Enter control and an Exit control rather than by one that toggles, so a resumed or
 * fast-forwarded pass always lands on the state it named (SPEC §8). The rows underneath
 * carry the pair as it would be written down: each direction's curve, its number, and a
 * bar on a shared scale, so the difference is a length rather than a claim.
 *
 * The subject is the panel that transitions: the term names what the two curves are done
 * to, and neither the page behind it nor the two rows describing them are that. The
 * controls, the scenery lines, and the curve rows are context. The panel was headed
 * "Arriving and leaving", which named the demonstration rather than anything the product
 * would print, so it is gone and the two controls sit alone.
 *
 * Both directions are CSS transitions, which `motion.css` gates for a reader who asked for
 * less movement: the write lands synchronously and the panel is simply in or out. The
 * settle beat is the stage's clock, so a pose stops the move where it stands (SPEC §6), and
 * the panel is absolutely placed inside a clipping arena, so leaving moves nothing that
 * stayed (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const row = (id: string, label: string, spec: typeof ENTER) => `
    <div class="sp-row" style="gap: 10px">
      <svg class="sp-curve" viewBox="0 0 34 34" aria-hidden="true" style="width: 26px; height: 26px; flex: 0 0 auto">
        <path d="${spec.curve}" />
      </svg>
      <span class="sp-stack" style="width: 128px; gap: 1px">
        <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 600">${label}</span>
        <span class="sp-label" style="font-size: 11px">${spec.ms} ms, ${spec.name}</span>
      </span>
      <span style="position: relative; width: ${BAR_W}px; height: 8px; border-radius: 999px; background: var(--sp-sunken)">
        <span
          data-part="bar-${id}"
          style="position: absolute; left: 0; top: 0; bottom: 0; width: ${((spec.ms / ENTER.ms) * BAR_W).toFixed(1)}px;
                 border-radius: 999px; background: var(--sp-accent)"
        ></span>
      </span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" data-part="scene" data-panel="in" data-state="settled" style="width: 424px">
        <div class="sp-row sp-context" style="justify-content: flex-end">
          <span class="sp-row" style="gap: 6px">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="btn-enter">Enter</button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="btn-exit">Exit</button>
          </span>
        </div>
        <div
          style="position: relative; height: ${ARENA_H}px; margin-top: 10px; border-radius: 6px;
                 background: var(--sp-sunken); overflow: hidden"
        >
          <div class="sp-stack sp-context" style="gap: 8px; padding: 14px 16px">
            <span class="sp-line" style="width: 128px"></span>
            <span class="sp-line" style="width: 168px"></span>
            <span class="sp-line" style="width: 96px"></span>
          </div>
          <div
            class="sp-surface sp-stack"
            data-part="panel"
            data-subject
            style="position: absolute; right: 8px; top: 8px; bottom: 8px; width: 196px; gap: 8px; padding: 12px;
                   box-shadow: var(--sp-shadow); transform: translateX(0); opacity: 1;
                   transition: transform ${ENTER.ms}ms ${ENTER.ease}, opacity ${ENTER.ms}ms ${ENTER.ease}"
          >
            <span class="sp-text sp-text--ink" style="font-size: 13px; font-weight: 600">Tide details</span>
            <span class="sp-label">High water 04:12, falling</span>
            <span class="sp-line" style="width: 72%"></span>
          </div>
        </div>
        <div class="sp-stack sp-context" style="gap: 8px; margin-top: 12px">
          ${row('enter', 'Entrance', ENTER)}
          ${row('exit', 'Exit', EXIT)}
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const panel = part(root, 'panel');
  let settling: number | undefined;

  const go = (direction: 'in' | 'out') => {
    clock.clearTimeout(settling);
    const spec = direction === 'in' ? ENTER : EXIT;
    panel.style.transition = `transform ${spec.ms}ms ${spec.ease}, opacity ${spec.ms}ms ${spec.ease}`;
    panel.style.transform = direction === 'in' ? 'translateX(0)' : 'translateX(112%)';
    panel.style.opacity = direction === 'in' ? '1' : '0';
    scene.dataset.panel = direction;

    if (prefersReducedMotion(root)) {
      scene.dataset.state = 'settled';
      return;
    }
    scene.dataset.state = 'moving';
    settling = clock.setTimeout(() => {
      scene.dataset.state = 'settled';
    }, spec.ms + 60);
  };

  part(root, 'btn-enter').addEventListener('click', () => go('in'));
  part(root, 'btn-exit').addEventListener('click', () => go('out'));
}
