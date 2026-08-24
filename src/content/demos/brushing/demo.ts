import { localPoint } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';

const PLOT_W = 434;
const PLOT_H = 122;
const LEFT = 32;
const RIGHT = 8;
const TOP = 8;
const BOTTOM = 16;
const INNER_W = PLOT_W - LEFT - RIGHT;
const INNER_H = PLOT_H - TOP - BOTTOM;
const BASE = TOP + INNER_H;
const LAT_MAX = 400;
const MEM_MAX = 100;
/** Rules are drawn at 2px: the stage reads anything thinner as absent. */
const RULE = 2;
const DOT = 3.4;
/** Below this the gesture was a click, which clears the brush rather than leaving an empty one. */
const MIN_BRUSH = 10;
/** One run's worth of bar, so a fill's length is the count itself and not a proportion. */
const UNIT = 30;

interface Run {
  key: string;
  service: string;
  lat: number;
  mem: number;
}

const SERVICES = [
  { key: 'auth', label: 'Auth' },
  { key: 'search', label: 'Search' },
  { key: 'media', label: 'Media' },
  { key: 'sync', label: 'Sync' },
];

const RUNS: Run[] = [
  { key: 'a1', service: 'auth', lat: 30, mem: 18 },
  { key: 'a2', service: 'auth', lat: 45, mem: 22 },
  { key: 'a3', service: 'auth', lat: 62, mem: 15 },
  { key: 'a4', service: 'auth', lat: 74, mem: 31 },
  { key: 'a5', service: 'auth', lat: 105, mem: 40 },
  { key: 'a6', service: 'auth', lat: 56, mem: 30 },
  { key: 'a7', service: 'auth', lat: 38, mem: 11 },
  { key: 'a8', service: 'auth', lat: 66, mem: 45 },
  { key: 's1', service: 'search', lat: 120, mem: 55 },
  { key: 's2', service: 'search', lat: 150, mem: 62 },
  { key: 's3', service: 'search', lat: 186, mem: 71 },
  { key: 's4', service: 'search', lat: 216, mem: 50 },
  { key: 's5', service: 'search', lat: 268, mem: 74 },
  { key: 's6', service: 'search', lat: 100, mem: 88 },
  { key: 's7', service: 'search', lat: 330, mem: 66 },
  { key: 'm1', service: 'media', lat: 142, mem: 90 },
  { key: 'm2', service: 'media', lat: 175, mem: 34 },
  { key: 'm3', service: 'media', lat: 232, mem: 43 },
  { key: 'm4', service: 'media', lat: 236, mem: 67 },
  { key: 'm5', service: 'media', lat: 302, mem: 91 },
  { key: 'm6', service: 'media', lat: 358, mem: 77 },
  { key: 'm7', service: 'media', lat: 72, mem: 58 },
  { key: 'y1', service: 'sync', lat: 198, mem: 15 },
  { key: 'y2', service: 'sync', lat: 276, mem: 17 },
  { key: 'y3', service: 'sync', lat: 312, mem: 29 },
  { key: 'y4', service: 'sync', lat: 352, mem: 24 },
  { key: 'y5', service: 'sync', lat: 204, mem: 36 },
  { key: 'y6', service: 'sync', lat: 162, mem: 10 },
];

/** Where the scripted drag starts and ends, stated in the data's own units. */
const START = { lat: 90, mem: 78 };
const END = { lat: 250, mem: 26 };

