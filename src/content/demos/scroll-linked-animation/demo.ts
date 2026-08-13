import { part } from '#src/kit/parts.ts';

/** Ring geometry, stated once so the dash length and the drawn circle cannot drift apart. */
const R = 25;
const C = 2 * Math.PI * R;
/** The rail the sonde travels, and the sonde it has to leave room for. */
const RAIL = 104;
const SONDE = 14;
/** The reading at the bottom of the log, so the number in the ring means something. */
const DEPTH = 240;

const SECTIONS = [
  ['0 m', 'Surface'],
  ['60 m', 'Thermocline'],
  ['120 m', 'Twilight'],
  ['180 m', 'Cold layer'],
  ['240 m', 'Seabed'],
];

/**
 * Scroll-linked specimen: a figure whose every value is read off the scroller's own
 * position. Progress is `scrollTop` over the scrollable distance, and the ring's fill, the
 * sonde's place on its rail, and the depth in the middle are all that one number rendered
 * three ways. There is no playback to interrupt: scrolling back up walks the figure
 * backwards through exactly the frames it came through, because the position is the
 * playhead rather than a cue.
 *
 * The subject is the linked figure alone. The log it reads from, the readout in the bar,
 * and the section list are scenery: they are what is being scrolled, not what is animating.
 *
 * Nothing here transitions and nothing is timed, so the demo keeps no clock and reduced
 * motion has nothing to flatten: every frame is written straight from a position the reader
 * chose. A transition would be wrong even with motion on, since an eased ring is a ring
 * lagging the scrollbar. `data-at` names the two ends and the travel between them, and
 * `data-progress` carries the whole number, so a script can prove the mapping in both
 * directions.
 */
export function mount(root: HTMLElement): void {
  const sections = SECTIONS.map(
    ([depth, name]) => `
      <div class="sp-stack" style="gap: 7px; padding: 12px 0">
        <span class="sp-row sp-row--between">
          <span class="sp-heading" style="font-size: 13px">${name}</span>
          <span class="sp-label">${depth}</span>
        </span>
        <span class="sp-line" style="width: 94%"></span>
        <span class="sp-line" style="width: 78%"></span>
        <span class="sp-line" style="width: 86%"></span>
      </div>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 402px; height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Dive log</span>
          <span class="sp-label" data-part="readout">0% scrolled</span>
        </div>
        <div class="sp-row" style="flex: 1 1 auto; min-height: 0; align-items: stretch; gap: 0">
          <div class="sp-scroll sp-context" data-part="page" style="flex: 1 1 auto; padding: 0 14px">
            ${sections}
          </div>
          <figure
            data-part="figure"
            data-subject
            data-at="start"
            data-progress="0"
            style="display: flex; flex-direction: column; align-items: center; gap: 10px; flex: 0 0 auto;
                   width: 132px; margin: 0; padding: 14px 0; border-left: 1px solid var(--sp-line);
                   background: var(--sp-surface)"
          >
            <span style="position: relative; width: 68px; height: 68px">
              <svg viewBox="0 0 68 68" width="68" height="68" aria-hidden="true" style="display: block; transform: rotate(-90deg)">
                <circle cx="34" cy="34" r="${R}" fill="none" stroke="var(--sp-sunken)" stroke-width="6" />
                <circle
                  data-part="ring"
                  cx="34" cy="34" r="${R}" fill="none" stroke="var(--sp-accent)" stroke-width="6" stroke-linecap="round"
                  stroke-dasharray="${C.toFixed(2)}" stroke-dashoffset="${C.toFixed(2)}"
                />
              </svg>
              <span
                data-part="depth"
                style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
                       font-size: 13px; font-weight: 600"
              >0 m</span>
            </span>
            <span
              data-part="rail"
              style="position: relative; width: 4px; height: ${RAIL}px; border-radius: 999px; background: var(--sp-sunken)"
            >
              <span
                data-part="sonde"
                style="position: absolute; top: 0; left: 50%; width: ${SONDE}px; height: ${SONDE}px; margin-left: -${SONDE / 2}px;
                       border-radius: 5px; background: var(--sp-accent)"
              ></span>
            </span>
            <figcaption class="sp-label">Descent</figcaption>
          </figure>
        </div>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const figure = part(root, 'figure');
  const ring = part(root, 'ring');
  const depth = part(root, 'depth');
  const sonde = part(root, 'sonde');
  const readout = part(root, 'readout');

  const sync = () => {
    const travel = page.scrollHeight - page.clientHeight;
    const p = travel > 0 ? Math.min(Math.max(page.scrollTop / travel, 0), 1) : 0;
    ring.setAttribute('stroke-dashoffset', (C * (1 - p)).toFixed(2));
    sonde.style.top = `${p * (RAIL - SONDE)}px`;
    depth.textContent = `${Math.round(p * DEPTH)} m`;
    figure.dataset.progress = String(Math.round(p * 100));
    figure.dataset.at = p < 0.02 ? 'start' : p > 0.98 ? 'end' : 'middle';
    readout.textContent = `${Math.round(p * 100)}% scrolled`;
  };

  page.addEventListener('scroll', sync);
  sync();
}
