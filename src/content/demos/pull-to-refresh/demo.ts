import { icon } from '#src/kit/icons.ts';
import { localPoint } from '#src/kit/measure.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** The arming distance, how far the drag can open the space, and the reload itself. */
const THRESHOLD = 48;
const MAX_PULL = 60;
const FETCH_MS = 1000;
const ROW_H = 38;

const TEXT = {
  idle: 'Pull to refresh',
  pull: 'Pull to refresh',
  armed: 'Release to refresh',
  refreshing: 'Refreshing',
} as const;

const NOTES = [
  ['Ferry ran early, no queue', '10:22'],
  ['Fog bank sitting past the bar', '10:05'],
  ['Two seals off the slipway', '9:31'],
  ['Tide line up on Tuesday', '9:14'],
  ['Herring gulls on the west quay', '9:02'],
  ['Harbour lights off at dawn', '8:41'],
] as const;

const SPRING = 'height 0.2s var(--sp-ease)';

/**
 * Pull to refresh specimen: a list tugged down past its top edge, and the reload that
 * lands in the space the drag opens. The subject is that space and its indicator, not
 * the list: the list is a list, with its own word, and what this term names is the
 * region the gesture opens above it.
 *
 * Opening room is the term here, so the change is allowed to push the list down, and
 * it is contained by the frame it happens in (SPEC §5): nothing outside moves. The
 * gesture reaches an absolute distance rather than flipping a state (SPEC §8), short
 * of the threshold it springs back with nothing fetched, and the reload is a clock
 * timer, so a pose can hold the spinner still (SPEC §6).
 *
 * The screen carries the touch persona (`data-touch`), because pulling a scroller past
 * its own top edge is a finger's gesture: the drag performs as touch with
 * `pointerType: 'touch'` on every event, no hover is dispatched inside it, and the kit
 * hides the native cursor, drawing a reader's own pointer as the same fingertip disc.
 *
 * The gesture is an accelerator, never the only door: the Refresh command in the top
 * bar sits outside that scope, so it stays a control a pointer clicks or a keyboard
 * reaches, running the same reload for anyone with nothing to drag with.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  const rows = NOTES.map(
    ([text, when], i) => `
      <li class="sp-list-item" data-part="row-${i + 1}" style="height: ${ROW_H}px">
        <span class="sp-grow">${text}</span>
        <span class="sp-text">${when}</span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 274px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Harbour watch</span>
          <button class="sp-button sp-button--quiet sp-button--sm" data-part="refresh" type="button">Refresh</button>
        </div>
        <div class="sp-body" data-touch style="display: flex; flex-direction: column; padding: 0; background: var(--sp-surface)">
          <div
            class="sp-row"
            data-part="indicator"
            data-subject
            data-state="idle"
            role="status"
            style="flex: 0 0 auto; height: 0; overflow: hidden; justify-content: center; gap: 8px; background: var(--sp-sunken); transition: ${SPRING}"
          >
            <span data-part="arrow" style="display: inline-flex; color: var(--sp-accent); transition: rotate 0.16s var(--sp-ease)">${icon('chevronDown')}</span>
            <span class="sp-label" data-part="indicator-text">${TEXT.idle}</span>
          </div>
          <ul class="sp-list sp-scroll sp-grow sp-context" data-part="list" style="padding: 0 4px; touch-action: none">
            ${rows}
          </ul>
        </div>
      </div>
    </div>
  `;

  const indicator = part(root, 'indicator');
  const indicatorText = part(root, 'indicator-text');
  const arrow = part(root, 'arrow');
  const list = part(root, 'list');

  let startY: number | undefined;
  let pull = 0;
  let refreshing = false;
  let landed = 0;

  const setState = (state: keyof typeof TEXT) => {
    indicator.dataset.state = state;
    indicatorText.textContent = TEXT[state];
    // The arrow turning over is how the armed state reads without any colour change,
    // and it stays turned through the reload rather than flipping back part way.
    arrow.style.rotate = state === 'armed' || state === 'refreshing' ? '180deg' : '0deg';
    arrow.className = state === 'refreshing' ? 'sp-pulse' : '';
  };

  const setPull = (px: number) => {
    pull = Math.min(Math.max(px, 0), MAX_PULL);
    indicator.style.height = `${pull}px`;
    if (pull === 0) return setState('idle');
    setState(pull >= THRESHOLD ? 'armed' : 'pull');
  };

  const reload = () => {
    if (refreshing) return;
    refreshing = true;
    startY = undefined;
    indicator.style.transition = SPRING;
    // The opened space is held for as long as the request runs, so the indicator has
    // somewhere to live rather than being squeezed out from under itself.
    indicator.style.height = `${THRESHOLD}px`;
    setState('refreshing');
    clock.setTimeout(() => {
      landed += 1;
      // Prepended above what was already there: a refresh that replaced the list
      // would cost the reader the place they were reading.
      list.insertAdjacentHTML(
        'afterbegin',
        `<li class="sp-list-item" data-part="row-new-${landed}" style="height: ${ROW_H}px">
           <span class="sp-grow">Lifeboat out on exercise</span>
           <span class="sp-text">Now</span>
         </li>`,
      );
      refreshing = false;
      setPull(0);
    }, FETCH_MS);
  };

  list.addEventListener('pointerdown', (event) => {
    // The pull only belongs to a scroller that has nowhere further up to go.
    if (refreshing || list.scrollTop > 0) return;
    startY = localPoint(event, root).y;
    // Captured, or a reader dragging past the edge loses the stroke; a synthetic pointer has none to capture.
    if (event.isTrusted) list.setPointerCapture(event.pointerId);
    // Following the finger is the whole gesture, and an eased height would lag it.
    indicator.style.transition = 'none';
  });

  list.addEventListener('pointermove', (event) => {
    if (startY === undefined) return;
    setPull(localPoint(event, root).y - startY);
  });

  const release = () => {
    if (startY === undefined) return;
    startY = undefined;
    indicator.style.transition = SPRING;
    // Absolute landing: past the arming distance it commits, short of it, it springs
    // back and nothing was fetched.
    if (pull >= THRESHOLD) return reload();
    setPull(0);
  };

  list.addEventListener('pointerup', release);
  list.addEventListener('pointercancel', release);
  part(root, 'refresh').addEventListener('click', reload);
}
