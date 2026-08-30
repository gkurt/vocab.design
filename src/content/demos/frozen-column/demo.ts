import { part } from '#src/kit/parts.ts';

/** The held column's width, and the width of each week that passes underneath it. */
const NAME_WIDTH = 116;
/* Sized so four weeks fill the region exactly: the ends of the travel land on a column
   boundary rather than cutting one in half. */
const WEEK_WIDTH = 83;
const WEEKS = 10;

const BERTHS = [
  { name: 'A1 Kestrel', pattern: 'LLLHFFLLLH' },
  { name: 'A2 Curlew', pattern: 'FLLLLLMMLL' },
  { name: 'B4 Gannet', pattern: 'LLMMLLLLFF' },
  { name: 'B7 Petrel', pattern: 'HHLLLLLLLM' },
  { name: 'C2 Shearwater', pattern: 'LLLLFFFFLL' },
  { name: 'C6 Fulmar', pattern: 'MLLLLHHLLL' },
];

const STATUS: Record<string, string> = { L: 'Let', F: 'Free', H: 'Held', M: 'Maint' };

/**
 * Frozen column specimen: a berth register ten weeks wider than its region, scrolled
 * sideways while the berth column stays against the leading edge.
 *
 * The frozen column has no element of its own in table markup, so the demo draws one: the
 * band at `data-part="frozen"` traces the held column's exact extent, header included, and
 * carries the freeze boundary at its trailing edge, which is the rule a spreadsheet draws in
 * the same place. That band is the subject, not the table it sits over (SPEC §5).
 *
 * A caption under the frame read "Ten weeks pass under the berth column, and the berth
 * column does not move." The scroll shows that and the article says it, so it went; the
 * topbar readout still names the weeks on screen, which is a thing the register reports.
 *
 * The claim is measured rather than implied. On every scroll the demo compares the left edge
 * of a berth cell with the left edge of the scrolling region and publishes `data-held`: with
 * the stickiness gone, the same script would drive the column out of the region and the
 * attribute would read `no`. `data-at` reports how far the weeks have travelled, so an assert
 * can prove the rest of the table moved while the held column did not. Both are read from
 * live layout during a scroll, never after a style write (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const weeks = Array.from({ length: WEEKS }, (_, i) => i + 1);

  const head = weeks
    .map((week) => `<th data-part="head-w${week}" style="width: ${WEEK_WIDTH}px; min-width: ${WEEK_WIDTH}px">Week ${week}</th>`)
    .join('');

  const body = BERTHS.map((berth, row) => {
    const stripe = row % 2 === 0 ? 'var(--sp-surface)' : 'var(--sp-sunken)';
    const cells = weeks
      .map(
        (week) =>
          `<td data-part="cell-${row + 1}-w${week}" style="width: ${WEEK_WIDTH}px; min-width: ${WEEK_WIDTH}px; color: var(--sp-muted)">${STATUS[berth.pattern[week - 1] ?? 'L']}</td>`,
      )
      .join('');
    return `
      <tr style="background: ${stripe}">
        <td
          data-part="name-${row + 1}"
          style="position: sticky; left: 0; z-index: 1; width: ${NAME_WIDTH}px; min-width: ${NAME_WIDTH}px;
                 background: ${stripe}; font-weight: 500"
        >${berth.name}</td>
        ${cells}
      </tr>`;
  }).join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 248px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Berth register</span>
          <span class="sp-label" data-part="readout" role="status" style="flex: 0 0 auto; font-size: 11px; white-space: nowrap"></span>
        </div>

        <div class="sp-body" style="padding: 12px">
          <div style="position: relative; height: 100%; overflow: hidden; border: 1px solid var(--sp-line); border-radius: var(--sp-radius)">
            <div
              class="sp-scroll"
              data-part="scroller"
              data-at="start"
              style="height: 100%; overflow-x: auto; overflow-y: hidden; scrollbar-width: none; overscroll-behavior: contain"
            >
              <table class="sp-table" style="width: ${NAME_WIDTH + WEEKS * WEEK_WIDTH}px; border-collapse: separate; border-spacing: 0; --sp-cell-pad: 4px 10px; font-size: 12px">
                <thead>
                  <tr style="background: var(--sp-surface)">
                    <th
                      data-part="head-name"
                      style="position: sticky; left: 0; z-index: 1; width: ${NAME_WIDTH}px; min-width: ${NAME_WIDTH}px; background: var(--sp-surface)"
                    >Berth</th>
                    ${head}
                  </tr>
                </thead>
                <tbody>${body}</tbody>
              </table>
            </div>

            <div
              data-part="frozen"
              data-subject
              data-held="yes"
              aria-hidden="true"
              style="position: absolute; top: 0; bottom: 0; left: 0; z-index: 2; width: ${NAME_WIDTH}px; pointer-events: none;
                     background: color-mix(in srgb, var(--sp-accent) 10%, transparent);
                     border-right: 2px solid var(--sp-accent)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const scroller = part(root, 'scroller');
  const frozen = part(root, 'frozen');
  const readout = part(root, 'readout');
  const firstName = part(root, 'name-1');

  const report = () => {
    const travel = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);
    const ratio = travel > 0 ? scroller.scrollLeft / travel : 0;
    scroller.dataset.at = ratio < 0.08 ? 'start' : ratio > 0.92 ? 'end' : 'mid';
    // The claim itself: is the held cell still against the leading edge of the region?
    const drift = firstName.getBoundingClientRect().left - scroller.getBoundingClientRect().left;
    frozen.dataset.held = Math.abs(drift) < 2 ? 'yes' : 'no';
    const first = Math.min(Math.ceil(scroller.scrollLeft / WEEK_WIDTH) + 1, WEEKS);
    const last = Math.min(first + Math.floor((scroller.clientWidth - NAME_WIDTH) / WEEK_WIDTH) - 1, WEEKS);
    readout.textContent = `Weeks ${first} to ${last} on screen`;
  };

  scroller.addEventListener('scroll', report);

  report();
}
