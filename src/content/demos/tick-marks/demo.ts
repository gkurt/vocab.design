import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Every value the printed scale can show. Majors are the coarse stops a detent lands on. */
const STEP = 5;
const DETENT = 20;
const VALUES = Array.from({ length: 100 / STEP + 1 }, (_, i) => i * STEP);

const NOTE: Record<string, string> = {
  none: 'No marks: nothing says which values exist, or that any of them are special.',
  scale: 'Marks as a printed scale. The handle still rests anywhere, so marking is not snapping.',
  detents: 'The same coarse marks as stops: the handle lands on one, and the ones behind it light up.',
};

const clamp = (n: number, low: number, high: number) => Math.max(low, Math.min(high, n));

const tick = (value: number) => `
  <span
    data-part="stop-${value}"
    data-value="${value}"
    ${value % DETENT === 0 ? 'data-major' : ''}
    style="position: absolute; left: ${value}%; top: 0; width: 3px; border-radius: 2px; translate: -50% 0"
  ></span>`;

/**
 * Tick marks specimen: one volume slider whose track is shown unmarked, marked as a printed
 * scale, and marked with detents. The scale register prints every five units and lets the handle
 * rest between them; the detent register keeps only the coarse stops, snaps the handle onto the
 * nearest one, and lights the marks it has passed.
 *
 * The subject is the tick track, `data-part="ticks"`, not the slider it is printed on: the term
 * names the notches, and the track, fill, handle and read-out are the control they are drawn
 * against. The unmarked register is the counter-example the term needs in order to be legible,
 * so the subject carries `data-pose="[data-marked]"`: identify refuses to ring a strip with no
 * marks on it, and the mount state (the printed scale) satisfies the condition (SPEC §6).
 *
 * Every mark stays in the DOM in every register and only its paint changes, so switching
 * register moves nothing (SPEC §5) and a scripted drag can aim at a value the current register
 * does not print, which is the only way to show a handle being caught by a detent it was not
 * released on. The picker names an absolute register (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 210px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Output</span>
          <span class="sp-label" style="font-size: 12px">Studio monitors</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: 380px; padding: 16px 16px 14px">
            <div class="sp-row sp-row--between sp-context" style="margin-bottom: 10px">
              <span class="sp-label">Volume</span>
              <span
                data-part="readout"
                role="status"
                style="font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums"
              >60</span>
            </div>

            <div data-part="slider" data-mode="scale" data-value="60" style="position: relative; height: 34px">
              <div class="sp-slider sp-context" style="height: 20px">
                <div class="sp-slider-track" data-part="track" style="--sp-from: 0%; --sp-to: 60%">
                  <div class="sp-slider-fill"></div>
                  <button
                    class="sp-slider-thumb"
                    type="button"
                    data-part="thumb"
                    role="slider"
                    aria-label="Volume"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow="60"
                    style="--sp-at: 60%; cursor: grab"
                  ></button>
                </div>
              </div>

              <span
                data-part="ticks"
                data-subject
                data-marked
                data-pose="[data-marked]"
                aria-hidden="true"
                style="position: absolute; left: 0; right: 0; top: 20px; height: 12px; pointer-events: none"
              >${VALUES.map(tick).join('')}</span>
            </div>

            <div class="sp-row sp-row--between sp-context" style="margin-top: 4px">
              <span class="sp-label" style="font-size: 11px">0</span>
              <span class="sp-label" style="font-size: 11px">100</span>
            </div>
          </div>
        </div>
      </div>

      <div class="sp-stack sp-context" style="align-items: center; gap: 8px; width: 476px">
        <sp-segmented class="sp-segmented" data-axis="Ticks" data-part="picker" data-value="scale">
          <button class="sp-segment" type="button" data-part="seg-none" value="none" style="padding: 4px 10px; font-size: 12px">Unmarked</button>
          <button class="sp-segment" type="button" data-part="seg-scale" value="scale" style="padding: 4px 10px; font-size: 12px">Scale</button>
          <button class="sp-segment" type="button" data-part="seg-detents" value="detents" style="padding: 4px 10px; font-size: 12px">Detents</button>
        </sp-segmented>
        <span
          class="sp-label"
          data-part="note"
          data-mode="scale"
          role="status"
          style="height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden"
        >${NOTE.scale}</span>
      </div>
    </div>
  `;

  const slider = part(root, 'slider');
  const track = part(root, 'track');
  const thumb = part(root, 'thumb');
  const ticks = part(root, 'ticks');
  const readout = part(root, 'readout');
  const note = part(root, 'note');
  const marks = VALUES.map((v) => part(root, `stop-${v}`));

  let mode = 'scale';
  let value = 60;

  const paintTicks = () => {
    const detents = mode === 'detents';
    for (const [i, mark] of marks.entries()) {
      const at = VALUES[i] ?? 0;
      const major = at % DETENT === 0;
      // Unmarked keeps every notch in place and simply stops painting it, so nothing moves
      // and a drag can still aim at a value this register does not print.
      const shown = mode === 'scale' || (detents && major);
      mark.style.height = major ? '12px' : '7px';
      mark.style.background = detents && at <= value ? 'var(--sp-accent)' : 'var(--sp-muted)';
      mark.style.opacity = shown ? (major ? '1' : '0.65') : '0';
    }
    if (detents) ticks.dataset.reached = String(value);
    else delete ticks.dataset.reached;
  };

  const setValue = (next: number, snap: boolean) => {
    const raw = clamp(next, 0, 100);
    value = snap ? Math.round(raw / DETENT) * DETENT : Math.round(raw);
    track.style.setProperty('--sp-to', `${value}%`);
    thumb.style.setProperty('--sp-at', `${value}%`);
    thumb.setAttribute('aria-valuenow', String(value));
    slider.dataset.value = String(value);
    readout.textContent = String(value);
    paintTicks();
  };

  const setMode = (next: string) => {
    mode = next;
    slider.dataset.mode = next;
    if (next === 'none') ticks.removeAttribute('data-marked');
    else ticks.setAttribute('data-marked', '');
    note.dataset.mode = next;
    note.textContent = NOTE[next] ?? '';
    // Turning detents on catches the handle at the nearest stop, which is the whole point.
    setValue(value, next === 'detents');
  };

  const valueAt = (clientX: number) => {
    const box = track.getBoundingClientRect();
    return ((clientX - box.left) / box.width) * 100;
  };

  let held = false;

  thumb.addEventListener('pointerdown', () => {
    held = true;
  });

  track.addEventListener('pointerdown', (event) => {
    // Mandatory guard: the player's synthetic pointers cannot be captured and the call throws (SPEC §7).
    if (event.isTrusted) track.setPointerCapture((event as PointerEvent).pointerId);
    held = true;
    setValue(valueAt((event as PointerEvent).clientX), mode === 'detents');
  });

  root.addEventListener('pointermove', (event) => {
    if (!held) return;
    setValue(valueAt((event as PointerEvent).clientX), mode === 'detents');
  });

  const release = (event: Event) => {
    if (!held) return;
    held = false;
    setValue(valueAt((event as PointerEvent).clientX), mode === 'detents');
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  thumb.addEventListener('keydown', (event) => {
    const key = (event as KeyboardEvent).key;
    if (key !== 'ArrowLeft' && key !== 'ArrowRight') return;
    event.preventDefault();
    const step = mode === 'detents' ? DETENT : STEP;
    setValue(value + (key === 'ArrowRight' ? step : -step), false);
  });

  part(root, 'picker').addEventListener('change', (event) => setMode((event as CustomEvent<string>).detail));

  setMode('scale');
}
