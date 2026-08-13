import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** A transfer of known size, tapering the way a real one does. */
const READINGS = [24, 51, 73, 92, 100];
const TICK_MS = 260;

const kind = (label: string) => `
  <span
    aria-hidden="true"
    style="display: flex; align-items: center; justify-content: center; flex: 0 0 auto;
           width: 32px; height: 32px; border-radius: 6px; background: var(--sp-sunken);
           color: var(--sp-muted); font-size: 10px; font-weight: 600"
  >${label}</span>`;

/**
 * File attachment specimen: a composer carrying one settled attachment and one
 * arriving beside it, each a row standing in for a file it cannot show.
 *
 * The subject is the settled row, the narrowest thing the term names: not the list
 * (two rows are two attachments, not one), and not the composer, which is the scene.
 * The arriving row is a second instance rather than scenery, so it keeps the full
 * palette exactly as the chip and tag specimens keep their siblings.
 *
 * Both rows sit in slots of a fixed height, so a transfer finishing, an attachment
 * being removed, and the undo row taking its place all happen inside a box that never
 * moves the composer around them (SPEC §5). Every control reaches a state rather than
 * flipping one: Attach always starts a transfer from nothing, Remove always removes,
 * Undo always restores.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 282px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">New message</span>
          <span class="sp-label">To: Priya</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; gap: 10px">
          <div class="sp-stack sp-context" style="gap: 7px">
            <div class="sp-line" style="width: 84%"></div>
            <div class="sp-line" style="width: 92%"></div>
          </div>

          <div style="position: relative; height: 54px">
            <div
              class="sp-surface sp-row"
              data-part="attachment"
              data-subject
              style="position: absolute; inset: 0; gap: 10px; padding: 8px 10px"
            >
              ${kind('PDF')}
              <span class="sp-stack sp-grow" style="gap: 2px; min-width: 0">
                <span class="sp-text sp-text--ink" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">Trail map.pdf</span>
                <span class="sp-label">PDF, 1.2 MB</span>
              </span>
              <button class="sp-icon-button" type="button" data-part="remove" aria-label="Remove Trail map.pdf">${icon('close')}</button>
            </div>
            <div
              class="sp-row sp-context"
              data-part="undo-row"
              role="status"
              hidden
              style="position: absolute; inset: 0; padding: 8px 10px; border: 1px dashed var(--sp-line); border-radius: var(--sp-radius)"
            >
              <span class="sp-text sp-grow">Trail map.pdf removed</span>
              <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="undo">Undo</button>
            </div>
          </div>

          <div style="position: relative; height: 68px">
            <div
              class="sp-surface"
              data-part="pending"
              data-state="idle"
              hidden
              style="position: absolute; inset: 0; padding: 8px 10px"
            >
              <div class="sp-row" style="gap: 10px">
                ${kind('ZIP')}
                <span class="sp-stack sp-grow" style="gap: 2px; min-width: 0">
                  <span class="sp-text sp-text--ink" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">Site survey.zip</span>
                  <span class="sp-label" data-part="pending-status">Uploading 0%</span>
                </span>
                <button class="sp-icon-button" type="button" data-part="pending-remove" aria-label="Cancel Site survey.zip">${icon('close')}</button>
              </div>
              <div
                class="sp-progress"
                data-part="pending-progress"
                role="progressbar"
                aria-label="Site survey.zip"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="0"
                style="--sp-value: 0%; margin-top: 6px"
              >
                <div class="sp-progress-fill"></div>
              </div>
            </div>
          </div>

          <div class="sp-row sp-context" style="margin-top: auto">
            <button class="sp-button sp-button--ghost sp-button--sm" type="button" data-part="attach">Attach</button>
            <span class="sp-grow"></span>
            <button class="sp-button sp-button--sm" type="button">Send</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const attachment = part(root, 'attachment');
  const undoRow = part(root, 'undo-row');
  const pending = part(root, 'pending');
  const status = part(root, 'pending-status');
  const progress = part(root, 'pending-progress');
  const cancel = part(root, 'pending-remove');

  let timer: number | undefined;

  const draw = (value: number) => {
    const done = value >= 100;
    progress.style.setProperty('--sp-value', `${value}%`);
    progress.setAttribute('aria-valuenow', String(value));
    // Hidden rather than removed: the row keeps the height it transferred at, so the
    // moment it becomes an attachment moves nothing below it.
    progress.style.visibility = done ? 'hidden' : 'visible';
    pending.dataset.state = done ? 'done' : 'uploading';
    status.textContent = done ? 'ZIP, 3.4 MB' : `Uploading ${value}%`;
    cancel.setAttribute('aria-label', done ? 'Remove Site survey.zip' : 'Cancel Site survey.zip');
  };

  /** Always a transfer from nothing, whenever in a run the choice arrives. */
  const accept = () => {
    clock.clearTimeout(timer);
    pending.hidden = false;
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

  part(root, 'attach').addEventListener('click', accept);

  cancel.addEventListener('click', () => {
    clock.clearTimeout(timer);
    pending.hidden = true;
    pending.dataset.state = 'idle';
  });

  // Removing an attachment is cheap to reverse, so the row it leaves behind offers
  // the way back instead of a dialog asking first.
  part(root, 'remove').addEventListener('click', () => {
    attachment.hidden = true;
    undoRow.hidden = false;
  });

  part(root, 'undo').addEventListener('click', () => {
    attachment.hidden = false;
    undoRow.hidden = true;
  });
}
