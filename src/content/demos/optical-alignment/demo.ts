import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The measured edge every shape is placed against, and the room each row holds. */
const GUIDE_W = 2;
const ROW_H = 56;
const CELL_W = 52;
const LABEL_W = 76;
const NUDGE_W = 64;
/** The rows are centred as a block, so the guide reads as an edge and not as a page margin. */
const ARENA_W = LABEL_W + CELL_W + NUDGE_W;

/**
 * The correction each shape needs, in pixels at this size. Hand written, because that is
 * how the value is arrived at: the nudge is judged by eye and then written down. A square's
 * flat edge already sits where it was measured, so its correction is nothing.
 */
const SHAPES: { key: string; label: string; nudge: number; subject?: true; art: string }[] = [
  {
    key: 'circle',
    label: 'circle',
    nudge: -2,
    art: 'width: 40px; height: 40px; border-radius: 50%; background: var(--sp-accent)',
  },
  {
    key: 'triangle',
    label: 'triangle',
    nudge: -6,
    subject: true,
    art: 'width: 44px; height: 40px; clip-path: polygon(50% 0, 100% 100%, 0 100%); background: var(--sp-accent)',
  },
  {
    key: 'square',
    label: 'square',
    nudge: 0,
    art: 'width: 40px; height: 40px; background: var(--sp-accent)',
  },
];

const NOTES: Record<string, string> = {
  metric: 'Metric: every bounding box starts on the line, so the round and pointed shapes read as inset.',
  optical: 'Optical: the round and pointed shapes are pushed past the line until their mass looks level.',
};

const nudgeText = (nudge: number) => (nudge === 0 ? '0' : `${nudge} px`);

const row = ({ key, label, nudge, subject, art }: (typeof SHAPES)[number]) => `
  <div style="display: flex; align-items: center; flex: 0 0 auto; height: ${ROW_H}px">
    <span class="sp-label sp-context" style="flex: 0 0 auto; width: ${LABEL_W}px; padding-right: 10px; text-align: right">${label}</span>
    <span style="display: flex; align-items: center; flex: 0 0 auto; width: ${CELL_W}px; height: 100%">
      <span
        data-part="shape-${key}"
        ${subject ? 'data-subject data-pose="[data-mode=optical]"' : ''}
        data-mode="optical"
        style="flex: 0 0 auto; transform: translateX(${nudge}px); transition: transform 0.24s var(--sp-ease); ${art}"
      ></span>
    </span>
    <span class="sp-label sp-context" data-part="nudge-${key}" style="flex: 0 0 auto; width: ${NUDGE_W}px; padding-left: 12px; font-variant-numeric: tabular-nums">${nudgeText(nudge)}</span>
  </div>`;

/**
 * Optical alignment specimen: three shapes placed against one measured edge, with the
 * correction that makes them look placed switched on and off.
 *
 * The subject is the triangle, the shape carrying the largest correction, rather than its
 * row or the set of three: the term names what is nudged, and a triangle's bounding box is
 * the one that lies most about where its mass is. The labels, the guide and the readouts
 * are scenery in the context register (SPEC §5).
 *
 * Metric is the counter-example the subject itself passes through, so the honest condition
 * is declared in `data-pose` on the subject and the mount state satisfies it: identify
 * refuses to ring a shape that is currently sitting where it was measured rather than where
 * it belongs (SPEC §6). Only `transform` changes between modes, so nothing moves in the
 * rows but the shapes, and the readouts hold their width either way.
 *
 * The line under the arena names what each placement did, and it changes with the pick, so
 * it is the stage's verdict and is drawn in the strip; the frame gave back the 50px it was
 * holding for it. The title bar read "Placed against one edge", which was the site naming
 * its own exhibit in the app's own type, and now says what the file is.
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="width: 476px; height: 250px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow" style="font-size: 13px">Shapes</span>
          <sp-segmented data-stage-mode class="sp-segmented" data-part="switcher" data-value="optical" data-axis="Alignment" data-term="optical">
            <button class="sp-segment" type="button" data-part="seg-metric" value="metric">metric</button>
            <button class="sp-segment" type="button" data-part="seg-optical" value="optical">optical</button>
          </sp-segmented>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px">
          <div data-part="arena" data-mode="optical" style="position: relative; flex: 0 0 auto; width: ${ARENA_W}px; height: ${ROW_H * 3}px">
            <span
              data-part="guide"
              style="position: absolute; left: ${LABEL_W - GUIDE_W / 2}px; top: 4px; bottom: 4px; width: ${GUIDE_W}px;
                     border-radius: 1px; background: var(--sp-muted); opacity: 0.5"
            ></span>
            ${SHAPES.map(row).join('')}
          </div>
          <span class="sp-text sp-context" data-stage-verdict data-part="readout" style="height: 42px; max-width: 428px; text-align: center">${NOTES.optical}</span>
        </div>
      </div>
    </div>
  `;

  const arena = part(root, 'arena');
  const readout = part(root, 'readout');

  const apply = (mode: string) => {
    const note = NOTES[mode];
    if (!note) return;
    arena.dataset.mode = mode;
    for (const { key, nudge } of SHAPES) {
      const applied = mode === 'optical' ? nudge : 0;
      const shape = part(root, `shape-${key}`);
      shape.dataset.mode = mode;
      shape.style.transform = `translateX(${applied}px)`;
      part(root, `nudge-${key}`).textContent = nudgeText(applied);
    }
    readout.textContent = note;
  };

  // Each segment names a way of placing the shapes, so a scripted step lands on that way
  // rather than flipping whichever one it found (SPEC §8).
  part(root, 'switcher').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));
}
