import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The base unit, and the panel the mini UI is built in: both multiples of it. */
const UNIT = 8;
const PANEL = { width: 200, height: 160 };

const RULES = `repeating-linear-gradient(to right, var(--sp-accent) 0 1px, transparent 1px ${UNIT}px), repeating-linear-gradient(to bottom, var(--sp-accent) 0 1px, transparent 1px ${UNIT}px)`;

const NOTES: Record<string, string> = {
  on: 'Padding 16, avatar 32, gaps 8: every edge on the left lands on a rule.',
  off: 'With the rules hidden, both panels look equally deliberate.',
};

/** The mini UI, at the unit and three pixels off it. */
const BOXES = {
  snapped: { pad: 16, gap: 8, block: 16, foot: 16, avatar: 32, button: 32 },
  drift: { pad: 13, gap: 6, block: 19, foot: 13, avatar: 30, button: 29 },
};

/**
 * 8 point grid specimen: a mini UI whose every box and gap is a multiple of eight, with the
 * grid it is snapped to ruled over it, and beside it the same UI nudged off the unit.
 *
 * The subject is the snapped panel. The convention is only visible in something built to
 * it, so the narrowest honest element is the panel that obeys it; the drifting twin is the
 * counter-example and carries the context register (SPEC §5). The counter-example is a
 * separate panel rather than a state of the subject, so the subject never stops being the
 * term and needs no `data-pose` (SPEC §6).
 *
 * Both panels keep a fixed box, so drawing or hiding the rules moves nothing (SPEC §5), and
 * each segment names a state of the ruling rather than flipping it (SPEC §8).
 *
 * The two panels used to be captioned "on the unit" and "nudged 3px off", and the line
 * under them ("Padding 16, avatar 32, gaps 8: every edge on the left lands on a rule.")
 * was printed inside the frame. The captions are gone, since the drawn rules say which
 * panel lands on them, and the line is the author's reading of the state the switch
 * produced, so it is marked `data-stage-verdict` and the stage draws it above the switch
 * (SPEC §5.1).
 *
 * The panel edge is an inset shadow rather than a border, because a 1px border would start
 * the padding box one pixel in and put every edge in the panel one pixel off the rules the
 * specimen is claiming they land on.
 */
export function mount(root: HTMLElement): void {
  const panel = (key: 'snapped' | 'drift', extra: string) => {
    const b = BOXES[key];
    return `
      <div
        data-part="${key}"
        ${extra}
        style="position: relative; width: ${PANEL.width}px; height: ${PANEL.height}px; padding: ${b.pad}px; background: var(--sp-surface); box-shadow: inset 0 0 0 1px var(--sp-line); border-radius: var(--sp-radius); overflow: hidden"
      >
        <div class="sp-row" style="gap: ${b.gap}px; align-items: flex-start">
          <span class="sp-avatar" style="width: ${b.avatar}px; height: ${b.avatar}px">KE</span>
          <span class="sp-stack sp-grow" style="gap: ${b.gap}px">
            <div class="sp-line" style="width: 88%"></div>
            <div class="sp-line" style="width: 62%"></div>
          </span>
        </div>
        <div class="sp-stack" style="gap: ${b.gap}px; margin-top: ${b.block}px">
          <div class="sp-line" style="width: 96%"></div>
          <div class="sp-line" style="width: 78%"></div>
        </div>
        <div class="sp-row" style="margin-top: ${b.foot}px">
          <span class="sp-button sp-button--sm" style="height: ${b.button}px; display: inline-flex; align-items: center; cursor: default">Open</span>
        </div>
        <div
          data-part="rules-${key}"
          style="position: absolute; inset: 0; pointer-events: none; opacity: 0.42; background-image: ${RULES}"
        ></div>
      </div>`;
  };

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 300px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">${UNIT}px rules</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-axis="Grid" data-value="on">
            <button class="sp-segment" type="button" data-part="seg-on" value="on">drawn</button>
            <button class="sp-segment" type="button" data-part="seg-off" value="off">hidden</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 12px 16px">
          <div class="sp-row" style="align-items: flex-start; gap: 24px">
            <div class="sp-stack" style="gap: 6px; align-items: flex-start">
              ${panel('snapped', 'data-subject')}
            </div>
            <div class="sp-stack sp-context" style="gap: 6px; align-items: flex-start">
              ${panel('drift', '')}
            </div>
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 22px; max-width: 448px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const rules = [part(root, 'rules-snapped'), part(root, 'rules-drift')];
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const note = NOTES[key];
    if (!note) return;
    for (const layer of rules) flag(layer, 'hidden', key !== 'on');
    readout.textContent = note;
  };

  // Each segment names a state of the ruling, so the switch lands on that state rather
  // than flipping whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('on');
}
