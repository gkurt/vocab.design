import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

type Mode = 'both' | 'gesture';

/** The dial's geometry, in its own 108 by 108 box: 270 degrees of arc at radius 40. */
const CENTRE = 54;
const RADIUS = 40;
const SPAN = 135;
const ARC = 'M 25.7 82.3 A 40 40 0 1 1 82.3 82.3';

const CAPTION = {
  both: 'The arc is quicker for anyone who can trace it, and the two buttons reach the same value with one contact and no path. Both routes, same control.',
  gesture:
    'The buttons are gone, so the only way to this value is a stroke around the dial. A head pointer, a switch or one unsteady finger can no longer set it at all.',
} as const;

/** Where a waypoint sits on the arc, so the scripted stroke travels the path the dial reads. */
const anchor = (angle: number) => ({
  left: CENTRE + RADIUS * Math.sin((angle * Math.PI) / 180) - 7,
  top: CENTRE - RADIUS * Math.cos((angle * Math.PI) / 180) - 7,
});

const clamp = (n: number, low: number, high: number) => Math.max(low, Math.min(high, n));
const band = (value: number) => (value < 34 ? 'low' : value > 66 ? 'high' : 'mid');

/**
 * Pointer gestures specimen: a brightness dial whose value is set by tracing a stroke around it,
 * beside the plus and minus buttons that reach the same value with one contact. The pick removes
 * the buttons, which is the failing configuration WCAG 2.5.1 is about.
 *
 * The subject is the single-pointer alternative, given a wrapper of its own: the criterion is about
 * that control existing, so it is what the term names here, and identify summons it in the state
 * where it has been taken away (SPEC §6). The dial, the readout, the picker and the caption are
 * scenery. The alternative is only ever itself, so no `data-pose` is needed.
 *
 * The dial answers a real drag as well as a scripted one: the pointer is captured on a trusted
 * pointerdown so a reader's stroke keeps reporting past the dial's edge, and the press ends on
 * pointerup and pointercancel, never on a boundary event (SPEC §7). The waypoints the script
 * travels through are invisible aim anchors with no paint of their own (SPEC §5). No timers: the
 * value follows the pointer rather than playing back. The header label is kept short enough that
 * the window holds it beside the picker instead of bleeding past its own edge (SPEC §5).
 *
 * The header used to read "Brightness, set by a stroke" and the plus and minus buttons carried a
 * note beside them, "Steps of ten, one contact, no path". Both were the site explaining its own
 * demonstration inside a settings panel that would print the name of the setting and nothing more,
 * so the header is just "Brightness" now and the note has gone; the buttons show what one contact
 * reaches, and the verdict in the strip says what taking them away costs.
 */
