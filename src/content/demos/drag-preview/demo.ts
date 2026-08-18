import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const SHOTS = [
  { key: 'tide', title: 'Tide, wide', length: '0:42' },
  { key: 'ferry', title: 'Ferry leaving', length: '1:08' },
  { key: 'slip', title: 'Slipway, close', length: '0:26' },
  { key: 'bell', title: 'Bell buoy', length: '0:55' },
] as const;

const TITLES = new Map<string, string>(SHOTS.map((shot) => [shot.key, shot.title]));

const ROW_H = 34;
const GAP = 5;
const PAD = 6;
const STRIDE = ROW_H + GAP;

/** Where the pointer holds the copy, and where the held state parks it. Fixed, never measured
    and never random: the identify snapshot is committed text and has to land the same way twice. */
const GRAB = { x: 26, y: 17 };
const POSE_AT = { x: 104, y: 78 };
const POSE_KEY = 'slip';

const NOTE = {
  drag: 'The copy lasts exactly as long as the gesture. Hold one to look at it.',
  held: 'Held: the copy that follows the pointer, and the faint slot it came from.',
} as const;

const grip = `
  <span style="display: flex; align-items: center; color: var(--sp-muted)">
    <span style="display: flex">${icon('kebab', 'sp-icon--dots')}</span>
    <span style="display: flex; margin-left: -9px">${icon('kebab', 'sp-icon--dots')}</span>
  </span>`;

