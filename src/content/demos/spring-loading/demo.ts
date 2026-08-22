import { type IconName, icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/**
 * The long press that lifts a tile off the home screen. It is deliberately given no
 * ring and no countdown: a long press is a press held with nothing in hand, and the
 * article keeps it as the contrast to the dwell rather than a second helping of it.
 */
const LIFT_MS = 500;
/**
 * The dwell the folder charges for opening, and how often the ring repaints while it runs.
 * Long enough that a drag which merely crosses the tile (about 310 ms of the scripted pass,
 * and less than that from a hand actually going somewhere) never banks the crossing.
 */
const SPRING_MS = 800;
const TICK_MS = 60;
/** How far the finger may stray before the lift is abandoned, which is what stops a swipe picking things up. */
const SLOP_PX = 6;

const SCREEN = { w: 200, h: 240 };
/** One home-screen tile: a rounded icon with its name under it. */
const CELL = 48;
const FOLDER = { x: 76, y: 84 };
/** The free spot a tile lands on when the drag crosses the folder instead of stopping on it. */
const FREE = { x: 140, y: 156 };
/**
 * The open folder's box: nearly the whole screen. That size is the argument for the
 * dwell rather than decoration, since a container that opened the instant a drag
 * touched it would bury the home screen on every pass and leave nothing to drag to.
 */
const PANEL = { left: 8, top: 8, w: 184, h: 218 };
/**
 * Shut, the panel is clipped down to the folder tile it grows out of. Clipping is paint
 * and never layout, so the landing slot inside keeps the coordinates the choreography
 * aims at while the folder is still closed, and opening moves nothing (SPEC §5).
 */
const SHUT_CLIP = [
  `inset(${FOLDER.y - PANEL.top}px`,
  `${PANEL.left + PANEL.w - FOLDER.x - CELL}px`,
  `${PANEL.top + PANEL.h - FOLDER.y - CELL}px`,
  `${FOLDER.x - PANEL.left}px round 13px)`,
].join(' ');

interface App {
  name: string;
  glyph: IconName;
  wash: string;
  x: number;
  y: number;
}

/** The home screen around the folder and the dragged tile: scenery, in the context register. */
const SCENERY: App[] = [
  { name: 'Music', glyph: 'heart', wash: 'linear-gradient(160deg, #f0736a, #cf4136)', x: 12, y: 12 },
  { name: 'Alerts', glyph: 'bell', wash: 'linear-gradient(160deg, #5b8def, #2f5bd0)', x: 76, y: 12 },
  { name: 'Starred', glyph: 'star', wash: 'linear-gradient(160deg, #b48ae0, #7d55bb)', x: 140, y: 12 },
  { name: 'Search', glyph: 'search', wash: 'linear-gradient(160deg, #4fc3a1, #1f8f74)', x: 12, y: 84 },
  { name: 'Shared', glyph: 'share', wash: 'linear-gradient(160deg, #61c1e8, #2b8cc0)', x: 140, y: 84 },
  { name: 'Settings', glyph: 'sliders', wash: 'linear-gradient(160deg, #8b93a5, #5f6779)', x: 12, y: 156 },
];

const NOTES_WASH = 'linear-gradient(160deg, #f2b134, #d18e12)';
/** What the folder already holds, drawn both as its tile preview and as its open grid. */
const INSIDE: { name: string; glyph: IconName; wash: string; x: number }[] = [
  { name: 'Mail', glyph: 'inbox', wash: 'linear-gradient(160deg, #5b8def, #2f5bd0)', x: 12 },
  { name: 'Calendar', glyph: 'calendar', wash: 'linear-gradient(160deg, #ef7c5c, #d1492f)', x: 70 },
  { name: 'Files', glyph: 'copy', wash: 'linear-gradient(160deg, #4fc3a1, #1f8f74)', x: 128 },
];

const LABEL = [
  'display: block',
  'margin-top: 3px',
  'font-size: 10px',
  'line-height: 13px',
  'text-align: center',
  'color: #ffffff',
  'text-shadow: 0 1px 2px rgb(16 24 40 / 0.55)',
  'white-space: nowrap',
  'overflow: hidden',
  'text-overflow: ellipsis',
].join('; ');

function square(wash: string, glyph: IconName, size = CELL): string {
  return `<span style="display: flex; align-items: center; justify-content: center; width: ${size}px; height: ${size}px;
            border-radius: 13px; background: ${wash}; color: #ffffff; box-shadow: 0 2px 6px rgb(16 24 40 / 0.34)"
          >${icon(glyph)}</span>`;
}

function sceneryTile({ name, glyph, wash, x, y }: App): string {
  return `
    <div class="sp-context" style="position: absolute; left: ${x}px; top: ${y}px; width: ${CELL}px">
      ${square(wash, glyph)}
      <span style="${LABEL}">${name}</span>
    </div>`;
}

/**
 * Spring loading specimen: a phone home screen where a long press lifts a tile, the
 * drag carries it onto a folder, and holding it there springs the folder open over
 * almost the whole screen so the same drag can drop the tile inside. The subject is
 * the folder tile, the container the term names, rather than the tile being carried
 * or the screen they both sit on.
 *
 * The screen is a touch surface (`data-touch`), because a home screen is operated by a
 * finger and a phone driven by an arrow would be a costume (SPEC §7). No hover exists
 * inside it, so the dwell is read from the carried pointer's own coordinates plus the
 * clock the stage handed mount(): an empty hand resting on the folder springs nothing,
 * which is the difference between this gesture and a hover-to-open menu.
 *
 * Two waits happen here and the demo keeps them apart on purpose, since the article
 * holds long press up as the neighbouring gesture rather than the same one. The lift is
 * plain: press, and after LIFT_MS the tile simply rises, with no ring and no countdown,
 * and travelling before it completes abandons it exactly as a launcher does. Only the
 * dwell over the folder is paid for on screen, with the filling ring the article asks
 * for, and only the readout's "dwell" wording belongs to it.
 *
 * Crossing is the other half of the demonstration. A drag that passes over the folder
 * without stopping banks nothing: the ring empties and the folder stays shut, because
 * every folder a drag crosses on its way somewhere else flying open is the failure the
 * delay exists to prevent. Releasing closes what the gesture opened, since the drag
 * opened it rather than the reader.
 *
 * Nothing is re-parented between the press and the release, and the carried tile moves
 * by transform, so the tree under the finger cannot change mid-gesture. The open folder
 * OVERLAYS the grid: it is absolutely positioned and revealed by clip-path, which is
 * paint rather than layout, so no tile, readout or caption moves by a pixel and the
 * landing slot's coordinates are already true while the folder is shut (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const preview = INSIDE.map(
    ({ wash }, index) => `
      <span style="position: absolute; left: ${index % 2 ? 26 : 6}px; top: ${index > 1 ? 26 : 6}px; width: 16px; height: 16px;
        border-radius: 5px; background: ${wash}"></span>`,
  ).join('');

  const held = INSIDE.map(
    ({ name, glyph, wash, x }) => `
      <div style="position: absolute; left: ${x}px; top: 40px; width: 44px">
        ${square(wash, glyph, 44)}
        <span style="${LABEL}; color: var(--sp-ink); text-shadow: none">${name}</span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 460px; height: 300px">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Home screen</span>
          <span
            class="sp-label"
            data-part="readout"
            style="width: 300px; text-align: right; font-size: 11px; white-space: nowrap"
          >Hold a tile to pick it up</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; gap: 16px; padding: 10px 12px">
          <div
            data-part="screen"
            data-touch
            style="position: relative; flex: 0 0 auto; width: ${SCREEN.w}px; height: ${SCREEN.h}px; border-radius: 16px;
                   overflow: hidden; background: linear-gradient(165deg, #2f3550 0%, #4a4f74 55%, #6f6a95 100%)"
          >
            ${SCENERY.map(sceneryTile).join('')}

            <div
              class="sp-context"
              data-part="free"
              style="position: absolute; left: ${FREE.x}px; top: ${FREE.y}px; width: ${CELL}px; height: ${CELL}px;
                     border: 1px dashed rgb(255 255 255 / 0.34); border-radius: 13px"
            ></div>

            <div
              data-part="folder"
              data-subject
              style="position: absolute; left: ${FOLDER.x}px; top: ${FOLDER.y}px; width: ${CELL}px"
            >
              <span
                style="position: relative; display: block; width: ${CELL}px; height: ${CELL}px; border-radius: 13px;
                       background: rgb(255 255 255 / 0.26); box-shadow: 0 2px 6px rgb(16 24 40 / 0.28)"
              >
                ${preview}
                <span
                  data-part="folder-added"
                  style="position: absolute; left: 26px; top: 26px; width: 16px; height: 16px; border-radius: 5px;
                         background: ${NOTES_WASH}; opacity: 0; transition: opacity 0.18s ease"
                ></span>
                <span
                  data-part="ring"
                  style="position: absolute; left: -14px; top: -14px; width: 76px; height: 76px; border-radius: 50%; opacity: 0;
                         transition: opacity 0.12s;
                         background: conic-gradient(var(--sp-accent) calc(var(--sp-dwell, 0) * 1turn), rgb(255 255 255 / 0.42) 0);
                         mask: radial-gradient(circle, transparent 29px, #000 31px)"
                ></span>
              </span>
              <span style="${LABEL}">Work</span>
            </div>

            <div
              class="sp-context"
              data-part="app-notes"
              data-at="home"
              style="position: absolute; left: 76px; top: 156px; width: ${CELL}px; z-index: 8; touch-action: none;
                     user-select: none; transition: opacity 0.2s ease"
            >
              <div
                data-part="app-lift"
                style="transition: transform 0.16s var(--sp-ease), filter 0.16s ease, opacity 0.16s ease"
              >
                ${square(NOTES_WASH, 'pencil')}
                <span style="${LABEL}">Notes</span>
              </div>
            </div>

            <div
              class="sp-surface"
              data-part="folder-open"
              style="position: absolute; left: ${PANEL.left}px; top: ${PANEL.top}px; width: ${PANEL.w}px; height: ${PANEL.h}px;
                     z-index: 6; border-radius: 14px; box-shadow: 0 8px 24px rgb(16 24 40 / 0.4); opacity: 0;
                     pointer-events: none; clip-path: ${SHUT_CLIP};
                     transition: clip-path 0.26s var(--sp-ease), opacity 0.18s ease"
            >
              <span class="sp-heading" style="position: absolute; left: 12px; top: 10px; font-size: 13px">Work</span>
              <span class="sp-label" data-part="folder-count" style="position: absolute; right: 12px; top: 12px; font-size: 11px"
                >3 apps</span
              >
              ${held}
              <div
                data-part="slot"
                style="position: absolute; left: 12px; top: 104px; display: flex; align-items: center; justify-content: center;
                       width: 44px; height: 44px; border-radius: 13px; border: 1px dashed var(--sp-line)"
              >
                <span data-part="slot-icon" style="display: flex; opacity: 0; transition: opacity 0.18s ease"
                  >${square(NOTES_WASH, 'pencil', 42)}</span
                >
              </div>
              <span class="sp-label" style="position: absolute; left: 12px; right: 12px; bottom: 10px; text-align: center; font-size: 11px"
                >Still holding: let go in here to file it</span
              >
            </div>

            <span style="position: absolute; left: 50%; bottom: 5px; display: flex; gap: 5px; transform: translateX(-50%)">
              <span style="width: 5px; height: 5px; border-radius: 50%; background: rgb(255 255 255 / 0.85)"></span>
              <span style="width: 5px; height: 5px; border-radius: 50%; background: rgb(255 255 255 / 0.34)"></span>
            </span>
          </div>

          <div class="sp-stack sp-context" style="width: 196px; gap: 9px">
            <span class="sp-label" style="font-size: 11px">The two waits</span>
            <span class="sp-text" style="font-size: 12px; line-height: 1.45"
              >A long press picks the tile up. Holding it over the folder is a second, separate wait, and only that one
              draws a ring while it runs.</span
            >
            <span class="sp-text" style="font-size: 12px; line-height: 1.45"
              >Open, the folder buries the home screen. A folder that sprang the moment a drag touched it would swallow
              every drag that crossed it.</span
            >
          </div>
        </div>
      </div>
    </div>
  `;

  const app = part(root, 'app-notes');
  const lift = part(root, 'app-lift');
  const folder = part(root, 'folder');
  const panel = part(root, 'folder-open');
  const slotIcon = part(root, 'slot-icon');
  const added = part(root, 'folder-added');
  const count = part(root, 'folder-count');
  const free = part(root, 'free');
  const ring = part(root, 'ring');
  const readout = part(root, 'readout');

  let origin: { x: number; y: number } | undefined;
  let liftTimer: number | undefined;
  let dwellTimer: number | undefined;
  let carried = false;
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
    clock.clearTimeout(dwellTimer);
    dwellTimer = undefined;
    elapsed = 0;
    ring.style.setProperty('--sp-dwell', '0');
    ring.style.opacity = '0';
  };

  const spring = (open: boolean) => {
    sprung = open;
    clearDwell();
    flag(panel, 'data-open', open);
    panel.style.opacity = open ? '1' : '0';
    panel.style.clipPath = open ? 'inset(0 round 14px)' : SHUT_CLIP;
  };

  const tick = () => {
    elapsed += TICK_MS;
    ring.style.setProperty('--sp-dwell', String(Math.min(elapsed / SPRING_MS, 1)));
    if (elapsed >= SPRING_MS) {
      spring(true);
      say('Dwell paid: Work sprang open over the screen');
      return;
    }
    dwellTimer = clock.setTimeout(tick, TICK_MS);
  };

  /** The dwell, paid for while it runs: the ring is both the countdown and the cancel affordance. */
  const beginDwell = () => {
    if (sprung || dwellTimer !== undefined) return;
    elapsed = 0;
    ring.style.setProperty('--sp-dwell', '0');
    ring.style.opacity = '1';
    // Neutral on purpose: at this moment a crossing and an aim are the same event, and
    // which one it was is the next message's news.
    say('Over Work: the dwell is counting');
    dwellTimer = clock.setTimeout(tick, TICK_MS);
  };

  app.addEventListener('pointerdown', (event) => {
    // Filed away, the tile is inside the folder and no longer on the grid to pick up.
    if (app.dataset.at === 'folder') return;
    // Mandatory guard: the player's synthetic pointers cannot be captured and the call throws (SPEC §7).
    if (event.isTrusted) app.setPointerCapture(event.pointerId);
    origin = { x: event.clientX, y: event.clientY };
    carried = false;
    say('Pressing Notes: not lifted yet');
    // No ring here. The lift is the neighbouring gesture, and its whole tell is that
    // the tile rises when the wait is over.
    liftTimer = clock.setTimeout(() => {
      liftTimer = undefined;
      carried = true;
      lift.style.transform = 'scale(1.1)';
      lift.style.filter = 'drop-shadow(0 7px 10px rgb(16 24 40 / 0.5))';
      // Slightly see-through while it is carried, so the target under the finger,
      // countdown included, is never wholly hidden by the thing being dropped on it.
      lift.style.opacity = '0.92';
      say('Long press lifted Notes: now carrying it');
    }, LIFT_MS);
  });

  root.addEventListener('pointermove', (event) => {
    if (!origin) return;
    const dx = event.clientX - origin.x;
    const dy = event.clientY - origin.y;
    if (!carried) {
      // A launcher abandons the pick-up the moment the finger travels, which is what
      // keeps a fast swipe across the screen from carrying a tile away with it.
      if (Math.hypot(dx, dy) <= SLOP_PX) return;
      clock.clearTimeout(liftTimer);
      liftTimer = undefined;
      origin = undefined;
      say('Moved too soon: the long press never finished');
      return;
    }
    app.style.transform = `translate(${dx}px, ${dy}px)`;
    if (within(folder, event.clientX, event.clientY)) return beginDwell();
    // Crossing a folder on the way somewhere else is the common case, so leaving has to
    // reset the countdown rather than bank it. A sprung folder stays open: the drag is
    // inside it now, and only the release closes it.
    if (dwellTimer !== undefined) {
      // Reduced motion collapses the travel but never the dwell, so a crossing there is
      // over before the first tick: report that as what it was rather than as zero.
      say(elapsed ? `Crossed Work in ${elapsed} ms: it stayed shut` : 'Crossed Work without stopping: it stayed shut');
      clearDwell();
    }
  });

  const release = (event: PointerEvent) => {
    clock.clearTimeout(liftTimer);
    liftTimer = undefined;
    if (!origin) return;
    origin = undefined;
    const wasCarried = carried;
    carried = false;
    app.style.transform = '';
    lift.style.transform = '';
    lift.style.filter = '';
    lift.style.opacity = '';
    // Read the geometry before anything closes, since closing takes the room back.
    const inside = sprung && within(panel, event.clientX, event.clientY);
    const onFree = within(free, event.clientX, event.clientY);
    const onFolder = within(folder, event.clientX, event.clientY);
    // What the gesture sprang open, the gesture closes: it was opened by the drag
    // rather than by the reader.
    if (sprung) spring(false);
    if (!wasCarried) return;
    if (inside) {
      app.dataset.at = 'folder';
      app.style.opacity = '0';
      slotIcon.style.opacity = '1';
      added.style.opacity = '1';
      count.textContent = '4 apps';
      return say('Dropped inside Work, and it closed itself again');
    }
    if (onFree) {
      app.dataset.at = 'free';
      app.style.left = `${FREE.x}px`;
      app.style.top = `${FREE.y}px`;
      return say('Dropped on the free spot: Work never opened');
    }
    if (onFolder) return say('Let go on Work before the dwell: still shut');
    say('Let go on nothing: Notes stayed where it was');
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);
}
