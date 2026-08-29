import { icon } from '#src/kit/icons.ts';
import { localPoint } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const TRACKS = [
  { key: 'tide', title: 'Tide Song' },
  { key: 'ferry', title: 'Ferry Lights' },
  { key: 'slip', title: 'Slipway' },
  { key: 'harbour', title: 'Harbour Bell' },
];

const TITLES = new Map(TRACKS.map((track) => [track.key, track.title]));

const ROW_H = 38;
const GAP = 4;
const PAD = 6;
/** One slot: a row plus the gap under it, which is the distance between two drop points. */
const STRIDE = ROW_H + GAP;
/** Where the held state parks the line: the gap between the second and third track. */
const POSE_SLOT = 2;

/** The top of the gap the line would sit in, measured inside the list's own box. */
const slotTop = (slot: number) => PAD + slot * STRIDE - GAP / 2 - 2;

const grip = `
  <span style="display: flex; align-items: center; color: var(--sp-muted)">
    <span style="display: flex">${icon('kebab', 'sp-icon--dots')}</span>
    <span style="display: flex; margin-left: -9px">${icon('kebab', 'sp-icon--dots')}</span>
  </span>`;

/**
 * Drop indicator specimen: a playlist being reordered, where the whole exhibit is the
 * line drawn in the gap the track would land in. It follows the drag, sits between rows
 * rather than on one, spans the list it belongs to, and the release lands exactly where
 * it pointed.
 *
 * The subject is the line, not the list and not the row being carried: the term names
 * the promise the container makes about the drop, and the drag to reorder specimen owns
 * the gesture (SPEC §5). A line that exists only mid-gesture would leave identify nothing to
 * ring, so the specimen carries a labelled control that holds it on after the drop, the
 * same answer the smart guides specimen reaches for; it is instrumentation, so it lives
 * in the context register (SPEC §5-6).
 *
 * The line is positioned absolutely inside the list, so showing it moves nothing
 * (SPEC §5), and the slot is arithmetic from the list's own box rather than a
 * measurement of rows that may be mid-transition.
 */