export function mount(root: HTMLElement): void {
  const stop = (name: string, angle: number) => {
    const { left, top } = anchor(angle);
    return `<span data-part="${name}" style="position: absolute; left: ${left}px; top: ${top}px; width: 14px; height: 14px"></span>`;
  };

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 1 auto; min-width: 0">Brightness</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="mode" data-axis="Controls" data-value="both" style="flex: 0 0 auto">
            <button class="sp-segment" type="button" data-part="seg-both" value="both"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Gesture and buttons</button>
            <button class="sp-segment" type="button" data-part="seg-gesture" value="gesture"
                    style="padding: 3px 11px; font-size: 11px; white-space: nowrap">Gesture only</button>
          </sp-segmented>
        </div>

        <div class="sp-row" style="align-items: center; gap: 18px; margin-top: 10px">
          <div data-part="dial" style="position: relative; flex: 0 0 auto; width: 108px; height: 108px;
                                       touch-action: none; cursor: grab">
            <svg viewBox="0 0 108 108" width="108" height="108" aria-hidden="true" style="position: absolute; inset: 0">
              <path d="${ARC}" fill="none" stroke="var(--sp-line)" stroke-width="7" stroke-linecap="round"/>
              <path data-part="arc" d="${ARC}" fill="none" stroke="var(--sp-accent)" stroke-width="7" stroke-linecap="round"/>
            </svg>
            <div class="sp-stack" style="position: absolute; inset: 0; align-items: center; justify-content: center; gap: 0">
              <span class="sp-text sp-text--ink" data-part="value" data-band="mid"
                    style="font-size: 22px; font-weight: 600; line-height: 26px">50</span>
              <span class="sp-label sp-context" style="font-size: 9.5px">percent</span>
            </div>
            ${stop('stop-1', -120)}
            ${stop('stop-2', -60)}
            ${stop('stop-3', 0)}
            ${stop('stop-4', 60)}
            ${stop('stop-5', 110)}
          </div>

          <div class="sp-stack" style="flex: 1 1 auto; min-width: 0; gap: 10px">
            <div class="sp-surface sp-context" style="padding: 7px 10px">
              <span class="sp-label" style="font-size: 10px">Last change came from</span>
              <p class="sp-text sp-text--ink" data-part="source" data-by="none"
                 style="margin: 3px 0 0; height: 16px; line-height: 16px; font-size: 11.5px; white-space: nowrap">Nothing yet. The dial is resting at 50.</p>
            </div>

            <div class="sp-row" data-part="alt" data-subject style="gap: 8px; height: 32px;
                 transition: opacity 0.18s, visibility 0.18s">
              <button class="sp-icon-button" type="button" data-part="minus" aria-label="Less brightness"
                      style="flex: 0 0 auto; width: 30px; height: 30px">${icon('minus')}</button>
              <button class="sp-icon-button" type="button" data-part="plus" aria-label="More brightness"
                      style="flex: 0 0 auto; width: 30px; height: 30px">${icon('plus')}</button>
            </div>
          </div>
        </div>

        <p class="sp-text sp-context" data-stage-verdict data-part="caption" data-mode="both"
           style="margin: 10px 0 0; height: 32px; font-size: 11px; line-height: 1.35">${CAPTION.both}</p>
      </div>
    </div>
  `;

  const dial = part(root, 'dial');
  const value = part(root, 'value');
  const source = part(root, 'source');
  const alt = part(root, 'alt');
  const caption = part(root, 'caption');

  const arc = root.querySelector('[data-part=arc]');
  if (!(arc instanceof SVGPathElement)) return;
  // Read at mount, in the state it is measured in: the arc's geometry never changes (SPEC §5).
  const length = arc.getTotalLength();
  arc.style.strokeDasharray = String(length);

  let level = 50;
  let dragging = false;

  const render = (by: 'gesture' | 'button' | 'none') => {
    value.textContent = String(Math.round(level));
    value.dataset.band = band(level);
    arc.style.strokeDashoffset = String(length * (1 - level / 100));
    if (by === 'none') return;
    source.dataset.by = by;
    source.textContent =
      by === 'gesture'
        ? `A stroke around the dial, ending at ${Math.round(level)}.`
        : `A press of a button, one step to ${Math.round(level)}.`;
  };

  const fromPointer = (event: PointerEvent) => {
    const box = dial.getBoundingClientRect();
    const dx = event.clientX - (box.left + box.width / 2);
    const dy = event.clientY - (box.top + box.height / 2);
    const angle = (Math.atan2(dx, -dy) * 180) / Math.PI;
    level = clamp(((angle + SPAN) / (SPAN * 2)) * 100, 0, 100);
    render('gesture');
  };

  dial.addEventListener('pointerdown', (event) => {
    // The guard is mandatory: the player's synthetic pointers cannot be captured and the call
    // throws, which would kill the scripted stroke with the handler (SPEC §7).
    if (event.isTrusted) dial.setPointerCapture(event.pointerId);
    dragging = true;
    fromPointer(event);
  });

  root.addEventListener('pointermove', (event) => {
    if (dragging) fromPointer(event);
  });

  // A captured drag ends on pointerup and pointercancel; pointerleave never fires while it holds.
  const release = () => {
    dragging = false;
  };
  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  const step = (delta: number) => {
    level = clamp(Math.round(level / 10) * 10 + delta, 0, 100);
    render('button');
  };

  part(root, 'minus').addEventListener('click', () => step(-10));
  part(root, 'plus').addEventListener('click', () => step(10));

  part(root, 'mode').addEventListener('change', (event) => {
    const mode = (event as CustomEvent<string>).detail as Mode;
    const both = mode === 'both';
    alt.style.opacity = both ? '1' : '0';
    alt.style.visibility = both ? 'visible' : 'hidden';
    caption.dataset.mode = mode;
    caption.textContent = CAPTION[mode];
  });

  render('none');
}
