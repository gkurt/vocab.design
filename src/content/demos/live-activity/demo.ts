import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const PHONE_W = 180;
const PHONE_H = 244;
const BEZEL = 5;
const BEAT_MS = 2600;

/** The delivery, rewritten in place rather than re-announced. */
const STEPS = [
  { status: '3 stops away', mins: 12, progress: 35, eta: 'Arrives 9:53' },
  { status: '2 stops away', mins: 8, progress: 55, eta: 'Arrives 9:52' },
  { status: '1 stop away', mins: 4, progress: 78, eta: 'Arrives 9:50' },
  { status: 'Arriving now', mins: 1, progress: 96, eta: 'Arrives 9:49' },
];

const SURFACES = ['compact', 'expanded', 'notification'];
const START = 'compact';

const READOUT: Record<string, string> = {
  compact:
    'Compact: the activity shrinks to a pill beside the display cutout, keeping the one figure worth glancing at while another app owns the screen.',
  expanded: 'Expanded: the same activity as a lock screen card, with the progress and the arrival time it keeps rewriting in place.',
  notification:
    'The same delivery as an ordinary notification. It announced one event, and from here it only gets older: nothing rewrites it.',
};

/** The slot each surface is drawn in. Both are reserved at all times, so moving between
 *  them never moves the lock screen around them (SPEC §5). */
const SLOT: Record<string, string> = { compact: 'slot-compact', expanded: 'slot-sheet', notification: 'slot-sheet' };

const PILL_STYLE = 'display: inline-flex; align-items: center; gap: 5px; width: auto; padding: 2px 7px; border-radius: 999px';
const CARD_STYLE = 'display: block; width: 100%; padding: 8px 10px; border-radius: 14px';

