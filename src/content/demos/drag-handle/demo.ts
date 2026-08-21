import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const TRACKS = [
  { key: 'dune', title: 'Dune Chorus', meta: '3:41' },
  { key: 'ember', title: 'Ember Lane', meta: '4:12' },
  { key: 'lagoon', title: 'Lagoon Static', meta: '2:58' },
  { key: 'moss', title: 'Moss Report', meta: '5:06' },
];

/** The subject: one handle among peers, so the term points at the mark itself. */
const SUBJECT = 'ember';

const ROW_HEIGHT = 40;

/**
 * Drag handle specimen: a reorderable list where every row carries a grip, and
 * only the grip picks the row up. The subject is one handle, not the row and not
 * the list, since the term names the small gripped mark; the other handles stay
 * in the normal register because they are more of the same thing.
 *
 * The restraint is the demonstration: a drag started on the row's text selects
 * text, the way text always does, and the order does not change. Rows are a fixed
 * height and the reorder is a move within the list, so nothing outside it shifts
 * (SPEC §5). The list is only ever re-ordered on release, never between the press
 * and the release of a plain click.
 */
export function mount(root: HTMLElement): void {
  const grip = `
    <span style="display: flex; align-items: center; color: var(--sp-muted)">
      <span style="display: flex">${icon('kebab', 'sp-icon--dots')}</span>
      <span style="display: flex; margin-left: -9px">${icon('kebab', 'sp-icon--dots')}</span>
    </span>`;

  const rows = TRACKS.map(
    ({ key, title, meta }, index) => `
      <li class="sp-list-item" data-part="row-${key}" data-key="${key}" data-index="${index}" style="height: ${ROW_HEIGHT}px; padding: 0 10px">
        <button
          class="sp-icon-button"
          type="button"
          data-part="grip-${key}"
          ${key === SUBJECT ? 'data-subject' : ''}
          aria-label="Reorder ${title}"
          style="width: 26px; height: 26px; cursor: grab; touch-action: none"
        >${grip}</button>
        <span class="sp-grow" style="min-width: 0">
          <span class="sp-text sp-text--ink" data-part="text-${key}" style="padding: 0 3px; border-radius: 3px">${title}</span>
        </span>
        <span class="sp-label">${meta}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Set list</span>
          <span class="sp-text">Drag to reorder</span>
        </div>
        <div class="sp-body">
          <ul class="sp-list sp-surface" data-part="list" style="padding: 2px">${rows}</ul>
          <p class="sp-text sp-context" style="margin-top: 10px">Only the grip starts a drag. Dragging a title selects it.</p>
        </div>
      </div>
    </div>
  `;

  const list = part(root, 'list');
  const rowOf = (key: string) => part(root, `row-${key}`);

  let dragging: HTMLElement | undefined;
  let selecting: HTMLElement | undefined;

  const reindex = () => {
    [...list.children].forEach((row, index) => {
      (row as HTMLElement).dataset.index = String(index);
    });
  };

  const markDrop = (target: HTMLElement | undefined) => {
    for (const row of list.children) {
      const el = row as HTMLElement;
      const on = el === target && el !== dragging;
      flag(el, 'data-drop', on);
      if (!on || !dragging) {
        el.style.boxShadow = '';
        continue;
      }
      const above = [...list.children].indexOf(el) < [...list.children].indexOf(dragging);
      el.style.boxShadow = `inset 0 ${above ? '2px' : '-2px'} 0 var(--sp-accent)`;
    }
  };

  const rowUnder = (y: number) => {
    return [...list.children].find((row) => {
      const rect = (row as HTMLElement).getBoundingClientRect();
      return y >= rect.top && y <= rect.bottom;
    }) as HTMLElement | undefined;
  };

  const clearSelection = () => {
    if (!selecting) return;
    selecting.removeAttribute('data-selected');
    selecting.style.background = '';
    selecting = undefined;
  };

  // Capture is what keeps a held gesture reporting once the pointer has left the part it
  // started on. A synthetic pointer has none to capture and the call would throw, so only a
  // real one asks.
  const capture = (el: HTMLElement, event: PointerEvent) => {
    if (event.isTrusted) el.setPointerCapture(event.pointerId);
  };

  for (const { key } of TRACKS) {
    const grip = part(root, `grip-${key}`);
    grip.addEventListener('pointerdown', (event) => {
      capture(grip, event);
      clearSelection();
      dragging = rowOf(key);
      flag(dragging, 'data-dragging', true);
      dragging.style.background = 'var(--sp-sunken)';
      dragging.style.opacity = '0.9';
    });

    // The row's own text is not a handle: pressing it and moving selects, which is
    // the ability a whole-row drag would have taken away.
    const text = part(root, `text-${key}`);
    text.addEventListener('pointerdown', (event) => {
      capture(text, event);
      clearSelection();
      selecting = text;
    });
  }

  root.addEventListener('pointermove', (event) => {
    if (selecting) {
      selecting.setAttribute('data-selected', '');
      selecting.style.background = 'var(--sp-accent-soft)';
      return;
    }
    if (!dragging) return;
    markDrop(rowUnder(event.clientY));
  });

  const release = (event: PointerEvent) => {
    // A selection outlives the gesture that made it, so nothing is cleared here.
    selecting = undefined;
    const row = dragging;
    if (!row) return;
    dragging = undefined;
    flag(row, 'data-dragging', false);
    row.style.background = '';
    row.style.opacity = '';
    const target = rowUnder(event.clientY);
    markDrop(undefined);
    // Released on itself or outside the list, the row stays where it was: a press
    // that goes nowhere must leave the order alone.
    if (!target || target === row) return;
    const children = [...list.children];
    if (children.indexOf(target) < children.indexOf(row)) list.insertBefore(row, target);
    else target.after(row);
    reindex();
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);
}
