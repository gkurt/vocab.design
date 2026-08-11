import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';

const STAGES = ['Cart', 'Shipping', 'Payment'] as const;

/**
 * Step indicator specimen: three named stages above the panel they describe. The
 * subject is the track of stages, not the checkout it sits in: the panel below and
 * the buttons that move through it are the flow being reported on.
 *
 * Continue clamps at the last stage rather than wrapping, so a pass resumed part
 * way through can only ever be further along, never back at the start pretending
 * to be finished (SPEC §8). Every stage keeps its width and its marker from mount,
 * so advancing repaints the track without moving it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const stages = STAGES.map(
    (label, i) => `
      <li
        class="sp-row"
        data-part="step-${i + 1}"
        data-state="${i === 0 ? 'current' : 'todo'}"
        ${i === 0 ? 'aria-current="step"' : ''}
        style="flex: 1 1 0; gap: 8px; min-width: 0"
      >
        <span
          data-part="marker-${i + 1}"
          aria-hidden="true"
          style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 22px; height: 22px; border: 1px solid var(--sp-line); border-radius: 50%; font-size: 12px; font-weight: 600"
        >${i + 1}</span>
        <span class="sp-label" data-part="label-${i + 1}" style="min-width: 0">${label}</span>
        ${i < STAGES.length - 1 ? '<span class="sp-divider sp-grow" aria-hidden="true"></span>' : ''}
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 400px; height: 250px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Checkout</span></div>
        <div class="sp-body">
          <ol class="sp-row" data-part="steps" data-subject aria-label="Checkout progress" style="margin: 0; padding: 0 2px; list-style: none; gap: 8px">
            ${stages}
          </ol>
          <div class="sp-surface sp-context" style="margin-top: 14px; padding: 12px; height: 118px">
            <span class="sp-heading" data-part="panel-title">Cart</span>
            <div class="sp-stack" style="margin-top: 12px; gap: 9px">
              <div class="sp-line" style="width: 92%"></div>
              <div class="sp-line" style="width: 74%"></div>
              <div class="sp-line" style="width: 58%"></div>
            </div>
            <div class="sp-row sp-row--between" style="margin-top: 14px">
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="back">Back</button>
              <button class="sp-button sp-button--sm" type="button" data-part="continue">Continue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const items = STAGES.map((_, i) => part(root, `step-${i + 1}`));
  const markers = STAGES.map((_, i) => part(root, `marker-${i + 1}`));
  const title = part(root, 'panel-title');
  const back = part(root, 'back');
  const forward = part(root, 'continue');

  let at = 0;

  const draw = () => {
    items.forEach((item, i) => {
      const state = i < at ? 'done' : i === at ? 'current' : 'todo';
      item.dataset.state = state;
      if (state === 'current') item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
      const label = part(item, `label-${i + 1}`);
      label.className = state === 'todo' ? 'sp-label' : 'sp-label sp-text--ink';
      const marker = markers[i];
      if (!marker) return;
      // A finished stage says so in a shape, not only in a colour: the number is
      // replaced by a check, and the outline it sat in is filled.
      marker.innerHTML = state === 'done' ? icon('check') : String(i + 1);
      marker.style.background = state === 'todo' ? '' : 'var(--sp-accent)';
      marker.style.borderColor = state === 'todo' ? '' : 'var(--sp-accent)';
      marker.style.color = state === 'todo' ? '' : 'var(--sp-accent-ink)';
    });
    title.textContent = STAGES[at] ?? '';
    for (const [button, spent] of [
      [back, at === 0],
      [forward, at === STAGES.length - 1],
    ] as const) {
      button.setAttribute('aria-disabled', String(spent));
    }
  };

  const go = (to: number) => {
    const next = Math.min(STAGES.length - 1, Math.max(0, to));
    if (next === at) return;
    at = next;
    draw();
  };

  forward.addEventListener('click', () => go(at + 1));
  back.addEventListener('click', () => go(at - 1));

  draw();
}
