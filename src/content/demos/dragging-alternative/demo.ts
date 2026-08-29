import { localPoint } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Offers = 'drag' | 'both';

const OFFERS: Record<Offers, string> = {
  drag: 'Alternative offered: none',
  both: 'Alternative offered: a move menu',
};

const CAPTION: Record<Offers, string> = {
  drag: 'Dragging is the only route to the other column. Criterion 2.5.7 is about this gesture specifically, so a board that is perfectly keyboard operable still fails here.',
  both: 'Two routes, one result. The menu is the route somebody with a tremor, a head pointer, or one finger on a moving train can actually take.',
};

const HOW: Record<string, string> = {
  none: 'Last move: none yet',
  drag: 'Last move: dragged',
  menu: 'Last move: chosen from the menu',
};

const CARD = 'height: 38px; padding: 0 8px; display: flex; align-items: center; gap: 6px; border-radius: 6px';

/**
 * Dragging alternative specimen: a two-column board whose one movable card can be hauled between
 * columns, with a segmented control deciding whether that card also carries a move menu reaching
 * the same two columns with single taps. A read-out names how the card last arrived.
 *
 * The subject is the move control, the narrowest element the term names: the term is the second
 * route, not the card and not the board. The picker, both columns, the static cards, the read-out
 * strip and the caption are scenery (SPEC §5). Drag-only is the counter-example the control's own
 * scene passes through, so the honest condition lives in `data-pose` and the mount state satisfies
 * it: identify refuses to ring the control in a state that offers no alternative and plays on
 * (SPEC §6).
 *
 * The menu has an explicit open and an explicit dismissal (choosing a column), never one toggling
 * trigger, and choosing what the board offers resets the card to the first column and shuts the
 * menu, so a pass joined halfway proves the same thing (SPEC §8). Each column holds a fixed slot
 * for the movable card, so a move leaves an empty slot behind rather than shifting the cards that
 * did not move (SPEC §5). No timer is needed.
 */
