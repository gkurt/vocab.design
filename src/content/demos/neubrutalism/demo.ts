import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** Long enough that the drop onto the shadow is watchable, short enough to loop. */
const PRESS_MS = 900;

/**
 * Neubrutalism specimen: a heavy outline, flat saturated fill, square-ish corners,
 * and a shadow offset with no blur at all. Pressing drops the button onto its own
 * shadow, which is the one moment the flatness admits it is a control. The state is
 * an attribute rather than `:active`, since attract's synthesized input never lights
 * up a pseudo-class.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-context" aria-hidden="true" data-part="grid"
           style="position: absolute; inset: 0; background-image: repeating-linear-gradient(to right, rgb(128 128 128 / 0.16) 0 1px, transparent 1px 28px), repeating-linear-gradient(to bottom, rgb(128 128 128 / 0.16) 0 1px, transparent 1px 28px)"></div>
      <div class="sp-brutal" data-part="card" data-subject style="position: relative; width: 296px; padding: 18px">
        <div style="font-size: 21px; font-weight: 800; letter-spacing: -0.01em">WEEKLY DROP</div>
        <p style="font-size: 13px; line-height: 1.45; margin: 8px 0 0">
          Six links, one build note, no filler. Sent every Thursday.
        </p>
        <button class="sp-brutal" data-part="button" type="button"
                style="margin-top: 16px; padding: 9px 16px; font: inherit; font-size: 14px; font-weight: 700; cursor: pointer; --sp-brutal-fill: #7cf0b4">
          SIGN ME UP
        </button>
        <div data-part="status" style="min-height: 18px; margin-top: 10px; font-size: 12px; font-weight: 600">
          Free, and one click to leave.
        </div>
      </div>
    </div>
  `;

  const button = part(root, 'button');
  const status = part(root, 'status');
  let release: number | undefined;

  button.addEventListener('click', () => {
    status.textContent = 'On the list. See you Thursday.';
    button.setAttribute('data-pressed', '');
    clock.clearTimeout(release);
    release = clock.setTimeout(() => button.removeAttribute('data-pressed'), PRESS_MS);
  });
}
