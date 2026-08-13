import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The dwell the folder asks for, and how often the ring is repainted while it runs. */
const DWELL_MS = 560;
const TICK_MS = 70;

const SCENE = { w: 436, h: 190 };
const FOLDER = { x: 132, y: 45, w: 150, h: 100 };
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
      style="position: absolute; left: 8px; top: ${top}px; width: ${FOLDER.w - 16}px; height: 26px; padding: 0 8px; font-size: 12px; background: var(--sp-sunken); border-radius: 5px; opacity: 0; transition: opacity 0.16s ease"
    >
      <span style="display: flex; color: var(--sp-muted)">${icon('copy')}</span>
      <span class="sp-grow" style="min-width: 0">${name}</span>
    </div>`,
).join('');

/**
 * Spring loading specimen: a file dragged across a shelf of destinations, where holding it
 * over the Projects folder springs the folder open and a drop then lands inside. The
 * subject is that folder, header and contents together, since the term names the container
 * that opens under a drag rather than the item being dragged or the shelf they sit on.
 *
 * The dwell is really wired, on the pointer's own position plus a clock timer, and really
 * cancelled by leaving: the scripted drag past the folder on its way to Archive fills the
 * ring part way and empties it again, which is the failure the gesture is mostly made of.
 * Nothing is re-parented between the press and the release, and the item is moved by a
 * transform, so the tree the pointer is on cannot change under it.
 *
 * No step in the vocabulary holds a drag still (SPEC §8), so the held state is reached
 * through a labelled simulation control running the same countdown a hand does. It is
 * instrumentation, so it is scenery.
 *
 * The folder's contents are reserved rather than grown into: the panel is the same height
 * open or closed, so springing moves nothing beside or below it (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Files</span>
          <span class="sp-text" data-part="readout" style="width: 236px; text-align: right; white-space: nowrap">Drag the file onto a destination</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; justify-content: center">
          <div style="position: relative; width: 100%; height: ${SCENE.h}px">
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
              style="position: absolute; left: ${FOLDER.x}px; top: ${FOLDER.y}px; width: ${FOLDER.w}px; height: ${FOLDER.h}px"
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
              style="position: absolute; left: 316px; top: 46px; width: 108px; height: 34px; display: flex; align-items: center; justify-content: center; font-size: 13px"
            >Archive</div>
          </div>
        </div>
      </div>
      <button class="sp-button sp-button--ghost sp-button--sm sp-context" type="button" data-part="sim">Simulate a ${DWELL_MS} ms hover over Projects</button>
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
    chevron.style.rotate = open ? '90deg' : '';
    hint.style.opacity = open ? '0' : '1';
    for (const { key } of CHILDREN) part(root, `child-${key}`).style.opacity = open ? '1' : '0';
  };

  const tick = () => {
    elapsed += TICK_MS;
    ring.style.setProperty('--sp-dwell', String(Math.min(elapsed / DWELL_MS, 1)));
    if (elapsed >= DWELL_MS) {
      spring(true);
      say('Sprang open: the drag can go inside');
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
    say('Hovering Projects');
    timer = clock.setTimeout(tick, TICK_MS);
  };

  item.addEventListener('pointerdown', (event) => {
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
    // reset the countdown rather than bank it.
    if (timer !== undefined) {
      say(`Left after ${elapsed} ms: the ring emptied`);
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
    const child = CHILDREN.find(({ key }) => within(part(root, `child-${key}`), event.clientX, event.clientY));
    if (sprung && child) {
      item.dataset.dropped = child.key;
      // The Finder closes what the drag sprang open once the drop is done.
      spring(false);
      return say(`Filed in Projects / ${child.name}`);
    }
    if (within(archive, event.clientX, event.clientY)) {
      item.dataset.dropped = 'archive';
      return say('Dropped in Archive, having crossed Projects');
    }
    if (within(folderRow, event.clientX, event.clientY)) {
      item.dataset.dropped = 'folder';
      return say('Released before the dwell: dropped on Projects');
    }
    say('Released on nothing: back to the shelf');
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  part(root, 'sim').addEventListener('click', beginDwell);
}
