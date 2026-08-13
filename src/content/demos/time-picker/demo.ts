import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
/** Five-minute steps: the step comes from the domain, not from the clock. */
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5);

const pad = (n: number): string => String(n).padStart(2, '0');

const cell = (name: string, label: string, selected: boolean): string =>
  `<li class="sp-option" role="option" data-part="${name}" aria-selected="${selected}" style="text-align: center">${label}</li>`;

/**
 * Time picker specimen: the list form, with hours and minutes as two columns of
 * option cells, a meridiem control, and the composed value read back above them. The
 * subject is the picker panel, since the term names the whole apparatus rather than
 * either column; the window around it is scenery.
 *
 * Every cell is an absolute destination, so no step reaches a time by nudging past
 * whatever it found (SPEC §8). Arrow keys nudge the column the last pick was in,
 * which is the one behaviour a native time input has that a grid of cells does not,
 * and only a keyboard nudge re-centres a column: re-centring on a click would move
 * the cell out from under the reader's pointer.
 */
export function mount(root: HTMLElement): void {
  let hour = 9;
  let minute = 30;
  let meridiem = 'AM';

  const hourCells = HOURS.map((h) => cell(`hour-${h}`, pad(h), h === 9)).join('');
  const minuteCells = MINUTES.map((m) => cell(`min-${pad(m)}`, pad(m), m === 30)).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 320px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Book a slot</span>
          <span class="sp-label">Tue 14</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" data-part="picker" data-subject style="width: 268px; padding: 12px">
            <div class="sp-row sp-row--between" style="margin-bottom: 10px">
              <span class="sp-label">Start</span>
              <span
                data-part="readout"
                data-time="09:30 AM"
                role="status"
                style="font-size: 19px; font-weight: 600; font-variant-numeric: tabular-nums"
              >09:30 AM</span>
            </div>
            <div class="sp-row" style="align-items: stretch; gap: 8px">
              <ul
                class="sp-listbox sp-listbox--static sp-grow"
                data-part="hours"
                role="listbox"
                aria-label="Hour"
                style="height: 136px; max-height: 136px; overflow: auto; box-shadow: none"
              >${hourCells}</ul>
              <ul
                class="sp-listbox sp-listbox--static sp-grow"
                data-part="minutes"
                role="listbox"
                aria-label="Minute"
                style="height: 136px; max-height: 136px; overflow: auto; box-shadow: none"
              >${minuteCells}</ul>
            </div>
            <sp-segmented
              class="sp-segmented"
              data-part="meridiem"
              data-value="am"
              style="display: flex; width: 100%; margin-top: 10px"
            >
              <button class="sp-segment sp-grow" type="button" data-part="seg-am" value="am">AM</button>
              <button class="sp-segment sp-grow" type="button" data-part="seg-pm" value="pm">PM</button>
            </sp-segmented>
          </div>
        </div>
      </div>
    </div>
  `;

  const readout = part(root, 'readout');
  const hours = part(root, 'hours');
  const minutes = part(root, 'minutes');

  const centre = (list: HTMLElement, el: HTMLElement) => {
    list.scrollTop = el.offsetTop - list.clientHeight / 2 + el.offsetHeight / 2;
  };

  const draw = (scrollTo?: 'hours' | 'minutes') => {
    for (const h of HOURS) part(root, `hour-${h}`).setAttribute('aria-selected', String(h === hour));
    for (const m of MINUTES) part(root, `min-${pad(m)}`).setAttribute('aria-selected', String(m === minute));
    const value = `${pad(hour)}:${pad(minute)} ${meridiem}`;
    readout.textContent = value;
    readout.dataset.time = value;
    if (scrollTo === 'hours') centre(hours, part(root, `hour-${hour}`));
    if (scrollTo === 'minutes') centre(minutes, part(root, `min-${pad(minute)}`));
  };

  for (const h of HOURS) {
    part(root, `hour-${h}`).addEventListener('click', () => {
      hour = h;
      draw();
    });
  }

  for (const m of MINUTES) {
    part(root, `min-${pad(m)}`).addEventListener('click', () => {
      minute = m;
      draw();
    });
  }

  const nudge = (list: 'hours' | 'minutes', delta: number) => {
    if (list === 'hours') hour = ((hour - 1 + delta + 12) % 12) + 1;
    else minute = (minute + delta * 5 + 60) % 60;
    draw(list);
  };

  const arrows = (list: 'hours' | 'minutes') => (event: Event) => {
    const key = (event as KeyboardEvent).key;
    if (key !== 'ArrowDown' && key !== 'ArrowUp') return;
    event.preventDefault();
    nudge(list, key === 'ArrowDown' ? 1 : -1);
  };

  hours.addEventListener('keydown', arrows('hours'));
  minutes.addEventListener('keydown', arrows('minutes'));

  part(root, 'meridiem').addEventListener('change', (event) => {
    meridiem = (event as CustomEvent<string>).detail === 'pm' ? 'PM' : 'AM';
    draw();
  });

  centre(hours, part(root, `hour-${hour}`));
  centre(minutes, part(root, `min-${pad(minute)}`));
}
