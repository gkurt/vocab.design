import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** A transfer of known size, tapering near the end the way a real one does. */
const READINGS = [18, 39, 58, 74, 88, 100];
const TICK_MS = 260;

/**
 * File upload specimen: the control that takes a file, by the button that opens
 * the system picker and by the region that accepts one released onto it. The
 * subject is that control, since both routes and the row reporting the transfer
 * are one thing; the form around it and the file waiting on the device are the
 * scene it sits in.
 *
 * The chosen row and the prompt it replaces share one reserved box, so a file
 * arriving, transferring, and finishing never moves the control above it or the
 * form below it (SPEC §5). The status is held at the width of its longest
 * reading, "Uploading 100%", so the last tick of the transfer cannot fold the
 * row onto a second line and walk the remove button down with it. Every route
 * reaches the same state rather than flipping one (SPEC §8): choosing always
 * starts a transfer from nothing, and removing is the explicit way back.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Expense report</span>
          <span class="sp-text">Attachments</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 12px">
          <section class="sp-context" data-part="elsewhere" style="width: 118px">
            <span class="sp-label">On your device</span>
            <div class="sp-stack" style="margin-top: 8px">
              <span class="sp-chip" data-part="file" style="cursor: grab; touch-action: none">${icon('share')} budget.xlsx</span>
              <div class="sp-line" style="width: 78%"></div>
              <div class="sp-line" style="width: 60%"></div>
            </div>
          </section>
          <section
            class="sp-stack sp-grow"
            data-part="uploader"
            data-subject
            aria-label="Add a receipt"
            style="gap: 8px; padding: 12px; border: 1px dashed var(--sp-line); border-radius: var(--sp-radius)"
          >
            <div class="sp-row">
              <span class="sp-text sp-text--ink sp-grow" data-part="prompt">Drop a file here</span>
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="browse">Browse</button>
            </div>
            <span class="sp-label">XLSX or PDF, up to 10 MB</span>
            <div style="position: relative; height: 54px">
              <div class="sp-row sp-context" data-part="uploads-empty" style="position: absolute; inset: 0; align-items: center">
                <span class="sp-label">No file chosen</span>
              </div>
              <div
                class="sp-surface"
                data-part="file-row"
                data-state="idle"
                hidden
                style="position: absolute; inset: 0; padding: 7px 10px"
              >
                <div class="sp-row">
                  <span class="sp-text sp-text--ink sp-grow" style="min-width: 0">budget.xlsx</span>
                  <span class="sp-text" data-part="file-status" style="flex: 0 0 auto; width: 108px; text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums">Uploading 0%</span>
                  <button class="sp-icon-button" type="button" data-part="remove" aria-label="Remove budget.xlsx">${icon('close')}</button>
                </div>
                <div
                  class="sp-progress"
                  data-part="progress"
                  role="progressbar"
                  aria-label="Upload"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow="0"
                  style="--sp-value: 0%; margin-top: 8px"
                >
                  <div class="sp-progress-fill"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  `;

  const uploader = part(root, 'uploader');
  const prompt = part(root, 'prompt');
  const row = part(root, 'file-row');
  const empty = part(root, 'uploads-empty');
  const status = part(root, 'file-status');
  const progress = part(root, 'progress');

  let timer: number | undefined;
  let carrying = false;

  /** The region says a release would land here: the state that says let go now. */
  const setActive = (on: boolean) => {
    flag(uploader, 'data-active', on);
    uploader.style.borderColor = on ? 'var(--sp-accent)' : '';
    uploader.style.background = on ? 'var(--sp-accent-soft)' : '';
    prompt.textContent = on ? 'Release to add' : 'Drop a file here';
  };

  const draw = (value: number) => {
    progress.style.setProperty('--sp-value', `${value}%`);
    progress.setAttribute('aria-valuenow', String(value));
    const done = value >= 100;
    row.dataset.state = done ? 'done' : 'uploading';
    status.textContent = done ? '248 KB' : `Uploading ${value}%`;
  };

  /** Always a transfer from nothing, whenever in a run the choice arrives. */
  const accept = () => {
    clock.clearTimeout(timer);
    row.hidden = false;
    empty.hidden = true;
    draw(0);
    let index = -1;
    const tick = () => {
      index += 1;
      const value = READINGS[index];
      if (value === undefined) return;
      draw(value);
      if (index < READINGS.length - 1) timer = clock.setTimeout(tick, TICK_MS);
    };
    timer = clock.setTimeout(tick, TICK_MS);
  };

  const remove = () => {
    clock.clearTimeout(timer);
    row.hidden = true;
    empty.hidden = false;
    row.dataset.state = 'idle';
  };

  part(root, 'browse').addEventListener('click', accept);
  part(root, 'remove').addEventListener('click', remove);

  const over = (x: number, y: number) => {
    const rect = uploader.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  };

  const file = part(root, 'file');
  file.addEventListener('pointerdown', (event) => {
    // Capture keeps the carry reporting once the pointer is over the uploader rather than the file.
    // A synthetic pointer has none to capture and the call would throw, so only a real one asks.
    if (event.isTrusted) file.setPointerCapture(event.pointerId);
    carrying = true;
  });

  root.addEventListener('pointermove', (event) => {
    if (!carrying) return;
    setActive(over(event.clientX, event.clientY));
  });

  const release = (event: PointerEvent) => {
    if (!carrying) return;
    carrying = false;
    const landed = over(event.clientX, event.clientY);
    setActive(false);
    // Released anywhere else the file stays on the device: the control is a region,
    // not the whole form.
    if (landed) accept();
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);
}
