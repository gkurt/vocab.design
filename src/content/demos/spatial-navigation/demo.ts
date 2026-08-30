import { part } from '#src/kit/parts.ts';

type Tile = { key: string; label: string; order: number; col: number; row: number; rows?: number };

/**
 * A deliberately ragged grid: a tall card, an empty cell, and a source order that runs nothing
 * like the layout. `order` is the position in the DOM, drawn on every tile, so the two models
 * can be read off the screen and compared.
 */
const TILES: Tile[] = [
  { key: 'news', label: 'News', order: 1, col: 1, row: 1 },
  { key: 'films', label: 'Films', order: 2, col: 3, row: 1, rows: 2 },
  { key: 'music', label: 'Music', order: 3, col: 1, row: 3 },
  { key: 'live', label: 'Live', order: 4, col: 2, row: 1 },
  { key: 'games', label: 'Games', order: 5, col: 1, row: 2 },
  { key: 'kids', label: 'Kids', order: 6, col: 2, row: 3 },
  { key: 'store', label: 'Store', order: 7, col: 3, row: 3 },
];

const ARROW: Record<string, { dir: Dir }> = {
  ArrowRight: { dir: 'right' },
  ArrowLeft: { dir: 'left' },
  ArrowUp: { dir: 'up' },
  ArrowDown: { dir: 'down' },
};

type Dir = 'up' | 'down' | 'left' | 'right';
type Box = { left: number; right: number; top: number; bottom: number };

/** Alignment beats proximity: a candidate overlapping the current extent wins over a diagonal. */
const AHEAD: Record<Dir, (cur: Box, box: Box) => boolean> = {
  right: (cur, box) => box.left >= cur.right - 4,
  left: (cur, box) => box.right <= cur.left + 4,
  down: (cur, box) => box.top >= cur.bottom - 4,
  up: (cur, box) => box.bottom <= cur.top + 4,
};

const ALIGNED: Record<Dir, (cur: Box, box: Box) => boolean> = {
  right: (cur, box) => box.bottom > cur.top + 4 && box.top < cur.bottom - 4,
  left: (cur, box) => box.bottom > cur.top + 4 && box.top < cur.bottom - 4,
  down: (cur, box) => box.right > cur.left + 4 && box.left < cur.right - 4,
  up: (cur, box) => box.right > cur.left + 4 && box.left < cur.right - 4,
};

const COST: Record<Dir, (cur: Box, box: Box) => number> = {
  right: (cur, box) => box.left - cur.right + cross(cur.top, cur.bottom, box.top, box.bottom),
  left: (cur, box) => cur.left - box.right + cross(cur.top, cur.bottom, box.top, box.bottom),
  down: (cur, box) => box.top - cur.bottom + cross(cur.left, cur.right, box.left, box.right),
  up: (cur, box) => cur.top - box.bottom + cross(cur.left, cur.right, box.left, box.right),
};

function cross(aStart: number, aEnd: number, bStart: number, bEnd: number): number {
  return Math.max(0, bStart - aEnd, aStart - bEnd);
}

const CAPTION = {
  none: 'Seven cards, and the number on each is its place in the source. Press an arrow and watch which card the ring goes to.',
  diverge: 'Direction and sequence disagree here: the ring went to the nearest card that way, not to the next one in the source.',
  agree: 'Here the two happen to agree, which is exactly why the disagreements above survive a tab-through and reach the television.',
} as const;

