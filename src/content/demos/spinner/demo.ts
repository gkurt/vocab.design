import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long the imaginary report takes. Nothing on screen knows this number. */
const WORK_MS = 1800;

const SIZE = 30;
const STROKE = 3;
const R = (SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;
/** A fixed arc, roughly a quarter lap: it never grows, because it is measuring nothing. */
const ARC = C * 0.26;

/**
 * Spinner specimen: a panel that starts a piece of work whose length nobody knows.
 * The subject is the glyph. It carries no value at all, and that absence is the term:
 * no `role="progressbar"`, no `aria-valuenow`, nothing a percentage could be read out
 * of. Its arc is a fixed length that only turns, where a progress ring's arc grows.
 *
 * The wait is announced rather than left to the drawing: the panel is marked
 * `aria-busy` while it fills and a `role="status"` line beside the glyph says what is
 * happening, since a rotating shape on its own is decoration.
 *
 * The rotation is a scripted animation, so it asks about reduced motion itself
 * (SPEC §6): with motion off the glyph rests at a fixed angle instead of turning. The
 * panel's height is reserved for its tallest state, so resolving shifts nothing
 * (SPEC §5), and the resolve is timed on the stage's clock, never on a bare timer.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Reports</span>
          <span class="sp-label">March</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 12px">
          <div
            class="sp-surface"
            data-part="panel"
            aria-busy="false"
            style="display: flex; align-items: center; justify-content: center; height: 132px; padding: 12px"
          >
            <div class="sp-stack sp-context" data-part="idle" style="align-items: center; gap: 6px">
              <span class="sp-text">No report loaded</span>
              <span class="sp-label">It takes as long as it takes</span>
            </div>
            <div class="sp-stack" data-part="loading" role="status" hidden style="align-items: center; gap: 10px">
              <span data-part="spinner" data-subject style="display: block; width: ${SIZE}px; height: ${SIZE}px">
                <svg viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}" aria-hidden="true" style="display: block; overflow: visible">
                  <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${R}" fill="none" stroke="var(--sp-line)" stroke-width="${STROKE}" />
                  <circle
                    cx="${SIZE / 2}"
                    cy="${SIZE / 2}"
                    r="${R}"
                    fill="none"
                    stroke="var(--sp-accent)"
                    stroke-width="${STROKE}"
                    stroke-linecap="round"
                    stroke-dasharray="${ARC.toFixed(2)} ${(C - ARC).toFixed(2)}"
                  />
                </svg>
              </span>
              <span class="sp-text sp-text--ink">Preparing your report</span>
            </div>
            <div class="sp-stack sp-context" data-part="result" hidden style="gap: 9px; width: 100%">
              <div class="sp-row sp-row--between"><span class="sp-text sp-text--ink">Sessions</span><span class="sp-text">12,408</span></div>
              <div class="sp-divider"></div>
              <div class="sp-row sp-row--between"><span class="sp-text sp-text--ink">Conversions</span><span class="sp-text">1,196</span></div>
              <div class="sp-divider"></div>
              <div class="sp-row sp-row--between"><span class="sp-text sp-text--ink">Refunds</span><span class="sp-text">37</span></div>
            </div>
          </div>
          <div class="sp-row sp-row--between sp-context">
            <span class="sp-text" data-stage-verdict data-part="note" style="white-space: nowrap">No percentage, because nothing here knows one</span>
            <button class="sp-button sp-button--sm" type="button" data-part="load" style="flex: 0 0 auto">Load report</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const idle = part(root, 'idle');
  const loading = part(root, 'loading');
  const result = part(root, 'result');
  const glyph = part(root, 'spinner');
  const note = part(root, 'note');
  let spin: Animation | undefined;
  let busy = false;

  const startSpin = () => {
    // A CSS keyframe would be the kit's job and the kit is closed, so the turn is
    // scripted, which means the demo answers reduced motion itself (SPEC §6).
    if (prefersReducedMotion(root)) {
      glyph.style.transform = 'rotate(40deg)';
      return;
    }
    spin = glyph.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], {
      duration: 850,
      iterations: Number.POSITIVE_INFINITY,
      easing: 'linear',
    });
  };

  part(root, 'load').addEventListener('click', () => {
    if (busy) return;
    busy = true;
    idle.hidden = true;
    result.hidden = true;
    loading.hidden = false;
    panel.setAttribute('aria-busy', 'true');
    note.textContent = 'Something is running. That is the whole message';
    startSpin();

    clock.setTimeout(() => {
      spin?.cancel();
      spin = undefined;
      loading.hidden = true;
      result.hidden = false;
      // Both flags come down together: a region left busy is one nobody reads again.
      panel.setAttribute('aria-busy', 'false');
      note.textContent = 'Landed. The wait had no number and needed none';
      busy = false;
    }, WORK_MS);
  });
}
