import { prefersReducedMotion } from '#src/kit/motion.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** How long the edge answer stays up, and how far the content gives before it springs back. */
const GLOW_MS = 1500;
const BAND_PX = 12;
const BAND_MS = 400;

const NOTES = [
  ['4.2.0', 'Ferry times now honour the local timezone'],
  ['4.1.6', 'Fixed the harbour map losing its pins on rotate'],
  ['4.1.5', 'Faster first paint on the timetable'],
  ['4.1.4', 'Saved routes survive a cold start'],
  ['4.1.3', 'Corrected the Kalkan berth number'],
  ['4.1.2', 'Offline notice no longer covers the search field'],
  ['4.1.1', 'Tide chart labels read in dark mode'],
  ['4.1.0', 'Seat holds show the time remaining'],
  ['4.0.9', 'Fewer duplicate departure alerts'],
  ['4.0.8', 'Boarding passes export as PDF'],
];

/**
 * Overscroll specimen: a release-notes panel scrolled to its limit, where the
 * content gives a little and the edge answers. The subject is the scroller, since
 * overscroll is what a scroller does with input it has no room for; the frame and
 * the notes inside it are the scenery that gives it something to run out of.
 *
 * The edge answer is drawn by the demo rather than by the platform. A real rubber
 * band comes from the compositor in response to input the scroller could not use,
 * and a scripted `scrollTop` simply clamps, so the effect is played at the moment
 * the scroller lands on its limit. The spring is an `element.animate` move, so it
 * asks `prefersReducedMotion` itself and is skipped outright when the reader has
 * asked for less movement. The glow is drawn over the panel, so nothing it does
 * moves a row.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const notes = NOTES.map(
    ([version, text]) => `
      <li class="sp-list-item">
        <span class="sp-label" style="width: 42px">${version}</span>
        <span class="sp-grow sp-text sp-text--ink">${text}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 256px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Release notes</span>
          <span class="sp-text" data-part="readout" data-at="room" style="width: 130px; text-align: right">Room to scroll</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px">
          <div data-part="panel" style="position: relative; flex: 1 1 auto; min-height: 0">
            <div class="sp-scroll sp-surface" data-part="scroller" data-subject style="height: 100%">
              <ul class="sp-list" style="padding: 4px 6px">${notes}</ul>
            </div>
            <div
              data-part="glow"
              style="position: absolute; left: 1px; right: 1px; bottom: 1px; height: 26px; border-radius: 0 0 var(--sp-radius) var(--sp-radius); background: radial-gradient(120% 100% at 50% 100%, var(--sp-accent), transparent 70%); opacity: 0; visibility: hidden; transition: opacity 0.2s, visibility 0.2s; pointer-events: none"
            ></div>
          </div>
          <span class="sp-label sp-context">The edge answers input the scroller has no room for.</span>
        </div>
      </div>
    </div>
  `;

  const scroller = part(root, 'scroller');
  const panel = part(root, 'panel');
  const glow = part(root, 'glow');
  const readout = part(root, 'readout');
  let fading: number | undefined;
  let landed = false;

  const showGlow = (on: boolean) => {
    flag(glow, 'data-open', on);
    glow.style.opacity = on ? '0.55' : '0';
    glow.style.visibility = on ? 'visible' : 'hidden';
  };

  const land = () => {
    if (landed) return;
    landed = true;
    readout.dataset.at = 'end';
    readout.textContent = 'Nothing left to give';
    showGlow(true);
    clock.clearTimeout(fading);
    // The answer is an answer, not a state: it says the limit was reached and goes.
    fading = clock.setTimeout(() => showGlow(false), GLOW_MS);
    if (prefersReducedMotion(root)) return;
    // The whole panel gives, rather than the rows inside it. A transform on the
    // scrolled content would change the scroller's own overflow while it played,
    // which the browser answers by clamping the scroll position: the panel would
    // shuffle itself off its own limit halfway through saying it had reached one.
    panel.animate(
      [{ transform: 'translateY(0)' }, { transform: `translateY(${-BAND_PX}px)`, offset: 0.35 }, { transform: 'translateY(0)' }],
      { duration: BAND_MS, easing: 'ease-out' },
    );
  };

  const leave = () => {
    if (!landed) return;
    landed = false;
    readout.dataset.at = 'room';
    readout.textContent = 'Room to scroll';
    clock.clearTimeout(fading);
    showGlow(false);
  };

  scroller.addEventListener('scroll', () => {
    const room = scroller.scrollHeight - scroller.clientHeight - scroller.scrollTop;
    if (room <= 2) land();
    else leave();
  });
}
