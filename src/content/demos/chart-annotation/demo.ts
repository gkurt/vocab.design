import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const W = 424;
const H = 140;
const LEFT = 34;
const RIGHT = 10;
const TOP = 14;
const BOTTOM = 20;
const PLOT_W = W - LEFT - RIGHT;
const PLOT_H = H - TOP - BOTTOM;
const BASE = TOP + PLOT_H;
/** Rules are drawn at 2px: the stage reads anything thinner as absent. */
const RULE = 2;
const MAX = 600;
const TICKS = [0, 200, 400, 600];

/** Twelve weeks of orders, with the launch landing in week seven. */
const VALUES = [180, 210, 195, 240, 260, 250, 430, 470, 455, 500, 520, 540];
const STEP = PLOT_W / (VALUES.length - 1);
const LAUNCH = 6;
const TARGET = 400;
/** The stretch the supply outage covers, in point indices. */
const SPAN_FROM = 2;
const SPAN_TO = 5;

const x = (index: number) => LEFT + index * STEP;
const y = (value: number) => BASE - (value / MAX) * PLOT_H;

const NOTE: Record<string, string> = {
  callout: 'A callout pins a finding to one mark, so the spike arrives already explained.',
  span: 'A span is the only form that can say something about a stretch of the domain.',
  reference: 'A rule across the plot answers the question a bare line cannot: compared to what.',
};

const KINDS = ['callout', 'span', 'reference'];
const START = 'callout';

