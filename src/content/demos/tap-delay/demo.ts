import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The window the old browsers held open, drawn on a ruler that runs to 400 ms. */
const DELAY_MS = 300;
const SPAN_MS = 400;
const RULER = 170;
const TICK_MS = 20;
const PX_PER_MS = RULER / SPAN_MS;

const ruler = (name: string, clickAt: number, label: string) => `
  <div class="sp-context" style="position: relative; width: ${RULER}px; height: 50px">
    <span
      class="sp-label"
      style="position: absolute; left: ${clickAt}px; top: 0; font-size: 10px; white-space: nowrap; transform: translateX(${clickAt === 0 ? '0' : '-50%'})"
    >${label}</span>
    <span style="position: absolute; left: ${clickAt}px; top: 14px; width: 1px; height: 8px; background: var(--sp-muted)"></span>
    <span
      data-part="pip-${name}"
      style="position: absolute; left: ${clickAt - 3}px; top: 21px; width: 7px; height: 7px; border-radius: 50%; background: var(--sp-accent); opacity: 0; transition: opacity 0.12s"
    ></span>
    <span style="position: absolute; left: 0; right: 0; top: 22px; height: 5px; border-radius: 3px; background: var(--sp-sunken)"></span>
    <span
      data-part="fill-${name}"
      style="position: absolute; left: 0; top: 22px; width: 0; height: 5px; border-radius: 3px; background: var(--sp-accent)"
    ></span>
    <span style="position: absolute; left: 0; top: 27px; width: 1px; height: 8px; background: var(--sp-muted)"></span>
    <span class="sp-label" style="position: absolute; left: 0; top: 34px; font-size: 10px">tap</span>
    <span class="sp-label" style="position: absolute; right: 0; top: 34px; font-size: 10px">${SPAN_MS} ms</span>
  </div>`;

/**
 * Tap delay specimen: the same button under the old rule and the current one, each with a
 * ruler running to 400 ms beneath it. Tapping the left button starts a real countdown on the
 * stage's clock and the click is not dispatched until it finishes; tapping the right one
 * fires as the finger lands.
 *
 * The subject is the delayed button. The ruler is the measurement, not the term: what the
 * word names is a control whose activation waits, so the button is the narrowest element
 * that has the delay. Both rulers, both captions and the modern column are the scene it is
 * read against and carry the context register.
 *
 * Two lines of the site's own voice have gone. A footer bar read "The pause is the browser
 * asking whether a second tap is coming.", which is the article's job, so the bar went with it
 * and the frame lost its height. The left column was headed "A zoomable page, waiting for a
 * second tap" and now names the same condition the right column names, as a declaration:
 * without `touch-action: manipulation`. The readout starts at "No tap yet" rather than telling
 * the reader to tap, and the line it prints while the window runs read "Tapped. Holding 300 ms
 * in case a second tap arrives", which finished a measurement with the browser's reason for it.
 * It reads "Tapped, holding 300 ms" now. The ruler's own labels (tap, click 300 ms, 400 ms) stay:
 * they are the axis of an instrument this demo really draws.
 *
 * The countdown is a clock timer rather than a transition, so a pose freezes it mid-wait and
 * the fill reads as the milliseconds it stands for. Every readout holds its width and the
 * fills are absolutely placed, so a tap moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Shop</span>
          <span class="sp-text" data-part="readout" style="width: 268px; text-align: right; white-space: nowrap">No tap yet</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: stretch; justify-content: center; gap: 14px">
          <div class="sp-surface" style="display: flex; flex-direction: column; align-items: center; gap: 10px; width: 202px; padding: 12px">
            <span class="sp-label sp-context" style="height: 36px; text-align: center">Without <code>touch-action: manipulation</code></span>
            <button class="sp-button" type="button" data-part="legacy" data-subject data-delay="none" style="width: 100%">Add to cart</button>
            ${ruler('legacy', DELAY_MS * PX_PER_MS, `click ${DELAY_MS} ms`)}
          </div>

          <div class="sp-surface sp-context" style="display: flex; flex-direction: column; align-items: center; gap: 10px; width: 202px; padding: 12px">
            <span class="sp-label" style="height: 36px; text-align: center">With <code>touch-action: manipulation</code></span>
            <button class="sp-button" type="button" data-part="modern" data-delay="none" style="width: 100%">Add to cart</button>
            ${ruler('modern', 0, 'click 0 ms')}
          </div>
        </div>
      </div>
    </div>
  `;

  const legacy = part(root, 'legacy');
  const modern = part(root, 'modern');
  const readout = part(root, 'readout');

  let timer: number | undefined;
  let elapsed = 0;

  const say = (text: string) => {
    readout.textContent = text;
  };

  const reset = () => {
    clock.clearTimeout(timer);
    timer = undefined;
    elapsed = 0;
    for (const button of [legacy, modern]) {
      button.removeAttribute('data-fired');
      button.dataset.delay = 'none';
    }
    for (const name of ['legacy', 'modern']) {
      part(root, `fill-${name}`).style.width = '0';
      part(root, `pip-${name}`).style.opacity = '0';
    }
  };

  const fire = (button: HTMLElement, name: string, delay: number, text: string) => {
    button.setAttribute('data-fired', '');
    button.dataset.delay = String(delay);
    part(root, `pip-${name}`).style.opacity = '1';
    say(text);
  };

  const tick = () => {
    elapsed += TICK_MS;
    part(root, 'fill-legacy').style.width = `${Math.min(elapsed, DELAY_MS) * PX_PER_MS}px`;
    if (elapsed >= DELAY_MS) {
      timer = undefined;
      return fire(legacy, 'legacy', DELAY_MS, `Click dispatched ${DELAY_MS} ms after the tap`);
    }
    timer = clock.setTimeout(tick, TICK_MS);
  };

  legacy.addEventListener('click', () => {
    reset();
    say(`Tapped, holding ${DELAY_MS} ms`);
    timer = clock.setTimeout(tick, TICK_MS);
  });

  // Nothing to disambiguate, so the click is the touch: no window, no ruler to run.
  modern.addEventListener('click', () => {
    reset();
    fire(modern, 'modern', 0, 'Click dispatched with the tap');
  });
}
