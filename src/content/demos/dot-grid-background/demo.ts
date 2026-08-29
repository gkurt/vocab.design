import { part } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';
import { localPoint } from '#src/kit/measure.ts';

/**
 * Dot grid background specimen: a board carrying the field, with a card that lands on the
 * crossings as it is dragged across it. The segmented picks the register (dots, graph paper,
 * blueprint) and each register brings its own spacing, so the snap the card obeys changes
 * with the pattern. That is the whole claim of the term: the field is a scaffold the surface
 * actually behaves by, not a texture printed behind one.
 *
 * The two marks on the board sit deliberately off the grid. Dropping the card at one shows it
 * landing on the nearest crossing rather than under the pointer, which is what makes the
 * field legible as a scaffold instead of as decoration.
 *
 * Each register is one repeating background image, minor rules over major ones, rather than a
 * few hundred dot elements: what the article says to do, and what keeps the specimen cheap.
 *
 * The subject is the board, not the card and not the scene: the term names the surface, and
 * the card is only the evidence that the surface has a grid in it (SPEC §5). The card, the
 * marks, the segmented and the read-out are scenery.
 *
 * No layout shift: the card is absolutely positioned inside the board, so moving it can never
 * push anything around, and the read-out's values sit in a column of their own (SPEC §5).
 *
 * The register is picked absolutely, never toggled, and the only movement is the reader's own,
 * so there is no clock.
 */
const BOARD_W = 300;
const BOARD_H = 156;
const CARD_W = 76;
const CARD_H = 52;
/** The instrumentation's own ink: one warm mark that reads on white paper and on navy alike. */
const MARK = '#e8590c';

type Register = {
  key: string;
  label: string;
  /** The field's tile and the snap the card obeys are the same number, which is the point. */
  step: number;
  color: string;
  image: string;
  size: string;
};

const DOTS: Register = {
  key: 'dots',
  label: 'Dots',
  step: 20,
  color: 'var(--sp-surface)',
  image: 'radial-gradient(circle at 1.6px 1.6px, var(--sp-line) 1.6px, transparent 1.9px)',
  size: '20px 20px',
};

const GRAPH: Register = {
  key: 'graph',
  label: 'Graph paper',
  step: 16,
  color: 'var(--sp-surface)',
  image: [
    'linear-gradient(rgb(94 132 176 / 0.5) 1px, transparent 1px)',
    'linear-gradient(90deg, rgb(94 132 176 / 0.5) 1px, transparent 1px)',
    'linear-gradient(rgb(94 132 176 / 0.22) 1px, transparent 1px)',
    'linear-gradient(90deg, rgb(94 132 176 / 0.22) 1px, transparent 1px)',
  ].join(', '),
  size: '80px 80px, 80px 80px, 16px 16px, 16px 16px',
};

const BLUEPRINT: Register = {
  key: 'blueprint',
  label: 'Blueprint',
  step: 24,
  color: '#16325e',
  image: [
    'linear-gradient(rgb(203 224 255 / 0.55) 1px, transparent 1px)',
    'linear-gradient(90deg, rgb(203 224 255 / 0.55) 1px, transparent 1px)',
    'linear-gradient(rgb(203 224 255 / 0.24) 1px, transparent 1px)',
    'linear-gradient(90deg, rgb(203 224 255 / 0.24) 1px, transparent 1px)',
  ].join(', '),
  size: '120px 120px, 120px 120px, 24px 24px, 24px 24px',
};

const REGISTERS: readonly Register[] = [DOTS, GRAPH, BLUEPRINT];
const START = DOTS;

/** Where the card starts, and the two off-grid marks the script drops it at. */
const HOME = { x: 40, y: 40 };
const MARKS = [
  { part: 'mark-a', x: 226, y: 42 },
  { part: 'mark-b', x: 74, y: 118 },
];

