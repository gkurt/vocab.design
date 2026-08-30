import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The whole rule: one sheet, one opacity per state. */
const OPACITY: Record<string, number> = { rest: 0, hover: 0.08, pressed: 0.12 };

/**
 * A press ends with the finger, which would leave the pressed sheet on screen for
 * a single frame. The demo holds it a beat so the state it is about can be looked
 * at, and so identify has something to pose.
 */
const PRESS_HOLD_MS = 800;

/**
 * State layer specimen: one button whose container colour never changes. Hover and
 * press only raise the opacity of the sheet lying over it, drawn in the button's
 * own content colour.
 *
 * The key beside the button is a legend and says only what each swatch is. It used
 * to argue as well as name ("One button, three layers", "label, never dimmed",
 * "container, one colour", "state layer, 0 / 8 / 12%"), which is the site talking
 * inside the frame. The percentages left with it: the readout above already prints
 * the live one, state by state.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 336px">
        <div class="sp-row sp-row--between">
          <button class="sp-button" data-part="target" data-subject data-state="rest" style="position: relative; overflow: hidden">
            <span data-part="layer" aria-hidden="true"
                  style="position: absolute; inset: 0; background: var(--sp-accent-ink); opacity: 0; transition: opacity 0.14s var(--sp-ease)"></span>
            <span style="position: relative">Add to library</span>
          </button>
          <span class="sp-label sp-context" data-part="readout">rest &middot; 0%</span>
        </div>

        <div class="sp-context" data-part="exploded" style="margin-top: 18px">
          <span class="sp-label">Layers</span>
          <div class="sp-stack" style="gap: 5px; margin-top: 8px">
            <div class="sp-row">
              <span class="sp-surface" style="width: 58px; height: 16px"></span>
              <span class="sp-text">Label</span>
            </div>
            <div class="sp-row">
              <span class="sp-swatch" style="width: 58px; height: 16px; --sp-swatch: color-mix(in oklab, var(--sp-ink) 12%, transparent)"></span>
              <span class="sp-text">State layer</span>
            </div>
            <div class="sp-row">
              <span class="sp-swatch" style="width: 58px; height: 16px; --sp-swatch: var(--sp-sunken)"></span>
              <span class="sp-text">Container</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const target = part(root, 'target');
  const layer = part(root, 'layer');
  const readout = part(root, 'readout');
  let hovered = false;
  let release: number | undefined;

  const show = (state: string) => {
    const opacity = OPACITY[state] ?? 0;
    target.dataset.state = state;
    layer.style.opacity = String(opacity);
    readout.textContent = `${state} · ${Math.round(opacity * 100)}%`;
  };

  target.addEventListener('pointerenter', () => {
    hovered = true;
    if (target.dataset.state !== 'pressed') show('hover');
  });

  target.addEventListener('pointerleave', () => {
    hovered = false;
    clock.clearTimeout(release);
    show('rest');
  });

  target.addEventListener('pointerdown', () => {
    clock.clearTimeout(release);
    show('pressed');
  });

  target.addEventListener('pointerup', () => {
    clock.clearTimeout(release);
    release = clock.setTimeout(() => show(hovered ? 'hover' : 'rest'), PRESS_HOLD_MS);
  });
}
