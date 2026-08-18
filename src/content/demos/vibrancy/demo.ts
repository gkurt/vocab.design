import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * The two backdrops, written out as a fixed table so the scene paints identically on every
 * run (no clock, no randomness). Blob positions are geometry and stay in the markup; only
 * the paint moves.
 */
const BACKDROPS: Record<string, { name: string; sky: string; blobA: string; blobB: string; tint: string }> = {
  sunset: {
    name: 'Sunset',
    sky: 'linear-gradient(118deg, #ff8a3d 0%, #ef3f7e 46%, #7b3ff2 100%)',
    blobA: '#ffd166',
    blobB: '#ff4d6d',
    tint: 'warm orange through magenta',
  },
  ocean: {
    name: 'Ocean',
    sky: 'linear-gradient(118deg, #12b0c4 0%, #2563eb 52%, #16b8a6 100%)',
    blobA: '#a7f3d0',
    blobB: '#38bdf8',
    tint: 'cool teal through blue',
  },
};

const START = 'sunset';

/** One panel's contents. Both panels are the same material; only the ink differs. */
const panelBody = (blended: boolean) => `
  <div style="${blended ? 'mix-blend-mode: luminosity; ' : ''}color: #1a1d23">
    <div style="font-size: 13px; font-weight: 600; letter-spacing: -0.01em">Now playing</div>
    <div style="font-size: 11px; margin-top: 2px; opacity: 0.85">Side two, track four</div>
    <div class="sp-row" style="gap: 6px; margin-top: 12px">
      ${icon('heart')}${icon('star')}${icon('share')}
    </div>
  </div>`;

/**
 * Vibrancy specimen: two panels cut from the same material, over a backdrop the reader can
 * change. Both blur and saturate what they cover, both carry the same hairline edge and the
 * same copy. The only difference is where the foreground colour comes from: the left panel
 * states its ink outright, and the right panel derives it from the blurred sample underneath
 * (`mix-blend-mode: luminosity` keeps the label's lightness and takes hue and chroma from
 * behind it). Switching the backdrop moves the right panel's text and glyphs and leaves the
 * left panel's exactly where they were, which is the whole claim: blur is the background
 * treatment, vibrancy is the foreground one.
 *
 * The subject is the vibrant material panel, the narrowest element on stage that the term
 * names. It is vibrant under both backdrops, so there is no state identify has to refuse.
 * The blur-only panel is the counter-example, and the backdrop, the segmented control, the
 * panel names and the caption are instrumentation, so all of them sit in the context
 * register (SPEC §5).
 *
 * Every box is absolutely placed at a fixed size and only paint changes with the backdrop,
 * so nothing moves (SPEC §5). No scripted animation, so nothing needs a reduced-motion gate.
 */
export function mount(root: HTMLElement): void {
  const start = BACKDROPS[START] ?? BACKDROPS.sunset;
  if (!start) throw new Error('unknown backdrop');

  const panel = (side: 'left' | 'right') => {
    const blended = side === 'right';
    return `
      <div data-part="${blended ? 'material' : 'flat'}" ${blended ? 'data-subject' : ''}
           style="position: absolute; ${side}: 22px; top: 30px; width: 170px; height: 120px; padding: 12px 13px;
                  border-radius: 13px; border: 1px solid rgb(255 255 255 / 0.45);
                  background: rgb(255 255 255 / 0.2); backdrop-filter: blur(14px) saturate(190%);
                  -webkit-backdrop-filter: blur(14px) saturate(190%); box-shadow: 0 6px 18px rgb(20 12 40 / 0.22)">
        ${panelBody(blended)}
      </div>`;
  };

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context">
          <span class="sp-label">Backdrop</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-value="${START}">
            ${Object.entries(BACKDROPS)
              .map(([key, b]) => `<button class="sp-segment" data-part="seg-${key}" value="${key}">${b.name}</button>`)
              .join('')}
          </sp-segmented>
        </div>

        <div data-part="scene" data-backdrop="${START}"
             style="position: relative; height: 162px; margin-top: 11px; border-radius: 10px; overflow: hidden">
          <div class="sp-context" data-part="sky" aria-hidden="true" style="position: absolute; inset: 0; background: ${start.sky}">
            <span data-part="blob-a" style="position: absolute; left: 4%; top: 6%; width: 132px; height: 132px;
                  border-radius: 50%; filter: blur(3px); opacity: 0.8; background: ${start.blobA}"></span>
            <span data-part="blob-b" style="position: absolute; right: 6%; bottom: -12%; width: 148px; height: 148px;
                  border-radius: 50%; filter: blur(3px); opacity: 0.75; background: ${start.blobB}"></span>
          </div>

          <div class="sp-context" aria-hidden="true"
               style="position: absolute; left: 22px; top: 8px; width: 170px; font-size: 10.5px; font-weight: 600;
                      color: rgb(255 255 255 / 0.92)">Blur only</div>
          <div class="sp-context" aria-hidden="true"
               style="position: absolute; right: 22px; top: 8px; width: 170px; text-align: right; font-size: 10.5px;
                      font-weight: 600; color: rgb(255 255 255 / 0.92)">Blur plus vibrancy</div>

          ${panel('left')}
          ${panel('right')}
        </div>

        <div class="sp-row sp-row--between sp-context" style="height: 16px; margin-top: 8px">
          <span class="sp-label" style="font-size: 10.5px">mix-blend-mode: luminosity</span>
          <span class="sp-text" data-part="tint" style="font-size: 10.5px">sampled: ${start.tint}</span>
        </div>

        <p class="sp-text sp-context" data-part="caption" style="margin: 6px 0 0; height: 28px; font-size: 10.5px; line-height: 1.4">
          Same material on both: same blur, same tint, same edge. Only the right panel derives its ink from the
          blurred sample beneath it.
        </p>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const sky = part(root, 'sky');
  const blobA = part(root, 'blob-a');
  const blobB = part(root, 'blob-b');
  const tint = part(root, 'tint');

  const paint = (key: string) => {
    const next = BACKDROPS[key] ?? BACKDROPS.sunset;
    if (!next) return;
    scene.dataset.backdrop = key;
    sky.style.background = next.sky;
    blobA.style.background = next.blobA;
    blobB.style.background = next.blobB;
    tint.textContent = `sampled: ${next.tint}`;
  };

  part(root, 'segmented').addEventListener('change', (event) => paint((event as CustomEvent<string>).detail));
}