/**
 * Chart annotation specimen: twelve weeks of orders drawn plainly, carrying one authored
 * note at a time, picked absolutely: a callout pinned to launch week, a highlighted span
 * across the outage, and a rule at the target.
 *
 * The subject is the annotation, `data-part="annotation"`, not the chart it is written on.
 * It is the layer rather than any one of the three notes because the term names all three
 * forms and the specimen shows them one at a time: whichever note is up, the subject is
 * exactly that note's ink and nothing else, since the two that are down carry the `hidden`
 * attribute and contribute no box. The line, the axis and the gridlines sit in the context
 * register, so the note is the only thing on the plot drawn in the accent.
 *
 * Every kind is honestly an annotation, so no pose condition is needed (SPEC §6). The
 * plot's geometry never changes, and each note is drawn inside the box the SVG already
 * occupies, so switching kind moves nothing at all (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const gridlines = TICKS.map((value) => {
    const at = y(value).toFixed(1);
    return `<line x1="${LEFT}" y1="${at}" x2="${W - RIGHT}" y2="${at}" stroke="var(--sp-line)" stroke-width="${RULE}" />`;
  }).join('');

  const tickLabels = TICKS.map(
    (value) =>
      `<text x="${LEFT - 6}" y="${(y(value) + 3).toFixed(1)}" text-anchor="end" fill="var(--sp-muted)" font-size="9">${value}</text>`,
  ).join('');

  const line = VALUES.map((value, i) => `${x(i).toFixed(1)},${y(value).toFixed(1)}`).join(' ');

  const weeks = [0, 3, 6, 9]
    .map(
      (i) => `<text x="${x(i).toFixed(1)}" y="${BASE + 14}" text-anchor="middle" fill="var(--sp-muted)" font-size="9">Wk ${i + 1}</text>`,
    )
    .join('');

  const launchX = x(LAUNCH);
  const launchY = y(VALUES[LAUNCH] ?? 0);
  const spanX = x(SPAN_FROM);
  const spanW = x(SPAN_TO) - spanX;
  const targetY = y(TARGET);

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 236px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Orders, twelve weeks</span>
          <span class="sp-label" style="font-size: 12px">Harbour Supply</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div class="sp-surface" style="width: 444px; padding: 8px 10px">
            <div class="sp-row sp-row--between sp-context" style="height: 17px">
              <span class="sp-label">Orders per week</span>
              <span class="sp-label" style="font-size: 11px">Weekly, to last Sunday</span>
            </div>

            <svg
              data-part="plot"
              role="img"
              aria-label="Weekly orders over twelve weeks, stepping up sharply in week seven"
              viewBox="0 0 ${W} ${H}"
              width="${W}"
              height="${H}"
              style="display: block; margin-top: 6px"
            >
              <g class="sp-context">
                ${gridlines}
                ${tickLabels}
                <line x1="${LEFT}" y1="${BASE}" x2="${W - RIGHT}" y2="${BASE}" stroke="var(--sp-muted)" stroke-width="${RULE}" />
                <polyline
                  points="${line}"
                  fill="none" stroke="var(--sp-accent)" stroke-width="${RULE}"
                  stroke-linejoin="round" stroke-linecap="round"
                />
                ${weeks}
              </g>

              <g data-part="annotation" data-subject data-kind="${START}">
                <g data-part="note-callout">
                  <rect
                    x="44" y="18" width="112" height="34" rx="5"
                    fill="var(--sp-surface)" stroke="var(--sp-accent)" stroke-width="${RULE}"
                  />
                  <text x="52" y="32" fill="var(--sp-ink)" font-size="11" font-weight="600">Launch week</text>
                  <text x="52" y="45" fill="var(--sp-muted)" font-size="9">Orders up 72 per cent</text>
                  <path
                    d="M156 36 L${(launchX - 6).toFixed(1)} ${(launchY - 2).toFixed(1)}"
                    fill="none" stroke="var(--sp-accent)" stroke-width="${RULE}"
                  />
                  <circle cx="${launchX.toFixed(1)}" cy="${launchY.toFixed(1)}" r="4" fill="var(--sp-accent)" />
                </g>

                <g data-part="note-span" hidden>
                  <rect
                    x="${spanX.toFixed(1)}" y="${TOP}" width="${spanW.toFixed(1)}" height="${PLOT_H}"
                    fill="var(--sp-accent)" fill-opacity="0.12"
                  />
                  <line
                    x1="${spanX.toFixed(1)}" y1="${TOP}" x2="${spanX.toFixed(1)}" y2="${BASE}"
                    stroke="var(--sp-accent)" stroke-width="${RULE}"
                  />
                  <line
                    x1="${(spanX + spanW).toFixed(1)}" y1="${TOP}" x2="${(spanX + spanW).toFixed(1)}" y2="${BASE}"
                    stroke="var(--sp-accent)" stroke-width="${RULE}"
                  />
                  <text
                    x="${(spanX + spanW / 2).toFixed(1)}" y="${TOP + 12}"
                    text-anchor="middle" fill="var(--sp-ink)" font-size="10" font-weight="600"
                  >Supply outage</text>
                </g>

                <g data-part="note-reference" hidden>
                  <line
                    x1="${LEFT}" y1="${targetY.toFixed(1)}" x2="${W - RIGHT}" y2="${targetY.toFixed(1)}"
                    stroke="var(--sp-accent)" stroke-width="${RULE}" stroke-dasharray="7 5"
                  />
                  <rect
                    x="${(W - RIGHT - 68).toFixed(1)}" y="${(targetY - 9).toFixed(1)}" width="68" height="18" rx="9"
                    fill="var(--sp-surface)" stroke="var(--sp-accent)" stroke-width="${RULE}"
                  />
                  <text
                    x="${(W - RIGHT - 34).toFixed(1)}" y="${(targetY + 4).toFixed(1)}"
                    text-anchor="middle" fill="var(--sp-ink)" font-size="10" font-weight="600"
                  >Target 400</text>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div class="sp-stack sp-context" style="align-items: center; gap: 8px; width: 476px">
        <sp-segmented data-stage-mode class="sp-segmented" data-axis="Annotation" data-part="picker" data-value="${START}">
          <button class="sp-segment" type="button" data-part="seg-callout" value="callout" style="padding: 4px 10px; font-size: 12px">Callout</button>
          <button class="sp-segment" type="button" data-part="seg-span" value="span" style="padding: 4px 10px; font-size: 12px">Span</button>
          <button class="sp-segment" type="button" data-part="seg-reference" value="reference" style="padding: 4px 10px; font-size: 12px">Rule</button>
        </sp-segmented>
        <span
          class="sp-label"
          data-part="note"
          data-kind="${START}"
          role="status"
          style="height: 15px; font-size: 11px; line-height: 15px; white-space: nowrap; overflow: hidden"
        >${NOTE[START]}</span>
      </div>
    </div>
  `;

  const annotation = part(root, 'annotation');
  const note = part(root, 'note');
  const notes = KINDS.map((kind) => part(root, `note-${kind}`));

  const setKind = (kind: string) => {
    if (!KINDS.includes(kind)) return;
    annotation.dataset.kind = kind;
    for (const [i, group] of notes.entries()) {
      if (KINDS[i] === kind) group.removeAttribute('hidden');
      else group.setAttribute('hidden', '');
    }
    note.dataset.kind = kind;
    note.textContent = NOTE[kind] ?? '';
  };

  part(root, 'picker').addEventListener('change', (event) => setKind((event as CustomEvent<string>).detail));

  setKind(START);
}
