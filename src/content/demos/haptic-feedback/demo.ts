import { icon } from '#src/kit/icons.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long the tick stays legible, and the detent spacing the slider is notched at. */
const TICK_MS = 1100;
const STEP = 25;
const START = 25;

const KINDS = {
  selection: { name: 'Selection', call: 'selectionChanged()' },
  impact: { name: 'Impact', call: 'impactOccurred(.light)' },
  success: { name: 'Notification', call: 'notificationOccurred(.success)' },
} as const;

type Kind = keyof typeof KINDS;

/**
 * Haptic feedback specimen: a phone whose controls fire ticks, with the tick itself drawn
 * as the thing it is (an event with a kind, a moment, and a name in the platform's
 * vocabulary). The subject is the tick readout, because the term names feedback that has
 * no picture: the phone and its slider are the scene that produces one, and neither of them
 * is the word.
 *
 * The subject is off stage between ticks, which is the honest resting state for an event
 * (identify summons it by playing the script until one fires, and the stage's frozen clock
 * is what holds it there while the reader looks). The shiver that stands in for the
 * vibration is an `element.animate` move, so it asks `prefersReducedMotion` itself and is
 * dropped for a reader who has asked for less movement; the tick still appears, since it
 * is the receipt rather than the decoration.
 *
 * The readout slot is reserved from mount and the shiver is a transform, so a tick moves
 * nothing (SPEC §5).
 *
 * A three-row legend used to gloss each kind ("a value stepped past a detent", "something
 * landed or hit a limit", "how a task turned out"), and the panel was titled "Feel, drawn so
 * it can be seen". Both were the site teaching inside the frame. The legend is gone and the
 * panel is named for the instrument it is, since the readout already names the kind that
 * fired in the platform's own words.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const detents = [0, 1, 2, 3, 4]
    .map(
      (i) => `
        <span
          data-part="detent-${i}"
          style="position: absolute; left: ${i * STEP}%; top: 0; width: 6px; height: 6px; translate: -50% 0; border-radius: 50%; background: var(--sp-line)"
        ></span>`,
    )
    .join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 288px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Haptics</span>
          <span class="sp-text" data-part="count" style="width: 96px; text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap">0 ticks</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; gap: 14px">
          <div
            class="sp-surface sp-context"
            data-part="phone"
            style="flex: 0 0 auto; width: 172px; height: 208px; padding: 12px; border-radius: 20px; background: var(--sp-surface); display: flex; flex-direction: column; gap: 12px"
          >
            <div class="sp-row" style="gap: 8px">
              ${icon('bell')}
              <span class="sp-heading sp-grow" style="font-size: 13px">Alarm</span>
              <span class="sp-label">07:10</span>
            </div>
            <div class="sp-stack" style="gap: 4px">
              <div class="sp-row sp-row--between">
                <span class="sp-label">Volume</span>
                <span class="sp-label" data-part="volume" style="font-variant-numeric: tabular-nums">${START}</span>
              </div>
              <div class="sp-slider" data-part="slider" style="touch-action: none">
                <div class="sp-slider-track" data-part="track" style="--sp-from: 0%; --sp-to: ${START}%">
                  <div class="sp-slider-fill"></div>
                  <button
                    class="sp-slider-thumb"
                    data-part="thumb"
                    type="button"
                    role="slider"
                    aria-label="Volume"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow="${START}"
                    style="--sp-at: ${START}%; touch-action: none; cursor: grab"
                  ></button>
                </div>
              </div>
              <div style="position: relative; height: 8px">${detents}</div>
            </div>
            <div class="sp-row" style="gap: 6px; margin-top: auto">
              <button class="sp-button sp-button--ghost sp-button--sm sp-grow" data-part="add" type="button">Add alarm</button>
              <button class="sp-button sp-button--sm" data-part="save" type="button">Save</button>
            </div>
          </div>
          <div class="sp-stack" style="width: 228px; gap: 8px">
            <span class="sp-label">Haptic tick</span>
            <div style="position: relative; height: 52px">
              <div
                class="sp-surface sp-context"
                data-part="silent"
                style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--sp-muted)"
              >Nothing to feel right now</div>
              <div
                class="sp-surface"
                data-part="tick"
                data-subject
                data-kind="none"
                style="position: absolute; inset: 0; display: flex; align-items: center; gap: 10px; padding: 0 12px; border-color: var(--sp-accent); opacity: 0; visibility: hidden; transition: opacity 0.14s, visibility 0.14s"
              >
                <span
                  data-part="tick-dot"
                  style="flex: 0 0 auto; width: 12px; height: 12px; border-radius: 50%; background: var(--sp-accent)"
                ></span>
                <span class="sp-stack" style="gap: 2px">
                  <span class="sp-heading" data-part="tick-name" style="font-size: 13px">Selection</span>
                  <span class="sp-label" data-part="tick-call" style="font-size: 11px">selectionChanged()</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const phone = part(root, 'phone');
  const tick = part(root, 'tick');
  const dot = part(root, 'tick-dot');
  const name = part(root, 'tick-name');
  const call = part(root, 'tick-call');
  const silent = part(root, 'silent');
  const count = part(root, 'count');
  const track = part(root, 'track');
  const thumb = part(root, 'thumb');
  const volume = part(root, 'volume');

  let timer: number | undefined;
  let fired = 0;
  let step = START / STEP;
  let dragging = false;

  const fire = (kind: Kind) => {
    clock.clearTimeout(timer);
    fired += 1;
    tick.dataset.kind = kind;
    name.textContent = KINDS[kind].name;
    call.textContent = KINDS[kind].call;
    tick.style.opacity = '1';
    tick.style.visibility = 'visible';
    silent.style.opacity = '0';
    count.textContent = `${fired} tick${fired === 1 ? '' : 's'}`;
    // The stand-in for the vibration. CSS cannot reach a keyframe set built in script, so
    // the gate is asked here and the move is simply not played when it is not wanted.
    if (!prefersReducedMotion(root)) {
      phone.animate([{ translate: '0 0' }, { translate: '-2px 0' }, { translate: '2px 0' }, { translate: '0 0' }], {
        duration: 170,
        easing: 'ease-out',
      });
      dot.animate([{ scale: '1' }, { scale: '1.6' }, { scale: '1' }], { duration: 260, easing: 'ease-out' });
    }
    timer = clock.setTimeout(() => {
      tick.dataset.kind = 'none';
      tick.style.opacity = '0';
      tick.style.visibility = 'hidden';
      silent.style.opacity = '1';
    }, TICK_MS);
  };

  const setStep = (next: number) => {
    if (next === step) return;
    step = next;
    const value = step * STEP;
    track.style.setProperty('--sp-to', `${value}%`);
    thumb.style.setProperty('--sp-at', `${value}%`);
    thumb.setAttribute('aria-valuenow', String(value));
    volume.textContent = String(value);
    // One tick per detent crossed: the notch is the event, not the pixel.
    fire('selection');
  };

  thumb.addEventListener('pointerdown', (event) => {
    // Captured, or a reader dragging past the edge loses the stroke; a synthetic pointer has none to capture.
    if (event.isTrusted) thumb.setPointerCapture(event.pointerId);
    dragging = true;
  });

  thumb.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const rect = track.getBoundingClientRect();
    if (rect.width === 0) return;
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    setStep(Math.round((ratio * 100) / STEP));
  });

  const release = () => {
    dragging = false;
  };

  thumb.addEventListener('pointerup', release);
  thumb.addEventListener('pointercancel', release);

  part(root, 'add').addEventListener('click', () => fire('impact'));
  part(root, 'save').addEventListener('click', () => fire('success'));
}
