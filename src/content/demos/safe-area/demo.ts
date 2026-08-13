import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** This phone's insets, in the specimen's own scale: the bands the system owns. */
const TOP = 26;
const BOTTOM = 18;
const SIDE = 12;

const HATCH = `repeating-linear-gradient(45deg, var(--sp-line) 0 4px, transparent 4px 9px)`;

/**
 * Safe area specimen: a phone whose notch and home indicator are drawn as bands the system
 * owns, with one content region laid out twice, once ignoring the insets and once padded by
 * them. The collision is the argument, so the ignoring case is a state the script visits and
 * a caption names as the mistake, never the state the specimen rests in.
 *
 * The subject is the content region, which is the narrowest element the term is about: the
 * device, the bands, the switcher and the caption are the scene it is read against and carry
 * the context register (SPEC §5).
 *
 * The region is a fixed box pinned to the screen, so the padding change moves only what is
 * inside it. Nothing outside the phone can shift, which is what keeps the term's own size
 * change contained (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 296px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Layout</span>
          <sp-segmented class="sp-segmented" data-part="switcher" data-value="safe">
            <button class="sp-segment" type="button" data-part="seg-edge" value="edge">edge to edge</button>
            <button class="sp-segment" type="button" data-part="seg-safe" value="safe">safe area</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; align-items: center; gap: 16px; padding: 12px 14px">
          <div
            class="sp-context"
            data-part="phone"
            style="flex: 0 0 auto; padding: 5px; background: var(--sp-ink); border-radius: 24px"
          >
            <div style="position: relative; width: 148px; height: 226px; background: var(--sp-surface); border-radius: 19px; overflow: hidden">
              <div style="position: absolute; top: 0; left: 0; right: 0; height: ${TOP}px; background: ${HATCH}"></div>
              <div style="position: absolute; bottom: 0; left: 0; right: 0; height: ${BOTTOM}px; background: ${HATCH}"></div>
              <div
                data-part="region"
                data-subject
                data-pose="[data-mode=safe]"
                data-mode="safe"
                style="position: absolute; inset: 0; z-index: 1; display: flex; flex-direction: column; justify-content: space-between; padding: ${TOP}px ${SIDE}px ${BOTTOM}px"
              >
                <div class="sp-row sp-row--between">
                  ${icon('chevronLeft')}
                  <span class="sp-heading" data-part="title" style="font-size: 13px">Now playing</span>
                  ${icon('close')}
                </div>
                <div class="sp-stack" style="gap: 6px">
                  <div class="sp-line" style="width: 90%"></div>
                  <div class="sp-line" style="width: 72%"></div>
                </div>
                <button class="sp-button sp-button--sm" type="button" data-part="cta" style="width: 100%">Continue</button>
              </div>
              <div
                style="position: absolute; z-index: 2; top: 0; left: 50%; translate: -50% 0; width: 62px; height: 15px; background: var(--sp-ink); border-radius: 0 0 9px 9px"
              ></div>
              <div
                style="position: absolute; z-index: 2; bottom: 6px; left: 50%; translate: -50% 0; width: 56px; height: 4px; background: var(--sp-ink); border-radius: 999px; opacity: 0.55"
              ></div>
            </div>
          </div>
          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 8px">
            <span class="sp-label">insets</span>
            <span class="sp-text" data-part="readout" style="height: 76px"></span>
            <div style="height: 26px">
              <span class="sp-chip" data-part="warning" hidden>${icon('alert')} under the notch</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const region = part(root, 'region');
  const warning = part(root, 'warning');
  const readout = part(root, 'readout');

  const apply = (key: string) => {
    const safe = key === 'safe';
    region.dataset.mode = safe ? 'safe' : 'edge';
    region.style.padding = safe ? `${TOP}px ${SIDE}px ${BOTTOM}px` : '2px';
    warning.hidden = safe;
    readout.textContent = safe
      ? `padding: env(safe-area-inset-top) ${SIDE}px env(safe-area-inset-bottom), which resolves to ${TOP}px and ${BOTTOM}px on this device.`
      : `No insets: the title runs under the camera housing and the button sits beneath the home indicator, where the system takes the touch.`;
  };

  // Each segment names a layout, so the switch lands on that layout rather than
  // flipping whichever one it finds (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  apply('safe');
}
