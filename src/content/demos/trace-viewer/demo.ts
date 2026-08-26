import { flag, part } from '#src/kit/parts.ts';

type Span = { key: string; name: string; service: keyof typeof SERVICE; depth: number; start: number; dur: number };

/**
 * Colour by service is the term's own claim (a run of one hue is how a reader sees that
 * one system was called repeatedly), so the hues are painted here rather than taken from
 * the kit, which has a single accent on purpose. They are chosen to read against both the
 * light and the dark surface.
 */
const SERVICE = {
  gateway: '#6f7bdc',
  auth: '#a06ee0',
  cart: '#2f9560',
  pricing: '#b8762f',
  inventory: '#2b8a9e',
} as const;

/** The whole request, and the axis every bar is measured against. */
const TOTAL = 420;

const SPANS: Span[] = [
  { key: 'root', name: 'GET /checkout', service: 'gateway', depth: 0, start: 0, dur: 420 },
  { key: 'auth', name: 'auth.verify', service: 'auth', depth: 1, start: 6, dur: 34 },
  { key: 'cart', name: 'cart.load', service: 'cart', depth: 1, start: 44, dur: 52 },
  { key: 'price', name: 'pricing.quote', service: 'pricing', depth: 1, start: 100, dur: 52 },
  { key: 'inv', name: 'inventory.check', service: 'inventory', depth: 1, start: 250, dur: 162 },
  { key: 'db', name: 'db.query', service: 'inventory', depth: 2, start: 262, dur: 138 },
];

const TICKS = [0, 100, 200, 300, 400];
const ROW_H = 22;
const LABEL_W = 150;

/** The idle stretch between the third child ending and the fourth starting. */
const GAP = { start: 152, end: 250 };

const pct = (ms: number) => `${((ms / TOTAL) * 100).toFixed(3)}%`;

function row(span: Span): string {
  const subject = span.key === 'inv' ? ' data-subject' : '';
  const gap =
    span.key === 'inv'
      ? `<span
           data-part="gap"
           style="position: absolute; left: ${pct(GAP.start)}; width: ${pct(GAP.end - GAP.start)}; top: 4px; height: 14px;
                  display: flex; align-items: center; justify-content: center; border: 1px dashed var(--sp-line);
                  border-radius: 3px; font-size: 9px; color: var(--sp-muted)"
         >98 ms</span>`
      : '';

  return `
    <button
      type="button"
      data-part="row-${span.key}"
      style="display: flex; align-items: center; gap: 8px; width: 100%; height: ${ROW_H}px; padding: 0 4px; margin: 0;
             border: 0; border-radius: 4px; background: transparent; color: inherit; font: inherit; text-align: left; cursor: pointer"
    >
      <span style="display: flex; align-items: center; gap: 6px; flex: 0 0 auto; width: ${LABEL_W}px; padding-left: ${span.depth * 10}px">
        <span aria-hidden="true" style="flex: 0 0 auto; width: 7px; height: 7px; border-radius: 50%; background: ${SERVICE[span.service]}"></span>
        <span style="flex: 1 1 auto; min-width: 0; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${span.name}</span>
        <span class="sp-label" style="flex: 0 0 auto; width: 36px; font-size: 10px; text-align: right">${span.dur} ms</span>
      </span>
      <span style="position: relative; flex: 1 1 auto; height: ${ROW_H}px">
        ${gap}
        <span
          data-part="bar-${span.key}"${subject}
          style="position: absolute; left: ${pct(span.start)}; width: ${pct(span.dur)}; top: 6px; height: 10px;
                 border-radius: 3px; background: ${SERVICE[span.service]}"
        ></span>
      </span>
    </button>`;
}

/**
 * Trace viewer specimen: one checkout request drawn as six spans on a single 420 ms
 * axis, each indented under the span that called it and coloured by the service that
 * ran it. One child takes 162 ms of the 420, and the empty stretch before it is marked,
 * because a gap is a finding too.
 *
 * The subject is that one long bar, not the waterfall: the peers around it are what
 * makes it long, so ringing the whole picture would identify the comparison rather than
 * the term's own mark. It is a span bar in every state the script visits, so no
 * `data-pose` condition is needed.
 *
 * Selecting a span is absolute rather than a toggle (SPEC §8): each row names itself,
 * and the detail panel below holds its height from mount, so filling it moves nothing.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 292px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Trace 4f1c9a</span>
          <span class="sp-label" style="font-size: 11px">GET /checkout &middot; 420 ms</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center; gap: 10px; padding: 12px">
          <div class="sp-surface" data-part="waterfall" style="padding: 6px 10px 8px">
            <div style="position: relative; display: flex; align-items: flex-end; gap: 8px; height: 16px; border-bottom: 1px solid var(--sp-line)">
              <span class="sp-label" style="flex: 0 0 auto; width: ${LABEL_W}px; font-size: 10px">6 spans</span>
              <span data-part="axis" style="position: relative; flex: 1 1 auto; height: 14px">
                ${TICKS.map((t, i) => {
                  const shift = i === 0 ? '0' : i === TICKS.length - 1 ? '-100%' : '-50%';
                  return `<span style="position: absolute; left: ${pct(t)}; bottom: 0; transform: translateX(${shift}); font-size: 9px; color: var(--sp-muted)">${t}</span>`;
                }).join('')}
              </span>
            </div>
            <div data-part="rows" style="padding-top: 4px">${SPANS.map(row).join('')}</div>
          </div>

          <div class="sp-surface" data-part="detail" data-span="root" style="flex: 0 0 auto; height: 58px; padding: 8px 10px">
            <div class="sp-row" style="gap: 6px">
              <span data-part="detail-dot" aria-hidden="true" style="flex: 0 0 auto; width: 7px; height: 7px; border-radius: 50%; background: ${SERVICE.gateway}"></span>
              <span class="sp-text sp-text--ink sp-grow" data-part="detail-name" style="font-size: 12px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">GET /checkout</span>
            </div>
            <div class="sp-row" style="gap: 16px; margin-top: 6px">
              <span class="sp-label" style="font-size: 10px">service <span data-part="detail-service" style="color: var(--sp-ink)">gateway</span></span>
              <span class="sp-label" style="font-size: 10px">start <span data-part="detail-start" style="color: var(--sp-ink)">0 ms</span></span>
              <span class="sp-label" style="font-size: 10px">duration <span data-part="detail-dur" style="color: var(--sp-ink)">420 ms</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const detail = part(root, 'detail');
  const dot = part(root, 'detail-dot');
  const name = part(root, 'detail-name');
  const service = part(root, 'detail-service');
  const start = part(root, 'detail-start');
  const dur = part(root, 'detail-dur');

  const select = (span: Span) => {
    detail.dataset.span = span.key;
    dot.style.background = SERVICE[span.service];
    name.textContent = span.name;
    service.textContent = span.service;
    start.textContent = `${span.start} ms`;
    dur.textContent = `${span.dur} ms`;
    for (const span2 of SPANS) {
      const el = part(root, `row-${span2.key}`);
      const on = span2.key === span.key;
      flag(el, 'data-selected', on);
      el.style.background = on ? 'var(--sp-accent-soft)' : 'transparent';
    }
  };

  for (const span of SPANS) {
    part(root, `row-${span.key}`).addEventListener('click', () => select(span));
  }

  // The root is selected from mount, so the detail panel is never empty and never
  // changes size when another span takes its place (SPEC §5).
  select(SPANS[0] as Span);
}
