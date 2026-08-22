import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/**
 * The dwell the folder asks for, and how often the ring is repainted while it runs. Long
 * enough that a drag which merely crosses the header (about 350 ms of the scripted pass,
 * and less than that from a hand actually going somewhere) never banks the crossing.
 */
const DWELL_MS = 700;
const TICK_MS = 70;

const SCENE_H = 190;
const FOLDER = { x: 132, y: 45, w: 150, h: 100 };
/**
 * What the folder widens to when it springs: far enough right to bury the Archive button
 * (x 316 to 424) and still inside the scene, which measures 434px on stage. That burial is
 * the whole argument for the dwell, so this number is load-bearing, not styling.
 */
const SPRUNG_W = 292;
const ROW_H = 36;

const CHILDREN = [
  { key: 'launch', name: 'Launch plan', top: 5 },
  { key: 'brand', name: 'Brand refresh', top: 34 },
];

const childRows = CHILDREN.map(
  ({ key, name, top }) => `
    <div
      class="sp-list-item"
      data-part="child-${key}"
      style="position: absolute; left: 8px; right: 8px; top: ${top}px; height: 26px; padding: 0 8px; font-size: 12px; background: var(--sp-sunken); border-radius: 5px; opacity: 0; transition: opacity 0.16s ease"
    >
      <span style="display: flex; color: var(--sp-muted)">${icon('copy')}</span>
      <span class="sp-grow" style="min-width: 0">${name}</span>
    </div>`,
).join('');

