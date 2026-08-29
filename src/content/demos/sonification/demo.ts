import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** One tone per point, then the beat the sweep rests on with the whole trace drawn. */
const TONE_MS = 250;

type Mode = 'table' | 'summary' | 'sonified';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;
const VALUES = [12, 16, 15, 21, 26, 24, 30, 55, 33, 36, 37, 36] as const;
const NOTES = ['C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5', 'G5', 'A5', 'C6', 'D6'] as const;

const LO = 0;
const HI = 60;
const W = 400;
const H = 92;
const PLOT = { left: 10, right: 344, top: 12, bottom: 76 };

const CAPTION = {
  table: 'Every figure, exact, in reading order. Twelve rows of speech to learn one shape.',
  summary: 'The shape in a sentence, written by whoever made the chart. Fast to hear, impossible to question.',
  sonified:
    'Pitch carries the value, time carries the axis: rise, spike and plateau in three seconds. The pitch is charted here, not sounded.',
} as const;

const x = (index: number) => PLOT.left + (index / (VALUES.length - 1)) * (PLOT.right - PLOT.left);
const y = (value: number) => PLOT.bottom - ((value - LO) / (HI - LO)) * (PLOT.bottom - PLOT.top);
const noteOf = (value: number) => NOTES[Math.round(((value - LO) / (HI - LO)) * (NOTES.length - 1))] ?? 'C4';
const points = (upto: number) =>
  VALUES.slice(0, upto)
    .map((value, index) => `${x(index).toFixed(1)},${y(value).toFixed(1)}`)
    .join(' ');

