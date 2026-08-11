import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

/**
 * Drop zone specimen: an upload region and one file chip to carry into it. The
 * subject is the zone, which is the destination rather than the gesture: it says
 * a drag can land here by changing while the item is over it, and it says nothing
 * at all when the item is released anywhere else.
 *
 * The uploaded row and the prompt it replaces share one reserved box, so a file
 * arriving never moves the zone above it (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">New claim</span>
          <span class="sp-text">Step 2 of 3</span>
        </div>
        <div class="sp-body" style="display: flex; gap: 12px">
          <section class="sp-context" data-part="elsewhere" style="width: 132px">
            <span class="sp-label">On your device</span>
            <div class="sp-stack" style="margin-top: 8px">
              <span class="sp-chip" data-part="file" style="cursor: grab; touch-action: none">${icon('share')} report.pdf</span>
              <div class="sp-line" style="width: 80%"></div>
              <div class="sp-line" style="width: 64%"></div>
            </div>
          </section>
          <div class="sp-stack sp-grow" style="gap: 10px">
            <div
              data-part="zone"
              data-subject
              role="button"
              aria-label="Drop files to upload"
              style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; height: 94px; border: 2px dashed var(--sp-line); border-radius: var(--sp-radius)"
            >
              <span class="sp-text sp-text--ink" data-part="zone-label">Drop a file here</span>
              <span class="sp-label">PDF or PNG, up to 10 MB</span>
            </div>
            <div style="position: relative; height: 32px">
              <div
                class="sp-row sp-context"
                data-part="uploads-empty"
                style="position: absolute; inset: 0; align-items: center"
              >
                <span class="sp-label">Nothing uploaded yet</span>
              </div>
              <div
                class="sp-row sp-surface"
                data-part="dropped-file"
                hidden
                style="position: absolute; inset: 0; align-items: center; gap: 8px; padding: 0 10px; font-size: 13px"
              >
                ${icon('check')}
                <span class="sp-grow">report.pdf</span>
                <span class="sp-label">240 KB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const zone = part(root, 'zone');
  const label = part(root, 'zone-label');
  const dropped = part(root, 'dropped-file');
  const empty = part(root, 'uploads-empty');
  let carrying = false;

  const over = (x: number, y: number) => {
    const rect = zone.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  };

  /** Active means the item is over this zone: the state that says let go now. */
  const setActive = (on: boolean) => {
    flag(zone, 'data-active', on);
    zone.style.background = on ? 'var(--sp-accent-soft)' : '';
    zone.style.borderColor = on ? 'var(--sp-accent)' : '';
    label.textContent = on ? 'Release to upload' : 'Drop a file here';
  };

  part(root, 'file').addEventListener('pointerdown', () => {
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
    // Released anywhere else, the file stays where it was: the zone is a region,
    // not the whole surface.
    if (!landed) return;
    dropped.hidden = false;
    empty.hidden = true;
  };

  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);
}
