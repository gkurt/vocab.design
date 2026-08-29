import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const RANGES: Record<string, { label: string; bars: number[] }> = {
  day: { label: 'Today, hour by hour', bars: [30, 46, 38, 62, 54, 70, 44, 58] },
  week: { label: 'This week, by day', bars: [52, 38, 64, 48, 72, 34, 58, 66] },
  month: { label: 'This month, by week', bars: [40, 68, 50, 74, 36, 60, 46, 56] },
};

/**
 * Segmented control specimen: every option visible at once, exactly one chosen,
 * the choice reading as a position rather than a list. Picking a range redraws
 * the chart behind it, which is what makes the control worth having.
 */
export function mount(root: HTMLElement): void {
  const bars = (values: number[]) =>
    values.map((v) => `<span style="flex: 1; height: ${v}px; border-radius: 3px 3px 0 0; background: var(--sp-line)"></span>`).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 340px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-heading">Revenue</span>
          <span class="sp-text" data-part="readout">${RANGES.week?.label}</span>
        </div>
        <sp-segmented class="sp-segmented" data-part="segmented" data-subject data-axis="Range" data-value="week" style="margin-top: 12px; width: 100%">
          <button class="sp-segment sp-grow" data-part="seg-day" value="day">Day</button>
          <button class="sp-segment sp-grow" data-part="seg-week" value="week">Week</button>
          <button class="sp-segment sp-grow" data-part="seg-month" value="month">Month</button>
        </sp-segmented>
        <div class="sp-row sp-context" data-part="chart" style="align-items: flex-end; gap: 6px; height: 76px; margin-top: 14px">
          ${bars(RANGES.week?.bars ?? [])}
        </div>
      </div>
    </div>
  `;

  const chart = part(root, 'chart');
  const readout = part(root, 'readout');
  part(root, 'segmented').addEventListener('change', (event) => {
    const range = RANGES[(event as CustomEvent<string>).detail];
    if (!range) return;
    chart.innerHTML = bars(range.bars);
    readout.textContent = range.label;
  });
}
