import type { DemoClock } from '#src/stage/clock.ts';

const TOAST_MS = 2200;

/** Toast specimen: a save action confirms with a transient, self-dismissing toast. */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window sp-context">
        <div class="sp-heading">Q3 planning notes</div>
        <p class="sp-text">Edited a moment ago</p>
        <div class="sp-row" style="margin-top: 12px">
          <button class="sp-button" data-part="save-button">Save</button>
          <button class="sp-button sp-button--ghost" data-part="share-button">Share</button>
        </div>
      </div>
      <div class="sp-toast" data-part="toast" data-subject role="status">Changes saved</div>
    </div>
  `;
  const save = root.querySelector('[data-part=save-button]');
  const toast = root.querySelector('[data-part=toast]');
  if (!save || !toast) return;
  let timer: number | undefined;
  save.addEventListener('click', () => {
    toast.setAttribute('data-open', '');
    clock.clearTimeout(timer);
    timer = clock.setTimeout(() => toast.removeAttribute('data-open'), TOAST_MS);
  });
}
