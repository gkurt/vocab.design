import { flag, part, partsOf } from '#src/kit/parts.ts';
import '#src/kit/segmented.ts';

/** The canvas the card is nudged around, and the two steps the arrows move by. */
const CANVAS = { w: 320, h: 150 };
const CARD = { w: 96, h: 54 };
const START = { x: 40, y: 32 };
const SMALL = 1;
const BIG = 10;

const MAX = { x: CANVAS.w - CARD.w, y: CANVAS.h - CARD.h };

const AXIS: Record<string, { axis: 'x' | 'y'; sign: number }> = {
  ArrowLeft: { axis: 'x', sign: -1 },
  ArrowRight: { axis: 'x', sign: 1 },
  ArrowUp: { axis: 'y', sign: -1 },
  ArrowDown: { axis: 'y', sign: 1 },
};

const HANDLE = 'position: absolute; width: 6px; height: 6px; background: var(--sp-accent); border-radius: 1px; opacity: 0';

const handles = ['left: -3px; top: -3px', 'right: -3px; top: -3px', 'left: -3px; bottom: -3px', 'right: -3px; bottom: -3px']
  .map((at) => `<span data-part="handle" style="${HANDLE}; ${at}"></span>`)
  .join('');

/**
 * Nudge specimen: a selected card on a small canvas that moves one pixel per arrow press
 * and ten with the big step armed. The subject is the card, since the term names what the
 * arrow does to the selected object rather than the canvas it does it on; the grid, the
 * legend, and the simulated Shift are the apparatus around it.
 *
 * The real modifier is wired: a reader who takes the stage over and holds Shift while
 * pressing an arrow gets the big step whatever the control says. Synthesized key events
 * carry no modifiers (SPEC §7), so the scripted pass arms the same step through a labelled
 * control with two absolute states, which is the only part of the gesture that is mimed.
 *
 * The card moves by a transform inside a fixed canvas and every readout holds its width,
 * so a nudge moves the card and nothing else (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 276px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Poster</span>
          <span
            class="sp-text"
            data-part="readout"
            data-size="${SMALL}"
            style="width: 226px; text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums"
          >Select the card to nudge it</span>
        </div>
        <div class="sp-body" style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <div
            style="position: relative; width: ${CANVAS.w}px; height: ${CANVAS.h}px; border: 1px solid var(--sp-line); border-radius: 6px; background-color: var(--sp-surface); background-image: radial-gradient(var(--sp-line) 1px, transparent 1px); background-size: 10px 10px; background-position: -1px -1px"
          >
            <div
              class="sp-surface"
              data-part="card"
              data-subject
              data-x="${START.x}"
              data-y="${START.y}"
              style="position: absolute; left: 0; top: 0; width: ${CARD.w}px; height: ${CARD.h}px; padding: 8px 10px; transform: translate(${START.x}px, ${START.y}px); transition: transform 0.08s linear; cursor: default; user-select: none"
            >
              <span class="sp-heading" style="font-size: 12px">Headline</span>
              <span class="sp-line" style="display: block; width: 60%; margin-top: 7px"></span>
              ${handles}
            </div>
          </div>
          <div class="sp-row sp-row--between sp-context" style="width: 100%">
            <span class="sp-row" style="gap: 6px">
              <span class="sp-kbd">Arrow</span>
              <span class="sp-label">${SMALL} px</span>
              <span class="sp-kbd" style="margin-left: 8px">Shift</span>
              <span class="sp-kbd">Arrow</span>
              <span class="sp-label">${BIG} px</span>
            </span>
            <span class="sp-row" style="gap: 8px">
              <span class="sp-label">Simulated Shift</span>
              <sp-segmented class="sp-segmented" data-part="mode" data-value="off">
                <button class="sp-segment" data-part="mode-off" value="off" style="padding: 5px 10px">Released</button>
                <button class="sp-segment" data-part="mode-big" value="big" style="padding: 5px 10px">Held</button>
              </sp-segmented>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;

  const card = part(root, 'card');
  const readout = part(root, 'readout');
  const mode = part(root, 'mode') as HTMLElement & { value: string };
  const at = { ...START };
  let selected = false;

  const draw = () => {
    card.style.transform = `translate(${at.x}px, ${at.y}px)`;
    card.dataset.x = String(at.x);
    card.dataset.y = String(at.y);
    const step = mode.value === 'big' ? BIG : SMALL;
    readout.dataset.size = String(step);
    readout.textContent = selected ? `x ${at.x}, y ${at.y} · step ${step} px` : 'Select the card to nudge it';
  };

  const showHandles = (on: boolean) => {
    for (const handle of partsOf(root, 'handle')) handle.style.opacity = on ? '1' : '0';
  };

  // Selection is reached, never flipped: a click always selects (SPEC §8).
  const select = () => {
    selected = true;
    flag(card, 'data-selected', true);
    card.style.boxShadow = '0 0 0 1.5px var(--sp-accent)';
    showHandles(true);
    draw();
  };

  card.addEventListener('click', select);
  card.addEventListener('pointerdown', select);

  root.addEventListener('keydown', (event) => {
    const move = AXIS[event.key];
    if (!move || !selected) return;
    event.preventDefault();
    // The real key first, so takeover behaves like the tool this borrows from; the
    // control only stands in for a modifier the player cannot hold down.
    const big = event.shiftKey || mode.value === 'big';
    const next = at[move.axis] + move.sign * (big ? BIG : SMALL);
    at[move.axis] = Math.max(0, Math.min(MAX[move.axis], next));
    draw();
  });

  mode.addEventListener('change', draw);

  draw();
}
