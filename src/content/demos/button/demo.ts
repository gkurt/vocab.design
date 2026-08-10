import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const WORK_MS = 1100;

const IDLE_LABEL = 'Publish';
const BUSY_LABEL = 'Publishing…';

const RESULTS = {
  idle: 'Draft, not published yet',
  working: 'Sending 4 changes',
  done: 'Published to the changelog',
  scheduled: 'Scheduled for Monday, 9:00',
} as const;

type Result = keyof typeof RESULTS;

/**
 * Button specimen: one control that runs an action, and a scene that shows the
 * action happening. Idle to working to published is the whole of the term, since
 * a button is judged by what follows the press rather than by how it is drawn.
 *
 * The subject is the control itself, not the row: the ghost and quiet buttons
 * beside it are the emphasis scale it sits in, and scenery is where they belong.
 *
 * Two things are given their room at mount (SPEC §5). The control is held at the
 * width of its longest label, so the busy state cannot resize the thing under the
 * pointer, and the result line keeps the height of its longest message, so the
 * outcome arrives without walking the buttons up the window.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 320px">
        <div class="sp-context">
          <div class="sp-heading">Release notes</div>
          <div class="sp-text" style="margin-top: 4px">4 changes since the last publish</div>
        </div>
        <div class="sp-row" style="margin-top: 16px">
          <button class="sp-button" type="button" data-part="publish" data-state="idle" data-subject>${IDLE_LABEL}</button>
          <span class="sp-row sp-context">
            <button class="sp-button sp-button--ghost" type="button" data-part="schedule">Schedule</button>
            <button class="sp-button sp-button--quiet" type="button" data-part="discard">Discard</button>
          </span>
        </div>
        <div class="sp-context" data-part="result-slot" style="margin-top: 14px">
          <span class="sp-text" data-part="result" data-state="idle" role="status">${RESULTS.idle}</span>
        </div>
      </div>
    </div>
  `;

  const publish = part(root, 'publish');
  const slot = part(root, 'result-slot');
  const result = part(root, 'result');

  let width = 0;
  for (const label of [IDLE_LABEL, BUSY_LABEL]) {
    publish.textContent = label;
    width = Math.max(width, publish.offsetWidth);
  }
  publish.style.minWidth = `${width}px`;
  publish.textContent = IDLE_LABEL;

  let height = 0;
  for (const text of Object.values(RESULTS)) {
    result.textContent = text;
    height = Math.max(height, slot.offsetHeight);
  }
  slot.style.height = `${height}px`;
  result.textContent = RESULTS.idle;

  const report = (state: Result) => {
    result.dataset.state = state;
    result.textContent = RESULTS[state];
    result.className = state === 'working' ? 'sp-text sp-pending' : 'sp-text';
  };

  let busy = false;
  let timer: number | undefined;

  publish.addEventListener('click', () => {
    if (busy) return;
    busy = true;
    publish.dataset.state = 'busy';
    publish.setAttribute('aria-busy', 'true');
    publish.textContent = BUSY_LABEL;
    report('working');
    clock.clearTimeout(timer);
    timer = clock.setTimeout(() => {
      busy = false;
      publish.dataset.state = 'idle';
      publish.removeAttribute('aria-busy');
      publish.textContent = IDLE_LABEL;
      report('done');
    }, WORK_MS);
  });

  // The other two are scenery, but a dead control would be a lie about the term:
  // every button in the row is labelled with the thing it does, and does it.
  part(root, 'schedule').addEventListener('click', () => {
    if (!busy) report('scheduled');
  });
  part(root, 'discard').addEventListener('click', () => {
    if (!busy) report('idle');
  });
}
