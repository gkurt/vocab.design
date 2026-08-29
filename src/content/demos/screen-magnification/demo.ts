import { icon } from '#src/kit/icons.ts';
import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import { localPoint } from '#src/kit/measure.ts';

/** The page is drawn in its own fixed coordinate space, so the lens can do arithmetic on it. */
const PAGE = { w: 424, h: 138 };
const LENS = { w: 132, h: 92 };

type Spot = { key: string; label: string; x: number; y: number };

/** Three things on the page, and where their centres are in page coordinates. */
const SPOTS: Spot[] = [
  { key: 'save', label: 'the Save button, top right', x: 387, y: 13 },
  { key: 'field', label: 'the Reference field', x: 90, y: 61 },
  { key: 'alert', label: 'the failure notice, bottom right', x: 341, y: 119 },
];

/** Where the keyhole starts: over the label and the top of the field it belongs to. */
const START = { x: 66, y: 58 };

const CAPTION: Record<string, string> = {
  '200': 'At 200 percent the lens still holds a label and its field together.',
  '300': 'At 300 percent a label and the control it belongs to are already competing for the keyhole.',
  '400': 'At 400 percent the view holds a few words. Anything a reader must compare has to be side by side.',
};

/**
 * Screen magnification specimen: one page fragment with a magnifier lens over it. The page
 * around the lens is drawn only so the reader can see what a magnifier user cannot: at this
 * enlargement the lens is the entire screen, and the Save button and the failure notice can
 * never be in it at the same time. Dragging moves the keyhole; the segmented control changes
 * how much of the page fits inside it, which is the trade the term is about.
 *
 * The subject is the lens, the narrowest element the term names. The page beneath, the
 * segmented control, the readout, and the caption are scenery (SPEC §5). The lens shows a
 * magnified copy of the same page, marked `aria-hidden` because duplicated content is
 * decorative, and the effect is simulated inside the frame rather than reaching for anything
 * document-scoped (SPEC §5).
 *
 * The lens and the page have fixed sizes stated in code, so nothing is measured after a style
 * write and no box ever changes size (SPEC §5). Dragging reads the pointer's own coordinates,
 * and each segment reaches its own zoom rather than cycling (SPEC §8).
 */
