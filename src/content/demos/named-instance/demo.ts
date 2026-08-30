import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * Verified against the face this site actually loads: Geist Variable carries the
 * `wght` axis and nothing else, so every pick here moves weight and the axis
 * really does answer. Its own named instances are the nine the family ships
 * (Thin through Black); four of them are offered, plus one coordinate between
 * two of them that no name reaches.
 */
const SAMPLE = 'Handgloves';
const MIN = 100;
const MAX = 900;

type Stop = { wght: number; name: string; read: string };

/** The four offered flags: a coordinate the family named, and the name it gave it. */
const NAMED: Stop[] = [
  { wght: 300, name: 'Light', read: 'Light · wght 300' },
  { wght: 400, name: 'Regular', read: 'Regular · wght 400' },
  { wght: 600, name: 'Semibold', read: 'Semibold · wght 600' },
  { wght: 900, name: 'Black', read: 'Black · wght 900' },
];

/** The point between two flags. Renderable, reachable, and nameless. */
const UNNAMED: Stop = { wght: 520, name: '520', read: 'wght 520 · no named instance' };

const STOPS = [...NAMED, UNNAMED];
const at = (wght: number) => ((wght - MIN) / (MAX - MIN)) * 100;
/** Where the marker's centre goes, inset by its own radius so the ends stay on the track. */
const dot = (wght: number) => `calc(7px + (100% - 14px) * ${(wght - MIN) / (MAX - MIN)})`;

/**
 * Named instance specimen: one variable file, one weight axis, and five picks
 * along it. Four are coordinates the family named and the fifth is a coordinate
 * between two of them. The trace under the sample draws the axis with a tick at
 * every named point, so the pick that lands in a gap is visibly in a gap: the
 * drawing is there, the flag is not.
 *
 * The subject is the sample line set to the instance, the narrowest thing the
 * term names. The nameless coordinate is a counter-example the subject itself
 * passes through, so the honest condition is declared in `data-pose` and the
 * specimen mounts on Regular (SPEC §6). The picker, the axis trace and the
 * readout are the demo's own instrumentation and stay in the context register
 * (SPEC §5). The chip prints the coordinate the way a type panel would, "Regular ·
 * wght 400" and "wght 520 · no named instance"; it used to gloss itself ("Regular:
 * the name for wght 400"), which was the site explaining its own instrument.
 *
 * Nothing is measured after a write: the marker's position and every tick are
 * arithmetic on the axis range, and the sample sits in a box of fixed height
 * starting at the left, so a heavier setting grows rightward and moves nothing
 * (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const segment = ({ wght, name }: Stop) => `<button class="sp-segment" data-part="seg-${wght}" value="${wght}">${name}</button>`;

  const tick = ({ wght }: Stop) =>
    `<span data-part="tick-${wght}" style="position: absolute; left: ${dot(wght)}; top: -3px; width: 2px; height: 14px;
           background: var(--sp-accent); translate: -1px 0"></span>`;

  /* The label at the far end aligns to it instead of centring on it, so it stays
     inside the window's text column rather than sitting out in the padding. */
  const tickLabel = ({ wght, name }: Stop) => {
    const place = at(wght) >= 100 ? 'right: 0' : `left: ${dot(wght)}; translate: -50% 0`;
    return `<span style="position: absolute; ${place}; top: 0; font-size: 10px;
            color: var(--sp-muted); white-space: nowrap">${name}</span>`;
  };

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 460px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="400" data-axis="Instance" data-term="400">
            ${STOPS.map(segment).join('')}
          </sp-segmented>
        </div>
        <div class="sp-row" data-part="sample-box" style="height: 54px; margin-top: 8px">
          <span data-part="sample" data-subject data-wght="400" data-named data-pose="[data-named]"
                style="font-size: 36px; line-height: 1.2; white-space: nowrap;
                       font-variation-settings: 'wght' 400">${SAMPLE}</span>
        </div>
        <div class="sp-stack sp-context" data-part="axis" style="gap: 6px">
          <div data-part="track" style="position: relative; height: 8px; border-radius: 999px; background: var(--sp-sunken)">
            ${NAMED.map(tick).join('')}
            <span data-part="marker" style="position: absolute; top: 50%; left: ${dot(400)}; width: 14px; height: 14px;
                  border-radius: 50%; background: var(--sp-accent); translate: -50% -50%;
                  transition: left 0.28s var(--sp-ease)"></span>
          </div>
          <div data-part="tick-labels" style="position: relative; height: 14px">
            ${NAMED.map(tickLabel).join('')}
          </div>
          <div class="sp-row sp-row--between">
            <span class="sp-label">wght 100</span>
            <span class="sp-chip" data-part="readout" style="cursor: default">${NAMED[1]?.read ?? ''}</span>
            <span class="sp-label">wght 900</span>
          </div>
        </div>
        <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="margin-top: 10px">
          The ticks are the coordinates this family named. Everything between them is drawable type with
          nothing to call it, which is the freedom the format bought and the vocabulary it cost.
        </p>
      </div>
    </div>
  `;

  const sample = part(root, 'sample');
  const marker = part(root, 'marker');
  const readout = part(root, 'readout');

  const apply = (value: string) => {
    const stop = STOPS.find((s) => String(s.wght) === value);
    if (!stop) return;
    sample.dataset.wght = value;
    sample.style.fontVariationSettings = `'wght' ${stop.wght}`;
    flag(sample, 'data-named', stop !== UNNAMED);
    marker.style.left = dot(stop.wght);
    readout.textContent = stop.read;
  };

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
