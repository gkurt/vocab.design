import { part } from '#src/kit/parts.ts';

/** Card pitch: the card's own width plus the gap, which is what one press of right travels. */
const CARD = 116;
const GAP = 12;
const PITCH = CARD + GAP;
/** How many cards fit inside the safe margins, and so when the rail has to slide. */
const WINDOW = 3;

const RAILS = [
  { title: 'Continue watching', items: ['Long Field', 'Harbour', 'Nine Bridges', 'Salt Road', 'Winter Ferry'] },
  { title: 'New this week', items: ['Cold Harvest', 'Signal Hill', 'Marlow', 'Two Rivers', 'Blue Ridge'] },
] as const;

const card = (row: number, col: number, title: string) => `
  <div
    data-part="card-${row}-${col}"
    ${row === 0 && col === 0 ? 'data-focused' : ''}
    style="flex: 0 0 auto; width: ${CARD}px; border-radius: 8px; background: var(--sp-surface); overflow: hidden;
           outline: 3px solid transparent; outline-offset: 3px; transition: outline-color 0.16s var(--sp-ease)"
  >
    <span style="display: block; height: 50px; background: var(--sp-line)"></span>
    <span style="display: block; padding: 4px 8px; font-size: 13px; font-weight: 500; white-space: nowrap;
                 overflow: hidden; text-overflow: ellipsis">${title}</span>
  </div>`;

/* The viewport's own padding, pulled back by an equal margin, is room for the highlight's
   outline: a clip tight to the cards would slice the ring off the leading one. */
const rail = (row: number, { title, items }: { title: string; items: readonly string[] }) => `
  <div style="display: flex; flex-direction: column; gap: 6px">
    <span style="font-size: 17px; font-weight: 600">${title}</span>
    <div style="overflow: hidden; padding: 6px 0; margin: -6px 0">
      <div
        data-part="rail-${row}"
        style="display: flex; gap: ${GAP}px; padding-left: 6px; transform: translateX(0);
               transition: transform 0.26s var(--sp-ease)"
      >${items.map((item, col) => card(row, col, item)).join('')}</div>
    </div>
  </div>`;

/**
 * 10-foot UI specimen: a television home screen at TV proportions, driven by a remote. Right
 * and down move a heavy highlight from card to card, the rail slides only when the highlight
 * would otherwise leave the screen, and the dashed inset is the title-safe margin every edge
 * of the layout is held inside.
 *
 * The subject is the whole scene, which is why this specimen carries no context register and
 * offers no identify control (SPEC §5, §6). 10-foot is a register rather than a part: the
 * type scale, the card size, the rail, the highlight, and the safe margin are one claim, and
 * ringing any one of them would name a different term (a heavy highlight on its own is a
 * focus ring, a sliding row of cards on its own is a carousel).
 *
 * The screen carries `tabindex="0"` and its own key handler, so a reader's real arrow keys
 * drive it exactly as the script's do (SPEC §8); attract never moves real focus, so the demo
 * tracks the highlighted cell itself rather than reading `document.activeElement`.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" data-subject>
      <div
        class="sp-frame sp-frame--wide"
        data-part="screen"
        tabindex="0"
        role="application"
        aria-label="Television home screen"
        style="height: 280px; background: var(--sp-sunken)"
      >
        <span
          data-part="safe-area"
          aria-hidden="true"
          style="position: absolute; inset: 18px; border: 2px dashed var(--sp-line); border-radius: 6px; pointer-events: none"
        ></span>
        <span style="position: absolute; top: 22px; right: 24px; font-size: 10px; color: var(--sp-muted)">title-safe margin</span>
        <div style="position: absolute; inset: 18px; display: flex; flex-direction: column; gap: 12px; padding: 16px 14px 0">
          ${RAILS.map((set, row) => rail(row, set)).join('')}
        </div>
      </div>
    </div>
  `;

  const cards = RAILS.map((set, row) => set.items.map((_, col) => part(root, `card-${row}-${col}`)));
  const rails = RAILS.map((_, r) => part(root, `rail-${r}`));
  let row = 0;
  let col = 0;

  const paint = () => {
    for (const [r, line] of cards.entries())
      for (const [c, el] of line.entries()) {
        const on = r === row && c === col;
        el.style.outlineColor = on ? 'var(--sp-accent)' : 'transparent';
        if (on) el.setAttribute('data-focused', '');
        else el.removeAttribute('data-focused');
      }
    // The rail slides only when the highlight would otherwise leave the safe area, which is
    // the whole reason a forty-item rail needs no scrollbar.
    for (const [r, track] of rails.entries()) {
      const lead = r === row ? Math.max(0, col - (WINDOW - 1)) : 0;
      track.style.transform = `translateX(${-lead * PITCH}px)`;
    }
  };

  const MOVES: Record<string, [number, number]> = {
    ArrowRight: [0, 1],
    ArrowLeft: [0, -1],
    ArrowDown: [1, 0],
    ArrowUp: [-1, 0],
  };

  part(root, 'screen').addEventListener('keydown', (event) => {
    const move = MOVES[event.key];
    if (!move) return;
    event.preventDefault();
    row = Math.min(Math.max(row + move[0], 0), cards.length - 1);
    col = Math.min(Math.max(col + move[1], 0), (cards[row]?.length ?? 1) - 1);
    paint();
  });

  paint();
}
