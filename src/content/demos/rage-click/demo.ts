import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The strip's span, in session seconds: every mark is placed as a fraction of it. */
const SPAN_S = 20;
/** Where a fresh streak of presses lands, leaving the right half of the strip free. */
const LIVE_START_S = 12;
/** Marks are clamped here, so a reader who keeps pressing never pushes one off the rail. */
const LIVE_END_S = 19.4;
/**
 * The mock recorder's own rule, printed in its panel as that tool's setting. Vendors
 * disagree about the threshold and Fullstory publishes none, so a number stated as
 * universal would be a claim the term does not support.
 */
const WINDOW_MS = 1500;
const THRESHOLD = 4;
/** Air either side of a burst, so the band reads as a region rather than as a hairline. */
const PAD_S = 0.35;

const pct = (t: number) => (t / SPAN_S) * 100;

/** The session the specimen mounts with: two ordinary events and a burst at 0:06. */
const PAST_EVENTS: [number, 'click' | 'scroll'][] = [
  [1.2, 'scroll'],
  [3.4, 'click'],
  [9.6, 'click'],
];
const PAST_BURST = [6.0, 6.32, 6.64, 6.96, 7.28, 7.6];
/** Its extent, named once so the band it earns can be sized without indexing the list. */
const PAST_FROM = Math.min(...PAST_BURST);
const PAST_TO = Math.max(...PAST_BURST);

const mark = (at: number, kind: 'click' | 'scroll') => `
  <span style="position: absolute; left: ${pct(at)}%; top: 3px; width: 3px; height: 14px; margin-left: -1.5px; border-radius: 2px; background: var(${
    kind === 'scroll' ? '--sp-muted' : '--sp-ink'
  })"></span>`;

const BAND_STYLE =
  'position: absolute; top: 4px; height: 36px; border: 2px solid var(--sp-accent); border-radius: 6px; background: var(--sp-accent-soft)';

