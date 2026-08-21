import { part } from '#src/kit/parts.ts';

const CURVES = [
  { id: 'linear', label: 'linear', timing: 'linear', path: 'M0 30 L30 0' },
  { id: 'ease-out', label: 'ease-out', timing: 'cubic-bezier(0.16, 1, 0.3, 1)', path: 'M0 30 C 8 4 16 0 30 0' },
  { id: 'overshoot', label: 'overshoot', timing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', path: 'M0 30 C 10 10 14 -8 30 0' },
];

/**
 * Easing specimen: the same distance and the same duration, three timing
 * functions. Run side by side, the curves stop being maths and become the
 * difference between mechanical, settled, and playful.
 *
 * The subject is the group of three tracks, not the whole scene: the term is the
 * shape of a motion over its duration, which needs the comparison of peers to be
 * visible at all, while the heading and the Play control are instrumentation and
 * sit outside it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const tracks = CURVES.map(
    (curve) => `
      <div class="sp-row" style="margin-top: 12px">
        <span class="sp-label" style="width: 78px">${curve.label}</span>
        <span class="sp-track" data-part="track-${curve.id}" style="--sp-timing: ${curve.timing}">
          <span class="sp-dot" data-part="dot-${curve.id}"></span>
        </span>
        <svg class="sp-curve" viewBox="-3 -11 37 45" aria-hidden="true"><path d="${curve.path}" /></svg>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" data-part="stage" data-running style="width: 400px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Same distance, same 1.1s</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="play">Play</button>
        </div>
        <div data-part="tracks" data-subject>${tracks}</div>
      </div>
    </div>
  `;

  const stage = part(root, 'stage');
  part(root, 'play').addEventListener('click', () => {
    stage.removeAttribute('data-running');
    void stage.offsetWidth; // Force a reflow so the run restarts from the left.
    stage.setAttribute('data-running', '');
  });
}
