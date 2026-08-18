import { part } from '#src/kit/parts.ts';

const ROW = 24;
const VIEW = 120;
/** Half the viewport less half a row: the padding that lets the first value reach the band. */
const PAD = (VIEW - ROW) / 2;

const pad2 = (n: number) => String(n).padStart(2, '0');

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5);
const MERIDIEM = ['AM', 'PM'];

/** How far a value is from the band, drawn as the fall-off of a cylinder turning away. */
const FADE = [1, 0.66, 0.4, 0.22];

interface Wheel {
  view: HTMLElement;
  track: HTMLElement;
  rows: HTMLElement[];
  labels: string[];
  index: number;
}

const column = (name: string, label: string, subject: boolean, parts: string[], labels: string[], index: number) => `
  <div
    class="sp-grow${subject ? '' : ' sp-context'}"
    data-part="${name}-wheel"
    ${subject ? 'data-subject' : ''}
    role="listbox"
    aria-label="${label}"
    tabindex="0"
    style="position: relative; height: 100%; overflow: hidden; touch-action: none; cursor: grab"
  >
    <div data-part="${name}-track" style="position: absolute; left: 0; right: 0; top: 0; padding: ${PAD}px 0">
      ${parts
        .map(
          (partName, i) => `<div
            class="sp-option"
            data-part="${partName}"
            role="option"
            aria-selected="${i === index}"
            style="display: flex; align-items: center; justify-content: center; height: ${ROW}px; padding: 0; border-radius: 0;
                   background: transparent; font-size: 15px; font-variant-numeric: tabular-nums; cursor: inherit"
          >${labels[i] ?? ''}</div>`,
        )
        .join('')}
    </div>
  </div>`;

