import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';
import type { DemoClock } from '#src/stage/clock.ts';

/** Long enough to be read, short enough that the control is ready again. */
const CONFIRM_MS = 1600;

const IDLE_LABEL = 'Copy';
const DONE_LABEL = 'Copied';

/**
 * Copy button specimen: the control beside a value that takes the value away with
 * it and then says so. The subject is the button alone, since the term names the
 * control and not the field it serves.
 *
 * The confirmation is the whole demonstration, so it is shown twice: the glyph and
 * word change for sighted readers, and a live region carries the same news to a
 * screen reader, which the icon swap never would.
 *
 * The button is held at the width of its longest label from mount (SPEC §5), so
 * "Copied" cannot resize the thing the pointer is still resting on. Nothing here
 * writes to the real clipboard: a specimen changes nothing outside itself, and the
 * affordance plus its confirming beat is what the term names.
 */
export function mount(root: HTMLElement, clock: DemoClock): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="height: 224px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Project settings</span></div>
        <div class="sp-body">
          <div class="sp-surface" style="padding: 12px">
            <div class="sp-label sp-context">Project ID</div>
            <div class="sp-row" style="margin-top: 8px">
              <span class="sp-text sp-text--ink sp-grow sp-context" data-part="value">prj_8f2c19ab4d</span>
              <button
                class="sp-button sp-button--ghost sp-button--sm"
                type="button"
                data-part="copy"
                data-subject
                aria-label="Copy project ID"
              >
                <span class="sp-row" style="gap: 6px; justify-content: center">
                  <span data-part="glyph-copy" style="display: inline-flex">${icon('copy')}</span>
                  <span data-part="glyph-done" style="display: inline-flex" hidden>${icon('check')}</span>
                  <span data-part="label">${IDLE_LABEL}</span>
                </span>
              </button>
            </div>
            <div class="sp-divider" style="margin: 12px 0"></div>
            <div class="sp-row sp-row--between sp-context">
              <span class="sp-label">Region</span>
              <span class="sp-text">eu-west-1</span>
            </div>
          </div>
          <p class="sp-text sp-context" style="margin: 10px 2px 0">Paste this into the CLI to link your local checkout.</p>
        </div>
        <span class="sp-visually-hidden" role="status" data-part="announce"></span>
      </div>
    </div>
  `;

  const copy = part(root, 'copy');
  const label = part(root, 'label');
  const glyphCopy = part(root, 'glyph-copy');
  const glyphDone = part(root, 'glyph-done');
  const announce = part(root, 'announce');

  let width = 0;
  for (const text of [IDLE_LABEL, DONE_LABEL]) {
    label.textContent = text;
    width = Math.max(width, copy.offsetWidth);
  }
  label.textContent = IDLE_LABEL;
  copy.style.minWidth = `${width}px`;

  const report = (copied: boolean) => {
    flag(copy, 'data-copied', copied);
    label.textContent = copied ? DONE_LABEL : IDLE_LABEL;
    glyphCopy.hidden = copied;
    glyphDone.hidden = !copied;
    // Written on each confirmation rather than merely revealed: a live region
    // announces a change, and the glyph swap reaches nobody on its own.
    announce.textContent = copied ? 'Project ID copied to clipboard' : '';
  };

  let timer: number | undefined;

  // Pressing always lands on "copied" and restarts the beat, so a scripted pass
  // reaches a state rather than flipping whatever it found (SPEC §8).
  copy.addEventListener('click', () => {
    clock.clearTimeout(timer);
    report(true);
    timer = clock.setTimeout(() => report(false), CONFIRM_MS);
  });
}
