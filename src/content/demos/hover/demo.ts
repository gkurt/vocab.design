import { flag, part } from '#src/kit/parts.ts';

/** The three states a pointer can put a control in, drawn side by side. */
const SAMPLES = [
  { key: 'rest', label: 'Rest', attribute: '' },
  { key: 'hover', label: 'Hover', attribute: 'data-hovered' },
  { key: 'press', label: 'Pressed', attribute: 'data-pressed' },
];

/**
 * Hover specimen: a reference row of the same button held in rest, hover, and
 * pressed, beside one live control the ghost cursor actually arrives on. The
 * subject is the live control, since hover is a state an element is in and the
 * reference row is only there to say what the state looks like.
 *
 * The live control answers the pointer with an attribute as well as `:hover`,
 * because synthesized input never lights up a pseudo-class (SPEC §7), and the
 * state paints with brightness alone so nothing around it moves (SPEC §5).
 *
 * `data-loop="keep"`: every hover here undoes itself on leave, so the pass ends at its mount state, and attract
 * iterations reuse this tree instead of rebuilding it under a reader inspecting it.
 */
export function mount(root: HTMLElement): void {
  const samples = SAMPLES.map(
    ({ key, label, attribute }) => `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 6px">
        <button class="sp-button sp-button--sm" type="button" data-part="state-${key}" ${attribute} tabindex="-1">Follow</button>
        <span class="sp-label">${label}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app" data-loop="keep">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Pointer state</span>
          <span class="sp-text" data-part="readout" style="width: 96px; text-align: right">Away</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 16px">
          <div class="sp-row sp-context" data-part="reference" style="gap: 20px; margin-top: 4px">${samples}</div>
          <div class="sp-divider sp-context" style="width: 100%"></div>
          <button class="sp-button" type="button" data-part="live" data-subject>Follow Priya</button>
          <span class="sp-label sp-context" data-part="note" style="text-align: center">
            Touch has no resting pointer, so nothing may live behind this state alone.
          </span>
        </div>
      </div>
    </div>
  `;

  const live = part(root, 'live');
  const readout = part(root, 'readout');

  const say = (text: string) => {
    readout.textContent = text;
  };

  live.addEventListener('pointerenter', () => {
    flag(live, 'data-hovered', true);
    say('Hovering');
  });

  live.addEventListener('pointerleave', () => {
    flag(live, 'data-hovered', false);
    flag(live, 'data-pressed', false);
    say('Away');
  });

  // Pressing is the state hover is most often confused with, so the live control
  // tells them apart rather than leaving the reference row to claim it alone.
  live.addEventListener('pointerdown', () => {
    flag(live, 'data-pressed', true);
    say('Pressed');
  });

  live.addEventListener('pointerup', () => {
    flag(live, 'data-pressed', false);
    say(live.hasAttribute('data-hovered') ? 'Hovering' : 'Away');
  });
}
