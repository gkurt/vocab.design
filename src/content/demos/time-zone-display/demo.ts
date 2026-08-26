import { part } from '#src/kit/parts.ts';

/** One instant, two clocks. Mid-January, so neither zone is on summer time. */
const CLOCKS = {
  reader: { id: 'london', role: 'Your time', time: '3:30 PM', place: 'London', zone: 'UTC+00:00' },
  event: { id: 'chicago', role: 'Event time', time: '9:30 AM', place: 'Chicago', zone: 'UTC-06:00' },
} as const;

type Side = keyof typeof CLOCKS;

/** The same zone written three ways, and what each spelling is worth. */
const SPELLINGS = [
  { id: 'abbr', text: 'CST', verdict: 'three zones use it', warn: true },
  { id: 'offset', text: 'UTC-06:00', verdict: 'no DST', warn: true },
  { id: 'name', text: 'America/Chicago', verdict: 'exact', warn: false },
];

const spellings = SPELLINGS.map(
  (one) => `
    <span class="sp-chip" data-part="trap-${one.id}" style="flex: 0 0 auto; gap: 5px; font-size: 11px">
      <span style="font-variant-numeric: tabular-nums">${one.text}</span>
      <span style="font-size: 10px; color: ${one.warn ? 'var(--sp-warn)' : 'var(--sp-muted)'}">${one.verdict}</span>
    </span>`,
).join('');

/**
 * Time zone display specimen: one instant, printed on two clocks, each with the zone
 * written next to it, and a pick that says which clock the reader wants first.
 *
 * The subject is the PRIMARY readout: the time paired with the zone it is on, which is the
 * narrowest element the term names. The secondary readout is a peer instance of the same
 * pattern rather than scenery, so it keeps its own paint (dimming it would make the
 * comparison lie); what is scenery is the window around them and the invite heading.
 * The subject stays on the primary slot rather than following a city, so whichever zone is
 * promoted, identify rings the place where "whose clock is this" gets answered.
 *
 * The bottom row is the trap the pattern exists to avoid: the same zone spelled as an
 * abbreviation, as an offset, and as an IANA name, with only the last of the three able to
 * survive both a second continent and a change of season.
 *
 * The pick is absolute, never a toggle (SPEC §8): each chip names a clock and sets it, so a
 * pass interrupted anywhere leaves a state that means what it shows. Both readouts hold a
 * fixed box, so promoting one changes what they say and not where anything sits (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 468px; height: 306px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Invitation</span>
          <span class="sp-label" style="flex: 0 0 auto; white-space: nowrap">Tue 20 Jan</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center">
          <div class="sp-surface" data-part="times" data-primary="reader" style="flex: 0 0 auto; width: 442px; padding: 12px">
            <div class="sp-heading" style="font-size: 14px">Design review</div>
            <div class="sp-row" style="margin-top: 8px; gap: 10px; align-items: stretch">
              <div
                data-part="primary"
                data-subject
                data-zone="${CLOCKS.reader.id}"
                style="flex: 1 1 0; min-width: 0; padding: 8px 10px; border-radius: 6px; background: var(--sp-accent-soft);
                       box-shadow: inset 0 0 0 1px var(--sp-accent)"
              >
                <span class="sp-label" data-part="primary-role" style="font-size: 10px">${CLOCKS.reader.role}</span>
                <div data-part="primary-time" style="font-size: 22px; font-weight: 600; line-height: 1.15; white-space: nowrap">${CLOCKS.reader.time}</div>
                <div data-part="primary-zone" style="font-size: 11px; color: var(--sp-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
                  ${CLOCKS.reader.place}, ${CLOCKS.reader.zone}
                </div>
              </div>
              <div
                data-part="secondary"
                data-zone="${CLOCKS.event.id}"
                style="flex: 1 1 0; min-width: 0; padding: 8px 10px; border-radius: 6px; background: var(--sp-sunken)"
              >
                <span class="sp-label" data-part="secondary-role" style="font-size: 10px">${CLOCKS.event.role}</span>
                <div data-part="secondary-time" style="font-size: 18px; font-weight: 600; line-height: 1.25; white-space: nowrap">${CLOCKS.event.time}</div>
                <div data-part="secondary-zone" style="font-size: 11px; color: var(--sp-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
                  ${CLOCKS.event.place}, ${CLOCKS.event.zone}
                </div>
              </div>
            </div>
            <div class="sp-divider" style="margin: 10px 0"></div>
            <div class="sp-row" style="gap: 6px">
              <span class="sp-label" style="flex: 0 0 auto; font-size: 10px">Show first</span>
              <button type="button" class="sp-chip" data-part="pick-reader" data-selected style="flex: 0 0 auto; font-size: 11px">My time zone</button>
              <button type="button" class="sp-chip" data-part="pick-event" style="flex: 0 0 auto; font-size: 11px">The event's</button>
            </div>
            <div class="sp-divider" style="margin: 10px 0"></div>
            <span class="sp-label" style="font-size: 10px">The event's zone written three ways</span>
            <div class="sp-row" style="margin-top: 5px; gap: 6px">${spellings}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  const card = part(root, 'times');
  const slots = {
    primary: {
      role: part(root, 'primary-role'),
      time: part(root, 'primary-time'),
      zone: part(root, 'primary-zone'),
      box: part(root, 'primary'),
    },
    secondary: {
      role: part(root, 'secondary-role'),
      time: part(root, 'secondary-time'),
      zone: part(root, 'secondary-zone'),
      box: part(root, 'secondary'),
    },
  };
  const picks = { reader: part(root, 'pick-reader'), event: part(root, 'pick-event') };

  const show = (side: Side) => {
    const first = CLOCKS[side];
    const second = CLOCKS[side === 'reader' ? 'event' : 'reader'];
    card.dataset.primary = side;
    slots.primary.box.dataset.zone = first.id;
    slots.primary.role.textContent = first.role;
    slots.primary.time.textContent = first.time;
    slots.primary.zone.textContent = `${first.place}, ${first.zone}`;
    slots.secondary.box.dataset.zone = second.id;
    slots.secondary.role.textContent = second.role;
    slots.secondary.time.textContent = second.time;
    slots.secondary.zone.textContent = `${second.place}, ${second.zone}`;
    for (const key of ['reader', 'event'] as Side[]) {
      if (key === side) picks[key].setAttribute('data-selected', '');
      else picks[key].removeAttribute('data-selected');
    }
  };

  // Each chip names one clock and sets it, so nothing here inverts a state it found.
  picks.reader.addEventListener('click', () => show('reader'));
  picks.event.addEventListener('click', () => show('event'));

  show('reader');
}