/**
 * Rage click specimen: a control that answers nothing at all, beside the session
 * recording that is the only thing in the scene which notices being pressed. The
 * button has no hover paint, no pressed paint, no spinner and no result, which is
 * the condition the term is about; the strip counts the presses that arrive and
 * draws a band over any run of four inside a second and a half.
 *
 * The subject is a burst band. The behaviour has no element of its own, so it is
 * given one (SPEC §5): a box sized to the burst's extent on the strip, not the
 * button and not the timeline. The specimen therefore mounts with a burst already
 * in the session, at 0:06, so the subject is honest at every resting state
 * including the first (a marker that does not exist until four clicks have landed
 * would leave identify with nothing to ring at mount). The script performs a fresh
 * burst, which gets a band of its own: two rage clicks in one session, the same
 * thing twice, and only the one present from mount carries `data-subject`.
 *
 * Nothing here synthesizes input. The counter reads the clicks that arrive and no
 * others, so one press by a reader is exactly one press on the record.
 *
 * A caption under the frame once read "The button answers nothing. Only the
 * recording notices the burst." That is the article's sentence, and the scene
 * already shows it, so it went. Two other lines were the site talking through the
 * product: the export card's subtitle listed what the button fails to do, and the
 * recorder's rule was headed "This demo's rule". Both now say what that mock tool
 * would really print.
 *
 * The button and the strip's rail, marks and labels are the apparatus and carry the
 * context register. Both bands sit outside it, since the register remaps the accent
 * they are drawn in. Marks and bands are absolutely positioned over a rail of fixed
 * height and the readout holds its width, so nothing in the scene moves as the
 * burst forms (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 244px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Reports</span>
          <span class="sp-text" data-part="readout" style="width: 250px; font-size: 12px; text-align: right; white-space: nowrap">Session 4-812 · 1 rage click logged</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-surface sp-context" style="display: flex; align-items: center; gap: 12px; padding: 12px">
            <div class="sp-stack sp-grow" style="gap: 2px; min-width: 0">
              <span class="sp-heading" style="font-size: 14px">Quarterly export</span>
              <span class="sp-text">Every report in this workspace, as one .csv file.</span>
            </div>
            <button
              type="button"
              data-part="export"
              style="flex: 0 0 auto; padding: 7px 14px; border: 0; border-radius: var(--sp-radius); background: var(--sp-accent); color: var(--sp-accent-ink); font: inherit; font-weight: 500; white-space: nowrap; cursor: pointer"
            >Export CSV</button>
          </div>

          <div class="sp-surface" style="display: flex; flex-direction: column; gap: 6px; padding: 10px 12px">
            <div class="sp-row sp-row--between sp-context">
              <span class="sp-label">Session recording</span>
              <span class="sp-label">Rule: ${THRESHOLD} presses in ${(WINDOW_MS / 1000).toFixed(1)} s</span>
            </div>

            <div data-part="timeline" data-detect="idle" style="position: relative; height: 56px">
              <span class="sp-context" style="position: absolute; left: 0; right: 0; top: 12px; height: 20px; border-radius: 6px; background: var(--sp-sunken)"></span>

              <span
                data-part="burst-past"
                data-subject
                style="${BAND_STYLE}; left: ${pct(PAST_FROM - PAD_S)}%; width: ${pct(PAST_TO - PAST_FROM + PAD_S * 2)}%"
              ></span>
              <span data-part="burst-live" hidden style="${BAND_STYLE}"></span>

              <div class="sp-context" style="position: absolute; left: 0; right: 0; top: 12px; height: 20px">
                ${PAST_EVENTS.map(([at, kind]) => mark(at, kind)).join('')}
                ${PAST_BURST.map((at) => mark(at, 'click')).join('')}
              </div>
              <div class="sp-context" data-part="live-events" style="position: absolute; left: 0; right: 0; top: 12px; height: 20px"></div>

              <span class="sp-context sp-label" style="position: absolute; left: 0; top: 42px; font-size: 10px">0:00</span>
              <span class="sp-context sp-label" style="position: absolute; left: 50%; top: 42px; font-size: 10px; transform: translateX(-50%)">0:10</span>
              <span class="sp-context sp-label" style="position: absolute; right: 0; top: 42px; font-size: 10px">0:20</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const timeline = part(root, 'timeline');
  const liveBand = part(root, 'burst-live');
  const lane = part(root, 'live-events');
  const readout = part(root, 'readout');

  /** Arrival times of the current streak of presses, oldest first. */
  let streak: number[] = [];
  /** The streak's first press: the session time every live mark is placed against. */
  let anchor = 0;
  /** Whether this streak has already been counted, so one burst is logged once. */
  let counted = false;
  let logged = 1;
  let expiry: number | undefined;

  const say = (text: string) => {
    readout.textContent = text;
  };

  const summary = () => say(`Session 4-812 · ${logged} rage click${logged === 1 ? '' : 's'} logged`);

  /** Session seconds for a press, measured from the streak's first one and clamped to the rail. */
  const placed = (at: number) => Math.min(LIVE_END_S, LIVE_START_S + (at - anchor) / 1000);

  part(root, 'export').addEventListener('click', () => {
    const now = performance.now();
    const last = streak.at(-1);
    // A press that arrives after the window has closed starts a fresh streak, which is
    // also the only thing that clears the lane: nothing is ever removed mid-burst.
    if (last !== undefined && now - last > WINDOW_MS) {
      streak = [];
      counted = false;
      lane.textContent = '';
      flag(liveBand, 'hidden', true);
    }
    if (streak.length === 0) anchor = now;
    streak.push(now);

    const at = placed(now);
    lane.insertAdjacentHTML('beforeend', mark(at, 'click'));

    const recent = streak.filter((t) => now - t <= WINDOW_MS);
    // This press sits inside its own window, so the filter always leaves a first entry.
    const oldest = recent[0] ?? now;
    const span = ((now - oldest) / 1000).toFixed(1);

    if (recent.length >= THRESHOLD) {
      const from = placed(oldest);
      liveBand.style.left = `${pct(from - PAD_S)}%`;
      liveBand.style.width = `${pct(at - from + PAD_S * 2)}%`;
      flag(liveBand, 'hidden', false);
      timeline.dataset.detect = 'burst';
      if (!counted) {
        counted = true;
        logged += 1;
      }
      say(`Rage click: ${recent.length} presses in ${span} s`);
    } else {
      timeline.dataset.detect = 'counting';
      say(`${recent.length} press${recent.length === 1 ? '' : 'es'} on Export CSV in ${span} s`);
    }

    clock.clearTimeout(expiry);
    // The window closing is the detector going quiet again; whatever it drew stays.
    expiry = clock.setTimeout(() => {
      timeline.dataset.detect = 'idle';
      summary();
    }, WINDOW_MS);
  });
}
