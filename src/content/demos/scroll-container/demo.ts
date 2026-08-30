import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The box, and the content that does not fit it. Stated, so nothing is measured after a write. */
const BOX_W = 300;
const BOX_H = 96;
const ROW_H = 22;
const ROW_GAP = 6;
const PAD = 10;
const BORDER = 1;

/** Five rows at hand-written widths: a fixed table, so every identify run draws the same box. */
const ROWS: [string, number][] = [
  ['Berth 1', 172],
  ['Berth 2', 138],
  ['Berth 3', 196],
  ['Berth 4', 118],
  ['Berth 5', 164],
];

const CONTENT_H = PAD * 2 + ROWS.length * ROW_H + (ROWS.length - 1) * ROW_GAP;
/** How far the content can travel when the box is a scrollport. Derived, never measured:
    the scrollport is the padding box, so the border comes off the height first. */
const SPAN = CONTENT_H - (BOX_H - BORDER * 2);

const NOTES: Record<string, string> = {
  auto: 'auto makes the box a scroll container: content clips at the padding edge, and a scrollbar reaches the rest.',
  hidden: 'hidden is still a scroll container. It clips exactly the same way, it just hands the reader no way to move it.',
  visible: 'visible is the value that makes no scroll container at all: the content simply leaves the box.',
};

const row = ([label, width]: [string, number]) => `
  <div style="display: flex; align-items: center; gap: 8px; flex: 0 0 auto; height: ${ROW_H}px; width: 258px;
              padding: 0 9px; border-radius: 5px; background: var(--sp-accent-soft)">
    <span style="flex: 0 0 auto; font-size: 11px; font-weight: 500">${label}</span>
    <span class="sp-line" style="flex: 0 0 auto; width: ${width}px; height: 6px; background: var(--sp-muted); opacity: 0.5"></span>
  </div>`;

/**
 * Scroll container specimen: one box holding more than it can show, with `overflow` as an
 * explicit pick, so the same content clips and scrolls, clips and locks, or escapes.
 *
 * The subject is the box itself, not the content and not the arena it sits in: the term
 * names the element that does the scrolling. The picker is the instrumentation that makes
 * the property watchable and wears the context register (SPEC §5). The reading of each
 * value used to sit under the box, where no product would print it; it changes with the
 * picker, so it is that switch's verdict and the stage draws it in the strip.
 *
 * `overflow: visible` is the one state where the box is not a scroll container, so the
 * honest condition is declared in `data-pose` and the mount state satisfies it: identify
 * refuses to ring a box that has stopped being the term (SPEC §6). `hidden` is inside the
 * pose on purpose, because it really is a scroll container: it clips at the padding edge
 * and script can still scroll it, which is the point the verdict makes.
 *
 * The box never changes size, only its overflow does, so the arena reserves the room the
 * escaped content will take and nothing below it moves (SPEC §5). Every length here is
 * stated as a constant, so the travel is derived rather than read back after a style write.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">overflow</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-value="auto" data-axis="Set to">
            <button class="sp-segment" type="button" data-part="seg-auto" value="auto">auto</button>
            <button class="sp-segment" type="button" data-part="seg-hidden" value="hidden">hidden</button>
            <button class="sp-segment" type="button" data-part="seg-visible" value="visible">visible</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px">
          <div
            data-part="arena"
            data-spill="no"
            style="display: flex; align-items: flex-start; justify-content: center; flex: 0 0 auto; width: 440px; height: 168px"
          >
            <div
              data-part="box"
              data-subject
              data-pose=":not([data-overflow=visible])"
              data-overflow="auto"
              data-at="top"
              tabindex="0"
              aria-label="Berths"
              style="display: flex; flex-direction: column; gap: ${ROW_GAP}px; flex: 0 0 auto; width: ${BOX_W}px; height: ${BOX_H}px;
                     padding: ${PAD}px; overflow: auto; scrollbar-width: thin; overscroll-behavior: contain;
                     background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
            >
              ${ROWS.map(row).join('')}
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 40px; max-width: 440px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const box = part(root, 'box');
  const arena = part(root, 'arena');
  const readout = part(root, 'readout');

  const sync = () => {
    if (box.dataset.overflow === 'visible') return;
    const at = SPAN > 0 ? box.scrollTop / SPAN : 0;
    if (at <= 0.02) box.dataset.at = 'top';
    else if (at >= 0.98) box.dataset.at = 'end';
    else box.dataset.at = 'middle';
  };

  const apply = (key: string) => {
    const note = NOTES[key];
    if (!note) return;
    // Wound back before the property changes, so every mode is entered from the same place.
    box.scrollTop = 0;
    box.style.overflow = key;
    box.dataset.overflow = key;
    box.dataset.at = 'top';
    arena.dataset.spill = key === 'visible' ? 'yes' : 'no';
    readout.textContent = note;
  };

  box.addEventListener('scroll', sync);

  // Each segment names an overflow value, so a scripted step lands on that value rather
  // than stepping to whichever one comes next (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('auto');
}
