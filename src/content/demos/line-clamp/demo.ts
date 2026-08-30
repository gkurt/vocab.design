import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

const TITLE = 'Nordic hiking pack, 38L';
const BODY =
  'Ripstop nylon with a welded roll top, a padded laptop sleeve, and side compression straps that pull the load in against your back on long descents.';
const LINES = ['1', '2', '3'];
/** `.sp-text` is 13px on a 1.5 rhythm, so three lines is the room the box reserves. */
const LINE_PX = 19.5;
const MAX_LINES = 3;

/**
 * Line clamp specimen: one card description cut after a settable number of
 * lines, beside the same description with no cut at all. The clamped block sits
 * in a box holding the room three lines take, so stepping the clamp changes what
 * is readable without moving the card underneath it (SPEC §5).
 *
 * The subject is the clamped block itself, not the card: the term names what
 * happens to that run of text. The unclamped twin beside it and the control that
 * steps the count are scenery.
 *
 * A line under the two cards used to restate the setting ("Cut after 2 lines. The box
 * keeps its 3-line height either way."), which is the site describing its own figure;
 * the control already names the count and the reserved box shows the rest.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 470px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="2" data-axis="Clamp">
            ${LINES.map((n) => `<button class="sp-segment" data-part="seg-${n}" value="${n}">${n} line${n === '1' ? '' : 's'}</button>`).join('')}
          </sp-segmented>
        </div>
        <div class="sp-row" style="gap: 14px; margin-top: 14px; align-items: flex-start">
          <div class="sp-surface" style="flex: 1 1 0; padding: 10px">
            <span class="sp-label sp-context">clamped</span>
            <div style="margin-top: 4px; font-size: 13px; font-weight: 600">${TITLE}</div>
            <div data-part="clamp-box" style="height: ${LINE_PX * MAX_LINES}px; margin-top: 4px">
              <p class="sp-text" data-part="clamped" data-subject data-lines="2"
                 style="margin: 0; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-clamp: 2; overflow: hidden">${BODY}</p>
            </div>
          </div>
          <div class="sp-surface sp-context" style="flex: 1 1 0; padding: 10px">
            <span class="sp-label">no clamp</span>
            <div style="margin-top: 4px; font-size: 13px; font-weight: 600">${TITLE}</div>
            <p class="sp-text" data-part="full" style="margin: 4px 0 0">${BODY}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  const clamped = part(root, 'clamped');

  const apply = (value: string) => {
    if (!LINES.includes(value)) return;
    clamped.dataset.lines = value;
    clamped.style.setProperty('-webkit-line-clamp', value);
    clamped.style.setProperty('line-clamp', value);
  };

  apply('2');
  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