/**
 * Live activity specimen: one delivery in progress, shown as a compact pill beside the
 * display cutout, as an expanded card on the lock screen, and, for comparison, as an
 * ordinary notification about the same delivery.
 *
 * The subject is the activity presentation, `data-part="activity"`: one element that moves
 * between the two reserved slots and re-renders for the surface it landed in, rather than
 * three copies that could drift apart. The phone, the wallpaper, the clock, the cutout and
 * the picker are scenery.
 *
 * The notification is the counter-example the subject itself passes through, so the honest
 * condition lives in `data-pose="[data-live]"` and the mount state (compact) satisfies it:
 * identify refuses to ring a surface that is not a live activity at all, and keeps the
 * summon playing instead (SPEC §6).
 *
 * The clock the stage hands `mount` is what makes it live: every beat rewrites the status,
 * the minutes, the progress and the arrival time in place, which is the whole difference
 * from the notification, whose one sentence is fixed and whose age only grows. Both slots
 * hold their box whether or not the activity is in them, and every figure is set in tabular
 * numerals, so an update never moves anything (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 296px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Order 4821, out for delivery</span>
          <span class="sp-label" style="font-size: 12px">Harbour Supply</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 14px; padding: 8px 12px">
          <div
            data-part="phone"
            style="position: relative; flex: 0 0 auto; width: ${PHONE_W}px; height: ${PHONE_H}px; padding: ${BEZEL}px;
                   background: #14161a; border-radius: 20px"
          >
            <div
              data-part="display"
              style="position: relative; width: 100%; height: 100%; overflow: hidden; border-radius: 15px; color: #ffffff;
                     background: linear-gradient(155deg, #2b3358 0%, #55386d 55%, #8c4a58 100%)"
            >
              <span
                data-part="cutout"
                style="position: absolute; z-index: 2; top: 4px; left: 50%; translate: -50% 0;
                       width: 44px; height: 15px; border-radius: 999px; background: #000000"
              ></span>

              <div
                data-part="slot-compact"
                style="position: absolute; z-index: 2; top: 3px; left: 6px; display: flex; align-items: center;
                       width: 48px; height: 17px"
              ></div>

              <div style="position: absolute; top: 40px; left: 0; right: 0; text-align: center">
                <span style="display: block; font-size: 30px; font-weight: 600; line-height: 1.1; font-variant-numeric: tabular-nums">9:41</span>
                <span style="display: block; font-size: 10px; opacity: 0.82; margin-top: 2px">Tuesday 18 June</span>
              </div>

              <div data-part="slot-sheet" style="position: absolute; left: 8px; right: 8px; top: 104px; height: 116px"></div>

              <span
                style="position: absolute; left: 50%; bottom: 8px; translate: -50% 0; width: 56px; height: 3px;
                       border-radius: 999px; background: rgb(255 255 255 / 0.55)"
              ></span>
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 6px">
              <sp-segmented data-stage-mode class="sp-segmented" data-axis="View" data-part="picker" data-value="${START}" style="align-self: flex-start">
              <button class="sp-segment" type="button" data-part="seg-compact" value="compact" style="padding: 4px 7px; font-size: 11px">Compact</button>
              <button class="sp-segment" type="button" data-part="seg-expanded" value="expanded" style="padding: 4px 7px; font-size: 11px">Expanded</button>
              <button class="sp-segment" type="button" data-part="seg-notification" value="notification" style="padding: 4px 7px; font-size: 11px">Notification</button>
            </sp-segmented>
            <span
              class="sp-text"
              data-part="readout"
              data-surface="${START}"
              role="status"
              style="height: 108px; margin-top: 8px; font-size: 12px"
            >${READOUT[START]}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const activityHtml = `
    <div
      class="sp-glass"
      data-part="activity"
      data-subject
      data-surface="${START}"
      data-live
      data-pose="[data-live]"
      style="${PILL_STYLE}"
    ></div>`;
  part(root, 'slot-compact').insertAdjacentHTML('afterbegin', activityHtml);

  const activity = part(root, 'activity');
  const readout = part(root, 'readout');

  let surface = START;
  let step = 0;
  let age = 2;

  const maybe = (name: string) => activity.querySelector<HTMLElement>(`[data-part="${name}"]`);

  const render = () => {
    const now = STEPS[step] as (typeof STEPS)[number];
    if (surface === 'compact') {
      activity.innerHTML = `
        <span aria-hidden="true" style="flex: 0 0 auto; width: 7px; height: 7px; border-radius: 50%; background: #5ee0a0"></span>
        <span data-part="compact-eta" style="font-size: 9px; font-weight: 600; white-space: nowrap; font-variant-numeric: tabular-nums">${now.mins}m</span>`;
      return;
    }
    if (surface === 'expanded') {
      activity.innerHTML = `
        <span class="sp-row" style="gap: 6px; margin-bottom: 5px">
          <span aria-hidden="true" style="flex: 0 0 auto; width: 14px; height: 14px; border-radius: 4px; background: rgb(255 255 255 / 0.38)"></span>
          <span class="sp-grow" style="font-size: 10px; font-weight: 600">Harbour Supply</span>
          <span data-part="badge" style="flex: 0 0 auto; padding: 1px 5px; border-radius: 999px; background: rgb(255 255 255 / 0.3); font-size: 8px; font-weight: 700; letter-spacing: 0.06em">LIVE</span>
        </span>
        <span style="display: block; font-size: 11px; font-weight: 600">Order 4821 on its way</span>
        <span data-part="status" style="display: block; margin: 3px 0 6px; font-size: 10px; opacity: 0.86">${now.status}</span>
        <div class="sp-progress" data-part="progress" style="height: 5px; background: rgb(255 255 255 / 0.26)">
          <div class="sp-progress-fill" data-part="progress-fill" style="background: #ffffff; --sp-value: ${now.progress}%"></div>
        </div>
        <span data-part="eta" style="display: block; margin-top: 5px; font-size: 10px; opacity: 0.86; font-variant-numeric: tabular-nums">${now.eta}</span>`;
      return;
    }
    activity.innerHTML = `
      <span class="sp-row" style="gap: 6px; margin-bottom: 5px">
        <span aria-hidden="true" style="flex: 0 0 auto; width: 14px; height: 14px; border-radius: 4px; background: rgb(255 255 255 / 0.38)"></span>
        <span class="sp-grow" style="font-size: 10px; font-weight: 600">Harbour Supply</span>
        <span data-part="age" style="flex: 0 0 auto; font-size: 9px; opacity: 0.8; font-variant-numeric: tabular-nums">${age}m ago</span>
      </span>
      <span style="display: block; font-size: 11px; font-weight: 600">Your order has left the depot</span>
      <span style="display: block; margin-top: 3px; font-size: 10px; opacity: 0.86">Order 4821, three stops away when it left.</span>`;
  };

  const update = () => {
    const now = STEPS[step] as (typeof STEPS)[number];
    const compactEta = maybe('compact-eta');
    if (compactEta) compactEta.textContent = `${now.mins}m`;
    const status = maybe('status');
    if (status) status.textContent = now.status;
    const fill = maybe('progress-fill');
    if (fill) fill.style.setProperty('--sp-value', `${now.progress}%`);
    const eta = maybe('eta');
    if (eta) eta.textContent = now.eta;
    const aged = maybe('age');
    if (aged) aged.textContent = `${age}m ago`;
  };

  const setSurface = (next: string) => {
    if (!SURFACES.includes(next)) return;
    surface = next;
    activity.dataset.surface = next;
    activity.setAttribute('style', next === 'compact' ? PILL_STYLE : CARD_STYLE);
    if (next === 'notification') activity.removeAttribute('data-live');
    else activity.setAttribute('data-live', '');
    part(root, SLOT[next] ?? 'slot-sheet').appendChild(activity);
    readout.dataset.surface = next;
    readout.textContent = READOUT[next] ?? '';
    render();
  };

  const tick = () => {
    step = (step + 1) % STEPS.length;
    age = Math.min(age + 1, 59);
    update();
    clock.setTimeout(tick, BEAT_MS);
  };

  part(root, 'picker').addEventListener('change', (event) => setSurface((event as CustomEvent<string>).detail));

  setSurface(START);
  clock.setTimeout(tick, BEAT_MS);
}
