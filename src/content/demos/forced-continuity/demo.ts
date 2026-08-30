import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'forced' | 'fair';

/** The three moments a trial has: it starts, it warns (or does not), it charges. */
const DAYS = [0, 23, 31] as const;
/** Day 34 is the end of the rail, so day 31 lands inside it rather than on its edge. */
const SPAN = 34;

const at = (day: number) => `${(day / SPAN) * 100}%`;

const VERDICT = {
  forced: 'Nothing is sent between the card and the charge. The reader finds out from their bank.',
  fair: 'A reminder a week out, a stated renewal date, and one click to stop it before it happens.',
} as const;

const REMINDER = {
  forced: { label: 'Day 23<br>No reminder sent', fill: 'transparent', border: '2px dashed var(--sp-muted)', ink: 'var(--sp-muted)' },
  fair: { label: 'Day 23<br>Reminder: 7 days left', fill: 'var(--sp-accent)', border: '0', ink: 'var(--sp-ink)' },
} as const;

function timelineMarkup(mode: Mode): string {
  const reminder = REMINDER[mode];
  return `
    <div style="position: relative; height: 70px">
      <span style="position: absolute; left: 0; top: 0; width: 96px; font-size: 10px; line-height: 1.3; color: var(--sp-ink)">
        Day 0<br>Card taken
      </span>
      <span style="position: absolute; right: 0; top: 0; width: 104px; text-align: right; font-size: 10px; line-height: 1.3; color: var(--sp-ink)">
        Day 31<br>Charged 79.00
      </span>
      <div style="position: absolute; left: 0; right: 0; top: 30px; height: 6px; border-radius: 999px; background: var(--sp-line)">
        <span style="position: absolute; left: 0; top: 0; bottom: 0; width: ${at(30)}; border-radius: 999px; background: var(--sp-accent-soft)"></span>
        <span data-part="start" style="position: absolute; left: 0; top: 50%; translate: 0 -50%; width: 11px; height: 11px; border-radius: 50%; background: var(--sp-accent)"></span>
        <span
          data-part="reminder"
          data-state="${mode === 'fair' ? 'sent' : 'none'}"
          style="position: absolute; left: ${at(23)}; top: 50%; translate: -50% -50%; width: 11px; height: 11px; border-radius: 50%; box-sizing: border-box; background: ${reminder.fill}; border: ${reminder.border}"
        ></span>
        <span
          data-part="charge"
          style="position: absolute; left: ${at(31)}; top: 50%; translate: -50% -50%; width: 13px; height: 13px; border-radius: 50%; background: var(--sp-warn)"
        ></span>
        <span
          data-part="today"
          style="position: absolute; left: 0; top: 7px; translate: -50% 0; width: 4px; height: 10px; border-radius: 2px; background: var(--sp-ink); transition: left 0.35s var(--sp-ease)"
        ></span>
      </div>
      <span
        data-part="reminder-label"
        style="position: absolute; left: ${at(23)}; top: 46px; width: 118px; transform: translateX(-50%); text-align: center; font-size: 10px; line-height: 1.3; color: ${reminder.ink}"
      >${reminder.label}</span>
    </div>`;
}

/**
 * Forced continuity specimen: the month between the card and the charge, drawn as the
 * timeline the reader never sees. Advancing lands on each moment in turn, and the point
 * of the as-shipped state is what is not on the rail: no message between day 0 and the
 * day the money moves.
 *
 * The subject is the billing timeline, not the signup card above it: the term names the
 * shape of the billing, and the offer is only how it starts (SPEC §5). The timeline
 * declares the forced state as its honest condition (`data-pose`), since ringing the
 * version that warns first would be a picture of the opposite word (SPEC §6). Both states
 * carry the same three markers at the same positions, so switching changes what a marker
 * says and never where anything sits (SPEC §5), and the advance control reaches the next
 * moment rather than toggling one (SPEC §8).
 *
 * The label over the timeline read "Billing timeline (as shipped)", turning to "(made
 * honest)" on the other side of the switch. Streamly would print neither, and the verdict
 * the stage already draws says what the switch just did, so the label is plain now.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 254px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Streamly</span>
          <span class="sp-label" data-part="day-readout" style="font-size: 11px">Day 0</span>
          <button class="sp-button sp-button--ghost sp-button--sm" data-part="next" type="button">Next event</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface sp-context" style="padding: 8px 10px">
            <div class="sp-row sp-row--between">
              <span class="sp-text sp-text--ink">Streamly Plus</span><span class="sp-text">Free for 30 days</span>
            </div>
            <div class="sp-text" style="margin-top: 2px; font-size: 12px">Card required to start. 79.00 a year after the trial.</div>
          </div>
          <span class="sp-label sp-context">Billing timeline</span>
          <div
            class="sp-surface"
            data-part="timeline"
            data-subject
            data-pose="[data-mode=forced]"
            data-mode="forced"
            data-day="0"
            style="height: 94px; padding: 10px 14px; background: var(--sp-surface)"
          >${timelineMarkup('forced')}</div>
        </div>
      </div>
              <span class="sp-text" data-stage-verdict data-part="verdict" style="width: 292px; font-size: 11px">${VERDICT.forced}</span>
        <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-value="forced" data-axis="Forced continuity" data-term="forced">
          <button class="sp-segment" data-part="mode-forced" value="forced">With</button>
          <button class="sp-segment" data-part="mode-fair" value="fair">Without</button>
        </sp-segmented>
      
    </div>
  `;

  const timeline = part(root, 'timeline');
  const verdict = part(root, 'verdict');
  const dayReadout = part(root, 'day-readout');
  const next = part(root, 'next');

  /** Move the caret and light the moments the month has now passed. */
  const goTo = (index: number) => {
    const mode: Mode = timeline.dataset.mode === 'fair' ? 'fair' : 'forced';
    const day = DAYS[index] as number;
    timeline.dataset.day = String(day);
    dayReadout.textContent = `Day ${day}`;
    part(timeline, 'today').style.left = at(day);
    flag(part(timeline, 'reminder'), 'data-fired', day >= 23 && mode === 'fair');
    flag(part(timeline, 'charge'), 'data-fired', day >= 31);
    if (index >= DAYS.length - 1) next.setAttribute('aria-disabled', 'true');
    else next.removeAttribute('aria-disabled');
  };

  const show = (mode: Mode) => {
    timeline.dataset.mode = mode;
    timeline.innerHTML = timelineMarkup(mode);
    verdict.textContent = VERDICT[mode];
    goTo(0);
  };

  next.addEventListener('click', () => {
    const index = DAYS.indexOf(Number(timeline.dataset.day ?? 0) as (typeof DAYS)[number]);
    if (index < 0 || index >= DAYS.length - 1) return;
    goTo(index + 1);
  });

  part(root, 'mode').addEventListener('change', (event) => {
    show((event as CustomEvent<string>).detail === 'fair' ? 'fair' : 'forced');
  });

  goTo(0);
}
