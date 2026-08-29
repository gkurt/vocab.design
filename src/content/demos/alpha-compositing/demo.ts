import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/*
 * The scene, in the stack's own coordinates. Every shape is placed absolutely from these
 * numbers, so the operators can only change what is drawn, never where.
 */
const STACK = { w: 156, h: 108 };
const DEST = { x: 12, y: 12, w: 90, h: 84, r: 10 };
const SRC = { x: 62, y: 14, d: 82 };
const SRC_R = SRC.d / 2;
/** The source circle's centre expressed inside the destination's own box, for the knockout. */
const HOLE = { x: SRC.x + SRC_R - DEST.x, y: SRC.y + SRC_R - DEST.y };

/** Fixed paints, like the kit's glass and aurora: the term reads the same in both themes. */
const DEST_PAINT = 'rgb(53 87 232 / 0.75)';
const SRC_PAINT = 'rgb(226 84 58 / 0.75)';
const ALPHA = '0.75';

type Op = { key: string; label: string; name: string; note: string };

const OPS: Op[] = [
  {
    key: 'over',
    label: 'Over',
    name: 'source-over',
    note: 'The source lands on top. Where both cover the same pixel, both alphas contribute and neither wins outright.',
  },
  {
    key: 'atop',
    label: 'Atop',
    name: 'source-atop',
    note: 'The source survives only where the backdrop already had coverage. Everything past that edge is discarded.',
  },
  {
    key: 'out',
    label: 'Out',
    name: 'destination-out',
    note: 'The source is spent as a stencil: it removes the backdrop it covers and paints nothing of its own.',
  },
];

const START = 'over';

/** The knockout mask: transparent inside the source circle, opaque everywhere else. */
const KNOCKOUT = `radial-gradient(circle at ${HOLE.x}px ${HOLE.y}px, transparent ${SRC_R - 0.5}px, #000000 ${SRC_R + 0.5}px)`;

/**
 * Alpha compositing specimen: one backdrop and one source at a stated alpha each, over a
 * chequerboard that makes the surviving coverage legible, with three Porter-Duff operators
 * to choose between. The same two layers are on stage in every state; only what the
 * operator keeps of them changes.
 *
 * The subject is the composited stack, the box that holds the two layers and nothing else.
 * The overlap alone is where the arithmetic is visible, but it has no element of its own,
 * and a transparent box drawn purely to be ringed would be instrumentation rather than the
 * term. The chequerboard, the legend, the operator readout and the picker are all scenery
 * and sit in the context register (SPEC §5).
 *
 * Every shape is absolutely placed and permanently laid out; an operator change only turns
 * paint and masks on and off, so nothing moves (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const start = OPS.find((o) => o.key === START) ?? OPS[0];
  if (!start) return;

  const legend = (name: string, paint: string) => `
    <div class="sp-row" style="gap: 7px">
      <span class="sp-swatch" style="flex: 0 0 auto; width: 12px; height: 12px; border-radius: 3px;
            box-shadow: inset 0 0 0 1px rgb(127 137 156 / 0.4); --sp-swatch: ${paint}"></span>
      <span class="sp-text sp-grow" style="font-size: 11px">${name}</span>
      <span class="sp-text sp-text--ink" style="font-size: 11px; font-variant-numeric: tabular-nums">alpha ${ALPHA}</span>
    </div>`;

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 444px; padding: 13px 20px">
        <div class="sp-row sp-row--between sp-context" style="justify-content: flex-end">
          <sp-segmented data-stage-mode class="sp-segmented" data-part="segmented" data-axis="Operator" data-value="${START}">
            ${OPS.map((o) => `<button class="sp-segment" data-part="seg-${o.key}" value="${o.key}">${o.label}</button>`).join('')}
          </sp-segmented>
        </div>

        <div class="sp-row" style="gap: 14px; margin-top: 12px; align-items: flex-start">
          <div class="sp-context" data-part="board" style="flex: 0 0 auto; position: relative; width: ${STACK.w + 28}px;
               height: ${STACK.h + 28}px; border-radius: var(--sp-radius); overflow: hidden;
               background-image: repeating-conic-gradient(var(--sp-line) 0% 25%, var(--sp-surface) 0% 50%);
               background-size: 14px 14px; box-shadow: inset 0 0 0 1px var(--sp-line)">

            <div data-part="stack" data-subject data-op="${START}"
                 style="position: absolute; left: 14px; top: 14px; width: ${STACK.w}px; height: ${STACK.h}px">
              <div data-part="dest" style="position: absolute; left: ${DEST.x}px; top: ${DEST.y}px; width: ${DEST.w}px;
                   height: ${DEST.h}px; border-radius: ${DEST.r}px; background: ${DEST_PAINT}"></div>

              <div data-part="clip" hidden style="position: absolute; left: ${DEST.x}px; top: ${DEST.y}px; width: ${DEST.w}px;
                   height: ${DEST.h}px; border-radius: ${DEST.r}px; overflow: hidden">
                <div style="position: absolute; left: ${SRC.x - DEST.x}px; top: ${SRC.y - DEST.y}px; width: ${SRC.d}px;
                     height: ${SRC.d}px; border-radius: 50%; background: ${SRC_PAINT}"></div>
              </div>

              <div data-part="src" style="position: absolute; left: ${SRC.x}px; top: ${SRC.y}px; width: ${SRC.d}px;
                   height: ${SRC.d}px; border-radius: 50%; background: ${SRC_PAINT}"></div>

              <div data-part="stencil" hidden style="position: absolute; left: ${SRC.x}px; top: ${SRC.y}px; width: ${SRC.d}px;
                   height: ${SRC.d}px; border-radius: 50%; border: 2px dashed rgb(226 84 58 / 0.9)"></div>
            </div>
          </div>

          <div class="sp-stack sp-context" style="flex: 1 1 auto; min-width: 0; gap: 7px">
            <span class="sp-text sp-text--ink" data-part="op-name" style="font-size: 11.5px">${start.name}</span>
            ${legend('Backdrop', DEST_PAINT)}
            ${legend('Source', SRC_PAINT)}
            <p class="sp-text" data-stage-verdict data-part="note" style="margin: 2px 0 0; height: 58px; font-size: 10.5px; line-height: 1.35">${start.note}</p>
          </div>
        </div>

        <p class="sp-text sp-context" data-part="caption" style="margin: 9px 0 0; height: 28px; font-size: 10.5px; line-height: 1.35">
          The chequerboard is the page showing through: wherever it is visible, the two layers together left that pixel
          less than fully covered.
        </p>
      </div>
    </div>
  `;

  const stack = part(root, 'stack');
  const dest = part(root, 'dest');
  const clip = part(root, 'clip');
  const src = part(root, 'src');
  const stencil = part(root, 'stencil');

  const apply = (key: string) => {
    const op = OPS.find((o) => o.key === key);
    if (!op) return;
    stack.dataset.op = key;
    // The backdrop only loses pixels under `destination-out`, where the source is a stencil.
    const mask = key === 'out' ? KNOCKOUT : 'none';
    dest.style.setProperty('mask-image', mask);
    dest.style.setProperty('-webkit-mask-image', mask);
    src.hidden = key !== 'over';
    clip.hidden = key !== 'atop';
    stencil.hidden = key !== 'out';
    part(root, 'op-name').textContent = op.name;
    part(root, 'note').textContent = op.note;
  };
  apply(START);

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
