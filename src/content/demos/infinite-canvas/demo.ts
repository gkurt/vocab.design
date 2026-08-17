import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The camera's window onto the plane. Stated, never measured, so nothing reads back a write. */
const VIEW_W = 344;
const VIEW_H = 204;

type Node = { x: number; y: number; w: number; h: number; label: string };

/** Shapes at coordinates on the plane. Their bounding box is the only privileged view. */
const NODES: Node[] = [
  { x: 44, y: 26, w: 112, h: 48, label: 'Intake' },
  { x: 200, y: 76, w: 122, h: 52, label: 'Survey' },
  { x: 70, y: 130, w: 104, h: 44, label: 'Berth' },
  { x: 228, y: 152, w: 112, h: 44, label: 'Release' },
];

const BOUNDS = { x: 44, y: 26, w: 296, h: 170 };

/** The overview badge's window on the plane, and the scale it draws at. */
const MAP = { x: -278, y: -209, scale: 0.1, w: 94, h: 64 };

const clamp = (value: number, low: number, high: number) => Math.min(Math.max(value, low), high);

/** The camera's resting offset, stated so the specimen mounts in the state it renders. */
const HOME = { x: (VIEW_W - BOUNDS.w) / 2 - BOUNDS.x, y: (VIEW_H - BOUNDS.h) / 2 - BOUNDS.y };
const GLIDE = 'transform 0.22s var(--sp-ease)';

