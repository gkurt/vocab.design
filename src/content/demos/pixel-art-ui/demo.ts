import { part } from '#src/kit/parts.ts';

/**
 * Pixel art UI specimen: a battle menu drawn on a visible grid. One unit of four CSS
 * pixels governs everything, the frame is that unit thick with its corner cells knocked
 * out, the meters are discrete cells rather than a fill, and the heart is a sprite laid
 * out cell by cell through stacked box shadows, which is the CSS way of keeping an icon
 * at its original resolution.
 *
 * The palette and the grid are stated inline because they are the term. Selection moves
 * a pixel caret between rows: each row names itself, so a resumed or fast-forwarded pass
 * lands on the same row rather than stepping to the next one (SPEC §8). The caret's cell
 * is reserved in every row, so choosing one moves nothing but the caret.
 */
const U = 4;
const NAVY = '#141a33';
const EDGE = '#f4f2e8';
const DIM = '#6d7398';
const GREEN = '#5ddc7a';
const BLUE = '#5aa9f0';
const RED = '#e8455f';

/** A 7 by 6 heart, one entry per lit cell, drawn at the same unit as everything else. */
const HEART = ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'];

function sprite(rows: string[], colour: string): string {
  const cells: string[] = [];
  rows.forEach((row, y) => {
    [...row].forEach((cell, x) => {
      if (cell === 'X') cells.push(`${x * U}px ${y * U}px 0 0 ${colour}`);
    });
  });
  return cells.join(', ');
}

function meter(filled: number, total: number, colour: string): string {
  return Array.from({ length: total }, (_, i) => {
    const on = i < filled;
    return `<span style="width: ${U * 2}px; height: ${U * 2}px; background: ${on ? colour : '#2b3358'}"></span>`;
  }).join('');
}

/** The pixel caret: five rows of cells, widest in the middle, so the arrow stays stepped. */
const CARET = [1, 2, 3, 2, 1].map((w) => `<span style="width: ${w * U}px; height: ${U}px; background: ${EDGE}"></span>`).join('');

const ROWS: [string, string][] = [
  ['item', 'ITEM'],
  ['magic', 'MAGIC'],
  ['flee', 'FLEE'],
];

export function mount(root: HTMLElement): void {
  const menu = ROWS.map(
    ([key, label]) => `
      <div data-part="row-${key}" data-row="${key}" role="button" tabindex="-1"
           style="display: flex; align-items: center; gap: ${U * 2}px; padding: ${U}px ${U * 2}px; cursor: pointer">
        <span data-part="caret-${key}" aria-hidden="true"
              style="display: flex; flex-direction: column; align-items: flex-start; width: ${U * 3}px; opacity: ${key === 'item' ? 1 : 0}">${CARET}</span>
        <span>${label}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div data-part="panel" data-subject
           style="position: relative; width: 288px; padding: ${U * 4}px; margin: ${U}px; background: ${NAVY}; color: ${EDGE}; font-family: ui-monospace, 'Courier New', monospace; font-size: 13px; letter-spacing: 0.12em; line-height: 1.1; box-shadow: 0 -${U}px 0 0 ${EDGE}, 0 ${U}px 0 0 ${EDGE}, -${U}px 0 0 0 ${EDGE}, ${U}px 0 0 0 ${EDGE}">

        <div style="display: flex; align-items: flex-start; gap: ${U * 4}px">
          <div style="flex: 1 1 auto; min-width: 0">
            <div data-part="name" style="font-size: 12px; color: ${DIM}">RANGER</div>
            <div style="display: flex; align-items: center; gap: ${U * 2}px; margin-top: ${U * 2}px">
              <span style="width: ${U * 6}px; font-size: 11px; color: ${DIM}">HP</span>
              <span data-part="hp" style="display: flex; gap: ${U / 2}px">${meter(7, 10, GREEN)}</span>
            </div>
            <div style="display: flex; align-items: center; gap: ${U * 2}px; margin-top: ${U * 2}px">
              <span style="width: ${U * 6}px; font-size: 11px; color: ${DIM}">MP</span>
              <span data-part="mp" style="display: flex; gap: ${U / 2}px">${meter(4, 10, BLUE)}</span>
            </div>
          </div>

          <span data-part="sprite" aria-hidden="true"
                style="flex: 0 0 auto; width: ${U}px; height: ${U}px; margin: ${U}px ${U * 6}px ${U * 5}px ${U}px; background: transparent; box-shadow: ${sprite(HEART, RED)}"></span>
        </div>

        <div data-part="menu" style="margin-top: ${U * 3}px; padding-top: ${U * 2}px; border-top: ${U}px solid #2b3358">${menu}</div>
      </div>

      <p class="sp-text sp-context" data-stage-verdict data-part="caption" style="max-width: 288px; margin: 0; text-align: center">
        One four pixel unit for every edge, meters made of cells, and a sprite kept at the size it was drawn.
      </p>
    </div>
  `;

  const carets = new Map(ROWS.map(([key]) => [key, part(root, `caret-${key}`)]));

  const select = (key: string): void => {
    for (const [name, caret] of carets) caret.style.opacity = name === key ? '1' : '0';
    for (const [name] of ROWS) {
      const row = part(root, `row-${name}`);
      const on = name === key;
      row.toggleAttribute('data-selected', on);
      row.style.background = on ? '#2b3358' : 'transparent';
    }
  };

  for (const [key] of ROWS) {
    part(root, `row-${key}`).addEventListener('click', () => select(key));
  }

  select('item');
}
