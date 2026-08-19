import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const FRAME_W = 460;
const FRAME_H = 276;
const POP_W = 210;
const POP_H = 76;
/** Space between the anchor and the panel, and the margin the panel keeps off the frame. */
const GAP = 8;
const EDGE = 14;
/** Half the rotated square, so the arrow's own tip lands on the panel's edge. */
const NIB = 15;

const ROWS = ['A', 'B', 'C'] as const;
const SEATS = [1, 2, 3, 4, 5, 6] as const;

const DETAIL: Record<string, string> = {
  A: 'Aisle side, extra legroom',
  B: 'Middle block, standard',
  C: 'Rear block, reclines',
};

const clamp = (value: number, low: number, high: number) => Math.min(Math.max(value, low), high);

/**
 * Popover arrow specimen: a seat map where any seat opens the same detail panel, so the
 * panel has to be placed against whatever room that seat leaves. A seat at the left edge
 * pushes the panel right and the arrow slides left to keep pointing at it; a seat at the
 * right edge does the mirror; a seat in the bottom row leaves no space below, so the
 * panel flips above it and the arrow moves to the panel's other edge.
 *
 * The subject is the arrow itself, `data-part="arrow"`, on the narrowest element the term
 * names: the panel is a popover, the seat is the anchor, and the word names only the
 * triangle joining them. Everything else, the panel included, is `.sp-context`. The arrow
 * is hidden at rest, which identify handles by summoning it (SPEC §6), and it is honestly
 * an arrow in every state where it can be seen, so no `data-pose` condition is needed.
 *
 * The panel is out of flow at a fixed size, so opening it moves nothing in the map
 * (SPEC §5), and the placement is computed from the seat's own geometry rather than
 * written into the markup. A seat press always opens the panel on that seat, so a pass
 * resumed anywhere lands in the same place; dismissal is the panel's own Close, Escape,
 * or a press on the caption below the map (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const seats = ROWS.map((row) =>
    SEATS.map(
      (number) => `
        <button
          class="sp-button sp-button--ghost"
          type="button"
          data-part="seat-${row}${number}"
          data-seat="${row}${number}"
          aria-haspopup="dialog"
          style="width: 54px; height: 38px; padding: 0; font-size: 12px"
        >${row}${number}</button>`,
    ).join(''),
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: ${FRAME_W}px; height: ${FRAME_H}px">
        <div class="sp-topbar sp-context" style="padding: 8px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Coastal Flyer 118</span>
          <span class="sp-label" style="font-size: 11px">Rows 12 to 14</span>
        </div>

        <div class="sp-body sp-context" style="display: flex; flex-direction: column">
          <div
            class="sp-grid"
            data-part="map"
            style="grid-template-columns: repeat(6, 54px); gap: 8px; flex: 0 0 auto; margin: 0 auto"
          >${seats}</div>
          <span class="sp-grow"></span>
          <span class="sp-label" data-part="caption" style="flex: 0 0 auto; height: 22px; font-size: 11px; line-height: 22px">
            The panel is placed against the room each seat leaves.
          </span>
        </div>

        <div
          class="sp-surface sp-context"
          data-part="panel"
          role="dialog"
          aria-label="Seat detail"
          style="position: absolute; width: ${POP_W}px; height: ${POP_H}px; padding: 10px; box-shadow: var(--sp-shadow);
                 opacity: 0; visibility: hidden; transition: opacity 0.16s, visibility 0.16s, left 0.2s var(--sp-ease), top 0.2s var(--sp-ease)"
        >
          <div class="sp-row">
            <span class="sp-heading sp-grow" data-part="panel-title" style="font-size: 13px">Seat A1</span>
            <button class="sp-icon-button" type="button" data-part="close" aria-label="Close" style="width: 24px; height: 24px">${icon('close')}</button>
          </div>
          <span class="sp-text" data-part="panel-detail" style="display: block; margin-top: 5px; font-size: 12px">${DETAIL.A}</span>

          <span
            data-part="arrow"
            data-subject
            data-side="top"
            data-align="centre"
            aria-hidden="true"
            style="position: absolute; left: 50%; width: ${NIB}px; height: ${NIB}px; margin-left: ${-NIB / 2}px;
                   background: var(--sp-surface); border: 0 solid var(--sp-line); transform: rotate(45deg);
                   transition: left 0.2s var(--sp-ease)"
          ></span>
        </div>
      </div>
    </div>
  `;

  const panel = part(root, 'panel');
  const arrow = part(root, 'arrow');
  const title = part(root, 'panel-title');
  const detail = part(root, 'panel-detail');
  const seatButtons = [...part(root, 'map').children] as HTMLElement[];

  const setOpen = (open: boolean) => {
    panel.style.opacity = open ? '1' : '0';
    panel.style.visibility = open ? 'visible' : 'hidden';
  };

  const place = (seat: HTMLElement) => {
    const centre = seat.offsetLeft + seat.offsetWidth / 2;
    const below = seat.offsetTop + seat.offsetHeight + GAP;
    // No room under the bottom row, so the panel flips to the other side of its anchor.
    const flipped = below + POP_H > FRAME_H - EDGE;
    const top = flipped ? seat.offsetTop - GAP - POP_H : below;
    const left = clamp(centre - POP_W / 2, EDGE, FRAME_W - POP_W - EDGE);
    panel.style.top = `${top}px`;
    panel.style.left = `${left}px`;

    // Pushed sideways to stay on screen, the panel is no longer centred on its anchor,
    // so the arrow travels along the edge until it points at the anchor again.
    const offset = clamp(centre - left, 18, POP_W - 18);
    const middle = POP_W / 2;
    arrow.style.left = `${offset}px`;
    arrow.dataset.side = flipped ? 'bottom' : 'top';
    arrow.dataset.align = offset < middle - 12 ? 'start' : offset > middle + 12 ? 'end' : 'centre';
    if (flipped) {
      arrow.style.top = 'auto';
      arrow.style.bottom = `${-NIB / 2}px`;
      arrow.style.borderWidth = '0 1px 1px 0';
    } else {
      arrow.style.bottom = 'auto';
      arrow.style.top = `${-NIB / 2}px`;
      arrow.style.borderWidth = '1px 0 0 1px';
    }
  };

  const openOn = (seat: HTMLElement) => {
    place(seat);
    const id = seat.dataset.seat ?? '';
    title.textContent = `Seat ${id}`;
    detail.textContent = DETAIL[id.slice(0, 1)] ?? '';
    for (const other of seatButtons) flag(other, 'data-selected', other === seat);
    setOpen(true);
  };

  for (const seat of seatButtons) seat.addEventListener('click', () => openOn(seat));

  const dismiss = () => {
    setOpen(false);
    for (const seat of seatButtons) flag(seat, 'data-selected', false);
  };

  part(root, 'close').addEventListener('click', dismiss);
  root.addEventListener('pointerdown', (event) => {
    const target = event.target as Element | null;
    if (target && (panel.contains(target) || target.closest('[data-seat]'))) return;
    dismiss();
  });
  root.addEventListener('keydown', (event) => {
    if ((event as KeyboardEvent).key === 'Escape') dismiss();
  });

  // Parked on the first seat from mount, so the panel's first appearance is a fade
  // rather than a slide in from wherever an unplaced absolute box would have sat.
  const first = seatButtons[0];
  if (first) place(first);
  setOpen(false);
}
