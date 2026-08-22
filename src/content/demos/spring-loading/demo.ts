import { type IconName, icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/**
 * The dwell the folder charges for opening, and how often the ring repaints while it runs.
 * Comfortably longer than the time a drag spends crossing the middle cell on its way to the
 * far corner (about 190 ms), because banking a crossing is the failure the delay exists for.
 */
const SPRING_MS = 800;
const TICK_MS = 60;

const SCREEN = { w: 200, h: 240 };
const CELL = 48;

/**
 * A 3x3 grid with the folder in the MIDDLE cell and the empty spot in the far corner, so the
 * straight line from the corner tile to the empty one runs right over the folder. Crossing is
 * then the natural path rather than a detour invented for the demonstration: the drag that
 * has somewhere else to be goes over the folder because that is where the route lies.
 */
const COL = [12, 76, 140] as const;
const ROW = [12, 84, 156] as const;
const FOLDER = { x: COL[1], y: ROW[1] };
const FREE = { x: COL[2], y: ROW[2] };

/** The open folder's box: nearly the whole screen, which is the argument for the dwell. */
const PANEL = { left: 8, top: 8, w: 184, h: 218 };
/**
 * Shut, the panel is clipped down to the folder tile it grows out of. Clipping is paint and
 * never layout, so the landing slot inside keeps the coordinates the choreography aims at
 * while the folder is still closed, and opening moves nothing beside it (SPEC §5).
 */
const SHUT_CLIP = [
  `inset(${FOLDER.y - PANEL.top}px`,
  `${PANEL.left + PANEL.w - FOLDER.x - CELL}px`,
  `${PANEL.top + PANEL.h - FOLDER.y - CELL}px`,
  `${FOLDER.x - PANEL.left}px round 13px)`,
].join(' ');

interface Tile {
  key: string;
  name: string;
  glyph: IconName;
  wash: string;
  x: number;
  y: number;
}

/**
 * Every tile on the screen picks up, because a home screen where only one icon moves is a
 * diagram of a home screen rather than one. Notes sits in the corner the scripted drag starts
 * from; the rest are the scenery it crosses, and any of them can be carried or filed.
 */
const TILES: Tile[] = [
  { key: 'notes', name: 'Notes', glyph: 'pencil', wash: 'linear-gradient(160deg, #f2b134, #d18e12)', x: COL[0], y: ROW[0] },
  { key: 'music', name: 'Music', glyph: 'heart', wash: 'linear-gradient(160deg, #f0736a, #cf4136)', x: COL[1], y: ROW[0] },
  { key: 'starred', name: 'Starred', glyph: 'star', wash: 'linear-gradient(160deg, #b48ae0, #7d55bb)', x: COL[2], y: ROW[0] },
  { key: 'search', name: 'Search', glyph: 'search', wash: 'linear-gradient(160deg, #4fc3a1, #1f8f74)', x: COL[0], y: ROW[1] },
  { key: 'shared', name: 'Shared', glyph: 'share', wash: 'linear-gradient(160deg, #61c1e8, #2b8cc0)', x: COL[2], y: ROW[1] },
  { key: 'settings', name: 'Settings', glyph: 'sliders', wash: 'linear-gradient(160deg, #8b93a5, #5f6779)', x: COL[0], y: ROW[2] },
  { key: 'alerts', name: 'Alerts', glyph: 'bell', wash: 'linear-gradient(160deg, #5b8def, #2f5bd0)', x: COL[1], y: ROW[2] },
];

/** What the folder already holds, drawn as its tile preview and again in its open grid. */
const INSIDE: { name: string; glyph: IconName; wash: string }[] = [
  { name: 'Mail', glyph: 'inbox', wash: 'linear-gradient(160deg, #5b8def, #2f5bd0)' },
  { name: 'Calendar', glyph: 'calendar', wash: 'linear-gradient(160deg, #ef7c5c, #d1492f)' },
  { name: 'Files', glyph: 'copy', wash: 'linear-gradient(160deg, #4fc3a1, #1f8f74)' },
];

/** Where a filed tile lands inside the open folder: the second row of its grid. */
const LANDING = [12, 70, 128];

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

/**
 * Spring loading specimen: a phone home screen where a drag carrying a tile over a folder
 * springs the folder open across almost the whole screen, so the same drag can drop the tile
 * inside without ever being released. The subject is the folder tile, icon and name together,
 * since that is the container the term names, rather than the tile being carried or the screen
 * they both sit on. What the drag is tested against is the icon alone (`data-part=folder`), so
 * a pointer over the NAME below it is not yet over the folder.
 *
 * The screen is a touch surface (`data-touch`), because a home screen is worked by a finger
 * and a phone driven by an arrow would be a costume (SPEC §7). No hover exists inside it, so
 * the dwell is read from the carried pointer's own coordinates plus the clock the stage hands
 * mount(): an empty hand resting on the folder springs nothing, which is exactly what
 * separates this gesture from a hover-to-open menu.
 *
 * There is one wait here and it is the term's. Picking a tile up takes no hold at all: a long
 * press is a different gesture the article keeps as the contrast, and staging one here would
 * put two waits side by side and blur the distinction being drawn.
 *
 * The grid is arranged so that crossing is the natural path. The folder holds the middle cell
 * and the free spot the far corner, so a drag from one corner to the other passes over the
 * folder because that is where the route lies, not because a waypoint was added to make it.
 * That drag banks nothing: the ring fills part way and empties, the folder stays shut, and the
 * far corner is still reachable. Only a drag that stops pays the dwell, and what the dwell buys
 * is not filing (dropping on the shut folder files the tile perfectly well, as it does in a
 * launcher and in a file manager) but getting INSIDE, which is the traversal the term is for.
 *
 * Releasing closes what the gesture opened, because the drag opened it rather than the reader.
 * Nothing is re-parented between press and release, and a carried tile moves by transform, so
 * the tree under the finger cannot change mid-gesture. The open folder OVERLAYS the grid,
 * revealed by clip-path (paint, never layout), so no tile, readout or caption moves by a pixel
 * and the landing slot is already where the script aims while the folder is still shut.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const preview = INSIDE.map(
    ({ wash }, index) => `
      <span style="position: absolute; left: ${index % 2 ? 26 : 6}px; top: ${index > 1 ? 26 : 6}px; width: 16px; height: 16px;
        border-radius: 5px; background: ${wash}"></span>`,
  ).join('');

  const shelf = INSIDE.map(
    ({ name, glyph, wash }, index) => `
      <div style="position: absolute; left: ${LANDING[index]}px; top: 40px; width: 44px">
        ${square(wash, glyph, 44)}
        <span style="${LABEL}; color: var(--sp-ink); text-shadow: none">${name}</span>
      </div>`,
  ).join('');

  // Three landing places, so a reader who files more than one tile watches each arrive rather
  // than watching the second vanish. The first is the one the choreography aims at.
  const landings = LANDING.map(
    (x, index) => `
      <div style="position: absolute; left: ${x}px; top: 104px; width: 44px">
        <span
          data-part="landing-${index}"
          style="display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 13px;
                 border: 1px dashed var(--sp-line); opacity: ${index === 0 ? 1 : 0.36}"
        ></span>
        <span data-part="landing-name-${index}" style="${LABEL}; color: var(--sp-ink); text-shadow: none"></span>
      </div>`,
  ).join('');

  const tiles = TILES.map(
    ({ key, name, glyph, wash, x, y }) => `
      <div
        class="sp-context"
        data-part="app-${key}"
        data-at="home"
        style="position: absolute; left: ${x}px; top: ${y}px; width: ${CELL}px; z-index: 4; touch-action: none;
               user-select: none; transition: opacity 0.2s ease"
      >
        <div data-part="lift-${key}" style="transition: transform 0.14s var(--sp-ease), filter 0.14s ease">
          ${square(wash, glyph)}
          <span style="${LABEL}">${name}</span>
        </div>
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
          >Drag a tile across the folder, or stop on it</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: center; justify-content: center; gap: 16px; padding: 10px 12px">
          <div
            data-part="screen"
            data-touch
            style="position: relative; flex: 0 0 auto; width: ${SCREEN.w}px; height: ${SCREEN.h}px; border-radius: 16px;
                   overflow: hidden; background: linear-gradient(165deg, #2f3550 0%, #4a4f74 55%, #6f6a95 100%)"
          >
            <div
              class="sp-context"
              data-part="free"
              style="position: absolute; left: ${FREE.x}px; top: ${FREE.y}px; width: ${CELL}px; height: ${CELL}px;
                     border: 1px dashed rgb(255 255 255 / 0.34); border-radius: 13px"
            ></div>

            <div
              data-part="folder-tile"
              data-subject
              style="position: absolute; left: ${FOLDER.x}px; top: ${FOLDER.y}px; width: ${CELL}px"
            >
              <span
                data-part="folder"
                style="position: relative; display: block; width: ${CELL}px; height: ${CELL}px; border-radius: 13px;
                       background: rgb(255 255 255 / 0.26); box-shadow: 0 2px 6px rgb(16 24 40 / 0.28)"
              >
                ${preview}
                <span
                  data-part="folder-added"
                  style="position: absolute; left: 26px; top: 26px; width: 16px; height: 16px; border-radius: 5px;
                         opacity: 0; transition: opacity 0.18s ease"
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

            ${tiles}

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
              ${shelf}
              ${landings}
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
            <span class="sp-label" style="font-size: 11px">What the wait buys</span>
            <span class="sp-text" style="font-size: 12px; line-height: 1.45"
              >Dropping on the folder files the tile with nothing opening. The dwell buys the other thing: getting
              inside, to place it among what is already there or to carry the drag deeper.</span
            >
            <span class="sp-text" style="font-size: 12px; line-height: 1.45"
              >And it has to be paid for. Open, the folder buries the home screen, so one that sprang the moment a drag
              touched it would swallow every drag that merely crossed it.</span
            >
          </div>
        </div>
      </div>
    </div>
  `;

  const folder = part(root, 'folder');
  const panel = part(root, 'folder-open');
  const added = part(root, 'folder-added');
  const count = part(root, 'folder-count');
  const free = part(root, 'free');
  const ring = part(root, 'ring');
  const readout = part(root, 'readout');

  let held: { el: HTMLElement; lift: HTMLElement; tile: Tile; from: string } | undefined;
  let origin = { x: 0, y: 0 };
  let dwellTimer: number | undefined;
  let elapsed = 0;
  let sprung = false;
  let filed = 0;

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
    // Neutral on purpose: at this moment a crossing and an aim are the same event, and which
    // one it turned out to be is the next message's news.
    say('Over Work: the dwell is counting');
    dwellTimer = clock.setTimeout(tick, TICK_MS);
  };

  /**
   * Filing, whether the folder was open or shut. Dropping ON a shut folder files the tile
   * too, which is what a launcher and a file manager both do: the dwell is not the price of
   * filing, it is the price of going INSIDE, to place the tile among what is already there
   * or to carry the drag on deeper.
   */
  const fileAway = (tile: Tile, el: HTMLElement, opened: boolean): string => {
    if (filed >= LANDING.length) return `Work is full: ${tile.name} went back`;
    const spot = part(root, `landing-${filed}`);
    spot.innerHTML = square(tile.wash, tile.glyph, 42);
    spot.style.border = '0';
    spot.style.opacity = '1';
    part(root, `landing-name-${filed}`).textContent = tile.name;
    filed++;
    const next = root.querySelector<HTMLElement>(`[data-part="landing-${filed}"]`);
    if (next) next.style.opacity = '1';
    el.dataset.at = 'folder';
    el.style.opacity = '0';
    // The one spare dot on the tile preview, so the folder reads as changed from outside too.
    added.style.background = tile.wash;
    added.style.opacity = '1';
    count.textContent = `${INSIDE.length + filed} apps`;
    if (opened) return `Filed ${tile.name} inside: Work closed itself again`;
    return `Dropped on Work: ${tile.name} filed without it ever opening`;
  };

  for (const tile of TILES) {
    const el = part(root, `app-${tile.key}`);
    const lift = part(root, `lift-${tile.key}`);
    el.addEventListener('pointerdown', (event) => {
      // Filed away, a tile is inside the folder and no longer on the grid to pick up.
      if (el.dataset.at === 'folder' || held) return;
      // Mandatory guard: the player's synthetic pointers cannot be captured and the call throws (SPEC §7).
      if (event.isTrusted) el.setPointerCapture(event.pointerId);
      // `carried` is a place like any other, so the free spot reads as vacant while the tile
      // standing on it is in the air: a tile can be picked up and put straight back down.
      held = { el, lift, tile, from: el.dataset.at ?? 'home' };
      el.dataset.at = 'carried';
      origin = { x: event.clientX, y: event.clientY };
      el.style.zIndex = '8';
      lift.style.transform = 'scale(1.1)';
      lift.style.filter = 'drop-shadow(0 7px 10px rgb(16 24 40 / 0.5))';
      say(`Carrying ${tile.name}`);
    });
  }

  root.addEventListener('pointermove', (event) => {
    if (!held) return;
    held.el.style.transform = `translate(${event.clientX - origin.x}px, ${event.clientY - origin.y}px)`;
    if (within(folder, event.clientX, event.clientY)) return beginDwell();
    // Crossing on the way somewhere else is the common case, so leaving resets the countdown
    // rather than banking it. A sprung folder stays open: the drag is inside it now, and only
    // the release closes it.
    if (dwellTimer !== undefined) {
      // Reduced motion collapses the travel but never the dwell, so a crossing there is over
      // before the first tick: report that as what it was rather than as zero.
      say(elapsed ? `Crossed Work in ${elapsed} ms: it stayed shut` : 'Crossed Work without stopping: it stayed shut');
      clearDwell();
    }
  });

  const release = (event: PointerEvent) => {
    if (!held) return;
    const { el, lift, tile, from } = held;
    held = undefined;
    el.style.transform = '';
    el.style.zIndex = '';
    lift.style.transform = '';
    lift.style.filter = '';
    // Read the geometry before anything closes, since closing takes the room back.
    const inside = sprung && within(panel, event.clientX, event.clientY);
    // Occupancy is read off the tiles rather than kept in a flag, so a tile filed away out of
    // the free spot leaves it open again instead of reserving it forever.
    const spotFree = !TILES.some(({ key }) => part(root, `app-${key}`).dataset.at === 'free');
    const onFree = spotFree && within(free, event.clientX, event.clientY);
    const onFolder = within(folder, event.clientX, event.clientY);
    // What the gesture sprang open, the gesture closes: the drag opened it, not the reader.
    if (sprung) spring(false);
    if (inside || onFolder) {
      const message = fileAway(tile, el, inside);
      // A full folder hands the tile back, so it keeps the place it was picked up from.
      if (el.dataset.at !== 'folder') el.dataset.at = from;
      return say(message);
    }
    el.dataset.at = from;
    if (onFree) {
      el.dataset.at = 'free';
      el.style.left = `${FREE.x}px`;
      el.style.top = `${FREE.y}px`;
      return say('Dropped on the free spot: Work never opened');
    }
    say(`Let go on nothing: ${tile.name} stayed put`);
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);
}
