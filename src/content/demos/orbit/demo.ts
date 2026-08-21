import { part } from '#src/kit/parts.ts';

/** The drawing box inside the viewport's border. */
const VIEW = { w: 300, h: 160 };
const CUBE = 70;
const CENTRE = { x: 150, y: 80 };

/** Degrees of camera travel per pixel of drag, one for each axis of the sphere. */
const AZIMUTH_PER_PX = 0.5;
const ELEVATION_PER_PX = 0.35;
/** The turntable stop: short of the poles, so the horizon never rolls over. */
const ELEVATION_LIMIT = 60;

const HOME = { azimuth: 24, elevation: 16 };

/** The six faces, each tinted by a flat wash rather than by a filter, which would flatten 3D. */
const FACES = [
  { name: 'front', transform: `translateZ(${CUBE / 2}px)`, wash: 'rgb(255 255 255 / 0.1)' },
  { name: 'back', transform: `rotateY(180deg) translateZ(${CUBE / 2}px)`, wash: 'rgb(0 0 0 / 0.28)' },
  { name: 'right', transform: `rotateY(90deg) translateZ(${CUBE / 2}px)`, wash: 'rgb(0 0 0 / 0.18)' },
  { name: 'left', transform: `rotateY(-90deg) translateZ(${CUBE / 2}px)`, wash: 'rgb(0 0 0 / 0.1)' },
  { name: 'top', transform: `rotateX(90deg) translateZ(${CUBE / 2}px)`, wash: 'rgb(255 255 255 / 0.3)' },
  { name: 'bottom', transform: `rotateX(-90deg) translateZ(${CUBE / 2}px)`, wash: 'rgb(0 0 0 / 0.36)' },
];

const faces = FACES.map(
  (face) => `
    <span
      style="position: absolute; inset: 0; background: var(--sp-accent); box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.24), inset 0 0 0 ${CUBE}px ${face.wash}; transform: ${face.transform}"
    ></span>`,
).join('');

/**
 * A fixed anchor the script drags from and to, kept well clear of the model it turns. It
 * carries no paint: a drawn mark would annotate the choreography, not the term (SPEC §5).
 */
const dot = (name: string, x: number, y: number) => `
  <span
    data-part="${name}"
    aria-hidden="true"
    style="position: absolute; left: ${x - 7}px; top: ${y - 7}px; width: 14px; height: 14px; pointer-events: none"
  ></span>`;

