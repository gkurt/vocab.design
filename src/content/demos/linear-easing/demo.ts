import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** Twenty segments, twenty-one stops: enough for the corners of a bounce to survive sampling. */
const SEGMENTS = 20;
/** The kit's `sp-travel` runs for 1.1s; the settle beat is just past it. */
const TRAVEL_MS = 1100;
/** Plot box, in the graph's own user units. */
const PLOT = 100;

/** The shape no single bezier holds: a ball dropped, caught, and dropped again, three times smaller. */
function bounceOut(t: number): number {
  const n = 7.5625;
  const d = 2.75;
  if (t < 1 / d) return n * t * t;
  if (t < 2 / d) {
    const u = t - 1.5 / d;
    return n * u * u + 0.75;
  }
  if (t < 2.5 / d) {
    const u = t - 2.25 / d;
    return n * u * u + 0.9375;
  }
  const u = t - 2.625 / d;
  return n * u * u + 0.984375;
}

const STOPS = Array.from({ length: SEGMENTS + 1 }, (_, i) => Number(bounceOut(i / SEGMENTS).toFixed(3)));
const VALUE = `linear(${STOPS.join(', ')})`;
/** What fits on one line: the same value, read as far as the reader needs to see the idea. */
const VALUE_HEAD = `linear(${STOPS.slice(0, 4).join(', ')}, …)`;
const POINTS = STOPS.map((v, i) => `${((i / SEGMENTS) * PLOT).toFixed(1)},${(PLOT - v * PLOT).toFixed(1)}`).join(' ');
const DOTS = STOPS.map(
  (v, i) => `<circle cx="${((i / SEGMENTS) * PLOT).toFixed(1)}" cy="${(PLOT - v * PLOT).toFixed(1)}" r="1.9" fill="var(--sp-accent)" />`,
).join('');

/**
 * linear() specimen: the sampled point list drawn as the curve it spells, beside the
 * same list run against the `linear` keyword over one distance. The graph is the term's
 * own picture, since what `linear()` ships is the stops rather than the movement, and
 * every stop is drawn as a dot so the list is countable rather than described.
 *
 * The subject is the graph, following the cubic bezier specimen: the term
 * names the written description of the motion, not the motion. The dashed diagonal inside
 * it is the keyword, drawn as the reference the curve departs from; the two lanes below
 * are the scenery that says what the description feels like.
 *
 * Both lanes are the kit's `.sp-track`/`.sp-dot` animation, which `motion.css` gates on the
 * reader's behalf, so there is no `element.animate` here to gate by hand. `data-running`
 * and `data-settled` are timed on the stage's clock, so a pose cannot let a run finish
 * underneath a reader inspecting it (SPEC §6).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const lane = (id: string, spelling: string, note: string, timing: string) => `
    <div class="sp-stack" style="gap: 6px">
      <span class="sp-stack" style="gap: 1px">
        <span class="sp-text sp-text--ink" style="font-size: 11.5px; font-family: ui-monospace, monospace">${spelling}</span>
        <span class="sp-label" style="font-size: 11px">${note}</span>
      </span>
      <div class="sp-row">
        <span class="sp-track" data-part="track-${id}" style="--sp-timing: ${timing}">
          <span class="sp-dot" data-part="dot-${id}"></span>
        </span>
      </div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 440px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">One name, two easings</span>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-row" style="align-items: center; gap: 16px; margin-top: 10px">
          <svg
            data-part="graph"
            data-subject
            viewBox="-16 -8 124 128"
            style="display: block; width: 140px; height: 144px; flex: 0 0 auto; overflow: visible"
            role="img"
            aria-label="${STOPS.length} sampled stops plotted as a bounce, against the straight line of the linear keyword"
          >
            <rect x="0" y="0" width="100" height="100" fill="none" stroke="var(--sp-line)" stroke-width="1" />
            <path d="M0 100 L100 0" fill="none" stroke="var(--sp-line)" stroke-width="1" stroke-dasharray="3 3" />
            <polyline points="${POINTS}" fill="none" stroke="var(--sp-accent)" stroke-width="2.2" stroke-linejoin="round" />
            ${DOTS}
            <text x="50" y="114" font-size="8.5" fill="var(--sp-muted)" text-anchor="middle">time</text>
            <text transform="translate(-7 50) rotate(-90)" font-size="8.5" fill="var(--sp-muted)" text-anchor="middle">progress</text>
          </svg>
          <div class="sp-stack sp-context" data-part="race" style="flex: 1 1 auto; gap: 14px">
            ${lane('stops', VALUE_HEAD, `${STOPS.length} stops, a bounce`, VALUE)}
            ${lane('keyword', 'linear', 'the keyword, one constant speed', 'linear')}
          </div>
        </div>
        <p class="sp-text sp-context" style="margin: 10px 0 0">
          The keyword is one straight line. The function is ${STOPS.length} sampled stops, joined by straight lines.
        </p>
      </div>
    </div>
  `;

  const race = part(root, 'race');
  let settling: number | undefined;

  const settle = () => {
    race.removeAttribute('data-running');
    race.setAttribute('data-settled', '');
  };

  const play = () => {
    clock.clearTimeout(settling);
    race.removeAttribute('data-settled');
    race.removeAttribute('data-running');
    void race.offsetWidth; // Flush the removal so the travel restarts from the left.
    race.setAttribute('data-running', '');
    settling = clock.setTimeout(settle, TRAVEL_MS + 80);
  };

  part(root, 'replay').addEventListener('click', play);
  play();
}