export function mount(root: HTMLElement): void {
  const box = (style: string, content = '') => `<div style="position: absolute; ${style}">${content}</div>`;

  // One page, drawn twice: once at rest under the lens, once magnified inside it.
  const page = (marked: boolean) => `
    ${box(`left: 0; top: 0; width: ${PAGE.w}px; height: 26px; border-bottom: 1px solid var(--sp-line); background: var(--sp-surface)`)}
    ${box('left: 10px; top: 6px; font-size: 11px; font-weight: 600; color: var(--sp-ink)', 'Invoices')}
    <div ${marked ? 'data-part="spot-save"' : ''}
         style="position: absolute; left: 360px; top: 4px; width: 54px; height: 18px; border-radius: 5px;
                background: var(--sp-accent); color: var(--sp-accent-ink); font-size: 10px; font-weight: 500;
                display: flex; align-items: center; justify-content: center">Save</div>

    ${box('left: 42px; top: 38px; font-size: 9.5px; color: var(--sp-muted)', 'Reference')}
    <div ${marked ? 'data-part="spot-field"' : ''}
         style="position: absolute; left: 42px; top: 52px; width: 180px; height: 18px; border: 1px solid var(--sp-line);
                border-radius: 5px; background: var(--sp-surface); font-size: 10px; color: var(--sp-ink);
                display: flex; align-items: center; padding: 0 6px">INV-2291</div>

    ${box('left: 42px; top: 84px; font-size: 9.5px; color: var(--sp-muted)', 'Amount due')}
    ${box('left: 42px; top: 98px; font-size: 12px; font-weight: 600; color: var(--sp-ink)', '248.00')}

    <div ${marked ? 'data-part="spot-alert"' : ''}
         style="position: absolute; left: 268px; top: 108px; width: 146px; height: 22px; border-radius: 6px;
                border: 1px solid var(--sp-line); background: var(--sp-surface); display: flex; align-items: center;
                gap: 5px; padding: 0 7px; font-size: 10px; color: var(--sp-ink)">
      ${icon('alert')}<span>Payment failed</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 452px; padding: 12px 14px">
        <div class="sp-row sp-row--between sp-context" style="gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">Magnifier</span>
          <sp-segmented class="sp-segmented" data-axis="Zoom" data-part="segmented" data-value="300">
            <button class="sp-segment" data-part="seg-200" value="200">200%</button>
            <button class="sp-segment" data-part="seg-300" value="300">300%</button>
            <button class="sp-segment" data-part="seg-400" value="400">400%</button>
          </sp-segmented>
        </div>

        <div style="position: relative; width: ${PAGE.w}px; height: ${PAGE.h}px; margin-top: 10px;
                    border: 1px solid var(--sp-line); border-radius: var(--sp-radius); background: var(--sp-sunken);
                    overflow: hidden">
          <!-- The page is scenery in both copies, so the two look alike; the lens itself is
               outside the context register, since the subject is styled normally (SPEC §5). -->
          <div class="sp-context" style="position: absolute; inset: 0">${page(true)}</div>

          <div data-part="lens" data-subject data-zoom="300" data-showing="field"
               style="position: absolute; width: ${LENS.w}px; height: ${LENS.h}px; left: 0; top: 0; overflow: hidden;
                      border: 2px solid var(--sp-accent); border-radius: 10px; background: var(--sp-sunken);
                      box-shadow: 0 0 0 2000px rgb(16 24 40 / 0.42); cursor: grab; touch-action: none">
            <div data-part="magnified" class="sp-context" aria-hidden="true"
                 style="position: absolute; left: 0; top: 0; width: ${PAGE.w}px; height: ${PAGE.h}px;
                        transform-origin: 0 0">
              ${page(false)}
            </div>
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 9px; height: 18px; gap: 10px">
          <span class="sp-label" style="flex: 0 0 auto">In the lens</span>
          <span class="sp-text sp-text--ink" data-part="readout" data-showing="field"
                style="flex: 0 0 auto; font-size: 11.5px; white-space: nowrap">${SPOTS[1]?.label}</span>
        </div>

        <p class="sp-text sp-context" data-part="caption" data-zoom="300"
           style="margin: 7px 0 0; height: 34px; font-size: 11px">${CAPTION['300']}</p>
      </div>
    </div>
  `;

  const lens = part(root, 'lens');
  const magnified = part(root, 'magnified');
  const readout = part(root, 'readout');
  const caption = part(root, 'caption');

  let zoom = 3;
  let centre = { ...START };
  let dragging = false;

  const nearest = (x: number, y: number) => {
    let best: Spot | undefined;
    let bestDistance = Number.POSITIVE_INFINITY;
    for (const spot of SPOTS) {
      const d = Math.hypot(spot.x - x, spot.y - y);
      if (d < bestDistance) {
        bestDistance = d;
        best = spot;
      }
    }
    return bestDistance <= 62 ? best : undefined;
  };

  const draw = () => {
    const half = { x: LENS.w / 2, y: LENS.h / 2 };
    centre.x = Math.min(Math.max(centre.x, half.x), PAGE.w - half.x);
    centre.y = Math.min(Math.max(centre.y, half.y), PAGE.h - half.y);

    lens.style.left = `${centre.x - half.x}px`;
    lens.style.top = `${centre.y - half.y}px`;
    // The copy is pushed so that the page point under the lens centre lands in the middle.
    magnified.style.transform = `translate(${half.x - centre.x * zoom}px, ${half.y - centre.y * zoom}px) scale(${zoom})`;

    const spot = nearest(centre.x, centre.y);
    const showing = spot?.key ?? 'page';
    lens.dataset.showing = showing;
    readout.dataset.showing = showing;
    readout.textContent = spot?.label ?? 'a patch of the page, and nothing else';
  };

  const applyZoom = (next: number) => {
    zoom = next;
    lens.dataset.zoom = String(next * 100);
    caption.dataset.zoom = String(next * 100);
    caption.textContent = CAPTION[String(next * 100)] ?? '';
    draw();
  };

  draw();

  const pageOrigin = () => lens.offsetParent as HTMLElement;

  lens.addEventListener('pointerdown', (event) => {
    // Mandatory guard: the player's synthetic pointers cannot be captured and the call throws (SPEC §7).
    if (event.isTrusted) lens.setPointerCapture(event.pointerId);
    dragging = true;
    lens.style.cursor = 'grabbing';
  });

  lens.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    centre = localPoint(event, pageOrigin());
    draw();
  });

  const stop = () => {
    dragging = false;
    lens.style.cursor = 'grab';
  };

  lens.addEventListener('pointerup', stop);
  lens.addEventListener('pointercancel', stop);

  part(root, 'segmented').addEventListener('change', (event) => {
    applyZoom(Number((event as CustomEvent<string>).detail) / 100);
  });
}
