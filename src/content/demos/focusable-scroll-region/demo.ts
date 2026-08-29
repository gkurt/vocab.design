import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'focusable' | 'plain';

/** A build log, written out rather than generated: the same twelve rows on every run. */
const LOG = [
  '12:04:01  resolve   registry, 84 packages',
  '12:04:02  link      node_modules',
  '12:04:04  compile   src/index.ts',
  '12:04:05  compile   src/router.ts',
  '12:04:06  compile   src/kit/tokens.css',
  '12:04:08  bundle    entry chunk 41.2 kB',
  '12:04:09  bundle    vendor chunk 88.7 kB',
  '12:04:11  minify    entry chunk',
  '12:04:12  minify    vendor chunk',
  '12:04:14  emit      dist/index.html',
  '12:04:15  emit      dist/assets/app.js',
  '12:04:16  done      built in 15.4s',
];

/** The stops Tab can reach in each mode. The middle one is the whole question. */
const STOPS: Record<Mode, string[]> = {
  focusable: ['field', 'log', 'copy'],
  plain: ['field', 'copy'],
};

const WHERE: Record<string, string> = {
  field: 'Filter field',
  log: 'Log output, scrollable',
  copy: 'Copy log button',
};

const CAPTION: Record<Mode, string> = {
  focusable: 'One tabindex made the scroller a stop of its own, so the arrow keys reach the twelve lines a wheel already could.',
  plain:
    'Tab goes straight from the field to the button. Nothing inside the log is focusable, so most of its rows can never be read by keyboard.',
};

/** One arrow press worth of scroll, and the number of presses the log has room for. */
const STEP = 26;
const RUNS = 3;

/**
 * Focusable scroll region specimen: a log pane that overflows its box, under a segmented
 * control picking whether the pane carries `tabindex="0"`. The Press Tab button walks a
 * simulated ring along the stops, so the ring visibly enters the pane in one mode and steps
 * straight over it in the other, and the down arrow scrolls the pane only when the ring is
 * standing in it. That is the whole term: a box with no focusable content inside it is
 * unreachable by keyboard until it becomes a tab stop itself.
 *
 * The subject is the scroll region, the narrowest element the term names. A ring around the
 * surface would name the panel and a ring around the window would name the screen. The
 * segmented control, the filter field, the Copy log button, the tabindex badge, the readout
 * and the caption are scenery (SPEC §5). The no-tabindex state is the counter-example, so
 * the honest condition lives in `data-pose` and the mount state satisfies it: identify
 * refuses to ring a pane that is not a stop and plays on (SPEC §6).
 *
 * The ring is `data-sim-focus` and nothing here calls `.focus()`: attract never moves real
 * focus (SPEC §7). Tab is a button for the same reason, since the player's own Tab would
 * walk every focusable element in the root. The walk clamps at the last stop and each
 * segment reaches its own mode rather than toggling (SPEC §8). Both modes hold the same
 * boxes at the same sizes, so switching repaints and moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const rows = LOG.map(
    (line) => `<div class="sp-text" style="font-size: 10.5px; line-height: 1.45; white-space: nowrap">${line}</div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <sp-segmented class="sp-segmented" data-part="segmented" data-axis="Log pane" data-term="focusable" data-value="focusable" style="margin-left: auto">
            <button class="sp-segment" data-part="seg-focusable" value="focusable">Focusable</button>
            <button class="sp-segment" data-part="seg-plain" value="plain">Not focusable</button>
          </sp-segmented>
        </div>

        <div class="sp-surface" style="margin-top: 8px; padding: 7px 10px">
          <div class="sp-context">
            <input class="sp-input" data-part="field" type="text" value="warn" readonly aria-label="Filter"
                   style="font-size: 12px; padding: 4px 8px" />
          </div>

          <div class="sp-scroll" data-part="log" data-subject data-pose="[data-focusable]" data-focusable
               data-scrolled="0" tabindex="0" role="region" aria-label="Build log"
               style="margin-top: 7px; height: 52px; padding: 5px 8px; background: var(--sp-sunken);
                      border: 1px solid var(--sp-line); border-radius: 6px">
            ${rows}
          </div>

          <div class="sp-row sp-row--between sp-context" style="margin-top: 7px; gap: 10px">
            <span class="sp-label" data-part="ti" data-ti="0" style="flex: 0 0 auto; font-size: 10px; white-space: nowrap">tabindex="0"</span>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="copy">Copy log</button>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; gap: 10px">
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="tab">Press Tab</button>
          <span class="sp-text sp-text--ink" data-part="where" data-at="field"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">${WHERE.field}</span>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-mode="focusable"
           style="margin: 6px 0 0; height: 34px; font-size: 11px">${CAPTION.focusable}</p>
      </div>
    </div>
  `;

  const log = part(root, 'log');
  const field = part(root, 'field');
  const copy = part(root, 'copy');
  const ti = part(root, 'ti');
  const where = part(root, 'where');
  const caption = part(root, 'caption');

  let mode: Mode = 'focusable';
  let at = 0;
  let run = 0;

  const paint = () => {
    const stops = STOPS[mode];
    const here = stops[at] ?? stops[0] ?? 'field';

    flag(field, 'data-sim-focus', here === 'field');
    flag(log, 'data-sim-focus', here === 'log');
    flag(copy, 'data-sim-focus', here === 'copy');

    where.dataset.at = here;
    where.textContent = WHERE[here] ?? '';
  };

  const apply = (next: Mode) => {
    mode = next;
    at = 0;
    run = 0;
    log.scrollTop = 0;
    log.dataset.scrolled = '0';

    const on = next === 'focusable';
    flag(log, 'data-focusable', on);
    // The attribute is the technique itself, so it is set for real rather than described.
    if (on) log.tabIndex = 0;
    else log.removeAttribute('tabindex');
    ti.dataset.ti = on ? '0' : 'none';
    ti.textContent = on ? 'tabindex="0"' : 'no tabindex';
    caption.dataset.mode = next;
    caption.textContent = CAPTION[next];
    paint();
  };

  apply('focusable');

  // The walk clamps at the last stop, so a pass joined halfway proves the same route.
  part(root, 'tab').addEventListener('click', () => {
    at = Math.min(at + 1, STOPS[mode].length - 1);
    paint();
  });

  // The arrow key is the region's own scrolling, and it only means anything once the ring
  // is standing in the region. The keydown arrives on the pane the ghost cursor is over.
  log.addEventListener('keydown', (event) => {
    const key = (event as KeyboardEvent).key;
    if (key !== 'ArrowDown' && key !== 'ArrowUp') return;
    if (STOPS[mode][at] !== 'log') return;
    event.preventDefault();
    run = Math.min(Math.max(run + (key === 'ArrowDown' ? 1 : -1), 0), RUNS);
    log.scrollTop = run * STEP;
    log.dataset.scrolled = String(run);
  });

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Mode);
  });
}