/**
 * Sonification specimen: one series with three ways to reach it, picked between a data table, a
 * written summary and a sonified sweep. The chart stays on screen throughout, because what changes
 * is not the data but what a reader who cannot see it is given instead.
 *
 * No audio is played. The pitch mapping is drawn: the chart's own vertical axis is labelled with the
 * notes the values map to, and the sweep is a trace moving along the series. The caption says so in
 * the specimen's own words rather than letting the demo imply a sound it does not make.
 *
 * The subject is the pitch trace, given an element of its own (SPEC §5): the term names the mapping
 * from the series to sound, not the chart it is drawn over and not the picker that chooses it. The
 * trace carries its swept polyline, its playhead and the point being sounded, so it has a real box
 * from the first tone. It is off stage in the table and summary states, which identify summons it
 * out of (SPEC §6), and it is the term in every state it is on stage in, so no `data-pose` is
 * needed. The chart, the three alternatives, the picker and the caption are scenery.
 *
 * Every tone comes from the DemoClock, so a pose holds the sweep on one month. Nothing sweeps at
 * mount, so the scripted pick owns the only run (SPEC §8).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const axisNote = (value: number) =>
    `<text x="${PLOT.right + 8}" y="${(y(value) + 2.6).toFixed(1)}" font-size="7.5" fill="currentColor">${noteOf(value)}</text>`;

  const column = (index: number) => `
    <div style="flex: 1 1 0; min-width: 0; text-align: center">
      <span class="sp-label" style="display: block; font-size: 8.5px">${MONTHS[index]}</span>
      <span class="sp-text sp-text--ink" style="display: block; font-size: 10.5px; line-height: 14px">${VALUES[index]}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Revenue, one series</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Presentation" data-part="mode" data-value="table" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-table" value="table"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Table</button>
            <button class="sp-segment" type="button" data-part="seg-summary" value="summary"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Summary</button>
            <button class="sp-segment" type="button" data-part="seg-sonified" value="sonified"
                    style="padding: 3px 10px; font-size: 11px; white-space: nowrap">Sonified</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" style="margin-top: 9px; padding: 6px 8px">
          <svg data-part="chart" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img"
               aria-label="Revenue by month, rising with one spike in August"
               style="display: block; overflow: visible">
            <g class="sp-context" style="color: var(--sp-muted)">
              <line x1="${PLOT.left}" y1="${PLOT.bottom + 4}" x2="${PLOT.right}" y2="${PLOT.bottom + 4}"
                    stroke="currentColor" stroke-width="1" opacity="0.5" />
              <polyline points="${points(VALUES.length)}" fill="none" stroke="currentColor" stroke-width="1.4"
                        stroke-linejoin="round" opacity="0.55" />
            </g>
            <g data-part="axis" style="color: var(--sp-muted); opacity: 0; transition: opacity 0.2s ease">
              ${axisNote(VALUES[7] ?? 0)}${axisNote(36)}${axisNote(21)}${axisNote(12)}
              <text x="${PLOT.right + 8}" y="${PLOT.top - 3}" font-size="7.5" fill="currentColor">pitch</text>
            </g>
            <g data-part="trace" data-subject style="color: var(--sp-accent); opacity: 0; transition: opacity 0.18s ease">
              <polyline data-part="swept" points="${points(1)}" fill="none" stroke="currentColor" stroke-width="2.6"
                        stroke-linejoin="round" stroke-linecap="round" />
              <line data-part="playhead" x1="${x(0)}" y1="${PLOT.top - 2}" x2="${x(0)}" y2="${PLOT.bottom + 4}"
                    stroke="currentColor" stroke-width="2.4" opacity="0.32" />
              <circle data-part="tone" cx="${x(0)}" cy="${y(VALUES[0] ?? 0)}" r="3.4" fill="currentColor" />
            </g>
          </svg>
        </div>

        <div class="sp-surface sp-context" style="margin-top: 9px; padding: 8px 10px">
          <div class="sp-row sp-row--between" style="gap: 10px; height: 14px">
            <span class="sp-label" data-part="alt-label" style="flex: 0 0 auto; font-size: 10px">What a reader who cannot see it gets</span>
            <span class="sp-label" data-part="readout" data-mode="table" data-playing="no"
                  style="flex: 0 0 auto; font-size: 10px">twelve figures, in order</span>
          </div>
          <div style="position: relative; height: 32px; margin-top: 4px">
            <div data-part="view-table" class="sp-row" style="position: absolute; inset: 0; gap: 0; align-items: flex-start;
                                                              transition: opacity 0.18s ease">
              ${MONTHS.map((_, index) => column(index)).join('')}
            </div>
            <p class="sp-text sp-text--ink" data-part="view-summary"
               style="position: absolute; inset: 0; margin: 0; font-size: 11.5px; line-height: 16px; opacity: 0;
                      transition: opacity 0.18s ease">“Revenue rises from 12 in January to 36 in December, with one
              spike to 55 in August.”</p>
            <p class="sp-text sp-text--ink" data-part="view-sonified"
               style="position: absolute; inset: 0; margin: 0; font-size: 11.5px; line-height: 16px; opacity: 0;
                      transition: opacity 0.18s ease">One tone per month, pitch rising with value.<br>
              <span data-part="tone-text" class="sp-label" style="font-size: 10.5px">ready</span></p>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="table"
           style="margin: 9px 0 0; height: 30px; font-size: 11px; line-height: 1.35">${CAPTION.table}</p>
      </div>
    </div>
  `;

  const axis = part(root, 'axis');
  const trace = part(root, 'trace');
  const swept = part(root, 'swept');
  const playhead = part(root, 'playhead');
  const tone = part(root, 'tone');
  const toneText = part(root, 'tone-text');
  const readout = part(root, 'readout');
  const caption = part(root, 'caption');
  const views = {
    table: part(root, 'view-table'),
    summary: part(root, 'view-summary'),
    sonified: part(root, 'view-sonified'),
  };

  let timers: number[] = [];

  const place = (index: number) => {
    const value = VALUES[index] ?? 0;
    swept.setAttribute('points', points(index + 1));
    playhead.setAttribute('x1', `${x(index)}`);
    playhead.setAttribute('x2', `${x(index)}`);
    tone.setAttribute('cx', `${x(index)}`);
    tone.setAttribute('cy', `${y(value)}`);
    toneText.textContent = `${MONTHS[index]}, ${value}, ${noteOf(value)}`;
    readout.dataset.point = `${index + 1}`;
  };

  const sweep = () => {
    place(0);
    trace.style.opacity = '1';
    readout.dataset.playing = 'yes';
    readout.textContent = 'sweeping, 3 seconds';
    VALUES.forEach((_, index) => {
      if (index === 0) return;
      timers.push(clock.setTimeout(() => place(index), index * TONE_MS));
    });
    timers.push(
      clock.setTimeout(() => {
        readout.dataset.playing = 'done';
        readout.textContent = 'swept, replay or step';
      }, VALUES.length * TONE_MS),
    );
  };

  const apply = (next: Mode) => {
    for (const timer of timers) clock.clearTimeout(timer);
    timers = [];
    for (const [key, el] of Object.entries(views)) el.style.opacity = key === next ? '1' : '0';
    axis.style.opacity = next === 'sonified' ? '1' : '0';
    caption.dataset.mode = next;
    caption.textContent = CAPTION[next];
    readout.dataset.mode = next;
    readout.dataset.playing = 'no';
    readout.removeAttribute('data-point');
    toneText.textContent = 'ready';

    if (next !== 'sonified') {
      trace.style.opacity = '0';
      readout.textContent = next === 'table' ? 'twelve figures, in order' : 'one sentence, someone else’s reading';
      return;
    }
    sweep();
  };

  part(root, 'mode').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });

  apply('table');
}