/**
 * Orbit specimen: a model on a turntable, with the camera's azimuth and elevation printed as
 * the drag moves them. Dragging sideways carries the camera around the target, dragging up
 * raises it, and the elevation stops short of the pole, which is the difference between an
 * orbit a reader can always get out of and a free tumble.
 *
 * The subject is the model. The term names what the camera is orbiting, not the viewport it is
 * framed in, so the pin belongs on the object itself. The ground, the two angle readouts and the
 * reset control are the scene around it in the context register, and the points the script drags
 * between are unpainted anchors.
 *
 * **The transform is applied to the model because CSS has no camera.** Turning the object by
 * the exact inverse of the camera's rotation produces the identical picture, which is why the
 * equivalence is safe to draw and also why the readouts speak about the camera rather than
 * about the model: what the reader is moving is a viewpoint. The transform order is a
 * turntable's, azimuth in the model's own frame and elevation in the world's, so the horizon
 * stays level however far the orbit runs.
 *
 * Nothing eases: an orbit tracks the hand one to one, and the reset snaps, so there is no
 * scripted animation here to gate. The model is absolutely positioned over a fixed viewport and
 * both readouts hold their boxes, so turning the camera moves nothing on the page (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 296px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Viewer</span>
          <span class="sp-text" data-part="readout" style="width: 336px; text-align: right; white-space: nowrap">Resting at the home view</span>
        </div>

        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 10px">
          <div
            class="sp-surface"
            data-part="viewport"
            data-view="home"
            data-clamped="no"
            style="position: relative; flex: 0 0 auto; width: ${VIEW.w + 2}px; height: ${VIEW.h + 2}px; overflow: hidden; background: var(--sp-sunken); perspective: 620px; touch-action: none; user-select: none; cursor: grab"
          >
            <span
              class="sp-context"
              style="position: absolute; left: ${CENTRE.x - 70}px; top: ${CENTRE.y + 30}px; width: 140px; height: 34px; border-radius: 50%; background: var(--sp-line)"
            ></span>

            <div
              data-part="model"
              data-subject
              style="position: absolute; left: ${CENTRE.x - CUBE / 2}px; top: ${CENTRE.y - CUBE / 2}px; width: ${CUBE}px; height: ${CUBE}px; transform-style: preserve-3d; transform: rotateX(${HOME.elevation}deg) rotateY(${HOME.azimuth}deg)"
            >${faces}</div>

            <span style="position: absolute; inset: 0; pointer-events: none; z-index: 2">
              ${dot('grip', 60, 130)}
              ${dot('grip-right', 240, 130)}
              ${dot('grip-up', 60, 30)}
            </span>
          </div>

          <div class="sp-stack sp-context" style="width: 118px; gap: 6px">
            <span class="sp-label">Azimuth</span>
            <span class="sp-heading" data-part="azimuth" style="font-size: 14px; font-variant-numeric: tabular-nums">24 deg</span>
            <span class="sp-label">Elevation</span>
            <span class="sp-heading" data-part="elevation" style="font-size: 14px; font-variant-numeric: tabular-nums">16 deg</span>
            <div class="sp-divider"></div>
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="reset">Reset view</button>
          </div>
        </div>

        <span class="sp-label sp-context" style="padding: 0 14px 9px; text-align: center; line-height: 1.4">
          The camera is what travels. The model never turns, and never leaves the middle of the frame.
        </span>
      </div>
    </div>
  `;

  const viewport = part(root, 'viewport');
  const model = part(root, 'model');
  const readout = part(root, 'readout');
  const azimuthOut = part(root, 'azimuth');
  const elevationOut = part(root, 'elevation');

  let azimuth = HOME.azimuth;
  let elevation = HOME.elevation;
  let grabbed: { x: number; y: number; azimuth: number; elevation: number } | undefined;

  const say = (text: string) => {
    readout.textContent = text;
  };

  const render = () => {
    model.style.transform = `rotateX(${elevation}deg) rotateY(${azimuth}deg)`;
    azimuthOut.textContent = `${Math.round(((azimuth % 360) + 360) % 360)} deg`;
    elevationOut.textContent = `${Math.round(elevation)} deg`;
    const home = Math.round(azimuth) === HOME.azimuth && Math.round(elevation) === HOME.elevation;
    viewport.dataset.view = home ? 'home' : 'turned';
  };

  viewport.addEventListener('pointerdown', (event) => {
    // An orbit that runs past the viewport is still this viewport's orbit, so the pointer is
    // captured: without it the moves stop at the edge and the release lands somewhere else,
    // leaving the camera held. A synthesized pointer cannot be captured, hence the guard.
    if (event.isTrusted) viewport.setPointerCapture(event.pointerId);
    grabbed = { x: event.clientX, y: event.clientY, azimuth, elevation };
    viewport.dataset.clamped = 'no';
    viewport.style.cursor = 'grabbing';
    say('Holding the camera on its sphere');
  });

  root.addEventListener('pointermove', (event) => {
    if (!grabbed) return;
    azimuth = grabbed.azimuth + (event.clientX - grabbed.x) * AZIMUTH_PER_PX;
    // Up is a higher camera, so the drag's downward axis is inverted before it is applied.
    const wanted = grabbed.elevation - (event.clientY - grabbed.y) * ELEVATION_PER_PX;
    elevation = Math.max(-ELEVATION_LIMIT, Math.min(ELEVATION_LIMIT, wanted));
    const clamped = Math.abs(wanted) > ELEVATION_LIMIT;
    viewport.dataset.clamped = clamped ? 'yes' : 'no';
    render();
    if (clamped) return say(`The camera stops at ${ELEVATION_LIMIT} deg, short of the pole`);
    say('Orbiting: the target has not moved');
  });

  const release = () => {
    if (!grabbed) return;
    grabbed = undefined;
    viewport.style.cursor = 'grab';
    if (viewport.dataset.clamped === 'yes') return;
    say('Resting where the camera was let go');
  };

  viewport.addEventListener('pointerup', release);
  viewport.addEventListener('pointercancel', release);

  part(root, 'reset').addEventListener('click', () => {
    azimuth = HOME.azimuth;
    elevation = HOME.elevation;
    viewport.dataset.clamped = 'no';
    render();
    say('Back at the home view');
  });
}