export function mount(root: HTMLElement): void {
  const rows = TRACKS.map(
    ({ key, title }, index) => `
      <li
        class="sp-list-item sp-surface sp-context"
        data-part="row-${key}"
        data-key="${key}"
        data-index="${index}"
        style="height: ${ROW_H}px; padding: 0 8px; border-top: 0; border-radius: 6px"
      >
        <button
          class="sp-icon-button"
          type="button"
          data-part="grip-${key}"
          aria-label="Move ${title}"
          style="width: 26px; height: 26px; cursor: grab; touch-action: none"
        >${grip}</button>
        <span class="sp-text sp-text--ink sp-grow" style="min-width: 0">${title}</span>
        <span class="sp-label">3:0${index + 1}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 292px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Playlist</span>
          <span class="sp-text" data-part="readout" style="width: 250px; text-align: right; white-space: nowrap">Drag a track by its grip</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div
            data-part="list"
            data-order="${TRACKS.map((t) => t.key).join('-')}"
            style="position: relative; width: 100%; padding: ${PAD}px; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <ul class="sp-list" data-part="rows" style="gap: ${GAP}px; margin: 0; padding: 0">${rows}</ul>
            <span
              data-part="indicator"
              data-subject
              data-slot="0"
              style="position: absolute; left: ${PAD}px; right: ${PAD}px; top: ${slotTop(0)}px; height: 4px; border-radius: 2px; background: var(--sp-accent); opacity: 0; transition: opacity 0.1s linear, top 0.1s linear; pointer-events: none"
            >
              <span
                style="position: absolute; left: -4px; top: -4px; width: 12px; height: 12px; border-radius: 50%; border: 3px solid var(--sp-accent); background: var(--sp-surface)"
              ></span>
            </span>
          </div>
          <div class="sp-row sp-context" style="gap: 8px">
            <sp-segmented data-stage-mode class="sp-segmented" data-part="hold" data-axis="Indicator" data-value="drag">
              <button class="sp-segment" data-part="hold-drag" value="drag" style="padding: 5px 10px">While dragging</button>
              <button class="sp-segment" data-part="hold-on" value="held" style="padding: 5px 10px">Held for inspection</button>
            </sp-segmented>
          </div>
        </div>
      </div>
    </div>
  `;

  const list = part(root, 'list');
  const rowList = part(root, 'rows');
  const indicator = part(root, 'indicator');
  const readout = part(root, 'readout');
  const hold = part(root, 'hold') as HTMLElement & { value: string };

  const rowsOf = () => [...rowList.children] as HTMLElement[];

  const showLine = (slot: number, on: boolean) => {
    indicator.dataset.slot = String(slot);
    indicator.style.top = `${slotTop(slot)}px`;
    indicator.style.opacity = on ? '1' : '0';
  };

  const syncOrder = () => {
    const order = rowsOf();
    order.forEach((row, index) => {
      row.dataset.index = String(index);
    });
    list.dataset.order = order.map((row) => row.dataset.key).join('-');
  };

  /** Which gap the pointer is nearest: 0 is above the first row, length is below the last. */
  const slotFor = (y: number) => Math.max(0, Math.min(TRACKS.length, Math.round((y - PAD) / STRIDE)));

  let drag: { row: HTMLElement; from: number; startY: number } | undefined;

  for (const { key, title } of TRACKS) {
    const grip = part(root, `grip-${key}`);
    grip.addEventListener('pointerdown', (event) => {
      // Capture keeps the carry alive past the list's edge. A synthetic pointer has none to
      // capture and the call would throw, so only a real one asks.
      if (event.isTrusted) grip.setPointerCapture(event.pointerId);
      const row = part(root, `row-${key}`);
      const from = rowsOf().indexOf(row);
      row.style.position = 'relative';
      row.style.zIndex = '1';
      row.style.boxShadow = 'var(--sp-shadow)';
      flag(row, 'data-lifted', true);
      drag = { row, from, startY: localPoint(event, list).y };
      showLine(from, true);
      readout.textContent = `Carrying ${title}`;
    });
  }

  root.addEventListener('pointermove', (event) => {
    const held = drag;
    if (!held) return;
    // Only the carried row moves. Its neighbours hold still, because here the line is
    // what says where the drop lands.
    const y = localPoint(event, list).y;
    held.row.style.translate = `0 ${y - held.startY}px`;
    const slot = slotFor(y);
    showLine(slot, true);
    const above = rowsOf()[slot - 1];
    const title = TITLES.get(above?.dataset.key ?? '');
    readout.textContent = slot === 0 || !title ? 'Drops above the first track' : `Drops below ${title}`;
  });

  const release = () => {
    const held = drag;
    if (!held) return;
    drag = undefined;
    held.row.style.translate = '';
    held.row.style.position = '';
    held.row.style.zIndex = '';
    held.row.style.boxShadow = '';
    flag(held.row, 'data-lifted', false);
    const slot = Number(indicator.dataset.slot ?? 0);
    const order = rowsOf();
    const before = order[slot];
    if (before !== held.row) {
      if (before) rowList.insertBefore(held.row, before);
      else rowList.append(held.row);
    }
    syncOrder();
    // The line is a promise about a release, so it leaves with the gesture, unless the
    // labelled control is holding it on for a reader who wants to look at it.
    if (hold.value === 'held') {
      showLine(POSE_SLOT, true);
      readout.textContent = 'Held: the gap the drop would land in';
      return;
    }
    showLine(slot, false);
    readout.textContent = `Dropped into slot ${slot + 1}`;
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  hold.addEventListener('change', () => {
    if (hold.value === 'held') {
      showLine(POSE_SLOT, true);
      readout.textContent = 'Held: the gap the drop would land in';
      return;
    }
    showLine(POSE_SLOT, false);
    readout.textContent = 'The line lives only during a drag';
  });
}
