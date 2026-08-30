import { flag, part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The page the tether is drawn inside, and the boxes it holds, all stated rather than measured. */
const PAGE = { width: 400, height: 168 };
const ANCHOR = { width: 96, height: 28 };
const BOX = { width: 132, height: 54 };

type Place = { anchor: { left: number; top: number }; box: { left: number; top: number }; ghost?: { left: number; top: number } };

/**
 * Each state is a whole geometry: where the anchor sits and where the mechanism resolves the
 * anchored box to. The numbers are the arithmetic the browser would do, written out, so the
 * specimen is about the mechanism rather than about which engines ship it.
 */
const PLACES: Record<string, Place & { code: string; note: string }> = {
  'block-end': {
    anchor: { left: 152, top: 70 },
    box: { left: 134, top: 106 },
    code: 'position-area: block-end',
    note: 'The default: the box sits under its anchor and centred on it.',
  },
  'block-start': {
    anchor: { left: 152, top: 70 },
    box: { left: 134, top: 8 },
    code: 'position-area: block-start',
    note: 'Same tether, other side. Nothing was measured to place it.',
  },
  'inline-end': {
    anchor: { left: 152, top: 70 },
    box: { left: 256, top: 57 },
    code: 'position-area: inline-end',
    note: 'Beside the anchor, in logical terms, so a mirrored page follows.',
  },
  fallback: {
    anchor: { left: 274, top: 96 },
    box: { left: 256, top: 34 },
    ghost: { left: 256, top: 132 },
    code: 'position-try-fallbacks: flip-block',
    note: 'Below would run off the page (dashed), so the first fallback wins.',
  },
};

/**
 * Anchor positioning specimen: one anchored box tethered to one anchor, moved between the
 * placements the mechanism names, and then put in the corner where its requested placement
 * would overflow and the fallback takes over. The requested position is drawn as a dashed
 * ghost running off the page, which is the reason the fallback fires.
 *
 * The subject is the anchored box. The mechanism names two elements and only one of them is
 * new: the anchor, the page it is drawn on and the switcher are the scene it is read
 * against and carry the context register (SPEC §5).
 *
 * The note that reads what the placement just did ("The default: the box sits under its
 * anchor and centred on it.") was printed under the page in the product's own type, where it
 * was the author talking inside the fiction. It changes with the switch, so it is marked
 * `data-stage-verdict` and the stage draws it in the strip; the frame lost the 30px it was
 * reserving for it.
 *
 * The page is a fixed box and both elements are absolutely positioned inside it, so a change
 * of placement moves exactly the two things the term is about and nothing else (SPEC §5).
 * The box eases between placements so the tether is legible; the geometry is stated up front
 * rather than read back, so no measurement follows a style write (SPEC, kit gotchas).
 */
export function mount(root: HTMLElement): void {
  const texture = ['92%', '78%', '86%', '70%', '88%'].map((w) => `<div class="sp-line" style="width: ${w}"></div>`).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 274px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Placement</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-value="block-end" data-axis="Side">
            <button class="sp-segment" type="button" data-part="seg-below" value="block-end">below</button>
            <button class="sp-segment" type="button" data-part="seg-above" value="block-start">above</button>
            <button class="sp-segment" type="button" data-part="seg-beside" value="inline-end">beside</button>
            <button class="sp-segment" type="button" data-part="seg-edge" value="fallback">at the edge</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 16px">
          <div
            data-part="scene"
            data-place="block-end"
            style="position: relative; flex: 0 0 auto; width: ${PAGE.width}px; height: ${PAGE.height}px; overflow: hidden; background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <div class="sp-context sp-stack" aria-hidden="true" style="position: absolute; inset: 0; padding: 12px; gap: 9px">${texture}</div>
            <div
              data-part="ghost"
              hidden
              style="position: absolute; width: ${BOX.width}px; height: ${BOX.height}px; border: 1px dashed var(--sp-warn); border-radius: var(--sp-radius)"
            >
              <span class="sp-label" style="position: absolute; left: 0; right: 0; top: 6px; text-align: center; color: var(--sp-warn)">requested</span>
            </div>
            <span
              class="sp-button sp-button--sm sp-context"
              data-part="anchor"
              style="position: absolute; display: inline-flex; align-items: center; justify-content: center; width: ${ANCHOR.width}px; height: ${ANCHOR.height}px; padding: 0; cursor: default; transition: left 0.26s var(--sp-ease), top 0.26s var(--sp-ease)"
            >Berth 14</span>
            <div
              class="sp-surface"
              data-part="box"
              data-subject
              style="position: absolute; display: flex; flex-direction: column; gap: 5px; width: ${BOX.width}px; height: ${BOX.height}px; padding: 8px; box-shadow: var(--sp-shadow); transition: left 0.26s var(--sp-ease), top 0.26s var(--sp-ease)"
            >
              <span class="sp-heading" style="font-size: 13px">Tide today</span>
              <div class="sp-line" style="width: 84%"></div>
              <div class="sp-line" style="width: 62%"></div>
            </div>
          </div>
          <span
            class="sp-label sp-context"
            data-part="code"
            style="flex: 0 0 auto; color: var(--sp-ink); padding: 3px 9px; border-radius: 5px; background: var(--sp-sunken); white-space: nowrap"
          ></span>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="flex: 0 0 auto; height: 22px; max-width: 442px; text-align: center"></span>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const anchor = part(root, 'anchor');
  const box = part(root, 'box');
  const ghost = part(root, 'ghost');
  const code = part(root, 'code');
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const place = PLACES[key];
    if (!place) return;
    scene.dataset.place = key;
    anchor.style.left = `${place.anchor.left}px`;
    anchor.style.top = `${place.anchor.top}px`;
    box.style.left = `${place.box.left}px`;
    box.style.top = `${place.box.top}px`;
    if (place.ghost) {
      ghost.style.left = `${place.ghost.left}px`;
      ghost.style.top = `${place.ghost.top}px`;
    }
    flag(ghost, 'hidden', !place.ghost);
    code.textContent = place.code;
    readout.textContent = place.note;
  };

  // Each segment names a placement, so the switch lands on that placement rather than
  // flipping whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('block-end');
}