/** A crosshair, drawn at 2px: the stage reads a thinner box as absent, so a hairline is no mark. */
function crosshair(id: string, x: number, y: number): string {
  return `
    <span data-part="${id}" aria-hidden="true"
          style="position: absolute; left: ${x - 8}px; top: ${y - 8}px; width: 16px; height: 16px">
      <span style="position: absolute; left: 0; top: 7px; width: 16px; height: 2px; background: ${MARK}"></span>
      <span style="position: absolute; left: 7px; top: 0; width: 2px; height: 16px; background: ${MARK}"></span>
    </span>`;
}

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app" style="gap: 9px">
      <div class="sp-window" style="width: 466px; padding: 11px 14px 13px">
        <div class="sp-row sp-row--between sp-context" style="margin-bottom: 10px">
          <span class="sp-heading" data-part="heading" style="color: var(--sp-ink)">A surface you build on</span>
          <sp-segmented class="sp-segmented" data-part="segmented" data-axis="Register" data-value="${START.key}">
            ${REGISTERS.map((r) => `<button type="button" class="sp-segment" data-part="seg-${r.key}" value="${r.key}">${r.label}</button>`).join('')}
          </sp-segmented>
        </div>

        <div class="sp-row" data-part="tour" style="gap: 14px; align-items: flex-start; justify-content: center">
          <div data-part="board" data-subject data-register="${START.key}"
               style="position: relative; flex: 0 0 ${BOARD_W}px; height: ${BOARD_H}px; overflow: hidden;
                      border-radius: var(--sp-radius); box-shadow: inset 0 0 0 1px var(--sp-line);
                      background-color: ${START.color}; background-image: ${START.image}; background-size: ${START.size}">
            ${MARKS.map((m) => crosshair(m.part, m.x, m.y)).join('')}
            <div class="sp-context" data-part="card"
                 style="position: absolute; left: ${HOME.x}px; top: ${HOME.y}px; width: ${CARD_W}px; height: ${CARD_H}px;
                        display: flex; flex-direction: column; justify-content: center; gap: 6px; padding: 0 10px;
                        background: var(--sp-surface); border: 1px solid var(--sp-line); border-radius: 6px;
                        box-shadow: 0 2px 8px rgb(16 24 40 / 0.18); cursor: grab; touch-action: none;
                        transition: left 0.09s var(--sp-ease), top 0.09s var(--sp-ease)">
              <span class="sp-line" style="width: 100%"></span>
              <span class="sp-line" style="width: 62%"></span>
            </div>
          </div>

          <div class="sp-stack sp-context" data-part="readout" style="flex: 0 0 124px; gap: 10px">
            <div class="sp-stack" style="gap: 2px">
              <span class="sp-label">Field spacing</span>
              <span data-part="readout-step" style="font-size: 15px; font-weight: 600">${START.step} px</span>
            </div>
            <div class="sp-stack" style="gap: 2px">
              <span class="sp-label">Card sits at</span>
              <span data-part="readout-pos" style="font-size: 15px; font-weight: 600">${HOME.x}, ${HOME.y}</span>
            </div>
            <span class="sp-text" style="margin: 0; font-size: 11px; line-height: 1.35">
              Dropped anywhere, it lands on the nearest crossing.
            </span>
          </div>
        </div>
      </div>

      <p class="sp-text sp-context" data-part="caption" style="max-width: 466px; margin: 0; text-align: center">
        The field is only a scaffold if the surface actually snaps to it.
      </p>
    </div>
  `;

  const board = part(root, 'board');
  const card = part(root, 'card');
  const stepOut = part(root, 'readout-step');
  const posOut = part(root, 'readout-pos');

  let current = START;
  let at = { ...HOME };
  let grabbed: { dx: number; dy: number } | undefined;

  const place = (x: number, y: number): void => {
    const step = current.step;
    at = {
      x: Math.max(0, Math.min(BOARD_W - CARD_W, Math.round(x / step) * step)),
      y: Math.max(0, Math.min(BOARD_H - CARD_H, Math.round(y / step) * step)),
    };
    card.style.left = `${at.x}px`;
    card.style.top = `${at.y}px`;
    posOut.textContent = `${at.x}, ${at.y}`;
  };

  const apply = (key: string): void => {
    const next = REGISTERS.find((r) => r.key === key);
    if (!next) return;
    current = next;
    board.dataset.register = next.key;
    board.style.backgroundColor = next.color;
    board.style.backgroundImage = next.image;
    board.style.backgroundSize = next.size;
    stepOut.textContent = `${next.step} px`;
    // The register brings its own spacing, so the card re-lands on the new field's crossings.
    place(at.x, at.y);
  };

  part(root, 'segmented').addEventListener('change', (event) => apply((event as CustomEvent<string>).detail));

  card.addEventListener('pointerdown', (event) => {
    // The card snaps out from under the pointer, so capture is what keeps the moves and the
    // release coming here. A synthetic pointer has none to capture and the call would throw.
    if (event.isTrusted) card.setPointerCapture(event.pointerId);
    const grab = localPoint(event, card);
    grabbed = { dx: grab.x, dy: grab.y };
  });

  card.addEventListener('pointermove', (event) => {
    if (!grabbed) return;
    const at = localPoint(event, board);
    place(at.x - grabbed.dx, at.y - grabbed.dy);
  });

  const drop = (): void => {
    grabbed = undefined;
  };
  card.addEventListener('pointerup', drop);
  card.addEventListener('pointercancel', drop);
}
