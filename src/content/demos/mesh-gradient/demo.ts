import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The base the points are dropped onto: everything the blobs do not reach stays this. */
const BASE = '#241f4d';

type Point = { key: string; color: string; at: string };

/** Three points that never move, so the field's re-blend is attributable to the one that does. */
const FIXED: Point[] = [
  { key: 'violet', color: '#6d4bd6', at: '16% 20%' },
  { key: 'cyan', color: '#1e9fd0', at: '86% 16%' },
  { key: 'amber', color: '#e08a3c', at: '82% 86%' },
];

const ROSE = '#e0518a';

/** Absolute positions, so a pass picked up anywhere lands the point in the same place. */
const SPOTS: Record<string, { at: string; x: string; y: string }> = {
  corner: { at: '16% 82%', x: '16%', y: '82%' },
  centre: { at: '50% 50%', x: '50%', y: '50%' },
  top: { at: '48% 12%', x: '48%', y: '12%' },
};

const START = 'corner';

const blob = (p: { color: string; at: string }) => `radial-gradient(58% 66% at ${p.at}, ${p.color} 0%, transparent 72%)`;

const paint = (spot: string) => {
  const rose = SPOTS[spot] ?? SPOTS.corner;
  if (!rose) return '';
  return [blob({ color: ROSE, at: rose.at }), ...FIXED.map(blob)].join(', ');
};

const marker = (name: string, color: string, x: string, y: string, extra = '') => `
  <span data-part="${name}" style="position: absolute; left: ${x}; top: ${y}; width: 16px; height: 16px; margin: -8px 0 0 -8px;
        border-radius: 50%; background: ${color}; box-shadow: 0 0 0 2px rgb(255 255 255 / 0.92), 0 1px 3px rgb(0 0 0 / 0.4); ${extra}"></span>`;

/**
 * Mesh gradient specimen: four colours pinned to four positions, and the field they blend
 * into. Moving one point re-blends the whole region around it rather than shifting an edge,
 * which is the thing a one-dimensional ramp cannot do.
 *
 * The subject is the field. The markers sit in a sibling overlay rather than inside it, so
 * the subject stays the blend itself and never carries the specimen's own annotation
 * (SPEC §5); the picker, the markers and the readout are all in the context register.
 *
 * The stack really is four radial gradients, because CSS has no mesh gradient. A caption
 * under the field used to say so ("CSS has no mesh gradient, so this field is four large
 * radial gradients stacked, each fading to transparent."); no editor prints its own
 * implementation, and the article's honest note already carries the fact, so it went. The
 * field and its wrapper are fixed size and only paint changes, so nothing moves.
 */
export function mount(root: HTMLElement): void {
  const start = SPOTS[START];
  if (!start) return;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 438px; padding: 13px 18px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-value="${START}" data-axis="Rose point">
            <button class="sp-segment" data-part="seg-corner" value="corner">Corner</button>
            <button class="sp-segment" data-part="seg-centre" value="centre">Centre</button>
            <button class="sp-segment" data-part="seg-top" value="top">Top</button>
          </sp-segmented>
        </div>

        <div style="position: relative; height: 148px; margin-top: 12px">
          <div data-part="field" data-subject data-spot="${START}"
               style="position: absolute; inset: 0; border-radius: 10px; overflow: hidden;
                      background-color: ${BASE}; background-image: ${paint(START)}"></div>
          <div class="sp-context" data-part="points" aria-hidden="true" style="position: absolute; inset: 0; pointer-events: none">
            ${marker('pt-rose', ROSE, start.x, start.y)}
            ${FIXED.map((p) => {
              const [x, y] = p.at.split(' ');
              return marker(`pt-${p.key}`, p.color, x ?? '50%', y ?? '50%');
            }).join('')}
          </div>
        </div>

        <div class="sp-row sp-row--between sp-context" style="margin-top: 8px">
          <span class="sp-text" data-part="readout" style="font-size: 10.5px">rose at ${start.at}</span>
          <span class="sp-text" style="font-size: 10.5px">4 points</span>
        </div>
      </div>
    </div>
  `;

  const field = part(root, 'field');
  const rose = part(root, 'pt-rose');
  const readout = part(root, 'readout');

  const place = (key: string) => {
    const spot = SPOTS[key];
    if (!spot) return;
    field.dataset.spot = key;
    field.style.backgroundImage = paint(key);
    rose.style.left = spot.x;
    rose.style.top = spot.y;
    readout.textContent = `rose at ${spot.at}`;
  };
  place(START);

  part(root, 'segmented').addEventListener('change', (event) => place((event as CustomEvent<string>).detail));
}
