import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/** Every card is one row tall, so a column's height never depends on what is in it. */
const CARD_HEIGHT = 34;

const CARD = 'display: flex; align-items: center; gap: 8px; padding: 0 8px; font-size: 13px; cursor: grab; touch-action: none';

/**
 * Drag and drop specimen: a card picked up in Backlog, carried under a held
 * pointer, and released over Doing, which accepts it. The subject is the card
 * with its grip, since that is the object the gesture picks up; the columns are
 * the board it moves across, and the destination has its own word (drop zone).
 *
 * Nothing outside the two lists moves. The subject sits last in Backlog so the
 * card above it stays put, and Doing keeps an empty slot of exactly one card's
 * height that the arriving card takes the place of (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 240px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Sprint board</span>
          <span class="sp-text">3 cards</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 10px">
          <section class="sp-surface" data-part="zone-backlog" style="flex: 1 1 0; padding: 8px">
            <span class="sp-label sp-context">Backlog</span>
            <div class="sp-stack" data-part="list-backlog" style="margin-top: 8px">
              <div class="sp-surface sp-context" style="${CARD}; height: ${CARD_HEIGHT}px">
                ${icon('menu')}
                <span class="sp-grow">Fix flaky test</span>
              </div>
              <div
                class="sp-surface"
                data-part="card"
                data-subject
                data-in="backlog"
                style="${CARD}; height: ${CARD_HEIGHT}px"
              >
                ${icon('menu')}
                <span class="sp-grow">Ship changelog</span>
              </div>
            </div>
          </section>
          <section class="sp-surface" data-part="zone-doing" style="flex: 1 1 0; padding: 8px">
            <span class="sp-label sp-context">Doing</span>
            <div class="sp-stack" data-part="list-doing" style="margin-top: 8px">
              <div class="sp-surface sp-context" style="${CARD}; height: ${CARD_HEIGHT}px">
                ${icon('menu')}
                <span class="sp-grow">Update API docs</span>
              </div>
              <div
                class="sp-context"
                data-part="doing-empty"
                style="display: flex; align-items: center; justify-content: center; height: ${CARD_HEIGHT}px; border: 1px dashed var(--sp-line); border-radius: var(--sp-radius); font-size: 12px; color: var(--sp-muted)"
              >
                Drop here
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  `;

  const card = part(root, 'card');
  const zones = [
    { key: 'backlog', zone: part(root, 'zone-backlog'), list: part(root, 'list-backlog') },
    { key: 'doing', zone: part(root, 'zone-doing'), list: part(root, 'list-doing') },
  ];
  const empty = part(root, 'doing-empty');
  let carrying = false;

  /** The destination says it would take this, which is what makes a drag legible. */
  const highlight = (over: HTMLElement | undefined) => {
    for (const { zone } of zones) {
      const on = zone === over;
      flag(zone, 'data-active', on);
      zone.style.background = on ? 'var(--sp-accent-soft)' : '';
      zone.style.borderColor = on ? 'var(--sp-accent)' : '';
    }
  };

  const under = (x: number, y: number) => {
    return zones.find(({ zone }) => {
      const rect = zone.getBoundingClientRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    });
  };

  card.addEventListener('pointerdown', () => {
    carrying = true;
    flag(card, 'data-dragging', true);
    card.style.boxShadow = 'var(--sp-shadow)';
    card.style.opacity = '0.86';
  });

  root.addEventListener('pointermove', (event) => {
    if (!carrying) return;
    highlight(under(event.clientX, event.clientY)?.zone);
  });

  const drop = (event: PointerEvent) => {
    if (!carrying) return;
    carrying = false;
    flag(card, 'data-dragging', false);
    card.style.boxShadow = '';
    card.style.opacity = '';
    highlight(undefined);
    const target = under(event.clientX, event.clientY);
    // A release outside every zone leaves the card where it was, rather than nowhere.
    // A release over the list it already lives in must not re-append: moving the node
    // between pointerdown and pointerup swallows the click a plain press should yield.
    if (!target || target.list === card.parentElement) return;
    target.list.append(card);
    card.dataset.in = target.key;
    // The empty slot is the room the arriving card takes, so the column keeps its height.
    empty.hidden = target.key === 'doing';
  };

  root.addEventListener('pointerup', drop);
  root.addEventListener('pointercancel', drop);
}
