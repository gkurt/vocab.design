import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const OPEN_DELAY_MS = 350;

/**
 * Tooltip specimen: hovering (or focusing) an icon-only control names it. The
 * label carries no controls and dies with the pointer, which is the whole
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
          </span>
          <span style="position: relative">
            <button class="sp-icon-button" data-part="trigger" aria-describedby="tip" aria-label="Move to trash">${icon('trash')}</button>
            <span class="sp-tooltip" data-part="tooltip" data-subject role="tooltip" id="tip" style="top: 34px; left: 50%">Move to trash</span>
          </span>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-stack">
            <div class="sp-line" style="width: 90%"></div>
            <div class="sp-line" style="width: 74%"></div>
            <div class="sp-line" style="width: 82%"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const tooltip = part(root, 'tooltip');
  const trigger = part(root, 'trigger');
  let timer: ReturnType<typeof setTimeout> | undefined;

  const show = () => {
    clearTimeout(timer);
    timer = setTimeout(() => flag(tooltip, 'data-open', true), OPEN_DELAY_MS);
  };
  const hide = () => {
    clearTimeout(timer);
    flag(tooltip, 'data-open', false);
  };

  trigger.addEventListener('pointerenter', show);
  trigger.addEventListener('focus', () => flag(tooltip, 'data-open', true));
  trigger.addEventListener('pointerleave', hide);
  trigger.addEventListener('blur', hide);
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') hide();
  });
}
