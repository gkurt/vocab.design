import { part } from '#src/kit/parts.ts';

const FIELD_W = 200;
const FIELD_H = 120;
const HUE_STOPS = [0, 120, 240, 360];
const SPECTRUM = 'linear-gradient(to right, #ff0000, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000)';

const clamp = (value: number, low = 0, high = 100) => Math.min(high, Math.max(low, value));

/** HSV is the picker's own space: the field is two of its axes and the strip is the third. */
function hex(hue: number, sat: number, val: number): string {
  const c = (val / 100) * (sat / 100);
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = val / 100 - c;
  const sextant = Math.floor((hue % 360) / 60);
  const rgb = [
    [c, x, 0],
    [x, c, 0],
    [0, c, x],
    [0, x, c],
    [x, 0, c],
    [c, 0, x],
  ][sextant] as number[];
  return `#${rgb
    .map((channel) =>
      Math.round(((channel as number) + m) * 255)
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`;
}

/**
 * Colour picker specimen: a saturation and brightness field with a hue strip under
 * it, a swatch, and the value as text. The subject is the picker panel, since no
 * one part of it is the term: the field alone sets two of three numbers, and the
 * strip alone sets the third.
 *
 * The paint is stated inline because it is this term's own claim (SPEC §5): the kit
 * has one accent, and a specimen that could only show kit colours could not
 * demonstrate choosing a colour. Every gesture resolves to an absolute value
 * through one `set()`, so a pass that starts over lands in the same place (SPEC §8),
 * and the readout is a fixed width column so a shorter value moves nothing.
 */
