import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const ART = { w: 380, h: 152 };
const DRAW_MS = 1400;
/** Four pixels: thin enough to read as a drawn line, thick enough that the stage sees a box at all. */
const STROKE = 4;

const ROUTE = 'M 30 122 C 76 118, 84 70, 128 64 C 170 58, 188 106, 228 100 C 268 94, 264 44, 306 38 L 350 30';

/** Quiet city blocks, the gaps between them reading as streets: the picture the route crosses. */
const MAP = `
  <rect x="0.5" y="0.5" width="${ART.w - 1}" height="${ART.h - 1}" rx="8" fill="var(--sp-surface)" stroke="var(--sp-line)" />
  <g fill="var(--sp-line)">
    <rect x="20" y="16" width="62" height="46" rx="4" />
    <rect x="96" y="16" width="78" height="46" rx="4" />
    <rect x="188" y="16" width="56" height="46" rx="4" />
    <rect x="258" y="16" width="46" height="46" rx="4" />
    <rect x="318" y="16" width="42" height="46" rx="4" />
    <rect x="20" y="100" width="72" height="36" rx="4" />
    <rect x="106" y="100" width="58" height="36" rx="4" />
    <rect x="178" y="100" width="66" height="36" rx="4" />
    <rect x="258" y="100" width="46" height="36" rx="4" />
    <rect x="318" y="100" width="42" height="36" rx="4" />
  </g>`;

const pin = (x: number, y: number) => `
  <g>
    <circle cx="${x}" cy="${y}" r="7" fill="var(--sp-muted)" />
    <circle cx="${x}" cy="${y}" r="2.6" fill="var(--sp-surface)" />
  </g>`;

/**
 * Line drawing animation specimen: a route across a map that draws itself from the first pin to the
 * second. The whole mechanism is two properties: `stroke-dasharray` is set to the path's own length,
 * so the stroke is one dash and one gap; `stroke-dashoffset` starts at that same length, which holds
 * the dash entirely off the front of the path, and animating it to zero slides the dash on from the
 * start.
 *
 * The subject is the route: the guide underneath and the stroke that draws over it are marked
 * together, following the motion path specimen, because a stroke with nothing painted yet is not a
 * box a ring could honestly trace. The map, the pins and the two controls are the scene.
 *
 * A line under the picture used to print the two properties as they moved ("dasharray 374, offset 0:
 * the whole route is painted"). No map prints its own stroke geometry, and the article spells the
 * mechanism out with the same two numbers, so the line is gone and the frame is shorter by it.
 *
 * `motion.css` cannot reach an `element.animate` keyframe set, so the demo asks
 * `prefersReducedMotion` itself and paints the completed route immediately: the finished mark is the
 * information and the pen was only ever decoration. `Instant` is the same answer offered on purpose,
 * which is why it is a mode rather than a counter-example, and the settle beat comes from the stage's
 * clock so a pose stops the pen where it stands (SPEC §6). The picture holds its size from mount, so
 * nothing moves as the route fills in (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-state="drawn" data-mode="draw" style="height: 240px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Route</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Reveal" data-part="mode" data-value="draw">
            <button class="sp-segment" type="button" data-part="seg-draw" value="draw">Draw</button>
            <button class="sp-segment" type="button" data-part="seg-instant" value="instant">Instant</button>
          </sp-segmented>
          <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="replay">Replay</button>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px">
          <svg
            data-part="art"
            width="${ART.w}" height="${ART.h}" viewBox="0 0 ${ART.w} ${ART.h}"
            aria-hidden="true" style="display: block; flex: 0 0 auto"
          >
            <g class="sp-context">${MAP}</g>
            <g data-part="route" data-subject fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="${ROUTE}" stroke="var(--sp-line)" stroke-width="${STROKE}" />
              <path data-part="stroke" d="${ROUTE}" stroke="var(--sp-accent)" stroke-width="${STROKE}" />
            </g>
            <g class="sp-context">${pin(30, 122)}${pin(350, 30)}</g>
          </svg>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  // `part()` is typed for HTML and this one is a path; the length asked for below is why it matters.
  const stroke = part(root, 'stroke') as unknown as SVGPathElement;
  const reduced = prefersReducedMotion(root);

  // Path geometry, not layout: `getTotalLength` answers from the `d` attribute, so it is not a
  // measurement taken after a style write (AGENTS.md).
  const length = Math.round(stroke.getTotalLength());
  stroke.style.strokeDasharray = `${length}`;

  let running: Animation | undefined;
  let settling: number | undefined;

  const land = () => {
    stroke.style.strokeDashoffset = '0';
    scene.dataset.state = 'drawn';
  };

  const play = () => {
    clock.clearTimeout(settling);
    running?.cancel();

    if (reduced || scene.dataset.mode === 'instant') return land();

    stroke.style.strokeDashoffset = `${length}`;
    scene.dataset.state = 'drawing';
    running = stroke.animate([{ strokeDashoffset: `${length}` }, { strokeDashoffset: '0' }], {
      duration: DRAW_MS,
      easing: 'cubic-bezier(0.35, 0, 0.2, 1)',
      fill: 'forwards',
    });
    settling = clock.setTimeout(land, DRAW_MS + 60);
  };

  // Each segment names a mode outright, and Replay names a run: neither flips whatever it finds.
  part(root, 'mode').addEventListener('change', (event) => {
    scene.dataset.mode = (event as CustomEvent<string>).detail;
    play();
  });
  part(root, 'replay').addEventListener('click', play);

  play();
}
