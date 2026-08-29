import { localBox } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';

/** The pinned figure's own height, and the scroll distance the pin is allowed to spend. */
const FIGURE = 128;
const TRAVEL = 238;

const STEPS = [
  ['Lay the gravel bed', 'Step 1 of 3'],
  ['Set the stone course', 'Step 2 of 3'],
  ['Cap and point it', 'Step 3 of 3'],
] as const;

const lines = (count: number, widths: string[]) =>
  Array.from({ length: count }, (_, i) => `<span class="sp-line" style="width: ${widths[i % widths.length]}"></span>`).join('');

const block = (title: string, count: number) => `
  <div class="sp-stack sp-context" style="gap: 8px; padding: 14px">
    <span class="sp-heading" style="font-size: 13px">${title}</span>
    ${lines(count, ['96%', '88%', '92%', '74%'])}
  </div>`;

const note = (title: string, count: number) => `
  <div class="sp-stack" style="gap: 7px">
    <span class="sp-label">${title}</span>
    ${lines(count, ['92%', '80%', '86%'])}
  </div>`;

const courses = [3, 2, 1]
  .map(
    (n) => `
      <span
        class="sp-swatch"
        data-part="course-${n}"
        style="--sp-swatch: var(--sp-line); height: 22px; width: ${n === 1 ? '100%' : n === 2 ? '88%' : '76%'}"
      ></span>`,
  )
  .join('');

/**
 * Scroll pinning specimen: a figure that sticks to the top of the scroller for a fixed
 * stretch of the document, advances its own steps while it is held there, and then
 * releases and scrolls away with everything else. The wall builds a course at a time on
 * scroll distance the reader spends without the figure moving at all.
 *
 * The subject is the pinned figure. The chapter text above and below it is what the pin
 * is measured against (it keeps moving while the figure does not), and the readout in
 * the bar is scenery that names the state out loud.
 *
 * `position: sticky` is the mechanism, and the section's extra height is the budget: the
 * figure is held for exactly the height its container has beyond it, which is also why
 * nothing below jumps when the pin engages. Everything is read off the scroller's own
 * position, so there is no playback and no timer, and scrolling back up unpins the figure
 * through the same frames it pinned through. `data-pin` names the three states and
 * `data-step` the course being laid, so a script can prove pinned and released apart.
 *
 * A figure scrolling past like any other block is not pinned, so the honest condition
 * lives in `data-pose`: identify scrolls the section into its range rather than ringing
 * the figure while it is still travelling (SPEC §6).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 436px; height: 248px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Building a dry stone wall</span>
          <span class="sp-text" data-part="readout" style="width: 86px; text-align: right; white-space: nowrap">Not pinned</span>
        </div>
        <div class="sp-scroll" data-part="page" style="flex: 1 1 auto; min-height: 0">
          ${block('Choosing your stone', 4)}
          <div data-part="section">
            <figure
              data-part="figure"
              data-subject
              data-pin="before"
              data-step="1"
              data-pose="[data-pin=pinned]"
              style="position: sticky; top: 0; z-index: 1; display: flex; align-items: center; gap: 16px; height: ${FIGURE}px;
                     margin: 0; padding: 0 16px; background: var(--sp-surface); border-top: 1px solid var(--sp-line);
                     border-bottom: 1px solid var(--sp-line)"
            >
              <span style="display: flex; flex-direction: column; gap: 4px; width: 132px; height: 74px">${courses}</span>
              <figcaption class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 6px">
                <span class="sp-label" data-part="counter">Step 1 of 3</span>
                <span
                  class="sp-heading"
                  data-stage-verdict data-part="caption"
                  style="font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
                >Lay the gravel bed</span>
                <div class="sp-progress" data-part="spent" style="margin-top: 2px; --sp-value: 0%">
                  <!-- No transition: an eased fill is a fill lagging the scrollbar that drives it. -->
                  <div class="sp-progress-fill" style="transition: none"></div>
                </div>
              </figcaption>
            </figure>
            <!-- The notes are what moves while the figure does not, and the height the pin
                 is spent on: sticky holds the figure for exactly this much scrolling. -->
            <div class="sp-stack sp-context" data-part="notes" style="gap: 10px; height: ${TRAVEL}px; padding: 14px; overflow: hidden">
              ${note('Bed', 3)} ${note('Course', 3)} ${note('Cap', 3)}
            </div>
          </div>
          ${block('Finishing the cap', 6)}
        </div>
      </div>
    </div>
  `;

  const page = part(root, 'page');
  const section = part(root, 'section');
  const figure = part(root, 'figure');
  const caption = part(root, 'caption');
  const counter = part(root, 'counter');
  const spent = part(root, 'spent');
  const readout = part(root, 'readout');
  const courseParts = [1, 2, 3].map((n) => part(root, `course-${n}`));

  const sync = () => {
    // How far the scroller has eaten into the section, and how far it may: the pin lasts
    // exactly the height the section has beyond the figure it holds.
    const passed = -localBox(section, page).top;
    const travel = section.offsetHeight - figure.offsetHeight;
    const pinned = passed > 0.5 && passed < travel - 0.5;
    const p = Math.min(Math.max(passed / travel, 0), 1);
    const step = p < 1 / 3 ? 1 : p < 2 / 3 ? 2 : 3;

    figure.dataset.pin = pinned ? 'pinned' : passed <= 0.5 ? 'before' : 'after';
    figure.dataset.step = String(step);
    const [label, count] = STEPS[step - 1] ?? STEPS[0];
    caption.textContent = label;
    counter.textContent = count;
    spent.style.setProperty('--sp-value', `${Math.round(p * 100)}%`);
    for (const [i, course] of courseParts.entries())
      course.style.setProperty('--sp-swatch', i < step ? 'var(--sp-accent)' : 'var(--sp-line)');
    readout.textContent = pinned ? 'Pinned' : passed <= 0.5 ? 'Not pinned' : 'Released';
  };

  page.addEventListener('scroll', sync);
  sync();
}