/**
 * Spatial navigation specimen: a ragged card grid driven by the four arrows, where each move
 * goes to the nearest card in that direction. The source position is printed on every card, so
 * the divergence is on screen rather than asserted: Right from card 1 reaches card 4, Down from
 * card 2 reaches card 7, and Up out of card 6 jumps the empty cell to reach card 4.
 *
 * The subject is the card holding the focus ring, and it travels with the ring, because the term
 * names where direction puts focus rather than any one card. Exactly one card carries
 * `data-subject` at a time, and the card holding the ring is what the term names in every
 * resting state, so no `data-pose` is needed. The numbers and the caption are scenery (SPEC §5).
 *
 * The engine is real geometry, read from the laid-out grid at the moment a key arrives
 * (`offsetLeft` and friends, never a measurement taken after a style write), with the alignment
 * rule a remote actually needs: a candidate overlapping the current card's extent beats a nearer
 * diagonal one. Focus is simulated throughout (`data-sim-focus`), since attract never moves real
 * focus (SPEC §7), and the grid carries `tabindex="0"` so a reader's own arrows reach it. Arrow
 * keys are consumed so the page cannot scroll under the demonstration; Tab is left alone, so the
 * specimen can never trap a keyboard. No timer is needed.
 *
 * The label over the grid used to read "Remote, four directions", which is the site naming the
 * input rather than the television naming the row. It says what the row holds now, and the
 * remote is left to the choreography and the article.
 *
 * Beside it there used to be a readout, "Ring on News, source 1" and then "Right: source 1 to 4,
 * not 2" on every press. A channel grid does not print where its own focus ring is, nor the DOM
 * order behind it, so the readout is gone; the caption above the controls already carried the
 * same comparison in the site's own voice, and the state attributes the choreography watches
 * (`data-at`, `data-agree`) moved onto it.
 */
export function mount(root: HTMLElement): void {
  const tile = ({ key, label, order, col, row, rows }: Tile) => `
    <div class="sp-surface" data-part="tile-${key}" data-order="${order}"
         style="grid-column: ${col}; grid-row: ${row} / span ${rows ?? 1}; position: relative;
                display: flex; align-items: center; justify-content: center;
                background: var(--sp-sunken)">
      <span style="font-size: 12px; font-weight: 500">${label}</span>
      <span class="sp-label sp-context"
            style="position: absolute; top: 3px; left: 5px; font-size: 9px; line-height: 1">${order}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <span class="sp-label sp-context" style="display: block">Channels</span>

        <div class="sp-grid" data-part="grid" role="grid" aria-label="Channels" tabindex="0"
             style="margin-top: 10px; position: relative; grid-template-columns: repeat(3, 1fr);
                    grid-auto-rows: 44px; gap: 8px">
          ${TILES.map(tile).join('')}
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-agree="none"
           style="margin: 9px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${CAPTION.none}</p>
      </div>
    </div>
  `;

  const caption = part(root, 'caption');
  const cells = TILES.map((t) => part(root, `tile-${t.key}`));

  const boxOf = (el: HTMLElement): Box => ({
    left: el.offsetLeft,
    right: el.offsetLeft + el.offsetWidth,
    top: el.offsetTop,
    bottom: el.offsetTop + el.offsetHeight,
  });

  let at = 0;

  const land = (index: number, arrow?: string) => {
    const from = TILES[at];
    const to = TILES[index];
    const cell = cells[index];
    const previous = cells[at];
    if (!from || !to || !cell || !previous) return;
    previous.removeAttribute('data-sim-focus');
    previous.removeAttribute('data-subject');
    cell.setAttribute('data-sim-focus', '');
    cell.setAttribute('data-subject', '');
    at = index;

    if (!arrow) return;
    // What Tab would have done from the same card, which is the comparison the term is for.
    const step = arrow === 'ArrowRight' || arrow === 'ArrowDown' ? 1 : -1;
    const sequential = TILES[TILES.indexOf(from) + step];
    const agree = sequential?.order === to.order;
    caption.dataset.at = to.key;
    caption.dataset.agree = agree ? 'yes' : 'no';
    caption.textContent = agree ? CAPTION.agree : CAPTION.diverge;
  };

  const step = (arrow: string) => {
    const dir = ARROW[arrow]?.dir;
    const current = cells[at];
    if (!dir || !current) return;
    const cur = boxOf(current);
    const candidates = cells
      .map((el, index) => ({ index, box: boxOf(el) }))
      .filter(({ index, box }) => index !== at && AHEAD[dir](cur, box));
    const aligned = candidates.filter(({ box }) => ALIGNED[dir](cur, box));
    const pool = aligned.length > 0 ? aligned : candidates;
    if (pool.length === 0) return;
    const best = pool.reduce((a, b) => (COST[dir](cur, b.box) < COST[dir](cur, a.box) ? b : a));
    land(best.index, arrow);
  };

  root.addEventListener('keydown', (event) => {
    if (!(event.key in ARROW)) return;
    step(event.key);
    // The grid has answered the key, so the page must not also scroll on it.
    event.preventDefault();
  });

  land(0);
}
