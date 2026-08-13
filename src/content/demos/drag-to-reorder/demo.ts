import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const TASKS = [
  { key: 'mail', title: 'Answer the mail', meta: 'Today' },
  { key: 'plants', title: 'Water the plants', meta: 'Today' },
  { key: 'van', title: 'Wash the van', meta: 'Sat' },
  { key: 'bins', title: 'Sort the bins', meta: 'Sat' },
];

const ROW_H = 40;
const GAP = 4;
const PAD = 6;
/** One slot: a row plus the gap under it, which is how far a displaced row slides. */
const STRIDE = ROW_H + GAP;
const SLIDE = 'translate 0.16s var(--sp-ease)';

/**
 * Drag to reorder specimen: a task list where a row is lifted by its grip and the
 * rows it passes slide aside to open the slot it will land in. The subject is the
 * list, since the term names the sequence being rewritten rather than any one row;
 * the frame, its topbar, and the caption are scenery (SPEC §5).
 *
 * Nothing is re-parented between the press and the release. During the drag only
 * `translate` moves, so the DOM order the demo is tracking cannot change under the
 * pointer, and the real reorder happens once, on release, with the slides cleared in
 * the same tick so the list never slides back from a position it already left.
 *
 * Slots are arithmetic, not measurement: the list itself is never translated, so its
 * own box plus a fixed stride locates the destination without ever reading a row that
 * is mid-slide (a rect read during a transition is the old one).
 */
export function mount(root: HTMLElement): void {
  const grip = `
    <span style="display: flex; align-items: center; color: var(--sp-muted)">
      <span style="display: flex">${icon('kebab', 'sp-icon--dots')}</span>
      <span style="display: flex; margin-left: -9px">${icon('kebab', 'sp-icon--dots')}</span>
    </span>`;

  const rows = TASKS.map(
    ({ key, title, meta }, index) => `
      <li
        class="sp-list-item sp-surface"
        data-part="row-${key}"
        data-key="${key}"
        data-index="${index}"
        style="height: ${ROW_H}px; padding: 0 8px; border-top: 0; border-radius: 6px"
      >
        <button
          class="sp-icon-button"
          type="button"
          data-part="grip-${key}"
          aria-label="Reorder ${title}"
          style="width: 26px; height: 26px; cursor: grab; touch-action: none"
        >${grip}</button>
        <span class="sp-text sp-text--ink sp-grow" style="min-width: 0">${title}</span>
        <span class="sp-label">${meta}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Weekly plan</span>
          <span class="sp-text">Drag to reorder</span>
        </div>
        <div class="sp-body">
          <ul
            class="sp-list"
            data-part="list"
            data-subject
            data-order="${TASKS.map((t) => t.key).join('-')}"
            style="gap: ${GAP}px; padding: ${PAD}px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >${rows}</ul>
        </div>
      </div>
      <span class="sp-label sp-context">The list opens the slot before you let go. The order is written on release.</span>
    </div>
  `;

  const list = part(root, 'list');
  const rowsOf = () => [...list.children] as HTMLElement[];

  const syncOrder = () => {
    const order = rowsOf();
    order.forEach((row, index) => {
      row.dataset.index = String(index);
    });
    list.dataset.order = order.map((row) => row.dataset.key).join('-');
  };

  const slotFor = (y: number) => {
    const top = list.getBoundingClientRect().top + PAD;
    return Math.max(0, Math.min(TASKS.length - 1, Math.floor((y - top) / STRIDE)));
  };

  let drag: { row: HTMLElement; from: number; startY: number; slot: number } | undefined;

  for (const { key } of TASKS) {
    part(root, `grip-${key}`).addEventListener('pointerdown', (event) => {
      const row = part(root, `row-${key}`);
      const order = rowsOf();
      // Slides are re-armed here, one event before the first one is written, so no
      // row is asked to transition from a value written in the same tick.
      for (const other of order) other.style.transition = SLIDE;
      row.style.transition = 'none';
      row.style.position = 'relative';
      row.style.zIndex = '1';
      row.style.boxShadow = 'var(--sp-shadow)';
      flag(row, 'data-lifted', true);
      const index = order.indexOf(row);
      drag = { row, from: index, startY: event.clientY, slot: index };
    });
  }

  root.addEventListener('pointermove', (event) => {
    const held = drag;
    if (!held) return;
    held.slot = slotFor(event.clientY);
    held.row.style.translate = `0 ${event.clientY - held.startY}px`;
    rowsOf().forEach((row, index) => {
      if (row === held.row) return;
      let shift = 0;
      if (index > held.from && index <= held.slot) shift = -STRIDE;
      else if (index < held.from && index >= held.slot) shift = STRIDE;
      row.style.translate = shift === 0 ? '' : `0 ${shift}px`;
    });
  });

  const release = () => {
    const held = drag;
    if (!held) return;
    drag = undefined;
    // Cleared without a slide, because the DOM move below puts every row where its
    // translate had already drawn it: animating back would be a slide to nowhere.
    for (const row of rowsOf()) {
      row.style.transition = 'none';
      row.style.translate = '';
    }
    held.row.style.position = '';
    held.row.style.zIndex = '';
    held.row.style.boxShadow = '';
    flag(held.row, 'data-lifted', false);
    const target = rowsOf()[held.slot];
    if (target && target !== held.row) {
      if (held.slot < held.from) list.insertBefore(held.row, target);
      else target.after(held.row);
    }
    syncOrder();
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);
}
