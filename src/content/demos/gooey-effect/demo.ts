import { prefersReducedMotion } from '#src/kit/motion.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const STAGE = { w: 434, h: 140 };
const GROUP = { w: 310, h: 62 };
const BLOB = 62;
const BLUR = 9;
const MOVE_MS = 620;

type Gap = 'apart' | 'touching' | 'merged';

/** Written-out offsets, never a scattered draw: the same three spots on every run. */
const GAPS: Record<Gap, { offsets: [number, number, number]; note: string }> = {
  apart: { offsets: [-118, 0, 118], note: 'Apart: each falloff dies before it reaches the next one.' },
  touching: { offsets: [-54, 0, 54], note: 'Touching: the falloffs overlap and a neck forms between them.' },
  merged: { offsets: [-26, 0, 26], note: 'Merged: one silhouette, from three shapes nothing has deformed.' },
};

/**
 * A page can hold more than one specimen, and an SVG filter is referenced by id: a second instance
 * sharing this one's id would silently borrow its definition, so each mount stamps its own.
 */
let instances = 0;

/**
 * Gooey effect specimen: three circles under one SVG filter, with a segmented control setting how
 * far apart they sit. The filter is the whole term and it is two primitives long. `feGaussianBlur`
 * turns every edge into a falloff, so overlapping shapes add up in the space between them, and
 * `feColorMatrix` multiplies the alpha by 24 and subtracts 11, which pushes anything above the
 * threshold to solid and everything under it to nothing. Isolated edges come back where they were;
 * the bridge between two near neighbours comes back as surface.
 *
 * The subject is the blob group, since the merging is a property of the shapes being composited
 * together rather than of any one circle. `Apart` is the state where nothing is merging, so the
 * honest condition lives in `data-pose` on the group and the mount state (`touching`) satisfies it
 * (SPEC §6). The filter lives on the layer around the group rather than on the group itself, so the
 * subject carries no per-instance id. The control and the readout are the scene.
 *
 * `motion.css` cannot reach an `element.animate` keyframe set, so the demo asks
 * `prefersReducedMotion` itself and writes the new offsets straight on. The stage holds a box fixed
 * at mount and the circles are absolutely placed inside it, so nothing else moves (SPEC §5); the
 * settle beat comes from the stage's clock.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const filterId = `sp-goo-${++instances}`;
  const blob = (index: number, x: number) => `
    <span
      data-part="blob-${index + 1}"
      style="position: absolute; left: 50%; top: 0; width: ${BLOB}px; height: ${BLOB}px; margin-left: ${-BLOB / 2}px;
             border-radius: 50%; background: var(--sp-accent); transform: translateX(${x}px)"
    ></span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" data-part="scene" data-gap="touching" data-state="rested" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Spacing</span>
          <sp-segmented class="sp-segmented" data-part="mode" data-value="touching">
            <button class="sp-segment" type="button" data-part="seg-apart" value="apart">Apart</button>
            <button class="sp-segment" type="button" data-part="seg-touching" value="touching">Touching</button>
            <button class="sp-segment" type="button" data-part="seg-merged" value="merged">Merged</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px">
          <svg width="0" height="0" aria-hidden="true" style="position: absolute">
            <filter id="${filterId}" color-interpolation-filters="sRGB">
              <feGaussianBlur in="SourceGraphic" stdDeviation="${BLUR}" result="blurred" />
              <feColorMatrix in="blurred" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -11" />
            </filter>
          </svg>

          <div data-part="stage" style="position: relative; width: ${STAGE.w}px; height: ${STAGE.h}px">
            <div data-part="layer" style="position: absolute; inset: 0; filter: url(#${filterId})">
              <div
                data-part="blob" data-subject data-pose=":not([data-gap=apart])" data-gap="touching"
                style="position: absolute; left: 50%; top: 50%; width: ${GROUP.w}px; height: ${GROUP.h}px;
                       margin: ${-GROUP.h / 2}px 0 0 ${-GROUP.w / 2}px"
              >${GAPS.touching.offsets.map((x, i) => blob(i, x)).join('')}</div>
            </div>
          </div>

          <div class="sp-stack sp-context" data-part="readout" style="gap: 2px; width: ${STAGE.w}px; height: 34px">
            <span class="sp-label" style="font-size: 11px">feGaussianBlur ${BLUR}, then feColorMatrix alpha x 24 - 11</span>
            <span class="sp-text sp-text--ink" data-part="claim" style="font-size: 12px; line-height: 1.35">${GAPS.touching.note}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const group = part(root, 'blob');
  const claim = part(root, 'claim');
  const circles = [part(root, 'blob-1'), part(root, 'blob-2'), part(root, 'blob-3')];
  const reduced = prefersReducedMotion(root);

  let gap: Gap = 'touching';
  let running: Animation[] = [];
  let settling: number | undefined;

  const land = (next: Gap) => {
    for (const animation of running) animation.cancel();
    running = [];
    circles.forEach((circle, i) => {
      circle.style.transform = `translateX(${GAPS[next].offsets[i] ?? 0}px)`;
    });
    scene.dataset.state = 'rested';
  };

  const go = (next: Gap) => {
    clock.clearTimeout(settling);
    const from = GAPS[gap].offsets;
    const to = GAPS[next].offsets;
    gap = next;
    scene.dataset.gap = next;
    group.dataset.gap = next;
    claim.textContent = GAPS[next].note;
    if (reduced) return land(next);

    for (const animation of running) animation.cancel();
    scene.dataset.state = 'moving';
    running = circles.map((circle, i) =>
      circle.animate([{ transform: `translateX(${from[i] ?? 0}px)` }, { transform: `translateX(${to[i] ?? 0}px)` }], {
        duration: MOVE_MS,
        easing: 'cubic-bezier(0.4, 0.05, 0.25, 1)',
        fill: 'forwards',
      }),
    );
    settling = clock.setTimeout(() => land(next), MOVE_MS + 70);
  };

  // Each segment names a spacing outright, so a resumed pass lands on the one it asked for.
  part(root, 'mode').addEventListener('change', (event) => go((event as CustomEvent<string>).detail as Gap));

  land('touching');
}
