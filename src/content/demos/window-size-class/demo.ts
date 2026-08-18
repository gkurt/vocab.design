import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The arena the window resizes inside: fixed, so the read-out below it never moves. */
const ARENA_W = 430;
const ARENA_H = 168;
/** Density-independent pixels drawn to scale, so 960dp fits the arena at 422px. */
const SCALE = 0.44;

type Bucket = { dp: number; name: string; range: string; columns: number };

/** Material's three buckets. Two compact widths on purpose: the class is a range, not a number. */
const PICKS: Record<string, Bucket> = {
  w412: { dp: 412, name: 'compact', range: 'under 600dp', columns: 1 },
  w560: { dp: 560, name: 'compact', range: 'under 600dp', columns: 1 },
  w720: { dp: 720, name: 'medium', range: '600 to 839dp', columns: 2 },
  w960: { dp: 960, name: 'expanded', range: '840dp and up', columns: 3 },
};

const TRACKS: Record<number, string> = { 1: '1fr', 2: '1fr 1fr', 3: '1fr 1fr 1fr' };

const segment = (key: string, dp: number) => `
  <button class="sp-segment" type="button" data-part="seg-${key}" value="${key}" style="padding: 4px 7px; font-size: 11px">
    ${dp}dp
  </button>`;

const CARD_LINES = [78, 62, 84];

const card = (i: number) => `
  <span class="sp-surface" style="display: flex; flex-direction: column; justify-content: center; gap: 5px; min-width: 0; height: 32px; padding: 0 8px">
    <span class="sp-line" style="width: ${CARD_LINES[i % CARD_LINES.length]}%; height: 6px"></span>
    <span class="sp-line" style="width: 46%; height: 6px"></span>
  </span>`;

/**
 * Window size class specimen: one app window resized to four stated widths, with a read-out
 * naming the bucket that width lands in and the range that bucket covers.
 *
 * The subject is the window, since the class is a property of the window and of nothing else.
 * The width picker and the read-out are instrumentation in the context register (SPEC §5); the
 * arena is an empty fixed box and carries no register, because it holds the subject. The window
 * is honest in every state, so no state needs a `data-pose`.
 *
 * Two of the four widths are both compact and the layout inside is identical for both: that is
 * the whole claim, since a class is a range rather than a number. The window resizes inside the
 * fixed arena and the read-out box holds one size, so a pick moves nothing outside the window
 * (SPEC §5). Each segment names the width it produces rather than stepping along the list
 * (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Window width</span>
          <sp-segmented class="sp-segmented" data-part="widths" data-value="w412">
            ${segment('w412', 412)}${segment('w560', 560)}${segment('w720', 720)}${segment('w960', 960)}
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div
            data-part="arena"
            style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto; width: ${ARENA_W}px; height: ${ARENA_H}px"
          >
            <div
              data-part="window"
              data-subject
              data-class="compact"
              data-dp="412"
              style="display: flex; flex-direction: column; height: 100%; overflow: hidden; background: var(--sp-surface);
                     border: 1px solid var(--sp-line); border-radius: var(--sp-radius); transition: width 0.24s var(--sp-ease)"
            >
              <span style="display: flex; align-items: center; gap: 6px; flex: 0 0 auto; height: 22px; margin-top: 10px; padding: 0 10px">
                <span class="sp-heading sp-grow" style="font-size: 12px">Berths</span>
                <span class="sp-label" data-part="chrome-dp" style="flex: 0 0 auto; font-size: 10px"></span>
              </span>
              <div
                class="sp-grid"
                data-part="grid"
                data-columns="1"
                style="align-content: start; flex: 1 1 auto; min-height: 0; gap: 6px; padding: 8px 10px 10px;
                       grid-template-columns: 1fr; overflow: hidden"
              >
                ${[0, 1, 2].map(card).join('')}
              </div>
            </div>
          </div>

          <div
            class="sp-surface sp-context"
            data-part="readout"
            style="display: flex; align-items: center; gap: 10px; flex: 0 0 auto; width: ${ARENA_W}px; height: 50px; padding: 0 12px"
          >
            <span style="display: flex; flex-direction: column; gap: 1px; flex: 1 1 auto; min-width: 0">
              <span class="sp-heading" data-part="class-name" style="font-size: 15px"></span>
              <span class="sp-label" data-part="class-range" style="font-size: 11px"></span>
            </span>
            <span class="sp-chip" data-part="measured" style="flex: 0 0 auto; cursor: default"></span>
          </div>
        </div>
      </div>
    </div>
  `;

  const win = part(root, 'window');
  const grid = part(root, 'grid');
  const className = part(root, 'class-name');
  const classRange = part(root, 'class-range');
  const measured = part(root, 'measured');
  const chromeDp = part(root, 'chrome-dp');

  const apply = (key: string) => {
    const bucket = PICKS[key];
    const tracks = bucket ? TRACKS[bucket.columns] : undefined;
    if (!bucket || !tracks) return;
    win.style.width = `${Math.round(bucket.dp * SCALE)}px`;
    win.dataset.class = bucket.name;
    win.dataset.dp = String(bucket.dp);
    grid.dataset.columns = String(bucket.columns);
    grid.style.gridTemplateColumns = tracks;
    className.textContent = bucket.name;
    classRange.textContent = bucket.range;
    measured.textContent = `${bucket.dp}dp`;
    chromeDp.textContent = `${bucket.dp}dp`;
  };

  part(root, 'widths').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('w412');
}
