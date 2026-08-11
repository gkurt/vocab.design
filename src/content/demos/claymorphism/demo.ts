import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long the squish is held, so the press is watchable rather than a single frame. */
const PRESS_MS = 900;

/**
 * Claymorphism specimen: a card and a button inflated out of pastel solids by an
 * over-large radius, doubled inner lighting, and a tinted drop shadow. Pressing the
 * button squishes it, because a clay control that does not give under the pointer
 * reads as a picture of a button. Attract's synthesized input never lights up
 * `:hover` or `:active`, so the state comes from the kit's `data-pressed`.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-clay" data-part="card" data-subject style="width: 292px; padding: 22px">
        <div style="font-weight: 600; font-size: 15px">Daily goal</div>
        <div data-part="readout" style="font-size: 13px; opacity: 0.72; margin-top: 2px">7,400 of 10,000 steps</div>
        <div style="height: 14px; border-radius: 999px; background: #a9b4ef; margin-top: 16px">
          <div data-part="fill" style="width: 74%; height: 100%; border-radius: 999px; background: #ffffff; transition: width 0.35s var(--sp-ease)"></div>
        </div>
        <button class="sp-clay" data-part="button" type="button"
                style="margin-top: 18px; padding: 11px 20px; font: inherit; font-weight: 600; cursor: pointer; --sp-clay-fill: #ffd3bd">
          Log a walk
        </button>
      </div>
      <p class="sp-text sp-context" data-part="caption" style="max-width: 292px; text-align: center">
        Pastel fill, 26px radius, light inside the top edge, shadow tinted toward the fill.
      </p>
    </div>
  `;

  const button = part(root, 'button');
  const fill = part(root, 'fill');
  const readout = part(root, 'readout');
  let release: number | undefined;

  button.addEventListener('click', () => {
    // Absolute, not incremental: a pass can be fast-forwarded or resumed at any point.
    fill.style.width = '86%';
    readout.textContent = '8,600 of 10,000 steps';
    button.setAttribute('data-pressed', '');
    clock.clearTimeout(release);
    release = clock.setTimeout(() => button.removeAttribute('data-pressed'), PRESS_MS);
  });
}