export function mount(root: HTMLElement): void {
  const stops = HUE_STOPS.map(
    (stop) =>
      `<span class="sp-text" data-part="stop-hue-${stop}" style="position: absolute; left: ${(stop / 360) * 100}%; translate: -50% 0; font-size: 11px">${stop}</span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 268px; height: 320px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Theme</span></div>
        <div class="sp-body sp-context" style="display: flex; flex-direction: column; gap: 10px">
          <div
            class="sp-surface sp-stack"
            data-part="picker"
            data-subject
            role="group"
            aria-label="Accent colour"
            style="gap: 10px; padding: 12px; width: 224px; align-self: center"
          >
            <div
              data-part="field"
              style="position: relative; width: ${FIELD_W}px; height: ${FIELD_H}px; border-radius: 6px; touch-action: none; cursor: crosshair; background-image: linear-gradient(to top, #000000, rgb(0 0 0 / 0)), linear-gradient(to right, #ffffff, var(--sp-field-hue, #ff0000))"
            >
              <button
                class="sp-slider-thumb"
                type="button"
                data-part="field-thumb"
                aria-label="Saturation and brightness"
                style="border: 2px solid #ffffff; box-shadow: 0 0 0 1px rgb(16 24 40 / 0.4); cursor: grab"
              ></button>
            </div>
            <div class="sp-slider" data-part="hue" style="touch-action: none">
              <div class="sp-slider-track" data-part="hue-track" style="height: 10px; border-radius: 999px; background: ${SPECTRUM}">
                <button
                  class="sp-slider-thumb"
                  type="button"
                  data-part="hue-thumb"
                  role="slider"
                  aria-label="Hue"
                  aria-valuemin="0"
                  aria-valuemax="360"
                  aria-valuenow="0"
                  style="width: 16px; height: 16px; border: 2px solid #ffffff; box-shadow: 0 0 0 1px rgb(16 24 40 / 0.4)"
                ></button>
              </div>
            </div>
            <div aria-hidden="true" style="position: relative; height: 14px">${stops}</div>
            <div class="sp-row">
              <span class="sp-swatch" data-part="swatch" style="width: 28px; height: 28px; border: 1px solid var(--sp-line)"></span>
              <span
                class="sp-text sp-text--ink sp-grow"
                data-part="hex"
                style="text-align: right; font-variant-numeric: tabular-nums; letter-spacing: 0.02em"
              ></span>
            </div>
          </div>
          <div class="sp-row sp-row--between">
            <span class="sp-label">Applied to</span>
            <span class="sp-row" style="gap: 6px">
              <span class="sp-text">Links and charts</span>
              <span class="sp-swatch" data-part="applied" style="width: 18px; height: 18px; border: 1px solid var(--sp-line)"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;

  const picker = part(root, 'picker');
  const field = part(root, 'field');
  const fieldThumb = part(root, 'field-thumb');
  const hueTrack = part(root, 'hue-track');
  const hueThumb = part(root, 'hue-thumb');
  const swatch = part(root, 'swatch');
  const readout = part(root, 'hex');
  const applied = part(root, 'applied');

  let hue = 210;
  let sat = 78;
  let val = 90;
  let active: 'field' | 'hue' | undefined;

  const draw = () => {
    const value = hex(hue, sat, val);
    field.style.setProperty('--sp-field-hue', hex(hue, 100, 100));
    fieldThumb.style.setProperty('--sp-at', `${sat}%`);
    fieldThumb.style.top = `${100 - val}%`;
    fieldThumb.style.background = value;
    hueThumb.style.setProperty('--sp-at', `${(hue / 360) * 100}%`);
    hueThumb.style.background = hex(hue, 100, 100);
    hueThumb.setAttribute('aria-valuenow', String(hue));
    hueThumb.setAttribute('aria-valuetext', `${hue} degrees`);
    swatch.style.setProperty('--sp-swatch', value);
    applied.style.setProperty('--sp-swatch', value);
    readout.textContent = value.toUpperCase();
    picker.dataset.value = value;
    picker.dataset.hue = String(hue);
    picker.dataset.sat = String(sat);
    picker.dataset.val = String(val);
  };

  const setField = (clientX: number, clientY: number) => {
    const rect = field.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    sat = Math.round(clamp(((clientX - rect.left) / rect.width) * 100));
    val = Math.round(clamp(100 - ((clientY - rect.top) / rect.height) * 100));
    draw();
  };

  const setHue = (clientX: number) => {
    const rect = hueTrack.getBoundingClientRect();
    if (rect.width === 0) return;
    hue = Math.round(clamp(((clientX - rect.left) / rect.width) * 360, 0, 360));
    draw();
  };

  const hueStrip = part(root, 'hue');

  // Both handlers capture, which is what keeps a drag alive past the field's or the strip's
  // edge. A synthetic pointer has none to capture and the call would throw, so only a real
  // one asks.
  field.addEventListener('pointerdown', (event) => {
    active = 'field';
    if (event.isTrusted) field.setPointerCapture(event.pointerId);
    // A press on the bare field moves the thumb to the pressed point; a press on the
    // thumb picks it up where it stands, which is what makes the drag a drag.
    if (event.target !== fieldThumb) setField(event.clientX, event.clientY);
  });

  hueStrip.addEventListener('pointerdown', (event) => {
    active = 'hue';
    if (event.isTrusted) hueStrip.setPointerCapture(event.pointerId);
    if (event.target !== hueThumb) setHue(event.clientX);
  });

  root.addEventListener('pointermove', (event) => {
    if (active === 'field') setField(event.clientX, event.clientY);
    else if (active === 'hue') setHue(event.clientX);
  });

  const drop = () => {
    active = undefined;
  };
  root.addEventListener('pointerup', drop);
  root.addEventListener('pointercancel', drop);

  // A colour that can only be reached by dragging is a colour some readers cannot
  // reach at all: both axes of the field, and the strip, take the keyboard.
  fieldThumb.addEventListener('keydown', (event) => {
    const deltas: Record<string, [number, number]> = {
      ArrowRight: [4, 0],
      ArrowLeft: [-4, 0],
      ArrowUp: [0, 4],
      ArrowDown: [0, -4],
    };
    const delta = deltas[event.key];
    if (!delta) return;
    event.preventDefault();
    sat = clamp(sat + delta[0]);
    val = clamp(val + delta[1]);
    draw();
  });

  hueThumb.addEventListener('keydown', (event) => {
    const step =
      event.key === 'ArrowRight' || event.key === 'ArrowUp' ? 6 : event.key === 'ArrowLeft' || event.key === 'ArrowDown' ? -6 : 0;
    if (step === 0) return;
    event.preventDefault();
    hue = Math.round(clamp(hue + step, 0, 360));
    draw();
  });

  draw();
}
