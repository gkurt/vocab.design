const W = 90;
const H = 22;
const PAD = 3;
/** One shared domain for every row, which is what makes the flat row honestly flat. */
const LO = 0;
const HI = 100;

type Series = { key: string; label: string; value: string; delta: string; points: number[] };

const ROWS: Series[] = [
  {
    key: 'sessions',
    label: 'Sessions',
    value: '94k',
    delta: '+18%',
    points: [38, 41, 39, 44, 48, 45, 52, 50, 57, 55, 61, 64, 60, 68, 71, 67, 74, 78, 75, 82, 86, 83, 90, 94],
  },
  {
    key: 'latency',
    label: 'Latency',
    value: '29 ms',
    delta: '2 spikes',
    points: [28, 31, 29, 33, 30, 88, 34, 29, 32, 30, 35, 31, 28, 33, 96, 37, 30, 29, 34, 31, 27, 33, 30, 29],
  },
  {
    key: 'errors',
    label: 'Errors',
    value: '4',
    delta: 'steady',
    points: [4, 5, 4, 4, 5, 4, 4, 4, 5, 4, 4, 5, 4, 4, 4, 5, 4, 4, 4, 4, 5, 4, 4, 4],
  },
  {
    key: 'signups',
    label: 'Signups',
    value: '76',
    delta: 'recovered',
    points: [62, 60, 58, 55, 50, 44, 38, 33, 29, 26, 25, 27, 31, 36, 42, 49, 55, 60, 64, 67, 70, 72, 74, 76],
  },
];

const at = (points: number[], index: number) => {
  const span = points.length - 1;
  const x = PAD + (index / span) * (W - PAD * 2);
  const share = (Math.min(HI, Math.max(LO, points[index] ?? LO)) - LO) / (HI - LO);
  return { x, y: H - PAD - share * (H - PAD * 2) };
};

/** The whole chart: a polyline and one dot, no axis, no tick, no label. */
const spark = (row: Series, subject: boolean) => {
  const line: string[] = [];
  for (let index = 0; index < row.points.length; index += 1) {
    const { x, y } = at(row.points, index);
    line.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const last = at(row.points, row.points.length - 1);
  return `
    <svg
      class="${subject ? '' : 'sp-context'}"
      data-part="spark-${row.key}"
      ${subject ? 'data-subject' : ''}
      viewBox="0 0 ${W} ${H}"
      width="${W}"
      height="${H}"
      role="img"
      aria-label="${row.label} over the last 30 days"
      style="display: block; flex: 0 0 auto; overflow: visible; color: var(--sp-accent)"
    >
      <polyline points="${line.join(' ')}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" />
      <circle cx="${last.x.toFixed(1)}" cy="${last.y.toFixed(1)}" r="2.1" fill="currentColor" />
    </svg>`;
};

/**
 * Sparkline specimen: a metrics panel where each row carries its trend as a
 * word-sized graphic beside the number it belongs to. The subject is one sparkline,
 * the Sessions line, and not the row or the panel: the term names the drawing, and a
 * row without it is just a label and a figure.
 *
 * The other three lines are scenery, so they carry the context register and go
 * chroma-free while the subject keeps the kit accent. Nothing here answers a pointer,
 * because nothing about a sparkline should: a tiny chart that needs a tooltip on
 * every point has stopped being one, which is the article's own line.
 *
 * All four rows are drawn against one shared domain rather than each against its own
 * range, which is why the flat row reads flat instead of filling its box with noise.
 */
export function mount(root: HTMLElement): void {
  const rows = ROWS.map(
    (row) => `
      <div class="sp-row" data-part="row-${row.key}" style="gap: 12px; height: 34px">
        <span class="sp-text sp-text--ink sp-context sp-grow" data-part="label-${row.key}">${row.label}</span>
        ${spark(row, row.key === 'sessions')}
        <span
          class="sp-text sp-text--ink sp-context"
          data-part="value-${row.key}"
          style="width: 54px; text-align: right; font-weight: 600; font-variant-numeric: tabular-nums"
        >${row.value}</span>
        <span class="sp-text sp-context" data-part="delta-${row.key}" style="width: 62px; text-align: right; font-size: 12px">${row.delta}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Traffic</span>
          <span class="sp-label">Last 30 days</span>
        </div>
        <div class="sp-body">
          <div class="sp-surface sp-stack" data-part="panel" style="gap: 0; padding: 6px 12px">${rows}</div>
          <p class="sp-text sp-context" data-part="caption" style="margin: 10px 2px 0; font-size: 12px">
            One shared range across all four rows, so a flat line means flat.
          </p>
        </div>
      </div>
    </div>
  `;
}
