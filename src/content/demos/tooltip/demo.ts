import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

const OPEN_DELAY_MS = 350;
const EDGE_MARGIN = 8;

const LABELS: Record<string, string> = {
  share: 'Share',
  star: 'Add to favourites',
  trash: 'Move to trash',
};

/**
 * Tooltip specimen: hovering (or focusing) an icon-only control names it. One
 * label serves the whole toolbar, since only one control can be under the
 * pointer. It carries no controls and dies with the pointer, which is the whole
 * distinction from a popover.
 *
 * The label dies with the pointer, so the pass ends at its mount state and the tree persists
 * across attract iterations (`data-loop="keep"`).
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app" data-loop="keep">
      <div class="sp-frame" style="height: 200px">
        <div class="sp-topbar">
          <span class="sp-heading sp-grow sp-context">Draft note</span>
          <span class="sp-row sp-context">
            <button class="sp-icon-button" data-part="share" aria-label="Share">${icon('share')}</button>
            <button class="sp-icon-button" data-part="star" aria-label="Add to favourites">${icon('star')}</button>
            <button class="sp-icon-button" data-part="trash" aria-label="Move to trash">${icon('trash')}</button>
          </span>
        </div>
        <div class="sp-body sp-context" data-part="page">
          <div class="sp-stack">
            <div class="sp-line" style="width: 90%"></div>
            <div class="sp-line" style="width: 74%"></div>
            <div class="sp-line" style="width: 82%"></div>
          </div>
        </div>
        <span class="sp-tooltip" data-part="tooltip" data-subject role="tooltip" id="tip"></span>
      </div>
    </div>
  `;

  const frame = root.querySelector('.sp-frame') as HTMLElement;
  const tooltip = part(root, 'tooltip');
  let pending: { name: string; timer: number } | undefined;
  let described: HTMLElement | undefined;

  /** Anchor under the control, then shift to stay inside the frame rather than be clipped by it. */
  const place = (trigger: HTMLElement) => {
    const frameRect = frame.getBoundingClientRect();
    const rect = trigger.getBoundingClientRect();
    const center = rect.left + rect.width / 2 - frameRect.left;
    const room = frameRect.width - tooltip.offsetWidth - EDGE_MARGIN;
    const left = Math.min(Math.max(center - tooltip.offsetWidth / 2, EDGE_MARGIN), room);
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${rect.bottom - frameRect.top + 6}px`;
    tooltip.style.setProperty('--sp-arrow-x', `${center - left}px`);
  };

  const reveal = (name: string, trigger: HTMLElement) => {
    pending = undefined;
    tooltip.textContent = LABELS[name] ?? '';
    tooltip.dataset.for = name;
    place(trigger);
    described?.removeAttribute('aria-describedby');
    trigger.setAttribute('aria-describedby', 'tip');
    described = trigger;
    flag(tooltip, 'data-open', true);
  };

  const close = () => {
    described?.removeAttribute('aria-describedby');
    described = undefined;
    flag(tooltip, 'data-open', false);
  };

  /**
   * Leaving one control must not cancel the label another control is already waiting
   * on: the pointer is only ever on one of them, and both an attract script and a real
   * pointer can be moving through the toolbar at the same moment.
   */
  const hide = (name: string) => {
    if (pending?.name === name) {
      clock.clearTimeout(pending.timer);
      pending = undefined;
    }
    if (tooltip.dataset.for === name) close();
  };

  for (const name of Object.keys(LABELS)) {
    const trigger = part(root, name);
    trigger.addEventListener('pointerenter', () => {
      clock.clearTimeout(pending?.timer);
      pending = { name, timer: clock.setTimeout(() => reveal(name, trigger), OPEN_DELAY_MS) };
    });
    trigger.addEventListener('focus', () => reveal(name, trigger));
    trigger.addEventListener('pointerleave', () => hide(name));
    trigger.addEventListener('blur', () => hide(name));
  }

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
}
