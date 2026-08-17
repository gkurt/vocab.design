import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const PANEL = { w: 408, h: 176 };
/** Where the clipping circle starts: under the control that ran it, inside the panel's top right. */
const ORIGIN = { x: 368, y: 16 };
/** A start radius rather than nothing, the way `createCircularReveal` takes one (see the article). */
const SEED = 32;
/** Far enough to clear the opposite corner, so the last frame has no shape left in it. */
const FULL = 412;
const RUN_MS = 900;
const LEAD = 60;
const EASE = 'cubic-bezier(0.2, 0, 0.1, 1)';

const clip = (r: number) => `circle(${r}px at ${ORIGIN.x}px ${ORIGIN.y}px)`;

const line = (label: string, value: string) => `
  <div class="sp-row sp-row--between">
    <span class="sp-text sp-text--ink">${label}</span>
    <span class="sp-text sp-text--ink" style="font-variant-numeric: tabular-nums">${value}</span>
  </div>`;

/**
 * Reveal animation specimen: a summary panel that is uncovered rather than moved in. The panel is
 * laid out at its final position from mount and never translates; what animates is the shape of a
 * `clip-path` circle centred under the control that ran it, growing from a small start radius
 * until it clears the far corner. Behind it sits a dashed placeholder occupying exactly the same
 * box, so the room the panel takes is visibly reserved before a single pixel of it is painted.
 *
 * The subject is the panel being revealed, the narrowest thing the term names. The Replay control,
 * the heading, the readout and the placeholder are the scene, and they stay in the context register.
 *
 * The clip is a transition rather than a keyframe set, so `motion.css` gates it for a reader who
 * asked for less movement. `prefersReducedMotion` is still asked directly, because with transitions
 * off the reset to the start radius and the run would land in the same tick and there would be no
 * run at all; that path simply mounts the panel uncovered. The settle beat comes from the stage's
 * clock so a pose stops the reveal where it stands (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-state="rest" style="height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Checkout</span>
          <span class="sp-text" data-part="readout" style="width: 176px; text-align: right; white-space: nowrap">Uncovered</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div style="position: relative; width: ${PANEL.w}px; height: ${PANEL.h}px">
            <div
              class="sp-context"
              data-part="placeholder"
              aria-hidden="true"
              style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
                     border: 2px dashed var(--sp-line); border-radius: var(--sp-radius)"
            >
              <span class="sp-label">The panel already has this room</span>
            </div>
            <div
              data-part="panel"
              data-subject
              data-clip="open"
              style="position: absolute; inset: 0; padding: 14px 16px; background: var(--sp-surface);
                     border: 1px solid var(--sp-line); border-radius: var(--sp-radius);
                     clip-path: ${clip(FULL)}"
            >
              <div class="sp-row sp-row--between">
                <span class="sp-heading">Order 4471</span>
                <span class="sp-chip" data-part="badge" style="border-color: var(--sp-accent); background: var(--sp-accent-soft)">Shipped</span>
              </div>
              <div class="sp-stack" style="margin-top: 12px; gap: 8px">
                ${line('Stovetop kettle, matte black', '64.00')}
                ${line('Filter papers, two packs', '8.50')}
                ${line('Delivery, Thursday', '3.95')}
              </div>
              <div class="sp-divider" style="margin: 12px 0"></div>
              <div class="sp-row sp-row--between">
                <span class="sp-label">Total</span>
                <span class="sp-heading" style="font-variant-numeric: tabular-nums">76.45</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const panel = part(root, 'panel');
  const readout = part(root, 'readout');
  let settling: number | undefined;

  const land = () => {
    panel.dataset.clip = 'open';
    scene.dataset.state = 'revealed';
    readout.textContent = 'Uncovered';
  };

  const play = () => {
    clock.clearTimeout(settling);

    if (prefersReducedMotion(root)) {
      panel.style.transition = 'none';
      panel.style.clipPath = clip(FULL);
      land();
      return;
    }

    // Back to the start radius with nothing to carry the clip there, then a reflow so the reset
    // and the run cannot be folded into one change.
    panel.style.transition = 'none';
    panel.style.clipPath = clip(SEED);
    void panel.offsetWidth;

    panel.style.transition = `clip-path ${RUN_MS}ms ${EASE} ${LEAD}ms`;
    panel.style.clipPath = clip(FULL);
    panel.dataset.clip = 'growing';
    scene.dataset.state = 'revealing';
    readout.textContent = 'Clip growing from the corner';
    settling = clock.setTimeout(land, LEAD + RUN_MS + 60);
  };

  // Replay names a run rather than toggling one, so a resumed pass lands where it said (SPEC §8).
  part(root, 'replay').addEventListener('click', play);
  play();
}
