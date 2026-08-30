import { localPoint } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const CANVAS = { w: 450, h: 196 };
/** Outer radius of the ring, the hub that cancels, and where the labels sit between them. */
const R = 78;
const HUB = 26;
const LABEL_R = 52;
/** How long the press has to be held before the menu is drawn. */
const REVEAL_MS = 380;

const ITEMS = [
  { key: 'crop', label: 'Crop', deg: -90 },
  { key: 'rotate', label: 'Rotate', deg: -30 },
  { key: 'filter', label: 'Filter', deg: 30 },
  { key: 'delete', label: 'Delete', deg: 90 },
  { key: 'share', label: 'Share', deg: 150 },
  { key: 'copy', label: 'Copy', deg: -150 },
] as const;

type Item = (typeof ITEMS)[number];

const at = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: R + Math.cos(a) * r, y: R + Math.sin(a) * r };
};

const coord = (deg: number, r: number) => {
  const p = at(deg, r);
  return `${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
};

/** One annular sector, with a two degree gap so the wedges read as separate targets. */
const sector = (deg: number) => {
  const a0 = deg - 29;
  const a1 = deg + 29;
  return `M ${coord(a0, HUB)} A ${HUB} ${HUB} 0 0 1 ${coord(a1, HUB)} L ${coord(a1, R)} A ${R} ${R} 0 0 0 ${coord(a0, R)} Z`;
};

const wedges = ITEMS.map(
  (item) => `
    <path
      data-part="wedge-${item.key}"
      d="${sector(item.deg)}"
      style="fill: var(--sp-surface); stroke: var(--sp-line); stroke-width: 1"
    ></path>`,
).join('');

const labels = ITEMS.map((item) => {
  const p = at(item.deg, LABEL_R);
  return `
    <text
      x="${p.x.toFixed(2)}"
      y="${p.y.toFixed(2)}"
      text-anchor="middle"
      dominant-baseline="middle"
      style="font-size: 10.5px; font-weight: 500; fill: var(--sp-ink); pointer-events: none"
    >${item.label}</text>`;
}).join('');

/** A fixed point the script presses, with no paint of its own (SPEC §5). */
const anchor = (name: string, x: number, y: number) => `
  <span
    data-part="${name}"
    style="position: absolute; left: ${x - 6}px; top: ${y - 6}px; width: 12px; height: 12px; pointer-events: none"
  ></span>`;

const POINTS = [
  { name: 'spot-left', x: 132, y: 98 },
  { name: 'spot-right', x: 322, y: 98 },
];

/**
 * Radial menu specimen: a press and hold on the canvas draws six commands in a ring around
 * the point that was pressed, and the choice is then made by travelling outward. Direction
 * names the command, and distance decides whether one is named at all: releasing inside the
 * central hub runs nothing, which is the cancel the geometry gives away for free.
 *
 * The subject is the ring itself. The term names the menu, not the canvas it is summoned
 * over and not the command it runs, so the pin belongs on the SVG that draws the wedges and
 * the hub. The photos are the scene around it in the context register.
 *
 * The frame used to narrate itself twice over: a topbar line reported every beat of the
 * gesture ("Menu drawn around the press, now aim outward", and one per hold, aim and
 * release), and a caption under the canvas read "Direction names the command, distance
 * decides whether one is named at all." Neither is anything a photo library prints, and the
 * article says both, so both are gone. The aim is still readable where it belongs: the hub
 * names whichever command the pointer is pointing at.
 *
 * The ring is off stage at mount, which identify handles by summoning it: the choreography's
 * hold is followed by a wait and a visible assert, the beat a summon polls.
 *
 * Two menus are shown at two different press points, because sitting around the point of
 * invocation is the claim: the ring is absolutely positioned at whatever coordinate the
 * press arrived at, so appearing and disappearing moves nothing on the canvas (SPEC §5).
 *
 * The wiring is one real press. A press while the menu is closed arms the reveal on the
 * stage's clock; a press while it is open always starts a pick and never shuts the menu, so
 * a pass resumed at any point means the same thing (SPEC §8). The pick is resolved from the
 * event's own coordinates against the centre the ring was drawn at, so nothing is ever
 * measured back out of the layout.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: auto">
        <div class="sp-topbar sp-context" style="padding: 7px 12px">
          <span class="sp-heading sp-grow" style="font-size: 13px">Library</span>
        </div>

        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px">
          <div
            class="sp-surface"
            data-part="canvas"
            data-menu="closed"
            data-chose="none"
            data-last="none"
            style="position: relative; width: ${CANVAS.w}px; height: ${CANVAS.h}px; overflow: hidden; touch-action: none; user-select: none; cursor: crosshair"
          >
            <span class="sp-context" style="position: absolute; inset: 0">
              <span style="position: absolute; left: 18px; top: 20px; width: 96px; height: 68px; border-radius: 6px; background: var(--sp-sunken)"></span>
              <span style="position: absolute; left: 18px; top: 104px; width: 96px; height: 68px; border-radius: 6px; background: var(--sp-sunken)"></span>
              <span style="position: absolute; left: 130px; top: 20px; width: 140px; height: 152px; border-radius: 6px; background: var(--sp-sunken)"></span>
              <span style="position: absolute; left: 286px; top: 20px; width: 146px; height: 152px; border-radius: 6px; background: var(--sp-sunken)"></span>
            </span>

            ${POINTS.map((p) => anchor(p.name, p.x, p.y)).join('')}

            <svg
              data-part="ring"
              data-subject
              viewBox="0 0 ${R * 2} ${R * 2}"
              width="${R * 2}"
              height="${R * 2}"
              role="img"
              aria-label="Radial menu of six commands"
              style="position: absolute; left: ${(POINTS[0]?.x ?? 0) - R}px; top: ${(POINTS[0]?.y ?? 0) - R}px; opacity: 0; visibility: hidden;
                     transition: opacity 0.14s, visibility 0.14s; filter: drop-shadow(0 4px 10px rgb(16 24 40 / 0.22))"
            >
              ${wedges}
              ${labels}
              <circle data-part="hub" cx="${R}" cy="${R}" r="${HUB}" style="fill: var(--sp-surface); stroke: var(--sp-line); stroke-width: 1"></circle>
              <text
                data-part="hub-label"
                x="${R}"
                y="${R}"
                text-anchor="middle"
                dominant-baseline="middle"
                style="font-size: 10px; fill: var(--sp-muted); pointer-events: none"
              >None</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  `;

  const canvas = part(root, 'canvas');
  const ring = part(root, 'ring');
  const hubLabel = part(root, 'hub-label');

  /** The ring's centre in client coordinates: the point the press arrived at. */
  let centre: { x: number; y: number } | undefined;
  let pending: { client: { x: number; y: number }; local: { x: number; y: number } } | undefined;
  let gesture: 'reveal' | 'pick' | undefined;
  let aimed: Item | undefined;
  let timer: number | undefined;
  let open = false;

  const highlight = (next: Item | undefined) => {
    aimed = next;
    for (const item of ITEMS) {
      const wedge = part(root, `wedge-${item.key}`);
      const on = item.key === next?.key;
      wedge.style.fill = on ? 'var(--sp-accent-soft)' : 'var(--sp-surface)';
      wedge.style.stroke = on ? 'var(--sp-accent)' : 'var(--sp-line)';
    }
    hubLabel.textContent = next?.label ?? 'None';
  };

  const setOpen = (on: boolean) => {
    open = on;
    canvas.dataset.menu = on ? 'open' : 'closed';
    ring.style.opacity = on ? '1' : '0';
    ring.style.visibility = on ? 'visible' : 'hidden';
    if (!on) highlight(undefined);
  };

  const openAt = (spot: { client: { x: number; y: number }; local: { x: number; y: number } }) => {
    clock.clearTimeout(timer);
    timer = undefined;
    pending = undefined;
    centre = spot.client;
    ring.style.left = `${spot.local.x - R}px`;
    ring.style.top = `${spot.local.y - R}px`;
    highlight(undefined);
    setOpen(true);
  };

  /** The nearest of the six directions, once the pointer is past the hub. */
  const nearest = (dx: number, dy: number) => {
    const deg = (Math.atan2(dy, dx) * 180) / Math.PI;
    return ITEMS.reduce((a, b) => {
      const gap = (d: number) => Math.abs(((deg - d + 540) % 360) - 180);
      return gap(b.deg) < gap(a.deg) ? b : a;
    });
  };

  const commit = (item: Item) => {
    canvas.dataset.chose = item.key;
    canvas.dataset.last = item.key;
    setOpen(false);
  };

  const cancel = () => {
    canvas.dataset.last = 'cancelled';
    setOpen(false);
  };

  canvas.addEventListener('pointerdown', (event) => {
    // A reader's own drag has to keep reporting after the pointer leaves the canvas. The
    // player's synthetic pointers cannot be captured, hence the trusted guard (SPEC §7).
    if (event.isTrusted) canvas.setPointerCapture(event.pointerId);
    if (open) {
      gesture = 'pick';
      highlight(undefined);
      return;
    }
    gesture = 'reveal';
    clock.clearTimeout(timer);
    const spot = {
      client: { x: event.clientX, y: event.clientY },
      local: localPoint(event, canvas),
    };
    pending = spot;
    timer = clock.setTimeout(() => openAt(spot), REVEAL_MS);
  });

  canvas.addEventListener('pointermove', (event) => {
    if (!open || !centre) return;
    const dx = event.clientX - centre.x;
    const dy = event.clientY - centre.y;
    const dist = Math.hypot(dx, dy);
    if (dist < HUB) {
      highlight(undefined);
      return;
    }
    highlight(nearest(dx, dy));
  });

  const release = () => {
    if (gesture === 'reveal') {
      // Let go before the reveal landed: the menu is drawn anyway rather than thrown away,
      // so a press that turned out to be a tap still ends with the commands on screen.
      if (pending) openAt(pending);
      gesture = undefined;
      return;
    }
    if (gesture === 'pick') {
      gesture = undefined;
      if (aimed) commit(aimed);
      else cancel();
    }
  };

  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointercancel', release);
}
