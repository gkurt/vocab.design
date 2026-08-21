import { part } from '#src/kit/parts.ts';

/** The value's range, and how many pixels of travel one unit costs. */
const MIN = 8;
const MAX = 320;
const START = 200;
const PX_PER_UNIT = 2;

const TRACK = 400;

const mark = (name: string, side: 'left' | 'right', text: string) => `
  <span
    class="sp-row sp-context"
    data-part="${name}"
    style="position: absolute; ${side}: 0; top: 8px; gap: 6px; pointer-events: none"
  >
    ${side === 'right' ? `<span class="sp-label" style="font-size: 11px">${text}</span>` : ''}
    <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--sp-muted)"></span>
    ${side === 'left' ? `<span class="sp-label" style="font-size: 11px">${text}</span>` : ''}
  </span>`;

/**
 * Scrubby slider specimen: a width field whose label is dragged sideways to run the
 * number, with the box it drives redrawn as the value changes. The subject is the field,
 * label and box together, since the term names the pair: a number you can drag by its
 * label and still type into. The preview, the two aiming marks, and the caption are the
 * scene around it.
 *
 * The scrub is really computed from the pointer rather than mimed, so a reader who takes
 * the stage over gets the gesture. Nothing is re-parented between the press and the
 * release, and the field never writes back into its own input while someone is typing:
 * rewriting the box under a keystroke is how a masked field eats the character after it.
 *
 * The preview lives in a fixed-height band and the readouts hold their widths, so a value
 * that runs from 8 to 320 moves nothing but the box it describes (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 264px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Inspector</span>
          <span class="sp-text" data-part="readout" style="width: 214px; text-align: right; white-space: nowrap">Drag the W sideways</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 12px">
          <div class="sp-context" style="position: relative; width: ${TRACK}px; height: 104px">
            <div
              data-part="box"
              style="position: absolute; left: 0; top: 24px; width: ${START}px; height: 56px; border-radius: 6px; background: var(--sp-accent-soft); border: 1px solid var(--sp-accent)"
            ></div>
            <span class="sp-label" style="position: absolute; left: 0; top: 86px; font-size: 11px">the box this number draws</span>
          </div>
          <div style="position: relative; width: ${TRACK}px; height: 34px">
            ${mark('mark-left', 'left', 'drag left')}
            ${mark('mark-right', 'right', 'drag right')}
            <div
              class="sp-row sp-surface"
              data-part="field"
              data-subject
              data-value="${START}"
              data-trend="none"
              style="position: absolute; left: 50%; top: 0; transform: translateX(-50%); gap: 0; padding: 2px; border-radius: 6px"
            >
              <span
                data-part="scrub"
                style="display: flex; align-items: center; justify-content: center; width: 30px; height: 26px; border-radius: 5px; color: var(--sp-muted); font-size: 12px; font-weight: 500; cursor: ew-resize; touch-action: none; user-select: none"
              >W</span>
              <input
                class="sp-input"
                data-part="value"
                type="text"
                inputmode="numeric"
                aria-label="Width"
                value="${START}"
                style="width: 68px; height: 26px; padding: 0 8px; text-align: right; font-variant-numeric: tabular-nums"
              />
            </div>
          </div>
          <span class="sp-label sp-context">Drag the label to approximate. Click the box to type an exact number.</span>
        </div>
      </div>
    </div>
  `;

  const field = part(root, 'field');
  const scrub = part(root, 'scrub');
  const box = part(root, 'box');
  const readout = part(root, 'readout');
  const input = part(root, 'value') as HTMLInputElement;

  let value = START;
  let origin: { x: number; value: number } | undefined;

  const apply = (next: number, trend: string, text: string) => {
    value = Math.max(MIN, Math.min(MAX, Math.round(next)));
    box.style.width = `${value}px`;
    field.dataset.value = String(value);
    field.dataset.trend = trend;
    readout.textContent = text;
  };

  scrub.addEventListener('pointerdown', (event) => {
    // Mandatory guard: the player's synthetic pointers cannot be captured and the call throws (SPEC §7).
    if (event.isTrusted) scrub.setPointerCapture(event.pointerId);
    origin = { x: event.clientX, value };
    scrub.style.background = 'var(--sp-sunken)';
    scrub.style.color = 'var(--sp-ink)';
    readout.textContent = 'Scrubbing';
  });

  root.addEventListener('pointermove', (event) => {
    if (!origin) return;
    const dx = event.clientX - origin.x;
    const trend = dx > 0 ? 'up' : dx < 0 ? 'down' : 'none';
    const next = origin.value + dx / PX_PER_UNIT;
    apply(next, trend, `Scrubbed ${Math.round(dx)} px`);
    input.value = String(value);
  });

  const release = () => {
    if (!origin) return;
    origin = undefined;
    scrub.style.background = '';
    scrub.style.color = '';
    readout.textContent = `W is ${value}, set by dragging`;
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  // Click to type: the box empties the way a numeric field's select-all does, so the
  // next keystroke replaces the value instead of appending to it.
  input.addEventListener('pointerdown', () => {
    input.value = '';
    field.dataset.trend = 'typing';
    readout.textContent = 'Typing an exact number';
  });

  // Read, never write: rewriting the box during input would land the next character
  // after whatever the demo had just clamped it to.
  input.addEventListener('input', () => {
    const typed = Number(input.value);
    if (input.value === '' || !Number.isFinite(typed)) return;
    apply(typed, 'typed', `W is ${Math.max(MIN, Math.min(MAX, Math.round(typed)))}, typed exactly`);
  });
}
