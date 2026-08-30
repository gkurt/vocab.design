import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * Gradient border specimen: the two-background technique, stated inline because the
 * gradient is this term's own paint. The card carries a transparent border, its fill
 * clipped to `padding-box`, and the gradient clipped to `border-box`, which is what
 * makes the hue survive the rounded corners that `border-image` would square off.
 *
 * The subject is the bordered card. Its plain-edged twin is scenery, and so is the
 * switcher: each segment names one gradient (conic sweeps around the outline, linear
 * runs along one axis), so a resumed pass lands on a setting rather than flipping one.
 */
const FILL = 'linear-gradient(var(--sp-surface), var(--sp-surface)) padding-box';

const EDGES: Record<string, string> = {
  conic: 'conic-gradient(from 140deg, #6366f1, #22d3ee 30%, #f472b6 62%, #6366f1) border-box',
  linear: 'linear-gradient(115deg, #6366f1, #22d3ee 46%, #f472b6) border-box',
};

const CARD = 'width: 176px; padding: 15px; border: 2px solid transparent; border-radius: 14px';

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-row" style="align-items: flex-start; gap: 18px">
        <div class="sp-stack" style="gap: 8px">
          <div data-part="card" data-subject data-edge="conic"
               style="${CARD}; background: ${FILL}, ${EDGES.conic}">
            <div class="sp-row sp-row--between">
              <span style="font-size: 14px; font-weight: 600">Studio</span>
              <span class="sp-chip" style="padding: 2px 8px; font-size: 10px">Pro</span>
            </div>
            <p class="sp-text" style="margin: 8px 0 0; font-size: 12px">
              Unlimited specimens, shared kits, and a seat for every reviewer.
            </p>
            <button class="sp-button sp-button--sm" data-part="cta" type="button" style="width: 100%; margin-top: 12px">Upgrade</button>
          </div>
          <span class="sp-label" style="text-align: center">gradient edge</span>
        </div>

        <div class="sp-stack sp-context" style="gap: 8px">
          <div data-part="plain"
               style="${CARD}; border-color: var(--sp-line); background: var(--sp-surface)">
            <div class="sp-row sp-row--between">
              <span style="font-size: 14px; font-weight: 600">Studio</span>
              <span class="sp-chip" style="padding: 2px 8px; font-size: 10px">Free</span>
            </div>
            <p class="sp-text" style="margin: 8px 0 0; font-size: 12px">
              Three specimens, one kit, and the reviewer you already have.
            </p>
            <button class="sp-button sp-button--sm sp-button--ghost" type="button" style="width: 100%; margin-top: 12px">Stay</button>
          </div>
          <span class="sp-label" style="text-align: center">solid edge</span>
        </div>
      </div>

      <div class="sp-row sp-context" data-part="tools" style="gap: 10px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Gradient" data-part="switcher" data-value="conic">
          <button class="sp-segment" type="button" data-part="seg-conic" value="conic">Conic</button>
          <button class="sp-segment" type="button" data-part="seg-linear" value="linear">Linear</button>
        </sp-segmented>
      </div>
    </div>
  `;

  const card = part(root, 'card');

  part(root, 'switcher').addEventListener('change', (event) => {
    const value = (event as CustomEvent<string>).detail;
    const edge = EDGES[value];
    if (!edge) return;
    card.dataset.edge = value;
    card.style.background = `${FILL}, ${edge}`;
  });
}
