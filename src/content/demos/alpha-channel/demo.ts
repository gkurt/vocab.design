import { part } from '#src/kit/parts.ts';

/** The chip's own colour. Only its fourth number moves. */
const CHIP = { r: 226, g: 74, b: 46, hex: 'E24A2E' };

/** The value the chip is composited over where the two overlap. */
const UNDER = '#1F3AA8';

/** Detents the slider snaps to, so a drag that ends on a tick lands on a stated value. */
const STOPS = [12, 32, 64, 100];
const START = 64;

const byteOf = (pct: number) => Math.round((pct / 100) * 255);
const hexOf = (pct: number) => `#${CHIP.hex}${byteOf(pct).toString(16).toUpperCase().padStart(2, '0')}`;
const rgbaOf = (pct: number) => `rgb(${CHIP.r} ${CHIP.g} ${CHIP.b} / ${(pct / 100).toFixed(2)})`;

/** Multiples of four, so every tick is reachable and a drag cannot land between two. */
const snap = (pct: number) => Math.min(100, Math.max(0, Math.round(pct / 4) * 4));

/**
 * Alpha channel specimen: one chip whose fourth number is the only thing that changes,
 * drawn half over a transparency checker and half over a solid fill so the same value
 * composites two different ways at once.
 *
 * The subject is the chip. The term names the transparency carried in that one colour, so
 * the checker, the fill underneath, the slider and the two readouts are all scenery: they
 * are how the specimen shows what the fourth number did. The field and the readouts are
 * fixed size, so stepping the alpha repaints and moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const ticks = STOPS.map(
    (pct) => `
      <span class="sp-label" data-part="tick-${pct}" style="position: absolute; left: ${pct}%; translate: -50% 0; font-size: 11px">${pct}%</span>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 380px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Fill</span>
          <span class="sp-text sp-text--ink" data-part="rgba" style="font-size: 12px">${rgbaOf(START)}</span>
        </div>

        <div style="position: relative; height: 124px; margin-top: 12px; border-radius: var(--sp-radius); overflow: hidden;
                    background-color: #FFFFFF;
                    background-image: conic-gradient(#D9DEE7 0deg 90deg, transparent 90deg 180deg, #D9DEE7 180deg 270deg, transparent 270deg 360deg);
                    background-size: 18px 18px">
          <span style="position: absolute; left: 22px; top: 26px; width: 124px; height: 68px; border-radius: 8px; background: ${UNDER}"></span>
          <span data-part="chip" data-subject data-alpha="${START}"
                style="position: absolute; left: 104px; top: 40px; width: 138px; height: 68px; border-radius: 8px;
                       background: ${rgbaOf(START)}"></span>
        </div>

        <div class="sp-context" style="margin-top: 14px">
          <div class="sp-slider" data-part="slider" style="touch-action: none">
            <span class="sp-slider-track" data-part="track" style="--sp-from: 0%; --sp-to: ${START}%">
              <span class="sp-slider-fill"></span>
              <button class="sp-slider-thumb" data-part="thumb" type="button" aria-label="Alpha"
                      style="--sp-at: ${START}%; touch-action: none"></button>
            </span>
          </div>
          <div style="position: relative; height: 16px; margin-top: 2px">${ticks}</div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px">
          <span class="sp-text">Eight digit hex says the same thing</span>
          <span class="sp-text sp-text--ink" data-part="hex" style="font-size: 12px">${hexOf(START)}</span>
        </div>
      </div>
    </div>
  `;

  const chip = part(root, 'chip');
  const track = part(root, 'track');
  const thumb = part(root, 'thumb');
  const rgbaText = part(root, 'rgba');
  const hexText = part(root, 'hex');

  const apply = (pct: number) => {
    chip.dataset.alpha = String(pct);
    chip.style.background = rgbaOf(pct);
    track.style.setProperty('--sp-to', `${pct}%`);
    thumb.style.setProperty('--sp-at', `${pct}%`);
    rgbaText.textContent = rgbaOf(pct);
    hexText.textContent = hexOf(pct);
  };
  apply(START);

  let dragging = false;

  const fromPointer = (event: PointerEvent) => {
    const rect = track.getBoundingClientRect();
    if (rect.width === 0) return;
    apply(snap(((event.clientX - rect.left) / rect.width) * 100));
  };

  const press = (event: PointerEvent) => {
    dragging = true;
    // Capture keeps the drag alive past the track's edge. A synthetic pointer has none to
    // capture and the call would throw, so only a real one asks.
    if (event.isTrusted) track.setPointerCapture(event.pointerId);
    fromPointer(event);
  };

  // The thumb and the track are both grabbable, and the thumb sits inside the track, so one
  // capture on the track carries a press that started on either.
  thumb.addEventListener('pointerdown', press);
  track.addEventListener('pointerdown', press);

  root.addEventListener('pointermove', (event) => {
    if (dragging) fromPointer(event);
  });

  const release = () => {
    dragging = false;
  };
  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);
}
