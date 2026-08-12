import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/**
 * How long the paint stays up after the finger lifts. A tap can be over faster than an
 * eye tracks it, so the state layer has a floor; this one is generous, because the
 * specimen is watched rather than used.
 */
const MIN_PAINT_MS = 700;

/** The give under the finger, stated here so the live button and the reference row match. */
const PRESS_INK = 'inset 0 2px 5px rgb(16 24 40 / 0.35)';

const STATES = [
  { key: 'rest', label: 'Rest', attr: '' },
  { key: 'hovered', label: 'Hovered', attr: 'data-hovered' },
  { key: 'pressed', label: 'Pressed', attr: 'data-pressed' },
];

/**
 * Pressed state specimen: a button that carries its pressed paint for as long as the
 * pointer is down, and for a moment after, so a fast press is still seen. The subject is
 * that button, since the term names the look a control takes rather than the row of
 * reference states beside it.
 *
 * The paint is spelled as an attribute, not only as `:active`, because attract's
 * synthesized input never lights a pseudo-class (SPEC §7): the same second spelling is
 * what lets the reference row show three states with a pointer on none of them. A real
 * press sets and clears it too, and dragging off the button cancels it without counting,
 * which is how a person changes their mind mid-press.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const swatches = STATES.map(
    ({ key, label, attr }) => `
      <div class="sp-stack" style="align-items: center; gap: 6px; width: 84px">
        <button
          class="sp-button sp-button--sm"
          type="button"
          tabindex="-1"
          data-part="ref-${key}"
          ${attr}
          style="width: 100%; ${key === 'pressed' ? `box-shadow: ${PRESS_INK}` : ''}"
        >Buy</button>
        <span class="sp-label">${label}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Checkout</span>
          <span class="sp-text" data-part="count" data-presses="0" style="width: 116px; text-align: right">Presses: 0</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px">
          <button
            class="sp-button"
            type="button"
            data-part="button"
            data-subject
            style="width: 168px; padding: 10px 16px; touch-action: none; transition: box-shadow 0.09s linear"
          >Place order</button>
          <div class="sp-stack sp-context" style="align-items: center; gap: 10px">
            <div class="sp-row" style="gap: 12px">${swatches}</div>
            <span class="sp-label" style="text-align: center">Each state written as an attribute, so it shows with no pointer on it.</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const button = part(root, 'button');
  const count = part(root, 'count');

  let holding = false;
  let presses = 0;
  let timer: number | undefined;

  const paint = (on: boolean) => {
    flag(button, 'data-pressed', on);
    button.style.boxShadow = on ? PRESS_INK : '';
  };

  const lift = () => {
    clock.clearTimeout(timer);
    timer = undefined;
    paint(false);
  };

  button.addEventListener('pointerdown', () => {
    holding = true;
    clock.clearTimeout(timer);
    timer = undefined;
    paint(true);
  });

  button.addEventListener('pointerup', () => {
    if (!holding) return;
    holding = false;
    presses += 1;
    count.textContent = `Presses: ${presses}`;
    count.dataset.presses = String(presses);
    // The floor: the paint outlives the finger, or a fast press leaves no trace of itself.
    timer = clock.setTimeout(lift, MIN_PAINT_MS);
  });

  // Leaving the control before the release cancels it: the paint drops and nothing runs.
  for (const event of ['pointerleave', 'pointercancel'] as const) {
    button.addEventListener(event, () => {
      if (!holding) return;
      holding = false;
      lift();
    });
  }
}
