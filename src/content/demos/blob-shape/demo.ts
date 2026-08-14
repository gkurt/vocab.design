import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/**
 * Organic blob specimen: two blobs sitting behind a card, the job the shape is usually
 * hired for, with the eight radius values that produce them printed underneath. The
 * segmented control names two shapes outright (SPEC §8), and the radii transition between
 * them, so the reader can see that a blob is a number tuple rather than a drawing. The
 * move is a CSS transition, which the kit already switches off under reduced motion.
 *
 * The subject is the filled blob, not the pair and not the scene: one blob is what the
 * term names, and the outlined companion, the card it sits behind, and the code readout
 * are the scenery that shows the shape doing its job (SPEC §5).
 *
 * Only the radii change between states. Both blobs keep their box, the card never moves,
 * and the readout holds a fixed line, so nothing shifts.
 */
const SHAPES = {
  a: { fill: '70% 30% 52% 48% / 34% 63% 37% 66%', ring: '45% 55% 68% 32% / 62% 40% 60% 38%' },
  b: { fill: '32% 68% 39% 61% / 61% 35% 65% 39%', ring: '66% 34% 33% 67% / 38% 57% 43% 62%' },
} as const;

type Shape = keyof typeof SHAPES;
const START: Shape = 'a';

const EASE = 'border-radius 0.55s var(--sp-ease)';

export function mount(root: HTMLElement): void {
  const start = SHAPES[START];

  root.innerHTML = `
    <div class="sp-app" style="gap: 10px">
      <div class="sp-surface" data-part="scene"
           style="position: relative; width: 428px; height: 178px; overflow: hidden; background: #fbfbfd">

        <span data-part="blob-fill" data-subject data-shape="${START}" aria-hidden="true"
              style="position: absolute; left: 14px; top: 10px; width: 172px; height: 150px;
                     background: linear-gradient(140deg, #a78bfa, #60a5fa); opacity: 0.9;
                     border-radius: ${start.fill}; transition: ${EASE}"></span>

        <span class="sp-context" data-part="blob-ring" aria-hidden="true"
              style="position: absolute; left: 104px; top: 60px; width: 138px; height: 108px;
                     border: 2px solid #f0a3c8; border-radius: ${start.ring}; transition: ${EASE}"></span>

        <div class="sp-window sp-context" data-part="card"
             style="position: absolute; right: 16px; top: 50%; width: 200px; translate: 0 -50%; padding: 13px 15px">
          <div class="sp-heading" style="font-size: 14px">Rounded, not organic</div>
          <p class="sp-text" style="margin: 5px 0 0; font-size: 12px">
            Every box on this page has four corners. The accents behind it have none.
          </p>
        </div>
      </div>

      <div class="sp-row sp-context" data-part="panel" style="gap: 10px">
        <sp-segmented class="sp-segmented" data-part="segmented" data-value="${START}">
          <button class="sp-segment" data-part="seg-a" value="a">Shape A</button>
          <button class="sp-segment" data-part="seg-b" value="b">Shape B</button>
        </sp-segmented>
        <code data-part="radii"
              style="flex: 0 0 268px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px;
                     color: var(--sp-muted); white-space: nowrap">border-radius: ${start.fill}</code>
      </div>
    </div>
  `;

  const fill = part(root, 'blob-fill');
  const ring = part(root, 'blob-ring');
  const radii = part(root, 'radii');

  const paint = (name: string) => {
    const next = SHAPES[name as Shape];
    if (!next) return;
    fill.dataset.shape = name;
    fill.style.borderRadius = next.fill;
    ring.style.borderRadius = next.ring;
    radii.textContent = `border-radius: ${next.fill}`;
  };

  part(root, 'segmented').addEventListener('change', (event) => paint((event as CustomEvent<string>).detail));
}
