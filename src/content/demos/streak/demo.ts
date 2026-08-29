import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Twelve days of the window the reader can see; the count behind them is longer. */
const DAYS = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

interface State {
  count: string;
  caption: string;
  status: string;
  /** How the last square is drawn: the one square the three states disagree about. */
  last: 'kept' | 'missed' | 'frozen';
  freezes: string;
  note: string;
}

const STATES: Record<string, State> = {
  kept: {
    count: '18',
    caption: 'day streak',
    status: 'Kept every day since 28 February',
    last: 'kept',
    freezes: '2 freezes left',
    note: 'Eighteen consecutive days, and the number is the whole reward. It costs nothing to build and everything to lose, which is what makes it work.',
  },
  missed: {
    count: '0',
    caption: 'day streak',
    status: 'Missed 17 March, so the count starts again',
    last: 'missed',
    freezes: '2 freezes left',
    note: 'One missed square and the count is zero. Nothing else changed: the same practice, the same eighteen days behind it, and a counter that now says none of them happened.',
  },
  frozen: {
    count: '18',
    caption: 'day streak',
    status: 'A freeze absorbed 17 March',
    last: 'frozen',
    freezes: '1 freeze left',
    note: 'A freeze absorbs the miss and the count holds. Given away, that is mercy. Sold, it is a fee for relief from a loss the mechanic invented.',
  },
};

const START = 'kept';

/** Paint for the one square the states disagree about. The kit has one accent; the warn
    hue is what a measurement turns when it is running out, which is what a miss is. */
const LAST_STYLE = {
  kept: '',
  missed: 'box-shadow: inset 0 0 0 2px var(--sp-warn); color: var(--sp-warn)',
  frozen: 'border: 2px dashed var(--sp-accent); color: var(--sp-accent)',
} as const;

/**
 * Streak specimen: a twelve day window of squares under a counter, run through the three
 * states the mechanic has. Every day kept and the counter reads eighteen; one square missed
 * and the identical history reads zero; the same miss absorbed by a freeze and it reads
 * eighteen again, one token poorer.
 *
 * The subject is the counter, the narrowest element the term names: the squares are the
 * evidence it is counting and the picker, the topbar and the note are the scene around it.
 * A counter reading zero is still honestly a streak counter (losing it is half the term), so
 * there is no `data-pose` to satisfy and identify may ring it at any point in the pass.
 *
 * The squares stay apparatus rather than scenery, out of the context register for the reason
 * a chart's legend is: dimming their accent would erase the difference the specimen exists to
 * show. The counter box, the status line and the token line are all fixed width with tabular
 * figures, so a count of 18 and a count of 0 occupy the same room (SPEC §5), and each segment
 * names an absolute state rather than flipping the one it finds (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const first = STATES[START] as State;

  const squares = DAYS.map((day, i) => {
    const isLast = i === DAYS.length - 1;
    const partName = isLast ? 'day-last' : `day-${day}`;
    const state = isLast ? first.last : 'kept';
    return `<span
        class="sp-day"
        data-part="${partName}"
        data-state="${state}"
        ${state === 'kept' ? 'data-selected' : ''}
        style="cursor: default; font-weight: 500; ${isLast ? LAST_STYLE[first.last] : ''}"
      >${day}</span>`;
  }).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 246px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Daily practice</span>
          <sp-segmented class="sp-segmented" data-axis="History" data-part="state" data-value="${START}">
            <button class="sp-segment" type="button" data-part="state-kept" value="kept" style="padding: 5px 9px; font-size: 12px">Kept</button>
            <button class="sp-segment" type="button" data-part="state-missed" value="missed" style="padding: 5px 9px; font-size: 12px">Missed a day</button>
            <button class="sp-segment" type="button" data-part="state-frozen" value="frozen" style="padding: 5px 9px; font-size: 12px">Freeze used</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center">
          <div class="sp-surface" style="padding: 14px 14px 16px">
            <div class="sp-row sp-row--between" style="align-items: flex-end">
              <span class="sp-row" data-part="count" data-subject data-mode="${START}" style="gap: 8px; align-items: baseline">
                <span
                  data-part="count-value"
                  style="min-width: 52px; font-size: 38px; font-weight: 600; line-height: 1; font-variant-numeric: tabular-nums"
                >${first.count}</span>
                <span class="sp-label" style="font-size: 12px">${first.caption}</span>
              </span>
              <span class="sp-label" data-part="freezes" style="width: 104px; text-align: right; font-size: 11px">${first.freezes}</span>
            </div>
            <div class="sp-row" data-part="strip" style="gap: 6px; margin-top: 14px">${squares}</div>
            <div class="sp-row sp-row--between" style="height: 16px; margin-top: 10px">
              <span class="sp-label" style="font-size: 11px">6 to 17 March</span>
              <span class="sp-label" data-part="status" style="font-size: 11px; color: var(--sp-ink)">${first.status}</span>
            </div>
          </div>
        </div>
      </div>
      <span class="sp-text sp-context" data-part="note" style="width: 452px; height: 32px; font-size: 11px">${first.note}</span>
    </div>
  `;

  const counter = part(root, 'count');
  const value = part(root, 'count-value');
  const last = part(root, 'day-last');
  const status = part(root, 'status');
  const freezes = part(root, 'freezes');
  const note = part(root, 'note');

  const show = (name: string) => {
    const state = STATES[name];
    if (!state) return;
    counter.dataset.mode = name;
    value.textContent = state.count;
    status.textContent = state.status;
    freezes.textContent = state.freezes;
    note.textContent = state.note;
    last.dataset.state = state.last;
    last.toggleAttribute('data-selected', state.last === 'kept');
    last.setAttribute('style', `cursor: default; font-weight: 500; ${LAST_STYLE[state.last]}`);
  };

  part(root, 'state').addEventListener('change', (event) => show((event as CustomEvent<string>).detail));
}
