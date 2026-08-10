import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

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
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
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
  let timer: ReturnType<typeof setTimeout> | undefined;
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
    tooltip.textContent = LABELS[name] ?? '';
    tooltip.dataset.for = name;
    place(trigger);
    described?.removeAttribute('aria-describedby');
    trigger.setAttribute('aria-describedby', 'tip');
    described = trigger;
    flag(tooltip, 'data-open', true);
  };

  const hide = () => {
    clearTimeout(timer);
    described?.removeAttribute('aria-describedby');
    described = undefined;
    flag(tooltip, 'data-open', false);
  };

  for (const name of Object.keys(LABELS)) {
    const trigger = part(root, name);
    trigger.addEventListener('pointerenter', () => {
      clearTimeout(timer);
      timer = setTimeout(() => reveal(name, trigger), OPEN_DELAY_MS);
    });
    trigger.addEventListener('focus', () => reveal(name, trigger));
    trigger.addEventListener('pointerleave', hide);
    trigger.addEventListener('blur', hide);
  }

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') hide();
  });
}
