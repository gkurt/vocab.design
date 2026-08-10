import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/**
 * The readings a transfer of known size reports back, tapering near the end the way
 * a real one does. The end is known, so the bar can be determinate.
 */
const READINGS = [12, 26, 41, 55, 68, 79, 90, 96, 100];
const TICK_MS = 280;

/**
 * Progress bar specimen: an upload of known size reports itself as it runs. The
 * subject is the bar alone, not the panel it sits in and not the percentage beside
 * it, since the term names the filling track and nothing else.
 *
 * The bar is on stage from mount at zero and keeps its row for the whole run, so
 * the only thing that moves is the fill (SPEC §5). The readout beside it is held at
 * a fixed width, because "0%" growing into "100%" would otherwise drag the line it
 * sits in as the task advances.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 300px">
        <div class="sp-heading sp-context">Import catalog</div>
        <p class="sp-text sp-context" style="margin-top: 2px">products.csv, 12.4 MB</p>
        <div
          class="sp-progress"
          data-part="bar"
          data-subject
          data-state="idle"
          role="progressbar"
          aria-label="Upload"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow="0"
          style="--sp-value: 0%; margin-top: 14px"
        >
          <div class="sp-progress-fill" data-part="fill"></div>
        </div>
        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px">
          <span class="sp-text" data-part="status">Ready to upload</span>
          <span class="sp-text" data-part="percent" style="min-width: 36px; text-align: right">0%</span>
        </div>
        <div class="sp-row sp-context" style="margin-top: 14px">
          <button class="sp-button" data-part="upload" type="button">Upload</button>
        </div>
      </div>
    </div>
  `;

  const bar = part(root, 'bar');
  const status = part(root, 'status');
  const percent = part(root, 'percent');
  const upload = part(root, 'upload');

  const draw = (value: number, state: string, label: string) => {
    bar.style.setProperty('--sp-value', `${value}%`);
    bar.setAttribute('aria-valuenow', String(value));
    bar.dataset.state = state;
    percent.textContent = `${value}%`;
    status.textContent = label;
  };

  let timer: number | undefined;

  // Reaching a state, never flipping one (SPEC §8): pressing Upload always means
  // "run from nothing to done", whenever in the run the press arrives.
  upload.addEventListener('click', () => {
    clock.clearTimeout(timer);
    draw(0, 'running', 'Uploading');
    let index = -1;
    const tick = () => {
      index += 1;
      const value = READINGS[index];
      if (value === undefined) return;
      const last = index === READINGS.length - 1;
      draw(value, last ? 'done' : 'running', last ? 'Uploaded' : 'Uploading');
      if (!last) timer = clock.setTimeout(tick, TICK_MS);
    };
    timer = clock.setTimeout(tick, TICK_MS);
  });
}
