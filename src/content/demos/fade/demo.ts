import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const FADE_MS = 280;

/**
 * Fade specimen: one panel and one badge dot, each arriving and leaving on
 * opacity alone. Nothing translates and nothing scales, so the whole
 * demonstration is the number between zero and one.
 *
 * The panel's row is a fixed-height box it is absolutely positioned inside, so
 * the space is owned before the fade starts: a fade reserves nothing by itself,
 * and letting the panel join the flow would shove the legend under it every time
 * the script ran (SPEC §5). Opacity is paired with `visibility` for the same
 * reason the kit's own surfaces pair them: a panel parked at zero is still there
 * and would still take a press meant for what is behind it.
 *
 * Show and Hide are two controls rather than one, so a pass that is
 * fast-forwarded or resumed reaches the state it named instead of flipping
 * whatever it found (SPEC §8). The subject is the fading panel; the dot repeats
 * the same technique out in the scenery, at the size a badge actually uses.
 */
export function mount(root: HTMLElement): void {
  const fading = `transition: opacity ${FADE_MS}ms linear, visibility ${FADE_MS}ms`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 348px; height: 236px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Deploys</span>
          <span style="position: relative; display: inline-flex">
            <span class="sp-icon-button" aria-hidden="true">${icon('bell')}</span>
            <span
              data-part="dot"
              style="position: absolute; top: 3px; right: 3px; width: 8px; height: 8px; border-radius: 50%;
                     background: var(--sp-accent); opacity: 0; visibility: hidden; ${fading}"
            ></span>
          </span>
        </div>
        <div class="sp-body sp-stack" style="gap: 10px">
          <div style="position: relative; height: 108px; flex: 0 0 auto">
            <article
              class="sp-surface sp-stack"
              data-part="panel"
              data-subject
              style="position: absolute; inset: 0; gap: 8px; padding: 12px; opacity: 0; visibility: hidden; ${fading}"
            >
              <span class="sp-row sp-row--between">
                <span class="sp-heading" style="font-size: 13px">Build 4182 finished</span>
                <span class="sp-label">2m ago</span>
              </span>
              <span class="sp-line" style="width: 88%"></span>
              <span class="sp-line" style="width: 64%"></span>
              <span class="sp-row" style="gap: 6px; margin-top: 2px">
                <span class="sp-chip" style="cursor: default">${icon('check')} 214 tests</span>
              </span>
            </article>
          </div>
          <div class="sp-row sp-context" style="gap: 6px">
            <button class="sp-button sp-button--sm" type="button" data-part="show">Show summary</button>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="hide">Hide</button>
          </div>
          <p class="sp-text sp-context" data-stage-verdict data-part="legend" style="margin: 0">
            Opacity only. The panel keeps its space either way.
          </p>
        </div>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const dot = part(root, 'dot');

  const show = (on: boolean) => {
    for (const el of [panel, dot]) {
      el.style.opacity = on ? '1' : '0';
      el.style.visibility = on ? 'visible' : 'hidden';
    }
    panel.setAttribute('aria-hidden', String(!on));
  };

  part(root, 'show').addEventListener('click', () => show(true));
  part(root, 'hide').addEventListener('click', () => show(false));
}