/**
 * Drag preview specimen: a shot list being reordered, where grabbing a row lifts a
 * semi-transparent copy of it that follows the pointer while the original stays where it
 * was, faint and dashed, as the hole it left.
 *
 * The subject is the floating copy, not the list and not the row it came from: the term
 * names the thing in the reader's hand (SPEC §5). Where the release will land is the drop
 * indicator's claim and lives in that specimen, so this one deliberately draws no landing
 * line; the readout says it in words instead. A copy that exists only mid-gesture would
 * leave identify nothing to ring, so the specimen carries a labelled control that parks one
 * for inspection, the same answer the drop indicator specimen reaches for; it is
 * instrumentation, so it sits in the context register (SPEC §5-6).
 *
 * The copy is drawn over the list rather than inserted into it and the original holds its
 * slot for the whole gesture, so lifting a row moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const rows = SHOTS.map(
    ({ key, title, length }, index) => `
      <li
        class="sp-list-item sp-surface sp-context"
        data-part="row-${key}"
        data-key="${key}"
        data-index="${index}"
        style="height: ${ROW_H}px; padding: 0 8px; border-top: 0; border-radius: 6px; transition: opacity 0.12s linear"
      >
        <button
          class="sp-icon-button"
          type="button"
          data-part="grip-${key}"
          aria-label="Move ${title}"
          style="width: 24px; height: 24px; cursor: grab; touch-action: none"
        >${grip}</button>
        <span class="sp-text sp-text--ink sp-grow" style="min-width: 0">${title}</span>
        <span class="sp-label">${length}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Shot list</span>
          <span class="sp-text" data-part="readout" style="width: 250px; text-align: right; white-space: nowrap; overflow: hidden">
            Drag a shot by its grip
          </span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div
            data-part="list"
            data-order="${SHOTS.map((shot) => shot.key).join('-')}"
            style="position: relative; width: 100%; padding: ${PAD}px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <ul class="sp-list" data-part="rows" style="gap: ${GAP}px; margin: 0; padding: 0">${rows}</ul>
            <div
              class="sp-surface sp-row"
              data-part="preview"
              data-subject
              data-carrying=""
              style="position: absolute; left: 0; top: 0; width: 210px; height: ${ROW_H}px; gap: 10px; padding: 0 10px;
                     box-shadow: var(--sp-shadow); rotate: -1.5deg; pointer-events: none; opacity: 0; visibility: hidden;
                     transition: opacity 0.12s linear, visibility 0.12s"
            >
              <span class="sp-text sp-text--ink sp-grow" data-part="preview-title" style="min-width: 0">Slipway, close</span>
              <span class="sp-label" data-part="preview-count" style="font-size: 10px">1 item</span>
            </div>
          </div>
        </div>
      </div>
      <div class="sp-row sp-context" style="gap: 12px">
        <span class="sp-text" data-part="note" style="width: 252px; font-size: 11px">${NOTE.drag}</span>
        <sp-segmented class="sp-segmented" data-part="hold" data-value="drag">
          <button class="sp-segment" data-part="hold-drag" value="drag" style="padding: 5px 10px">While dragging</button>
          <button class="sp-segment" data-part="hold-on" value="held" style="padding: 5px 10px">Held for inspection</button>
        </sp-segmented>
      </div>
    </div>
  `;

  const list = part(root, 'list');
  const rowList = part(root, 'rows');
  const preview = part(root, 'preview');
  const previewTitle = part(root, 'preview-title');
  const readout = part(root, 'readout');
  const note = part(root, 'note');
  const hold = part(root, 'hold') as HTMLElement & { value: string };

  const rowsOf = () => [...rowList.children] as HTMLElement[];

  const lift = (row: HTMLElement | undefined, on: boolean) => {
    if (!row) return;
    flag(row, 'data-lifted', on);
    row.style.opacity = on ? '0.34' : '';
    row.style.borderStyle = on ? 'dashed' : '';
  };

  const showPreview = (key: string, at: { x: number; y: number } | undefined) => {
    if (!at) {
      preview.dataset.carrying = '';
      preview.style.opacity = '0';
      preview.style.visibility = 'hidden';
      return;
    }
    preview.dataset.carrying = key;
    previewTitle.textContent = TITLES.get(key) ?? '';
    preview.style.translate = `${at.x}px ${at.y}px`;
    // Semi-transparent on purpose: the copy is a stand-in, and the scene has to stay
    // readable underneath it. Well clear of the threshold an assert reads as present.
    preview.style.opacity = '0.86';
    preview.style.visibility = 'visible';
  };

  const syncOrder = () => {
    const order = rowsOf();
    order.forEach((row, index) => {
      row.dataset.index = String(index);
    });
    list.dataset.order = order.map((row) => row.dataset.key).join('-');
  };

  /** Which gap the pointer is nearest: 0 is above the first row, length is below the last. */
  const slotFor = (y: number, top: number) => Math.max(0, Math.min(SHOTS.length, Math.round((y - top - PAD) / STRIDE)));

  /** The parked copy identify is given something to ring: a fixed row, at a fixed offset. */
  const pose = () => {
    for (const { key } of SHOTS) lift(part(root, `row-${key}`), key === POSE_KEY);
    showPreview(POSE_KEY, POSE_AT);
    readout.textContent = `Carrying ${TITLES.get(POSE_KEY)}`;
    note.textContent = NOTE.held;
  };

  let drag: { row: HTMLElement; key: string; top: number; left: number } | undefined;

  for (const { key, title } of SHOTS) {
    part(root, `grip-${key}`).addEventListener('pointerdown', (event) => {
      const row = part(root, `row-${key}`);
      // Measured before anything is written, so nothing here reads back a value a
      // transition has not finished delivering (SPEC §5).
      const box = list.getBoundingClientRect();
      drag = { row, key, top: box.top, left: box.left };
      lift(row, true);
      showPreview(key, { x: event.clientX - box.left - GRAB.x, y: event.clientY - box.top - GRAB.y });
      readout.textContent = `Carrying ${title}`;
    });
  }

  root.addEventListener('pointermove', (event) => {
    const held = drag;
    if (!held) return;
    showPreview(held.key, { x: event.clientX - held.left - GRAB.x, y: event.clientY - held.top - GRAB.y });
    const slot = slotFor(event.clientY, held.top);
    const above = rowsOf()[slot - 1];
    const title = TITLES.get(above?.dataset.key ?? '');
    readout.textContent = slot === 0 || !title ? 'Would land at the top' : `Would land under ${title}`;
  });

  const release = (event: PointerEvent) => {
    const held = drag;
    if (!held) return;
    drag = undefined;
    lift(held.row, false);
    const slot = slotFor(event.clientY, held.top);
    const order = rowsOf();
    const before = order[slot];
    if (before !== held.row) {
      if (before) rowList.insertBefore(held.row, before);
      else rowList.append(held.row);
    }
    syncOrder();
    // The copy is a thing in the hand, so it goes when the hand opens, unless the labelled
    // control is holding one out for a reader who wants to look at it.
    if (hold.value === 'held') {
      pose();
      return;
    }
    showPreview(held.key, undefined);
    readout.textContent = `Dropped into slot ${rowsOf().indexOf(held.row) + 1}`;
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  hold.addEventListener('change', () => {
    if (hold.value === 'held') {
      pose();
      return;
    }
    for (const { key } of SHOTS) lift(part(root, `row-${key}`), false);
    showPreview('', undefined);
    readout.textContent = 'Drag a shot by its grip';
    note.textContent = NOTE.drag;
  });
}