/**
 * Spring loading specimen: a file dragged across a shelf of destinations, where holding it
 * over the Projects folder springs the folder open and the same drag then lands inside. The
 * subject is that folder, header and contents together, since the term names the container
 * that opens under a drag rather than the item being dragged or the shelf they sit on.
 *
 * The countdown belongs to the drag and to nothing else. It runs off the carried pointer's
 * own coordinates, so an empty hand resting on the header springs nothing: a folder that
 * opened under a bare hover would be a different gesture wearing this one's name. Leaving
 * really cancels it, which is what the pass to Archive shows, the ring filling most of the
 * way and emptying, because crossing a folder is far more common than aiming at one and
 * banking the crossing would be the bug. Nothing is re-parented between the press and the
 * release, and the item is moved by a transform, so the tree the pointer is on cannot
 * change under it.
 *
 * The scripted pass performs the dwell rather than standing in for it: one held drag whose
 * waypoint STOPS on the header (SPEC §8). A stop dispatches nothing at all while it waits,
 * which is exactly what a pointer holding still emits, and the clock the stage handed
 * mount() counts the pause out.
 *
 * Springing widens the folder over Archive, and that is the argument for the dwell rather
 * than decoration: a container that opened the instant a drag touched it would cover its
 * neighbours on every single pass, and there would be nothing left to reach. The growth is
 * this term's own claim, so it is allowed, and it is contained (SPEC §5): the panel is
 * absolutely positioned and OVERLAYS Archive rather than moving it, its height never
 * changes, its right edge stays inside the scene, and its contents are reserved rather
 * than grown into, so nothing else in the scene moves.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Files</span>
          <span class="sp-text" data-part="readout" style="width: 296px; text-align: right; white-space: nowrap">Drag the file onto a destination</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center">
          <div style="position: relative; width: 100%; height: ${SCENE_H}px">
            <div
              class="sp-chip sp-context"
              data-part="item"
              data-dropped="none"
              style="position: absolute; left: 8px; top: 46px; width: 100px; height: 34px; z-index: 2; justify-content: center; cursor: grab; touch-action: none; user-select: none"
            >hero-shot.png</div>

            <div
              class="sp-surface"
              data-part="folder"
              data-subject
              style="position: absolute; left: ${FOLDER.x}px; top: ${FOLDER.y}px; width: ${FOLDER.w}px; height: ${FOLDER.h}px; z-index: 1; transition: width 0.22s var(--sp-ease)"
            >
              <div
                data-part="folder-row"
                style="position: relative; display: flex; align-items: center; gap: 6px; height: ${ROW_H}px; padding: 0 10px; border-bottom: 1px solid var(--sp-line)"
              >
                <span data-part="chevron" style="display: flex; color: var(--sp-muted); transition: rotate 0.16s var(--sp-ease)">${icon('chevronRight')}</span>
                <span class="sp-text sp-text--ink sp-grow" style="font-size: 13px">Projects</span>
                <span
                  data-part="ring"
                  style="width: 18px; height: 18px; border-radius: 50%; opacity: 0; transition: opacity 0.12s; background: conic-gradient(var(--sp-accent) calc(var(--sp-dwell, 0) * 1turn), var(--sp-sunken) 0); mask: radial-gradient(circle, transparent 5px, #000 6px)"
                ></span>
              </div>
              <div style="position: relative; height: ${FOLDER.h - ROW_H - 1}px">
                <span
                  class="sp-label"
                  data-part="hint"
                  style="position: absolute; left: 0; right: 0; top: 20px; text-align: center; transition: opacity 0.16s ease"
                >2 items inside</span>
                ${childRows}
              </div>
            </div>

            <div
              class="sp-surface sp-context"
              data-part="archive"
              style="position: absolute; left: 316px; top: 46px; width: 108px; height: 34px; z-index: 0; display: flex; align-items: center; justify-content: center; font-size: 13px"
            >Archive</div>

            <span
              class="sp-label sp-context"
              data-part="caption"
              style="position: absolute; left: 8px; right: 8px; bottom: 4px; text-align: center"
            >Open, Projects covers Archive. That is why only a hold opens it.</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const item = part(root, 'item');
  const folder = part(root, 'folder');
  const folderRow = part(root, 'folder-row');
  const chevron = part(root, 'chevron');
  const ring = part(root, 'ring');
  const hint = part(root, 'hint');
  const archive = part(root, 'archive');
  const readout = part(root, 'readout');

  let origin: { x: number; y: number } | undefined;
  let timer: number | undefined;
  let elapsed = 0;
  let sprung = false;

  const say = (text: string) => {
    readout.textContent = text;
  };

  const within = (el: HTMLElement, x: number, y: number) => {
    const box = el.getBoundingClientRect();
    return x >= box.left && x <= box.right && y >= box.top && y <= box.bottom;
  };

  const clearDwell = () => {
    clock.clearTimeout(timer);
    timer = undefined;
    elapsed = 0;
    ring.style.setProperty('--sp-dwell', '0');
    ring.style.opacity = '0';
  };

  const spring = (open: boolean) => {
    sprung = open;
    clearDwell();
    flag(folder, 'data-sprung', open);
    // The open folder needs the room its contents ask for, and it takes that room from
    // Archive: it overlays the button rather than moving it (SPEC §5).
    folder.style.width = `${open ? SPRUNG_W : FOLDER.w}px`;
    chevron.style.rotate = open ? '90deg' : '';
    hint.style.opacity = open ? '0' : '1';
    for (const { key } of CHILDREN) part(root, `child-${key}`).style.opacity = open ? '1' : '0';
  };

  const tick = () => {
    elapsed += TICK_MS;
    ring.style.setProperty('--sp-dwell', String(Math.min(elapsed / DWELL_MS, 1)));
    if (elapsed >= DWELL_MS) {
      spring(true);
      say('Sprang open, and now it covers Archive');
      return;
    }
    timer = clock.setTimeout(tick, TICK_MS);
  };

  /** Start the countdown, and pay for it while it runs: the ring is the cancel affordance. */
  const beginDwell = () => {
    if (sprung || timer !== undefined) return;
    elapsed = 0;
    ring.style.setProperty('--sp-dwell', '0');
    ring.style.opacity = '1';
    // Neutral on purpose: at this moment a crossing and an aim are the same event, and
    // which one it was is the next message's news.
    say('Over Projects: counting the dwell');
    timer = clock.setTimeout(tick, TICK_MS);
  };

  item.addEventListener('pointerdown', (event) => {
    // Mandatory guard: the player's synthetic pointers cannot be captured and the call throws (SPEC §7).
    if (event.isTrusted) item.setPointerCapture(event.pointerId);
    origin = { x: event.clientX, y: event.clientY };
    item.style.cursor = 'grabbing';
    item.style.borderColor = 'var(--sp-ink)';
    item.dataset.dropped = 'none';
    flag(item, 'data-lifted', true);
    say('Carrying hero-shot.png');
  });

  root.addEventListener('pointermove', (event) => {
    if (!origin) return;
    item.style.transform = `translate(${event.clientX - origin.x}px, ${event.clientY - origin.y}px)`;
    if (within(folderRow, event.clientX, event.clientY)) return beginDwell();
    // Crossing a folder on the way somewhere else is the common case, so leaving has to
    // reset the countdown rather than bank it. This is the pass that keeps Archive
    // reachable: the folder never opened, so it never covered anything.
    if (timer !== undefined) {
      // Reduced motion collapses the travel but never the dwell, so a crossing there is
      // over before the first tick: report that as what it was rather than as zero.
      say(elapsed ? `Crossed in ${elapsed} ms: Projects stayed shut` : 'Crossed without stopping: Projects stayed shut');
      clearDwell();
    }
  });

  const release = (event: PointerEvent) => {
    if (!origin) return;
    origin = undefined;
    clearDwell();
    item.style.cursor = 'grab';
    item.style.borderColor = '';
    item.style.transform = '';
    flag(item, 'data-lifted', false);
    // Read the geometry before anything closes, since closing takes the room back.
    const child = CHILDREN.find(({ key }) => within(part(root, `child-${key}`), event.clientX, event.clientY));
    const inside = sprung && within(folder, event.clientX, event.clientY);
    // The Finder closes what the drag sprang open once the drop is done, because the
    // gesture opened it rather than the reader: Archive comes back with it.
    if (sprung) spring(false);
    if (inside && child) {
      item.dataset.dropped = child.key;
      return say(`Filed in Projects / ${child.name}`);
    }
    if (inside) {
      item.dataset.dropped = 'inside';
      return say('Dropped in Projects, over where Archive was');
    }
    if (within(archive, event.clientX, event.clientY)) {
      item.dataset.dropped = 'archive';
      return say('Dropped in Archive: nothing sprang open over it');
    }
    if (within(folder, event.clientX, event.clientY)) {
      item.dataset.dropped = 'folder';
      return say('Released before the dwell: dropped on Projects');
    }
    say('Released on nothing: back to the shelf');
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);
}
