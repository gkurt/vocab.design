import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Flow = 'normal' | 'flex-visual';

type Tile = { key: string; name: string; order: number };

/** Source order, and the `order` value each tile carries. Nothing below changes either. */
const TILES: Tile[] = [
  { key: 'search', name: 'Search', order: 1 },
  { key: 'filters', name: 'Filters', order: 0 },
  { key: 'results', name: 'Results', order: 0 },
  { key: 'sort', name: 'Sort', order: -1 },
  { key: 'saved', name: 'Saved', order: 0 },
  { key: 'help', name: 'Help', order: 0 },
];

const CAPTION = {
  'flex-visual': 'The container reads along its own lines, so the sequence runs 1 to 6 across the grid and Tab moves the way the eye does.',
  normal: 'Back to source order. Two tiles were moved by CSS order, so the sequence jumps backwards twice and nothing on screen says why.',
} as const;

/**
 * Reading flow specimen: six tiles in a wrapped flex container, two of them moved by a CSS
 * `order` value. The badges carry each tile's place in the reading sequence, so the reader
 * can watch that sequence become the visual one when the container declares
 * `reading-flow: flex-visual`, and fall back to the zigzag when it declares `normal`.
 *
 * The property is really set on the container, and the sequence is also derived here rather
 * than read from the browser: the property has shipped in Chromium only, and a specimen may
 * not move real focus to prove a tab order (SPEC §7). The walk is a button for the same
 * reason, and the ring it draws is simulated.
 *
 * The subject is the flex container, since `reading-flow` is a property of the container and
 * of nothing else. The state control, the walk and the caption are scenery (SPEC §5). A row
 * under the grid used to print the declaration as a stylesheet line (".tiles { reading-flow:
 * flex-visual }") beside a sentence telling the reader what to do with it ("Read across the
 * grid: 1 · 2 · 3 · 4 · 5 · 6"). No screen paints its own CSS, the switch in the strip already
 * names what the container declares, and the numbered badge on each tile is the sequence, so
 * the row is gone. The `normal` build is a state the container itself passes through, so the honest
 * condition is declared in `data-pose` and the mount state satisfies it (SPEC §6). Layout is
 * identical in both builds, since the property moves the sequence and never the boxes, and
 * the readouts hold fixed heights, so switching moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const tile = (t: Tile, source: number) => `
    <div class="sp-surface" data-part="tile-${t.key}" data-key="${t.key}"
         style="flex: 1 1 128px; min-width: 0; height: 52px; padding: 6px 8px; order: ${t.order}">
      <div class="sp-row" style="gap: 6px">
        <span data-part="badge-${t.key}"
              style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 18px; height: 18px;
                     border-radius: 50%; background: var(--sp-accent-soft); font-size: 11px; font-weight: 600"></span>
        <span class="sp-text sp-text--ink" style="font-size: 12px; font-weight: 500">${t.name}</span>
      </div>
      <span class="sp-label" style="display: block; margin-top: 3px; font-size: 10px">source ${source + 1}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 456px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="flex-visual" data-axis="Container declares" data-term="flex-visual">
            <button class="sp-segment" data-part="seg-flow" value="flex-visual">flex-visual</button>
            <button class="sp-segment" data-part="seg-normal" value="normal">normal</button>
          </sp-segmented>
        </div>

        <div data-part="grid" data-subject data-pose="[data-flow=flex-visual]" data-flow="flex-visual"
             style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; reading-flow: flex-visual">
          ${TILES.map(tile).join('')}
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 10px; height: 18px; gap: 10px">
          <span class="sp-label">Tab lands on</span>
          <span class="sp-text sp-text--ink" data-part="walk" data-state="idle" style="font-size: 11px">Nothing yet</span>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; gap: 10px">
          <p class="sp-text" data-stage-verdict data-part="caption" data-case="flex-visual"
             style="margin: 0; flex: 1 1 auto; height: 50px; font-size: 11px">${CAPTION['flex-visual']}</p>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="tab" style="flex: 0 0 auto">Press Tab</button>
        </div>
      </div>
    </div>
  `;

  const grid = part(root, 'grid');
  const walk = part(root, 'walk');
  const caption = part(root, 'caption');

  let flow: Flow = 'flex-visual';
  let at = -1;

  /** The sequence flexbox lays out: sort by `order`, ties broken by source position. */
  const laidOut = (): Tile[] =>
    TILES.map((t, i) => ({ t, i }))
      .sort((a, b) => a.t.order - b.t.order || a.i - b.i)
      .map((x) => x.t);

  /** What the container exposes: the visual line under flex-visual, the source under normal. */
  const read = (): Tile[] => (flow === 'flex-visual' ? laidOut() : TILES);

  const draw = () => {
    const order = read();
    const current = order[at];
    for (const t of TILES) {
      part(root, `badge-${t.key}`).textContent = String(order.indexOf(t) + 1);
      flag(part(root, `tile-${t.key}`), 'data-sim-focus', current?.key === t.key);
      part(root, `tile-${t.key}`).dataset.place = String(order.indexOf(t) + 1);
    }
    walk.dataset.state = current ? 'walking' : 'idle';
    walk.textContent = current ? `${current.name}, stop ${at + 1} of ${order.length}` : 'Nothing yet';
  };

  const apply = (next: Flow) => {
    flow = next;
    at = -1;
    grid.dataset.flow = next;
    grid.style.setProperty('reading-flow', next);
    caption.dataset.case = next;
    caption.textContent = CAPTION[next];
    draw();
  };

  apply('flex-visual');

  part(root, 'tab').addEventListener('click', () => {
    at = Math.min(at + 1, TILES.length - 1);
    draw();
  });

  part(root, 'segmented').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail === 'normal' ? 'normal' : 'flex-visual');
  });
}
