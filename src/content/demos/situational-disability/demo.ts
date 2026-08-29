import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Condition = 'glare' | 'reach' | 'mute';

const MUTE_GLYPH =
  '<svg class="sp-icon" viewBox="0 0 24 24" aria-hidden="true" style="width: 13px; height: 13px"><path d="M4 9.5h3L11 6.5v11L7 14.5H4z"/><path d="m15.5 9.5 4.5 5M20 9.5l-4.5 5"/></svg>';

const CONDITION = {
  glare: {
    moment: 'Low sun straight onto the screen, waiting for a bus',
    breaks: 'The skip control is grey on grey. Against the wash it is not low contrast any more, it is simply not there.',
    permanent: 'Low vision, and everyone else getting older',
  },
  reach: {
    moment: 'One arm holding a sleeping child, phone in the other hand',
    breaks: 'The control sits in the far corner, outside the arc a thumb covers without regripping the phone.',
    permanent: 'Limited dexterity, a cast, a hand on a cane',
  },
  mute: {
    moment: 'A full carriage and no headphones in the bag',
    breaks: 'Skipping confirms with a chime and nothing else, so a silenced phone answers a press with nothing.',
    permanent: 'Deafness, and any room already too loud',
  },
} as const satisfies Record<Condition, unknown>;

/**
 * Situational disability specimen: one player screen shown in three moments, each of which
 * breaks the same control for a different reason. Nothing about the product changes between the
 * picks; only the situation the reader is in does.
 *
 * The subject is the skip control. The term names a barrier rather than a widget, and a barrier
 * has no element of its own, so the honest narrowest answer is the one control every condition
 * lands on: washed out under glare, out of reach one handed, unconfirmed in silence. Keeping it
 * fixed across all three picks is also what makes the point, since the alternative would be
 * three subjects and three separate failures. The phone, the three condition overlays, the
 * readouts and the caption are scenery (SPEC §5), and the control fails in every state the
 * script visits, so no state is dishonest and no `data-pose` is needed.
 *
 * The overlays hold their room whether shown or hidden, and every readout sits in a fixed box,
 * so switching condition moves nothing (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const readout = (label: string, name: string, height: number, value: string) => `
    <span class="sp-label" style="font-size: 10px">${label}</span>
    <p class="sp-text sp-text--ink" data-part="${name}" data-mode="glare"
       style="margin: 2px 0 0; height: ${height}px; font-size: 11.5px; line-height: 1.35">${value}</p>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">One product</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-axis="Moment" data-part="condition" data-value="glare" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-glare" value="glare"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Glare</button>
            <button class="sp-segment" type="button" data-part="seg-reach" value="reach"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">One hand</button>
            <button class="sp-segment" type="button" data-part="seg-mute" value="mute"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Silenced</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="align-items: flex-start; gap: 14px; margin-top: 10px">
          <div class="sp-frame" data-part="phone" style="flex: 0 0 auto; width: 172px; height: 204px">
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

          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 9px">
            <div>${readout('The moment', 'moment', 32, CONDITION.glare.moment)}</div>
            <div>${readout('What it breaks', 'breaks', 46, CONDITION.glare.breaks)}</div>
            <div>${readout('The same barrier, permanently', 'permanent', 30, CONDITION.glare.permanent)}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  const overlays: Record<Condition, HTMLElement | undefined> = {
    glare: part(root, 'glare'),
    reach: part(root, 'reach'),
    mute: part(root, 'silence'),
  };
  const moment = part(root, 'moment');
  const breaks = part(root, 'breaks');
  const permanent = part(root, 'permanent');

  const apply = (condition: Condition) => {
    for (const [key, overlay] of Object.entries(overlays)) {
      if (!overlay) continue;
      const on = key === condition;
      overlay.style.opacity = on ? '1' : '0';
      overlay.style.visibility = on ? 'visible' : 'hidden';
    }
    const rule = CONDITION[condition];
    for (const [el, text] of [
      [moment, rule.moment],
      [breaks, rule.breaks],
      [permanent, rule.permanent],
    ] as const) {
      el.dataset.mode = condition;
      el.textContent = text;
    }
  };

  part(root, 'condition').addEventListener('change', (event) => {
    apply((event as CustomEvent<string>).detail as Condition);
  });

  apply('glare');
}
