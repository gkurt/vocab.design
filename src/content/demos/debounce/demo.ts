import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/**
 * Longer than a real typeahead would use (200 to 300 ms is the usual compromise),
 * because the wait itself is what there is to look at here.
 */
const DELAY_MS = 700;
const LOG_HEIGHT = 76;

const PANEL = 'display: flex; flex-direction: column; gap: 6px; flex: 1 1 0; padding: 8px 10px';

/**
 * Debounce specimen: one field, two listeners on it, and a log each. The eager
 * listener answers every keystroke; the debounced one restarts its wait on each and
 * answers once, with the value the burst ended on. The subject is the debounced log,
 * since that panel is the only place the technique is visible: the field is shared
 * by both listeners and belongs to neither.
 *
 * The counters are not requests. They are drawings of requests, since a specimen
 * makes no network calls (SPEC §5), and the wait is measured on the clock the stage
 * hands the demo so a pose cannot let it fire mid-inspection (SPEC §6).
 *
 * The title bar used to carry "One field, two listeners", which is the setup described
 * rather than anything a search page prints. The two panel titles do that job already,
 * and they stay: "Every keystroke" and "Debounced 700 ms" are what a request log labels
 * its own lanes.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const panel = (key: string, title: string, subject: boolean) => `
    <div class="sp-surface${subject ? '' : ' sp-context'}" data-part="${key}" data-fired="0"${subject ? ' data-subject' : ''} style="${PANEL}">
      <div class="sp-row sp-row--between">
        <span class="sp-label">${title}</span>
        <span class="sp-text" data-part="count-${key}" style="width: 62px; text-align: right">0 calls</span>
      </div>
      <div class="sp-scroll sp-stack" data-part="log-${key}" style="height: ${LOG_HEIGHT}px; gap: 3px"></div>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 258px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Search cities</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 12px">
          <div class="sp-row sp-context" style="gap: 8px">
            ${icon('search')}
            <input class="sp-input" data-part="query" type="text" aria-label="Search cities" placeholder="Type a city" />
          </div>
          <div class="sp-row" style="align-items: stretch; gap: 10px">
            ${panel('eager', 'Every keystroke', false)}
            ${panel('debounced', `Debounced ${DELAY_MS} ms`, true)}
          </div>
        </div>
      </div>
    </div>
  `;

  const query = part(root, 'query') as HTMLInputElement;
  let pending: number | undefined;

  const record = (key: string, value: string) => {
    const panelEl = part(root, key);
    const fired = Number(panelEl.dataset.fired ?? '0') + 1;
    panelEl.dataset.fired = String(fired);
    part(root, `count-${key}`).textContent = `${fired} call${fired === 1 ? '' : 's'}`;
    const line = document.createElement('span');
    line.className = 'sp-text';
    line.style.fontSize = '12px';
    line.textContent = `q=${value}`;
    const log = part(root, `log-${key}`);
    log.append(line);
    log.scrollTop = log.scrollHeight;
  };

  query.addEventListener('input', () => {
    const value = query.value.trim();
    if (value === '') return;
    record('eager', value);
    // The whole term: the pending answer is thrown away and the wait starts over, so
    // only a gap in the typing can let one through.
    clock.clearTimeout(pending);
    pending = clock.setTimeout(() => {
      pending = undefined;
      record('debounced', value);
    }, DELAY_MS);
  });
}
