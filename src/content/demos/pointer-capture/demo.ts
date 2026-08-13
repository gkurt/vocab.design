import { part } from '#src/kit/parts.ts';

/** The scene both sliders are placed in, in px, so every stroke is the same stroke. */
const STAGE = { w: 424, h: 184 };
const TRACK = { x: 92, w: 240 };
const CAPTURE_Y = 26;
const LOOSE_Y = 75;
const LOOSE_H = 50;
const START = 30;

const clamp = (value: number) => Math.min(100, Math.max(0, value));

const slider = (name: string, label: string, extra = '') => `
  <div class="sp-slider" data-part="${name}" ${extra} style="width: 100%; touch-action: none">
    <div class="sp-slider-track" data-part="${name}-track" style="--sp-from: 0%; --sp-to: ${START}%">
      <div class="sp-slider-fill"></div>
      <button
        class="sp-slider-thumb"
        data-part="${name}-thumb"
        type="button"
        role="slider"
        aria-label="${label}"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${START}"
        style="--sp-at: ${START}%; touch-action: none; cursor: grab"
      ></button>
    </div>
  </div>
`;

/**
 * Pointer capture specimen: a volume slider whose thumb keeps tracking a drag that has
 * wandered far off the control, beside a twin that loses the pointer the moment it leaves.
 * The subject is the capturing slider, since capture is a property of the control that
 * claims the pointer; the twin, the wander target, and the readouts are the comparison
 * around it.
 *
 * The capturing side is the real thing: `setPointerCapture` is called on the press, and
 * the moves are listened for on the thumb, which is where a captured pointer delivers
 * them. A synthesized pointer has no capture to take (there is no live pointer behind the
 * id), so the call is guarded and the demonstration does not depend on it: the player
 * dispatches its moves at the thumb either way, which is precisely what capture would have
 * arranged.
 *
 * The twin is the honest counter-example. It listens on itself, as an uncaptured control
 * does, and drops any move whose coordinates have left its own box, because without
 * capture those events would have been delivered to whatever was under the pointer
 * instead. Both sliders keep their boxes and the readouts hold their widths, so a wander
 * moves a thumb and nothing else (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 282px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Monitor mix</span>
          <span class="sp-text" data-part="readout" style="width: 224px; text-align: right; white-space: nowrap">Drag a thumb off its track</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div style="position: relative; width: ${STAGE.w}px; height: ${STAGE.h}px">
            <span class="sp-label" style="position: absolute; left: 0; top: ${CAPTURE_Y - 8}px; width: 84px">With capture</span>
            <span
              class="sp-label"
              data-part="capture-value"
              style="position: absolute; left: 0; top: ${CAPTURE_Y + 10}px; width: 84px; color: var(--sp-ink); font-variant-numeric: tabular-nums"
            >${START}%</span>
            <div style="position: absolute; left: ${TRACK.x}px; top: ${CAPTURE_Y}px; width: ${TRACK.w}px">
              ${slider('capture', 'Monitor level', 'data-subject data-level="mid" data-state="idle"')}
            </div>

            <div class="sp-context">
              <span class="sp-label" style="position: absolute; left: 0; top: ${LOOSE_Y + LOOSE_H / 2 - 18}px; width: 84px">Without capture</span>
              <span
                class="sp-label"
                data-part="loose-value"
                style="position: absolute; left: 0; top: ${LOOSE_Y + LOOSE_H / 2}px; width: 84px; color: var(--sp-ink); font-variant-numeric: tabular-nums"
              >${START}%</span>
              <div
                data-part="loose"
                data-state="idle"
                style="position: absolute; left: ${TRACK.x}px; top: ${LOOSE_Y}px; width: ${TRACK.w}px; height: ${LOOSE_H}px; display: flex; align-items: center"
              >
                ${slider('loose', 'Cue level')}
              </div>
              <span
                class="sp-label"
                style="position: absolute; left: 216px; top: ${STAGE.h - 32}px; width: 150px; text-align: right; font-size: 11px"
              >the pointer ends up here</span>
              <span
                data-part="away"
                style="position: absolute; left: ${STAGE.w - 32}px; top: ${STAGE.h - 24}px; width: 10px; height: 10px; border-radius: 50%; background: var(--sp-ink)"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const capture = part(root, 'capture');
  const captureTrack = part(root, 'capture-track');
  const captureThumb = part(root, 'capture-thumb');
  const captureValue = part(root, 'capture-value');
  const loose = part(root, 'loose');
  const looseTrack = part(root, 'loose-track');
  const looseThumb = part(root, 'loose-thumb');
  const looseValue = part(root, 'loose-value');
  const readout = part(root, 'readout');

  const render = (track: HTMLElement, thumb: HTMLElement, out: HTMLElement, value: number) => {
    const rounded = Math.round(value);
    track.style.setProperty('--sp-to', `${value}%`);
    thumb.style.setProperty('--sp-at', `${value}%`);
    thumb.setAttribute('aria-valuenow', String(rounded));
    out.textContent = `${rounded}%`;
    return rounded;
  };

  const valueAt = (track: HTMLElement, clientX: number) => {
    const rect = track.getBoundingClientRect();
    if (rect.width === 0) return START;
    return clamp(((clientX - rect.left) / rect.width) * 100);
  };

  let holding: 'capture' | 'loose' | undefined;

  captureThumb.addEventListener('pointerdown', (event) => {
    holding = 'capture';
    capture.dataset.state = 'dragging';
    // The real claim, for a real pointer. A synthesized one has no capture to take, and
    // the demonstration does not rest on the call succeeding.
    try {
      captureThumb.setPointerCapture(event.pointerId);
    } catch {
      /* no live pointer behind this id */
    }
    readout.textContent = 'The thumb has the pointer';
  });

  captureThumb.addEventListener('pointermove', (event) => {
    if (holding !== 'capture') return;
    const value = render(captureTrack, captureThumb, captureValue, valueAt(captureTrack, event.clientX));
    capture.dataset.level = value >= 99 ? 'full' : value <= 1 ? 'none' : 'mid';
    readout.textContent = `Off the track, still setting ${value}%`;
  });

  looseThumb.addEventListener('pointerdown', () => {
    holding = 'loose';
    loose.dataset.state = 'tracking';
    readout.textContent = 'The twin has claimed nothing';
  });

  looseThumb.addEventListener('pointermove', (event) => {
    if (holding !== 'loose') return;
    const box = loose.getBoundingClientRect();
    const inside = event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
    if (!inside) {
      // Uncaptured, this move would have been delivered to whatever the pointer is over.
      holding = undefined;
      loose.dataset.state = 'lost';
      readout.textContent = `Lost the pointer at ${looseValue.textContent}`;
      return;
    }
    render(looseTrack, looseThumb, looseValue, valueAt(looseTrack, event.clientX));
  });

  const release = () => {
    if (holding === 'capture') capture.dataset.state = 'idle';
    if (holding === 'loose') loose.dataset.state = 'idle';
    holding = undefined;
  };

  captureThumb.addEventListener('pointerup', release);
  captureThumb.addEventListener('pointercancel', release);
  looseThumb.addEventListener('pointerup', release);
  looseThumb.addEventListener('pointercancel', release);
}
