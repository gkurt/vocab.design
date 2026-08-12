import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** Where the two fingers meet, in the canvas's own percentages: the zoom's anchor. */
const ANCHOR = { x: 62, y: 42 };
const STOPS = [1, 2, 4];

/** How far apart the fingertips sit at each factor, along the diagonal they spread on. */
const SEPARATION = (scale: number) => 16 + scale * 9;

const FINGER = [
  'position: absolute',
  'width: 22px',
  'height: 22px',
  'margin: -11px 0 0 -11px',
  'border-radius: 50%',
  'border: 2px solid var(--sp-accent)',
  'background: color-mix(in oklab, var(--sp-accent) 22%, transparent)',
  'transition: transform 0.3s var(--sp-ease)',
].join('; ');

/** Stand-in coastline, with a lighthouse sitting on the anchor so the zoom has a subject. */
const SCENE = `
  <div style="position: absolute; inset: 0; background: linear-gradient(#a9cbe6, #e2edf3 58%, #cdd8c6)"></div>
  <div style="position: absolute; left: 18%; top: 14%; width: 30px; height: 30px; border-radius: 50%; background: #f7d685"></div>
  <div style="position: absolute; left: -14%; bottom: 30%; width: 64%; height: 40%; border-radius: 50% 50% 0 0; background: #8298a7"></div>
  <div style="position: absolute; left: 0; right: 0; bottom: 0; height: 30%; background: #527082"></div>
  <div style="position: absolute; left: ${ANCHOR.x - 1.4}%; top: ${ANCHOR.y - 6}%; width: 9px; height: 26px; border-radius: 2px 2px 0 0; background: #f4f1ea"></div>
  <div style="position: absolute; left: ${ANCHOR.x - 1.4}%; top: ${ANCHOR.y - 6}%; width: 9px; height: 7px; border-radius: 2px 2px 0 0; background: #c0503f"></div>
  <div style="position: absolute; left: 24%; bottom: 12%; width: 30px; height: 9px; border-radius: 3px; background: #33495a"></div>
`;

/**
 * Pinch to zoom specimen: a canvas whose scale is anchored to the point the two
 * fingers meet, not to the middle of the box. The subject is the canvas, since the
 * term names the surface the gesture scales rather than the picture inside it.
 *
 * No step in the choreography vocabulary spreads two fingers (SPEC §8), so the
 * scripted pass reaches each factor through a labelled control and the gesture itself
 * is drawn: two fingertips that move apart for a pinch open and back together for a
 * pinch closed, with the anchor between them marked. The real trackpad path is wired
 * too, since a pinch on a trackpad arrives as a wheel event with `ctrlKey` set, which
 * is what a reader who takes the stage over will actually be doing.
 *
 * The scale is a transform inside a fixed box, so a zoomed canvas never moves anything
 * around it (SPEC §5), and the readouts hold their width at every factor.
 */
export function mount(root: HTMLElement): void {
  const segments = STOPS.map((scale) => `<button class="sp-segment" data-part="stop-${scale}" value="${scale}">${scale}x</button>`);

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Lighthouse</span>
          <span class="sp-text" data-part="readout" style="width: 108px; text-align: right">Scale 1x</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; justify-content: center">
          <div
            class="sp-surface"
            data-part="canvas"
            data-subject
            data-scale="1"
            style="position: relative; overflow: hidden; width: 322px; height: 152px; touch-action: none"
          >
            <div
              data-part="scene"
              style="position: absolute; inset: 0; transform: scale(1); transform-origin: ${ANCHOR.x}% ${ANCHOR.y}%; transition: transform 0.3s var(--sp-ease)"
            >${SCENE}</div>
            <div data-part="gesture" data-direction="none" style="position: absolute; inset: 0; pointer-events: none">
              <span
                data-part="anchor"
                style="position: absolute; left: ${ANCHOR.x}%; top: ${ANCHOR.y}%; width: 8px; height: 8px; margin: -4px 0 0 -4px; border-radius: 50%; background: var(--sp-accent)"
              ></span>
              <span data-part="finger-a" style="${FINGER}; left: ${ANCHOR.x}%; top: ${ANCHOR.y}%"></span>
              <span data-part="finger-b" style="${FINGER}; left: ${ANCHOR.x}%; top: ${ANCHOR.y}%"></span>
              <span
                class="sp-label"
                data-part="gesture-label"
                style="position: absolute; left: 8px; bottom: 6px; width: 148px; padding: 2px 6px; border-radius: 5px; background: var(--sp-surface)"
              >Anchored between the fingers</span>
            </div>
          </div>
        </div>
      </div>
      <sp-segmented class="sp-segmented sp-context" data-part="stops" data-value="1">${segments.join('')}</sp-segmented>
    </div>
  `;

  const canvas = part(root, 'canvas');
  const scene = part(root, 'scene');
  const gesture = part(root, 'gesture');
  const label = part(root, 'gesture-label');
  const readout = part(root, 'readout');
  const fingerA = part(root, 'finger-a');
  const fingerB = part(root, 'finger-b');
  const stops = part(root, 'stops') as HTMLElement & { value: string };

  let scale = 1;

  const place = () => {
    scene.style.transform = `scale(${scale})`;
    canvas.dataset.scale = String(scale);
    readout.textContent = `Scale ${scale}x`;
    // The fingertips carry the scale: further apart is a bigger picture, and the point
    // between them is the one that does not move.
    const gap = SEPARATION(scale);
    fingerA.style.transform = `translate(${-gap}px, ${-gap}px)`;
    fingerB.style.transform = `translate(${gap}px, ${gap}px)`;
  };

  const setScale = (next: number) => {
    if (next === scale) return;
    gesture.dataset.direction = next > scale ? 'open' : 'closed';
    label.textContent = next > scale ? 'Pinch open: fingers out' : 'Pinch closed: fingers in';
    scale = next;
    place();
  };

  place();

  stops.addEventListener('change', (event) => setScale(Number((event as CustomEvent<string>).detail)));

  const step = (by: number) => {
    const at = STOPS.indexOf(scale);
    const next = STOPS[Math.min(Math.max(at + by, 0), STOPS.length - 1)];
    // Through the control, so what it reads never disagrees with what the canvas shows.
    if (next !== undefined) stops.value = String(next);
  };

  // The trackpad pinch, for real: browsers deliver it as a wheel event with ctrlKey set.
  canvas.addEventListener(
    'wheel',
    (event) => {
      if (!event.ctrlKey) return;
      event.preventDefault();
      step(event.deltaY < 0 ? 1 : -1);
    },
    { passive: false },
  );
}