/**
 * Wheel picker specimen: three drums composing one time, with a fixed band across the
 * middle and the values scrolling under it. Dragging a column spins it, the value that
 * comes to rest inside the band is the one picked, and the composed time is read back
 * above the drums.
 *
 * The subject is the hour column, one wheel, which is the narrowest thing the term names:
 * the panel around it is a picker and the band belongs to all three columns, while the
 * word names the drum itself. It is honestly a wheel at every resting position, so no
 * `data-pose` condition is needed. The other two columns, the band, the readout and the
 * window are scenery.
 *
 * Selection follows the pointer's own travel, one row per `ROW` pixels, and lands on a
 * whole row at release. There is no fling: a scripted drag lets go at rest, so momentum
 * would be a behaviour no choreography could ever reproduce (SPEC §8). The band alone
 * marks the pick, which is why the rows carry a transparent background over the kit's
 * selected-option tint. The settle is a CSS transition rather than a scripted animation,
 * so reduced motion turns it off without the demo asking, and nothing but the tracks ever
 * moves, so a spin shifts only the values (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const hourParts = HOURS.map((h) => `hour-${h}`);
  const minuteParts = MINUTES.map((m) => `min-${pad2(m)}`);
  const meridiemParts = MERIDIEM.map((m) => `mer-${m.toLowerCase()}`);
  const hourLabels = HOURS.map(pad2);
  const minuteLabels = MINUTES.map(pad2);

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 452px; height: 284px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">New alarm</span>
          <span class="sp-label" style="font-size: 12px">Weekdays</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: 312px; padding: 10px 12px 12px">
            <div class="sp-row sp-row--between sp-context" style="margin-bottom: 8px">
              <span class="sp-label">Wake at</span>
              <span
                data-part="readout"
                data-time="09:30 AM"
                role="status"
                style="font-size: 17px; font-weight: 600; font-variant-numeric: tabular-nums"
              >09:30 AM</span>
            </div>

            <div style="position: relative; height: ${VIEW}px">
              <div
                class="sp-context"
                data-part="band"
                aria-hidden="true"
                style="position: absolute; left: 0; right: 0; top: ${PAD}px; height: ${ROW}px; border-radius: 6px;
                       background: var(--sp-accent-soft); border-top: 2px solid var(--sp-line); border-bottom: 2px solid var(--sp-line)"
              ></div>
              <div class="sp-row" style="position: relative; align-items: stretch; gap: 4px; height: 100%">
                ${column('hour', 'Hour', true, hourParts, hourLabels, 8)}
                ${column('minute', 'Minute', false, minuteParts, minuteLabels, 6)}
                ${column('meridiem', 'AM or PM', false, meridiemParts, MERIDIEM, 0)}
              </div>
            </div>

            <p class="sp-label sp-context" style="margin: 8px 0 0; font-size: 11px; text-align: center; white-space: nowrap">
              Drag a column: the values move, the band does not.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  const build = (name: string, parts: string[], labels: string[], index: number): Wheel => ({
    view: part(root, `${name}-wheel`),
    track: part(root, `${name}-track`),
    rows: parts.map((p) => part(root, p)),
    labels,
    index,
  });

  const hour = build('hour', hourParts, hourLabels, 8);
  const minute = build('minute', minuteParts, minuteLabels, 6);
  const meridiem = build('meridiem', meridiemParts, MERIDIEM, 0);
  const wheels = [hour, minute, meridiem];

  const readout = part(root, 'readout');
  const labelOf = (wheel: Wheel) => wheel.labels[wheel.index] ?? '';

  const paint = (wheel: Wheel) => {
    wheel.rows.forEach((row, i) => {
      const distance = Math.min(Math.abs(i - wheel.index), 3);
      row.style.opacity = String(FADE[distance] ?? 1);
      row.style.transform = `scale(${1 - distance * 0.06})`;
      row.style.fontWeight = distance === 0 ? '600' : '400';
      row.setAttribute('aria-selected', String(distance === 0));
    });
    wheel.view.dataset.value = labelOf(wheel);
  };

  const readBack = () => {
    const value = `${labelOf(hour)}:${labelOf(minute)} ${labelOf(meridiem)}`;
    readout.textContent = value;
    readout.dataset.time = value;
  };

  const place = (wheel: Wheel, offset = 0) => {
    wheel.track.style.transform = `translateY(${-wheel.index * ROW + offset}px)`;
  };

  const settle = (wheel: Wheel) => {
    wheel.track.style.transition = 'transform 0.16s var(--sp-ease)';
    place(wheel);
  };

  const clamp = (wheel: Wheel, i: number) => Math.min(wheel.rows.length - 1, Math.max(0, i));

  let held: { wheel: Wheel; startY: number; startIndex: number } | undefined;

  for (const wheel of wheels) {
    wheel.view.addEventListener('pointerdown', (event) => {
      // No transition while the drum is following the pointer: a drum that eases is a
      // drum the finger has left behind.
      wheel.track.style.transition = 'none';
      held = { wheel, startY: (event as PointerEvent).clientY, startIndex: wheel.index };
    });

    wheel.view.addEventListener('keydown', (event) => {
      const key = (event as KeyboardEvent).key;
      if (key !== 'ArrowDown' && key !== 'ArrowUp') return;
      event.preventDefault();
      const next = clamp(wheel, wheel.index + (key === 'ArrowDown' ? 1 : -1));
      if (next === wheel.index) return;
      wheel.index = next;
      settle(wheel);
      paint(wheel);
      readBack();
    });
  }

  root.addEventListener('pointermove', (event) => {
    if (!held) return;
    const offset = (event as PointerEvent).clientY - held.startY;
    // The content follows the finger, so dragging up brings later values into the band.
    const next = clamp(held.wheel, held.startIndex - Math.round(offset / ROW));
    held.wheel.track.style.transform = `translateY(${-held.startIndex * ROW + offset}px)`;
    if (next === held.wheel.index) return;
    held.wheel.index = next;
    paint(held.wheel);
    readBack();
  });

  const release = () => {
    if (!held) return;
    settle(held.wheel);
    held = undefined;
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  for (const wheel of wheels) {
    wheel.track.style.transition = 'none';
    place(wheel);
    paint(wheel);
  }
  readBack();
}