/**
 * Infinite canvas specimen: a bounded viewport over an unbounded plane, with a dot grid
 * that travels with the content, an overview badge, and a Fit command.
 *
 * The subject is the viewport, the camera's window: the term names the arrangement where
 * there is no page, only this box and a plane under it. The zoom picker, the Fit button and
 * the overview badge are instrumentation and wear the context register (SPEC §5), and the
 * badge sits outside the viewport rather than inside it so nothing in the subject is
 * chrome.
 *
 * The grid is a child of the transformed world, not a background on the viewport, which is
 * the whole reason the surface reads as unbounded: pan and the dots go with the shapes.
 * Zoom keeps the point at the viewport centre fixed, since a zoom that recentres throws
 * away the reader's place. The transform eases, except while a drag is holding it, where a
 * transition would be the plane lagging the pointer.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Board</span>
          <sp-segmented class="sp-segmented" data-part="switcher" data-value="100">
            <button class="sp-segment" type="button" data-part="seg-50" value="50">50%</button>
            <button class="sp-segment" type="button" data-part="seg-100" value="100">100%</button>
            <button class="sp-segment" type="button" data-part="seg-150" value="150">150%</button>
          </sp-segmented>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="fit">Fit</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 8px; padding: 12px">
          <div style="display: flex; gap: 10px">
          <div
            data-part="viewport"
            data-subject
            data-at="home"
            data-zoom="100"
            role="application"
            aria-label="Board canvas"
            style="position: relative; flex: 0 0 auto; width: ${VIEW_W}px; height: ${VIEW_H}px; overflow: hidden;
                   background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius); cursor: grab"
          >
            <div
              data-part="world"
              style="position: absolute; left: 0; top: 0; width: 0; height: 0; transform-origin: 0 0;
                     transform: translate(${HOME.x}px, ${HOME.y}px) scale(1); transition: ${GLIDE}"
            >
              <div
                aria-hidden="true"
                style="position: absolute; left: -900px; top: -700px; width: 2400px; height: 1800px;
                       background-image: radial-gradient(circle, var(--sp-line) 1.4px, transparent 1.6px); background-size: 26px 26px"
              ></div>
              ${NODES.map(
                (node) => `
                <div class="sp-surface" style="position: absolute; left: ${node.x}px; top: ${node.y}px; width: ${node.w}px; height: ${node.h}px; padding: 8px 10px; box-shadow: var(--sp-shadow)">
                  <span class="sp-heading" style="font-size: 12px">${node.label}</span>
                  <div class="sp-line" style="width: 72%; margin-top: 7px"></div>
                </div>`,
              ).join('')}
            </div>
            <span data-part="pan-start" aria-hidden="true" style="position: absolute; left: 236px; top: 40px; width: 26px; height: 26px; pointer-events: none"></span>
            <span data-part="pan-end" aria-hidden="true" style="position: absolute; left: 136px; top: 98px; width: 26px; height: 26px; pointer-events: none"></span>
          </div>
          <div class="sp-stack sp-context" style="flex: 0 0 auto; width: 98px; gap: 6px">
            <span class="sp-label" style="font-size: 11px">overview</span>
            <div
              data-part="badge"
              style="position: relative; width: ${MAP.w}px; height: ${MAP.h}px; background: var(--sp-surface);
                     border: 1px solid var(--sp-line); border-radius: 5px; overflow: hidden"
            >
              ${NODES.map(
                (node) => `
                <span style="position: absolute; left: ${(node.x - MAP.x) * MAP.scale}px; top: ${(node.y - MAP.y) * MAP.scale}px;
                             width: ${Math.max(node.w * MAP.scale, 3)}px; height: ${Math.max(node.h * MAP.scale, 3)}px;
                             border-radius: 1px; background: var(--sp-muted)"></span>`,
              ).join('')}
              <span
                data-part="badge-view"
                style="position: absolute; border: 2px solid var(--sp-ink); border-radius: 2px;
                       background: color-mix(in srgb, var(--sp-ink) 10%, transparent)"
              ></span>
            </div>
          </div>
          </div>
          <span class="sp-text sp-context" data-part="readout" style="height: 19px; font-size: 12px"></span>
        </div>
      </div>
    </div>
  `;

  const viewport = part(root, 'viewport');
  const world = part(root, 'world');
  const badgeView = part(root, 'badge-view');
  const readout = part(root, 'readout');
  const switcher = part(root, 'switcher') as HTMLElement & { value: string };

  /** The camera: where the plane's origin lands on screen, and at what scale. */
  let zoom = 1;
  let offset = { x: 0, y: 0 };

  const homeAt = (scale: number) => ({
    x: (VIEW_W - BOUNDS.w * scale) / 2 - BOUNDS.x * scale,
    y: (VIEW_H - BOUNDS.h * scale) / 2 - BOUNDS.y * scale,
  });

  const render = () => {
    world.style.transform = `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`;
    viewport.dataset.zoom = String(Math.round(zoom * 100));

    const home = homeAt(1);
    const parked = zoom === 1 && Math.abs(offset.x - home.x) < 3 && Math.abs(offset.y - home.y) < 3;
    viewport.dataset.at = parked ? 'home' : 'away';

    const left = clamp((-offset.x / zoom - MAP.x) * MAP.scale, 0, MAP.w - 6);
    const top = clamp((-offset.y / zoom - MAP.y) * MAP.scale, 0, MAP.h - 6);
    badgeView.style.left = `${left}px`;
    badgeView.style.top = `${top}px`;
    badgeView.style.width = `${clamp((VIEW_W / zoom) * MAP.scale, 6, MAP.w - left)}px`;
    badgeView.style.height = `${clamp((VIEW_H / zoom) * MAP.scale, 6, MAP.h - top)}px`;

    readout.textContent = parked ? 'Fit frames what exists: the only home an unbounded plane has.' : 'The plane has no edge to stop at.';
  };

  const setZoom = (next: number) => {
    // The point under the viewport centre stays where it is: a zoom that recentres
    // throws away the reader's place.
    offset = {
      x: VIEW_W / 2 - (VIEW_W / 2 - offset.x) * (next / zoom),
      y: VIEW_H / 2 - (VIEW_H / 2 - offset.y) * (next / zoom),
    };
    zoom = next;
    render();
  };

  switcher.addEventListener('change', (event) => setZoom(Number((event as CustomEvent<string>).detail) / 100));

  part(root, 'fit').addEventListener('click', () => {
    // Setting the picker's value is what changes the scale, so the control can never
    // disagree with the camera it names.
    switcher.value = '100';
    offset = homeAt(1);
    zoom = 1;
    render();
  });

  let from: { x: number; y: number; ox: number; oy: number } | null = null;

  viewport.addEventListener('pointerdown', (event) => {
    from = { x: (event as PointerEvent).clientX, y: (event as PointerEvent).clientY, ox: offset.x, oy: offset.y };
    world.style.transition = 'none';
    viewport.style.cursor = 'grabbing';
  });

  viewport.addEventListener('pointermove', (event) => {
    if (!from) return;
    offset = { x: from.ox + ((event as PointerEvent).clientX - from.x), y: from.oy + ((event as PointerEvent).clientY - from.y) };
    render();
  });

  const release = () => {
    from = null;
    world.style.transition = GLIDE;
    viewport.style.cursor = 'grab';
  };
  viewport.addEventListener('pointerup', release);
  viewport.addEventListener('pointercancel', release);

  // Mounted in the state it renders: the first render writes the transform the markup
  // already carries, so the eased camera cannot glide into place on mount (SPEC §5).
  offset = homeAt(1);
  render();
}
