import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const TRACKS = 12;
const GAP = 6;
const SPAN = 6;
const CANVAS_H = 176;

const STARTS = [
  { key: 'offset', label: 'starts on 4', start: 4 },
  { key: 'flush', label: 'starts on 1', start: 1 },
];

const NOTES: Record<string, string> = {
  offset: 'Starts on track 4: the three tracks before it stay empty on purpose.',
  flush: 'Flush to the start on track 1: the same six tracks, no offset at all.',
};

const GRID = `display: grid; grid-template-columns: repeat(${TRACKS}, 1fr); gap: ${GAP}px`;
const BLOCK = 'display: flex; flex-direction: column; gap: 6px; padding: 8px 10px; overflow: hidden';

/** The empty tracks have nothing in them, so the demo hatches the region rather than filling it. */
const HATCH = `background-color: color-mix(in oklab, var(--sp-accent) 7%, transparent);
  background-image: repeating-linear-gradient(45deg, color-mix(in oklab, var(--sp-accent) 26%, transparent) 0 2px, transparent 2px 6px);
  border-radius: 4px`;

/**
 * Column offset specimen: twelve tracks drawn as an overlay, a masthead across all of them, and
 * one six-track column whose start line is picked absolutely. Started on track 4 the three
 * tracks before it hold nothing, and the demo hatches that region rather than filling it, since
 * the whole point of an offset is that no element lives there. Started on track 1 the same six
 * tracks sit flush and the hatch goes away.
 *
 * The subject is the offset column, `data-part="column"`. It carries `data-pose="[data-offset]"`
 * because a column flush to track 1 has no offset to identify, and the mount state is the offset
 * one, so the pose holds there (SPEC §6).
 *
 * The track overlay, the masthead and the hatched region are scenery in the context register.
 * Both states place the column in the same grid row, so switching the start line moves nothing
 * else in the frame (SPEC §5), and the tracks are real boxes rather than hairlines.
 */
export function mount(root: HTMLElement): void {
  const tracks = Array.from(
    { length: TRACKS },
    () => '<div style="background: var(--sp-accent); opacity: 0.12; border-radius: 2px"></div>',
  ).join('');

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 252px">
        <div class="sp-topbar sp-context" style="padding: 6px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">${TRACKS} tracks, ${SPAN}-track column</span>
          <sp-segmented class="sp-segmented" data-part="starts" data-value="offset">
            ${STARTS.map(
              (entry) => `
              <button class="sp-segment" type="button" data-part="seg-${entry.key}" value="${entry.key}" style="padding: 4px 9px; font-size: 11px; white-space: nowrap">${entry.label}</button>`,
            ).join('')}
          </sp-segmented>
        </div>

        <div class="sp-body" style="padding: 12px 20px">
          <div style="position: relative; height: ${CANVAS_H}px">
            <div class="sp-context" data-part="tracks" style="position: absolute; inset: 0; ${GRID}; pointer-events: none">${tracks}</div>

            <div style="position: relative; ${GRID}; grid-template-rows: 38px 1fr; height: 100%">
              <div class="sp-surface sp-context" data-part="masthead" style="${BLOCK}; grid-column: 1 / -1; grid-row: 1; justify-content: center">
                <span class="sp-label" style="color: var(--sp-ink); font-size: 11px">Masthead, all ${TRACKS} tracks</span>
              </div>

              <div class="sp-context" data-part="empty" style="grid-column: 1 / 4; grid-row: 2; ${HATCH}"></div>

              <div
                data-part="column"
                data-start="4"
                data-offset
                data-subject
                data-pose="[data-offset]"
                style="${BLOCK}; grid-column: 4 / ${4 + SPAN}; grid-row: 2; justify-content: center; gap: 8px;
                       background: var(--sp-accent-soft); border: 2px solid var(--sp-accent); border-radius: 6px"
              >
                <span class="sp-label" style="color: var(--sp-ink); font-weight: 600; font-size: 11px">Form</span>
                <div class="sp-line" style="width: 88%; height: 6px"></div>
                <div class="sp-line" style="width: 64%; height: 6px"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <span class="sp-text sp-context" data-part="note" role="status" style="width: 452px; height: 16px; font-size: 12px; line-height: 16px; text-align: center">${NOTES.offset}</span>
    </div>
  `;

  const column = part(root, 'column');
  const empty = part(root, 'empty');
  const note = part(root, 'note');

  const apply = (key: string) => {
    const entry = STARTS.find((candidate) => candidate.key === key);
    if (!entry) return;
    const offset = entry.start > 1;

    column.dataset.start = String(entry.start);
    if (offset) column.dataset.offset = '';
    else delete column.dataset.offset;
    column.style.gridColumn = `${entry.start} / ${entry.start + SPAN}`;

    // Nothing occupies the offset, so what is hidden is only the drawing of it.
    empty.hidden = !offset;

    note.textContent = NOTES[key] ?? '';
  };

  part(root, 'starts').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  // Mount offset, which is the term and the state the pose requires.
  apply('offset');
}
