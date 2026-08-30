import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** A four by three frame, held at one size, so only the media inside it changes shape. */
const BOX_W = 224;
const BOX_H = 168;
const BOX_RATIO = BOX_W / BOX_H;

const RATIOS: Record<string, number> = { '16-9': 16 / 9, '4-3': 4 / 3, '9-16': 9 / 16 };
const RATIO_LABELS: Record<string, string> = { '16-9': '16:9', '4-3': '4:3', '9-16': '9:16' };

const segment = (key: string, label: string) => `
  <button class="sp-segment" type="button" data-part="seg-${key}" value="${key}" style="padding: 4px 9px; font-size: 11px">
    ${label}
  </button>`;

/** The stand-in picture, drawn in percentages so it scales with whatever box it is given. */
const PICTURE = `
  <span style="position: absolute; left: 18%; top: 16%; width: 20%; aspect-ratio: 1; border-radius: 50%; background: #ffe08a"></span>
  <span style="position: absolute; left: 0; right: 0; bottom: 0; height: 34%; background: linear-gradient(#2f6b4a, #1d4632)"></span>
  <span style="position: absolute; left: 62%; bottom: 26%; width: 16%; height: 22%; border-radius: 3px; background: #f4f6fb"></span>`;

/** Where the bars land, given the source ratio and whether the media is fitted or filled. */
function barsFor(ratio: number, fit: string): string {
  if (fit === 'cover') return Math.abs(ratio - BOX_RATIO) < 0.001 ? 'none' : 'crop';
  if (Math.abs(ratio - BOX_RATIO) < 0.001) return 'none';
  return ratio > BOX_RATIO ? 'letterbox' : 'pillarbox';
}

/**
 * Letterboxing specimen: one media frame of a fixed shape, given sources of three different
 * shapes, fitted inside the frame or made to fill it.
 *
 * The subject is the media box, since letterboxing is a property of the box and its bars
 * rather than of the picture. Filling the frame crops instead of boxing, and a source that
 * matches the frame produces no bars at all, so both are counter-examples the box itself
 * passes through: the honest condition lives in `data-pose` and the mount state (a wide source
 * fitted, which letterboxes) satisfies it (SPEC §6). The pickers are scenery in the context
 * register (SPEC §5), and the stage draws both of them out in the strip.
 *
 * A paragraph beside the frame used to name the case in words ("Letterboxed: the source is
 * wider than the frame..."), and the title bar carried an aside, "where the two shapes
 * disagree". Both were the site talking inside a media player, and the strip already carries
 * one verdict, which is where a reading of the state belongs. With the paragraph gone the
 * column beside the frame holds nothing a reader can see (the stage draws both pickers in the
 * strip), so the frame is now just wide enough for the media box.
 *
 * The frame never changes size, so the bars appear and disappear inside it and nothing around
 * it moves (SPEC §5). Sizes are computed from the two ratios rather than measured, so nothing
 * is read back after a style write (SPEC §5). Each segment names the source or the fit it
 * produces (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 268px; height: 228px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Preview</span>
        </div>
        <div class="sp-body" style="display: flex; align-items: flex-start; gap: 14px; padding: 10px 12px">
          <div
            data-part="box"
            data-subject
            data-pose="[data-bars=letterbox], [data-bars=pillarbox]"
            data-aspect="16-9"
            data-fit="contain"
            data-bars="letterbox"
            style="position: relative; flex: 0 0 auto; width: ${BOX_W}px; height: ${BOX_H}px; overflow: hidden;
                   background: #14161a; border: 1px solid var(--sp-line); border-radius: var(--sp-radius)"
          >
            <span
              data-part="media"
              style="position: absolute; left: 50%; top: 50%; translate: -50% -50%; overflow: hidden;
                     background: linear-gradient(165deg, #3f6fd8, #8cc4f2 58%, #f0b269);
                     transition: width 0.24s var(--sp-ease), height 0.24s var(--sp-ease)"
            >${PICTURE}</span>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 4px">
            <sp-segmented data-stage-mode class="sp-segmented" data-part="aspects" data-value="16-9" data-axis="Shape" data-term="16-9" style="align-self: flex-start">
              ${segment('16-9', '16:9')}${segment('4-3', '4:3')}${segment('9-16', '9:16')}
            </sp-segmented>
            <sp-segmented data-stage-mode class="sp-segmented" data-part="fits" data-value="contain" data-axis="Fit" data-term="contain" style="align-self: flex-start; margin-top: 8px">
              ${segment('contain', 'contain')}${segment('cover', 'cover')}
            </sp-segmented>
            <span class="sp-heading" data-stage-verdict data-part="verdict" style="height: 20px; margin-top: 12px; font-size: 13px"></span>
          </div>
        </div>
      </div>
    </div>
  `;

  const box = part(root, 'box');
  const media = part(root, 'media');
  const verdict = part(root, 'verdict');

  const apply = (aspectKey: string, fitKey: string) => {
    const ratio = RATIOS[aspectKey];
    const label = RATIO_LABELS[aspectKey];
    if (!ratio || !label) return;
    const fills = fitKey === 'cover' ? ratio < BOX_RATIO : ratio > BOX_RATIO;
    const width = fills ? BOX_W : Math.round(BOX_H * ratio);
    const height = fills ? Math.round(BOX_W / ratio) : BOX_H;
    media.style.width = `${width}px`;
    media.style.height = `${height}px`;
    const bars = barsFor(ratio, fitKey);
    box.dataset.aspect = aspectKey;
    box.dataset.fit = fitKey;
    box.dataset.bars = bars;
    verdict.textContent = `${label} source, ${fitKey}`;
  };

  part(root, 'aspects').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail, box.dataset.fit ?? 'contain'));
  part(root, 'fits').addEventListener('change', (event) => apply(box.dataset.aspect ?? '16-9', (event as CustomEvent<string>).detail));

  apply('16-9', 'contain');
}
