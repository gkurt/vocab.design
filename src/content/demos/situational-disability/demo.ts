import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Condition = 'glare' | 'reach' | 'mute';

const MUTE_GLYPH =
  '<svg class="sp-icon" viewBox="0 0 24 24" aria-hidden="true" style="width: 13px; height: 13px"><path d="M4 9.5h3L11 6.5v11L7 14.5H4z"/><path d="m15.5 9.5 4.5 5M20 9.5l-4.5 5"/></svg>';

/** What each moment amounts to, drawn in the strip above the switch that produced it. */
const VERDICT = {
  glare: 'Low sun on the screen: the skip control is grey on grey, and against the wash it is not there at all.',
  reach: 'One arm holding a sleeping child: the skip control sits outside the arc a thumb covers without regripping.',
  mute: 'A silenced phone in a full carriage: skipping confirms with a chime, so the press answers with nothing.',
} as const satisfies Record<Condition, string>;

/**
 * Situational disability specimen: one player screen shown in three moments, each of which
 * breaks the same control for a different reason. Nothing about the product changes between the
 * picks; only the situation the reader is in does.
 *
 * The subject is the skip control. The term names a barrier rather than a widget, and a barrier
 * has no element of its own, so the honest narrowest answer is the one control every condition
 * lands on: washed out under glare, out of reach one handed, unconfirmed in silence. Keeping it
 * fixed across all three picks is also what makes the point, since the alternative would be
 * three subjects and three separate failures. The phone and the three condition overlays are
 * scenery (SPEC §5), and the control fails in every state the script visits, so no state is
 * dishonest and no `data-pose` is needed.
 *
 * A panel beside the phone used to carry three labelled readouts per moment: the moment itself
 * ("Low sun straight onto the screen, waiting for a bus"), what it breaks, and "The same
 * barrier, permanently" ("Low vision, and everyone else getting older"). None of that is
 * anything a player app would print, and it changes with the switch, so it is one verdict now
 * and the stage draws it above the controls (SPEC §5.1). The permanent, temporary, situational
 * spectrum is the article's opening paragraph. With the panel gone the window is only as wide
 * as the phone.
 *
 * The overlays hold their room whether shown or hidden, so switching condition moves nothing
 * (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 200px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Moment" data-part="condition" data-value="glare" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-glare" value="glare"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Glare</button>
            <button class="sp-segment" type="button" data-part="seg-reach" value="reach"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">One hand</button>
            <button class="sp-segment" type="button" data-part="seg-mute" value="mute"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Silenced</button>
          </sp-segmented>
        </div>

        <div class="sp-frame" data-part="phone" style="width: 172px; height: 204px; margin-top: 10px">
            <div class="sp-topbar sp-context" style="padding: 6px 9px; gap: 6px">
              <span class="sp-label" style="font-size: 10px">Nightbus FM</span>
            </div>

            <div data-part="stage-art" style="position: relative; flex: 1 1 auto;
                 background: linear-gradient(155deg, #cfd6e2 0%, #e7ebf2 55%, #d8dee8 100%)">
              <button class="sp-button" type="button" data-part="skip" data-subject
                      style="position: absolute; top: 9px; right: 9px; padding: 3px 9px; font-size: 11px;
                             background: transparent; color: #b6bcc6;
                             border: 1px solid rgb(255 255 255 / 0.5)">Skip intro</button>
              <div class="sp-row" data-part="silence"
                   style="position: absolute; left: 9px; bottom: 9px; gap: 6px; padding: 3px 8px;
                          border-radius: 999px; background: var(--sp-surface); color: var(--sp-ink);
                          font-size: 10.5px; opacity: 0; visibility: hidden;
                          transition: opacity 0.22s, visibility 0.22s">
                ${MUTE_GLYPH}<span style="white-space: nowrap">chime unheard</span>
              </div>
            </div>

            <div class="sp-stack sp-context" style="flex: 0 0 auto; gap: 5px; padding: 9px">
              <span class="sp-text sp-text--ink" style="font-size: 11.5px; font-weight: 500">Late Shift, ep. 214</span>
              <div class="sp-progress" style="height: 4px"><div class="sp-progress-fill" style="--sp-value: 22%"></div></div>
            </div>

            <div data-part="reach" style="position: absolute; inset: 0; opacity: 0; visibility: hidden;
                 transition: opacity 0.22s, visibility 0.22s; pointer-events: none;
                 background:
                   radial-gradient(circle 128px at 106% 116%, transparent 0 122px,
                     var(--sp-accent) 122px 124px, transparent 124px),
                   radial-gradient(circle 128px at 106% 116%, rgb(53 87 232 / 0.16) 0 122px, transparent 122px)">
              <span class="sp-label" style="position: absolute; right: 10px; bottom: 54px; font-size: 10px">thumb arc</span>
            </div>

            <div data-part="glare" style="position: absolute; inset: 0; opacity: 0; visibility: hidden;
                 transition: opacity 0.22s, visibility 0.22s; pointer-events: none;
                 background: linear-gradient(118deg, rgb(255 255 255 / 0.88) 6%, rgb(255 255 255 / 0.62) 44%,
                 rgb(255 255 255 / 0.1) 88%)"></div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="verdict" data-mode="glare"
           style="margin: 8px 0 0; font-size: 11.5px; line-height: 1.35">${VERDICT.glare}</p>
      </div>
    </div>
  `;

  const overlays: Record<Condition, HTMLElement | undefined> = {
    glare: part(root, 'glare'),
    reach: part(root, 'reach'),
    mute: part(root, 'silence'),
  };
  const verdict = part(root, 'verdict');

  const apply = (condition: Condition) => {
    for (const [key, overlay] of Object.entries(overlays)) {
      if (!overlay) continue;
      const on = key === condition;
      overlay.style.opacity = on ? '1' : '0';
      overlay.style.visibility = on ? 'visible' : 'hidden';
    }
    verdict.dataset.mode = condition;
    verdict.textContent = VERDICT[condition];
  };

  part(root, 'condition').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Condition);
  });

  apply('glare');
}
