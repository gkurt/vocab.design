import { prefersReducedMotion } from '#src/kit/motion.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The placeholder panel's own width, so the band's travel is stated rather than measured. */
const PANEL = 420;
const BAND = 130;
/** The band enters with its leading edge off the panel and leaves the same way. */
const START = -70;
const END = PANEL - 60;
/** One pass, and the frame the sweep rests on when a reader has asked for less movement. */
const CYCLE = 1200;
const REST = 150;
/** How often the pass counter reads the animation. Cheap, and it stops with the clock. */
const REPORT = 300;

const BLOCK = 'display: block; background: var(--sp-line); border-radius: 5px';
/** The shapes are the skeleton screen's word, so they carry the context register (SPEC §5). */
const SHAPE = 'class="sp-context"';

/**
 * Shimmer specimen: plain placeholder blocks with ONE highlight band travelling
 * across them, left to right, forever. The band is the subject: the term names the
 * sweep, not the shapes it sweeps over, and the shapes are the skeleton screen's
 * word (SPEC §5). They are drawn with inline styles rather than the kit's own
 * skeleton class, whose background-position shimmer has no element to point at.
 *
 * The band's brightest point is the surface colour behind the shapes, which is the
 * craft trick the article describes: the highlight only shows where a placeholder
 * is, and washes out over the gaps instead of streaking across them.
 *
 * `motion.css` cannot reach an `element.animate` keyframe set, so the demo asks
 * `prefersReducedMotion` itself and parks the band mid-panel instead of playing the
 * sweep, which is the resting frame the stage poses under that preference (SPEC §6).
 *
 * Under reduced motion the readout used to be overwritten with "Sweep held still: the
 * reader asked for less movement.", which was the site explaining its own preference
 * handling inside the panel. It now keeps the counter at zero, which is the truth about
 * a band that is not travelling.
 *
 * The pass counter is read off the animation's own clock rather than off a timer, so
 * `data-swept` means a sweep genuinely completed and cannot pass for a demo whose
 * band never moved. It also carries the term's least comfortable fact: the count
 * climbs and the load reports nothing.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const line = (width: string) => `<span ${SHAPE} style="${BLOCK}; width: ${width}; height: 10px"></span>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 252px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Library</span>
          <span class="sp-label">Fetching</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px">
          <div
            data-part="sweep"
            data-passes="0"
            style="position: relative; overflow: hidden; width: ${PANEL}px; padding: 14px; border-radius: 6px;
                   background: var(--sp-surface); display: flex; flex-direction: column; gap: 10px"
          >
            <span data-part="cover" ${SHAPE} style="${BLOCK}; width: 100%; height: 64px; border-radius: 6px"></span>
            ${line('78%')}
            ${line('92%')}
            ${line('52%')}
            <span
              data-part="band"
              data-subject
              style="position: absolute; top: 0; bottom: 0; left: 0; width: ${BAND}px; pointer-events: none;
                     transform: translateX(${START}px);
                     background: linear-gradient(105deg, transparent 0%, var(--sp-surface) 50%, transparent 100%)"
            ></span>
          </div>
          <span
            class="sp-label sp-context"
            data-part="readout"
            style="align-self: flex-start; margin-left: 7px; white-space: nowrap; font-variant-numeric: tabular-nums"
          >Sweeps completed: 0. Progress reported: none.</span>
        </div>
      </div>
    </div>
  `;

  const band = part(root, 'band');
  const sweep = part(root, 'sweep');
  const readout = part(root, 'readout');

  if (prefersReducedMotion(root)) {
    band.style.transform = `translateX(${REST}px)`;
    return;
  }

  const anim = band.animate([{ transform: `translateX(${START}px)` }, { transform: `translateX(${END}px)` }], {
    duration: CYCLE,
    iterations: Number.POSITIVE_INFINITY,
    easing: 'linear',
  });

  let passes = -1;
  const tick = () => {
    const done = Math.floor(Number(anim.currentTime ?? 0) / CYCLE);
    if (done !== passes) {
      passes = done;
      sweep.dataset.passes = String(done);
      flag(sweep, 'data-swept', done >= 1);
      readout.textContent = `Sweeps completed: ${done}. Progress reported: none.`;
    }
    clock.setTimeout(tick, REPORT);
  };
  tick();
}