interface Box {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const px = (lat: number) => LEFT + (lat / LAT_MAX) * INNER_W;
const py = (mem: number) => BASE - (mem / MEM_MAX) * INNER_H;
const toLat = (x: number) => Math.round(((x - LEFT) / INNER_W) * LAT_MAX);
const toMem = (y: number) => Math.round(((BASE - y) / INNER_H) * MEM_MAX);

const total = (service: string) => RUNS.filter((run) => run.service === service).length;

const inside = (run: Run, box: Box) => {
  const x = px(run.lat);
  const y = py(run.mem);
  return x >= box.x1 && x <= box.x2 && y >= box.y1 && y <= box.y2;
};

const clamp = (value: number, low: number, high: number) => Math.min(Math.max(value, low), high);

/** An unpainted anchor the choreography aims at: the ghost cursor is the only pointer artifact. */
const aim = (name: string, at: { lat: number; mem: number }) => `
  <span
    data-part="${name}"
    style="position: absolute; z-index: 2; left: ${(px(at.lat) - 6).toFixed(1)}px; top: ${(py(at.mem) - 6).toFixed(1)}px;
           width: 12px; height: 12px; pointer-events: none"
  ></span>`;

const dots = RUNS.map(
  (run) => `<circle
      data-part="dot-${run.key}"
      data-in
      cx="${px(run.lat).toFixed(1)}" cy="${py(run.mem).toFixed(1)}" r="${DOT}"
      fill="var(--sp-accent)"
      style="transition: fill 0.2s linear, opacity 0.2s linear"
    />`,
).join('');

const tickY = [0, 50, 100]
  .map(
    (mem) => `<text x="${LEFT - 6}" y="${(py(mem) + 3).toFixed(1)}" text-anchor="end" fill="var(--sp-muted)" font-size="9">${mem}</text>`,
  )
  .join('');

const tickX = [0, 200, 400]
  .map((lat, i) => {
    const anchor = i === 0 ? 'start' : i === 2 ? 'end' : 'middle';
    const label = i === 2 ? '400 ms' : String(lat);
    return `<text x="${px(lat).toFixed(1)}" y="${BASE + 12}" text-anchor="${anchor}" fill="var(--sp-muted)" font-size="9">${label}</text>`;
  })
  .join('');

const row = ({ key, label }: { key: string; label: string }) => `
  <div class="sp-row" style="gap: 8px; height: 13px">
    <span class="sp-label" style="flex: 0 0 auto; width: 44px; font-size: 11px; color: var(--sp-ink)">${label}</span>
    <div class="sp-progress" data-part="bar-${key}" style="flex: 0 0 auto; width: ${total(key) * UNIT}px; --sp-value: 100%">
      <div class="sp-progress-fill"></div>
    </div>
    <span
      data-part="count-${key}"
      data-hits="${total(key)}"
      style="flex: 0 0 auto; width: 44px; font-size: 11px; font-variant-numeric: tabular-nums"
    >${total(key)} / ${total(key)}</span>
  </div>`;

/**
 * Brushing specimen: a scatter of service runs and a linked count chart, where dragging a
 * rectangle across the scatter marks a range of latency and memory and the counts beside it
 * answer immediately. The selection outlives the pointer coming up and goes only on the
 * labelled Clear, which is the difference between a brush and a lasso: this one is a standing
 * query, not feedback for a gesture.
 *
 * The subject is the brush rectangle itself, `data-part="brush"`, since the term names the
 * range that got dragged rather than the chart it was dragged over or the view that answered
 * it. The window chrome and the Clear control are instrumentation and sit in the context
 * register; both charts keep the full palette, because a linked view going quiet would dim
 * exactly the half of the term that matters. The two ends of the scripted drag are unpainted
 * anchors, since a drawn stop point would annotate the script rather than the term.
 *
 * No brush means every run, not none, so the counts start full and a brush filters down. That
 * is also why the specimen needs no `data-pose`: a rectangle is only ever drawn when there is
 * a range to draw, so the subject is the term in every state it is visible in (SPEC §6).
 *
 * The gesture is really computed rather than mimed: the rectangle comes from the pointer, the
 * catch is a bounds test per run, and the brush is drawn under the marks so a selected point
 * still reads on its own tint. Nothing here is measured after a style write, and no part moves
 * when the counts change: the tracks hold their length and only their fills do (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 296px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Run explorer</span>
          <span
            class="sp-label"
            data-part="readout"
            data-count="${RUNS.length}"
            role="status"
            style="font-size: 12px; color: var(--sp-ink); font-variant-numeric: tabular-nums; white-space: nowrap"
          >${RUNS.length} of ${RUNS.length} runs</span>
          <button
            class="sp-button sp-button--ghost sp-button--sm"
            data-part="clear"
            type="button"
            style="font-size: 12px; padding: 4px 10px"
          >Clear brush</button>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 8px 12px">
          <div class="sp-surface" style="flex: 0 0 auto; padding: 6px 8px">
            <div
              data-part="plot"
              style="position: relative; width: ${PLOT_W}px; height: ${PLOT_H}px; touch-action: none; user-select: none"
            >
              <span
                data-part="brush"
                data-subject
                style="position: absolute; left: 0; top: 0; width: 0; height: 0; opacity: 0;
                       border: ${RULE}px solid var(--sp-accent); border-radius: 3px; background: var(--sp-accent-soft);
                       transition: opacity 0.12s linear; pointer-events: none"
              ></span>
              <svg
                role="img"
                aria-label="Twenty eight runs plotted by latency and memory"
                viewBox="0 0 ${PLOT_W} ${PLOT_H}"
                width="${PLOT_W}"
                height="${PLOT_H}"
                style="position: relative; z-index: 1; display: block"
              >
                <line x1="${LEFT}" y1="${BASE}" x2="${PLOT_W - RIGHT}" y2="${BASE}" stroke="var(--sp-line)" stroke-width="${RULE}" />
                <line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BASE}" stroke="var(--sp-line)" stroke-width="${RULE}" />
                <text x="${LEFT + 5}" y="${TOP + 8}" fill="var(--sp-muted)" font-size="9">MB</text>
                ${tickY}
                ${tickX}
                ${dots}
              </svg>
              ${aim('brush-start', START)}
              ${aim('brush-end', END)}
            </div>
          </div>

          <div class="sp-surface" style="flex: 0 0 auto; width: ${PLOT_W + 18}px; padding: 6px 8px">
            <div class="sp-row sp-row--between" style="height: 15px">
              <span class="sp-label" style="font-size: 11px">Brushed runs per service</span>
              <span
                class="sp-label"
                data-part="range"
                style="width: 250px; font-size: 11px; text-align: right; white-space: nowrap; overflow: hidden"
              >No brush: every run is in view</span>
            </div>
            <div class="sp-stack" style="gap: 3px; margin-top: 4px">
              ${SERVICES.map(row).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const plot = part(root, 'plot');
  const brush = part(root, 'brush');
  const readout = part(root, 'readout');
  const range = part(root, 'range');
  const marks = RUNS.map((run) => ({ run, el: part(root, `dot-${run.key}`) }));
  const bars = SERVICES.map(({ key }) => ({
    key,
    total: total(key),
    bar: part(root, `bar-${key}`),
    count: part(root, `count-${key}`),
  }));

  let origin: { x: number; y: number } | undefined;
  let box: Box | undefined;

  const paint = () => {
    const current = box;
    const hits = current ? RUNS.filter((run) => inside(run, current)) : RUNS;
    const caught = new Set(hits.map((run) => run.key));
    for (const mark of marks) {
      const on = caught.has(mark.run.key);
      flag(mark.el, 'data-in', on);
      // Outside the brush a run is dimmed, never removed: the shape the whole set made is
      // the context that makes the brushed part mean anything.
      mark.el.style.fill = on ? 'var(--sp-accent)' : 'var(--sp-muted)';
      mark.el.style.opacity = on ? '1' : '0.45';
    }
    for (const entry of bars) {
      const n = hits.filter((run) => run.service === entry.key).length;
      entry.bar.style.setProperty('--sp-value', `${((n / entry.total) * 100).toFixed(1)}%`);
      entry.count.dataset.hits = String(n);
      entry.count.textContent = `${n} / ${entry.total}`;
    }
    readout.dataset.count = String(hits.length);
    readout.textContent = `${hits.length} of ${RUNS.length} runs`;
    range.textContent = current
      ? `Latency ${toLat(current.x1)} to ${toLat(current.x2)} ms, memory ${toMem(current.y2)} to ${toMem(current.y1)} MB`
      : 'No brush: every run is in view';
  };

  const draw = (next: Box) => {
    brush.style.left = `${next.x1.toFixed(1)}px`;
    brush.style.top = `${next.y1.toFixed(1)}px`;
    brush.style.width = `${(next.x2 - next.x1).toFixed(1)}px`;
    brush.style.height = `${(next.y2 - next.y1).toFixed(1)}px`;
    brush.style.opacity = '1';
  };

  const at = (event: PointerEvent) => {
    const point = localPoint(event, plot);
    return {
      x: clamp(point.x, LEFT, PLOT_W - RIGHT),
      y: clamp(point.y, TOP, BASE),
    };
  };

  const drop = () => {
    box = undefined;
    brush.style.opacity = '0';
  };

  plot.addEventListener('pointerdown', (event) => {
    // A real drag has to survive leaving the plot; a synthetic pointer cannot be captured.
    if (event.isTrusted) plot.setPointerCapture(event.pointerId);
    origin = at(event);
    drop();
    paint();
  });

  root.addEventListener('pointermove', (event) => {
    if (!origin) return;
    const now = at(event);
    const live: Box = {
      x1: Math.min(origin.x, now.x),
      y1: Math.min(origin.y, now.y),
      x2: Math.max(origin.x, now.x),
      y2: Math.max(origin.y, now.y),
    };
    // A press that never travels is a click, and a click clears rather than brushing nothing.
    if (live.x2 - live.x1 < MIN_BRUSH || live.y2 - live.y1 < MIN_BRUSH) drop();
    else {
      box = live;
      draw(live);
    }
    paint();
  });

  const release = () => {
    if (!origin) return;
    origin = undefined;
    // The brush outlives the hand that drew it: nothing is undrawn here, and only the
    // labelled control takes it away.
    paint();
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  part(root, 'clear').addEventListener('click', () => {
    origin = undefined;
    drop();
    paint();
  });

  paint();
}
