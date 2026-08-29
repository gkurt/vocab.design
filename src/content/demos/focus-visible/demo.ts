import { flag, part } from '#src/kit/parts.ts';

const ROUTES = {
  keyboard: { arrived: 'Tab key', visible: 'matches', note: 'Focus arrived by keyboard, so the ring is drawn.' },
  pointer: { arrived: 'Pointer press', visible: 'does not match', note: 'Focus arrived by pointer, so no ring is drawn.' },
} as const;

type Route = keyof typeof ROUTES;

/**
 * Focus visible specimen: one control reached two ways. Tab brings the ring with it;
 * pressing the same button with a pointer moves focus and leaves no ring, which is the
 * whole rule the term names.
 *
 * The subject is the button, since a ring is not an element and the narrowest thing
 * that carries one is the control it is drawn around. The readout below is
 * instrumentation and stays scenery (SPEC §5); it reports focus in both routes, because
 * the pointer case hides a drawing rather than skipping a state.
 *
 * The button is the only focusable element in the specimen on purpose: attract's Tab
 * walks the focusables it finds and sets `data-sim-focus` itself (SPEC §7), so with one
 * of them every scripted Tab lands on the subject rather than on wherever a pass that
 * was joined halfway happened to leave the ring. The specimen mounts with the ring on,
 * so identify has the drawn state to point at.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 386px">
        <span class="sp-heading sp-context">Export ledger</span>
        <p class="sp-text sp-context" style="margin: 6px 0 0">March, CSV, 1,204 rows.</p>
        <div class="sp-row" style="margin-top: 12px">
          <button class="sp-button" type="button" data-part="save" data-subject data-route="keyboard" data-sim-focus>Download</button>
        </div>
        <div class="sp-surface sp-context" style="margin-top: 14px; padding: 8px 10px">
          <div class="sp-row sp-row--between" style="height: 18px">
            <span class="sp-label">Focus arrived by</span>
            <span class="sp-text sp-text--ink" data-part="arrived" style="font-size: 12px">${ROUTES.keyboard.arrived}</span>
          </div>
          <div class="sp-row sp-row--between" style="height: 18px; margin-top: 2px">
            <span class="sp-label">:focus</span>
            <span class="sp-text sp-text--ink" style="font-size: 12px">matches</span>
          </div>
          <div class="sp-row sp-row--between" style="height: 18px; margin-top: 2px">
            <span class="sp-label">:focus-visible</span>
            <span class="sp-text sp-text--ink" data-part="visible" style="font-size: 12px">${ROUTES.keyboard.visible}</span>
          </div>
          <p class="sp-text" data-stage-verdict data-part="note" style="margin: 6px 0 0; height: 18px; font-size: 12px; white-space: nowrap">
            ${ROUTES.keyboard.note}
          </p>
        </div>
      </div>
    </div>
  `;

  const save = part(root, 'save');
  const arrived = part(root, 'arrived');
  const visible = part(root, 'visible');
  const note = part(root, 'note');

  // Each route reaches its own state rather than flipping the other's (SPEC §8): a key
  // press is always the keyboard case and a press is always the pointer one.
  const arriveBy = (route: Route) => {
    save.dataset.route = route;
    flag(save, 'data-sim-focus', route === 'keyboard');
    arrived.textContent = ROUTES[route].arrived;
    visible.textContent = ROUTES[route].visible;
    note.textContent = ROUTES[route].note;
  };

  // The ring under a scripted Tab belongs to the stage, which sets the same attribute
  // on the same button; the demo only has to say what the arrival was.
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') arriveBy('keyboard');
  });

  save.addEventListener('click', () => arriveBy('pointer'));
}