export function mount(root: HTMLElement): void {
  const staticCard = (title: string, meta: string) => `
    <div class="sp-surface sp-context" style="${CARD}">
      <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 11.5px">${title}</span>
      <span class="sp-label" style="font-size: 9.5px">${meta}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 10px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px; justify-content: flex-end">
          <sp-segmented class="sp-segmented" data-axis="Board offers" data-term="both" data-part="offered" data-value="both">
            <button class="sp-segment" type="button" data-part="seg-drag" value="drag"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Drag only</button>
            <button class="sp-segment" type="button" data-part="seg-both" value="both"
                    style="padding: 4px 10px; font-size: 11.5px; white-space: nowrap">Drag or a menu</button>
          </sp-segmented>
        </div>

        <div class="sp-row" data-part="board"
             style="margin-top: 8px; height: 132px; gap: 8px; align-items: stretch">
          <div class="sp-surface sp-context" data-part="col-todo"
               style="flex: 1 1 0; min-width: 0; padding: 8px; display: flex; flex-direction: column; gap: 6px;
                      background: var(--sp-sunken)">
            <span class="sp-label" style="font-size: 9.5px">To do</span>
            <div data-part="slot-todo" style="height: 38px"></div>
            ${staticCard('Draft the changelog', 'Fri')}
          </div>
          <div class="sp-surface sp-context" data-part="col-doing"
               style="flex: 1 1 0; min-width: 0; padding: 8px; display: flex; flex-direction: column; gap: 6px;
                      background: var(--sp-sunken)">
            <span class="sp-label" style="font-size: 9.5px">Doing</span>
            <div data-part="slot-doing" style="height: 38px"></div>
            ${staticCard('Rebuild the index', 'Wed')}
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px; height: 16px; gap: 10px">
          <span class="sp-label" data-part="offers" data-mode="both" style="flex: 0 0 auto; font-size: 10.5px">${OFFERS.both}</span>
          <span class="sp-label" data-part="last" data-how="none" style="flex: 0 0 auto; font-size: 10.5px">${HOW.none}</span>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-mode="both"
           style="margin: 8px 0 0; height: 30px; font-size: 10.5px; line-height: 1.35">${CAPTION.both}</p>
      </div>
    </div>
  `;

  const card = document.createElement('div');
  card.className = 'sp-surface';
  card.dataset.part = 'card-a';
  card.dataset.col = 'todo';
  card.setAttribute('style', `${CARD}; position: relative; touch-action: none; cursor: grab`);
  card.innerHTML = `
    <span class="sp-text sp-text--ink sp-grow" style="min-width: 0; font-size: 11.5px">Fix the invoice total</span>
    <span style="flex: 0 0 46px; display: flex; justify-content: flex-end">
      <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="move-a" data-subject
              data-pose="[data-mode=both]" data-mode="both"
              style="padding: 2px 8px; font-size: 10.5px">Move</button>
    </span>
    <div class="sp-menu" data-part="menu" role="menu"
         style="top: 100%; left: 0; margin-top: 4px; min-width: 150px; z-index: 4">
      <button class="sp-menu-item" type="button" data-part="item-todo" role="menuitem"
              style="font-size: 11.5px; padding: 5px 8px">Move to To do</button>
      <button class="sp-menu-item" type="button" data-part="item-doing" role="menuitem"
              style="font-size: 11.5px; padding: 5px 8px">Move to Doing</button>
    </div>
  `;
  part(root, 'slot-todo').append(card);

  const move = part(root, 'move-a');
  const menu = part(root, 'menu');
  const offers = part(root, 'offers');
  const last = part(root, 'last');
  const caption = part(root, 'caption');
  const columns: Record<string, { col: HTMLElement; slot: HTMLElement }> = {
    todo: { col: part(root, 'col-todo'), slot: part(root, 'slot-todo') },
    doing: { col: part(root, 'col-doing'), slot: part(root, 'slot-doing') },
  };

  const openMenu = (open: boolean) => flag(menu, 'data-open', open);

  const place = (to: 'todo' | 'doing', how: 'drag' | 'menu' | 'none') => {
    columns[to]?.slot.append(card);
    card.dataset.col = to;
    last.dataset.how = how;
    last.textContent = HOW[how] ?? HOW.none ?? '';
  };

  const apply = (next: Offers) => {
    openMenu(false);
    flag(move, 'hidden', next === 'drag');
    move.dataset.mode = next;
    offers.dataset.mode = next;
    offers.textContent = OFFERS[next];
    caption.dataset.mode = next;
    caption.textContent = CAPTION[next];
    place('todo', 'none');
  };

  apply('both');

  move.addEventListener('click', () => openMenu(true));
  part(root, 'item-todo').addEventListener('click', () => {
    place('todo', 'menu');
    openMenu(false);
  });
  part(root, 'item-doing').addEventListener('click', () => {
    place('doing', 'menu');
    openMenu(false);
  });

  let drag: { x: number; y: number } | undefined;

  card.addEventListener('pointerdown', (event) => {
    if (move.contains(event.target as Node) || menu.contains(event.target as Node)) return;
    // Capture keeps the drag tracking past the board's edge. A synthetic pointer has none to
    // capture and the call would throw, so only a real one asks.
    if (event.isTrusted) card.setPointerCapture(event.pointerId);
    drag = localPoint(event, root);
    card.style.zIndex = '3';
    card.style.boxShadow = 'var(--sp-shadow)';
  });

  root.addEventListener('pointermove', (event) => {
    if (!drag) return;
    const at = localPoint(event, root);
    card.style.translate = `${at.x - drag.x}px ${at.y - drag.y}px`;
  });

  // The release point decides the column, because a drag's pointerup is dispatched on the card
  // it started from: asking where the pointer actually let go is the only honest hit test.
  const release = (event: PointerEvent) => {
    if (!drag) return;
    drag = undefined;
    card.style.translate = '';
    card.style.zIndex = '';
    card.style.boxShadow = '';
    const landed = Object.entries(columns).find(([, { col }]) => {
      const box = col.getBoundingClientRect();
      return event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
    });
    if (landed) place(landed[0] as 'todo' | 'doing', 'drag');
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  part(root, 'offered').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Offers);
  });
}
